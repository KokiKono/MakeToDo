'use scripts';

import React from 'react';

import {
  Navigator,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import {
  Icon
} from 'native-base';

import realm from './Modles/Store';
import ToDoInput from './View/toDoInput';
import ToDoList from './View/toDoList';
import styles from './View/styles';

export default class MakeToDoApp extends React.Component{
  constructor(props){
    super(props);
    this._onPressMenu = this._onPressMenu.bind(this);
  }
  render(){
    let route ={
      title:'Make ToDo',
      component:ToDoInput,
      onPressRightButton:this._onPressMenu
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
    console.log('onPressMenu');
    let route={
      title:'MakeToDo-List',
      component:ToDoList
    }
    this.refs.nav.push(route);
  }
}
const RouteMapper = {
  LeftButton(route,navigator,index,navState){
    if(index === 0){
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
  Title(route,navigator,index,navState){
    return(
      <View style={styles.navBarView}>
        <Text style={styles.navBarTitleText}>{route.title}</Text>
      </View>
    );
  },
  RightButton(route,navigator,index,navState){
    if(index === 1){
      return null;
    }
    return(
      <TouchableOpacity onPress={route.onPressRightButton}>
        <View style={[styles.navBarView,styles.navBarRightButton]}>
          <Icon name='menu'/>
        </View>
      </TouchableOpacity>
    );
  }
}
