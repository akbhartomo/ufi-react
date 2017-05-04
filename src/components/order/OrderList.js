import React, { Component } from 'react'

let json_data = {
    "responseMessage": null,
    "responseStatus": 1,
    "listOrders": [
        {
            "dateFormatUtil": null,
            "orderId": 83663,
            "orderNumber": "13648",
            "orderDate": "16022017000000",
            "agentId": 3181,
            "customerId": 12605,
            "customerName": "fullName",
            "status": "Order Diterima",
            "paymentChannel": "Virtual Account",
            "flagFifCredit": false,
            "flagCredit": false,
            "fifMembershipStatus": null,
            "virtualAccount": null,
            "total": 1000000,
            "financingEcosystemId": 0,
            "expirationDate": null,
            "isUrgent": null,
            "expired": null,
            "validRemainingTime": null,
            "timeNow": null
        }
    ],
    "listOrderTifa": [],
    "listOrderUfi": [
        {
            "dateFormatUtil": null,
            "orderId": 83663,
            "orderNumber": "1234",
            "orderDate": "16022017000000",
            "agentId": 3181,
            "customerId": 12605,
            "customerName": "asdasdasd",
            "status": "Order asdasdasd",
            "paymentChannel": "Virtual Account",
            "flagFifCredit": false,
            "flagCredit": false,
            "fifMembershipStatus": null,
            "virtualAccount": null,
            "total": 123,
            "financingEcosystemId": 0,
            "expirationDate": null,
            "isUrgent": null,
            "expired": null,
            "validRemainingTime": null,
            "timeNow": null
        }
    ]
};

class OrderList extends Component {
    selectWaiting(){
        this.setState({list:json_data.listOrderUfi});
    }

    selectFinish(){
        this.setState({list:json_data.listOrders});
    }

    constructor(props) {
        super(props)
        this.selectWaiting = this.selectWaiting.bind(this);
        this.selectFinish = this.selectFinish.bind(this);
        this.state = {
            list: [],
        };
    }

    componentWillMount(){
        this.selectWaiting();
    }

    render() {
        return (
            <div className="ufi-wrapper">
                <div className="ufi-body__form--element">
                    <div onClick={this.selectWaiting}>Tunggu Approval</div>
                    <div onClick={this.selectFinish}>Selesai</div>
                </div>
                <div className="ufi-body__form--element">
                    { this.state.list.map((data)=>{
                        return (
                            <div>
                                <div>
                                    <div>Nomor Aplikasi</div>
                                    <div>{data.orderNumber}</div>
                                </div>
                                <div>
                                    <div>Nama</div>
                                    <div>{data.customerName}</div>
                                </div>
                                <div>
                                    <div>Tanggal Aplikasi</div>
                                    <div>{data.orderDate}</div>
                                </div>
                                <div>
                                    <div>Status</div>
                                    <div>{data.status}</div>
                                </div>
                                <div>
                                    <div>Jumlah Pembayaran</div>
                                    <div>{data.total}</div>
                                </div>
                                <div>
                                    <div>Detail Pesanan</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default OrderList