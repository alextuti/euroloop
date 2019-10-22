import React, {Component} from 'react';

import classes from './RecommendationList.module.scss';
import stations from '../../data/hyperloopRoutes.json';

class RecommendationList extends Component{


    render(){

        return (
            <div
                className={classes.RecommendationListContainer}    
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1':'0'
                }}>
                    <ul className={classes.RecommendationList}>
                        <li><span>Caledew</span></li>
                        <li><span>Caledew</span></li>
                        <li><span>Caledew</span></li>
                        <li><span>Caledew</span></li>
                        <li><span>Caledew</span></li>
                        <li><span>Caledew</span></li>   
                    </ul>
            </div>
        )
    }
}

export default RecommendationList;