import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";



class Footer extends Component{
    render() {
        const fullYear = new Date().getFullYear()
        return(
            <Navbar bg="dark" variant="dark" className="fixed-bottom">
                <Container>

                    <Col lg ={12} className="text-center text-muted">
                        {fullYear}-{fullYear+1}, All right reserved by Zeeshan Tech World.
                    </Col>
                </Container>

            </Navbar>

        );
    }

}
export default Footer;
