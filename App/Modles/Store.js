'use strict';

import Realm from 'realm';

class Store extends Realm.Object{}
Store.schema={
  name:'ToDo',
  properties:{
    name:'string'
  }
};


export default new Realm({schema:[Store]});
