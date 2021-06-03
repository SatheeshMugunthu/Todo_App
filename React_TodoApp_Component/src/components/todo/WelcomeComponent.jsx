import {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class WelcomeComponent extends Component {

       constructor() {
            super()
            this.state = {
                successMsg : '',
                errMsg : '',
                loggedInUserName : ''
            }
            this.getWelcomeMsg = this.getWelcomeMsg.bind(this)
            this.handleSuccessMsg = this.handleSuccessMsg.bind(this)
            this.handleError = this.handleError.bind(this)
           this.getLoggedInUserName = this.getLoggedInUserName.bind(this)
           
           this.renderRows = this.renderRows.bind(this)
       }

       componentWillMount() {
           this.getLoggedInUserName()
       }

       render() {
           return(
               <>
                   {
                        this.state.errMsg.length !== 0 && 
                        <div className="container">
                            <div className="alert alert-warning alert-dismissible">  
                                {this.state.errMsg} 
                                 <a href="#" className="close" data-dismiss="alert" aria-label="close"> &times; </a>
                            </div>
                        </div>
                    }
                   <br/>
                   <h3> Welcome 🙂 </h3>
                   <br />
                   <div className="container">
                       Welcome to TODO Application <strong> Mr. {this.state.loggedInUserName}. </strong>
                       Good to see you here 😀 .  
                       You can manage your TODOs  🗒 <Link to="/todos"> here </Link>.
                       
                   </div>
                   <br />

                    <br/>
                   <div className="container">
                     {this.state.successMsg}
                   </div>
               </>
           )
       }

       handleSuccessMsg(response) {
            this.setState({
                successMsg : response.data.message
            })
       }

       handleError(error) {
           let errorMessage = ''
           
           if(error.message)
                errorMessage += error.message
            
           if(error.response && error.response.data)
                errorMessage += error.response.data.message

            this.setState({
                errMsg : errorMessage
            })
       }

       getLoggedInUserName() {
           let username = AuthenticationService.getLoggedInUserName()
           this.setState({ loggedInUserName : username })
           return username
       }
   }

export default WelcomeComponent