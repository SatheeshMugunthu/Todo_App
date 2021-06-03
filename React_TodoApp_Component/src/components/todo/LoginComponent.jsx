import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    render() {
        return (
            <div>
                <br />
                <h1> Login </h1>
                <br />
                <div className="container">
                    {
                        this.state.hasLoginFailed &&
                        <div className="alert alert-warning">
                            Invalid Credentials
                            <a href="#" className="close" data-dismiss="alert" aria-label="close"> &times; </a>
                        </div>
                    }
                    {this.state.showSuccessMessage && <div> Login Successful</div>}

                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Username
                            </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <InputGroup>
                                    <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} 
                                    onChange={this.handleChange} />
                                    {/* <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2"> ✉️ </InputGroup.Text>
                                    </InputGroup.Append> */}
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Password
                            </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} 
                                onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row}>
                            <Col sm={{ span: 8, offset: 2 }}>
                                <Button type="" className="btn btn-success" onClick={this.loginClicked}> Login </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <br />
                <Link> Forgot Password ?</Link>
            </div>
        )
    }

    loginClicked() {

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/welcome`)
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

}
export default LoginComponent