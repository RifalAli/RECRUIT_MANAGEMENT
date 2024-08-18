import React from 'react';
import { Link } from 'react-router-dom';

const Condition = () => {
    return (
        <div className="footer__section__container__footer__conditions">
            <h1>Conditions</h1>
            <div className="footer__section__container__footer__conditions--links">
                <Link to='/termsConditions'>Terms & Conditions</Link>
                <Link to='/privacy'>Privacy</Link>
            </div>
        </div>
    );
};

export default Condition;