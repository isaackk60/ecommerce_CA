import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"

export default class PayPalMessage extends Component {
    static messageType = {
        SUCCESS: "success",
        ERROR: "error",
        CANCEL: "cancel"
    }

    constructor(props) {
        super(props)

        this.state = {
            redirectToDisplayAllShirts: false,
            buttonColour: "red-button",
            cart: []
        }
    }


    componentDidMount() {
        if (this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS) {
            this.setState({
                heading: "PayPal Transaction Confirmation",
                message: "Your PayPal transaction was successful.",
                buttonColour: "green-button"
            })
            const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

            // console.log("itemsInCart: ",localStorage.getItem("itemsInCart").forEach(item=>{item.shirtPhotoFilename}))

            this.setState({ cart: cartLocalStorage }, () => {
                this.state.cart.forEach((item, index) => {
                    let shirtObject = {
                        stock: item.stock - item.quantity
                    };

                    if (item.stock - item.quantity === 0) {
                        shirtObject = {
                            ...shirtObject,
                            sold: true
                        };
                    }

                    axios.put(`${SERVER_HOST}/shirts/sales/${item.shirtId}`, shirtObject, { headers: { "authorization": localStorage.token } })
                        .then(res => {
                            // Handle success if needed
                            console.log(`Stock updated for shirt with ID: ${item.shirtId}`);
                            localStorage.removeItem("itemsInCart");
                        })
                        .catch(err => {
                            // Handle error if needed
                            console.error(`Error updating stock for shirt with ID: ${item.shirtId}`, err);
                        });
                });
            });





        }
        else if (this.props.match.params.messageType === PayPalMessage.messageType.CANCEL) {
            this.setState({
                heading: "PayPal Transaction Cancelled",
                message: "You cancelled your PayPal transaction. Therefore, the transaction was not completed."
            })
        }
        else if (this.props.match.params.messageType === PayPalMessage.messageType.ERROR) {
            this.setState({
                heading: "PayPal Transaction Error",
                message: "An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again."
            })
        }
        else {
            console.log("The 'messageType' prop that was passed into the PayPalMessage component is invalid. It must be one of the following: PayPalMessage.messageType.SUCCESS, PayPalMessage.messageType.CANCEL or PayPalMessage.messageType.ERROR")
        }
    }


    render() {
        return (
            <div className="payPalMessage">

                {this.state.redirectToDisplayAllShirts ? <Redirect to="/main" /> : null}

                <h3>{this.state.heading}</h3>
                <p>{this.props.match.params.message}</p>
                <p>{this.state.message}</p>

                {this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}

                <p id="payPalPaymentIDButton"><Link className={this.state.buttonColour} to={"/Main"}>Continue</Link></p>
            </div>
        )
    }
}