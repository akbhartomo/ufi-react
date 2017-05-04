import React from 'react';
import Formsy from 'formsy-react';

const formStyle = {
    backgroundColor: 'transparent',
};

const MySelect = React.createClass({

    mixins: [Formsy.Mixin],
    changeValue(event) {
        // this.setValue(event.target.value);
        this.setValue(event.currentTarget[this.props.type === 'select' ? 'selected' : 'value']);
    },

    render() {
        const className = 'ufi-body__form--element form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
        const errorMessage = this.getErrorMessage();

        const options = this.props.options.map((option, i) => (
            <option key={option.title + option.value}
                    value={option.value}>
                {option.title}
            </option>
        ));

        return (
            <div className={className}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <select style={formStyle}
                        name={this.props.name}
                        onChange={this.props.onChanges}
                        value={this.props.values}
                        placeholder={this.props.placeholder}
                        onSelect={this.props.changeValue}
                        selected={this.props.type === 'select' && this.getValue() ? 'selected' : 'value'}
                >
                    {options}
                </select>
                <i className="caret"/>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

export default MySelect;