import React from 'react';

import './style.scss';

import Header from '../../components/Header';
import CardComponent from '../../components/CardComponent';

const Board = () =>(
    <div className="Board">
        <Header/>
        <CardComponent/>   
    </div>
);

export default Board;
