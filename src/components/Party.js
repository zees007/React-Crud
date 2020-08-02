import React, {Component} from "react";
import {Button, Card, Dropdown, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import StudentRegisteredService from "../services/StudentRegisteredService";



class Party extends Component{

    constructor(props) {
        super(props);
        this.handleChangeParty = this.handleChangeParty.bind(this)
        this.handleChangeParty = this.handleChangeParty.bind(this)
    }

    state = {
        id:'', serial:'', purpose:'', responsible:''
    }

    handleChangeParty(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmitParty = (e) => {
        e.preventDefault();
        const partyData = {
            serial: this.state.serial,
            responsible: {
                id: this.imageId
            },
            purpose: this.state.purpose
        };

        StudentRegisteredService.createParty(partyData)
            .then(response => {
                console.log(response)
            }).catch(error => {
            console.log("Error:- " + error)
        })
    };


    render() {

        const {serial, purpose, responsible} =this.state

        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Add Party</Card.Header>
                <Form onSubmit={this.handleSubmitParty}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>serial Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter serial ..." required
                                              className={"bg-dark text-white"}
                                              autoComplete="off"
                                              value={serial}
                                              onChange={this.handleChangeParty}
                                              name="serial"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>purpose Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter purpose ..." required
                                              className={"bg-dark text-white"}
                                              autoComplete="off"
                                              value={purpose}
                                              onChange={this.handleChangeParty}
                                              name="purpose"/>
                            </Form.Group>
                        </Form.Row>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Select Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu onChange={this.handleChangeParty} name="category" value={responsible}>
                                <Dropdown.Item value="1">AR1</Dropdown.Item>
                                <Dropdown.Item value="2">AR2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Card.Body>
                    <Card.Footer>
                        <Button size="sm" variant="success" type="submit">Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>

        );
    }

}
export default Party;
