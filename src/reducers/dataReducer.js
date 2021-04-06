export const dataReducer = (state , action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {...state , loading : action.payload}
        case 'DATA' :
            return {...state , data : action.payload}
        case 'ADD_TO_CART' :   return {...state , cart : [...state.cart , {...action.payload , qty : 1}]}
        case 'ADD_TO_WISHLIST' : 
            return {...state , wishList : [...state.wishList , action.payload]}
        case 'REMOVE_FROM_WISHLIST' : 
            return {...state , wishList : state.wishList.filter(each => each.id !== action.payload)}
        default:
            break;
    }
}