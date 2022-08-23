import axios from 'axios';
import {
     ALL_PRODUCTS_REQUEST,
     ALL_PRODUCTS_SUCCESS,
     ALL_PRODUCTS_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,
     CLEAR_ERRORS,
     NEW_REVIEW_REQUEST,
     NEW_REVIEW_SUCCESS,
     NEW_REVIEW_FAIL,
     ADMIN_PRODUCTS_REQUEST,
     ADMIN_PRODUCTS_SUCCESS,
     ADMIN_PRODUCTS_FAIL,
     NEW_PRODUCT_REQUEST,
     NEW_PRODUCT_SUCCESS,
     NEW_PRODUCT_FAIL,
     DELETE_PRODUCT_REQUEST,
     DELETE_PRODUCT_SUCCESS,
     DELETE_PRODUCT_FAIL,
     UPDATE_PRODUCT_REQUEST,
     UPDATE_PRODUCT_SUCCESS,
     UPDATE_PRODUCT_FAIL,
     GET_REVIEWS_REQUEST,
     GET_REVIEWS_SUCCESS,
     GET_REVIEWS_FAIL,
     DELETE_REVIEWS_SUCCESS,
     DELETE_REVIEWS_REQUEST,
     DELETE_REVIEWS_FAIL


} from "../constants/productConstants";
//get all product
export const getProducts = ( keyword='', currentPage=1, price, category, rating ) => async (disptach) => {
    try {
        disptach({type: ALL_PRODUCTS_REQUEST})
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`
        }

        const {data} = await axios.get(link)
        disptach({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        disptach({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

//clear Errors
export const clearErrors = () => async (disptach) => {
    disptach({
        type: CLEAR_ERRORS
    })
}

//get product details
export const getProductDetails = (id) => async (disptach) => {
    try {
        disptach({
            type: PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/v1/product/${id}`)
        disptach({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        disptach({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (disptach) => {
     try {
          disptach({
               type: NEW_REVIEW_REQUEST,
          });
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          const { data } = await axios.put(`/api/v1/review`, reviewData, config );
          disptach({
               type: NEW_REVIEW_SUCCESS,
               payload: data.success
          });
     } catch (error) {
          disptach({
               type: NEW_REVIEW_FAIL,
               payload: error.response.data.message,
          });
     }
};


export const getAdminProducts = () => async (disptach) => {
     try {
          disptach({
               type: ADMIN_PRODUCTS_REQUEST,
          });
          const { data } = await axios.get(`/api/v1/admin/products`);
          disptach({
               type: ADMIN_PRODUCTS_SUCCESS,
               payload: data.products,
          });
     } catch (error) {
          disptach({
               type: ADMIN_PRODUCTS_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const newProduct = (productData) => async (disptach) => {
     try {
          disptach({
               type: NEW_PRODUCT_REQUEST,
          });
          const config = {
               headers: {
                    "Content-Type": "application/json",
               },
          };
          const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
          disptach({
               type: NEW_PRODUCT_SUCCESS,
               payload: data,
          });
     } catch (error) {
          disptach({
               type: NEW_PRODUCT_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const deleteProduct = (id) => async (disptach) => {
     try {
          disptach({
               type: DELETE_PRODUCT_REQUEST,
          });
          const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
          disptach({
               type: DELETE_PRODUCT_SUCCESS,
               payload: data.success,
          });
     } catch (error) {
          disptach({
               type: DELETE_PRODUCT_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const updateProduct = (id, productData) => async (disptach) => {
     try {
          disptach({
               type: UPDATE_PRODUCT_REQUEST,
          });
          const config = {
               headers: {
                    "Content-Type": "application/json",
               },
          };
          const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);
          disptach({
               type: UPDATE_PRODUCT_SUCCESS,
               payload: data.success,
          });
     } catch (error) {
          disptach({
               type: UPDATE_PRODUCT_FAIL,
               payload: error.response.data.message,
          });
     }
};
//get reviews admin
export const getProductReviews = (id) => async (disptach) => {
     try {
          disptach({
               type: GET_REVIEWS_REQUEST,
          });
          const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
          disptach({
               type: GET_REVIEWS_SUCCESS,
               payload: data.reviews,
          });
     } catch (error) {
          disptach({
               type: GET_REVIEWS_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const deleteReview = (id, productId) => async (disptach) => {
     try {
          disptach({
               type: DELETE_REVIEWS_REQUEST,
          });
          const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`);
          disptach({
               type: DELETE_REVIEWS_SUCCESS,
               payload: data.success,
          });
     } catch (error) {
          disptach({
               type: DELETE_REVIEWS_FAIL,
               payload: error.response.data.message,
          });
     }
};