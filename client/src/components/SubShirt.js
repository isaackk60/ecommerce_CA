import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link } from "react-router-dom"
import axios from "axios"
import NavigationBar from "./NavigationBar"

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
            quantity: 1,
            stock: ``,
            shirtPhotoFilename: null,
            wasSubmittedAtLeastOnce: false,
            redirectToDisplayAllShirtsInCart: false,
            user:[] 
            // itemsInCart:[]
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
        axios.get(`${SERVER_HOST}/users`)
        .then(res => 
        { 
            this.setState({user: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }




    // handleSubmit = (e) => {
    //     e.preventDefault()

    //     const shirtObject = {
    //         name: this.state.name,
    //         // colour: this.state.colour,
    //         size: this.state.size,
    //         price: this.state.price,
    //         description: this.state.description,
    //         quantity: this.state.quantity,
    //         stock: this.state.stock

    //     }

    // }
    handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("userId", this.state.user._id)
        formData.append("name", this.state.name)
        // formData.append("colour", this.state.colour)
        formData.append("size", this.state.size)
        formData.append("price", this.state.price)
        formData.append("quantity", this.state.quantity)

        if (this.state.shirtPhotoFilename) {
            for (let i = 0; i < this.state.shirtPhotoFilename.length; i++) {
                formData.append("cartPhotos", this.state.shirtPhotoFilename[i])
            }
        }

        axios.post(`${SERVER_HOST}/carts`, formData, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            .then(res => {
                this.setState({ redirectToDisplayAllShirtsInCart: true })
            })
            .catch(err => {
                this.setState({ wasSubmittedAtLeastOnce: true })
            })
    }

    // handleQuantityChange = (e) => {
    //     const quantity = parseInt(e.target.value);
    //     this.setState({ quantity });
    // };
    
    // addToCart = () => {
    //     // Add the selected shirt to the shopping cart
    //     const { name, size, price, quantity } = this.state;
    //     const item = {
    //         name,
    //         size,
    //         price,
    //         quantity
    //     };
    //     console.log("Added to cart:", item);

    //     const updatedItemsInCart = [...this.state.itemsInCart, item];
    //     this.setState({ redirectToCart: true, itemsInCart: updatedItemsInCart });
    //     // this.setState({ redirectToCart: true });
    // };


    render() {
        console.log(this.state.user)
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }
        // console.log(this.state);

// when you add t-shirt and click add to cart, it can direct to shopping cart.
        // if (this.state.redirectToCart) {
        //     return <Link to={{ pathname: "/shoppingCart", state: { itemsInCart: this.state.itemsInCart } }} onclick={this.handleSubmit}/>;
        // }

        return (
            <div>
                <NavigationBar/>
                <div className="subShirtContainer">
                {this.state.redirectToDisplayAllShirtsInCart ? <Redirect to={{ pathname: `/shoppingCart/${this.state.user._id}`, state: { itemsInCart: this.state } }} /> : null}


                    {errorMessage}
                    <div>
                        {this.state.shirtPhotoFilename === null ? null : <div className="shirtPhotos">
                            {this.state.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                        </div>}
                    </div>
                    <div>
                        <h1>{this.state.name}</h1><br></br>
                        <h4>{this.state.price}</h4><br></br>
                        <h5>Stock:{this.state.stock}</h5>

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
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        {/* <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleQuantityChange} /> */}
                        <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                    </Form.Group>
                    <LinkInClass value="Add to Cart" className="green-button" onClick={this.handleSubmit} />
                </Form>
                <p>{this.state.description}</p>

                    </div>
                </div>
            </div>
        )
    }
}