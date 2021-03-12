// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteConfirm from './components/DeleteConfirm'
import { Modal } from '@material-ui/core';
import AddNewItem_Transaction from './transaction/AddNewItem_Transaction'
import Move_Down_Transaction from './transaction/Move_Down_Transaction'
import Move_Up_Transaction from './transaction/Move_Up_Transaction'
import DeleteItem_Transaction from './transaction/DeleteItem_Transaction'
import UpdateItem_Transaction from './transaction/UpdateItem_Transaction'



{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();
    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  tpsAddNewItem_Transaction = () => {
    var trans = new AddNewItem_Transaction(this);
    this.tps.addTransaction(trans);
  }
  tpsMove_Down_Transaction = (id) => {
    var trans = new Move_Down_Transaction(this,id);
    this.tps.addTransaction(trans);
  }
  tpsMove_Up_Transaction = (id) => {
    var trans = new Move_Up_Transaction(this,id);
    this.tps.addTransaction(trans);
  }
  tpsDeleteItem_Transaction = (item) => {
    let index;
    for (var i = 0 ; i < this.state.currentList.items.length ; i++){
        if (this.state.currentList.items[i].id == item.id){
            index = i;
        }
    }
    var trans = new DeleteItem_Transaction (this,item.id,item,index);
    this.tps.addTransaction(trans);
  }
  tpsUpdateItem_Transaction = (id, description, date, status) => {
    let list = this.state.currentList.items;
    for (var i = 0 ; i < list.length ; i++){
      if (list[i].id === id){
        var oldDescription = list[i].description;
        var oldDueDate = list[i].due_date;
        var oldStatus = list[i].status;
      }
    }
    var trans = new UpdateItem_Transaction(this, id, description, date, status, oldDescription, oldDueDate, oldStatus);
    this.tps.addTransaction(trans);
  }


  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
    this.activatebuttons();
    this.tps.clearAllTransactions();
    if (this.tps.hasTransactionToRedo()){
      document.getElementById("redo-button").style.color = 'white';
    }
    else{
        document.getElementById("redo-button").style.color = 'black';
    }
    if (this.tps.hasTransactionToUndo()){
        document.getElementById("undo-button").style.color = 'white';
    }
    else{
        document.getElementById("undo-button").style.color = 'black';
    }
  }
  activatebuttons = () => {
    document.getElementById("add-item-button").style.color =  'white';
    document.getElementById("delete-list-button").style.color = 'white';
    document.getElementById("close-list-button").style.color = 'white';
    document.getElementById("add-item-button").style.pointerEvents = 'auto';
    document.getElementById("delete-list-button").style.pointerEvents = 'auto';
    document.getElementById("close-list-button").style.pointerEvents = 'auto';
    document.getElementById("add-list-button").style.color = 'yellow';
    document.getElementById("add-list-button").style.pointerEvents = 'auto';
  }
  disablebuttons = () => {
    document.getElementById("add-item-button").style.color =  'black';
    document.getElementById("delete-list-button").style.color = 'black';
    document.getElementById("close-list-button").style.color = 'black';
    document.getElementById("add-item-button").style.pointerEvents = 'none';
    document.getElementById("delete-list-button").style.pointerEvents = 'none';
    document.getElementById("close-list-button").style.pointerEvents = 'none';
    document.getElementById("add-list-button").style.color = 'black';
    document.getElementById("add-list-button").style.pointerEvents = 'none';
  }
  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
    this.tps.clearAllTransactions();
    if (this.hasTransactionToRedo()){
      document.getElementById("redo-button").style.color = 'white';
    }
    else{
        document.getElementById("redo-button").style.color = 'black';
    }
    if (this.hasTransactionToUndo()){
        document.getElementById("undo-button").style.color = 'white';
    }
    else{
        document.getElementById("undo-button").style.color = 'black';
    }
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    this.tps.clearAllTransactions();
    if (this.hasTransactionToRedo()){
      document.getElementById("redo-button").style.color = 'white';
    }
    else{
        document.getElementById("redo-button").style.color = 'black';
    }
    if (this.hasTransactionToUndo()){
        document.getElementById("undo-button").style.color = 'white';
    }
    else{
        document.getElementById("undo-button").style.color = 'black';
    }
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      due_date: "No Date",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    let items = this.state.currentList.items;
    items.push(newToDoListItem);
    this.setState({
      currentList : {items},
      nextListItemId : this.state.nextListItemId+1
    })

    return newToDoListItem;
  }
  
  moveItemUp = (id) => {
    let items = this.state.currentList.items;
    var index;
    for (var i = 0 ; i < items.length ; i++){
      if (items[i].id == id){
          index = i;
      }
    }
    if (index >0){
      var temp = items[index-1];
      items[index-1] = items[index];
      items[index] = temp;
      this.setState({
        currentList : {items}
      })
    }
  }


  moveItemDown = (id) => {
    let items = this.state.currentList.items;
    var index;
    for (var i = 0 ; i < items.length ; i++){
      if (items[i].id == id){
          index = i;
      }
    }
    if (index < items.length - 1){
      var temp = items[index+1];
      items[index+1] = items[index];
      items[index] = temp;
      this.setState({
        currentList : {items}
      })
    }
  }

  deleteItem = (id) => {
    let items = this.state.currentList.items;
    var index;
    for (var i = 0 ; i < items.length ; i++){
      if (items[i].id == id){
          index = i;
      }
    }
    items.splice(index,1);
    this.setState({
      currentList : {items}
    })
  }

  closeList = () => {
    this.setState({
      currentList : {items: []}
    })
    this.disablebuttons();
    this.tps.clearAllTransactions();
    if (this.tps.hasTransactionToRedo()){
      document.getElementById("redo-button").style.color = 'white';
    }
    else{
        document.getElementById("redo-button").style.color = 'black';
    }
    if (this.tps.hasTransactionToUndo()){
        document.getElementById("undo-button").style.color = 'white';
    }
    else{
        document.getElementById("undo-button").style.color = 'black';
    }
  }

  deleteList = () => {
    let alllists = this.state.toDoLists;
    var index;
    for (var i = 0 ; i < alllists.length ; i++){
      if (this.state.currentList.id == alllists[i].id){
        index = i;
      }
    }
    alllists.splice(index, 1);
    this.setState({
      currentList : {items: []},
      toDoLists: alllists
    })
    this.disablebuttons();
    this.exitmodal();
    this.tps.clearAllTransactions();
    if (this.tps.hasTransactionToRedo()){
      document.getElementById("redo-button").style.color = 'white';
    }
    else{
        document.getElementById("redo-button").style.color = 'black';
    }
    if (this.tps.hasTransactionToUndo()){
        document.getElementById("undo-button").style.color = 'white';
    }
    else{
        document.getElementById("undo-button").style.color = 'black';
    }
  }

  checkDeleteList = () => {
    document.getElementById("modal-overlay").style.display = 'block';
  }

  exitmodal = () => {
    document.getElementById("modal-overlay").style.display = 'none';
  }

  changeItem = (id, text, date, status) => { 
    let items = this.state.currentList.items;
    for (var i = 0 ; i < items.length ; i ++){
      if (items[i].id === id){
        items[i].description = text;
        items[i].due_date = date;
        items[i].status = status;
      }
    }
    this.setState({
      currentList: {items}
    })
  }

  insertItem(item, index){
    let list = this.state.currentList;
    list.items.splice(index, 0, item);
    this.setState({
      currentList: list
    })
  }
  undo = () =>{
    this.tps.undoTransaction();
  }
  redo = () => {
    this.tps.doTransaction();
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <DeleteConfirm
          deleteListCallBack = {this.deleteList}
          exitmodalCallBack = {this.exitmodal}
        />
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}

        />
        <Workspace 
          toDoListItems={items} 
          moveItemUpCallBack = {this.tpsMove_Up_Transaction}
          moveItemDownCallBack = {this.tpsMove_Down_Transaction}
          deleteItemCallBack = {this.tpsDeleteItem_Transaction}
          closeListCallBack = {this.closeList}
          makeNewToDoListItemCallBack = {this.tpsAddNewItem_Transaction}
          checkdeleteListCallBack = {this.checkDeleteList}
          changeItemCallBack = {this.tpsUpdateItem_Transaction}
          undoCallBack = {this.undo}
          redoCallBack = {this.redo}
          />
      </div>
    );
  }
}

export default App;