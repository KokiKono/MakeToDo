'use scripts';

import React from 'react';

import {
  Navigator,
  Platform,
  StatusBar,
  Text,
  View,
  TextInput
} from 'react-native';

import{
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Content
} from 'native-base';

import realm from '../Modles/todo'

export default class TodoInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }
  render(){
    return(
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>MakeToDo-Input</Title>
          </Body>
          <Right/>
        </Header>
        <Content paddr>
          <TextInput
            style={{height:40,borderColor:'green',borderWidth:1}}
            onChangeText={(text)=>this.setState({text})}
            value={this.state.text}
            />
        </Content>
        <Content paddr>
          <Button full
            onPress={()=>this.writeToDo(this.state.text)}>
            <Text>登録</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  writeToDo(item){
    realm.write(()=>{
      realm.create('ToDo',{name:item});
    });
  }
}
