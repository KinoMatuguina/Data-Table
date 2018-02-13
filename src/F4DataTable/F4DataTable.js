/*
DATA TABLE
AUTHOR: KINO MATUGUINA
*/

'use strict';

import React, { Component } from 'react';
import '../App.css';
import DataTable from '../DataTable/DataTable'
import {Cell, Column} from 'fixed-data-table-2';
import {LinkCell, ImageCell, CollapseCell} from "../DataTableCell/DataTableCell"
import Data from '../Data'
import _ from 'underscore';
import Clipboard from 'react-clipboard.js';
import by from 'sortby';
// import FieldDirection from './DataTableCell/FieldDirection';
import Fonticon from 'react-fontawesome';
import Pagination from "react-js-pagination";
var json2csv = require('json2csv');

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
      columnOrder: this.props.options,
      copyOfColumnOrder: this.props.cloneOptions,
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
      },
      data: this.props.data,
      copyOfData: this.props.data,
      reRender: false,
      sortData: {},
      serverSideSortData: [],
      isVisible: false,
      sortingIsActive: false,
      itemsPerPage: this.props.itemsPerPage,
      sortingIsActive: false,
      listOfData: [],
      activePage: 1,
      clickData: {},
      currentProps: null,
      allSelected: false,
      copyToClipBoardData: ""
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
    this._handlePagination = this._handlePagination.bind(this);
    this._handleInputPagination = this._handleInputPagination.bind(this);
    this._handleRowCount = this._handleRowCount.bind(this);
    this._selectAll = this._selectAll.bind(this);
    this._selectColumn = this._selectColumn.bind(this);
    this._copyToClipBoard = this._copyToClipBoard.bind(this);
    // this._clickAbstractCell = this._clickAbstractCell.bind(this);
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
    let currentColIndex = _.findIndex(columnOrder, function(data) { return data.name == event.reorderColumn })
    let nextColIndex = _.findIndex(columnOrder, function(data) { return data.name == event.columnAfter })
    let reorderedData = columnOrder[currentColIndex]
    // getting position of the colums need to reorder 
    // let currentColIndex = columnOrder.indexOf(event.reorderColumn);
    // let nextColIndex = columnOrder.indexOf(event.columnAfter);

    console.log("OLD COLUMN ORDER : " + columnOrder);
    // removing the reorder column
    columnOrder.splice(currentColIndex, 1);
    // move the reorder column
    columnOrder.splice(nextColIndex, 0, reorderedData);
    
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

  _handleShowHide(data, event) {
    var value = event.target.checked;
    console.log("showHideDATA")
    console.log(data)
    if (value) {
        this._showColumn(data)
    } else {
        this._hideColumn(data)
    }

    return value
  }

  _showColumn(columnKey, event) {
    console.log(columnKey)
    let indexOfColumnKey =  _.findIndex(this.state.copyOfColumnOrder, function(data) { return data.name == columnKey })
    let normalIndex =  _.findIndex(this.state.columnOrder, function(data) { return data.name == columnKey }) 
    
    let newData = this.state.copyOfColumnOrder[indexOfColumnKey]
    let shallowCopyOfColumnOrder = this.state.columnOrder
    console.log(newData)
    console.log(indexOfColumnKey)
    if (normalIndex === -1) {
      shallowCopyOfColumnOrder.splice(indexOfColumnKey, 0, newData);
      console.log(shallowCopyOfColumnOrder)
    }

    this.setState({
      columnOrder: shallowCopyOfColumnOrder
    })
  }
  

  _hideColumn(columnKey, event) {
    console.log(columnKey)
    let shallowCopyOfColumnOrder = this.state.columnOrder
    let columnIndex =  _.findIndex(shallowCopyOfColumnOrder, function(data) { return data.name == columnKey })
    console.log(this.props.cloneOptions)
    console.log(this.props.options)
    
    if (columnIndex !== -1) {
      shallowCopyOfColumnOrder.splice(columnIndex, 1);
    }
    
    this.setState({
      columnOrder: shallowCopyOfColumnOrder
    })
  }

  _filterResult(){

    let selectedFilter = this.refs.selectFilter.options[this.refs.selectFilter.selectedIndex].value;

    this.state.data = this.state.copyOfData; // reset original data

    if(this.refs.filterKey.value.length > 0){
      this.state.data = this.state.data.filter((item, index)=>{

        let itemValue = item[selectedFilter] + '';
        let textBoxValue = this.refs.filterKey.value + '';
        
        return(itemValue.toUpperCase() === textBoxValue.toUpperCase());
      });
    }

    this.setState({reRender: true});
  }
  
  _renderFilterService(){

    return(
    <div style={{"textAlign":"left"}}>
      <p>Filter</p>
      <input ref='filterKey' type = 'text'
        onChange={this._filterResult}
        />
      <select ref='selectFilter' 
        onChange={()=> {
          this._filterResult()
          }}>

        {this.state.columnOrder.map(function(columnKey, index){
          return(
            <option key={index}>{columnKey.headerTitle || columnKey.name}</option>
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

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    console.log(newColumnWidth);
    console.log(columnKey);
    let normalIndex =  _.findIndex(this.state.columnOrder, function(data) { return data.name == columnKey })
    let cloneData = this.state.columnOrder;
    
    cloneData[normalIndex].width = newColumnWidth;
    this.setState({
      columnOrder: cloneData
    })
    console.log(cloneData)
    console.log(this.state.columnOrder[normalIndex])
    console.log(normalIndex)
  
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
    var sortedData = this.state.copyOfData.sort(by(this.state.sortData));
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

  _changeDataOrder(columnkey) {

    const { onSortCallback, isServerSideSort } = this.props;

    // function createServerSideSort() {
    //   if (isServerSideSort) {
    //     if (typeof onSortCallback === "function") {
    //       onSortCallback()
    //     }
    //   }
    // }
    
    let direction = 0;
    let directionInWord = ""
    // console.log("FIRST ATTEMPT LOG COLUMN KEY: " + this.state.sortData[columnkey]);
    if (this.state.sortData[columnkey] >= 0 || this.state.sortData[columnkey] === undefined) {
      direction = -1
      directionInWord = "DESC"
    } else {
      direction = 1
      directionInWord = "ASC"
    }

    const copyOfServerSideSort = this.state.serverSideSortData;
    let columnIndex =  _.findIndex(this.state.serverSideSortData, function(data) { return data.fieldName == columnkey })    
    // MULTIPLE SORTING 
    
    if(this.state.sortingIsActive === true) {
      this.setState({
        sortData: {
          ...this.state.sortData,  
          [columnkey]: direction,
        },
        isVisible: true,
      }, function() {
        if (isServerSideSort) {
          
          if (columnIndex === -1) {
            if (this.state.sortData[columnkey] === undefined) {
              copyOfServerSideSort.push({
                fieldName: columnkey,
                direction: directionInWord
              })
              this.setState({
                serverSideSortData: copyOfServerSideSort
              }, function() {
                if (onSortCallback) {
                  if (typeof onSortCallback === "function") {
                    onSortCallback(this.state.serverSideSortData)
                  }
                }
              })
            } else {
              copyOfServerSideSort.push({
                fieldName: columnkey,
                direction: (this.state.sortData[columnkey] === -1) ? "DESC" : "ASC"
              })
            }
          } else {
            if (copyOfServerSideSort[columnIndex].direction === "ASC") {
              copyOfServerSideSort[columnIndex].direction = "DESC"
            } else {
              copyOfServerSideSort[columnIndex].direction = "ASC"
            }
      
            this.setState({
              serverSideSortData: copyOfServerSideSort
            }, function() {
              if (onSortCallback) {
                if (typeof onSortCallback === "function") {
                  onSortCallback(this.state.serverSideSortData)
                }
              }
            })
          }

        } else {
          this.state.data = this.getFieldsAndDirection();
        }

        this._handlePagination()
        this.forceUpdate(); 
      });	
    } else {
      this.setState({
        sortData: {
          [columnkey]: direction,
        },
        isVisible: true,
      }, function() {
        if (isServerSideSort) {
          this.setState({
            serverSideSortData: [
              {
                fieldName: columnkey,
                direction: directionInWord
              }
            ]
          }, function() {
            // console.log(JSON.stringify(this.state.serverSideSortData))
            if (onSortCallback) {
              if (typeof onSortCallback === "function") {
                onSortCallback(this.state.serverSideSortData)
              }
            }
          })
        } else {
          this.state.data = this.getFieldsAndDirection();
        }
        
        this._handlePagination()
        this.forceUpdate(); 
      });	
    }

    
    

  }

  componentDidMount() {
    let self = this;
    this.state.columnOrder.map(function(columnKey, index) {
      // this._handleShowHide(this, columnKey.name)
      if (columnKey.isNotHidden) {
        this._showColumn(columnKey.name)
      } else {
        this._hideColumn(columnKey.name)        
      }
    }, this)

    this._handlePagination()
    // if (this.props.defaultSort) {
    //   this.setState({
    //     isVisible: true,
    //     data: this.state.copyOfData.sort(by(this.props.defaultSort))
    //   }, function() {
    //     
    //   })
    // } else {
    //   this.setState({
    //     isVisible: false,
    //     data: this.state.data.sort(by(this.props.defaultSort))
    //   }, function() {
    //     this._handlePagination()
    //   })
    // }

      
  }

  _handlePagination(pageNumber) {
    const { isServerSidePagination, onPaginationCallback, defaultSortParameter } = this.props
    console.log(pageNumber);
    this.setState({
      allSelected: false,
      activePage: pageNumber,
      listOfData: []
    }, function() {
      let page = this.state.activePage
      let per_page = this.state.itemsPerPage
      let offset = (page - 1) * per_page;
      let paginatedItems = _.rest(this.state.copyOfData, offset).slice(0, per_page);
      // let ShallowCopyOfList = this.state.data;
      console.log(paginatedItems);
      if (isServerSidePagination) {
        if (onPaginationCallback) {
          if (typeof onPaginationCallback === "function") {
            if (this.state.serverSideSortData.length !== 0) {
              onPaginationCallback({page: page, itemsPerPage: per_page, sort: this.state.serverSideSortData}) 
            } else {
              onPaginationCallback({page: page, itemsPerPage: per_page, sort: defaultSortParameter})     
            }
          }
        }
      } else {
        this.setState({
          data: paginatedItems
        }, function() {
          this.state.data = paginatedItems    
          this.forceUpdate()
        })
      }
      document.getElementsByName('checkboxHeader').checked = false;
    }, function() {
      this.forceUpdate()
    })
  }

  _handleInputPagination(event) {
    const { isServerSidePagination, onPaginationCallback, defaultSortParameter } = this.props    
    var value = event.target.value;
    var totalPageCount = Math.ceil(this.state.copyOfData.length / this.state.itemsPerPage)
    console.log(value)
    console.log(totalPageCount)
    console.log(totalPageCount >= value);
    console.log(0 < value)
    document.getElementsByName('checkboxHeader').checked = false;
    if (totalPageCount >= value && 0 < value) {
      this.setState({
        allSelected: false,
        activePage: value,
        listOfData: []
      }, function() {
        let page = this.state.activePage
        let per_page = this.state.itemsPerPage
        let offset = (page - 1) * per_page;
        let paginatedItems = _.rest(this.state.copyOfData, offset).slice(0, per_page);
        // let ShallowCopyOfList = this.state.data;
        if (isServerSidePagination) {
          if (onPaginationCallback) {
            if (typeof onPaginationCallback === "function") {
              if (this.state.serverSideSortData.length !== 0) {
                onPaginationCallback({page: page, itemsPerPage: per_page, sort: defaultSortParameter})
              } else {
                onPaginationCallback({page: page, itemsPerPage: per_page, sort: this.state.serverSideSortData})              
              }
            }
          }
        } else {
          this.setState({
            data: paginatedItems
          }, function() {
            this.state.data = paginatedItems    
            this.forceUpdate()
          })
        }
      }, function() {
        this.forceUpdate()
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

  _createCheckboxHeader(key, value) {
    return <input key={key} name="checkboxHeader" checked={this.state.allSelected} type={"checkbox"} onChange={this._selectAll} />
  }

  _createCheckboxColumn(key, value) {
    let indexOfData = _.findLastIndex(this.state.listOfData, {"_id": key});
    let isChecked = false;
    if (indexOfData > -1) {
      isChecked = true
    } else {
      isChecked = false
    }
    return <input key={key} id={key} name="checkboxColumn" checked={isChecked} type={"checkbox"} onChange={this._selectColumn} value={value} />
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

    this.setState({
      allSelected: !this.state.allSelected,
      listOfData: data
    })

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

    // - [x] push data on list
    // - [x] find data on list
    // - [x] remove data on list

  }

  _createCell(column, props) {
    
    let self = this;
    if (column.type === "text") {
      return <Cell> {this.state.data[props.rowIndex][column.name]} </Cell>
    }
    if (column.type === "image") {
      return <ImageCell src={this.state.data[props.rowIndex][column.name]} />
    }
    if (column.type === "link") {
      return (
        <LinkCell link={"mailto:" + this.state.data[props.rowIndex][column.name]} >
          {this.state.data[props.rowIndex][column.name]}
        </LinkCell>
      )
    }
    
   

  }

  _copyToClipBoard() {
    // var textRange = document.createRange(); 
    // console.log(textRange);
    let arr = []
    this.state.copyOfColumnOrder.map(function(data, index) {
      if (data.name === "") {

      } else {
        arr.push(data.name)
      }
    })

    // // console.log(arr[0].toString());

    // for (let listIndex = 0; listIndex < arr.length; listIndex++) {
    //   // const element = array[index];
    //   console.log(arr[listIndex])
    //   for (let dataIndex = 0; dataIndex < this.state.data.length; dataIndex++) {
        
    //     console.log(this.state.data[dataIndex][arr[listIndex]])
    //   }
    // }

    return json2csv({data:this.state.data, fields: arr})
    // textRange.moveToElementText(document.getElementById("f4DataTable")); 
    // textRange.execCommand("Copy");
  }



  _clickAbstractCell(props, event) {
    

  }

  render() {
    const self = this;
    this.props.dataTableRef(self);
    
    return (
      <div 
        className="App"
        onKeyDown={this._keyDown}
        onKeyUp={this._keyUp}
      >
        <DataTable
          id="f4DataTable"
          headerHeight={this.props.headerHeight} 
          rowsCount={this.state.data.length} 
          onColumnReorderEndCallback={this._onColumnReorderEndCallback}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          subRowHeightGetter={this._subRowHeightGetter}
          rowExpanded={this._rowExpandedGetter}
          rowHeight={this.props.rowHeight}
          isColumnReordering={false} 
          isColumnResizing={false}
          width={this.props.tableWidth} 
          height={this.props.tableHeight}
          {...this.props}>
          {
              (this.props.hasSelectAll) ?
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
              (this.props.hasExpandable) ?
              <Column
                cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={this.state.collapsedRows} />}
                fixed={true}
                width={30}
              /> : null
          }
        {
          this.state.columnOrder.map(function(columnKey, index) {
            return (
              <Column
              allowCellsRecycling={true}
              columnKey={columnKey.name}
              key={index}
              isReorderable={columnKey.isReorderable}
              isResizable={columnKey.isResizable}
              width={columnKey.width}
              fixed={columnKey.fixed}
              header={
                <Cell 
                  onClick={() => { (columnKey.isSortable) ? self._changeDataOrder(columnKey.name) : console.log("not sortable")}}
                  style={(columnKey.isSortable) ? {"cursor": "pointer", "textTransform": "uppercase"} : {"cursor": "default"}}
                  
                > 
                  <span>
                    {columnKey.headerTitle}
                    {self._handleFieldsDirection(columnKey.name)}
                  </span>    
                </Cell>
              }
              cell={(columnKey.cell) ? columnKey.cell : self._createCell.bind(self, columnKey)}

              />
            );
          })
        }
        {
            this.props.children
        }
          
        </DataTable>
        <div className="pagination">
        <input type="number" onChange={this._handleInputPagination} />
          <select onChange={this._handleRowCount} value={this.state.itemsPerPage}>
            {
              _.map(this.props.listOfItemPerPage, function(data, index) {
                return <option key={index} value={data.value}>{data.text}</option>
              })  
            }
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
        <p>{"Selected " + this.state.listOfData.length + ", Total Items " + this.state.copyOfData.length }</p>
        <Clipboard option-text={this._copyToClipBoard}>Copy to Clip Board</Clipboard>
        <div className="hide-columns">
          {this._renderFilterService()}
          {this.state.copyOfColumnOrder.map(function(columnKey, index) {
            return (
              <div style={{"textAlign":"left"}} key={index}>
                  <p>{columnKey.headerTitle || columnKey.name}</p>
                  {/* {<button onClick={this._showColumn.bind(this, columnKey.name)}>show</button>
                  <button onClick={this._hideColumn.bind(this, columnKey.name)}>hide</button>} */}
                  <input type="checkbox" defaultChecked={columnKey.isNotHidden} onChange={this._handleShowHide.bind(this, columnKey.name)}/>                 
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default App;
