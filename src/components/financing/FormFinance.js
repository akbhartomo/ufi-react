import React, { Component } from 'react'
import Formsy from 'formsy-react'
import MyInput from '../Inputvalidator'
import MySelect from '../Selectvalidator'

const formStyle = {
    backgroundColor: 'transparent',
};

let list_agunan = [
    {value: null, title:'Pilih'},
    {value:'BPKB_MOTOR', title:'BPKB Motor'}
];

let list_loan_period = [
    {value:null, title:'Pilih'},
    {value:6, title:'6 Bulan'},
    {value:12, title:'12 Bulan'},
    {value:24, title:'24 Bulan'},
    {value:36, title:'36 Bulan'}
];

let list_brand = [
    {value: null, title:'Pilih'},
    {value:'HONDA', title:'Honda'},
    {value:'YAMAHA', title:'Yamaha'},
    {value:'SUZUKI', title:'Suzuki'}
];

class FormFinance extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.totalLoanCheckToAPI = this.totalLoanCheckToAPI.bind(this);
        // this.validateTotalLoan = this.validateTotalLoan.bind(this);
        this.state = {
            list_agunan:[],
            list_loan_period:[],
            list_brand:[],
            totalLoanMaximumCheck:false,
            collateralNumberCheck:false,
        };
    }

    enableButton() {
        this.setState({canSubmit: true});
    }

    disableButton() {
        this.setState({canSubmit: false});
    }

    handleChange(event) {
        let new_state = {};
        switch(event.target.name){
            case "loanPeriod": {
                new_state[event.target.name] = parseInt(event.target.value);
                break;
            }
            case "totalLoan": {
                new_state["totalLoan"] = event.target.value;
                new_state["totalLoanMaximumCheck"] = false;
                break;
            }
            case "collateralNumber": {
                new_state["collateralNumber"] = event.target.value;
                new_state["collateralNumberCheck"] = false;
                break;
            }
            default :
                new_state[event.target.name] = event.target.value;
                break;
        }
        this.setState(new_state);
        console.log("event.target.name = " + event.target.name);
        console.log("event.target.value = " + event.target.value);
        console.log(event.target.name+" new state = " +JSON.stringify(new_state));
    }

    componentWillMount(){
        this.setState({
            list_agunan: list_agunan,
            list_loan_period: list_loan_period,
            list_brand: list_brand
        });
        this.setState({
            collateral: this.props.data.collateral,
            collateralBrand: this.props.data.collateralBrand,
            collateralNumber: this.props.data.collateralNumber,
            totalLoan: this.props.data.totalLoan,
            loanPeriod: this.props.data.loanPeriod
        });
    }

    totalLoanCheckToAPI() {
        let url = 'http://staging-micro.mentimun.co.id/ufi/ufi/order/validasiCheckOutStep1';
        let totalLoanTemp = this.state.totalLoan;
        let collateralNumberTemp = this.state.collateralNumber;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalLoan: totalLoanTemp,
                collateralNumber: collateralNumberTemp
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status === "SUCCESS"){
                console.log("Respon dari API: " + JSON.stringify(responseJson));
                this.save();
            }
            else if(responseJson.status === "FAILED") {
                console.log("Respon dari API:" + JSON.stringify(responseJson));
                // alert(responseJson.message);

                if (responseJson.message === null) {
                    alert("Silahkan lengkapi data kamu");
                    return false;
                }
                else {
                    alert(responseJson.message);
                    return false;
                }
            }
            else {
                console.log("Respon dari API:" + JSON.stringify(responseJson));
                alert("Silahkan lengkapi data kamu");
                return false;
            }
        });
    }

    // getInitialState() {
    //     return {
    //         validationErrors: {}
    //     };
    // }
    //
    // validateTotalLoan(value){
    //     if(!value.totalLoan > 7000000) {
    //         this.setState({
    //             validationErrors: {
    //                 totalLoan: {responseJson.message}
    //             }
    //         })
    //     }
    // }

    save(){
        if(
            this.state.collateral &&
            this.state.collateralBrand &&
            this.state.collateralNumber &&
            this.state.totalLoan &&
            this.state.loanPeriod &&
            this.state.collateral!=='Pilih' &&
            this.state.collateralBrand!=='Pilih' &&
            this.state.loanPeriod!=='Pilih'
        ){
            console.log('save all data');
            this.props.save({
                collateral: this.state.collateral,
                collateralBrand: this.state.collateralBrand,
                collateralNumber: this.state.collateralNumber,
                totalLoan: this.state.totalLoan,
                loanPeriod: this.state.loanPeriod,
            }, 0)
        }
        else {
            alert("Periksa kembali dan lengkapi data kamu");
            return false;
        }
    }

    render() {
        return (
            <div>
                <Formsy.Form ref="form" onValid={this.enableButton} onInvalid={this.disableButton}>
                    <div className="ufi-wrapper">
                        <h2 className="ufi-subheader__title">Struktur Pembiayaan</h2>
                        <div className="ufi-body__form">
                            <MySelect title="Jenis BPKB"
                                      name="collateral"
                                      values={this.state.collateral}
                                      options={this.state.list_agunan}
                                      onChanges={this.handleChange}
                                      required
                            />
                            <MySelect title="Merk Kendaraan"
                                      style={formStyle}
                                      name="collateralBrand"
                                      values={this.state.collateralBrand}
                                      options={this.state.list_brand}
                                      onChanges={this.handleChange}
                                      required
                            />
                            <div className="ufi-body__form--element">
                                <MyInput title="Nomor BPKB"
                                         type="text"
                                         onChanges={this.handleChange}
                                         name="collateralNumber"
                                         values={this.state.collateralNumber.toUpperCase()}
                                         placeholder={'Masukan no BPKB Kamu'}
                                         validations="isAlphanumeric"
                                         required
                                />
                            </div>
                            <div className="ufi-body__form--element">
                                <MyInput title="Permohonan Jumlah Pinjaman"
                                         type="number"
                                         onChanges={this.handleChange}
                                         name="totalLoan"
                                         values={this.state.totalLoan}
                                         placeholder={'Masukan nominal jumlah pinjaman'}
                                         validations={{
                                             minLength: 6,
                                             maxLength: 7
                                         }}
                                         required
                                />
                            </div>
                            <MySelect title="Jangka Waktu"
                                      style={formStyle}
                                      name="loanPeriod"
                                      values={this.state.loanPeriod}
                                      options={this.state.list_loan_period}
                                      onChanges={this.handleChange}
                                      required
                            />
                            <div className="ufi-body__form--element">
                                {
                                    (this.state.totalLoanMaximumCheck && this.state.collateralNumberCheck)?
                                       <button type="submit" className="ufi-button--submit" onClick={this.save}>lanjutkan</button>
                                    :null
                                }
                                {
                                    (!this.state.totalLoanMaximumCheck && !this.state.collateralNumberCheck)?
                                        <button type="submit" className="ufi-button--submit" onClick={this.totalLoanCheckToAPI}>lanjutkan</button>
                                    :null
                                }
                            </div>
                        </div>
                    </div>
                </Formsy.Form>
            </div>
        )
    }
}

export default FormFinance;