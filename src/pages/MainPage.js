import MainForm from "./../component/form/MainForm";
import {useState, useEffect, useCallback, useContext} from 'react';
import { fetchPost, fetchGet, fetchPut, fetchDelete } from "../CRUD/CrudOps";
import Table from "../component/ContactTable/Table";
import TableRow from "../component/ContactTable/TableRow";
import FormContex from "../store/formContext";
import Button from "../component/UI/Button";
import Card from './../component/UI/Card';
import LoadContext from "../store/loadContext";
import Loading from "../component/UI/Loading";
import ErrorCard from "../component/UI/ErrorCard";


const MainPage = () => {
    const [contactList, setContactList] = useState([]);
    const formCont = useContext(FormContex);
    const {isLoading, doneLoading, stillLoading, errorState, changeError} = useContext(LoadContext);

    
    const onSubmitForm = async (obj) => {
        try{
            stillLoading();
            let data = await fetchPost({...obj, id: contactList.length + 1,}); // server will return an object with a name of the directory
            setContactList(prev => [...prev, {...obj, id: contactList.length + 1, target: data.name }])
            formCont.resetAll();
        } catch (e) {
            changeError(true, e.message);
        }finally{
            doneLoading();
        }
    }

    const fetchContactList = useCallback(async () => {
        try{
            stillLoading();
            let data = await fetchGet();
            let tempArr = [];
            for (const key in data){
                tempArr.push({
                    target: key,
                    id: data[key].id,
                    name: data[key].name,
                    email: data[key].email,
                    contact: data[key].contact,
                })
            }
            // console.log(tempArr)
            setContactList(tempArr);
        } catch (e) {
            changeError(true, e.message);
        } finally{
            doneLoading();
        }
    }, [doneLoading, stillLoading, changeError]) // memoize the function

    const onEditTask = async(obj) => { 
        // bug on edit task will succesfully do a put but page wont render  the updated data on display
        // somehow fixed it when changing reset only on success and not on the submit form

        try{
            stillLoading();
            let taskIndex = contactList.findIndex(contact => contact.target === formCont.target); // get index to work on 
            let data = await fetchPut({...obj, id: contactList[taskIndex].id}, formCont.target);
            setContactList(prev => {
                prev[taskIndex] = {...data, target: formCont.target};
                return prev;
            })
            formCont.resetAll();
        } catch(e) {
            changeError(true, e.message);
        } finally{
            doneLoading();
        }
    }

    const deleteContact = async (target) => {
        try{
            stillLoading();
            await fetchDelete(target); // delete method returns a null 
            let newArr = contactList.filter(contact => contact.target !== target); 
            // remove the target item
            setContactList(newArr);
        } catch(e) {
            changeError(true, e.message);
        } finally{
            doneLoading();
        }
    }

    useEffect(()=>{
        fetchContactList();
    },[fetchContactList]) // fetch task on inital render to populat contact
    // will not do an infinit loop since fetchContactList is under usecallback
    const addItem = () => {
        formCont.onAddItem();
    }
    let arrOfContacts = contactList.map(obj => {
        return (
            <TableRow
            key={obj.id}
            name={obj.name}
            id={obj.id}
            contact={obj.contact}
            email={obj.email}
            target={obj.target}
            onDelete={deleteContact}
             />
        )
    })
    let addButton = <Button onClick={addItem} className='red' type='button' message='Add Contact'/>
    let noData = (
    <Card className='no-data'>
        <h1>There are no contacts yet</h1>
        <p>Lets start by adding a contact</p>
    </Card>)

    let data = (
        <Table>
            {arrOfContacts}  
        </Table>
    )
    let formModal = (
        <div className="modal">
            <MainForm submitForm={onSubmitForm} saveEdit={onEditTask} />
        </div>
    )
    return (
    <div className="App view clm">
        {formCont.addItem &&  formModal}
        <div className="contact-container">
            {arrOfContacts.length !== 0 && data}
            {arrOfContacts.length === 0 && noData}
        </div>
        {addButton}
        {isLoading && <Loading />}
        {errorState.isError && <ErrorCard message={errorState.errorMessage}/>}
    </div>
    );

}

export default MainPage;