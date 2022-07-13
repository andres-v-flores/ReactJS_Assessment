

import { Fragment, useEffect, useState, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGetOneItem } from "../CRUD/CrudOps";
import Card from './../component/UI/Card';
import ErrorPage from "./ErrorPage";
import LoadContext from "../store/loadContext";
import Loading from "../component/UI/Loading";
import ErrorCard from "../component/UI/ErrorCard";


// page will dynamicaly load 
// will be based on the pramaters entered
const ViewContactPage = () => {
    const [contact, setContact] = useState({}); // will render on visit with a useEffect and a function
    const {isLoading, stillLoading, doneLoading, errorState, changeError} = useContext(LoadContext);
    let param = useParams();
    let {contactId} = param;
    const fetchContactDetail = useCallback(async (target) => {
        try{
            stillLoading();
            let data = await fetchGetOneItem(target);
            setContact(data);
        } catch (e){
            changeError(true, e.message);
        } finally {
            doneLoading();
        }
    },[stillLoading, doneLoading, changeError])


    useEffect(()=>{
        fetchContactDetail(contactId);
    },[fetchContactDetail, contactId])

    if (isLoading) {
        return <Loading />
    }

    if(contact === null){
        return <ErrorPage message="ERROR that contact doesn't exist" />
    }


    let contactItem = <div className="detail-container">
        <div className="detail-cont"><h2>ID:</h2><p> {contact.id}</p></div>
        <div className="detail-cont"><h2>Name:</h2><p> {contact.name}</p></div>
        <div className="detail-cont"><h2>Email:</h2><p> {contact.email}</p></div>
        <div className="detail-cont"><h2>Contact:</h2><p> {contact.contact}</p></div>
    </div>
    
    return(
        <div className="view">
            <Card className="card-contact">
                <h1>Contact Details</h1>
                {contactItem}
                <Link className="btn mu" to='/'>Home</Link>
            </Card>
            {errorState.isError && <ErrorCard message={errorState.errorMessage}/>}
        </div>
        
    )
}

export default ViewContactPage;
