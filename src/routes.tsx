import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'

import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import Header from './components/Header'

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor: '#f2f3f5'}}}>
                {/* Em todas as telas, não aparecerá  o header gerado automaticamente */}
                {/* cardStyle: estilização padrão das telas */}

                <Screen name="OrphanagesMap" component={OrphanagesMap}/>

                <Screen 
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown:true, //Nesse específico haverá header
                        header: ()=> <Header showCancel={false} title="Orfanato"/> //passando o novo componente para o Header
                    }}
                />

                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown:true,
                        header: ()=> <Header title="Informe os dados"/>
                    }}
                />

                <Screen 
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown:true,
                        header: ()=> <Header title="Selecione o mapa"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}