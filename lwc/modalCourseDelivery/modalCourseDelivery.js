import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';



export default class ModalCourseDelivery extends LightningModal  {
    @api content;

	connectedCallback() {
        console.log('content>'+this.content);
    }

    doSuccess() {
        this.close('success');
	}

    doCancel(){
        console.log('cancel ????');
        this.close('cancel');
    }
}