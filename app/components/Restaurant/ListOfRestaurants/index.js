import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ListOfRestaurants.styles";
import { screen } from "../../../utils/screenName";

export const ListOfRestaurants = (props) => {
    const { restaurants } = props
    const navigation = useNavigation()
    const goToResto = (restaurant) => navigation.navigate(screen.restaurant.restaurant, { id: restaurant.id });

    return (
        <FlatList
            data={restaurants}
            renderItem={doc => {
                const resto = doc.item.data()
                return (
                    <TouchableOpacity
                        onPress={() => goToResto(resto)}>
                        <View style={styles.restaurant}>
                            <Image
                                source={{ uri: resto.images[0] }}
                                style={styles.image} />
                            <View>
                                <Text style={styles.name}>{resto.name}</Text>
                                <Text style={styles.info}>{resto.address}</Text>
                                <Text style={styles.info}>{resto.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>)
            }}
        />
    )
};