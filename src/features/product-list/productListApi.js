// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL
    
    fetch(`http://localhost:8000/products`)
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

export function fetchProductById(id) {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}
export async function updateProduct(update) {
  try {
    const response = await fetch(`http://localhost:8000/products/${update.id}`, {
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

export function createProduct(product) {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/products/`,
      {
        method :'POST',
        body: JSON.stringify(product),
        headers: {'content-type': 'application/json'}
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data['price'] = Number(data.price)
        data['discount'] = Number(data.discount)
        data['stock'] = Number(data.stock)
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

export async function fetchProductsByFilter(filter,sort,pagination) {
  // filter ={"category":["smartPhone","laptops","beauty",...]}
  // sort = {_sort :"price",_order:"desc"}
  // pagination = {_page:1, _limit: 10} //_page=1&_limit=10
  // TODO : on server support multiple values in filter
  // TODO : server will filter the deleted products in case of non-admin or user UI
  let queryString = "";
  
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }
  // console.log(pagination);
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }
  // console.log(queryString);
  const url = `http://localhost:8000/products?${queryString}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { data:{products:data, totalItems:100} }; // Return the data object
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error here (e.g., throw an error, display a user-friendly message)
  }
}
export function fetchCategories() {
  return new Promise((resolve) => {
    fetch(`http://localhost:8000/categories`)
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}
export function fetchBrands() {
  return new Promise((resolve) => {
    fetch(`http://localhost:8000/brands`)
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}
