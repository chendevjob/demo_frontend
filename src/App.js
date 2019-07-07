import React, {Component} from 'react';
import {Route} from "react-router";
import Page1 from "./page1/page1";
import Page2 from "./page2/page2";
import {HashRouter, Link} from "react-router-dom";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'active': 'latest'
        }
        window.onhashchange = this.updateActiveTab.bind(this);
    }

    updateActiveTab() {
        let hash = window.location.hash;
        let active = 'latest';
        if(hash.indexOf('recent') >= 0) {
            active = 'recent';
        }
        this.setState({active});
    }

    render() {
        return (
            <div className="app-box">
                <HashRouter>
                    <div className="tab-box">
                        <span className={"tab-item " + (this.state.active === 'latest'?'active':'')}><Link to="latest">最新数据</Link></span>
                        <span className={"tab-item " + (this.state.active === 'recent'?'active':'')}><Link to="recent">已保存数据</Link></span>
                    </div>
                    <Route exact path="/" component={Page1}/>
                    <Route path="/latest" component={Page1}/>
                    <Route path="/recent" component={Page2}/>
                </HashRouter>
            </div>
        );
    }
}

export default App;
