
export async function createUser(userData) {
 // Log user data for reference

  try {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function checkUser(loginInfo) {
  // Log user data for reference
   // loginInfo ={email:_emailData, password : _password};  
   //TODO : from  server it will get some info or user (not password)
    const  {email,password}= loginInfo;
  
   try {
     const response = await fetch(`http://localhost:8000/users?email=${email}`)
     const data = await response.json();
     if (data.length === 0) {
      throw new Error("User not found"); // Clear message for user not found
    } else if (data[0].password !== password) {
      throw new Error("email or password are not correct"); // Specific message for incorrect password
    } else {
      return ({ data: data[0] });
    }
   } catch (error) {
     console.error('Error maybe user found:', error);
     throw error;
   }
 }



