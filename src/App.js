'use strict';

import React, { Component } from 'react';
import './App.css';
import DataTable from './DataTable/DataTable'
import {Cell, Column} from 'fixed-data-table-2';
import {LinkCell, ImageCell, CollapseCell} from "./DataTableCell/DataTableCell"
import Data from './Data'


let expandStyles = {
  'background-color': 'white',
  border: '1px solid #d3d3d3',
  'box-sizing': 'border-box',
  padding: '20px',
  overflow:'hidden',
  width: '100%',
  height: '100%'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedRows: new Set(),
      columnOrder: [
        "balance",
        "picture",
        "age",
        "eyeColor",
        "name",
        "gender",
        "company",
        "email",
        "phone",
        "address",
        "about",
        "registered",
        "latitude",
        "longitude"
      ],
      copyOfColumnOrder: [
        "balance",
        "picture",
        "age",
        "eyeColor",
        "name",
        "gender",
        "company",
        "email",
        "phone",
        "address",
        "about",
        "registered",
        "latitude",
        "longitude"
      ],
      columnWidth: {
        "balance": 300,
        "picture": 300,
        "age": 300,
        "eyeColor": 300,
        "name": 300,
        "gender": 300,
        "company": 300,
        "email": 300,
        "phone": 300,
        "address": 300,
        "about": 300,
        "registered": 300,
        "latitude": 300,
        "longitude": 300,
      }
    }

    this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._paginationNext = this._paginationNext.bind(this);
    this._paginationBack = this._paginationBack.bind(this);
    this._paginationGoto = this._paginationGoto.bind(this);
    this._changeMaxRow = this._changeMaxRow.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);

  }

  _rowExpandedGetter({rowIndex, width, height}) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null;
    }

    const style = {
      height: height,
      width: width - 2,
    };

    return (
      <div style={style}>
        <div className={expandStyles}>
            expanded content
        </div>
      </div>
    );

    console.log("_rowExpandedGetter")    
    console.log(rowIndex);
    console.log(width);
    console.log(height);

  }


  _handleCollapseClick(rowIndex) {
    console.log("_handleCollapseClick")
    console.log(rowIndex)

    const {collapsedRows} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    let scrollToRow = rowIndex;
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      collapsedRows: shallowCopyOfCollapsedRows
    }, function() {
      console.log(this.state.collapsedRows)
    });
    

  }

  _subRowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 80 : 0;
  }
  

  // method for reordering columns need to customize more for more usability.
  // this method will work on for a simple table.
  // need to improve more.
  _onColumnReorderEndCallback(event) {
    
    const {columnOrder} = this.state;
    
    // getting position of the colums need to reorder 
    let currentColIndex = columnOrder.indexOf(event.reorderColumn);
    let nextColIndex = columnOrder.indexOf(event.columnAfter);

    console.log("OLD COLUMN ORDER : " + columnOrder);
    // removing the reorder column
    columnOrder.splice(currentColIndex, 1);
    // move the reorder column
    columnOrder.splice(nextColIndex, 0, event.reorderColumn);
    
    console.log("NEW COLUMN ORDER : " + columnOrder);

    console.log(currentColIndex);
    console.log(nextColIndex);
    
    // setting sample data state.
    this.setState({
      columnOrder: columnOrder
    }, function() {
      console.log('DONE');
    })
    
    return columnOrder;

  }

  _showColumn(columnKey, event) {
    console.log(columnKey)
    let indexOfColumnKey = this.state.copyOfColumnOrder.indexOf(columnKey)
    let shallowCopyOfColumnOrder = this.state.columnOrder
    if (shallowCopyOfColumnOrder.indexOf(columnKey) === -1) {
      shallowCopyOfColumnOrder.splice(indexOfColumnKey, 0, columnKey);
    }

    this.setState({
      columnOrder: shallowCopyOfColumnOrder
    })
  }

  _hideColumn(columnKey, event) {
    console.log(columnKey)
    let shallowCopyOfColumnOrder = this.state.columnOrder
    let columnIndex = shallowCopyOfColumnOrder.indexOf(columnKey);
    if (columnIndex !== -1) {
      shallowCopyOfColumnOrder.splice(columnIndex, 1);
    }
    
    this.setState({
      columnOrder: shallowCopyOfColumnOrder
    })
  }

  _paginationNext() {

  }

  _paginationBack() {

  }

  _paginationGoto() {
    
  }

  _changeMaxRow() {
    
  }

  _onColumnResizeEndCallback() {
    
  }

  render() {
    return (
      <div className="App">
        <DataTable 
          headerHeight={50} 
          rowsCount={Data.mock.length} 
          onColumnReorderEndCallback={this._onColumnReorderEndCallback}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          subRowHeightGetter={this._subRowHeightGetter}
          rowExpanded={this._rowExpandedGetter}
          rowHeight={50}
          isColumnReordering={false} 
          width={1000} 
          height={500}
          {...this.props}>
          
          <Column
            cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={this.state.collapsedRows} />}
            fixed={true}
            width={30}
          />
        {
          this.state.columnOrder.map(function(columnKey, index) {
            return (
              <Column
              allowCellsRecycling={true}
              columnKey={columnKey}
              key={index}
              isReorderable={true}
              header={<Cell>{columnKey}</Cell>}
              cell={props => (
                <Cell {...props}>
                  {Data.mock[props.rowIndex][columnKey]}
                </Cell>
              )}
              width={100}
              />
            );
          })
        }
          
        </DataTable>
        <div className="pagination">
          <input type="text" />
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>         
          <button onClick={this._paginationNext}>Next</button>
          <button onClick={this._paginationBack}>Back</button>          
        </div>
        <div className="hide-columns">
          {this.state.copyOfColumnOrder.map(function(columnKey, index) {
            return (
              <div style={{"textAlign":"left"}} key={index}>
                  <p>{columnKey}</p>
                  <button onClick={this._showColumn.bind(this, columnKey)}>show</button>
                  <button onClick={this._hideColumn.bind(this, columnKey)}>hide</button>                  
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default App;
