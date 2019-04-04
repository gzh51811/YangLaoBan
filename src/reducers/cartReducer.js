let initState = {
    goodslist:[
       {
            type:'香港仓发货',
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
                        console.log(goods)
                        goods.zhuangtai = true
                        goods.goodslist.map(tf => {
                            
                                tf.status = true
                                // console.log(tf.status)
                            
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
                        console.log(goods)
                        goods.zhuangtai = false
                        goods.goodslist.map(tf => {

                            tf.status = false
                            // console.log(tf.status)

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
                        console.log(goods)
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
                                // console.log(tf.status)
                            }
                        })
                    }
                    //原理： 修改完return出去给state，这样才算是一个新的state
                    return goods
                })
            }


        default:
            return {
                ...state
            }
    }
}

export default reducer