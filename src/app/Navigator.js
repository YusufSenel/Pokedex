import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonList from '../features/PokemonList';
import PokemonDetail from '../features/PokemonDetail';

const Stack = createNativeStackNavigator();


export default function Navigator() {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="list"
          options={{
            title: "Liste des Pokemons",
          }}
          component={PokemonList}
        />
        <Stack.Screen
          name="detail"
          options={{
            title: "Détail du Pokemon",
          }}
          component={PokemonDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}