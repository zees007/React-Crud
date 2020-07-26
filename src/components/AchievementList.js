import React, {Component} from "react";
import StudentRegisteredService from "../services/StudentRegisteredService";



export default class AchievementList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            achievementData: []
        }
    }

    componentDidMount() {
        this.findAllAchievements();
    }

    findAllAchievements(){
        StudentRegisteredService.getAllAchievementList()
            .then(response => response.data)
            .then(data => {
                this.setState({achievementData: data});
                console.log(data)
            });
    }


    render() {
        return (
            <div>Hi There...</div>

        );
    }

}
