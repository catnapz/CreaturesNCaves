import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.scss';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: true
    };

    public render() {
        return (
            <header>
                <nav>
                    <div id='nav-burger' onClick={this.toggle}>Burger</div>
                    <Link className='nav_link' to="/">Home</Link>
                    <div id='collapse' className={this.state.isOpen ? '': 'nav_collapsed'}>
                        <ul id='nav_ul'>
                            <li>
                                <Link className="nav_link" to="/counter">Counter</Link>
                            </li>
                            <li>
                                <Link className="nav_link" to="/health-display">Check Health</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

    private toggle = () => {
        console.log('open: ' + this.state.isOpen)
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
