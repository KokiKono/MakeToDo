'use strict';

import React from 'react';
import {ListView} from 'realm/react-native';
import {
  View,
  Text
} from 'react-native';
import {
  List,
  ListItem
} from 'native-base';
import realm from '../Modles/todo';

export default class ToDoList extends React.Component{
  constructor(props){
    super(props);

    let dataSource=new ListView.DataSource({
      rowHasChanged(a,b){
        //ToDo名が異なる場合にのみ
        return a.name !== b.name;
      }
    });
    var items = realm.objects('ToDo');
    this.state={
      dataSource:items
    }
    //this.renderRowの読み込み
    this.renderRow=this.renderRow.bind(this);
  }
  render(){
    return(
      <View>
        <List
          dataArray={this.state.dataSource}
          renderRow={this.renderRow}
          ></List>
      </View>
    );
  }
  _cloneDataSource(dataSource,props){
    let items=props.items;
    return dataSource.cloneWithRowsAndSecrions(items);
  }
  renderRow(item,sectionIndex,rowIndex){
    return(
      <ListItem>
        <Text>{item.name}</Text>
      </ListItem>
    );
  }
}
