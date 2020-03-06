import * as React from 'react';
import {  NavLink } from 'react-router-dom';
import './nav-menu.scss';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <nav>
                    <div>
                        <NavLink exact to="/">CreaturesNCaves</NavLink>
                        <div onClick={this.toggle} id="nav-burger"/>
                        <div id="nav-collapsable" className={"nav-collapse-" + this.state.isOpen}>
                            <ul className="nav-nav flex-grow">
                                <li>
                                    <NavLink exact to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/counter">Counter</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/fetch-data">Fetch data</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
