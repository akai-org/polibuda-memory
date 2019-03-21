import React,{Component} from 'react';

import './style.scss';

import Header from '../../components/Header';

class WelcomePage extends Component{

    render(){
        return(
            <div className="WelcomePage">
                <Header/>
                <h1>test</h1>
            </div>

        );
    }
}

export default WelcomePage;

