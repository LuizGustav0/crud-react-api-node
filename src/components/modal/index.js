import React from 'react';

import './modal.css';

const modal = (props) => {
    return (
        <>
        <div className="modal-container" style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
            <div className="modal-wrapper"
            style={{
                transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
                >
                <div className="modal-header">
                    <h4 className="title-modal">Error</h4>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-continue" onClick={props.close}>OK</button>
                    
                </div>
            </div>
        </div>
        </>

    )
}

export default modal;
