import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Helper from '../../server/helper';
import ImagePicker from 'react-native-image-picker';
import * as firebase from "firebase";
import Firebase from '../../server/firebase';



export default class AddProduct extends Component {
    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => ( <Icon name="ios-add-circle" style={{color: tintColor}} />
        )
    }
    constructor(props){
      super(props);
      
      this.state = {
        data:[]
      
      }

     
    }

    async componentWillMount () {
      try {
          let name = await firebase.auth();
          this.setState({
              uid: name.uid
          })
      } catch(error){
          console.log(error)
      }
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

      this.props.navigation.navigate('CardComponent');
      console.log('====================================');
      console.log("Save button");
      console.log('====================================');
      
    }
    render(){
        return(
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Product name</Label>
                <Input value={this.state.name} onChangeText={(name) => this.setState({name})}/>
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
            <Button style={styles.button} onPress={this.saveForm.bind(this)} title="Save" color="#841584" />
              
            
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