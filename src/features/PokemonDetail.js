import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function PokemonDetail({ route }) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [pokemonResistances, setPokemonResistances] = useState([]);
  const { pokemon } = route.params || {};

  useEffect(() => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/" + pokemon.id)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetail(data);
        const weaknesses = data.apiResistances.filter(
          (resistance) => resistance.damage_multiplier > 1
        );
        setPokemonResistances(weaknesses);
      });
  }, [pokemon.id]);

  if (!pokemonDetail) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.id}> N° {pokemonDetail.id} </Text>
        <Text style={styles.name}> {pokemonDetail.name}</Text>

        <Image
          source={{ uri: pokemonDetail.image }}
          style={styles.pokemonImage}
        />

        {/* TYPES */}
        <Text style={styles.sectionTitle}>Types</Text>
        <FlatList
          data={pokemonDetail.apiTypes}
          keyExtractor={(item) => item.name}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.typeBadge}>
              <Image source={{ uri: item.image }} style={styles.typeIcon} />
              <Text style={styles.badgeText}>{item.name}</Text>
            </View>
          )}
        />

        {/* FAIBLESSES */}
        <Text style={styles.sectionTitle}>Faiblesses</Text>
        <FlatList
          data={pokemonResistances}
          keyExtractor={(item) => item.name}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.weaknessBadge}>
              <Text style={styles.badgeText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D32F2F', // rouge pokedex
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  id: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F5F5F5',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 160,
    height: 160,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  weaknessBadge: {
    backgroundColor: '#FFCDD2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 5,
  },
  typeIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
