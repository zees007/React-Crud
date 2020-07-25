import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import StudentRegisteredService from "../services/StudentRegisteredService";
import MyToast from "../helper/MyToast";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";


export default class Book extends Component {

    testId;
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.bookChange = this.bookChange.bind(this);
        this.submitStudentForm = this.submitStudentForm.bind(this);

        this.state.show = false;
    }

    initialState = {
        id: '', serial: '', fullname: '', username: '', password: '', email: '', contact: ''
    }

    componentDidMount() {
        const studentId = +this.props.match.params.id; //special code to get the id in current file for edit
        if (studentId) {
            this.findOneRegistrationForEdit(studentId);
        }
    }

    findOneRegistrationForEdit = (studentId) => {
        StudentRegisteredService.updateStudentRegistration(studentId)
            .then(response => {
                this.testId = response.data.id;
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        serial: response.data.serial,
                        fullname: response.data.fullname,
                        username: response.data.username,
                        password: response.data.password,
                        email: response.data.email,
                        contact: response.data.contact
                    });
                }

            }).catch((error) => {
            console.log("Error -" + error);
        });

    }


    submitStudentForm = event => {
        event.preventDefault();
        const studentRegistered = {
            serial: this.state.serial,
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            contact: this.state.contact
        }

        StudentRegisteredService.createStudentRegistration(studentRegistered)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true})
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            })
        this.setState(this.initialState)
    }

    updateStudent = (event) => {
        const studentRegistered = {
            id: this.testId,
            serial: this.state.serial,
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            contact: this.state.contact
        }

        StudentRegisteredService.editStudentRegistration(studentRegistered)
            .then(response => {
                if (response.data != null) {
                    console.log(response)
                    this.setState({"show": true})
                    setTimeout(() => this.setState({"show": false}), 3000)
                    setTimeout(() => this.props.history.pust("/list"), 4000)

                } else {
                    this.setState({"show": false})
                }
            })
        //this.setState(this.initialState)
    }

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    resetStudentForm = () => {
        this.setState(() => this.initialState)
    }

    bookList = () => {
        return this.props.history.push("/list");
    }

    render() {

        const {serial, username, password, fullname, email, contact} = this.state;

        return (
            <div>
                <div>
                    <div style={{"display": this.state.show ? "block" : "none"}}>
                        <MyToast show={this.state.show} message={"Student saved successully..!!"} type={"success"}/>
                    </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit:faPlusSquare}/> {this.state.id ? "Update Student":"Add New Student"} </Card.Header>
                        <Form id="bookFormId" onSubmit={this.state.id ? this.updateStudent : this.submitStudentForm} onReset={this.resetStudentForm}>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridSerial">
                                        <Form.Label>Serial</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Serial Number.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                                      value={serial}
                                                      onChange={this.bookChange}
                                                      name="serial"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridFullname">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Full Name.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                            // value={this.state.fullname}   you can write like this if doesn't initialize the const {serial, username, password, fullname, email, contact} = this.state;
                                                      value={fullname}
                                                      onChange={this.bookChange}
                                                      name="fullname"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridUsername">
                                        <Form.Label>USERNAME</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Username.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                                      value={username}
                                                      onChange={this.bookChange}
                                                      name="username"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>PASSWORD</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                                      value={password}
                                                      onChange={this.bookChange}
                                                      name="password"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>EMAIL</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                                      value={email}
                                                      onChange={this.bookChange}
                                                      name="email"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridContact">
                                        <Form.Label>CONTACT</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Contact.." required
                                                      className={"bg-dark text-white"}
                                                      autoComplete="off"
                                                      value={contact}
                                                      onChange={this.bookChange}
                                                      name="contact"/>
                                    </Form.Group>
                                </Form.Row>

                            </Card.Body>
                            <Card.Footer style={{textAlign: "right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update":"Save"}
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset">
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>{' '}
                                <Button size="sm" variant="success" type="button" onClick={this.bookList.bind()}>
                                    <FontAwesomeIcon icon={faList}/> Book List
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>

            </div>
        );
    }


}


