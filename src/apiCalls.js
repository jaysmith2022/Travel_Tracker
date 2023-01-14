function fetchData(data) {
    return fetch(
        `http://localhost:3001/api/v1/${data}`
    )
    .then((response) => response.json())
}

function postData(newTripData, query, updateData, rerender, user, clearFields) {
    const postObj = {
        method: "POST",
        body: JSON.stringify(newTripData),
        headers: {
            "Content-Type": "application/json",
    }
}
return fetch(`http://localhost:3001/api/v1/${query}`, postObj)
.then(response => {
    if(!response.ok) {
        throw new Error(`Unable to Save Trip`)
    }

   return Promise.all([fetchData("trips"), fetchData("destinations"), fetchData(`travelers/${user.id}`)])
   .then(data => {
    updateData(data)
    pastTrips.innerHTML = ""
    upcomingTrips.innerHTML = ""
    pendingTrips.innerHTML = ""
    rerender()
    clearFields()
   })

})
// .then(data => {
//     console.log(data)
// })
// .catch(error => {
//     alert('Something is Broken right now, Try later.')
// })
}






export { fetchData, postData }