import axios from "./axios";

export function getReferences(callback) {
    axios.get("/getReferences").then((response) => {
        callback(response.data);
    });
}

export function getProducts(callback) {
    axios.get("/getProducts").then((response) => {
        callback(response.data);
    });
}

export function getAllProducts(callback) {
    axios.get("/getAllProducts").then((response) => {
        callback(response.data.products);
    });
}

export function getCategorizedProducts(categoryID, callback) {
    axios
        .post("/getCategorizedProducts", { categoryID: categoryID })
        .then((response) => {
            callback(response.data.products);
        });
}

export function getProductDetail(productCode, callback) {
    axios
        .post("/getProductDetail", { productCode: productCode })
        .then((response) => {
            callback(response.data.product);
        });
}

export function addToCart(productCode, quantity, callback) {
    axios
        .post("/addToCart", { code: productCode, quantity: quantity })
        .then((response) => {
            callback(response.data.products);
        });
}
