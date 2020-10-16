import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}}>
                {/* Em todas as telas, não aparecerá  o header gerado automaticamente */}

                <Screen name="OrphanagesMap" component={OrphanagesMap}/>
                <Screen name="OrphanageDetails" component={OrphanageDetails}/>
            </Navigator>
        </NavigationContainer>
    )
}