import React from 'react'; 
import propTypes from 'prop-types';
import Logo from './logo.png';

import './style.scss'


const Card = ({id,flipped}) => (
    
    <div className="Card">
                <img src={Logo} alt="Logo" className="logo"/>
     </div>
);

Card.propTypes = {
    id:propTypes.number.isRequired,
    flipped:propTypes.bool.isRequired
};
export default Card;
//obiety klasy musza przyjmowac wartosci z json czyli musimy miec for ktory przelatuje przez json i ustawia obiety w klaise 
// trzeba miec on click by wiedziec na jaka kartke ktos nakliknal


