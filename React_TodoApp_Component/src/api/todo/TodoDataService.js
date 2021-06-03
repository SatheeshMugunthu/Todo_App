import axios from "axios"
import { API_URL,JPA_API_URL } from '../../Constants'

class TodoDataService {

    getAllTodos(userName) {
        return axios.get(`${API_URL}/users/${userName}/todos`)
    }

    deleteTodo(userName,id) {
        return axios.delete(`${API_URL}/users/${userName}/todos/${id}`)
    }

    getTodo(userName,id) {
        return axios.get(`${API_URL}/users/${userName}/todos/${id}`)
    }

    updateTodo(userName,id,values) {
        return axios.put(`${API_URL}/users/${userName}/todos/${id}`, values)
    }

    createTodo(userName,values) {
        return axios.post(`${API_URL}/users/${userName}/todos`,values)
    }

}

export default new TodoDataService()