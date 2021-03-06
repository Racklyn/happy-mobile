import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { Feather } from '@expo/vector-icons' //importação da biblioteca. Icons já vem por padrão com o expo
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]) //será uma array de orfatos
    const navigation = useNavigation()

    useFocusEffect(()=>{ //Toda vez que a tela receber o foco, for mudada para elas
      api.get('orphanages').then(response=>{
        setOrphanages(response.data)
      })
    })

    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', {id})
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition')
  }

    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} //caso for no IOS, também usará o GoogleMaps
                style={styles.map}
                initialRegion={{
                latitude: -9.4142464,
                longitude: -36.6247936,

                //cálculo relacionado com o ZOOM do mapa:
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
                }}
            >
                {orphanages.map(orphanage=>{
                  return(
                    <Marker
                      key={orphanage.id}
                      icon={mapMarker}
                      calloutAnchor={{ //offset do callout em relação ao marker 
                          x: 2.7,
                          y: 0.8
                      }}
                      coordinate={{
                          latitude: orphanage.latitude,
                          longitude: orphanage.longitude,
                      }}
                    >  
                      <Callout tooltip onPress={()=>handleNavigateToOrphanageDetails(orphanage.id)}> 
                      {/* tooltip: indicando que a estilização será feita do zero, por conta própria */}
                          <View style={styles.calloutContainer}>
                          <Text style={styles.calloutText}>
                              {orphanage.name}
                          </Text>
                          </View>
                      </Callout>
                    </Marker>
                  )
                })}
            </MapView>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

                <RectButton
                  style={styles.createOrphangeButton}
                  onPress={handleNavigateToCreateOrphanage}
                >
                  <Feather name='plus' size={20} color="#FFF" />
                </RectButton>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3, //elevação, gerando sombra no fundo
    },
    calloutText:{
      color: '#0089A5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3, //elevação, gerando sombra no fundo
    },
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8FA7B3'
    },
    createOrphangeButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15C3D6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });