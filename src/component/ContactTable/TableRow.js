import { useContext } from "react";
import { Link } from "react-router-dom";
import FormContext from "../../store/formContext";
import Button from "../UI/Button";
import ValidContext from "../../store/validContext";
const TableRow = (props) => {
    const formCont = useContext(FormContext)
    const validCont = useContext(ValidContext)
    const {id, name, contact, email, target} = props;

    const updateItemHandler = () => {
        formCont.onEditItem(target, name, email, contact);
        validCont.dispatchValid({type: "EDIT"})
    }

    const deleteItemHandler = () => {
        props.onDelete(target);
    }



    return(
        <tr>
            <td className="first">{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{contact}</td>
            <td>
                <Link className="btn--flat" to={`/contact/${target}`}>View</Link>
                <Button className='' message="Update" onClick={updateItemHandler} />
                <Button className='' message="Delete" onClick={deleteItemHandler} />
            </td>
        </tr>
    )
    
}

export default TableRow;
// Component for contact row