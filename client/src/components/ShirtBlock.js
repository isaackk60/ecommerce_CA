import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

import BuyShirt from "./BuyShirt"

export default class ShirtBlock extends Component 
{    
    componentDidMount() 
    {
        console.log(this.props.shirt)
        this.props.shirt.shirtPhotoFilename.map(photo => 
        {
            return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
            .then(res => 
            {         
                document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
            })
            .catch(err =>
            {
                // do nothing
            })
        })
    }
    
    
    render() 
    {
        let soldOrForSale = null
        if(localStorage.accessLevel <= ACCESS_LEVEL_GUEST)
        {
            if(this.props.shirt.sold !== true)
            {
                soldOrForSale = <BuyShirt shirtID={this.props.shirt._id} price={this.props.shirt.price} />
            }
            else
            {
                soldOrForSale = "SOLD"
            }
        }
        
        
        return (
            <div className="shirt-container">

                
                {/* <div>{this.props.shirt.colour}</div>
                <div>{this.props.shirt.size}</div>
                
                <div>{this.props.shirt.description}</div>
                <div>{this.props.shirt.quantity}</div> */}
                <div className="shirtPhotos">
                    {this.props.shirt.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                </div> 
                <h2>{this.props.shirt.name}</h2>  
                <div>{this.props.shirt.price}</div>


                <div>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditTShirt/" + this.props.shirt._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteTShirt/" + this.props.shirt._id}>Delete</Link> : null}                       
                                       
                    {soldOrForSale}
                </div>      

            </div>
        )
    }
}