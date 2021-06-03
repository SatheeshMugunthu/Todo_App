import axios from 'axios'
import { API_URL } from '../../Constants'

export const USERNAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService {

    executeBasicAuthenticationService(userName, password) {
        return axios.get(`${API_URL}/basicauth`,
            {
                headers: {
                    authorization: this.createBasicAuthToken(userName, password)
                }
            })
    }

    registerSuccessfulLogin(userName, password) {
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, userName)
        let token = this.createBasicAuthToken(userName, password)
        this.setupAxiosInterceptors(token)
    }

    createBasicAuthToken(userName, password) {
        return 'Basic ' + window.btoa(userName + ":" + password)
    }

    logout() {
        sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return false
        return true
    }

    getLoggedInUserName() {
        let userName = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
        if (userName === null)
            return ''
        return userName
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn())
                    config.headers.authorization = token
                return config
            }
        )
    }
}

export default new AuthenticationService()