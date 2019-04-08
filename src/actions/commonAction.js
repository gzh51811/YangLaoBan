export const HEADSHOW = 'HEADSHOW';
export const FOOTSHOW = 'FOOTSHOW';


export function headshow(status){
    return {
        type:"HEADSHOW",status
    }
}
export function footshow(status){
    return {
        type:"FOOTSHOW",status
    }
}



export default {
    headshow,
    footshow,
}