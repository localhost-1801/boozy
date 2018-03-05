import axios from 'axios';

//ACTION TYPES

const GET_REVIEWS = 'GET_REVIEWS';
const GET_REVIEWS_FOR_PRODUCT = 'GET_REVIEWS_FOR_PRODUCT'
const GET_REVIEW = 'GET_REVIEW';
const POST_REVIEW = 'POST_REVIEW';

//INITIAL STATE

const defaultReviews = [];

//ACTION CREATORS

const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
const getReviewsForProduct = reviewsforProduct => ({ type: GET_REVIEWS_FOR_PRODUCT, reviewsforProduct })
const getReview = review => ({ type: GET_REVIEW, review })
const post = review => ({ type: POST_REVIEW, review })


//THUNK CREATORS 

export const fetchReviews = () =>
    dispatch =>
        axios.get(`/api/reviews/`)
            .then(res => dispatch(getReviews(res.data || defaultReviews)))
            .catch(err => console.log(err));

export const fetchReviewsForProduct = (productId) =>
    dispatch =>
        axios.get(`/api/reviews/p/${productId}`)
            .then(res => dispatch(getReviewsForProduct(res.data || defaultReviews)))
            .catch(err => console.log(err));

export const fetchReview = (id) =>
    dispatch =>
        axios.get(`/api/reviews/${id}`)
            .then(res => dispatch(getReview(res.data || defaultReviews)))
            .catch(err => console.log(err));

export const postReview = (review) =>
    dispatch =>
        axios.post('/api/reviews', review)

            .then(res => dispatch(post(res.data || defaultReviews)))
            .catch(err => console.log(err));


//REDUCERS

export default function (state = [], action) {
    switch (action.type) {
        case GET_REVIEWS_FOR_PRODUCT:
            return action.reviewsforProduct
        case GET_REVIEWS:
            return action.reviews
        case GET_REVIEW:
            return action.review
        case POST_REVIEW:
            return [...state, action.review];
        default:
            return state
    }
}