import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/151')
      .then((response) => response.json())
      .then((data) => setPokemons(data));
  }, []);

  const formatId = (id) => id.toString().padStart(3, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('detail', { pokemon: item })}
          >
            <Text style={styles.id}>N°{formatId(item.id)}</Text>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D32F2F', // rouge pokedex
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  id: {
    fontSize: 14,
    color: '#777',
    width: 55,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
