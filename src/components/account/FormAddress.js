import React, { Component } from 'react';

const formStyle = {
    backgroundColor: 'transparent',
};

const list_schedule = [
    {key:null, text:'Pilih'},
    {key:'PAGI', text:'Pagi'},
    {key:'SIANG', text:'Siang'},
    {key:'MALAM', text:'Malam'}
];

class FormAddress extends Component {

    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            stateOptions: [],
            cityOptions: [],
            districtOptions: [],
            subDistrictOptions: [],
            zipCodeOptions: []
        };
        this.getInitialState();
        this.getStateFromApi();
        this.getCityFromApi(this.props.data.stateCode);
        this.getDistrictFromApi(this.props.data.cityCode);
        this.getSubDistrictFromApi(this.props.data.districtCode);
        this.getZipCodeFromApi(this.props.data.districtCode);
    }

    getInitialState() {
        return {
            isLoading: false
        };
    }

    handleChange(event) {
        let new_state = {};
        switch(event.target.name){
            case "stateCode": {
                new_state[event.target.name] = event.target.value;
                this.getCityFromApi(event.target.value);
                break;
            }
            case "cityCode": {
                new_state[event.target.name] = event.target.value;
                this.getDistrictFromApi(event.target.value);
                break;
            }
            case "districtCode": {
                new_state[event.target.name] = event.target.value;
                this.getSubDistrictFromApi(event.target.value);
                break;
            }
            case "subdistrictCode": {
                new_state[event.target.name] = event.target.value;
                this.getZipCodeFromApi(this.state.districtCode);
                break;
            }
            default :
                new_state[event.target.name] = event.target.value;
                break;
        }
        this.setState(new_state);
    }

    save(){
        if(
            this.state.stateCode &&
            this.state.cityCode &&
            this.state.districtCode &&
            this.state.subdistrictCode &&
            this.state.zipCode &&
            this.state.address &&
            this.state.visitTimeStamp &&
            this.state.stateCode!=='Pilih' &&
            this.state.cityCode!=='Pilih' &&
            this.state.districtCode!=='Pilih' &&
            this.state.subdistrictCode!=='Pilih' &&
            this.state.zipCode!=='Pilih' &&
            this.state.visitTimeStamp!=='Pilih'
        ){
            this.props.save({
                stateCode:this.state.stateCode,
                cityCode:this.state.cityCode,
                districtCode:this.state.districtCode,
                subdistrictCode:this.state.subdistrictCode,
                zipCode:this.state.zipCode,
                address:this.state.address,
                visitTimeStamp:this.state.visitTimeStamp,
            }, 3);

            this.setState({
                isLoading: true
            });
            setTimeout(() => {
                this.setState({
                    isLoading: false
                });
            }, 20000);
        }
        else {
            alert('Silahkan lengkapi data kamu');
            return false;
        }
    }

    componentWillMount(){
        this.setState({
            list_schedule: list_schedule
        });
        this.setState({
            stateCode:this.props.data.stateCode,
            cityCode:this.props.data.cityCode,
            districtCode:this.props.data.districtCode,
            subdistrictCode:this.props.data.subdistrictCode,
            zipCode:this.props.data.zipCode,
            address:this.props.data.address,
            visitTimeStamp:this.props.data.visitTimeStamp,
        });
    }

    // Get Provinsi from API
    getStateFromApi(){
        let url = 'http://staging.mentimun.co.id/rest-api/address/state';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: 'ID'
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log("response json = " + JSON.stringify(responseJson));
            let stateOptionsFromApi = [];
            if(responseJson.responseStatus === 1){
                stateOptionsFromApi.push(
                    {key: null, text: 'Pilih'}
                );
                responseJson.listAddressStates.map((value, key)=>{
                    stateOptionsFromApi.push(
                        {
                            key:
                            value.stateCode,
                            text:
                            value.stateName,
                        }
                    );
                })
            }
            this.setState({
                stateOptions : stateOptionsFromApi
            });
        })
    }

    // Get Kota from API
    getCityFromApi = (event) => {
        let url = 'http://staging.mentimun.co.id/rest-api/address/city';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("response json = " + JSON.stringify(responseJson));
            let cityOptionsFromApi = [];
            if(responseJson.responseStatus === 1){
                cityOptionsFromApi.push(
                    {key: null, text: 'Pilih'}
                );
                responseJson.listAddressCities.map((value, key)=>{
                    cityOptionsFromApi.push(
                        {
                            key:
                            value.cityCode,
                            text:
                            value.cityName
                        }
                    );
                })
            }
            this.setState({
                cityOptions : cityOptionsFromApi
            });
        })
    };

    // Get Kecamatan from API
    getDistrictFromApi = (event) => {
        let url = 'http://staging.mentimun.co.id/rest-api/address/district';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("response District = " + JSON.stringify(responseJson));
            let districtOptionsFromApi = [];
            if(responseJson.responseStatus === 1){
                districtOptionsFromApi.push(
                    {key: null, text: 'Pilih'}
                );
                responseJson.listAddressDistricts.map((value, key) => {
                    districtOptionsFromApi.push(
                        {
                            key:
                            value.districtCode,
                            text:
                            value.districtName
                        }
                    )
                })
            }
            this.setState({
                districtOptions: districtOptionsFromApi
            })
        })
    };

    //Get Kelurahan from API
    getSubDistrictFromApi = (event) => {
        let url = 'http://staging.mentimun.co.id/rest-api/address/subDistrict';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("data kelurahan = " + JSON.stringify(responseJson));
            let subDistrictOptionsFromApi = [];
            if(responseJson.responseStatus === 1){
                subDistrictOptionsFromApi.push(
                    {key: null, text: 'Pilih'}
                );
                responseJson.listAddressSubDistricts.map((value, key) => {
                    subDistrictOptionsFromApi.push(
                        {
                            key: value.subDistrictCode,
                            text: value.subDistrictName
                        }
                    )
                })
            }
            this.setState({
                subDistrictOptions: subDistrictOptionsFromApi
            })
        })
    };

    // Get Kode Area from API
    getZipCodeFromApi = (event) => {
        let url = 'http://staging.mentimun.co.id/rest-api/address/zipCode';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: event
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("data kode area = " + JSON.stringify(responseJson));
            let zipOptionsFromApi = [];
            if(responseJson.responseStatus === 1){
                zipOptionsFromApi.push(
                    {value: null, text: 'Pilih'}
                );
                responseJson.listAddressZipCodes.map((value) => {
                    zipOptionsFromApi.push(
                        {
                            value: value.zipCode,
                            text: value.zipCode
                        }
                    );
                })
            }
            this.setState({
                zipCodeOptions: zipOptionsFromApi
            })
        })
    };

    render() {
        let isLoading = this.state.isLoading;
        return (
            <div className="ufi-body__form">
                <div className="ufi-body__form--element">
                    <label>Provinsi <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="stateCode"
                            value={this.state.stateCode}>
                            {
                                this.state.stateOptions.map((value)=>{
                                    return <option key={value.key}
                                                   value={value.key}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Kabupaten/Kota <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="cityCode"
                            value={this.state.cityCode}>
                            {
                                this.state.cityOptions.map((value)=>{
                                    return <option key={value.key}
                                                   value={value.key}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Kecamatan <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="districtCode"
                            value={this.state.districtCode}>
                            {
                                this.state.districtOptions.map((value) => {
                                    return <option key={value.key}
                                                   value={value.key}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Kelurahan <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="subdistrictCode"
                            value={this.state.subdistrictCode}>
                            {
                                this.state.subDistrictOptions.map((value) => {
                                    return <option key={value.key}
                                                   value={value.key}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Kode Pos <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="zipCode"
                            value={this.state.zipCode}>
                            {
                                this.state.zipCodeOptions.map((value) => {
                                    return <option key={value.value}
                                                   value={value.value}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Alamat sesuai Kartu Identitas <span className="ufi-field--required">&#42;</span></label>
                    <input type="text"
                           onChange={this.handleChange}
                           name="address"
                           placeholder="Masukkan alamat lengkap kamu"
                           value={this.state.address}/>
                </div>

                <div className="ufi-body__form--element">
                    <label>Jadwal Verifikasi <span className="ufi-field--required">&#42;</span></label>
                    <select style={formStyle}
                            onChange={this.handleChange}
                            name="visitTimeStamp"
                            value={this.state.visitTimeStamp}>
                            {
                                this.state.list_schedule.map((value, key)=>{
                                    return <option key={value.key} value={value.key}>{value.text}</option>
                                })
                            }
                    </select>
                    <i className="caret"/>
                </div>

                <div className="ufi-body__form--element">
                    <div className="form__element--submit">
                        <button disabled={isLoading} className="ufi-button--submit" onClick={this.save}>
                            {isLoading? 'Sedang proses...' : 'Ajukan Sekarang'}</button>
                    </div>
                    <div className="form__element--back">
                        <button type="button" className="ufi-button--back" onClick={this.props.prevStep}>kembali</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormAddress;