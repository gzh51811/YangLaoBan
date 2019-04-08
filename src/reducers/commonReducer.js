import {HEADSHOW,FOOTSHOW} from "../actions/commonAction"
let initState = {
    head_ykb:true,
    foot_ykb:true,
}

let reducer = (state=initState,action)=>{
    switch(action.type){
        case HEADSHOW:
            return {
                ...state,
                head_ykb : action.status
            }
        case FOOTSHOW:
            return {
                ...state,
                foot_ykb : action.status
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer