import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MyInput from '../Inputvalidator';

let save_data = {
    token:'',
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

class FormApplicant extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.nameAndPhoneNumberCheckToAPI = this.nameAndPhoneNumberCheckToAPI.bind(this);
        this.phoneNumberAndEmailCheckToAPI = this.phoneNumberAndEmailCheckToAPI.bind(this);
        // this.idNumberCheckToAPI = this.idNumberCheckToAPI.bind(this);
        this.state = {
            data: save_data,
            fif: true,
            mentimun: true,
            FlagfullnameCheck: false,
            FlaghandphoneNumberCheck: false,
            FlagemailCheck: false,
            // FlagidNumberFound:false
        };
    }

    handleChange(event) {
        let new_state = {};
        switch(event.target.name){
            case 'fif' : {
                new_state[event.target.name] = event.target.value === 'true';
                break;
            }
            case 'mentimun' : {
                new_state[event.target.name] = event.target.value === 'true';
                break;
            }
            case 'fullname': {
                new_state['fullname'] = event.target.value;
                new_state['FlagfullnameCheck'] = false;
                break;
            }
            case 'handphoneNumber': {
                new_state['handphoneNumber'] = event.target.value;
                new_state['FlaghandphoneNumberCheck'] = false;
                break;
            }
            case 'email': {
                new_state['email'] = event.target.value;
                new_state['FlagemailCheck'] = false;
                break;
            }
            // case 'idNumber' : {
            //     new_state['idNumber'] = event.target.value;
            //     new_state['FlagidNumberFound'] = false;
            //     break;
            // }
            default :
                new_state[event.target.name] = event.target.value;
                break;
        }
        this.setState(new_state);
        // console.log("event.target.name = " + event.target.name);
        // console.log("event.target.value = " + event.target.value);
        console.log(event.target.name+" new state = " +JSON.stringify(new_state));
    }

    nameAndPhoneNumberCheckToAPI() {
        let url = 'http://staging-micro.mentimun.co.id/ufi/ufi/customer/inquireCustomerDataByNameAndHandphoneNumber';
        // let url = 'http://10.3.3.18:8080/ufi/customer/inquireCustomerDataByNameAndHandphoneNumber';
        let fullnameTemp = this.state.fullname;
        let handphoneNumberTemp = this.state.handphoneNumber;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullnameTemp,
                handphoneNumber: handphoneNumberTemp
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("response json: " + JSON.stringify(responseJson));
            if( responseJson.status === "SUCCESS" &&
                responseJson.payload ) {
                console.log("Respon dari API");
                let new_state = {};
                    Object.assign(new_state,{customerId:responseJson.payload.customerId});
                    Object.assign(new_state,{idNumber:responseJson.payload.idNumber});
                    Object.assign(new_state,{contractNumber:responseJson.payload.contractNumber});
                    Object.assign(new_state,{fullname:responseJson.payload.fullname});
                    Object.assign(new_state,{handphoneNumber:responseJson.payload.handphoneNumber});
                    Object.assign(new_state,{email:responseJson.payload.email});
                    Object.assign(new_state,{birthPlace:responseJson.payload.birthPlace});
                    Object.assign(new_state,{birthDate:responseJson.payload.birthDate});
                    Object.assign(new_state,{gender:responseJson.payload.gender});
                    Object.assign(new_state,{occupation:responseJson.payload.occupation});
                    Object.assign(new_state,{maritalStatus:responseJson.payload.maritalStatus});
                    Object.assign(new_state,{biologicalMotherName:responseJson.payload.biologicalMotherName});
                    Object.assign(new_state,{stateCode:responseJson.payload.idStateCode});
                    Object.assign(new_state,{cityCode:responseJson.payload.idCityCode});
                    Object.assign(new_state,{districtCode:responseJson.payload.idDistrictCode});
                    Object.assign(new_state,{subdistrictCode:responseJson.payload.idSubdistrictCode});
                    Object.assign(new_state,{zipCode:responseJson.payload.idZipCode});
                    Object.assign(new_state,{address:responseJson.payload.idAddress});
                    Object.assign(new_state,{FlagfullnameCheck:true});
                    Object.assign(new_state,{FlaghandphoneNumberCheck:true});
                    Object.assign(new_state,{FlagemailCheck:true});

            this.setState(new_state);
                console.log("new state = " + JSON.stringify(new_state));
            }
            else if (responseJson.status === "FAILED" && responseJson.message === "nama harus diisi") {
                alert(responseJson.message);
            }
            else if (responseJson.status === "FAILED" && responseJson.message === "nomor telepon harus diisi") {
                alert(responseJson.message);
            }
            else if (responseJson.status === "FAILED" && responseJson.message === "data customer tidak ditemukan") {
                alert(responseJson.message);
            }
            else if (responseJson.status === "FAILED" && responseJson.message === "Data yang kamu masukkan belum terdaftar sebagai pelanggan/agen Mentimun") {
                alert(responseJson.message);
            }
            else {
                console.log("tidak ada response dari api");
                alert('Nama dan nomor handphone harus diisi');
            }
        })
    }

    phoneNumberAndEmailCheckToAPI() {
        let url = 'http://staging-micro.mentimun.co.id/ufi/ufi/order/validasiCheckOutStep2';
        // let url = 'http://10.3.3.18:8080/ufi/order/validasiCheckOutStep2';
        let emailTemp = this.state.email;
        let handphoneNumberTemp = this.state.handphoneNumber;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailTemp,
                handphoneNumber: handphoneNumberTemp,
                flagFif: this.state.fif,
                flagMentimun: this.state.mentimun
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status === "SUCCESS" && responseJson.payload === 1){
                this.save();
            }
            else if(responseJson.status === "FAILED" && responseJson.message === "email dan nomor handphone tidak bisa digunakan"){
                alert("Email / Nomor Handphone sudah terdaftar");
            }
            else if(responseJson.status === "FAILED" && responseJson.message === "nomor handphone tidak bisa digunakan"){
                alert("Nomor handphone sudah terdaftar");
            }
            else if(responseJson.status === "FAILED" && responseJson.message === "domain email tidak valid"){
                alert("Domain email tidak valid");
            }
            else if(responseJson.status === "FAILED" && responseJson.message === "email tidak bisa digunakan"){
                alert("Email sudah terdaftar");
            }
            else {
                if( this.state.idNumber &&
                    // this.state.contractNumber &&
                    this.state.fullname &&
                    this.state.handphoneNumber &&
                    this.state.email
                ) {
                    this.save();
                }
                else {
                    alert("Periksa kembali data kamu");
                }
            }
        })
    }

    save() {
        if( (this.state.FlagfullnameCheck && this.state.FlaghandphoneNumberCheck) ||
            (this.state.FlagfullnameCheck===true && this.state.FlaghandphoneNumberCheck===true && this.state.FlagemailCheck===true)
        ){
            if(
                this.state.idNumber.length===16 &&
                // this.state.contractNumber &&
                this.state.fullname &&
                this.state.handphoneNumber &&
                this.state.handphoneNumber.length>=10 &&
                this.state.handphoneNumber.length<=14 &&
                this.state.handphoneNumber.match(/^((?:\62)|0)[2-9]{1}[0-9]+$/) &&
                // this.state.handphoneNumber.match(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/) &&
                this.state.email
                // this.state.birthPlace &&
                // this.state.birthDate &&
                // this.state.gender &&
                // this.state.occupation &&
                // this.state.maritalStatus &&
                // this.state.stateCode &&
                // this.state.cityCode &&
                // this.state.districtCode &&
                // this.state.subdistrictCode &&
                // this.state.zipCode &&
                // this.state.address
            ){
                this.props.save({
                    customerId: this.state.customerId,
                    idNumber: this.state.idNumber,
                    contractNumber: this.state.contractNumber,
                    fullname: this.state.fullname,
                    handphoneNumber: this.state.handphoneNumber,
                    email: this.state.email,
                    birthPlace: this.state.birthPlace,
                    birthDate: this.state.birthDate,
                    gender: this.state.gender,
                    occupation: this.state.occupation,
                    maritalStatus: this.state.maritalStatus,
                    stateCode: this.state.stateCode,
                    cityCode: this.state.cityCode,
                    districtCode: this.state.districtCode,
                    subdistrictCode: this.state.subdistrictCode,
                    zipCode: this.state.zipCode,
                    address: this.state.address,
                    flagFif: this.state.fif,
                    flagMentimun: this.state.mentimun
                }, 1);
            }

            else if(this.state.idNumber.length !== 16 ) {
                alert('Periksa kembali Nomor KTP kamu, harus 16 digit');
                return false;
            }

            else if(this.state.handphoneNumber.length<10 ||
                    this.state.handphoneNumber.length>14 ||
                    !this.state.handphoneNumber.match(/^((?:\62)|0)[2-9]{1}[0-9]+$/)) {
                alert('Periksa kembali format Nomor Handphone kamu');
                return false;
            }
            // else {
            //     alert('Silahkan periksa kembali dan lengkapi data identitas kamu di aplikasi Mentimun');
            //     return false;
            // }
        }

        else {
            if(
                this.state.idNumber.length===16 &&
                // this.state.contractNumber &&
                this.state.fullname &&
                this.state.handphoneNumber &&
                this.state.handphoneNumber.length>=10 &&
                this.state.handphoneNumber.length<=14 &&
                this.state.handphoneNumber.match(/^((?:\62)|0)[2-9]{1}[0-9]+$/) &&
                // this.state.handphoneNumber.match(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/) &&
                this.state.email
            ){
                console.log("save all data");
                this.props.save({
                    customerId: this.state.customerId,
                    idNumber: this.state.idNumber,
                    contractNumber: this.state.contractNumber,
                    fullname: this.state.fullname,
                    handphoneNumber: this.state.handphoneNumber,
                    email: this.state.email,
                    flagFif: this.state.fif,
                    flagMentimun: this.state.mentimun
                }, 1);
            }

            else{
                alert('Periksa kembali data kamu');
                return false;
            }
        }
    }

    componentWillMount() {
        this.setState({
            customerId: this.props.data.customerId,
            idNumber: this.props.data.idNumber,
            contractNumber: this.props.data.contractNumber,
            fullname: this.props.data.fullname,
            handphoneNumber: this.props.data.handphoneNumber,
            email: this.props.data.email,
        })
    }

    render() {
        return (
        <div className="ufi-wrapper">
            <div className="ufi-body__form">
                <div className="ufi-body__form--element">
                    <span>Apakah kamu adalah konsumen FIF?</span>
                    <div className="ufi-body__form--inline">
                        <input id="fif1" type="radio"
                               onChange={this.handleChange}
                               name="fif"
                               value="true"
                               checked={this.state.fif}/>
                        <label htmlFor="fif1">Ya</label>
                    </div>

                    <div className="ufi-body__form--inline">
                        <input id="fif0"
                               type="radio"
                               onChange={this.handleChange}
                               name="fif"
                               value="false"
                               checked={!this.state.fif}/>
                        <label htmlFor="fif0">Tidak</label>
                    </div>
                </div>

                <div className="ufi-body__form--element">
                    <span>Apakah kamu sudah terdaftar sebagai pelanggan/agen Mentimun?</span>
                    <div className="ufi-body__form--inline">
                        <input id="mentimun1"
                               type="radio"
                               onChange={this.handleChange}
                               name="mentimun"
                               value="true"
                               checked={this.state.mentimun}/>
                        <label htmlFor="mentimun1">Ya</label>
                    </div>

                    <div className="ufi-body__form--inline">
                        <input id="mentimun0"
                               type="radio"
                               onChange={this.handleChange}
                               name="mentimun"
                               value="false"
                               checked={!this.state.mentimun}/>
                        <label htmlFor="mentimun0">Tidak</label>
                    </div>
                </div>

                <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton}>
                    <div className="ufi-body__form--element">
                        <MyInput title="Nama Lengkap"
                                 type="text"
                                 validations="isWords"
                                 onChanges={this.handleChange}
                                 name="fullname"
                                 values={this.state.fullname}
                                 placeholder="Masukkan nama lengkap"
                                 required
                        />
                    </div>
                    { !this.state.FlagemailCheck || this.state.FlagemailCheck?
                        <div className="ufi-body__form--element">
                            <MyInput title="Nomor Handphone"
                                     type="number"
                                     validations={{
                                         matchRegexp: /^((?:\62)|0)[2-9]{1}[0-9]+$/,
                                         minLength: 10,
                                         maxLength: 14,
                                     }}
                                     validationErrors={{
                                         matchRegexp: 'Format nomor harus diawali "0"',
                                         minLength: 'Nomor handphone minimal 10 digit',
                                         maxLength: 'Nomor handphone maksimum 14 digit',
                                     }}
                                     onChanges={this.handleChange}
                                     name="handphoneNumber"
                                     values={this.state.handphoneNumber}
                                     placeholder="Masukkan nomor handphone"
                                     required
                            />
                        </div>:null
                    }
                    {
                        (this.state.fif && (this.state.FlagfullnameCheck && this.state.FlaghandphoneNumberCheck)) || (this.state.fif && !this.state.mentimun)?
                            <div className="ufi-body__form--element tooltip__custom">
                                <MyInput title="Nomor Kontrak FIF"
                                         type="number"
                                         validations="isNumeric"
                                         onChanges={this.handleChange}
                                         name="contractNumber"
                                         values={this.state.contractNumber}
                                         placeholder="Masukkan nomor kontrak FIF"
                                />
                            </div>:null
                    }
                    {
                        ( this.state.mentimun===false ) || (this.state.FlagfullnameCheck && this.state.FlaghandphoneNumberCheck)?
                            <div>
                                <div className="ufi-body__form--element">
                                    <MyInput title="Nomor KTP"
                                             type="number"
                                             validations={{
                                                 isLength: 16
                                             }}
                                             validationErrors={{
                                                 isLength: 'Cek kembali Nomor KTP Kamu, tidak melebihi atau kurang dari 16 digit'
                                             }}
                                             onChanges={this.handleChange}
                                             name="idNumber"
                                             values={this.state.idNumber}
                                             placeholder="Masukkan nomor KTP"
                                             required
                                    />
                                </div>
                                <div className="ufi-body__form--element">
                                    <MyInput title="Email"
                                             type="email"
                                             validations="isEmail"
                                             validationError="Format email harus valid"
                                             onChanges={this.handleChange}
                                             name="email"
                                             values={this.state.email}
                                             placeholder="Masukkan email"
                                             required
                                    />
                                </div>
                            </div>:null
                    }
                    <div className="ufi-body__form--element clearfix">
                        {
                            <div className="form__element--submit">
                                {
                                    (!this.state.mentimun) ||
                                    (this.state.FlagfullnameCheck && this.state.FlaghandphoneNumberCheck && (this.state.FlagemailCheck || !this.state.FlagemailCheck))?
                                        <div>
                                            <button type="submit" className="ufi-button--submit" onClick={this.save && this.phoneNumberAndEmailCheckToAPI}>lanjutkan</button>
                                        </div>:null
                                }
                                {
                                    (this.state.mentimun) &&
                                    (!this.state.FlagfullnameCheck || !this.state.FlaghandphoneNumberCheck)?
                                        <div>
                                            <button type="submit" className="ufi-button--submit" onClick={this.nameAndPhoneNumberCheckToAPI}>cek data</button>
                                        </div>:null
                                }
                            </div>
                        }
                        {
                            <div className="form__element--back">
                                {
                                    <div>
                                        <button type="button" className="ufi-button--back" onClick={this.props.prevStep}>kembali</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </Formsy.Form>
            </div>
        </div>
        )
    }
}

export default FormApplicant;
