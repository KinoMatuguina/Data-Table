'use strict';

import React, { Component } from 'react';
import {Cell, Column} from 'fixed-data-table-2';
import {LinkCell, ImageCell, CollapseCell} from "./DataTableCell/DataTableCell"
import F4DataTable from './F4DataTable/F4DataTable'
import Fonticon from 'react-fontawesome';
import Data from './Data'

let columnOrder = [
  "picture",
  "name",
  "email",
  "options"
]

let mockData = [
  {
    "name": "picture",
    "type": "image",
    "isReorderable": true,
  },
  {
    "name": "name",
    "type": "text",
    "isReorderable": true,
  },
  {
    "name": "email",
    "type": "link",
    "isReorderable": true,
  },
  {
    "name": "email",
    "type": "component",
    "isReorderable": true,
  }
]

// let columnWidth = {
//   "name": 300,
//   "picture": 50,
//   "email": 300,
// }

let dataTableFunction;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: null,
      dataSort: {},
      columnWidth: {
        "name": 300,
        "picture": 50,
        "email": 300,
      }
    }

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    // this._clickGear = this._clickGear.bind(this);
    // this._fieldDirection = this._fieldDirection.bind(this);
    
  }

  componentDidMount(){
    // console.log(this.state.dataTable);
  }

  _sort(columnKey, event) {
    // console.log(columnKey)
    // let data = 
    let self = this;
    dataTableFunction._changeDataOrder(columnKey, function(data) {
      console.log(data);
      Data.mock = data.data;
      self.setState({
        dataSort: data.sortData
      })
    })
    // console.log()
 
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    
    this.setState({
      columnWidth : {
        ...this.state.columnWidth,
        [columnKey] : newColumnWidth
      }
    }, function() {
      this.forceUpdate();
    })
    console.log(this.state.columnWidth);
    
    console.log(newColumnWidth)
    console.log(columnKey)

  }

  _fieldDirection(columnKey) {
    const dir = this.state.dataSort;
    
    if(dir[columnKey] !== undefined) {
      console.log("Has column key")
      if(dir[columnKey] === 1) {
        console.log("returning up")    
        return <Fonticon style={{"fontSize":"1.5em", "marginLeft": "40px"}} name="sort-up" />
      } else {
        console.log("returning down")            
        return <Fonticon style={{"fontSize":"1.5em", "marginLeft": "40px"}} name="sort-down" />
      }
    } else{
      console.log("returning null")            
      return null
    }
  }

  _clickGear(data) {
    console.log(data);
  }

  render() {
    return (<F4DataTable
      data={Data.mock}
      columnOrder={columnOrder}
      onColumnResize={this._onColumnResizeEndCallback}
      hasSelectAll={false}
      isReorderable={true}
      isResizable={true}
      rowHeight={50}
      headerHeight={50}
      tableHeigth={500}
      tableWidth={1000}
      tableRef={el => { dataTableFunction = el; console.log(dataTableFunction) }}
     >
     <Column
        allowCellsRecycling={true}
        columnKey={"picture"}
        key={"picture"}
        isReorderable={false}
        isResizable={true}    
        width={50}
        header={
          <Cell> 
            <span>
              {this._fieldDirection("picture")}
            </span>    
          </Cell>
        }
        cell={props => (
          <ImageCell src={(Data.mock.length !== 0) ? Data.mock[props.rowIndex]["picture"] : null} />
        )}
        width={this.state.columnWidth["picture"]}
        
      />
      
      <Column
        allowCellsRecycling={true}
        columnKey={"name"}
        key={"name"}        
        isReorderable={true}
        isResizable={true}
        width={200}
        header={
          <Cell 
            onClick={this._sort.bind(this, "name")}
            style={{"cursor": "pointer", "textTransform": "uppercase"}}
          > 
            <span>
              {"name"}
              {this._fieldDirection("name")}
            </span>    
          </Cell>
        }
        cell={props => (
          <Cell {...props}>
            {
              (Data.mock.length !== 0) ? Data.mock[props.rowIndex]["name"] : null
            }
          </Cell>
          
        )}
        width={this.state.columnWidth["name"]}
        
      />
      <Column
        allowCellsRecycling={true}
        columnKey={"email"}
        key={"email"}
        isReorderable={true}
        width={200}
        isResizable={true}        
        header={
          <Cell 
            onClick={this._sort.bind(this, "email")}
            style={{"cursor": "pointer", "textTransform": "uppercase"}}
          > 
            <span>
              {"email"}
              {this._fieldDirection("email")}
            </span>    
          </Cell>
        }
        cell={props => (
          <LinkCell target={"_blank"} link={(Data.mock.length !== 0) ? "mailto:" + Data.mock[props.rowIndex]["email"] : null} >
            {Data.mock[props.rowIndex]["email"]}
          </LinkCell>
        )}
        width={this.state.columnWidth["email"]}
        
      />
      <Column
        allowCellsRecycling={true}
        columnKey={"options"}
        key={"options"}        
        isReorderable={true}
        width={200}
        isResizable={true}        
        header={
          <Cell>  
          </Cell>
        }
        cell={props => (
          <Cell {...props}>
            <Fonticon name={"gear"} onClick={this._clickGear.bind(this, Data.mock[props.rowIndex])} />
          </Cell>
          
        )}
        width={50}
        
      />
      
     </F4DataTable>)
  }
}

export default App;
