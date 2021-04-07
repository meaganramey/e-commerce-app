const baseUrl = "http://localhost:3001";

export const getAllProductsRequest = () => {
  return fetch(`${baseUrl}/products`).then((res) => res.json());
};

export const loginRequest = (email, password) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
};

export const signUpRequest = (email, password) => {
  return fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
};

export const logoutRequest = (token) => {
  return fetch(`${baseUrl}/auth/logout`, {
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json());
};

export const updateProductRequest = (product) => {
  return fetch(`${baseUrl}/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      product,
    }),
  }).then((res) => res.json());
};


export const addProductRequest = (product, token) => {
  return fetch(`${baseUrl}/products/add`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token},
    body: JSON.stringify(product)
  }).then((res) => res.json())
}