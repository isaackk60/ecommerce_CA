import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"

export default class EditTShirt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ``,
            // colour: ``,
            size: ``,
            price: ``,
            description: ``,
            // quantity: ``,
            stock: ``,
            gender: ``,
            shirtPhotoFilename: null,
            redirectToDisplayAllShirts: localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce: false
        }
    }

    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/shirts/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                this.setState({
                    name: res.data.name,
                    // colour: res.data.colour,
                    size: res.data.size,
                    price: res.data.price,
                    description: res.data.description,
                    // quantity: res.data.quantity
                    stock: res.data.stock,
                    gender: res.data.gender
                })
            })
            .catch(err => {
                // do nothing
            })
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }




    handleSubmit = (e) => {
        e.preventDefault()

        let shirtObject = {
            name: this.state.name,
            // colour: this.state.colour,
            size: this.state.size,
            price: this.state.price,
            description: this.state.description,
            // quantity: this.state.quantity
            stock: this.state.stock,
            gender: this.state.gender
        }

        if (this.state.stock > 0) {
            shirtObject = {
                ...shirtObject,
                sold: false
            };
        }


        axios.put(`${SERVER_HOST}/shirts/${this.props.match.params.id}`, shirtObject, { headers: { "authorization": localStorage.token } })
            .then(res => {
                this.setState({ redirectToDisplayAllShirts: true })
            })
            .catch(err => {
                this.setState({ wasSubmittedAtLeastOnce: true })
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

                    {/* <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group> */}

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

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unisex">UniSex</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    {/* <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                    </Form.Group> */}

                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>



                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit} />

                    <Link className="red-button" to={"/main"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}