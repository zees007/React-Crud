import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import TaskList from "./TaskList";
import StudentRegisteredService from "../services/StudentRegisteredService";
import {AxiosInstance as axios} from "axios";


export default class Achievement extends Component {
    imageId;

    constructor(props) {
        super(props);
        //this.state = this.initialState
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    initialState = {
        id: '', achievementYearHeading: '', achievementImage: '', achievementScores: {
            achievementPara:''
        }
    }

    // state = {id: '', achievementYearHeading: '', achievementImage: '',
    //     taskList: [{index: Math.random(),
    //         achievementScores: [{
    //         achievementPara:''
    //         }]} ],
    // }

    state = {id: '', achievementYearHeading: '', achievementImage: '',
        taskList: [{index: Math.random(),
            achievementScores: ''
    } ]
    }




    // handleChange(e) {
    //     if (["achievementScores", "achievementImage.id"].includes(e.target.name)) {
    //         let taskList = [...this.state.taskList]
    //         taskList[e.target.dataset.id][e.target.name] = e.target.value;
    //         console.log(e.target.value)
    //     } else {
    //         this.setState({[e.target.name]: e.target.value})
    //     }
    // }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            taskList: [...prevState.taskList, {index: Math.random(), achievementPara: ""}]
        }));
    }

    deleteRow = (index) => {
        this.setState({
            taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const achievementData = {
            achievementYearHeading: this.state.achievementYearHeading,
            achievementImage: {
                id: this.imageId
            },
            achievementScores: this.state.taskList
            // achievementScores: [{
            //     achievementPara: this.state.taskList
            // }]


        }

        StudentRegisteredService.createAchievement(achievementData)
            .then(response => {
                console.log(response)
            })
        // let data= {formData: this.state, userData: localStorage.getItem('user')}
        // axios.post('http://localhost:8080/achievement/save', data).then(res=> {
        //     console.log(res)
        // })
        // const achievementData = {
        //     achievementYearHeading: this.state.achievementYearHeading,
        //     achievementImage: this.imageId,
        //     achievementScores: this.achievementPointsArray
        // }
    }



    clickOnDelete(record) {
        this.setState({
            taskList: this.state.taskList.filter(r => r !== record)
        })
    }

    onUploadImage(e) {
        let image = e.target.files[0];
        const formData = new FormData();
        formData.append('file', image);
        StudentRegisteredService.uploadFile(formData)
            .then(response => {
                if (response) {
                    this.imageId = response.data.id;
                    console.log(this.imageId)
                }
            })

    }


    render() {
       // const {taskList} = this.state
        const {achievementYearHeading, achievementImage, taskList } = this.state

        return (
            <div className="content">
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Add Achievements</Card.Header>
                    <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridachievementYearHeading">
                                    <Form.Label>Achievement Year Heading</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Achievement year..." required
                                                  className={"bg-dark text-white"}
                                                  autoComplete="off"
                                                  value={achievementYearHeading}
                                                  onChange={this.handleChange}
                                                  name="achievementYearHeading"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridachievementImage">
                                    <Form.Label>Upload Achievement Image</Form.Label>
                                    <Form.Control type="file" required
                                                  className={"bg-dark text-white"}
                                                  autoComplete="off"
                                                  value={achievementImage}
                                                  onChange={(e) => this.onUploadImage(e)}
                                                  // onChange={this.twoMethod}
                                                  name="achievementImage"/>
                                </Form.Group>
                            </Form.Row>

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Enter Achievement Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)}
                                          taskList={taskList} onChange={this.handleChange}/>
                                </tbody>
                            </table>


                        </Card.Body>
                        <Card.Footer>
                            <Button size="sm" variant="success" type="submit">Submit
                            </Button>

                        </Card.Footer>
                    </Form>
                </Card>
            </div>

        );
    }

}
