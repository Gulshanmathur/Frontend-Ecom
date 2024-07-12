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

export function fetchProductsByFilter(filter,sort) {
  // filter ={"category":["smartPhone","laptops","beauty",...]}
  // sort = {_sort :"price",_order:"desc"}
  // TODO : on server support multiple values
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
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`http://localhost:8000/products?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error('Error fetching data:', error));
  });
}
