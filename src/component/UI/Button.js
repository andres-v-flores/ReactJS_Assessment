
// reusable button ui
const Button = (props) => {
    const {type = 'button' } = props
    const btnClass = 'btn--flat ' + props.className;
    return(
        <button 
        onClick={props.onClick} 
        className={btnClass}
        type={type}
        >
            {props.message}
        </button>
    )
}

export default Button;