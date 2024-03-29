import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/Home';
import Icon from 'react-native-vector-icons/AntDesign';
import ChooseLocation from '../screen/ChooseLocation/ChooseLocation';

const Tab = createBottomTabNavigator();


const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ color }) => <Icon name="home" size={25} color={color} />,
                    tabBarActiveTintColor: "#FF5159",

                }} />
                <Tab.Screen name="ChooseLocation" component={ChooseLocation} options={{
                    tabBarItemStyle: { display: "none" }
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default Routes;
