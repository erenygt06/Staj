import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Sayfa1 from '../../Page/Work1/Sayfa1';
import KayitOl from '../../Page/Work1/KayitOl';
import RoomsScreen from '../../Page/Work1/RoomsScreen';
import ChatScreen from '../../Page/Work1/ChatScreen'; // ChatScreen'i içe aktar

const Stack = createStackNavigator();

const Work1Rout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sayfa1">
        {/* Giriş Sayfası */}
        <Stack.Screen 
          name="Sayfa1" 
          component={Sayfa1} 
          options={{ title: 'Giriş Yap' }} 
        />
        {/* Kayıt Ol Sayfası */}
        <Stack.Screen 
          name="KayitOl" 
          component={KayitOl} 
          options={{ title: 'Kayıt Ol' }} 
        />
        {/* Ana Sayfa (Oda Listesi) */}
        <Stack.Screen 
          name="Anasayfa" 
          component={RoomsScreen} 
          options={{ title: 'Sohbet Odaları' }} 
        />
        {/* ChatScreen */}
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={({ route }) => ({ title: `${route.params.roomName} Odası` })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Work1Rout;
