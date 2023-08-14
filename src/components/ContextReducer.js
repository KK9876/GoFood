// using context api and useReducer together
import React, { createContext, useContext, useReducer } from 'react'

const CardStateContext = createContext();
const CardDispatchContext = createContext();

//action is the task to be performed and state to be changed
const reducer = (state,action) =>{
    switch (action.type) {
      case "ADD":
        return [
            //appending below items on the given state
          ...state,
          {
            id: action.id,
            name: action.name,
            img: action.img,
            price: action.price,
            qty: action.qty,
            size: action.size,
          },
        ];

        case "REMOVE":
            let newarray = [...state];
            newarray.splice(action.index , 1);
            return newarray;

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
              //id of item added is equal to the id of dispatch item 
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    //new changes = action.qty and action.price and old things which were food.qty,food.price adding them for updation
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr;
            })
            return arr;

        case "DROP":
            let emptyarray = [];
            return emptyarray;

      default:
        console.log("error in reducer");
    }
}

export const CartProvider =({children}) =>{
    //dispatch provides the action to be performed and state to be changed,
    //initially keeping the array empty (addtocard to be empty iintially then add items to it)
    const[state,dispatch] = useReducer(reducer , [])
    return(
            <CardDispatchContext.Provider value={dispatch}>
                <CardStateContext.Provider value={state}>
                    {children}
                </CardStateContext.Provider>
            </CardDispatchContext.Provider>
        )
}

export const useCart = () => useContext(CardStateContext)
export const useDispatchCart = () => useContext(CardDispatchContext)


