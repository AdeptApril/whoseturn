import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

class AppTry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Portfolio', //Name of the general portfolio? I don't know where this is used.
            width: window.innerWidth
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    render() {
        const { width } = this.state;
        //const isMobile = width <= 500;
        return (
            <div className="full_grid">
                {/*this.state.currVideo*/}
                {/*TODO: remake all the items as functions (e.g., showTitleItem(), showLeftSideItems())*/}
                {/*TODO: remake items as a list of items, rather than this more prescriptive way*/}
                {/*Top row is a link for the Bio / a header*/}
                <div className="row_1">
                    <div>
                    </div>
                </div>
                {/*This row has projects-left image-div projects-right. So general idea is list of projects around the center image*/}
            </div>
        );
    }
}

//render(<AppTry />, document.getElementById('root'));
render(<AppTry />, document.getElementById('root'));