import {    USER_LOGIN_REQUEST,
            USER_LOGIN_SUCCESS,
            USER_LOGIN_FAIL,
            USER_REGISTER_REQUEST,
            USER_REGISTER_SUCCESS,
            USER_REGISTER_FAIL,
            LOAD_USER_REQUEST,
            LOAD_USER_SUCCESS,
            LOAD_USER_FAIL,
            UPDATE_USER_REQUEST,
            UPDATE_USER_SUCCESS,
            UPDATE_USER_RESET,
            UPDATE_USER_FAIL,
            UPDATE_PASSWORD_REQUEST,
            UPDATE_PASSWORD_SUCCESS,
            UPDATE_PASSWORD_RESET,
            UPDATE_PASSWORD_FAIL,
            FORGOT_PASSWORD_REQUEST,
            FORGOT_PASSWORD_SUCCESS,
            FORGOT_PASSWORD_FAIL,
            NEW_PASSWORD_FAIL,
            NEW_PASSWORD_REQUEST,
            NEW_PASSWORD_SUCCESS,
            LOGOUT_SUCCESS,
            LOGOUT_FAIL,
            CLEAR_ERRORS,
            ALL_USER_REQUEST,
            ALL_USER_FAIL,
            ALL_USER_SUCCESS,
            ADNIN_UPDATE_USER_REQUEST,
            ADNIN_UPDATE_USER_FAIL,
            ADNIN_UPDATE_USER_RESET,
            ADNIN_UPDATE_USER_SUCCESS,
            GET_USER_DETAILS_FAIL,
            GET_USER_DETAILS_REQUEST,
            GET_USER_DETAILS_SUCCESS,
            ADNIN_DELETE_USER_REQUEST,
            ADNIN_DELETE_USER_SUCCESS,
            ADNIN_DELETE_USER_FAIL,
            ADNIN_DELETE_USER_REST


} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST: 
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            } 
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }
        default:
            return state  
    }

}

export const userReducer = (state = {}, action ) => {
    switch (action.type) {
         case UPDATE_USER_REQUEST:
         case UPDATE_PASSWORD_REQUEST:
         case ADNIN_UPDATE_USER_REQUEST:
         case ADNIN_DELETE_USER_REQUEST:
              return {
                   ...state,
                   loading: true,
                   isUpdated: false,
              };
         case UPDATE_USER_SUCCESS:
         case UPDATE_PASSWORD_SUCCESS:
         case ADNIN_UPDATE_USER_SUCCESS:
              return {
                   ...state,
                   loading: false,
                   isUpdated: true,
              };
         case ADNIN_DELETE_USER_SUCCESS:
              return {
                   ...state,
                   loading: false,
                   isDeleted: action.payload,
              };
         case UPDATE_USER_RESET:
         case UPDATE_PASSWORD_RESET:
         case ADNIN_UPDATE_USER_RESET:
              return {
                   ...state,
                   isUpdated: false,
              };
         case ADNIN_DELETE_USER_REST:
              return {
                   ...state,
                   isDeleted: false,
              };
         case UPDATE_USER_FAIL:
         case UPDATE_PASSWORD_FAIL:
         case ADNIN_UPDATE_USER_FAIL:
         case ADNIN_DELETE_USER_FAIL:
              return {
                   ...state,
                   loading: false,
                   error: action.payload,
              };
         case CLEAR_ERRORS:
              return {
                   ...state,
                   error: null,
              };
         default:
              return state;
    }
}

export const forgotPasswordReducer = (state = {}, action ) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
     switch (action.type) {
          case ALL_USER_REQUEST:
               return {
                    ...state,
                    loading: true,
               };
          case ALL_USER_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    users: action.payload,
               };
          case ALL_USER_FAIL:
               return {
                    ...state,
                    loading: false,
                    error: action.payload,
               };
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null,
               };
          default:
               return state;
     }
};

export const userDetailsReducer = (state = { user:{} }, action) => {
     switch (action.type) {
          case GET_USER_DETAILS_REQUEST:
               return {
                    ...state,
                    loading: true,
               };
          case GET_USER_DETAILS_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    user: action.payload,
               };
          case GET_USER_DETAILS_FAIL:
               return {
                    ...state,
                    loading: false,
                    error: action.payload,
               };
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null,
               };
          default:
               return state;
     }
};