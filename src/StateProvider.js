import React, {createContext,useContext,useReducer,useState} from 'react';
//preparing the data layer
export const StateContext = createContext();
// StateProvider component that wraps your app and provides the state
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Hook to access the state from any component
export const useStateValue = () => useContext(StateContext);