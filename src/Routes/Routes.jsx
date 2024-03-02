import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/Home';

const Tab = createBottomTabNavigator();


const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                {/* <Tab.Screen name="ChooseLocation" component={SettingsScreen} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default Routes;
