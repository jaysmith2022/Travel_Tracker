function fetchData(data) {
  return fetch(`http://localhost:3001/api/v1/${data}`).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  });
}

const fetchAll = (userID) => {
  return Promise.all([
    fetchData("trips"),
    fetchData("destinations"),
    fetchData(`travelers/${userID}`),
  ]);
};

const postData = (
  newTripData,
  query,
  updateData,
  rerender,
  user,
  clearFields
) => {
  const postObj = {
    method: "POST",
    body: JSON.stringify(newTripData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:3001/api/v1/${query}`, postObj).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Unable to Save Data, Try later");
      }

      fetchAll(user.id).then((data) => {
        updateData(data);
        user.trips = [];
        pastTrips.innerHTML = "";
        upcomingTrips.innerHTML = "";
        pendingTrips.innerHTML = "";
        rerender();
        clearFields();
      });

      return response.json();
    }
  );
};

export { postData, fetchAll };
