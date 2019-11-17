
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
    }

    static async getInitialProps(context){
        let {query} = context
        return {pageurl : query.id}
    }

    componentDidMount(){
        let that = this
        fetch('http://localhost:3000/fetch').then((res)=>{
            console.log('response came')
            res.text().then((content)=>{
                console.log(content)
                //that.setState({content: content})
                document.open();
                document.write(content);
                document.close();
                //let element = document.getElementById('content')
                //element.innerHtml = content
            }).catch((err)=>{
                console.log(err)
            });
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleUrlChange(event){
        this.setState({url: event.target.value})
    }

    render(){
        return (
            <div>
                {this.includeHeaders()}
                <input type="text" value={this.state.url} onChange={this.handleUrlChange}/>
                <input type="button" value="go"/>
                <div id="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                </div>
            </div>
        )
    }

    includeHeaders(){
        return(
            <Head>
                <title>Proxy</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script type="text/javascript" src="/static/main.js"/>
            </Head>
        )
    }
}