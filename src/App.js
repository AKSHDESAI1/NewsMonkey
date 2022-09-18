import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            progress: 0
        }
    }

    setProgress = (pro) => {
        this.setState({
            progress: pro
        })
    }
    render() {
        return (
            <>
                <BrowserRouter>
                    <Navbar />
                    <LoadingBar
                        color='#f11946'
                        progress={this.state.progress}
                        height={4}
                        onLoaderFinished={() => this.setProgress(0)}
                    />
                    <Routes>
                        <Route path='/' element={<News setProgress={this.setProgress} category="general" key="general" />} />
                        <Route path='/business' element={<News setProgress={this.setProgress} category="business" key="business" />} />
                        <Route path='/entertainment' element={<News setProgress={this.setProgress} category="entertainment" key="entertainment" />} />
                        <Route path='/health' element={<News setProgress={this.setProgress} category="health" key="health" />} />
                        <Route path='/science' element={<News setProgress={this.setProgress} category="science" key="science" />} />
                        <Route path='/sports' element={<News setProgress={this.setProgress} category="sports" key="sports" />} />
                        <Route path='/technology' element={<News setProgress={this.setProgress} category="technology" key="technology" />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}
