import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useFonts} from 'expo-font'
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  //só mostrará a tela se as fontes tiverem sido carregadas
  if(!fontsLoaded){
    return null;
  }

  return (
    <Routes/>
  );
}



// Dependências no projeto com EXPO:
// expo install react-native-gesture-handler react-native-reanimated ...
// ... react-native-screens react-native-safe-area-context @react-native-community/masked-view