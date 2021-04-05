export const dataReducer = (state , action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {...state , loading : action.payload}
        case 'DATA' :
            return {...state , data : action.payload}
        default:
            break;
    }
}