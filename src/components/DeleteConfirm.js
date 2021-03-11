// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class DeleteConfirm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        console.log("Modal created")    
    }
    render() {
        return (
            <div id="modal-overlay">
                <div id="modal">
                    <div class="modal-header header">
                        <h3>Delete List?</h3>
                        <div class="modal-button deleteList" id="cancelDeleteList-button">
                            X
                        </div>
                    </div>
                    <div class="modal-header">
                        <div class="modal-button" id="confirm" onClick = {this.props.deleteListCallBack}>
                            Confirm
                        </div>
                        <div class="modal-button deleteList" id="noconfirm" onClick = {this.props.exitmodalCallBack}>
                            Cancel
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}
export default DeleteConfirm;