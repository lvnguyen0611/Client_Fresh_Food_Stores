import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import {
     newProductReducer,
     productsReducer,
     productDetailsReducer,
     newReviewReducer,
     productReducer,
     productReviewsReducer,
     reviewsReducer,
} from "./reducers/productReducers";


import {
     authReducer,
     userReducer,
     forgotPasswordReducer,
     allUsersReducer,
     userDetailsReducer,
} from "./reducers/userReducers";

import { cartReducer } from './reducers/cartReducers'

import {
     newOrderReducer,
     myorderReducer,
     orderDetailReducer,
     allOrderReducer,
     orderReducer,
} from "./reducers/orderReducers";


const reducer = combineReducers({
     products: productsReducer,
     productDetails: productDetailsReducer,
     auth: authReducer,
     user: userReducer,
     forgotPassword: forgotPasswordReducer,
     cart: cartReducer,
     newOrder: newOrderReducer,
     myOrders: myorderReducer,
     orderDetails: orderDetailReducer,
     newReview: newReviewReducer,
     newProduct: newProductReducer,
     product: productReducer,
     allOrder: allOrderReducer,
     order: orderReducer,
     allUsers: allUsersReducer,
     userDetails: userDetailsReducer,
     productReviews: productReviewsReducer,
     review: reviewsReducer,
});

let initialState = {
     cart: {
          cartItems: localStorage.getItem("cartItems")
               ? JSON.parse(localStorage.getItem("cartItems"))
               : [],
          shippingInfo: localStorage.getItem("shippingInfo")
                ? JSON.parse(localStorage.getItem("shippingInfo"))
                : {}
     },
};

const middlware = [thunk];
const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middlware)))
export default store;