import Card from "./Card";
import { useContext } from "react";
import LoadContext from "../../store/loadContext";
import Button from "./Button";
 const ErrorCard = (props) => {
    const loadCont = useContext(LoadContext);
    const onClickHandler = () => {
        loadCont.changeError(false, '');
    }
    return(
        <div className="modal">
            <Card className='card-error' >
                <p>{props.message}</p>
                <Button className='red' onClick={onClickHandler} message="close"/>
            </Card>
        </div>

    )
 }

 export default ErrorCard