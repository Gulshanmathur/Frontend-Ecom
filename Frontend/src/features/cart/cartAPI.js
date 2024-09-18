
export async function addToCart(item) {
   try {
     const response = await fetch('http://localhost:8000/cart', {
       method: 'POST',
       body: JSON.stringify(item),
       headers: { 'content-type': 'application/json' },
       credentials:'include'
     });
     const data = await response.json();
     //TODO : on server it will only return  some info or user (not password)
 
     return { data }; // Return the data object
   } catch (error) {
     console.error('Error creating user:', error);
   }
 }

 export function fetchItemsByUserId() {
  // console.log({userId});
  
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL
    
    fetch(`http://localhost:8000/cart`,{
      method:"GET",
      credentials:'include'
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

 export async function updateCart(update) {
  try {
    const response = await fetch(`http://localhost:8000/cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// export async function deleteItemFromCart(itemId) {
//   try {
//     const response = await fetch(`http://localhost:8000/cart/${itemId}`, {
//       method: 'DELETE',
//       headers: { 'content-type': 'application/json' },
//     });
//     // const data = await response.json();
//     //TODO : on server it will only return  some info or user (not password)

//     return { data:{id:itemId} }; // Return the data object
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// }
export async function deleteItemFromCart(itemId) {
  try {
    // Ensure itemId is a string
    const id = typeof itemId === 'object' ? itemId._id || itemId.id : itemId;

    const response = await fetch(`http://localhost:8000/cart/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      credentials:'include'
    });

    if (!response.ok) {
      // Handle non-200 responses
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete item from cart');
    }

    // Return success response
    return { data: { id } }; // Return the data object
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function resetCart() {

  try {
    const response = await fetchItemsByUserId();  // to fetch all items
    const items = response.data;
    for(let item of items){
      await deleteItemFromCart(item);  //delete item from items one by one
    }

    return {status:"success"}; 
  } catch (error) {
    console.error('Error creating user:', error);
  }
}