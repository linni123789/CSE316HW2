// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

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

    handleMoveItemUp = () => {
        this.props.moveItemUpCallBack(this.props.toDoListItem.id);
    }
    
    handleMoveItemDown = () => {
        this.props.moveItemDownCallBack(this.props.toDoListItem.id);
    }
    
    handleDeleteItem = (id) => {
        this.props.deleteItemCallBack(this.props.toDoListItem.id);
    }
    handleTaskChange = (event) => {
        this.props.changeTaskCallBack(this.props.toDoListItem.id, event.target.value);
        this.setState({
            changingTask: false
        })
    }
    handleDateChange = (event) => {
        this.props.changeDateCallBack(this.props.toDoListItem.id, event.target.value);
        this.setState({
            changingDate: false
        })
    }
    handleStatusChange = (event) => {
        this.props.changeStatusCallBack(this.props.toDoListItem.id, event.target.value);
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
                    <KeyboardArrowUp className='list-item-control todo-button' onClick={this.handleMoveItemUp}/>
                    <KeyboardArrowDown className='list-item-control todo-button' onClick={this.handleMoveItemDown} />
                    <Close className='list-item-control todo-button' onClick ={this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;