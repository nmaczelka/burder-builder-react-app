import React, {Component} from 'react';
import classes from './Modal.css';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    //Ez a rész azért kellett mert ha ez nem lenne akkor hiába a this.props.show false akkor is 
    //meghívja az OrderSummary.js-t {this.props.children} miatt. de a shouldComponentUpdate megakadályozza hogy ki legyen renderelve
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componetWillUpdate(){
        console.log('[Model] Will Update')
    }

    render(){
        return (
            <Aux>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'trasnlateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                {this.props.children}
            </div>
        </Aux>
        )
    }
};


export default Modal;