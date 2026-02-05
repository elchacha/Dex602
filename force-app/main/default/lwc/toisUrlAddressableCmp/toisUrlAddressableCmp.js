import { LightningElement ,wire,api} from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';

export default class ToisUrlAddressableCmp extends LightningElement {

    // to open the url , use the CAMELCASE name of the lwc. DO NOT TRUST THE OFFICIAL DOCUMENTATION
    //   url :  /lightning/cmp/c__toisUrlAddressableCmp?c__simpleValue=value&c__simpleValue2=anotherValue


    @wire(CurrentPageReference)
    currentPageRef

    /*
        This is the way to use the CurrentPageReference to get URL parameters values simply in html template
        valuesFromUrl;

        @wire(CurrentPageReference)
        currentPageRef(result) {
            this.valuesFromUrl = result.state;  
        }
    */


}
