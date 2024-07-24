
export async function addToCart(item) {
   try {
     const response = await fetch('http://localhost:8000/cart', {
       method: 'POST',
       body: JSON.stringify(item),
       headers: { 'content-type': 'application/json' },
     });
     const data = await response.json();
     //TODO : on server it will only return  some info or user (not password)
 
     return { data }; // Return the data object
   } catch (error) {
     console.error('Error creating user:', error);
   }
 }

 export function fetchItemsByUserId(userId) {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/cart?user=${userId}`)
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

export async function deleteItemFromCart(itemId) {
  try {
    const response = await fetch(`http://localhost:8000/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    // const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data:{id:itemId} }; // Return the data object
  } catch (error) {
    console.error('Error creating user:', error);
  }
}