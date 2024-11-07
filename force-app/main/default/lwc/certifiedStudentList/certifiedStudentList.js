import { LightningElement, api, wire } from 'lwc';
import getCertifiedStudents from '@salesforce/apex/CertifiedStudentList.getCertifiedStudents';
import searchRecord from '@salesforce/apex/AlphabetSearch.searchRecord';

import deleteStudentCertification from
'@salesforce/apex/CertifiedStudentList.deleteStudentCertification';
import { refreshApex } from '@salesforce/apex';

export default class CertifiedStudentList extends LightningElement {

    @api certificationId = 0;
    @api certificationName = '';
    certifiedStudents;
    btnGroupDisabled = true;
    error;
    _wiredStudentResult;
    
    @wire(getCertifiedStudents, {certificationId: '$certificationId'})
    wired_getCertifiedStudents(result) {
        this._wiredStudentResult = result;
        this.certifiedStudents = [];
        if (result.data) {
            this.certifiedStudents = result.data.map(student => ({
                certificationHeldId: student.Id,
                contactId: student.Certified_Professional__r.Id,
                name: student.Certified_Professional__r.Name,
                date: student.Date_Achieved__c,
                email: student.Certified_Professional__r.Email,
                phone: student.Certified_Professional__r.Phone
            }));
        } else if (result.error) {
            this.error = result.error;
        }
    }

    columnConfig = [
        {
            label: 'Name',
            fieldName: 'name',
            type: 'text',
            apiName:'Certified_Professional__r.Name',
            sortable : true
        },
        {
            label: 'Date',
            fieldName: 'date',
            type: 'text'
        },
        {
            label: 'Email',
            fieldName: 'email',
            apiName:'Certified_Professional__r.Email',
            type: 'email',
            sortable : true
            
        },
        {
            label: 'Phone',
            fieldName: 'phone',
            type: 'phone'
        }
    ];

    handleHeaderAction (event) {
        // Retrieves the name of the selected filter
        const actionName = event.detail.action.name;
        // Retrieves the current column definition
        // based on the selected filter
        const colDef = event.detail.columnDefinition;
        const columns = this.columns;
        
        console.log(actionName);
        console.log(colDef);
    }

    apiName;
    updateColumnSorting(event) {
        var fieldName = event.detail.fieldName;
        this.columnConfig.filter(column => {
            if (column.fieldName === fieldName) {
                this.apiName = column.apiName;
            }
        });
        console.log('apiName>'+this.apiName);
   }
    
    onRowSelection(event) {
        let numSelected = event.detail.selectedRows.length;
        this.btnGroupDisabled= (numSelected===0);
    }

    getSelectedIDs() {
        let datatable = this.template.querySelector('lightning-datatable');
        let ids = datatable.getSelectedRows().map( (r) => (
            r.certificationHeldId            
        ));
        return ids;
    }

    onCertActions (event) {
        const btnClicked = event.target.getAttribute('data-btn-id');
        switch (btnClicked) {
            case 'btnEmail':
                break;
            case 'btnSendCert':
                break;
            case 'btnDelete':
                this.onDelete();
                break;
            default:
                break;
        }
    }
    onDelete() {
        let certificationIds = this.getSelectedIDs();
        deleteStudentCertification({certificationIds})
        .then(  () => {
            refreshApex(this._wiredStudentResult);
        })
        .catch(error => {
            this.error = error;
        });
        
    }

    displayFilteredList(event){
        console.log('searching !!');
        console.log('letter selected : '+event.detail);
        searchRecord({letter : event.detail,fieldName :this.apiName,certificationId : null}).then(  (data) => {
            this.certifiedStudents = [];
            this.certifiedStudents = data.map(student => ({
                certificationHeldId: student.Id,
                contactId: student.Certified_Professional__r.Id,
                name: student.Certified_Professional__r.Name,
                date: student.Date_Achieved__c,
                email: student.Certified_Professional__r.Email,
                phone: student.Certified_Professional__r.Phone
            }));
        })
        .catch(error => {
            this.error = error;
        });
    }
}