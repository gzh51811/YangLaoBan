import {combineReducers} from "redux"
import cartReducer from "./cartReducer"
import commonReducer from "./commonReducer"
import loginReducer from "./loginReducer"




//合并Reducer
export default combineReducers({
    cart : cartReducer,
    common:commonReducer,
    login:loginReducer
})