import {combineReducers} from "redux"
import cartReducer from "./cartReducer"




//合并Reducer
export default combineReducers({
    cart : cartReducer
})