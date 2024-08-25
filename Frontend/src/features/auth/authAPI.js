/* eslint-disable no-unreachable */

export async function createUser(userData) {
  // Log user data for reference

  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function checkUser(loginInfo) {
  // Log user data for reference
  // loginInfo = { email: _emailData, password: _password };
  // TODO: from server it will get some info or user (not password)

  try {
    const response = await fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return { data }; // Return the data directly
    } else {
      const err = await response.json();
      throw new Error(err.message || 'Login failed'); // Throw an error with a message
    }
  } catch (error) {
    throw new Error(error.message || 'An error occurred while logging in'); // Throw an error for the catch block
  }
}

export async function signOut(userId) {
  // Log user data for reference

  try {
    //TODO : on server we will remove user session info

    return { data: "success" }; // Return the data object
  } catch (error) {
    console.error(error);
  }
}
