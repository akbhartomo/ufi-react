import React from 'react';
import Formsy from 'formsy-react';
import ReactTooltip from 'react-tooltip';

let inline = {
    display: 'inline',
    marginLeft: '8px'
};
const messageTotalLoan = {
    titleMessage: 'Jumlah yang kamu ajukan bisa berubah sesuai dengan penilaian saat survei.'
};
const messageContractNumber = {
    titleMessage: 'Dengan memasukkan nomor kontrak FIF, permohonan kamu akan mendapat kesempatan lebih besar untuk disetujui.'
};

const MyInput = React.createClass({

    mixins: [Formsy.Mixin],
    changeValue(event) {
        this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    },

    render() {
        const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
        const errorMessage = this.getErrorMessage();
        return (

            <div className={className}>
                <label htmlFor={this.props.name}>
                    {this.props.title}
                </label>

                { (this.props.name === "totalLoan") ?
                    <div style={inline}>
                        <a data-tip data-for="messageLoan" className="label__info"><i className="material-icons info--error">&#xE88F;</i></a>
                        <ReactTooltip id="messageLoan" place="bottom" type="error" effect="solid">
                            <span>{messageTotalLoan.titleMessage}</span>
                        </ReactTooltip>
                    </div>
                    :null
                }

                { (this.props.name === "contractNumber") ?
                    <div style={inline}>
                        <a data-tip data-for="messageContractNumber" className="label__info"><i className="material-icons info--error">&#xE88F;</i></a>
                        <ReactTooltip id="messageContractNumber" place="bottom" type="error" effect="solid">
                            <span>{messageContractNumber.titleMessage}</span>
                        </ReactTooltip>
                    </div>
                    :null
                }

                <input type={this.props.type}
                       name={this.props.name}
                       onChange={this.props.onChanges}
                       onInput={this.changeValue}
                       value={this.props.values}
                       placeholder={this.props.placeholder}
                       checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
                       /*onChange={this.changeValue}*/
                       /*value={this.getValue()}*/
                />
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

export default MyInput