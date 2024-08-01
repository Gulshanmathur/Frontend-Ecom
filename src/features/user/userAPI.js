export async function fetchLoggedInUserOrders(userId) { 
   try {
     const response = await fetch(`http://localhost:8000/orders/?user.id=${userId}`);
     const data = await response.json(); 
     return { data }; // Return the data object
   } catch (error) {
     console.error('Error creating user:', error);
   }
 } 