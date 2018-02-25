import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';
import { AppTabNavigator } from '../service/AppNavigation';

export default class MainScreen extends Component {
    static navigationOptions = {
      headerLeft: <Icon name="ios-camera-outline" style={{paddingLeft: 10}} />,
      title: "InstaBrand",
      headerRight: <Icon name="ios-send-outline" style={{paddingRight:10}} />
    }

    render(){
        return(
      
            <AppTabNavigator />
         
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})