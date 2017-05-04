import React, { Component } from 'react';
import { Link } from 'react-router';

const styleOrder = {
    color: '#2ecc71'
};

class FormSuccess extends Component {

    constructor(props){
        super(props);
        // console.log(JSON.stringify(props.data));
        this.state = {
            collateral: this.props.data.collateral,
            collateralNumber: this.props.data.collateralNumber,
            totalLoan: this.props.data.totalLoan,
            loanPeriod: this.props.data.loanPeriod,
            idNumber: this.props.data.idNumber,
            contractNumber: this.props.data.contractNumber,
            orderNumber: this.props.data.orderNumber,
            orderId: this.props.data.orderId
        }
    }

    render() {
        return(
            <div className="ufi-wrapper">
                <h2 className="ufi-subtitle--success">Pengajuan pembiayaan kamu telah berhasil dilakukan</h2>
                <ul className="ufi-list-group">
                    <p>Nomor aplikasimu adalah <span style={styleOrder}>{this.state.orderNumber}</span> dengan data sebagai berikut:</p>
                    <li className="ufi-list-group__item clearfix">
                        <p className="ufi-list__item left">Jenis BPKB :</p>
                        <p className="ufi-list__item right success">{this.state.collateral}</p>
                    </li>
                    <li className="ufi-list-group__item clearfix">
                        <p className="ufi-list__item left">Nomor BPKB :</p>
                        <p className="ufi-list__item right success">{this.state.collateralNumber}</p>
                    </li>
                    <li className="ufi-list-group__item clearfix">
                        <p className="ufi-list__item left">Permohonan Jumlah Pinjaman :</p>
                        <p className="ufi-list__item right success">Rp {this.state.totalLoan}</p>
                    </li>
                    <li className="ufi-list-group__item clearfix">
                        <p className="ufi-list__item left">Jangka Waktu :</p>
                        <p className="ufi-list__item right success">{this.state.loanPeriod} Bulan</p>
                    </li>
                </ul>
                <div className="ufi-body__footer-text">
                    <p>Tim Survey FIF akan menghubungimu untuk proses lebih lanjut.</p>
                </div>
                <div className="ufi-body__form">
                    <div className="ufi-body__form--element">
                        <Link to={`/?detail=${this.state.orderId}`}><button className="ufi-button--submit">Lihat Rincian</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormSuccess;