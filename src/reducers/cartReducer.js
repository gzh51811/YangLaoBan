let initState = {
    goodslist:[]
}
import {ADD_TO_CART,REMOVE_FROM_CART,CHANGE_QTY,CLEAR_CART} from "../action/cartAction"
let reducer = (state=initState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                goodslist:[...state.goodslist,action.goods_info]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                goodslist:state.goodslist.filter(item=>item.goods_id!=action.payload.id
                )
            }
        case CHANGE_QTY:
            return {
                ...state,
                goodslist:state.goodslist.map(item=>{
                    if(item.goods_id==action.payload.id){
                        item.qty = action.payload.qty
                    }
                    return item
                })
            }
        case CLEAR_CART:
            return {
                ...state,
                goodslist:[]
            }    
        default:
            return {
                ...state
            }
    }
}

export default reducer