// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    checkblack = (index) => {
        if (index === 0){
            return true;
        }
    }
    checkdownblack = (index) => {
        if (index === this.props.toDoListItems.length-1){
            return true;
        }
    }
    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" onClick = {this.props.undoCallBack} />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" onClick = {this.props.redoCallBack} />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick = {this.props.makeNewToDoListItemCallBack}/>
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick = {this.props.checkdeleteListCallBack}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick = {this.props.closeListCallBack}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem,index) => (
                        <ToDoItem
                            moveItemUpCallBack = {this.props.moveItemUpCallBack}
                            moveItemDownCallBack = {this.props.moveItemDownCallBack}
                            deleteItemCallBack = {this.props.deleteItemCallBack}
                            changeItemCallBack  = {this.props.changeItemCallBack}
                            black = {this.checkblack(index)}
                            blackdown = {this.checkdownblack(index)}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;