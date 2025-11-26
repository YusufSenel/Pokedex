import { View, Text } from 'react-native';

export default function PokemonDetail({route}) {
    const { pokemon } = route.params || {};
    return (
        <View>
            <Text> Pokemon Detail Works ! </Text>
            {pokemon && <Text>{pokemon.name}</Text>}
        </View>
    );
}