import React, { Component, Fragment } from 'react';
import tenthContract from '../../tenthContract';

export default class Marksheet extends Component {
    state = {
        digiId: null,
        marksheetData: {}
    }

    async componentDidMount() {

    /*    this.setState({
            digiId: this.props.digiId
        });

        const marksheetData = await tenthContract.methods.getTenthDetails(this.state.digiId).call();

        this.setState({
            marksheetData: marksheetData
        });
        */
    }

    render() {
        return (
            <Fragment>
                <h3 className='userData title'>Roll Number: 5234564728</h3>
                    <div className='userData'>
                        <h3 className='title1'>Marksheet (Boards)</h3>
                        <center><hr /></center>
                        <b className='title'>Name:</b>/Arpit<br />
                        <b className='title'>Father's name:</b>YYM singh yadav<br />
                        <b className='title'>DOB:</b>07/07<br />
                        <b className='title'>Board:</b>CBSE<br />
                        <b className='title'>Percentile:</b>92<br/>
                    </div>
            </Fragment>
        );
    }
}