function fetchData(data) {
    return fetch(
        `http://localhost:3001/api/v1/${data}`
    )
    .then((response) => response.json())
}





export { fetchData }