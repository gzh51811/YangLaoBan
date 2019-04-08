let initState = {
    total:0,
    zhuangtai:false,
    goodslist:[
       {
            type:'香港仓发货',
            name:'XG',
            zhuangtai: false,
            goodslist:[
                {
                    ablum: 'product/21/2101/210115/052/C15AC4F4B5A97B93.jpg',
                    cataId: 111,
                    prodName: 'AHC B5玻尿酸高保湿水乳套装+B5玻尿酸精华50ml/瓶',
                    price: 21.00,
                    sum: 1,
                    status:false
                },
                {
                    ablum: 'product/21/2101/210115/052/C15AC4F4B5A97B93.jpg',
                    cataId: 11,
                    prodName: 'wwwwwwwwwwwwwwwwwwwwwwww',
                    price: 111.00,
                    sum: 5,
                    status: false
                }
            ]
       },
        {
            type: '国内中转仓发货',
            name: 'GZ',
            zhuangtai: false,
            goodslist: [
                {
                    ablum: 'product/27/2703/270305/010/2B3CFF5FB7C5D186.jpg',
                    cataId: 270305,
                    prodName: 'Anello  PU双肩包时尚复古男女休闲背包学生包 22款可选',
                    price: 149,
                    sum: 1,
                    status: false
                }
            ]
        },
        {
            type: '国内仓发货',
            name: 'GN',
            zhuangtai: false,
            goodslist: [
               
            ]
        }
       
    ]
}

// import {ADD_TO_CART,REMOVE_FROM_CART,CHANGE_QTY,CLEAR_CART} from "../actions/cartAction"
let reducer = (state=initState,action)=>{
    switch(action.type){  
        //全选框
        case 'CHANGE_G':
        return {
            ...state,
            goodslist: state.goodslist.filter(goods => {
                if (goods.type == action.payload.type) {
                    goods.zhuangtai = true
                    goods.goodslist.map(tf => {                 
                        tf.status = true
                        // console.log(tf.status                       
                    })
                }
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }
            case 'CHANGE_K':
            return {
                ...state,
                goodslist: state.goodslist.filter(goods => {
                    if (goods.type == action.payload.type) {
                        // console.log(goods)
                        goods.zhuangtai = false
                        goods.goodslist.map(tf => {           
                            tf.status = false                    
                        }) 
                    }
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }
              
            case 'CHANGE_O':
            return {
                ...state,
                goodslist: state.goodslist.filter(goods => {
                    if (goods.type == action.payload.type) {
                        // console.log(goods)
                        goods.zhuangtai = false
                        
                    }
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }
            
            //修改子复选框
            case 'CHANGE_F':
            return {
                ...state,
                goodslist: state.goodslist.filter(goods => {
                    if (goods.type == action.payload.type) {
                        goods.goodslist.map(tf => {
                            if (tf.cataId == action.payload.id) {
                                tf.status = !tf.status
                            }
                        })
                    }
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }
            //总选
            case 'CHANGE_Z':
            return {
                ...state,
                ...state.zhuangtai = !state.zhuangtai             
            }
        
            case 'CHANGE_T' :
            return {
               ...state,
               state:state.goodslist.map(item=>{
                   item.zhuangtai = true
                   item.goodslist.filter(good => {
                        good.status = true
                    })
                   return item
               }) 
            }
            //全不选      
            case 'CHANGE_C' :
            return {
                ...state,
                state: state.goodslist.map(item => {
                    item.zhuangtai = false
                    item.goodslist.filter(good => {
                        good.status = false
                    })          
                })
            }
            //子影响父
        case 'CHANGE_HH':
            return {
                ...state,
                ...state.zhuangtai = true
            }
        case 'CHANGE_GG':
            return {
                ...state,
                ...state.zhuangtai = false
            }
            //删除
        case 'CHANGE_CART_DEL':
            return {
                ...state,
                goodslist: state.goodslist.filter(goods => goods.name != action.payload.name)    
            }
            //删除子复选框
        case 'CHANGE_CART_DELSSS':
            // console.log(action.payload.id)  大坑！
            return {
                ...state,
                goodslist: state.goodslist.map(goods => {
                    goods.goodslist=goods.goodslist.filter(goods => goods.cataId != action.payload.id)
                    return goods
                })
            }
            //修改商品数量
        case 'CHANGE_QTY':
            return {
                ...state,
                goodslist: state.goodslist.map(goods => {
                    goods.goodslist.filter(item=>{
                        if (item.cataId == action.payload.id) {
                            item.sum = action.payload.qty
                        }
                    })
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }
            //节点的显示隐藏
        case 'CHANGE_XS':
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.name != action.payload.name)
            }
          

            default:
            return {
                ...state
            }
    }
}

export default reducer