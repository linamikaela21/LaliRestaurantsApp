import { View, TouchableOpacity } from "react-native";
import { Text, Image, Rating, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./RestaurantRanking.styles";
import { screen } from "../../../utils";

export const RestaurantRanking = ({ restaurant, index }) => {
    const navigation = useNavigation()
    const goToResto = () => navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.restaurant, params: { id: restaurant.id } });

    const renderMedal = () => {
        if (index > 2) return null

        let color = ''
        if (index === 0) color = '#FFD700'
        if (index === 1) color = '#BEBEBF'
        if (index === 3) color = '#CD7F32'

        return (
            <Icon
                type='material-community'
                name='medal-outline'
                color={color}
                style={styles.medal} />
        )
    }

    return (
        <TouchableOpacity onPress={goToResto}>
            <View style={styles.content}>
                <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
                <View style={styles.infoContent}>
                    <View style={styles.nameContent}>
                        {renderMedal()}
                        <Text style={styles.name}>{restaurant.name}</Text>
                    </View>
                    <Rating imageSize={15} readonly startingValue={restaurant.rankingMedia} />
                </View>
                <Text style={styles.description}>{restaurant.description}</Text>
            </View>
        </TouchableOpacity>
    )
};