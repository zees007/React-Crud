import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import { Link} from "react-router-dom";


class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">

                    <Link to={""} className="navbar-brand">
                        <img src="github.png" width="25" height="25" alt=""/> Book Shop
                    </Link>
                    <Nav className="mr-auto">
                        <Link to={"add"} className="nav-link">Add Book</Link>
                        <Link to={"list"} className="nav-link">Book List</Link>
                        <Link to={"achievement"} className="nav-link">Add Achievement</Link>
                        <Link to={"achievementList"} className="nav-link">Achievement List</Link>
                    </Nav>

            </Navbar>
        );
    }

}

export default NavigationBar;
