const baseUrl = "http://localhost:3000";

export const getAllProducts = () => {
  return fetch(`${baseUrl}/products`).then((res) => res.json());
};
