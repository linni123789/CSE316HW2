'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, initItemId, initOldDescription, initNewDescription, initOldDueDate, initNewDueDate, initOldStatus, initNewStatus) {
        super();
        this.model = initModel;
        this.itemId = initItemId;
        this.oldDescription = initOldDescription;
        this.newDescription = initNewDescription;
        this.oldDueDate = initOldDueDate;
        this.newDueDate = initNewDueDate;
        this.oldStatus = initOldStatus;
        this.newStatus = initNewStatus;
    }

    doTransaction() {
        this.model.changeItem(this.itemId, this.newDescription, this.newDueDate, this.newStatus);
    }

    undoTransaction() {
        this.model.changeItem(this.itemId, this.oldDescription, this.oldDueDate, this.oldStatus);
    }
}