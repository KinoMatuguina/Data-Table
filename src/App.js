'use strict';

import React, { Component } from 'react';
import F4DataTable from './F4DataTable/F4DataTable'
import {Cell, Column} from 'fixed-data-table-2';
import Fonticon from 'react-fontawesome';
import Data from './Data'

let shallowCopy = [
  {
    "headerTitle": "balance",
    "name": "balance", 
    "type": "text", 
    "width": 300, 
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "",
    "name": "picture",
    "type": "image",
    "width": 50,
    "isReorderable": true,
    "fixed": false,
    "isSortable": false
  },
  {
    "headerTitle": "age",
    "name": "age",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "eyeColor",
    "name": "eyeColor",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "name",
    "name": "name",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "gender",
    "name": "gender",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "company",
    "name": "company",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "email",
    "name": "email",
    "type": "link",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "phone",
    "name": "phone",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "address",
    "name": "address",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "about",
    "name": "about",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "registered",
    "name": "registered",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "latitude",
    "name": "latitude",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "longitude",
    "name": "longitude",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
]

let options = [
  {
    "headerTitle": "balance",
    "name": "balance", 
    "type": "text", 
    "width": 300, 
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "",
    "name": "picture",
    "type": "image",
    "width": 50,
    "isReorderable": true,
    "fixed": false,
    "isSortable": false
  },
  {
    "headerTitle": "age",
    "name": "age",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "eyeColor",
    "name": "eyeColor",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "name",
    "name": "name",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "gender",
    "name": "gender",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "company",
    "name": "company",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "email",
    "name": "email",
    "type": "link",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "phone",
    "name": "phone",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "address",
    "name": "address",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "about",
    "name": "about",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "registered",
    "name": "registered",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "latitude",
    "name": "latitude",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
  {
    "headerTitle": "longitude",
    "name": "longitude",
    "type": "text",
    "width": 300,
    "isReorderable": true,
    "fixed": false,
    "isSortable": true
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this._clickActionGear = this._clickActionGear.bind(this)
  }

  _clickActionGear(index) {
    console.log(index)
  }

  render() {
    const self = this;
    return (

      // - [x] total length and count
      // - [ ] iitial display on table
      // - [ ] option default sort
      // - [ ] tooltip
      // - [ ] copy detail
      // - [ ] print button
      // - [ ] data of current state table
      // - [ ] design
      
      <F4DataTable
        options={options}
        cloneOptions={shallowCopy}
        data={Data.mock}
        hasSelectAll={true}
        hasExpandable={true}
        headerHeight={50}
        rowHeight={50}
        tableWidth={1000}
        tableHeight={500}
        itemsPerPage={10}
      >

        <Column
        allowCellsRecycling={true}
        columnKey={"action"}
        isReorderable={true}
        width={50}
        header={
          <Cell> 
            
          </Cell>
        }
        cell={props => (
          <Cell>
            <Fonticon name={"gear"} onClick={this._clickActionGear.bind(this, Data.mock[props.rowIndex])} />
          </Cell>
        )}
        />
        
      </F4DataTable>
    )
    
  }
}

export default App;
