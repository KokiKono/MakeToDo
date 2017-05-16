'use strict';

import React from 'react';
import realm from '../Modles/Store'
import {
  Text
}from 'react-native';
import {
  Container,
  Content,
  InputGroup,
  Input,
  Button
} from 'native-base'
export default class ToDoInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    }
    this.writeToDo=this.writeToDo.bind(this);
  }
  render(){
    return(
      <Container>
        <Content>
          <InputGroup regular>
            <Input placeholder='ToDo Name'
              onChangeText={(text)=>this.setState({text})}
              value={this.state.text}/>
          </InputGroup>
          <Button full
            onPress={()=>this.writeToDo(this.state.text)}>
            <Text>Undo</Text>
         </Button>
        </Content>
      </Container>
    )
  }
  writeToDo(item){
    realm.write(()=>{
      realm.create('ToDo',{name:item});
    });
  }
}
