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
