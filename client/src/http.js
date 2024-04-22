export async function fetchAvailablePlaces() {
  const response = await fetch("https://placepicker.onrender.com/places");
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to Fetch the Places");
    throw error;
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("https://placepicker.onrender.com/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update the user data ");
  }
  return resData.message;
}
