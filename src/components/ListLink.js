// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { yellow } from '@material-ui/core/colors';
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changingText: false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = (event) => {
        if (event.detail === 1){
            this.props.loadToDoListCallback(this.props.toDoList);
        }
        else if(event.detail === 2 && (this.props.toDoList.id == this.props.currentList.id)){
            this.setState({
                changingText: true
            })
        }
    }

    handleListNameChange = (event) => {
        this.props.listNameChangeCallBack(event.target.value);
        this.setState({
            changingText: false
        })
    }

    render() {
        // DISPLAY WHERE WE ARE
        let list = <div className='todo-list-button' onClick={this.handleLoadList}>{this.props.toDoList.name}<br /></div>
        let input = <input className='textchange invisible' type ='text'></input>

        if (this.state.changingText == true){
            list = <div className='todo-list-button invisible' >{this.props.toDoList.name}<br /></div>
            input = 
            <input 
            className='textchange' 
            type ='text'
            onBlur = {this.handleListNameChange}
            defaultValue = {this.props.toDoList.name}
            ref ={(input) => 
                {this.listName = input;
                if(this.listName){
                    this.listName.focus();
                }
            }}
            >   
            </input>
        }
        else{
            if (this.props.yellow === true){
                list = <div className='todo-list-button yellow' onClick={this.handleLoadList}>{this.props.toDoList.name}<br /></div>
            }
            else{
                list = <div className='todo-list-button' onClick={this.handleLoadList}>{this.props.toDoList.name}<br /></div>
            }
            input = <input className='textchange invisible' type ='text'></input>
        }
        
        console.log("\t\t\tListLink render");
        return (
            <div>
            {input}
            {list}
            </div>
            
        )
    }
}

export default ListLink;