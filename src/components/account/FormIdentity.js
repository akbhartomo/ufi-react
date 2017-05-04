import React, { Component } from 'react'
import dateformat from 'dateformat'

const formStyle = {
	backgroundColor: 'transparent',
};

const list_gender = [
	{key:null, text:'Pilih'},
	{key:'M', text:'Laki-Laki'},
	{key:'F', text:'Perempuan'}
];
const list_marital = [
	{key:null, text:'Pilih'},
	{key:'M', text:'Menikah'},
	{key:'S', text:'Belum Menikah'},
	{key:'D', text:'Cerai'}
];

class FormIdentity extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.getOccupationList();
        // console.log("props form Identity = " + JSON.stringify(this.props.data));
        console.log("newDate = " + this.props.data.birthDate);
        let newDate;
        if(this.props.data.birthDate){
            newDate =  new Date(this.props.data.birthDate);
            if ( Object.prototype.toString.call(newDate) === "[object Date]" ) {
                // it is a date
                if ( isNaN( newDate.getTime() ) ) {  // d.valueOf() could also work
                    // date is not valid
                    newDate = new Date();
                }
                else {
                    // date is valid
                }
            }
            else {
                // not a date
                newDate = new Date();
            }
        }
        else {
            newDate = new Date();
        }
        console.log("newDate = " + newDate);
        this.state = {
            occupationOptions: [],
            birthDate:dateformat(newDate, ""),
            birthDatePicker:dateformat(newDate, this.props.data.birthDate)
        };
    }

	handleChange(event) {
		let new_state = {};
		switch(event.target.name){
			case "birthDatePicker" : {
				new_state[event.target.name] = event.target.value;
				Object.assign(new_state, {birthDate:dateformat(event.target.value,"yyyy-mm-dd")});
				break;
			}
			default :
				new_state[event.target.name] = event.target.value;
				break;
		}
		this.setState(new_state);
		console.log("new_state = " + JSON.stringify(new_state));
		// console.log("state = " + JSON.stringify(this.state));
	}

    getOccupationList(){
        console.log("occupation call ");
        let url = 'http://staging-micro.mentimun.co.id/ufi/ufi/customer/inquireListOccupation';
        // let url = 'http://localhost:5019/ufi/customer/inquireListOccupation';
        fetch(url, {
            method: 'GET'
        })
		.then((response) => response.json())
		.then((responseJson) => {
			// console.log("response json = " + JSON.stringify(responseJson));
			let occupationOptionsFromApi = [];
			if(responseJson.status === "SUCCESS"){
				occupationOptionsFromApi.push(
					{key: null, text: 'Pilih'}
				);
				responseJson.payload.listOccupation.map((value, key)=>{
					occupationOptionsFromApi.push(
						{
							key:
							value.name,
							text:
							value.name,
						}
					);
				})
			}
			// console.log("occupyOptionsFromApi = " + JSON.stringify(occupationOptionsFromApi));
			this.setState({
				occupationOptions : occupationOptionsFromApi
			});
		})
    }

	save(){
		if(
			this.state.birthPlace &&
			this.state.birthDate &&
			this.state.gender &&
			this.state.occupation &&
			this.state.maritalStatus &&
			this.state.biologicalMotherName &&
			this.state.occupation!=='Pilih' &&
			this.state.gender!=='Pilih' &&
			this.state.maritalStatus!=='Pilih'
		){
			this.props.save({
				birthPlace:this.state.birthPlace,
				birthDate:this.state.birthDate,
				gender:this.state.gender,
				occupation:this.state.occupation,
				maritalStatus:this.state.maritalStatus,
				biologicalMotherName: this.state.biologicalMotherName,
			}, 2);
		}
		else{
			alert('Silahkan lengkapi data kamu');
			return false;
		}
	}

	componentWillMount(){
		this.setState({
			list_gender: list_gender,
			list_marital: list_marital,
		});
		this.setState({
			birthPlace:this.props.data.birthPlace,
			birthDate:this.props.data.birthDate,
			gender:this.props.data.gender,
			occupation:this.props.data.occupation,
			maritalStatus:this.props.data.maritalStatus,
			biologicalMotherName: this.props.data.biologicalMotherName,
		})
	}

	render() {
		return (
			<div className="ufi-body__form">
				<div className="ufi-body__form--element">
					<label>Tempat Lahir <span className="ufi-field--required">&#42;</span></label>
					<input type="text"
						   onChange={this.handleChange}
						   name="birthPlace"
						   value={this.state.birthPlace}
						   placeholder={'Masukkan tempat lahir'}/>
				</div>

				<div className="ufi-body__form--element">
					<label>Tanggal Lahir <span className="ufi-field--required">&#42;</span></label>
					<input style={formStyle}
						   type="date"
						   onChange={this.handleChange}
						   name="birthDatePicker"
						   value={this.state.birthDatePicker}
						   placeholder={'Pilih tanggal lahir'}/>
				</div>

				<div className="ufi-body__form--element">
					<label>Jenis kelamin <span className="ufi-field--required">&#42;</span></label>
					<select style={formStyle}
							onChange={this.handleChange}
							name="gender"
							value={this.state.gender}>
							{
								this.state.list_gender.map((value, key)=>{
									return <option key={value.key}
												   value={value.key}>{value.text}</option>
								})
							}
					</select>
					<i className="caret"/>
				</div>

				<div className="ufi-body__form--element">
					<label>Pekerjaan <span className="ufi-field--required">&#42;</span></label>
					<select style={formStyle}
							onChange={this.handleChange}
							name="occupation"
							value={this.state.occupation}>
							{
								this.state.occupationOptions.map((value, key)=>{
									return <option key={value.key}
												   value={value.key}>{value.text}</option>
								})
							}
					</select>
					<i className="caret"/>
				</div>

				<div className="ufi-body__form--element">
					<label>Status Pernikahan <span className="ufi-field--required">&#42;</span></label>
					<select style={formStyle}
							onChange={this.handleChange}
							name="maritalStatus"
							value={this.state.maritalStatus}>
							{
								this.state.list_marital.map((value, key)=>{
									return <option key={value.key}
												   value={value.key}>{value.text}</option>
								})
							}
					</select>
					<i className="caret"/>
				</div>

				<div className="ufi-body__form--element">
					<label>Nama Ibu Kandung <span className="ufi-field--required">&#42;</span></label>
					<input type="text"
						   onChange={this.handleChange}
						   name="biologicalMotherName"
						   value={this.state.biologicalMotherName}
						   placeholder={'Masukkan nama Ibu kandung'}/>
				</div>

				<div className="ufi-body__form--element">
					<div className="form__element--submit">
						<button className="ufi-button--submit" onClick={this.save}>Lanjutkan</button>
					</div>
					<div className="form__element--back">
						<button type="button" className="ufi-button--back" onClick={this.props.prevStep}>kembali</button>
					</div>
				</div>


			</div>
		)
	}
}

export default FormIdentity;
