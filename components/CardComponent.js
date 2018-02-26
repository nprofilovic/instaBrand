import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';

export default class CardComponent extends Component {
    static navigationOptions = {
      headerLeft: <Icon name="ios-camera-outline" style={{paddingLeft: 10}} />,
      title: "InstaBrand",
      headerRight: <Icon name="ios-send-outline" style={{paddingRight:10}} />
    }

    render(){
        return(
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../images/insta-picture.jpg')} />
                <Body>
                  <Text>Brand One</Text>
                  <Text note>Feb 25, 2018</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('../images/insta-picture.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{height: 45}}>
              <Left>
                <Button transparent>
                  <Icon active name="ios-heart-outline" style={{color: 'black'}} />
                 
                </Button>
              
              
                <Button transparent>
                  <Icon active name="ios-chatbubbles-outline" style={{color: 'black'}} />
                 
                </Button>
              
                <Button transparent>
                   <Icon active name="ios-send-outline" style={{color: 'black'}} />
                </Button>
              </Left>
             
            </CardItem>
            <CardItem style={{height: 20}}>
              <Text>100 Likes</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>
                <Text style={{fontWeight: "900" }}> Brand One </Text>
                  This section only applies to projects made with react-native 
                  init or to those made with Create React Native App which have since ejected. 
                  For more information about ejecting, please see the guide on the Create React Native App repository.
                </Text>
              </Body>
            </CardItem>
          </Card>
         
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