import { LightningElement,api } from 'lwc';

export default class AlphabetSearch extends LightningElement {

    ALPHABET=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    @api apiName;

    searchLetter(event){
        const letterSelected = event.target.dataset.letter;
        const selectEvent = new CustomEvent('searchletter', {
            detail: letterSelected
        });
       this.dispatchEvent(selectEvent);
    }

}