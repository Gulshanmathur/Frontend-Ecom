export async function createOrder(order) {
  try {
    const response = await fetch('http://localhost:8000/orders', {
      method: 'POST',
      body: JSON.stringify(order),
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
export async function updateOrder(order) {
  try {
    const response = await fetch(`http://localhost:8000/orders/${order.id}`, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)
    return { data }; // Return the data object
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function fetchAllOrders(sort,pagination) {
  let queryString = '';
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }
  const url = `http://localhost:8000/orders?${queryString}`;

  try {
    const response = await fetch(url,{
      header:"GET",
      credentials:"include",
    });
    const data = await response.json();    
    // const totalOrders = await response.headers.get('X-Total-Count');
    return { data:{orders:data, totalOrders:100} }; // Return the data object
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}