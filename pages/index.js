
import React, { Component } from 'react';
import Head from 'next/head';

export default class Index extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            url : props.pageurl ? props.pageurl : '',
            content : ''
        }
        this.handleUrlChange = this.handleUrlChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static async getInitialProps(context){
        let {query} = context
        return {pageurl : query.id}
    }

    handleUrlChange(event){
        this.setState({url: event.target.value})
    }

    handleSubmit(){
        window.location.href = '/fetch?uri='+this.state.url
    }

    render(){
        return (
            <div>
                {this.includeHeaders()}
                <input type="text" value={this.state.url} onChange={this.handleUrlChange}/>
                <input type="button" value="go" onClick={this.handleSubmit}/>
            </div>
        )
    }

    includeHeaders(){
        return(
            <Head>
                <title>Proxy</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/*<script type="text/javascript" src="/static/main.js"/>*/}
            </Head>
        )
    }
}