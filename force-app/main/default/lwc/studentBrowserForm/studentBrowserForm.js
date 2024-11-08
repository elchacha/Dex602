import { LightningElement, wire } from 'lwc';
import getInstructors from '@salesforce/apex/StudentBrowserForm.getInstructors';
import getDeliveriesByInstructor from '@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

import tableScreenFlowModal from 'c/tableScreenFlowModal';
import ModalCourseDelivery from 'c/modalCourseDelivery';
import{ refreshApex } from '@salesforce/apex';
import {subscribe,unsubscribe} from 'lightning/empApi';
import Id from "@salesforce/user/Id";


export default class StudentBrowserForm extends NavigationMixin(LightningElement) {
	instructors = [];
	selectedInstructorId = '';
	deliveries = [];
	selectedDeliveryId = '';
	isButtonDisabled = true;

	// pushTopic management
	subscription;
	channelName='/topic/CourseDeliveryCreation?CreatedById='+Id;

	connectedCallback() {
		// don't forget to add a bind(this) to refreshData method. otherwise, the this._wired_getDeliveriesByInstructor will be unknown
		subscribe(this.channelName, -1, this.refreshData.bind(this)).then((response) => {
			this.subscription = response;
		});
	}

	error;
	@wire(getInstructors)
	wired_getInstructors(result) {
		this.instructors = [];  
		if (result.data) {
			this.instructors.push({
				value: '',
				label: 'Select an instructor'
			});
			result.data.forEach(instructor => {
				this.instructors.push({
					value: instructor.Id,
					label: instructor.Name
				});
			});
		} else if (result.error) {
			this.error = result.error;
		}
	}


	_wired_getDeliveriesByInstructor;
	@wire(getDeliveriesByInstructor, { instructorId: '$selectedInstructorId' })
	wired_getDeliveriesByInstructor(result) {
		this._wired_getDeliveriesByInstructor = result;
		this.deliveries = [];
		if (result.data && result.data.length) {
			console.log('result.data>'+result.data.length);
			this.deliveries = result.data.map(delivery => ({
				value: delivery.Id,
				label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attendee_Count__c} students`
			}));

			this.deliveries.unshift({
				value: '',
				label: 'Any Delivery' 
			});

		} else if (result.error) {
			this.error = result.error;
		}
	}

	onInstructorChange(event) {
		this.selectedDeliveryId = '';
		this.selectedInstructorId = event.target.value;
		this.isButtonDisabled = (this.selectedInstructorId === '');
		this.notifyParent();
	}

	onDeliveryChange(event) {
		this.selectedDeliveryId = event.target.value;
		this.notifyParent();
	}

	onAddNewDelivery() {
		// Opens the new Course Delivery record modal dialog 
		// with the selected InstructorId prepopulated
		let pageInfo = {
			type: "standard__objectPage",
			attributes: {
				objectApiName: "Course_Delivery__c",
				actionName: "new"
			},
			state: {
				defaultFieldValues: encodeDefaultFieldValues({
					Instructor__c: this.selectedInstructorId
				}),
				navigationLocation : "RELATED_LIST"
			}
		};
		this[NavigationMixin.Navigate](pageInfo); 
	}

	notifyParent() {
		const evt = new CustomEvent('filterchange', {
			detail: {
				instructorId: this.selectedInstructorId,
				deliveryId: this.selectedDeliveryId,
			}
		});

		this.dispatchEvent(evt);
	}


	refreshData(){
		refreshApex(this._wired_getDeliveriesByInstructor);
	}

	async createNewDeliveryScreenFlow(info){
        const result = await tableScreenFlowModal.open({
            size: 'small',
            description: 'Able to open any screenFlowInModal',
            content: {screenFlowName : 'createCourse' , inputVariables : [{name: 'iInstructorId',type: 'String',value: this.selectedInstructorId}]}
        });
		this.refreshData();
    }

	async createNewDeliveryModal() {
        const result = await ModalCourseDelivery.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: this.selectedInstructorId,
        });
		this.refreshData();
    }

}
