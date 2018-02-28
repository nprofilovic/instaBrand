import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ListView } from 'react-native';
import { Icon, Card, CardItem, Thumbnail, Body, Left, Right, Button, Item, Input } from 'native-base';
import * as firebase from "firebase";
import {base} from '../server/firebase';

const products = [
  {
    
    name:'Product 1',
    link:'www.product.com',
    image: require('../images/nature.jpg'),
    color:'White',
    type:'Type',
    face:'front',
    pallete:'Big Pallete',
    about:'This section only applies to projects made with react-native init or to those made with Create React Native App which have since ejected.For more information about ejecting, please see the guide on the Create React Native App repository.',
    uid: 1,
    url:'',
},
{
  
  name:'Product 2',
  link:'www.product.com',
  image: require('../images/insta-picture.jpg'),
  color:'White',
  type:'Type',
  face:'front',
  pallete:'Big Pallete 2',
  about:'This section only applies to projects made with react-native init or to those made with Create React Native App which have since ejected.For more information about ejecting, please see the guide on the Create React Native App repository.',
  uid: 2,
  url:'',
}
]
const firebaseConfig = {
  // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyBHd5rL293B1TQ10tH4z4xDiEqAvBudHYM",
    authDomain: "instabrand-252aa.firebaseapp.com",
    databaseURL: "https://instabrand-252aa.firebaseio.com",
    projectId: "instabrand-252aa",
    storageBucket: "instabrand-252aa.appspot.com",
    messagingSenderId: "67091235208"
};



var data = []
export default class CardComponent extends Component {
    static navigationOptions = {
      headerLeft: <Icon name="ios-camera-outline" style={{paddingLeft: 10}} />,
      title: "InstaBrand",
      headerRight: <Icon name="ios-send-outline" style={{paddingRight:10}} />
    }
    constructor(props){
      super(props);
      
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

      this.state = {
          data: [],
          listViewData: data,
          newContact: ""
      }
    }

    componentWillMount(){
      this.getData();
    }

    getData(){
      var query = firebase.database().ref('product').orderByChild('date');
      
      query.on('value', (snapshot) => 
      {
          datas = [];   
          snapshot.forEach((child) => 
          {
              data.push(child.val());
          });

          this.setState({ data: datas });
      });
    }

    addRow(data) {

      var key = firebase.database().ref('/product').push().key
      firebase.database().ref('/product').child(key).set({ name: data })
    }

    render(){
      var dateFormat = require('dateformat');
        return(
            <View>
              <ListView 
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                enableEmptySections
                renderRow = {item => 
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{dateFormat(item.date, "ddd, mmmm dS, yyyy")}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={item.image} style={{height: 200, width: null, flex: 1}}/>
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
                   <Text><Text style={{fontWeight: "900" }}>Link: </Text>{item.link}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Color: </Text>{item.color}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Product Type: </Text>{item.type}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Face Part: </Text>{item.face}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Pallete: </Text>{item.pallete}</Text>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Text>
                      <Text style={{fontWeight: "900" }}>{item.name} </Text>
                        {item.about}
                      </Text>
                    </Body>
                  </CardItem>
                  
                </Card>
                }
              />
            </View>
         
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