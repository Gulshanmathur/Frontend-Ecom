export async function fetchLoggedInUserOrders(userId) {
  try {
    //  ?user=${userId}` before update below line
    const response = await fetch(
      `https://ecommerce-backend-9ssc.onrender.com/ordersnow/user/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function fetchLoggedInUser(userId) {
  try {
    const response = await fetch(
      `https://ecommerce-backend-9ssc.onrender.com/users/own/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function updateUser(update) {
  // Log user data for reference

  try {
    const response = await fetch(
      `https://ecommerce-backend-9ssc.onrender.com/users/${update.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
