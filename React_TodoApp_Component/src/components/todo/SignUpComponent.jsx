import {Component} from 'react'
import { Link } from 'react-router-dom'
import { USER_ALREADY_EXISTS } from '../../Constants'
import SignUpService from './SignUpService'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'

class SignUpComponent extends Component 
{
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            email : '',
            userCreated : false,
            errMsg : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.signUpClicked = this.signUpClicked.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <div>
                <br></br>
                <h1> SignUp </h1>
                <br />
                <div className="container">

                    {
                        this.state.errMsg && 
                        <div className="alert alert-warning alert-dismissible"> 
                            {this.state.errMsg} 
                            <a href="#" className="close" data-dismiss="alert" aria-label="close"> &times; </a>
                        </div>
                    }

                    {this.state.userCreated && <div className="alert alert-success alert-dismissible"> User Created. Please <Link to="/login"> Login </Link> to Continue </div>}

                    <Form>
                        <Form.Group as={Row} >
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
                        <Form.Group as={Row} >
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Password
                            </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} 
                                onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Email
                            </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <InputGroup>
                                    <Form.Control type="email" placeholder="Email" name="email" value={this.state.email} 
                                    onChange={this.handleChange} />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2"> ✉️ </InputGroup.Text>
                                    </InputGroup.Append> 
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row}>
                            <Col sm={{ span: 8, offset: 2 }}>
                                <Button type="submit" className="btn btn-success" onClick={this.signUpClicked}> Sign Up </Button>
                            </Col>
                        </Form.Group>
                    </Form>

                </div>
            </div>
        )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUpClicked() {
        SignUpService
        .createUser(this.state.username, this.state.password)
        .then(() => {
            this.setState({                     
                userCreated : true
            })
        }) 
        .catch( error => this.handleError(error))
    }

    handleError(error) {
        let errorMessage = error.response.data
         this.setState({
             errMsg : errorMessage
         })
    }
}

export default SignUpComponent