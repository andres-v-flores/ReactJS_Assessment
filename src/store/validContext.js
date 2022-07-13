
import { createContext, useReducer} from 'react';
import { nameValidation, emailValidation, phoneValidation } from './../component/form/validation';

const ValidContext = createContext({
    state: {},
    dispatchValid: (action)=> {}
}) 

const defaultValid = {
    nameIsValid: false,
    emailIsValid: false,
    contactIsValid: false,
    nameIsTouched: false,
    emailIsTouched: false,
    contactIsTouched: false,
}

const validReducer = (state, action) => {
    switch(action.type){
        case 'NAME_VALID':
            return {...state , nameIsValid: nameValidation(action.payload.name), nameIsTouched: action.payload.touched};
        case 'EMAIL_VALID':
            return {...state, emailIsValid: emailValidation(action.payload.email), emailIsTouched: action.payload.touched};
        case 'CONTACT_VALID':
            return{...state, contactIsValid: phoneValidation(action.payload.contact), contactIsTouched: action.payload.touched};
        case 'EDIT':
            return {...state, nameIsValid: true, emailIsValid: true, contactIsValid: true} // make a thing here for on edit so that cx can just submit 
        case 'CLEAR':
            return defaultValid;
        default:
            return state;
    }
}



export const ValidContextProvider = (props) => {
    const [valid, dispatchValid]  = useReducer(validReducer, defaultValid);
    const dispatchToValid = (action) => {
        dispatchValid(action)
    }

    return(
        <ValidContext.Provider value={{
            state: valid,
            dispatchValid: dispatchToValid,
        }}>
            {props.children}
        </ValidContext.Provider>
    )
}

export default ValidContext;