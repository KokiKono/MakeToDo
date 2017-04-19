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
  Content,
  InputGroup,
  Input,
  Icon
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
          <Right>
            <Icon name="menu"/>
          </Right>
        </Header>
        <Content paddr>
          <InputGroup regular>
            <Input placeholder='ToDo名'
              onChangeText={(text)=>this.setState({text})}
              value={this.state.text}/>
          </InputGroup>
          <Button full
            onPress={()=>this.writeToDo(this.state.text)}
            style={{paddingTop:10}}>
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
