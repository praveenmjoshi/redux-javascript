const redux = require('redux');
const createStore = redux.createStore;


// ACTION 
const BUY_CAKE = 'BUY_CAKE';

function buy_cake(){
    return {
        type: BUY_CAKE,
        info: 'buy cake action'
    }
}

// REDUCER 
const initial_state = {
    noOfCakes : 10
}

const reducer = (state = initial_state, action) =>{
    switch(action.type){
        case 'BUY_CAKE':
            return {
                ...state,
                noOfCakes : state.noOfCakes - 1
            }
        default:
            return state
    }
}

// STORE holds application state using reducer function
const store = createStore(reducer);

// STORE allows to access state using getState method
console.log('Initial state', store.getState());

// STORE allows to be subscribed to listen to changes
const unsubscribe =  store.subscribe(() => console.log('updated state', store.getState()));


// STORE allows to update state via dispatch(action) method
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())

unsubscribe();
