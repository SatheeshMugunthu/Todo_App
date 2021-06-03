import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import '../../bootstrap-3.4.1.css';
import { Link } from 'react-router-dom';

class ListTodosComponent extends Component {

    constructor(props) {

        super(props)
        this.state = {
            todos: [],
            message: null
        }

        this.deleteTodo = this.deleteTodo.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    render() {

        return (
            <div>
                <div className="container">
                {
                this.state.message != null && 
                    <div className="alert alert-success alert-dismissible"> 
                     <a href="#" className="close" data-dismiss="alert" aria-label="close"> &times; </a>
                     {this.state.message}
                    </div>
                }
                </div>

                <div className="container">
                    <br/>
                    <h3> Todos  </h3>
                    <br/>
                    <table className="table caption-top">
                        <thead>
                             <tr>
                                 <th> Id </th>     
                                <th> Description </th>
                                <th> Is Completed ?</th>
                                <th> Target Date </th>
                                <th> Update </th>
                                <th> Delete </th>
                            </tr> 
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td> 
                                                {todo.description} 
                                            </td>
                                            <td> {todo.done.toString()} </td>
                                            <td> 🗓 {moment(todo.targetDate).format('DD-MM-YYYY')} </td>
                                            <td > 
                                                <Link onClick={() => this.updateTodo(todo.id)}> 🖊 </Link>
                                            </td>
                                            <td> 
                                                <Link onClick={() => this.deleteTodo(todo.id)}> 🗑 </Link>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                        <br/>
                        <div >
                            <Link  onClick={this.addTodo}> ➕ Add Todo </Link>
                        </div>
                    </table>                 
                </div>
            </div>
        )
    }

    deleteTodo(id) {
        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(userName, id)
            .then(response => {
                this.setState({
                    message: `Delete of todo ${id} was successful`
                })
                this.refreshTodos()
            })
    }

    updateTodo(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodo() {
        this.props.history.push(`/todos/-1`)
    }

    refreshTodos() {
        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.getAllTodos(userName)
            .then(
                response => {
                    this.setState({
                        todos: response.data
                    })
                }
            )
    }
}

export default ListTodosComponent
