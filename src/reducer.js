export const initialState = {
    basket:[],
    user:null,
};
export const getCartTotal=(basket)=>
basket?.reduce((amount,item)=>item.price+amount,0);
const reducer = (state,action)=>{
    console.log(action);
    switch(action.type){
        case "ADD_TO_CART":
            return{
                ...state,
                basket:[...state.basket,action.item]
            }
        case "REMOVE_FROM_CART":
            const index=state.basket.findIndex(
                (basketItem)=>basketItem.id===action.item.id
            );
            let newBasket=[...state.basket];
            if (index>=0)
            {
                newBasket.splice(index,1);
            }
            else{
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket`
                );
            }
            return{
                ...state,
                basket:newBasket
            }
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
            case "EMPTY_CART":
                return{
                    ...state,
                    basket:[],
                }
        default:
            return state;
    }
}
export default reducer;