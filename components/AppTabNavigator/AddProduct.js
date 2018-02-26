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
      Firebase.init()
      this.state = {
        imagePath: '',
        imageHeight: '',
        imageWidth: '',
        name:'',
        link:'',
        color:'',
        type:'',
        face:'',
        pallete:'',
        about:'',
        uid:'',
        url:'',
      
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
      console.log('====================================');
      console.log("Save button");
      console.log('====================================');
      if(this.state.uid){
        try {
          this.state.name ? Helper.setProductName(this.state.uid, this.state.name) : null
          this.state.link ? Helper.setProductLink(this.state.uid, this.state.link) : null
          this.state.color ? Helper.setProductColor(this.state.uid, this.state.color) : null
          this.state.type ? Helper.setProductType(this.state.uid, this.state.type) : null
          this.state.face ? Helper.setProductFace(this.state.uid, this.state.face) : null
          this.state.pallete ? Helper.setProductPallete(this.state.uid, this.state.pallete) : null
          this.state.about ? Helper.setProductAbout(this.state.uid, this.state.about) : null
          this.state.url ? Helper.setProductUrl(this.state.uid, this.state.url) : null
          this.props.navigation.navigate('HomeTab');

        } catch(error){
          console.log(error);
        }
      }
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