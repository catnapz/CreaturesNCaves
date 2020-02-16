import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <nav>
                    <div>
                        <Link to="/">CreaturesNCaves</Link>
                        <div onClick={this.toggle} id="nav-burger"/>
                        <div id="nav-collapsable" className={"nav-collapse-" + this.state.isOpen}>
                            <ul className="nav-nav flex-grow">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/counter">Counter</Link>
                                </li>
                                <li>
                                    <Link to="/fetch-data">Fetch data</Link>
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
