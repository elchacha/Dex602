import { LightningElement } from 'lwc';
import Utils from 'c/utils';

import Id from "@salesforce/user/Id";
import {subscribe,unsubscribe} from 'lightning/empApi';

const VIEW_STUDENT_BROWSER = 'students';
const VIEW_TRIP_REPORTS = 'tripreports';
const VIEW_CERTIFICATION = 'certifiedStudents';
const VIEW_POPULARITY = 'certPopularity';

export default class LayoutManager extends LightningElement {

	viewMode = VIEW_STUDENT_BROWSER;
	certificationName = '';
	certificationId = 0;
	modalHeader = '';
	modalContent ='';


	aControllerParam='my value';
	subscription;
	channelName='/topic/TripReportCreation?CreatedById='+Id;

	connectedCallback() {
		Utils.showToast(
			this,
			'Welcome',
			"Don't forget to check back here for updated class schedules and assignments",
			'info'
		);

		const thisReference = this;
		// Callback invoked whenever a new event message is received
		const messageCallback = function (response) {
			console.log('view from this : '+this.aControllerParam);
			console.log('view from this.reference : '+thisReference.aControllerParam);
			console.log('response : ',JSON.stringify(response));
			console.log({response});
		};
	
		// Invoke subscribe method of empApi. Pass reference to messageCallback
		subscribe(this.channelName, -1, messageCallback).then((response) => {
		  console.log("Subscription request sent to: ", JSON.stringify(response.channel)
		  );
		  this.subscription = response;
		});
	}

	handleShowModal(event) {
		this.modalHeader = event.detail.header;
		this.modalContent = event.detail.content;
		const modal = this.template.querySelector('c-modal');
		modal.show();
	}

	closeModal() {
		const modal = this.template.querySelector('c-modal');
		modal.hide();
	}

	handleNavItemSelected(event) {
		const selectedItemName = event.detail.itemName;
		
		if (selectedItemName === 'students') {
			this.viewMode = VIEW_STUDENT_BROWSER;
		} else if (selectedItemName === 'tripreports') {
			this.viewMode = VIEW_TRIP_REPORTS;
		} else if (selectedItemName === 'certpopularity') {
			this.viewMode = VIEW_POPULARITY;
		} else if (selectedItemName.indexOf('certification') !== -1) {
			this.viewMode = VIEW_CERTIFICATION;
			const selectedCertificationObj = selectedItemName.split('|');
			this.certificationId = selectedCertificationObj[1];
			this.certificationName = selectedCertificationObj[2];
		}
	}

	get studentBrowserView() {
		return (this.viewMode === VIEW_STUDENT_BROWSER);
	}
	get tripReportView() {
		return (this.viewMode === VIEW_TRIP_REPORTS);
	}
	get certifiedStudentsView() {
		return (this.viewMode === VIEW_CERTIFICATION);
	}
	get certPopularityView() {
		return (this.viewMode === VIEW_POPULARITY);
	}
}