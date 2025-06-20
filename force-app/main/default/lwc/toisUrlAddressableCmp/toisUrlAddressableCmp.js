import { LightningElement ,wire} from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';

export default class ToisUrlAddressableCmp extends LightningElement {

    // to open the url , use the CAMELCASE name of the lwc. DO NOT TRUST THE OFFICIAL DOCUMENTATION

    @wire(CurrentPageReference)
    currentPageRef;
    
    get urlName(){
        return this.currentPageRef.state.c__propertyValue;
    }
}
