import axios from 'axios'
import { API_URL } from '../../Constants'

class SignUpService 
{
    createUser(userName,password) {
        let payload = {
            username : userName,
            password : password
        }
        return axios.post(`${API_URL}/users/createUser`,payload)
    }
}

export default new SignUpService()