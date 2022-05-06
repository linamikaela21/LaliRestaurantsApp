import { collection, endAt, getDocs, limit, orderBy, query, startAt } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { Loading } from '../../components/Shared/Loading';
import { db, screen } from '../../utils';
import { size, map, round } from 'lodash'

export const SearchScreen = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState(null);
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        (async () => {
            const q = query(
                collection(db, 'restaurants'),
                orderBy('name'),
                startAt(searchText),
                endAt(`${searchText}\uf8ff`),
                limit(20)
            )
            const querySnap = await getDocs(q)
            setSearch(querySnap.docs)
        })()
    }, [searchText])

    const goToResto = (idResto) => navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.restaurant, params: { id: idResto } });

    return (
        <>
            <SearchBar
                placeholder='Look for your restaurant..'
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            {!search && <Loading show text='Loading..' />}
            <ScrollView>
                {size(search) === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text>Any restaurant match with your search</Text>
                    </View>
                ) : (map(search, (item) => {
                    const data = item.data()
                    return (
                        <ListItem key={data.id} bottomDivider onPress={() => goToResto(data.id)}>
                            <Avatar source={{ uri: data.images[0] }} rounded />
                            <ListItem.Content>
                                <ListItem.Title>{data.name}</ListItem.Title>
                            </ListItem.Content>
                            <Icon
                                type='material-community'
                                name='chevron-right' />
                        </ListItem>
                    )
                }))}
            </ScrollView>
        </>
    )
};
