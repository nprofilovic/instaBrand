import React from 'react';
import { Text, StyleSheet, Image, View, Container, Header, Body, Content, Platform } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
//Stack Navigator
import MainScreen from '../components/MainScreen';

// Tab Navigator
import HomeTab from '../components/AppTabNavigator/HomeTab';
import SearchTab from '../components/AppTabNavigator/SearchTab';
import AddProduct from '../components/AppTabNavigator/AddProduct';
import BrandProfileTab from '../components/AppTabNavigator/BrandProfileTab';

export const AppStackNavigator = StackNavigator({
    Main: {
      screen: MainScreen
    }
  })

export const AppTabNavigator = TabNavigator({
    HomeTab: {screen: HomeTab},
    SearchTab: {screen: SearchTab},
    AddProduct: {screen: AddProduct},
    BrandProfileTab: {screen: BrandProfileTab}
  },{
      animationEnabled: true,
      swipeEnabled: true,
      tabBarPosition: "bottom",
      tabBarOptions: {
          style: {
              ...Platform.select({
                  android: {
                      backgroundColor: 'white'
                  }
              })
          },
          activeTintColor: '#000',
          inactiveTintColor: '#d1cece',
          showLabel: false,
          showIcon: true
      }
  })