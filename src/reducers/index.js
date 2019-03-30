import {combineReducers} from "redux"
import cartReducer from "./cartReducer"
import listReducer from "./listReducer"


//合并Reducer
export default combineReducers({
    list : listReducer,
    cart : cartReducer
})