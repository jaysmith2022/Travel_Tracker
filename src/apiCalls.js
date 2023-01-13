function fetchData(data) {
    return fetch(
        `http://localhost:3001/api/v1/${data}`
    )
    .then((response) => response.json())
}

function postData(newTripData, data) {
    const postObj = {
        method: "POST",
        body: JSON.stringify(newTripData),
        headers: {
          "Content-Type": "application/json",
    },
}

return fetch(`http://localhost:3001/api/v1/${data}`, newTripData)
.then(response => {
    if(!response.ok) {
        throw new Error(`Unable to Save Trip`)
    }
    return response.json()
})
.catch(error => {
    alert('Something is Broken right now, Try later.')
})

}





export { fetchData, postData }