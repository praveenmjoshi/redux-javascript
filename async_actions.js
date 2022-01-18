
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddewaer = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_LIST = 'FETCH_USERS_LIST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Synchronous actions which return the object
const fetchUsersList = () =>{
    return{
        type: FETCH_USERS_LIST
    }
}

const fetchUsersListSuccess = (users) =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersListError = (error) =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// Asynchronous actions, which return the function
// We have added redux-thunk middleware to store, which ALLOWS actions to RETURN FUNCTION instead of plain object. 
const fetchUsers = () =>{
    return function(disaptch){
        disaptch(fetchUsersList())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            const users = response.data.map(user => user.id);
            disaptch(fetchUsersListSuccess(users));
        })
        .catch(error =>{
            disaptch(fetchUsersListError(error.message));
        })
    }
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_USERS_LIST: 
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddewaer(thunkMiddleware))

console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(()=> console.log('Updated State', store.getState()));

store.dispatch(fetchUsers());