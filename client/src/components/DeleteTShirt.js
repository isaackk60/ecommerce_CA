import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"


export default class DeleteTShirt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToDisplayAllShirts: false
        }
    }


    componentDidMount() {
        axios.delete(`${SERVER_HOST}/shirts/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                this.setState({ redirectToDisplayAllShirts: true })
            })
            .catch(err => {
                // Do nothing
            })
    }


    render() {
        return (
            <div>
                {this.state.redirectToDisplayAllShirts ? <Redirect to="/main" /> : null}
            </div>
        )
    }
}