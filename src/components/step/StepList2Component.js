import React, {Component} from  'react'

class StepList2 extends Component {

    render() {
        return (
            <div className="ufi-step">
                <ul className="step__list">
                    <li className="step__list--item"><span className="list__item--current"></span></li>
                    <li className="step__list--item"><span className="list__item--active"></span></li>
                    <li className="step__list--item"><span className="list__item--default"></span></li>
                    <li className="step__list--item"><span className="list__item--default"></span></li>
                </ul>
            </div>
        )
    }
}

export default StepList2