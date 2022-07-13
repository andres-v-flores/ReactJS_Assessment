

const URL = 'https://react-http-398cc-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list';


async function fetchPost(obj) {
    let response = await fetch(URL + '.json', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    if(!response.ok) {
        throw new Error('Something went wrong on posting to database')
    }
    let data = await response.json();
    return data;
}

async function fetchGet() {
    let response = await fetch(URL + '.json');
    if(!response.ok) {
        throw new Error('Something went wrong on getting data from database')
    }
    let data = await response.json();
    return data;
}

async function fetchPut(obj, target){
    let response = await fetch(URL +'/'+ target + '.json', {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    if(!response.ok) {
        throw new Error('Something went wrong on update')
    }
    let data = await response.json();
    return data;
}

async function fetchDelete(target){
    // some peps saying adding a body will make the server reject the delete method 
    // playing saifu
    let response = await fetch(URL +'/'+ target + '.json', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    if(!response.ok) {
        throw new Error('Something went wrong on deleting')
    }

    let data = await response.json();
    return data;
}

async function fetchGetOneItem(target) {
    let response = await fetch(URL +'/'+ target + '.json');
    if(!response.ok) {
        throw new Error('Something went wrong on fetching Data')
    }
    let data = await response.json();
    return data;
}

export { fetchPost, fetchGet, fetchPut, fetchDelete, fetchGetOneItem };