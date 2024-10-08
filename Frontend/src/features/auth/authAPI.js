/* eslint-disable no-unreachable */

export async function createUser(userData) {
  // Log user data for reference

  try {
    const response = await fetch(
      "https://ecommerce-backend-9ssc.onrender.com/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function loginUser(loginInfo) {
  // Log user data for reference
  // loginInfo = { email: _emailData, password: _password };
  // TODO: from server it will get some info or user (not password)

  try {
    const response = await fetch(
      `https://ecommerce-backend-9ssc.onrender.com/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
        credentials: "include", // Include cookies with the request
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("inside login", { data });
      return { data }; // Return the data directly
    } else {
      const err = await response.json();
      throw new Error(err.message || "Login failed"); // Throw an error with a message
    }
  } catch (error) {
    throw new Error(error.message || "An error occurred while logging in"); // Throw an error for the catch block
  }
}
export async function checkAuth() {
  // Log user data for reference
  // loginInfo = { email: _emailData, password: _password };
  // TODO: from server it will get some info or user (not password)

  try {
    const response = await fetch(
      `https://ecommerce-backend-9ssc.onrender.com/auth/check`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log({ data });
      return { data }; // Return the data directly
    } else {
      const err = await response.json();
      console.log("inside auth", err);
      throw new Error(err.message || "Login failed"); // Throw an error with a message
    }
  } catch (error) {
    throw new Error(error.message || "An error occurred while logging in"); // Throw an error for the catch block
  }
}

export async function signOut() {
  try {
    const response = await fetch(
      "https://ecommerce-backend-9ssc.onrender.com/auth/signout",
      {
        method: "POST",
        credentials: "include", // Include cookies with the request
      }
    );

    if (!response.ok) {
      throw new Error("Sign out failed");
    }

    const data = await response.json();
    return data; // Return success message or any relevant data
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Handle error appropriately in your UI
  }
}
