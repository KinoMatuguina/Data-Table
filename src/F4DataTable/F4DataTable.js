'use strict';

import React, { Component } from 'react';
import '../App.css';
import DataTable from '../DataTable/DataTable'
import {Cell, Column} from 'fixed-data-table-2';
import {LinkCell, ImageCell, CollapseCell} from "../DataTableCell/DataTableCell"
import Data from '../Data'
import _ from 'underscore';
import by from 'sortby';
import Fonticon from 'react-fontawesome';
import Pagination from "react-js-pagination";

let expandStyles = {
  'background-color': 'white',
  border: '1px solid #d3d3d3',
  'box-sizing': 'border-box',
  padding: '20px',
  overflow:'hidden',
  width: '100%',
  height: '100%'
}

class F4DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      collapsedRows: new Set(),
      columnOrder: this.props.columnOrder,
      copyOfColumnOrder: this.props.columnOrder,
      columnWidth: this.props.columnWidth,
      copyOfData: this.props.data,
      reRender: false,
      sortData: {},
      isVisible: false,
      sortingIsActive: false,
      listOfData: [],
      activePage: 1,
      itemsPerPage: 10,
      cells: React.Children.toArray(this.props.children),
      copyOfCells: React.Children.toArray(this.props.children),
      filter: this.props.columnOrder[0]
      
    }

    this._renderFilterService = this._renderFilterService.bind(this);
    this._filterResult = this._filterResult.bind(this);
    this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._paginationNext = this._paginationNext.bind(this);
    this._paginationBack = this._paginationBack.bind(this);
    this._paginationGoto = this._paginationGoto.bind(this);
    this._changeMaxRow = this._changeMaxRow.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._changeDataOrder = this._changeDataOrder.bind(this);
    this._handleFieldsDirection = this._handleFieldsDirection.bind(this);
    this._keyDown = this._keyDown.bind(this);
    this._keyUp = this._keyUp.bind(this);
    this._selectAll = this._selectAll.bind(this);
    this._selectColumn = this._selectColumn.bind(this); 
    this._handlePagination = this._handlePagination.bind(this);
    this._handleInputPagination = this._handleInputPagination.bind(this);
    this._handleRowCount = this._handleRowCount.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);

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
    
    const {columnOrder, cells} = this.state;
    const {children} = this.props;
    // let cloneChildren = children
    console.log(cells)
    console.log("reorder column is :" + event.reorderColumn)
    console.log("after column is :" + event.columnAfter)
    if (event.columnAfter === undefined) {
      
    } else {
      let currentColIndex = _.findIndex(cells, function(data) { return data.key == ".$" + event.reorderColumn })
      let nextColIndex = _.findIndex(cells, function(data) { return data.key == ".$" + event.columnAfter })
      let eventDataObject = cells[currentColIndex]
      let eventDataObjectNext = cells[nextColIndex]

      // console.log();
      if (!eventDataObjectNext.props.isReorderable) {
        return false
      }
      // console.log("OLD COLUMN ORDER : " + columnOrder);
      // // removing the reorder column
      // if (nextColIndex)
      
      cells.splice(currentColIndex, 1);
      // // move the reorder column
      cells.splice(nextColIndex, 0, eventDataObject);
      // console.log(currentColIndex)
      // console.log(nextColIndex);
      // console.log(eventDataObject)
      // console.log(cells);
      this.setState({
        cells: cells
      }, function() {
        console.log('DONE');
        // this.forceUpdate()
      })
    }
    // getting position of the colums need to reorder 
    
    
    
    // console.log(eventDataObject)

    
    
    // console.log("NEW COLUMN ORDER : " + columnOrder);
    
    // console.log(cells)
    // // console.log(currentColIndex);
    // // console.log(nextColIndex);
    
    // // setting sample data state.
    
    
    // return children;

  }

  _showColumn(columnKey, event) {
    console.log(columnKey)
    const {cells, copyOfCells} = this.state;

    let currentCelllIndex = _.findIndex(cells, function(data) { return data.key == ".$" + columnKey })
    let currentCelllCopyIndex = _.findIndex(copyOfCells, function(data) { return data.key == ".$" + columnKey })
    var newCells = cells;
    let copyCellData = copyOfCells[currentCelllCopyIndex]
    let cellData = cells[currentCelllIndex]

    // cells.splice(indexOfColumnKey, 0, copyCellData);
    
    if (currentCelllIndex === -1) {
      cells.splice(currentCelllCopyIndex, 0, copyCellData);
      this.setState({
        cells: cells
      })
    }
    
    // let indexOfColumnKey = this.state.copyOfColumnOrder.indexOf(columnKey)
    // let shallowCopyOfColumnOrder = this.state.columnOrder
    
    
    // let currentColIndex = _.findIndex(cells, function(data) { return data.key == ".$" + event.reorderColumn })
    // this.setState({
    //   columnOrder: shallowCopyOfColumnOrder
    // })
  }

  _hideColumn(columnKey, event) {
    const {cells, copyOfCells} = this.state;
    
    // console.log(columnKey)
    // let shallowCopyOfColumnOrder = this.state.columnOrder
    // let columnIndex = shallowCopyOfColumnOrder.indexOf(columnKey);
    // if (columnIndex !== -1) {
    //   shallowCopyOfColumnOrder.splice(columnIndex, 1);
    // }
    
    // this.setState({
    //   columnOrder: shallowCopyOfColumnOrder
    // })
    let currentCelllIndex = _.findIndex(cells, function(data) { return data.key == ".$" + columnKey })
    let currentCelllCopyIndex = _.findIndex(copyOfCells, function(data) { return data.key == ".$" + columnKey })
    // var newCells = cells;
    let copyCellData = copyOfCells[currentCelllCopyIndex]
    let cellData = cells[currentCelllIndex]

    console.log(currentCelllIndex)
    console.log(currentCelllCopyIndex)
    console.log(copyCellData)
    console.log(cellData)
    
    if (currentCelllIndex !== -1) {
      cells.splice(currentCelllIndex, 1)
      this.setState({
        cells: cells
      })
    }

    
    
  }

  _filterResult(){
    const { data } = this.props.data
    let textBoxValue = this.refs.filterKey.value.toUpperCase() + '';
    
    // let selectedFilter = this.refs.selectFilter.options[this.refs.selectFilter.selectedIndex].value;
    // let currentCelllIndex = _.findIndex(this.state.data, function(data) { return data.key == ".$" + columnKey })
    var filteredData = _.where(this.state.data, {[this.state.filter]: textBoxValue})
    console.log(filteredData)
    console.log(this.state.data)
    console.log({[this.state.filter]: textBoxValue})
    // Data.mock = this.state.copyOfData; // reset original data
    // this.setState({
    //     data: this.state.copyOfData
    // }, function() {
    //     if(this.refs.filterKey.value.length > 0){
    //         var filteredData = this.state.data.filter((item, index)=>{
      
    //           let itemValue = item[this.state.filter].toUpperCase() + '';
    //           console.log(itemValue === textBoxValue)
    //           // console.log()
              
    //           // return(itemValue === textBoxValue);
    //         });
    //       }
    // })
    
  }

  _handleChangeFilter(event) {
    
  }

  _renderFilterService(){

    return(
    <div style={{"textAlign":"left"}}>
      <p>Filter</p>
      <input ref='filterKey' type = 'text'
        onChange={this._filterResult}
        />
      <select ref='selectFilter' 
        onChange={this._handleChangeFilter.bind(this)} value={this.state.filter}>

        {this.state.columnOrder.map(function(columnKey, index){
          return(
            <option value={columnKey} key={index}>{columnKey}</option>
          );
        })}
      </select>
    </div>
    )
  }

  _paginationNext() {

  }

  _paginationBack() {

  }

  _paginationGoto() {
    
  }

  _changeMaxRow() {
    
  }

  

  _createCheckboxHeader(key, value) {
    return <input key={key} name="checkboxHeader" type={"checkbox"} onChange={this._selectAll} />
  }

  _createCheckboxColumn(key, value) {
    return <input key={key} id={key} name="checkboxColumn" type={"checkbox"} onChange={this._selectColumn} value={value} />
  }

  _selectAll(event) {

    const { onCheckedBoxHeaderCallBack } = this.props;

    let checkboxHeader = document.getElementsByName('checkboxHeader');
    let checkBoxesList = document.getElementsByName('checkboxColumn');
    let data = [];
    let isChecked = false;

    for (let index = 0; index < checkBoxesList.length; index++) {
      checkBoxesList[index].checked = event.target.checked;
    }

    if (checkboxHeader[0].checked) {
      data = this.state.data
    } else {
      data = []
    }

    console.log(data);

    if ( typeof onCheckedBoxHeaderCallBack === "function") {
      onCheckedBoxHeaderCallBack(event, data);  
    }

  }

  _selectColumn(event) {
    let listOfData = this.state.listOfData;
    let indexData = _.findLastIndex(this.state.data, {"_id": event.target.id});
    let indexOfNewData = _.findLastIndex(listOfData, {"_id": event.target.id});
    
    if (indexOfNewData > -1) {
      console.log("REMOVING DATA FROM THE LIST")
      listOfData.splice(indexOfNewData, 1);
      this.setState({
        listOfData: listOfData
      }) 
    } else {
      listOfData.push(this.state.data[indexData]);   
      this.setState({
        listOfData: listOfData
      })    
    }

    console.log(listOfData)

    // - [ ] push data on list
    // - [x] find data on list
    // - [ ] remove data on list

  }


  _keyDown(e) {
    if(e.keyCode === 16) {
      this.setState({
        sortingIsActive: true
      }, function(){
        console.log(this.state.sortingIsActive)
      })
    }
  }

  _keyUp(e) {
    if(e.keyCode === 16) {
      this.setState({
        sortingIsActive: false
      }, function(){
        console.log(this.state.sortingIsActive)
      })
      
    }
  }

  getFieldsAndDirection(){
    var sortedData = this.state.data.sort(by(this.state.sortData));
    console.log("get fields")
    
    return sortedData;
  }

  _handleFieldsDirection(col) {
    const dir = this.state.sortData;
    const dirIsVisible = this.state.isVisible;

    if(dirIsVisible !== false) {
      if(dir[col] !== undefined) {
        if(dir[col] === 1) {
          return <Fonticon style={{"fontSize":"1.5em", "marginLeft": "40px"}} name="sort-up" />
        } else {
          return <Fonticon style={{"fontSize":"1.5em", "marginLeft": "40px"}} name="sort-down" />
        }
      } else{
        return null
      }
    }
  }

  _changeDataOrder(columnkey, callback) {
    console.log("Page trigger outside")
    if(this.state.sortingIsActive === true) {
      console.log("multi sort")
      var direction = 0;
      // console.log("FIRST ATTEMPT LOG COLUMN KEY: " + this.state.sortData[columnkey]);
      if (this.state.sortData[columnkey] >= 0 || this.state.sortData[columnkey] === undefined) {
        direction = -1
      } else {
        direction = 1
      }
      this.setState({
        sortData: {
          ...this.state.sortData,  
          [columnkey]: direction,
        },
        isVisible: true,
      }, function() {
        // Data.mock = this.getFieldsAndDirection();
        this.setState({
            data: this.getFieldsAndDirection()
        }, function() {
            
            this.forceUpdate(); 
            console.log(this.state.sortData);
            if (typeof callback === "function") {
              callback({data: this.state.data, sortData: this.state.sortData})
            }
            // return {data: this.state.data, sortData: this.state.sortData}
        })
        // console.log(this.state.isVisible);
        // console.log("COLUMN KEY: " + columnkey + " DIRECTION: " + direction);
      });	
    } else {
      console.log("single sort")
      var direction = 0;
      // console.log("FIRST ATTEMPT LOG COLUMN KEY: " + this.state.sortData[columnkey]);
      if (this.state.sortData[columnkey] >= 0 || this.state.sortData[columnkey] === undefined) {
        direction = -1
      } else {
        direction = 1
      }
      this.setState({
        sortData: {
          [columnkey]: direction,
        },
        isVisible: true,
      }, function() {
        // Data.mock = this.getFieldsAndDirection();
        this.setState({
            data: this.getFieldsAndDirection()
        }, function() {
            // this.forceUpdate(); 
        })
        console.log(this.state.sortData);
        if (typeof callback === "function") {
          callback({data: this.state.data, sortData: this.state.sortData})
        }
        // return {data: this.state.data, sortData: this.state.sortData}
        // console.log(this.state.isVisible);
        // console.log("COLUMN KEY: " + columnkey + " DIRECTION: " + direction);
        
      });	
    }

     

  }

  componentDidMount() {
    // console.log(this.state.isVisible)
    this.props.tableRef(this);
    this.setState({
      isVisible: false,
    }, function() {
      this._handlePagination()
    })
  }
  
  componentWillUnmount() {
    this.props.tableRef(this);
    
  }
  
  _handlePagination(pageNumber) {
    console.log(pageNumber);
    this.setState({
      activePage: pageNumber
    }, function() {
      let page = this.state.activePage
      let per_page = this.state.itemsPerPage
      let offset = (page - 1) * per_page;
      let paginatedItems = _.rest(this.state.copyOfData, offset).slice(0, per_page);
      // let ShallowCopyOfList = Data.mock;
      console.log(paginatedItems);
      this.setState({
        data: paginatedItems
      }, function() {
        this.forceUpdate()
      })
    })
  }

  _handleInputPagination(event) {
    var value = event.target.value;
    var totalPageCount = Math.ceil(this.state.copyOfData.length / this.state.itemsPerPage)
    console.log(value)
    console.log(totalPageCount)
    console.log(totalPageCount >= value);
    console.log(0 < value)
    if (totalPageCount >= value && 0 < value) {
      this.setState({
        activePage: value
      }, function() {
        let page = this.state.activePage
        let per_page = this.state.itemsPerPage
        let offset = (page - 1) * per_page;
        let paginatedItems = _.rest(this.state.copyOfData, offset).slice(0, per_page);
        // let ShallowCopyOfList = Data.mock;
        console.log(paginatedItems);
        this.setState({
           data: paginatedItems
        }, function() {
           this.forceUpdate()
        })
      })

    } else {
      // do nothing
      console.log("do nothing")
    }
    
  }

  _handleRowCount(event) {
    this._handlePagination()
    this.setState({
      itemsPerPage: parseInt(event.target.value)
    }, function() {
      console.log(this.state.itemsPerPage)
      this.forceUpdate()
    })
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    const { onColumnResize, children } = this.props;
    console.log("kino")
    console.log(onColumnResize)
    if (typeof onColumnResize === "function") {
      onColumnResize(newColumnWidth, columnKey)
      this.setState({
        cells: React.Children.toArray(this.props.children)
      }, function() {
        console.log('setting new width to cells')
        console.log(this.state.cells)
      })
    }
  }


  render() {
    const { columnWidth } = this.state;
    const { 
        hasSelectAll, 
        hasGroupBy,
        isReorderable,
        isResizable,
        headerHeight,
        rowHeight,
        tableWidth,
        tableHeigth,
        children,
        tableRef
     } = this.props;
    const self = this;

    return (
      <div 
        className="App"
        onKeyDown={this._keyDown}
        onKeyUp={this._keyUp}
      >
        <DataTable 
          headerHeight={headerHeight} 
          rowsCount={this.state.data.length} 
          onColumnReorderEndCallback={this._onColumnReorderEndCallback}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          subRowHeightGetter={this._subRowHeightGetter}
          rowExpanded={this._rowExpandedGetter}
          rowHeight={rowHeight}
          isColumnReordering={false} 
          width={tableWidth} 
          height={tableHeigth}
          {...this.props}>

          {
              (hasSelectAll) ? 
              <Column
                header={<Cell>{this._createCheckboxHeader()}</Cell>}              
                cell={props => (
                    <Cell {...props}>
                    {
                        (this.state.data.length !== 0) ?
                        this._createCheckboxColumn(this.state.data[props.rowIndex]["_id"], this.state.data[props.rowIndex]) : null
                    }
                    </Cell>
                )}
                fixed={true}
                width={30}
              /> : null
              
          }
          
          
          {
              (hasGroupBy) ?
              <Column
                cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={this.state.collapsedRows} />}
                fixed={true}
                width={30}
              /> : null
          }
          {
            this.state.cells
          }
          
        </DataTable>
        <div className="pagination">
          <input type="number" onChange={this._handleInputPagination} />
          <select onChange={this._handleRowCount} value={this.state.itemsPerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          {(Math.ceil(this.state.data.length) === 0) ? null :
            <Pagination
              prevPageText='<'
              nextPageText='>'
              firstPageText='<<'
              lastPageText='>>'
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={Math.ceil(this.state.copyOfData.length)}
              onChange={this._handlePagination}
            />  
          } 
                
        </div>
        <div className="hide-columns">
          {/* {this._renderFilterService()} */}
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

export default F4DataTable;
