import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import image_about from "./images/image_about.jpg"

export default class About extends Component {

    render() {
        return (
            <div>
                <NavigationBar />
                <main className="about_main">
                    <h1>ABOUT US</h1>

                    <h2>Our Story</h2>

                    <p>T-Shirt Store was born out of a desire to bring together a curated collection of t-shirts that not only elevate your wardrobe but also tell a story. With a team of dedicated fashion enthusiasts, we scour the globe for the latest trends, timeless classics, and quirky designs that reflect the diverse tastes of our customers.</p>

                    <div className="about_background_image">

                        <h2 className="about_left_title">Style for Every Occasion</h2>
                        <p className="about_right_text">Whether you're looking for a casual everyday look, a statement piece for a night out, or a unique gift for a loved one, T-Shirt Store has you covered. Our diverse range includes graphic tees, minimalist designs, and everything in between. Find the perfect tee that resonates with your personality and makes you stand out in the crowd.</p>

                    </div>
                    <span className="image_container">

                        <div className="about_left_text">
                            <h2>Quality Matters</h2>
                            <p>We understand the importance of comfort without compromising on style. That's why each t-shirt in our collection is crafted with precision and attention to detail. From the softest fabrics to durable prints, we ensure that every piece meets the high standards we set for ourselves.</p>
                        </div>
                        <img src={image_about} alt="select clothes image" />
                    </span>

                    <h2>Join the T-Shirt Store Community</h2>
                    <p>We invite you to be a part of the T-Shirt Store community (<Link to={"/Contact"}>Join Community</Link>). Follow us on social media for the latest updates, style tips, and exclusive offers. Share your T-Shirt Store moments with us using #TShirtStoreStyle – because your style journey is our inspiration!</p>
                    <p>Thank you for choosing T-Shirt Store, where every t-shirt tells a story, and fashion is a celebration of you.</p>
                    <p>Happy shopping!</p>

                </main>

            </div>
        )
    }
}