import React from 'react';
import Info from './Info';
import Links from './Links';
import Condition from './Condition';
import Subscribe from './Subscribe';

const Footer = () => {
    return (
        <div className="footer__section">
            <div className="footer__section__container">
                <div className="footer__section__container__footer">
                    <Info/>
                    <Links/>
                    <Condition/>
                    <Subscribe/>
                </div>
            </div>
        </div>
    );
};

export default Footer;