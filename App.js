import { View, StatusBar } from 'react-native';
import Navigator from './src/app/Navigator';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navigator />
      <StatusBar style="dark" animated={true} />
    </View>
  );
}

