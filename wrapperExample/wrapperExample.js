import { LightningElement } from 'lwc';
import getWrapper from '@salesforce/apex/ProcessWrapper.getWrapper';

export default class WrapperExample extends LightningElement {

    result;

    connectedCallback(){
        getWrapper().then((result) => {
            console.log('result',JSON.stringify(result));
            this.result=result;
        });
    }

}