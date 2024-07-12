// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/products`)
      .then((response) => response.json())
      .then((data) => {
        resolve({data});
      })
      .catch((error) => console.error(error));
  });
}

export function fetchProductsByFilter(filter) {
  // filter ={"category":"smartPhone"}
  // TODO : on server support multiple values
  let queryString = '';

  for(let key in filter){
    queryString +=`${key}=${filter[key]}&`
  }
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/products?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        resolve({data});
      })
      .catch((error) => console.error(error));
  });
}
