import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    // ez egy debug komponens rész
    componentWillUpdate() {
        console.log('[OrderSummary] willUpdate')
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                    <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
                );
        });
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><stong>Total price: {this.props.price}</stong> </p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue} >CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;