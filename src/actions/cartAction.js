export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CHANGE_QTY = 'CHANGE_QTY'
export const CLEAR_CART = 'CLEAR_CART'

export function add(payload){
    return {
        type:"ADD_TO_CART",payload
    }
}
export function addsingle(payload){
    return {
        type:"ADD_TO_CART2",payload
    }
}
export function remove(id){
    return {type:'REMOVE_FROM_CART',payload:{id}}
}
export function handleChangeQty(qty,id){
    return {type:'CHANGE_QTY',payload:{qty,id}}
}
export function clear(){
    return {type:'CLEAR_CART'}
}

export default {
    add,
    addsingle,
    remove,
    handleChangeQty,
    clear
}