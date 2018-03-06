import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postReview, fetchReviewsForProduct } from '../store/reviews'
import { Button, Form, TextArea, Divider } from 'semantic-ui-react'
import ReactStars from 'react-stars'

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            input: '',
        }
    }
    ratingChanged = (newRating) => {
        this.setState({ rating: newRating });
    }
    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            productId: this.props.productId,
            userId: this.props.user.id,
            body: this.state.input,
            rating: this.state.rating
        }
        this.props.postReview(newReview);
        // this.props.fetchReviewsForProduct(this.props.productId);
    }
    render() {

        return (
            <div>
                <Divider horizontal> Write a review </Divider>
                <ReactStars
                    value={this.state.rating}
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    half={false}
                    color2={'#ffd700'} />
                <div style={{ height: '1em' }} />
                <Form onSubmit={this.handleSubmit}>
                    <TextArea onChange={this.handleChange} name='input' value={this.state.input} placeholder='hi' />
                    <div style={{ height: '1em' }} />
                    <Button type='submit'>Submit</Button>
                </Form>

            </div>

        )
    }

}

const mapState = ({ user }) => ({ user })
const mapDispatch = {postReview, fetchReviewsForProduct}

export default connect(mapState, mapDispatch)(ReviewForm);
