export const dataReducer = (state , action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {...state , loading : action.payload}
        case 'STATUS' : 
            return {...state , status : action.payload}
        case 'DATA' :
            return {...state , data : action.payload}
        case "LOAD_CART" : 
            return {...state , cart : action.payload}
        case "LOAD_WISHLIST" : 
            return {...state , wishList : action.payload}
        case 'ADD_TO_CART' :   return {...state , cart : [...state.cart , action.payload]}
        case 'REMOVE_FROM_CART' : return {...state , cart : state.cart.filter(each => each._id !== action.payload)}
        case 'ADD_TO_WISHLIST' : 
            return {...state , wishList : [...state.wishList , action.payload]}
        case 'REMOVE_FROM_WISHLIST' : 
            return {...state , wishList : state.wishList.filter(each => each._id !== action.payload)}
        case 'INCREMENT' : 
            return {...state , cart : state.cart.map((each) => {
                return each._id === action.payload ? {...each , quantity : each.quantity+1} : each
            })}
        case 'DECREMENT' : 
        return {...state , cart : state.cart.map((each) => {
            return each._id === action.payload ? {...each , quantity : each.quantity-1} : each
        }).filter(each => each.quantity > 0)}
        case "WISHLIST_TO_CART" : return {...state , cart : state.cart.some(each => each._id === action.payload._id) === true ? state.cart.map((each) => {
            return each._id === action.payload._id ? {...each , quantity : each.quantity+1} : each
        }) : [...state.cart , {...action.payload , quantity : 1}] , wishList : state.wishList.filter(each => each._id !== action.payload._id)}
        case  'CART_TO_WISHLIST' : return {...state, cart : state.cart.filter(each => each._id !== action.payload._id) , wishList : [...state.wishList , action.payload]}
        case 'SORT' : return {...state , sortBy : action.payload}
        case 'TOGGLE_INVENTORY' : return{...state , showInventory : !state.showInventory}
        case 'TOGGLE_DELIVERY' : return {...state , fastDelivery : !state.fastDelivery}
        case 'RATED_DATA' : return {...state , isRated : action.payload,  rating : action.payload}
        case 'PRICE_FILTER' : return {...state , isPriced : action.payload , price : action.payload}
        case 'CLEAR_FILTER' : return {...state , sortBy : null,
            showInventory : false,
            fastDelivery : false,
            isRated : null,
            rating : 0,
            isPriced : null,
            price : 0}
        default:
            break;
    }
}