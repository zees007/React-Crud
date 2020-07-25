import React, {Component} from "react";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import StudentRegisteredService from "../services/StudentRegisteredService";
import MyToast from "../helper/MyToast";
import {Link} from "react-router-dom";


export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentRegistered: []
        }
    }

    componentDidMount() {
        this.findAllRegisteredStudents();
    }

    findAllRegisteredStudents(){
        StudentRegisteredService.getAllBooks()
            .then(response => response.data)
            .then(data => {
                this.setState({studentRegistered: data});
            });
    }

    deleteStudentRegistration(id) {
        StudentRegisteredService.deleteStudentRegistration(id)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show": false}), 3000)
                    this.setState({
                        studentRegistered: this.state.studentRegistered.filter(x => x.id !== id)
                    })
                }else {
                    this.setState({"show" : false})
                }
            })
    }

    render() {
        return (

            <div>
                <div style={{"display":this.state.show ? "block": "none"}}>
                    <MyToast show={this.state.show}  message = {"Student Deleted successully..!!"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Book List</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>Serial</th>
                                <th>USERNAME</th>
                                <th>PASSWORD</th>
                                <th>FULLNAME</th>
                                <th>EMAIL</th>
                                <th>CONTACT</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.studentRegistered.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">Books Available</td>
                                    </tr> :
                                    this.state.studentRegistered.map((studentData) => (
                                        <tr key={studentData.id}>
                                            <td>{studentData.serial}</td>
                                            <td>{studentData.username}</td>
                                            <td>{studentData.password}</td>
                                            <td>{studentData.fullname}</td>
                                            <td>{studentData.email}</td>
                                            <td>{studentData.contact}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+studentData.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{''}
                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteStudentRegistration.bind(this, studentData.id)}><FontAwesomeIcon icon={faTrash}/></Button>

                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }

                            </tbody>

                        </Table>
                    </Card.Body>
                </Card>
            </div>

        );
    }

}

