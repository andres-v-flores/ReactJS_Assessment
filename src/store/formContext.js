import { createContext, useState } from "react";
// want to change it to useReducer if ever i would have time
const FormContext = createContext({
    nameInput: '',
    emailInput: '',
    contactInput: '',
    isEdit: false,
    target: '',
    addItem: false,
    onChangeName: (val) => {},
    onChangeEmail: (val) => {},
    onChangeContact: (val) => {},
    onEditItem: (taskId, name, email, contact ) => {},
    resetAll: () => {},
    onAddItem: () => {},
}); // populte this for intellisense 

export const FormContextProvider = (props) => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [contactInput, setContactInput] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [target, setTarget] = useState('');
    const [addItem, setAddItem] = useState(false);

    const onChangeName = (val) => {
        setNameInput(val);
    }
    const onChangeEmail = (val) => {
        setEmailInput(val);
    }
    const onChangeContact = (val) => {
        setContactInput(val);
    }
    const resetAll = () => {
        setNameInput('');
        setEmailInput('');
        setContactInput('');
        setIsEdit(false);
        setTarget('');
        setAddItem(false);
    }
    const onAddItem = () => {
        setAddItem(true);
    }
    const onEditItem = (target, name, email, contact ) => {
        setNameInput(name);
        setEmailInput(email);
        setContactInput(contact);
        setIsEdit(true);
        setAddItem(true);
        setTarget(target); // used for put method
    }
    return (
        <FormContext.Provider value={{
            nameInput: nameInput, 
            emailInput: emailInput, 
            contactInput: contactInput, 
            isEdit: isEdit,
            target: target,
            addItem: addItem,
            onChangeName: onChangeName, 
            onChangeEmail: onChangeEmail, 
            onChangeContact: onChangeContact,
            onEditItem: onEditItem,
            resetAll: resetAll,
            onAddItem: onAddItem,
            }}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormContext;
//this context manages all form states

