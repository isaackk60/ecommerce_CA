import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import NavigationBar from "./NavigationBar"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import LinkInClass from "../components/LinkInClass"
import BuyShirt from "./BuyShirt"


export default class SubShirt extends Component {
    constructor(props) {
        super(props)
        const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]")
        this.state = {
            shirtId: ``,
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
            // user:``,
            cart: [],
            itemsInCart: cartLocalStorage,
            cartId: ``
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     // Check if cartList has changed
    //     if (prevState.itemsInCart!== this.state.itemsInCart) {
    //       localStorage.setItem("itemsInCart", JSON.stringify(this.state.itemsInCart));
    //     }
    //   }

        componentDidMount() {// use link to hold state
            // this.inputToFocus.focus();
            // axios.get(`${SERVER_HOST}/users/:id`)
            // .then(res => 
            // { 
            //     this.setState({user: res.data})                                         
            // })
            // .catch(err =>
            // {
            //     // do nothing
            // })
            // axios.get(`${SERVER_HOST}/cart`)
            // .then(res => 
            // { 
            //     this.setState({cart: res.data})    

            // })
            // .catch(err =>
            // {
            //     // do nothing
            // })
            // console.log(this.state.cart._id)

            // axios.get(`${SERVER_HOST}/users`, { headers: { "authorization": localStorage.token } })
            // .then(res => {
            //     const userData = res.data._id;
            //     this.setState({ user: userData });
            // })
            // .catch(error => {
            //     console.error('Error fetching user data:', error);
            // });
            // localStorage.setItem("itemsInCart", JSON.stringify(this.state.itemsInCart));

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



        //         let formData = new FormData()
        //         // formData.append("userId", this.state.user)
        //         formData.append("name", this.state.name)
        //         // formData.append("colour", this.state.colour)
        //         formData.append("size", this.state.size)
        //         formData.append("price", this.state.price)
        //         formData.append("quantity", this.state.quantity)        
        // console.log(this.state.shirtPhotoFilename)
        //         if (this.state.shirtPhotoFilename) {
        //             console.log(1)
        //             for (let i = 0; i < this.state.shirtPhotoFilename.length; i++) {
        //                 formData.append("cartPhotos", this.state.shirtPhotoFilename[i])
        //                 console.log(2)
        //             }
        //         }
        this.state.itemsInCart.push({ shirtId: this.state.shirtId, name: this.state.name, size: this.state.size, price: this.state.price, quantity: this.state.quantity, shirtPhotoFilename: this.state.shirtPhotoFilename, shirtPhotoFilename: this.state.shirtPhotoFilename })
        // console.log(this.state.itemsInCart)
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
                        shirtPhotoFilename: item.shirtPhotoFilename
                    });
                }
                return groups;
            }, []);
            localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
        }
        // localStorage.setItem("itemsInCart", JSON.stringify(this.state.itemsInCart));
        console.log("aboveRedirect: ", this.state.redirectToDisplayAllShirtsInCart)
        this.setState({ redirectToDisplayAllShirtsInCart: true })
        // this.setState({ wasSubmittedAtLeastOnce: true })


            // axios.post(`${SERVER_HOST}/cart`, formData, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            //     .then(res => {
            //         const cartId = res.data._id;
            //         this.setState({ cartId: cartId });
            //         this.setState({ redirectToDisplayAllShirtsInCart: true })
            //     })
            //     .catch(err => {
            //         this.setState({ wasSubmittedAtLeastOnce: true })
            //     })
        }





        // handleQuantityChange = (e) => {
        //     const quantity = parseInt(e.target.value);
        //     this.setState({ quantity });
        // };

        // addToCart = () => {
        //     // Add the selected shirt to the shopping cart
        //     const { name, size, price, quantity,shirtPhotoFilename } = this.state;
        //     const item = {
        //         name,
        //         size,
        //         price,
        //         quantity,
        //         shirtPhotoFilename
        //     };
        //     console.log("Added to cart:", item);

        //     const updatedItemsInCart = [...this.state.itemsInCart, item];
        //     this.setState({ redirectToCart: true, itemsInCart: updatedItemsInCart });
        //     // this.setState({ redirectToCart: true });
        // };
        // handleClick=()=>{
        //     // this.addToCart();
        //     this.handleSubmit();

        // }


    render() {
        console.log("shirtId", this.state.shirtId)
        // console.log(this.state.user)
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }
        // console.log(this.state);

        // when you add t-shirt and click add to cart, it can direct to shopping cart.
        // if (this.state.redirectToCart) {
        //     return <Link to={{ pathname: "/shoppingCart", state: { itemsInCart: this.state.itemsInCart } }} onclick={this.handleSubmit}/>;
        // }
        console.log("itemsInCart", this.state.itemsInCart)
        console.log("shirtPhotosFilename", this.state.shirtPhotoFilename)
        console.log("cartId", this.state.cartId)

            let soldOrForSale = null
            // if (localStorage.accessLevel <= ACCESS_LEVEL_GUEST) {
            //     if (this.props.shirt.sold !== true) {
            //         soldOrForSale = <BuyShirt shirtID={this.props.shirt._id} price={this.props.shirt.price} />
            //     }
            //     else {
            //         soldOrForSale = "SOLD"
            //     }
            // }

        return (
            <div>
                <NavigationBar />
                <div className="subShirtContainer">
                    {/* {this.state.redirectToDisplayAllShirtsInCart ? <Redirect to={{ pathname: `/shoppingCart/`+this.state.cart._id, state: { itemsInCart: this.state.itemsInCart } }}  /> : null} */}
                    {/* {this.state.redirectToDisplayAllShirtsInCart ? <Redirect to={"/ShoppingCart/" + this.state.cartId} /> : null} */}
                    {this.state.redirectToDisplayAllShirtsInCart ? <Redirect to={"/ShoppingCart/"} /> : null}
                    {errorMessage}
                    <div>
                        {this.state.shirtPhotoFilename === null ? null : <div className="shirtPhotos">
                            {this.state.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                        </div>}
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
                                {/* <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleQuantityChange} /> */}
                                <Form.Control type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                            </Form.Group>
                            <p>{this.state.description}</p>
                            <LinkInClass value="Add to Cart" className="green-button" onClick={this.handleSubmit} />
                        </Form>

                        {/* {soldOrForSale}
                        <BuyShirt /> */}
                    </div>
                </div>
            </div>
        )
    }
}