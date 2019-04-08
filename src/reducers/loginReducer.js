import {SETUSERNAME} from "../actions/loginAction"
let initState = {
    mobile:"18144432849",
    password:"123456"
}
// import {ADD_TO_CART,REMOVE_FROM_CART,CHANGE_QTY,CLEAR_CART} from "../actions/cartAction"
let reducer = (state=initState,action)=>{
    switch(action.type){
        case SETUSERNAME:
            return {
                ...state,
                mobile : action.mobile
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer