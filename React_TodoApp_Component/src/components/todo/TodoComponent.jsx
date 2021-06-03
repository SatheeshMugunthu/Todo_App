import moment from 'moment'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: ' ',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            isDone: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

        if (this.state.id === '-1') {
            return
        }
        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.getTodo(userName, this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                    isDone: response.data.done
                })
            })
    }

    onSubmit() {
        let userName = AuthenticationService.getLoggedInUserName()
        let todo = {
            id: this.state.id,
            description: this.state.description,
            targetDate: this.state.targetDate,
            done: this.state.isDone
        }
        if (this.state.id === '-1') {
            console.log("Calling createTodo ")
            TodoDataService.createTodo(userName, todo)
                .then(response => {
                    this.props.history.push("/todos")
                })

        } else {
            TodoDataService.updateTodo(userName, this.state.id, todo)
                .then(response => {
                    this.props.history.push("/todos")
                })
        }
    }

    validate(values) {
        let error = {}

        if (!values.description)
            error.description = "Please Enter description"
        else if (values.description.length < 5)
            error.description = "Enter atleast 5 characters in description"

        if (!moment(values.targetDate).isValid())
            error.targetDate = "Enter a valid targetDate"

        return error
    }

    render() {
        return (
            <div>
                <br />
                <h3> Todo </h3>
                <div>
                    <Link to="/todos" >
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        🔙  Go Back
                    </Link>
                </div>
                <br />
                <div className="container">
                    <Form>
                        <Form.Group as={Row} >
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Description
                                        </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <Form.Control type="text" name="description" value={this.state.description}
                                    onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Target Date
                                        </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <Form.Control type="date" name="targetDate" value={this.state.targetDate}
                                    onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Form.Label column sm={{ span: 2, offset: 3 }}>
                                Is Completed
                                        </Form.Label>
                            <Col sm={{ span: 3, offset: 0 }}>
                                <Form.Control as="select" name="isDone" value={this.state.isDone}
                                    onChange={this.handleChange} >
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row}>
                            <Col sm={{ span: 8, offset: 2 }}>
                                <Button type="" className="btn btn-success" onClick={this.onSubmit}> Save </Button>
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
}

export default TodoComponent