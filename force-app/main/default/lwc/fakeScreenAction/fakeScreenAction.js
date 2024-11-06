import { LightningElement, api,wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions'
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class Sa_Enquete_Transmettre extends LightningElement {
    @api
    get recordId() {
        return this._recordId;
    }
    set recordId(value) {
        this._recordId = value;

        if (this._recordId) {
            this.callApex();
        }
    }

    _recordId;
    isLoading = true;

    callApex() {
        doSomething({ myRecordId: this._recordId})
        .then(() => {
            getRecordNotifyChange([{recordId: this._recordId}]);
            this.isLoading=false;
            this.closeAction();
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            this.closeAction();
        });
    }

    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }


}