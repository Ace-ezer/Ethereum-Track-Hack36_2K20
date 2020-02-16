import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import web3 from '../../web3';
import storeHash from '../../storehash'; 

import '../../css/styles.css';

export default class AdminHome extends Component {

    state = {
        toggleValue: '0'
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            toggleValue: event.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <section className='containerView'>
                <form>
                    <label>
                    <input type='radio' value='0' name='form' checked={this.state.toggleValue === '0'} onChange={this.handleChange}/>
                        Digital ID Registry
                    </label>
                    <br/>
                    <label>
                    <input type='radio' value='1' name='form' checked={this.state.toggleValue === '1'}  onChange={this.handleChange}/>
                        Marksheet Registry
                    </label>
                </form>

                    {this.state.toggleValue == '0'? (
                    <div className='docx'>
                        <h3 className='title'>Digital ID Registry</h3>
                        <form onSubmit={this.props.onSubmit}>
                            <input type='text' name='addr' placeholder='Ethereum Address... '/><br />
                            <input type='text' name='name' placeholder='Name...'/><br />
                            <input type='text' name='gender' placeholder='Gender...'/><br />
                            <input type='text' name='dob' placeholder='DOB...'/><br />
                            <input type='text' name='address' placeholder='Address...'/><br />
                            <input type='text' name='phone' placeholder='Phone Number...'/><br />
                            <input type='submit' name='Search' className='registerbtn'/>
                        </form>
                        <br />
                    </div> ):(
                    <div className='docx'>
                    <h3 className='title'>10th Marksheet Registry</h3>
                        <form onSubmit={this.props.onMarksheetSubmit}>
                            <input type='text' name='digiId' placeholder='DigiId... '/><br />
                            <input type='text' name='rollno' placeholder='Roll No... '/><br />
                            <input type='text' name='name' placeholder='Name...'/><br />
                            <input type='text' name='dob' placeholder='DOB...'/><br />
                            <input type='text' name='guardian' placeholder='Guardian...'/><br />
                            <input type='text' name='percent' placeholder='Percent...'/><br />
                            <input type='text' name='board' placeholder='Board...'/><br />
                            <input type='submit' name='Search' className='registerbtn'/>
                        </form>
                        <br />
                    </div> )}
                </section>
            </Fragment>
        );
    }
}