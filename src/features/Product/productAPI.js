export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products?id=${id}`);
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchSearchProduct(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products?name=${query}`
      );
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}
