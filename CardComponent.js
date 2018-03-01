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
          loading: false,
          refreshing: false,
      }
    }

    componentDidMount(){
      this.getData();
    }

  
    getData(){
      var that = this

      firebase.database().ref('/product').orderByChild('date').on('child_added', function (data) {
  
        var newData = [...that.state.listViewData]
        newData.push(data)
        that.setState({ listViewData: newData })
  
      })
    }

    async deleteRow(secId, rowId, rowMap, data) {

      await firebase.database().ref('product/' + data.key).set(null)
  
      
      var newData = [...this.state.listViewData];
      newData.splice(rowId, 1)
      this.setState({ listViewData: newData });
  
    }
    handleRefresh = () => {
      this.setState(
        {
          refreshing: true
        },
        () => {
          this.getData();
        }
      );
    };

    render(){
      var dateFormat = require('dateformat');
        return(
            <View>
              <ListView 
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                onRefresh={this.handleRefresh}
                enableEmptySections
                renderRow = {(data, secId, rowId, rowMap ) => 
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={data.val().image} />
                      <Body>
                        <Text>{data.val().name}</Text>
                        <Text note>{dateFormat(data.val().date, "dS mmm, yyyy")}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={data.val().image} style={{height: 200, width: null, flex: 1}}/>
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
                    <Body></Body>
                    <Right>
                    <Button transparent onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                        <Icon active name="ios-trash-outline" style={{color: 'black'}} />
                      
                      </Button>
                    </Right>

                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Link: </Text>{data.val().link}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Color: </Text>{data.val().color}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Product Type: </Text>{data.val().type}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Face Part: </Text>{data.val().face}</Text>
                  </CardItem>
                  <CardItem style={{height: 20}}>
                   <Text><Text style={{fontWeight: "900" }}>Pallete: </Text>{data.val().pallete}</Text>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Text>
                      <Text style={{fontWeight: "900" }}>{data.val().name} </Text>
                        {data.val().about}
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