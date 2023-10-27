import { LightningElement } from 'lwc';
import getAll from '@salesforce/apex/TripReportBrowser.getAll';

import { NavigationMixin } from "lightning/navigation";
import Id from "@salesforce/user/Id";
import {subscribe,unsubscribe} from 'lightning/empApi';


export default class TripReportBrowser extends NavigationMixin(LightningElement) {
	cols = [
		{
			fieldName:'Date__c', 
			label: 'Date',
			hiddenOnMobile:true
		},
		{
			fieldName:'Name', 
			label: 'Name'
		},
		{
			fieldName:'ReviewType__c', 
			label: 'Type'
		},
		{
			fieldName:'InstructorName', 
			label: 'Instructor'
		},
		{
			fieldName:'Rating__c', 
			label: 'Rating'
		}
	];

	tripReports;
	selectedRecordId=0;


	aControllerParam='my value';
	subscription;
	channelName='/topic/TripReportCreation?CreatedById='+Id;

	connectedCallback() {
		getAll()
		.then((result) => {
			let data = result;
			this.tripReports = [];
			if (data) {
				this.tripReports = data.map ( (report) => ({ 
					Id: report.Id,
					Name: report.Name,
					Date__c: report.Date__c,
					Rating__c: report.Rating__c, 
					Review__c: report.Review__c, 
					ReviewType__c: report.ReviewType__c, 
					InstructorName: (typeof report.Instructor__r === 'undefined') ? '' : report.Instructor__r.Name 
				}));
			} 
		});

		/*
		const thisReference = this;
		// Callback invoked whenever a new event message is received
		const messageCallback = function (response) {
			console.log('view from this : '+this.aControllerParam);
			console.log('view from this.reference : '+thisReference.aControllerParam);
			console.log('response : ',JSON.stringify(response));
			console.log({response});
			getAll()
			.then((result) => {
				let data = result;
				thisReference.tripReports = [];
				if (data) {
					thisReference.tripReports = data.map ( (report) => ({ 
						Id: report.Id,
						Name: report.Name,
						Date__c: report.Date__c,
						Rating__c: report.Rating__c, 
						Review__c: report.Review__c, 
						ReviewType__c: report.ReviewType__c, 
						InstructorName: (typeof report.Instructor__r === 'undefined') ? '' : report.Instructor__r.Name 
					}));
				} 
			});
		};
	
		// Invoke subscribe method of empApi. Pass reference to messageCallback
		subscribe(this.channelName, -1, messageCallback).then((response) => {
		  console.log("Subscription request sent to: ", JSON.stringify(response.channel)
		  );
		  this.subscription = response;
		});
		*/
	}

	onBtnNewClick() {
		this.changeTripReportMode('add');
	}

	onBtnNewNavigation(){
		this[NavigationMixin.Navigate]({
			type: "standard__objectPage",
			attributes: {
			  objectApiName: "TripReport__c",
			  actionName: "new",
			},
			state : {
				navigationLocation : "RELATED_LIST"
			}
		  });
	}

	handleRowClick(event) {
		this.selectedRecordId = event.detail.pk;
	}

	handleRowDblClick() {
		this.changeTripReportMode('edit');
	}
	onBtnEditClick() {
		this.changeTripReportMode('edit');
	}

	changeTripReportMode(newMode) {
		let eventDetail = {
			mode: newMode
		}
		if (newMode === 'edit') {
			eventDetail.Id = this.selectedRecordId;
		}
		const evt = new CustomEvent('tripreportmodechange', {
			detail: eventDetail
		});
		this.dispatchEvent(evt);
		
	}
	
	

}