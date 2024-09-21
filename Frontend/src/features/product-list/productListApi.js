// A mock function to mimic making an async request for data
export function fetchProductById(id) {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`https://mern-ecommerce-backend-wsy2.onrender.com/products/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

export async function updateProduct(update) {
  try {
    const response = await fetch(
      `https://mern-ecommerce-backend-wsy2.onrender.com/products/${update.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    //TODO : on server it will only return  some info or user (not password)

    return { data }; // Return the data object
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export function createProduct(product) {
  return new Promise((resolve) => {
    // TODO: we will not hard-code server URL

    fetch(`https://mern-ecommerce-backend-wsy2.onrender.com/products/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data["price"] = Number(data.price);
        data["discount"] = Number(data.discount);
        data["stock"] = Number(data.stock);
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

export async function fetchProductsByFilter(filter, sort, pagination, admin) {
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

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) queryString += `admin=true`;
  const url = `https://mern-ecommerce-backend-wsy2.onrender.com/products?${queryString}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    let totalItems = response.headers.get("X-Total-Count");
    if (totalItems) {
      totalItems = +totalItems;
    } else {
      totalItems = 100;
    }
    return { data: { products: data, totalItems: 100 } }; // Return the data object
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error here (e.g., throw an error, display a user-friendly message)
  }
}

export function fetchCategories() {
  return new Promise((resolve) => {
    fetch(`https://mern-ecommerce-backend-wsy2.onrender.com/categories`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}

export function fetchBrands() {
  return new Promise((resolve) => {
    fetch(`https://mern-ecommerce-backend-wsy2.onrender.com/brands`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => console.error(error));
  });
}
