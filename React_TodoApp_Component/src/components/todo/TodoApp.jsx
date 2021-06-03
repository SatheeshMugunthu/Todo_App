import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'
import SignUpComponent from './SignUpComponent'
import MyAccountComponent from './MyAccountComponent.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                 <Router>
                    <>
                        <HeaderComponent></HeaderComponent>
                        <Switch>
                        <Route path='/' exact component={LoginComponent}></Route>
                        <Route path='/login' component={LoginComponent}></Route>
                        <Route path='/signup' component={SignUpComponent}></Route>
                        <AuthenticatedRoute path='/welcome' component={WelcomeComponent}></AuthenticatedRoute>
                        <AuthenticatedRoute path='/todos' exact component={ListTodosComponent}></AuthenticatedRoute>
                        <AuthenticatedRoute path='/logout' component={LogoutComponent}></AuthenticatedRoute>
                        <AuthenticatedRoute path='/todos/:id' component={TodoComponent}></AuthenticatedRoute>
                        <AuthenticatedRoute path='/myAccount' component={MyAccountComponent}></AuthenticatedRoute>
                        <Route component={ErrorComponent}></Route>
                        </Switch>
                        <FooterComponent></FooterComponent>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp
