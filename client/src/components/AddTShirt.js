import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class AddTShirt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            colour: "",
            size: "",
            price: "",
            quantity: "",
            description: "",
            shirtPhotoFilename: null,
            redirectToDisplayAllShirts: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
            wasSubmittedAtLeastOnce: false
        }
    }


    componentDidMount() {
        this.inputToFocus.focus()
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleFileChange = (e) => {
        this.setState({ selectedFiles: e.target.files })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("name", this.state.name)
        formData.append("colour", this.state.colour)
        formData.append("size", this.state.size)
        formData.append("price", this.state.price)
        formData.append("quantity", this.state.quantity)
        formData.append("description", this.state.description)

        if (this.state.shirtPhotoFilename) {
            for (let i = 0; i < this.state.shirtPhotoFilename.length; i++) {
                formData.append("shirtPhotos", this.state.shirtPhotoFilename[i])
            }
        }

        axios.post(`${SERVER_HOST}/shirts`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        .then(res => 
        {           
            this.setState({redirectToDisplayAllShirts:true})
        })
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render() {
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }

        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllShirts ? <Redirect to="/main" /> : null}

                {errorMessage}

                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control as="fieldset">
                            <Form.Check
                                inline
                                type="radio"
                                label="XS"
                                name="size"
                                value="XS"
                                checked={this.state.size === "XS"}
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="S"
                                name="size"
                                value="S"
                                checked={this.state.size === "S"}
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="M"
                                name="size"
                                value="M"
                                checked={this.state.size === "M"}
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="L"
                                name="size"
                                value="L"
                                checked={this.state.size === "L"}
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="XL"
                                name="size"
                                value="XL"
                                checked={this.state.size === "XL"}
                                onChange={this.handleChange}
                            />
                        </Form.Control>
                    </Form.Group>

{/* <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </Form.Group> */}

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="shirtPhotoFilename">
                        <Form.Label>Photos</Form.Label>
                        <Form.Control
                            type="file" multiple onChange={this.handleFileChange}
                        /></Form.Group> <br /><br />

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit} />

                    <Link className="red-button" to={"/main"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}