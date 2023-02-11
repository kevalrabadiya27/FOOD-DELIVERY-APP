import React, { createContext, useContext, useReducer } from "react";

const CartDispathContex = createContext();
const CartStateContex = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qtn: action.qtn, size: action.size, price: action.price, img: action.img }]
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispathContex.Provider value={dispatch}>
            <CartStateContex.Provider value={state}>
                {children}
            </CartStateContex.Provider>
        </CartDispathContex.Provider>
    )

}

export const useCart = () => useContext(CartStateContex);
export const useDispatchCart = () => useContext(CartDispathContex);