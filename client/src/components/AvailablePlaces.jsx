import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  // Fetching from the backend
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFectching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places,please try again later",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);
  // This  is jst used to fetch the data  from the backend ie http://localhost:3000/places
  //     .then((response) => {
  //       return
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // }, []);

  if (error) {
    return <Error title="An Error Occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFectching}
      loadingText="Fetching place data..."
      fallbackText={"No Places Available."}
      onSelectPlace={onSelectPlace}
    />
  );
}
