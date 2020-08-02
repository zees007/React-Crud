import React from 'react';
import './App.css'
import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AchievementList from "./components/AchievementList";
import Achievement from "./components/Achievement";
import Party from "./components/Party";


function App() {

    const marginTop = {
        marginTop: "20px"
    }
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Container>
                <Row style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/add" exact component={Book}/>
                        <Route path="/edit/:id" exact component={Book}/>
                        <Route path="/list" exact component={BookList}/>
                        <Route path="/achievement" exact component={Achievement}/>
                        <Route path="/achievementList" exact component={AchievementList}/>
                        <Route path="/party" exact component={Party}/>
                    </Switch>
                </Row>
            </Container>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
