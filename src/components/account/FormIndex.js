import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Identity from './FormIdentity';
import Applicant from './FormApplicant';
import Address from './FormAddress';
import Finance from '../financing/FormFinance';
import Success from '../order/FormSuccess';
import StepList1 from '../step/StepList1Component';
import StepList2 from '../step/StepList2Component';
import StepList3 from '../step/StepList3Component';
import StepList4 from '../step/StepList4Component';


let save_data = {
	token: '',
	userId: 0,
	collateral: '',
	collateralNumber:'',
	collateralBrand:'',
	customerId: 0,
	totalLoan: '',
	loanPeriod: '',
	idNumber:'',
	contractNumber:'',
	fullname: '',
	handphoneNumber:'',
	email:'',
	birthPlace:'',
	birthDate:'',
	gender:'',
	occupation:'',
	maritalStatus:'',
	biologicalMotherName:'',
	stateCode:'',
	cityCode:'',
	districtCode:'',
	subdistrictCode:'',
	zipCode:'',
	address:'',
	visitTimeStamp:'',
	errorMessage:'',
	flagFif:'',
	flagMentimun:'',
	action:0
};

class FormIndex extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.saveDataOrderToApi();
        this.prevStep = this.prevStep.bind(this);
        this.state = {
            index: 0,
            data : save_data,
        }
    }

	save(data, index){

		if(index !== 3) {
			let state = {
				index: index + 1,
				data : this.state.data
			};
			Object.assign(state.data, data);
			this.setState(state);
		}
		else {
			let state = {
				data: this.state.data
			};
			Object.assign(state.data, data);
			this.setState(state);
		}

		if(index === 3) {
			console.log("waktunya hit api");
			this.saveDataOrderToApi(save_data);
		}
		console.log("data yang sudah disave = " + JSON.stringify(this.state.data));
	}

	saveDataOrderToApi(data){
		let url = 'http://staging-micro.mentimun.co.id/ufi/ufi/order/addOrderUfi';
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("response json = " + JSON.stringify(responseJson));
			// let stateOptionsFromApi = [];
			if(responseJson.status === "SUCCESS"){
				browserHistory.push({
					query: {stateOrder : "SUCCESS"}
				});

				let submitState = this.state.data;
				Object.assign(submitState,{orderNumber: responseJson.payload.orderNumber});
				Object.assign(submitState,{orderId: responseJson.payload.orderId});

				this.setState({
                    index: this.state.index + 1,
					data : submitState
                });
			}
			else{
				// console.log("gagal submit = " + responseJson.message);
				this.setState({
					errorMessage : responseJson.message
				});
			}
		})
	}

	componentWillMount(){
		if(this.props.location.query && this.props.location.query.token
		// && this.isInt(this.props.location.query.userId)
		){
			let data = this.state.data;
			Object.assign(data,{token:this.props.location.query.token});
            Object.assign(data,{userId:parseInt(this.props.location.query.userId)});

			this.setState({
				data: data
			});
			console.log(JSON.stringify(this.state.data));
		}
		console.log("data dari url = " + JSON.stringify(this.props));
	}

	// Routing back
	prevStep() {
		this.setState({
			index: this.state.index - 1
		})
	}

	render() {
		return (
			<div>
				{/* Step List Component */}
				{this.state.index===0 && <StepList1/>}
				{this.state.index===1 && <StepList2/>}
				{this.state.index===2 && <StepList3/>}
				{this.state.index===3 && <StepList4/>}

				{/* Subheader Component */}
				{(this.state.index>=1 && this.state.index<=3) && <h1 className="ufi-subheader__title">Data Pemohon</h1>}
				{this.state.index===4 && <h1 className="ufi-subheader__title">Ringkasan Pembiayaan</h1>}

				{/* Form Index Component */}
				{this.state.index===0 && <Finance data={this.state.data}
												  save={this.save}/>
				}
				{this.state.index===1 && <Applicant data={this.state.data}
												  	save={this.save}
													prevStep={this.prevStep} />
				}
				{this.state.index===2 && <Identity data={this.state.data}
												   save={this.save}
												   prevStep={this.prevStep} />
				}
				{this.state.index===3 && <Address data={this.state.data}
												  save={this.save}
												  prevStep={this.prevStep} />
				}
				{this.state.index===4 && <Success data={this.state.data}/>}
			</div>
		)
	}
}

export default FormIndex
