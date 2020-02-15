import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import web3 from '../../web3';
import storeHash from '../../storehash';

export default class Marksheet extends Component {
    state = {
        account: '',
    }

    async componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <h3 className='userData title'>Roll Number: 5675665757</h3>
                    <div className='userData'>
                        <h3 className='title1'>Marksheet (Boards)</h3>
                        <center><hr /></center>
                        <b className='title'>Name:</b>Peeyush<br />
                        <b className='title'>Father's name:</b>Abhishek<br />
                        <b className='title'>DOB:</b>09/12<br />
                        <b className='title'>Board:</b>CBSE<br />
                        <b className='title'>School:</b>St. Mary's<br />
                        <b className='title'>Status:</b>Passed<br />
                        <b className='title'>Percentile:</b>85%<br/>
                    </div>
            </Fragment>
        );
    }
}