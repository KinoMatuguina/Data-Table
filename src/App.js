'use strict';

import React, { Component } from 'react';
import F4DataTable from './F4DataTable/F4DataTable'
import {Cell, Column} from 'fixed-data-table-2';
import Fonticon from 'react-fontawesome';
import Data from './Data'



let tableRef;
let cellClick;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this._clickActionGear = this._clickActionGear.bind(this)
    this._clickGear = this._clickGear.bind(this);
    this._clickEdit = this._clickEdit.bind(this);
    this._sortCallBack = this._sortCallBack.bind(this);
    this._paginationCallBack = this._paginationCallBack.bind(this);
  }

  _clickActionGear(index) {
    console.log(index)
  }

  _createData() {
    return [
      {
        "headerTitle": "balance",
        "name": "balance", 
        "type": "text", 
        "width": 300, 
        "isReorderable": false,
        "isNotHidden": false,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "option",
        "name": "",
        "type": "abstract", 
        "width": 300, 
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": false,
        "cell" : props => { return <Cell>{tableRef.state.data[props.rowIndex]["name"]}</Cell>},
      },
      {
        "headerTitle": "",
        "name": "picture",
        "type": "image",
        "width": 50,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": false
      },
      {
        "headerTitle": "age",
        "name": "age",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "eyeColor",
        "name": "eyeColor",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "name",
        "name": "name",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "gender",
        "name": "gender",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "company",
        "name": "company",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "email",
        "name": "email",
        "type": "link",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "phone",
        "name": "phone",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "address",
        "name": "address",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "about",
        "name": "about",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "registered",
        "name": "registered",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "latitude",
        "name": "latitude",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "longitude",
        "name": "longitude",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
    ]
  }

  _sortCallBack(data) {
    console.log(data);
  }

  _paginationCallBack(data) {
    console.log(data);
  }
  
  _createCloneData() {
    return [
      {
        "headerTitle": "balance",
        "name": "balance", 
        "type": "text", 
        "width": 300, 
        "isReorderable": false,
        "isNotHidden": false,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "option",
        "name": "",
        "type": "abstract", 
        "width": 300, 
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": false,
        "cell" : props => { return <Cell>{tableRef.state.data[props.rowIndex]["name"]}</Cell>},
      },
      {
        "headerTitle": "",
        "name": "picture",
        "type": "image",
        "width": 50,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": false
      },
      {
        "headerTitle": "age",
        "name": "age",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "eyeColor",
        "name": "eyeColor",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "name",
        "name": "name",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "gender",
        "name": "gender",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "company",
        "name": "company",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "email",
        "name": "email",
        "type": "link",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "phone",
        "name": "phone",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "address",
        "name": "address",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "about",
        "name": "about",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "registered",
        "name": "registered",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "latitude",
        "name": "latitude",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
      {
        "headerTitle": "longitude",
        "name": "longitude",
        "type": "text",
        "width": 300,
        "isReorderable": true,
        "isNotHidden": true,
        "isResizable": true,
        "fixed": false,
        "isSortable": true
      },
    ]
  }

  _createItemPerPage() {
    return [{
      "text": 1,
      "value": 1
    }, {
      "text": 5,
      "value": 5
    }, {
      "text": 10,
      "value": 10
    }, {
      "text": 15,
      "value": 15
    }]
  }

  _clickGear(event) {
    
  }

  _clickEdit() {

  }
  
  componentDidMount() {
    console.log(tableRef)
  }

  render() {
    const self = this;
    return (

      // - [x] total length and count
      // - [x] iitial display on table
      // - [x] option default sort
      // - [ ] tooltip
      // - [x] copy detail
      // - [x] print button
      // - [x] data of current state table
      // - [x] design
      
      <F4DataTable
        options={this._createData()}
        cloneOptions={this._createCloneData()}
        data={Data.mock}
        hasSelectAll={true}
        hasExpandable={true}
        headerHeight={50}
        rowHeight={50}
        tableWidth={1000}
        tableHeight={500}
        itemsPerPage={10}
        defaultSortParameter={"name"}
        onPaginationCallback={this._paginationCallBack}
        isServerSidePagination={true}
        isServerSideSort={true}
        onSortCallback={this._sortCallBack}
        listOfItemPerPage={this._createItemPerPage()}
        dataTableRef={(table) => tableRef = table}
      >

        {/* {<Column
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
            
          </Cell>
        )}
        />} */}
        
      </F4DataTable>
    )
    
  }
}

export default App;
