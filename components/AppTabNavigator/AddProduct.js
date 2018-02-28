import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon, Container, Header, Content, Form, Item, Input, Label,  } from 'native-base';
import Helper from '../../server/helper';
import ImagePicker from 'react-native-image-picker';
import * as firebase from "firebase";
import {base} from '../../server/firebase';


var data = []

const date = Date.now();
export default class AddProduct extends Component {
    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => ( <Icon name="ios-add-circle" style={{color: tintColor}} />
        )
    }
    constructor(props){
      super(props);
      
      this.state = {
        listViewData: data,
        newProduct:'',
        date: date,
        name:'',
        link:'',
        image: '',
        color:'',
        type:'',
        face:'',
        pallete:'',
        about:'',
        uid: '',
        url:'',
      
      }
      this.productRef = this.getRef().child('product')
     
    }

    getRef(){
      return firebase.database().ref();
    }
    componentWillMount(){
      this.getProduct(this.productRef);
    }

    getProduct(productRef){
      productRef.on('value', (snap) => {
        let products = [];
        snap.forEach((child) => {
          products.push({
            name: child.val().name,
            date: child.val().date,
            _key: child.key,
            link: child.val().link,
            color: child.val().color,
            type: child.val().type,
            face: child.val().face,
            pallete: child.val().pallete,
            about: child.val().about,
            url: child.val().url,
          });
        });
      });

    
    }

    openImagePicker(){
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }
      ImagePicker.showImagePicker(options, (response) => {
        if(response.didCancel){
          console.log('User cancel image picker');
        } else if(response.error){
          console.log('Error'+ response.error);
        } else if(response.customButton){
          console.log('User tapped custom button'+ response.customButton);
        } else {
          this.setState({
            imagePath: response.url,
            imageHeight: response.height,
            imageWidth: response.width
          })
        }
      })
    }

    saveForm(){

      var key = firebase.database().ref('/product').push().key
      firebase.database().ref('/product').child(key).set({newProduct: data})
      
    }

    addRow(data) {
     

     this.productRef.push({
       name: this.state.name, 
       link: this.state.link,
       color: this.state.color,
       type: this.state.type,
       face: this.state.face,
       pallete: this.state.pallete,
       about: this.state.about,
       url: this.state.url,  
       date: this.state.date 
    })
      this.props.navigation.navigate('HomeTab');
    }
    render(){
      
        return(
          <Content>
            <Form>
              <Item floatingLabel >
                <Label>Product Name</Label>
                <Input value={this.state.name}  onChangeText={(name) => this.setState({name})}/>
              </Item>
              <Item floatingLabel >
                <Label>Purchase link</Label>
                <Input value={this.state.link} onChangeText={(link) => this.setState({link})} />
              </Item>
              <Item floatingLabel >
                <Label>Color</Label>
                <Input value={this.state.color} onChangeText={(color) => this.setState({color})} />
              </Item>
              <Item floatingLabel >
                <Label>Product type</Label>
                <Input value={this.state.type} onChangeText={(type) => this.setState({type})} />
              </Item>
              <Item floatingLabel >
                <Label>Face part</Label>
                <Input value={this.state.face} onChangeText={(face) => this.setState({face})} />
              </Item>
              <Item floatingLabel >
                <Label>Pallete</Label>
                <Input value={this.state.pallete} onChangeText={(pallete) => this.setState({pallete})} />
              </Item>
              <Item floatingLabel>
              <Label>About the product</Label>
              <Input value={this.state.about} onChangeText={(about) => this.setState({about})}  />
            </Item>
             
            </Form>
            <Button style={styles.button} onPress={() => this.addRow(this.state.name, this.state.link)} title="Save" color="#841584" ><Text>Save</Text></Button>
              
            
        </Content>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})