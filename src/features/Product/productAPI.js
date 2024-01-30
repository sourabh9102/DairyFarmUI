export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json()
        resolve({ data })
    });
}


export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8081/products?id=${id}`);
        const data = await response.json()
        resolve({ data })
    });
}
