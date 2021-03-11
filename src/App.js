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
    document.getElementById("add-item-button").style.color =  'white';
    document.getElementById("delete-list-button").style.color = 'white';
    document.getElementById("close-list-button").style.color = 'white';
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
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete",
      id: this.state.nextListItemId+1
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
    document.getElementById("add-item-button").style.color = "black";
    document.getElementById("delete-list-button").style.color = "black";
    document.getElementById("close-list-button").style.color = "black";
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
    document.getElementById("modal-overlay").style.display = 'none';
    document.getElementById("add-item-button").style.color = "black";
    document.getElementById("delete-list-button").style.color = "black";
    document.getElementById("close-list-button").style.color = "black";
  }

  checkDeleteList = () => {
    document.getElementById("modal-overlay").style.display = 'block';
  }

  exitmodal = () => {
    document.getElementById("modal-overlay").style.display = 'none';
  }

  changeTask = (id, text) => { 
    let currentlist = this.state.currentList.items;
    for (var i = 0 ; i < currentlist.length ; i ++){
      if (currentlist[i].id === id)
        currentlist[i].description = text;
    }
  }
  changeDate = (id, date) => {
    let currentlist = this.state.currentList.items;
    for (var i = 0 ; i < currentlist.length ; i ++){
      if (currentlist[i].id === id)
        currentlist[i].date = date;
    }
  }
  changeStatus = (id, status) => {
    let currentlist = this.state.currentList.items;
    for (var i = 0 ; i < currentlist.length ; i ++){
      if (currentlist[i].id === id)
        currentlist[i].status = status;
    }
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
          moveItemUpCallBack = {this.moveItemUp}
          moveItemDownCallBack = {this.moveItemDown}
          deleteItemCallBack = {this.deleteItem}
          closeListCallBack = {this.closeList}
          makeNewToDoListItemCallBack = {this.makeNewToDoListItem}
          checkdeleteListCallBack = {this.checkDeleteList}
          changeTaskCallBack = {this.changeTask}
          changeDateCallBack = {this.changeDate}
          changeStatusCallBack = {this.changeStatus}
          />
      </div>
    );
  }
}

export default App;