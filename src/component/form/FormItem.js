


const FormItem = (props) => {
    const divClass = "control-div " + props.className;
    const onChangeHandler = (e) => {
        props.onChange(e.target.value);
    }
    const onBlurHandler = (e) => {
        props.onBlur();
    }
    const invalidMessage = <p >{props.invMessage}</p>
    return(
        <div className={divClass}>
            <div className='control'>
                <label
                htmlFor={props.id}
                >
                    {props.label}
                </label>

                <input 
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onClick={props.onClick}
                id={props.id}
                ref={props.ref}
                type={props.type} 
                placeholder={props.placeholder} 
                value={props.value}
                required
                />
            </div>
            {props.className === 'invalid' && invalidMessage}
        </div>
        
        
    )

}

export default FormItem;