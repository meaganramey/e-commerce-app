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
  console.log(token);
  return fetch(`${baseUrl}/auth/logout`, {
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json());
};
