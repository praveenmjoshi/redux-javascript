const redux = require('redux');
const createStore = redux.createStore


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}


function buy_cake(){
    return{
        type: BUY_CAKE
    }
}

function buy_iceCreame(){
    return{
        type: BUY_ICECREAM
    }
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'BUY_CAKE': return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        case 'BUY_ICECREAM': return{
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}


const store = createStore(reducer);
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updatedg State', store.getState()));

store.dispatch(buy_cake())
store.dispatch(buy_cake())
store.dispatch(buy_cake())

store.dispatch(buy_iceCreame())
store.dispatch(buy_iceCreame())


unsubscribe();