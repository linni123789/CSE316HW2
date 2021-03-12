// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { hexToRgb } from '@material-ui/core';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changingTask : false,
            changingDate : false,
            changingStatus : false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleMoveItemUp = (event) => {
        this.props.moveItemUpCallBack(this.props.toDoListItem.id);
    }
    
    handleMoveItemDown = () => {
        this.props.moveItemDownCallBack(this.props.toDoListItem.id);
    }
    
    handleDeleteItem = (item) => {
        this.props.deleteItemCallBack(this.props.toDoListItem);
    }
    handleTaskChange = (event) => {
        this.props.changeItemCallBack(this.props.toDoListItem.id, event.target.value, this.props.toDoListItem.due_date, this.props.toDoListItem.status);
        this.setState({
            changingTask: false
        })
    }
    handleDateChange = (event) => {
        this.props.changeItemCallBack(this.props.toDoListItem.id, this.props.toDoListItem.description, event.target.value, this.props.toDoListItem.status);
        this.setState({
            changingDate: false
        })
    }
    handleStatusChange = (event) => {
        this.props.changeItemCallBack(this.props.toDoListItem.id, this.props.toDoListItem.description, this.props.toDoListItem.due_date, event.target.value);
        this.setState({
            changingStatus: false
        })
    }

    changeTasktrue = () => {
        this.setState({
            changingTask: true
        })
    }
    changeDatetrue = () => {
        this.setState({
            changingDate: true
        })
    }
    changeStatustrue = () => {
        this.setState({
            changingStatus: true
        })
    }

    render() {
        // DISPLAY WHERE WE ARE
        let keyboardArrowUp = <KeyboardArrowUp className='list-item-control todo-button moveup' onClick={this.handleMoveItemUp}/>;
        if (this.props.black === true){
            keyboardArrowUp = <KeyboardArrowUp className='list-item-control todo-button moveup disable' onClick={this.handleMoveItemUp}/>
        }
        let keyboardArrowDown = <KeyboardArrowDown className='list-item-control todo-button movedown' onClick={this.handleMoveItemDown}/>
        if(this.props.blackdown === true){
            keyboardArrowDown = <KeyboardArrowDown className='list-item-control todo-button movedown disable' onClick={this.handleMoveItemDown}/>
        }
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {
                (this.state.changingTask) ? <input className='item-col task-col' type ='text' onBlur = {this.handleTaskChange} defaultValue = {listItem.description}></input>
                : <div className='item-col task-col' onClick = {this.changeTasktrue}>{listItem.description}</div> 
                }  
                {
                (this.state.changingDate) ? <input className='item-col due-date-col' type = 'date' onBlur = {this.handleDateChange} defaultValue = {listItem.due_date}></input>
                : <div className='item-col due-date-col' type = 'date' onClick = {this.changeDatetrue}>{listItem.due_date}</div>
                }
                {
                (this.state.changingStatus) ? <select className='item-col status-col' className={statusType} onBlur = {this.handleStatusChange} defaultValue = {listItem.status}>{}
                <option>complete</option>
                <option>incomplete</option>
                </select>
                : <div className='item-col status-col' className={statusType} onClick = {this.changeStatustrue}>{listItem.status}</div>
                }
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    {keyboardArrowUp}
                    {keyboardArrowDown}
                    <Close className='list-item-control todo-button' onClick ={this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;