'use strict';

import Realm from 'realm';

class Store extends Realm.Object{}
ToDo.schema={
  name:'ToDo',
  properties:{
    name:'string'
  }
};


export default new Realm({schema:[ToDo]});
