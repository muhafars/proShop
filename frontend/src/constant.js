//cause we are already set proxy at package.json we dont need to prefix it cause it will cause an error CORS
// const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
//Changes it into this 1
export const BASE_URL = "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";

// export { BASE_URL, PRODUCTS_URL, USERS_URL, ORDERS_URL, PAYPAL_URL };
