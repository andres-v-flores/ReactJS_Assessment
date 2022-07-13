
import { useContext,  } from 'react';
import FormItem from "./FormItem";
import Button from "../UI/Button";
import FormContext from '../../store/formContext';
import ValidContext from '../../store/validContext';


const MainForm = (props) => {
    const formCont = useContext(FormContext);
    const validCont = useContext(ValidContext)

    const validName = () => {
        validCont.dispatchValid({type: 'NAME_VALID' , payload:{touched: true, name : formCont.nameInput.trim()}})
    }
    const validEmail = () => {
        validCont.dispatchValid({type: 'EMAIL_VALID' , payload:{touched: true, email : formCont.emailInput.trim()}})
    }
    const validContact = () => {
        validCont.dispatchValid({type: 'CONTACT_VALID' , payload:{touched: true, contact : formCont.contactInput.trim()}}) 
    }

    const onCancelHandler = () => {
        formCont.resetAll();
        validCont.dispatchValid({type: 'CLEAR'});
        // 
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!validCont.state.nameIsValid || !validCont.state.emailIsValid || !validCont.state.contactIsValid){
            // if form is not valid  return
            return 
        }
        let obj = { name: formCont.nameInput.trim(), 
            email: formCont.emailInput.trim(), 
            contact: formCont.contactInput.trim(),
        }
        if(!formCont.isEdit){
            props.submitForm(obj)
            // if add new contact do this
        } else{
            props.saveEdit(obj)
            // if updating contact do this
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="form">
            <div className="control-group">
                <FormItem 
                    label='Name' 
                    id='name' 
                    className={(!validCont.state.nameIsValid && validCont.state.nameIsTouched)? "invalid": ""}
                    onChange={formCont.onChangeName} 
                    onBlur={validName}
                    value={formCont.nameInput} 
                    type='text' 
                    ref={props.ref}
                    placeholder='Enter Name' 
                    invMessage='Please enter a valid Name'
                />
                <FormItem 
                    label='Email' 
                    id='email'
                    className={(!validCont.state.emailIsValid && validCont.state.emailIsTouched)? "invalid": ""}
                    onChange={formCont.onChangeEmail} 
                    onBlur={validEmail}
                    value={formCont.emailInput} 
                    type='text' 
                    placeholder='sampleemail@email.com'
                    invMessage='Please enter a valid email'
                />
                <FormItem 
                    label='Contact' 
                    id='contact' 
                    className={(!validCont.state.contactIsValid && validCont.state.contactIsTouched)? "invalid": ""}
                    onChange={formCont.onChangeContact} 
                    onBlur={validContact}
                    value={formCont.contactInput} 
                    type='text' 
                    placeholder='0-888-888-8888' 
                    invMessage='Please enter an 11 digit number'
                />
                <div className='btn-container'>
                    {formCont.isEdit? <Button className='btn' type='submit' message='Update'/>:<Button className='btn' type='submit' message='Add'/>}
                    <Button className='btn red' onClick={onCancelHandler} type='button' message='cancel' />
                </div>
                
            </div>
        </form>
    )
}

export default MainForm ;
//component for the main form