import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchReviewsForProduct } from '../store/reviews'
import { Divider, Rating, Item } from 'semantic-ui-react'


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.getReviews(this.props.product.id);
  }
  render() {
    if (this.props.reviews.length <= 0 ) {
      return <div>Be the first to review this product!</div>
    }
    if(this.props.reviews[0].user === undefined) {
      return <div> </div>
    }
    // const product = this.props.theProduct

    return (
      <div>
        {this.props.reviews.map(review => {
          return (
            <div key={review.id}>
              <Item>
                <Item.Content>
                  <Item.Header as='a'>{review.user.username}</Item.Header>
                  <Item.Meta>{Date(review.createdAt).slice(0,16)}</Item.Meta>
                  <Item.Extra><Rating name='star' defaultRating={review.rating} maxRating={5}/></Item.Extra>

                  <Item.Description>
                    {review.body}
                  </Item.Description>
                </Item.Content>
              </Item>
              <Divider />
            </div>
          )
        })}

      </div>
    )
  }

}

const mapState = ({ user, reviews, product }) => ({ user, reviews, product })
const mapDispatch = (dispatch) => {
  return {
    getReviews(id) {
      dispatch(fetchReviewsForProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Reviews);

