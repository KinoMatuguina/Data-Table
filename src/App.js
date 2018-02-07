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
      sortedData: {},
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

  

  _filterResult(){
    
      // let selectedFilter = this.refs.selectFilter.options[this.refs.selectFilter.selectedIndex].value;
      // console.log(selectedFilter)
      // Data.mock = this.state.copyOfData; // reset original data
  
      // if(this.refs.filterKey.value.length > 0){
      //   Data.mock = Data.mock.filter((item, index)=>{
  
      //     let itemValue = item[selectedFilter] + '';
      //     let textBoxValue = this.refs.filterKey.value + '';
      
      //     return(itemValue === textBoxValue);
      //   });
      // }
  
      // this.setState({reRender: true});
      console.log("kino")
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

  _sort(columnKey, event) {
    let self = this;
    dataTableFunction._changeDataOrder(columnKey, function(data) {
      console.log(data);
      Data.mock = data.data;
      self.setState({
        sortedData: data.sortData
      }, function() {
        
      })
    })

  }

  _fieldDirection(columnKey) {
    // const dir = this.state.dataSort;
    
    // if(this.state.sortedData[columnKey] !== undefined) {
    //   if(this.state.sortedData[columnKey] === 1) {
    //     document.getElementById("column"+columnKey).className = "column-"+columnKey + " sort-up"
    //   } else {          
    //     document.getElementById("column"+columnKey).className = "column-"+columnKey + " sort-down"
    //   }
    // } else{
    //   document.getElementById("column"+columnKey).className = "column-"+columnKey
    // }
    console.log(document.getElementById(columnKey))
    // console.log()
  }

  // componentDidMount() {}

  _clickGear(data) {
    console.log(data);
  }

  _handleChangeFilter(event, value) {
    // console.log(value)
  }


  render() {
    let self = this;
    return (<F4DataTable
      data={Data.mock}
      columnOrder={columnOrder}
      onColumnResize={this._onColumnResizeEndCallback}
      filterResult={this._filterResult.bind(this)}
      hasSelectAll={true}
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
            
            <p id="name">
              <span>{"name"}</span>
            </p>
            {this._fieldDirection("name")}
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
            
            <span id="email">
              {"email"}
              
            </span>  
            {this._fieldDirection("email")}  
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
