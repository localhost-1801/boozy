import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchReviewsForProduct } from '../store/reviews'
import { Grid, Container, Divider, Rating, Header, Card, Image, Icon, Item } from 'semantic-ui-react'


class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    console.log('rip', this.props.getReviews)
    this.props.getReviews(this.props.theProduct.id);
  }
  render() {
    console.log('reviews', this.props.reviews);
    if (this.props.reviews.length <= 0 ) {
      console.log('REVIEWS SON: ', this.props.reviews)
      return <div>Be the first to review this product!</div>
    }
    if(this.props.reviews[0].user === undefined) {
      return <div> </div>
    }
    // const product = this.props.theProduct

    return (
      <div>
        {this.props.reviews.map(review => {
          console.log(review)
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

const mapState = ({ user, reviews }) => ({ user, reviews })
const mapDispatch = (dispatch) => {
  return {
    getReviews(id) {
      dispatch(fetchReviewsForProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Reviews);
/* 
<Item.Content>
<Item.Header as='a'>Jerry</Item.Header>
<Item.Meta>8.20.2018</Item.Meta>
<Item.Extra><Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' /> </Item.Extra>

<Item.Description>
  Wow this product is amazing.
</Item.Description>
</Item.Content>
</Item> 
*/