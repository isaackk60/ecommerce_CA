import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import NavigationBar from "./NavigationBar"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import LinkInClass from "../components/LinkInClass"

export default class SubShirt extends Component {
    constructor(props) {
        super(props)
        const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]")
        this.state = {
            shirtId: ``,
            name: ``,
            size: ``,
            price: ``,
            description: ``,
            quantity: 1,
            stock: ``,
            shirtPhotoFilename: null,
            wasSubmittedAtLeastOnce: false,
            redirectToDisplayAllShirtsInCart: false,
            redirectBackToMain: false,
            cart: [],
            itemsInCart: cartLocalStorage,
            cartId: ``
        }
    }

    componentDidMount() {
        const { state } = this.props.location;
        // console.log(this.props.location)
        if (state && state.shirt) {
            const shirtData = state.shirt;
            console.log("shirtData: ", shirtData);
            this.setState({
                shirtId: shirtData._id,
                name: shirtData.name,
                size: shirtData.size,
                price: shirtData.price,
                description: shirtData.description,
                stock: shirtData.stock,
                shirtPhotoFilename: shirtData.shirtPhotoFilename
            }, () => {
                console.log(this.state.shirtPhotoFilename)
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
        const { name, value } = e.target;
        if (name === 'quantity') {
            const quantity = Math.max(1, Math.min(parseInt(value), this.state.stock));
            this.setState({ quantity });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (e) => {
        this.state.itemsInCart.push({ shirtId: this.state.shirtId, name: this.state.name, size: this.state.size, price: this.state.price, quantity: this.state.quantity, shirtPhotoFilename: this.state.shirtPhotoFilename, shirtPhotoFilename: this.state.shirtPhotoFilename, stock: this.state.stock })
        if (this.state.itemsInCart !== undefined) {
            const groupedItems = this.state.itemsInCart.reduce((groups, item) => {
                const group = groups.find(g => g.name === item.name);
                if (group) {
                    group.quantity += item.quantity;
                    group.totalPrice += item.price * item.quantity;
                } else {
                    groups.push({
                        shirtId: item.shirtId,
                        name: item.name,
                        size: item.size,
                        quantity: item.quantity,
                        price: item.price,
                        totalPrice: item.price * item.quantity,
                        shirtPhotoFilename: item.shirtPhotoFilename,
                        shirtPhotoFilename: item.shirtPhotoFilename,
                        stock: item.stock
                    });
                }
                return groups;
            }, []);
            localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
        }
        console.log("aboveRedirect: ", this.state.redirectToDisplayAllShirtsInCart)
        this.setState({ redirectToDisplayAllShirtsInCart: true })
    }

    handleMoveLeft = () => {
        this.setState((prevState) => ({
            currentSlideIndex: prevState.currentSlideIndex > 0 ? prevState.currentSlideIndex - 1 : prevState.currentSlideIndex
        }))
    };

    handleMoveRight = () => {
        this.setState((prevState) => ({
            currentSlideIndex: prevState.currentSlideIndex < this.state.totalSlides - 1 ? prevState.currentSlideIndex + 1 : prevState.currentSlideIndex
        }));
    };

    redirectToMain = () => {
        this.setState({ redirectBackToMain: true })
    }
    render() {
        console.log("shirtId", this.state.shirtId)
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }
        console.log("itemsInCart", this.state.itemsInCart)
        console.log("shirtPhotosFilename", this.state.shirtPhotoFilename)
        console.log("cartId", this.state.cartId)

        let soldOrForSale = null
        return (
            <div>
                <NavigationBar />
                {this.state.redirectBackToMain ? <Redirect to={"/Main"} /> : null}
                <div className="subshirtbacktomain">
                    <button onClick={this.redirectToMain} className="grey-button"> Back </button>
                    {/* <Link to="/main" >Back</Link> */}
                </div>
                <div className="subShirtContainer">
                    {this.state.redirectToDisplayAllShirtsInCart ? <Redirect to={"/ShoppingCart/"} /> : null}
                    {errorMessage}
                    <div>
                        {this.state.shirtPhotoFilename === null ? null : <div className="shirtPhotos">
                            {this.state.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                        </div>}
                        <div className="carousel-arrows">
                            <button onClick={this.handleMoveLeft}>&lt;</button>
                            <button onClick={this.handleMoveRight}>&gt;</button>
                        </div>
                    </div>
                    <div className="subshirtdetails">
                        <h1>{this.state.name}</h1><br></br>
                        <h4>€{this.state.price}</h4><br></br>
                        <h5>Stock: {this.state.stock}</h5>

                        <Form className="subshirtform">
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
                                <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                            </Form.Group>
                            <p>{this.state.description}</p>
                            <LinkInClass value="Add to Cart" className="green-button" onClick={this.handleSubmit} />
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}