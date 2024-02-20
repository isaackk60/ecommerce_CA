import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { SERVER_HOST } from "../config/global_constants"

export default class SubShirt extends Component {
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
            shirtPhotoFilename: null,
            wasSubmittedAtLeastOnce: false
        }
    }

    componentDidMount() {// use link to hold state
        // this.inputToFocus.focus();
        const { state } = this.props.location;
        if (state && state.shirt) {
            const shirtData = state.shirt;
            console.log(shirtData);
            this.setState({
                name: shirtData.name,
                size: shirtData.size,
                price: shirtData.price,
                description: shirtData.description,
                stock: shirtData.stock,
                shirtPhotoFilename: shirtData.shirtPhotoFilename
            }, () => {
                this.state.shirtPhotoFilename.map(photo => {
                    return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
                        .then(res => {
                            document.getElementById(photo._id).src = `data:;base64,${res.data.image}`;
                        })
                        .catch(err => {
                        });
                });

            });

        }
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }




    handleSubmit = (e) => {
        e.preventDefault()

        const shirtObject = {
            name: this.state.name,
            // colour: this.state.colour,
            size: this.state.size,
            price: this.state.price,
            description: this.state.description,
            // quantity: this.state.quantity
            stock: this.state.stock

        }

    }


    render() {
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }
        console.log(this.state);
        return (
            <div className="subShirtContainer">


                {errorMessage}
                <div>
                    {this.state.shirtPhotoFilename === null ? null : <div className="shirtPhotos">
                        {this.state.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                    </div>}
                </div>
                <div>
                <h1>{this.state.name}</h1>
                <h3>{this.state.price}</h3>
                <h5>{this.state.stock}</h5>

                <Form>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control as="select" name="size" value={this.state.size} onChange={this.handleChange}>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </Form.Control>
                    </Form.Group>

                </Form>
                <p>{this.state.description}</p>

                </div>
            </div>
        )
    }
}