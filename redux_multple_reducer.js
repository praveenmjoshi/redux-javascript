const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// ACTION
function buy_cake(){
    return{
        type: BUY_CAKE
    }
}

function buy_icecream(){
    return {
        type: BUY_ICECREAM
    }
}

const cakeInitialState = {
    numOfCakes: 10
}
const iceCreamInitialState = {
    numOfIcecream: 20
}

const cakeReducer = (state = cakeInitialState, action) =>{
    switch(action.type){
        case 'BUY_CAKE': return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action) =>{
    switch(action.type){
        case 'BUY_ICECREAM': return{
            ...state,
            numOfIcecream: state.numOfIcecream - 1
        }
        default: return state
    }
}


// STORE

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
}) 

const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial State', store.getState());

// const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())

store.dispatch(buy_icecream())
store.dispatch(buy_icecream())