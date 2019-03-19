import React from 'react'; 

import './style.scss';

import Header from '../../components/Header';
import CardComponent from '../../components/CardComponent';

const LayoutContainer = () =>(
    <div className="LayoutContainer">
        <Header/>
        <CardComponent/>
    </div>


);

export default LayoutContainer;
