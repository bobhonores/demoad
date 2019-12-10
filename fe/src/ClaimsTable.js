//  /src/ClaimsTable.js
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AADService from './AADService';
import axios from 'axios';

export default class ClaimsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: null,
            userName: null,
            name: null,
            given_name: null,
            roles: null,
            isWriter: null,
            isContributor: null
        };

        this.AzureADService = new AADService();
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    componentDidMount() {
        axios.get('https://localhost:5001/api/distributors')
            .then(res => {
                const distributions = res.data;
                this.setState({distributions});
            });

            axios.get('https://localhost:5001/api/exports')
            .then(res => {
                const exports = res.data;
                this.setState({exports});
            });
    }

    componentWillMount() {
        this.isAuthenticated();
    }

    isAuthenticated() {
        const user = this.AzureADService.getUser();
        const roles = this.AzureADService.getRoles();

        this.setState({
            userName: user.userName,
            name: user.profile.name,
            given_name: user.profile.given_name,
            family_name: user.profile.family_name,
            roles: roles ? roles : "none",
            isWriter: this.AzureADService.isInRole('Writer') ? "yes" : "no",
            isContributor: this.AzureADService.isInRole('Contributor') ? "yes" : "no"
        });
    }

    distribute() {
        alert("Distributed");
    }
    
    export() {
        alert("Exported");
    }


    renderDistributionButton(){
        if (this.state.roles.indexOf("DistributeLeads") > -1 && this.state.distributions) {
            return (this.state.distributions.map((distribution, index) => <div key={index} className="btn btn-primary" onClick={this.distribute}>{distribution}</div>));
        }
    }

    renderExportButton() {
        if (this.state.roles.indexOf("ExportLeads") > -1 && this.state.exports) {
            return (this.state.exports.map((item, index) => <div key={index} className="btn btn-info" onClick={this.export}>{item}</div>));
        }
    }

    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Claim name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User name</td>
                            <td>{this.state.userName}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Given Name</td>
                            <td>{this.state.given_name}</td>
                        </tr>
                        <tr>
                            <td>Family Name</td>
                            <td>{this.state.family_name}</td>
                        </tr>
                        <tr>
                            <td>Roles</td>
                            <td>{this.state.roles}</td>
                        </tr>
                        <tr>
                            <td>is a Writer?</td>
                            <td>{this.state.isWriter}</td>
                        </tr>
                        <tr>
                            <td>is a Contributor?</td>
                            <td>{this.state.isContributor}</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <div>
                        {this.renderDistributionButton()}
                    </div>
                    <div>
                        {this.renderExportButton()}
                    </div>
                </div>
            </div>
        )
    }
};