import React, { Component } from 'react'
import { Button, Container, Row, Col, Tab, Nav, Sonnet, Tabs, Form, InputGroup, Modal } from 'react-bootstrap'

class MyAccountComponent extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            show : false
        }
        this.deleteAccount = this.deleteAccount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }

    render() {

        return (
            <div>
                <div className="container">
                    <br />
                    <Tabs defaultActiveKey="update" id="uncontrolled-tab-example">
                        <Tab eventKey="update" title=" Update Details">
                            <Container>
                                <br />
                                <br />
                                <Form>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm={{ span: 2, offset: 3 }}>
                                            Email :
                                        </Form.Label>
                                        <Col sm={{ span: 3, offset: 0 }}>
                                            <Form.Control type="email" name="email" value={this.state.email}
                                                onChange={this.handleChange} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label column sm={{ span: 2, offset: 3 }}>
                                            Password :
                                        </Form.Label>
                                        <Col sm={{ span: 3, offset: 0 }}>
                                            <Form.Control type="password" name="password" value={this.state.password}
                                                onChange={this.handleChange} />
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 8, offset: 2 }}>
                                            <Button type="" className="btn btn-success" onClick={this.updateAccount}> Update </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Tab>
                        <Tab eventKey="delete" title="Delete Account">
                            <Container>
                                <br />
                            Deleting your account is permanent.
                            All your data will be wiped out immediately and you won't be able to get it back.
                                <br /><br />
                                <div className="col-md-12">
                                    <Button type="" className="btn btn-danger" onClick={this.handleShow}>  Delete Your Account </Button>

                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title> Delete Account</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body> Are you sure ? </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" className="btn btn-danger" onClick={this.deleteAccount}>
                                                Delete
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </Container>
                        </Tab>
                    </Tabs>
                </div>
            </div >
        );
    }

    updateAccount() {
        console.log("Inside update account..")
    }

    deleteAccount() {
        this.handleClose()
        console.log("Inside delete account..")
    }

    handleClose() {
        this.setState({
            show : false
        })
    }

    handleShow() {
        this.setState({
            show : true
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export default MyAccountComponent