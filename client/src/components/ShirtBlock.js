import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class ShirtBlock extends Component {
    componentDidMount() {
        console.log("All shirt: ", this.props.shirt)// shows all shirt
        this.props.shirt.shirtPhotoFilename.map(photo => {
            return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
                .then(res => {
                    document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
                })
                .catch(err => {
                    // do nothing
                })
        })
    }


    render() {
        return (

            <div className="shirt-container">
                {this.props.shirt.sold == true ?
                    <>
                        <div className="shirtPhotos">
                            {this.props.shirt.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                        </div>
                        <div className="mainshirtnameprice">
                            <h2>Sold</h2>
                        </div>
                    </> :
                    <Link to={{
                        pathname: "/SubShirt/" + this.props.shirt._id,
                        state: { shirt: this.props.shirt }
                    }} className="mainlinktosubshirt">
                        <div className="shirtPhotos">
                            {this.props.shirt.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}
                        </div>
                        <div className="mainshirtnameprice">
                            <h2>{this.props.shirt.name}</h2>
                            <div>€{this.props.shirt.price}</div>
                            <div>{this.props.shirt.gender}</div>
                        </div>
                    </Link>}

                <div className="admin-edit-delete-shirt">
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/EditTShirt/" + this.props.shirt._id}>Edit</Link> : null}

                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteTShirt/" + this.props.shirt._id}>Delete</Link> : null}
                </div>

            </div>
        )
    }
}