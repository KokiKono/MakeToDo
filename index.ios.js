/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';
import{
  Container,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Title,
  Button,
  Content
} from 'native-base'

export default class MakeToDo extends Component {
  constructor(props){
    super(props);
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.state={
      text:'plese name',
      dataSource:ds.cloneWithRows(this._genRows([])),
      datas:[]
    }
  }
  render() {
    return(
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>MakeTodo</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <TextInput
          style={{height:40,borderColor:'red',borderWidth:1}}
          onChangeText={(text)=>this.setState({text})}
          value={this.state.text}/>
          <Button full
            onPress={()=>this.addItem(this.state.text)}>
            <Text>Undo</Text>
          </Button>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}/>
        </Content>
      </Container>
    );
  }
  addItem(item:string){
    this.state.datas.push(item);
    this.setState({dataSource: this.state.dataSource.cloneWithRows( this.state.datas )});
  }
  _renderRow(rowData: string, sectionID: number, rowID: number,
     highlightRow: (sectionID: number, rowID: number) => void){
     return(
       <View>
         <Text>{rowData}</Text>
       </View>
     );
  }
  _genRows(items:Array<string>):Array<string>{
    return items;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MakeToDo', () => MakeToDo);