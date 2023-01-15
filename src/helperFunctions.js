const getDestinations = (query, message, data) => {
  const getDest = query.map((e) => e.destinationID);
  if (getDest.length === 0) {
    return message;
  } else {
    return query
      .reduce((acc, curr) => {
        data.forEach((element) => {
          if (element.id === curr) {
            acc.push(element);
          }
        });
        return acc;
      }, [])
      .filter((element) => element);
  }
};

const getDestinationbyID = (query, data) => {
  return query.reduce((acc, curr) => {
    data.forEach((element) => {
      if (element.id === curr) {
        acc.push(element);
      }
    });
    return acc;
  }, []);
};

const getFlightAndLodging = (data, findYear, estimate, amount, id, year) => {
  return findYear
    .filter((trip) => trip.date.split("/")[0] === year)
    .reduce((acc, curr) => {
      data.forEach((element) => {
        if (element.id === curr.destinationID) {
          const transport = element[estimate] * curr[amount];
          acc.push(transport);
        }
      });
      return acc;
    }, [])
    .reduce((acc, curr) => acc + curr, 0);
};

export { getDestinations, getDestinationbyID, getFlightAndLodging };
