import axios from 'axios'
import {
     USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,
     USER_LOGIN_FAIL,
     USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS,
     USER_REGISTER_FAIL,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     UPDATE_USER_REQUEST,
     UPDATE_USER_SUCCESS,
     UPDATE_PASSWORD_REQUEST,
     UPDATE_PASSWORD_SUCCESS,
     UPDATE_PASSWORD_FAIL,
     UPDATE_USER_FAIL,
     LOAD_USER_FAIL,
     LOGOUT_SUCCESS,
     LOGOUT_FAIL,
     FORGOT_PASSWORD_REQUEST,
     FORGOT_PASSWORD_SUCCESS,
     FORGOT_PASSWORD_FAIL,
     NEW_PASSWORD_FAIL,
     NEW_PASSWORD_REQUEST,
     NEW_PASSWORD_SUCCESS,
     CLEAR_ERRORS,
     ALL_USER_REQUEST,
     ALL_USER_SUCCESS,
     ALL_USER_FAIL,
     ADNIN_UPDATE_USER_REQUEST,
     ADNIN_UPDATE_USER_FAIL,
     ADNIN_UPDATE_USER_SUCCESS,
     GET_USER_DETAILS_REQUEST,
     GET_USER_DETAILS_SUCCESS,
     GET_USER_DETAILS_FAIL,
     ADNIN_DELETE_USER_REQUEST,
     ADNIN_DELETE_USER_SUCCESS,
     ADNIN_DELETE_USER_FAIL

} from "../constants/userConstants";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data }= await axios.post('/api/v1/login', {email, password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
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

//update user
export const updateProfile = ( userData ) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'multipart/form'
            }
        }
        const { data }= await axios.put('/api/v1/me/update', userData , config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.succsess
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST})
        const { data }= await axios.get('/api/v1/me')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//register profile
export const register = ( userData ) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'multipart/form'
            }
        }
        const { data }= await axios.post('/api/v1/register', userData , config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

//update password
export const updatePassword = ( passwords ) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data }= await axios.put('/api/v1/password/update', passwords , config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.succsess
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//forgotpassword password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data }= await axios.post('/api/v1/password/forgot', email , config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//new password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const { data }= await axios.put(`/api/v1/password/reset/${token}`, passwords , config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//get all users ---- admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST})
        const { data }= await axios.get('/api/v1/admin/users')
        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// update user admin
export const updateUser = (id, userData) => async (dispatch) => {
     try {
          dispatch({ type: ADNIN_UPDATE_USER_REQUEST });
          const config = {
               headers: {
                    "Content-Type": "application/json",
               },
          };
          const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
          dispatch({
               type: ADNIN_UPDATE_USER_SUCCESS,
               payload: data.success
          });
     } catch (error) {
          dispatch({
               type: ADNIN_UPDATE_USER_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const getUserDetails = (id) => async (dispatch) => {
     try {
          dispatch({ type: GET_USER_DETAILS_REQUEST });
          const { data } = await axios.get(`/api/v1/admin/user/${id}`);
          dispatch({
               type: GET_USER_DETAILS_SUCCESS,
               payload: data.user,
          });
     } catch (error) {
          dispatch({
               type: GET_USER_DETAILS_FAIL,
               payload: error.response.data.message,
          });
     }
};

export const deleteUser = (id) => async (dispatch) => {
     try {
          dispatch({ type: ADNIN_DELETE_USER_REQUEST });
          const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
          dispatch({
               type: ADNIN_DELETE_USER_SUCCESS,
               payload: data.success,
          });
     } catch (error) {
          dispatch({
               type: ADNIN_DELETE_USER_FAIL,
               payload: error.response.data.message,
          });
     }
};