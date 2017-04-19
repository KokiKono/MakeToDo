'use scripts';

import React from 'react';

import {
  Navigator,
  Platform,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
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
  Icon,
  List,
  ListItem
} from 'native-base';

import realm from '../Modles/todo';
import {ListView} from 'realm/react-native';
import styles from './styles';

export default class TodoInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    }
    this._onPressMenu = this._onPressMenu.bind(this);
  }
  render(){
    const routes=[
      {title:'MakeToDo-Input',index:0,component:InputView,onPressList:this._onPressMenu},
      {title:'MakeToDo-List',index:1,component:ToDoList,onPressList:null}
    ];
    let route={
      title:'MakeToDo-Input',index:0,component:InputView,onPressRightButton:this._onPressMenu
    };
    let navigatorBar = (
      <Navigator.NavigationBar routeMapper={RouteMapper} style={styles.navBar}/>
    );
    return(
        <Navigator
          ref='nav'
          initialRoute={route}
          sceneStyle={styles.navScene}
          style={styles.navigator}
          renderScene={(route,navigator)=>
            <route.component title={route.title} navigator={navigator}/>
          }
          navigationBar={navigatorBar}/>
    );
  }
  _onPressMenu(){
    let route={
      title:'MakeToDo-List',
      component:ToDoList
    }
    this.refs.nav.push(route);
  }
}
class InputView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }
  render(){
    return(
      <Container>
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



class ToDoList extends React.Component{
  constructor(props){
    super(props);
    let dataSource=new ListView.DataSource({
      rowHasChanged(a,b){
        return a !== b;
      }
    });
    this.state={
      dataSource:realm.objects('ToDo')
    }
  }
  render(){
    return(
      <View>
        <List
          dataArray={this.state.dataSource}
          renderRow={(item)=>
            <ListItem>
              <Text>{item. name}</Text>
            </ListItem>
          }
          ></List>
      </View>
    );
  }
}
const RouteMapper = {
  LeftButton:(route,navigator,index,navState)=>{
    if(route.index === 0){
      return null;
    }
    return(
      <TouchableOpacity onPress={()=>navigator.pop()}>
        <View style={[styles.navBarView,styles.navBarLeftButton]}>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    );
  },
  Title:(route,navigator,index,navState)=>{
    return(
      <View style={styles.navBarView}>
        <Text style={styles.navBarTitleText}>{route.title}</Text>
      </View>
    );
  },
  RightButton:(route,navigator,index,navState)=>{
    if(index === 1){
      return null;
    }
    return(
      <TouchableOpacity onPress={route.onPressRightButton}>
        <View style={[styles.navBarView,styles.navBarRightButton]}>
          <Icon name="menu"/>
        </View>
      </TouchableOpacity>
    );
  }
};
