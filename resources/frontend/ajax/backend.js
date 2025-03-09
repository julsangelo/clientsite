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
            callback(response.data);
        });
}

export function getCart(callback) {
    axios.get("/getCart").then((response) => {
        callback(response.data);
    });
}

export function updateItemQuantity(productCode, action) {
    axios.post("/updateItemQuantity", { code: productCode, action: action });
}

export function getClientIntent(amount, callback) {
    axios.post("/paymentIntent", { amount }).then((response) => {
        callback(response.data);
    });
}

export function placeOrder(data, callback) {
    axios.post("/placeOrder", data).then((response) => {
        callback(response.data);
    });
}

export function signIn(data, callback) {
    axios.post("/signIn", data).then((response) => {
        callback(response.data);
    });
}

export function signUp(data, callback) {
    axios
        .post("/signUp", data)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            callback(error.response.data);
        });
}

export function signOut(callback) {
    axios.get("/signOut").then((response) => {
        callback(response.data);
    });
}

export function authCheck(callback) {
    axios.get("/authCheck").then((response) => {
        callback(response.data);
    });
}

export function getOrders(callback) {
    axios.get("/getOrders").then((response) => {
        callback(response.data.order);
    });
}

export function addAddress(data, callback) {
    axios.post("/addAddress", data).then((response) => {
        callback(response.data);
    });
}

export function getAllAddress(callback) {
    axios.get("/getAllAddress").then((response) => {
        callback(response.data);
    });
}

export function removeItem(productCode, callback) {
    axios.post("/removeItem", { code: productCode }).then((response) => {
        callback(response.data);
    });
}

export function deleteAddress(orderDeliveryID, callback) {
    axios.post("/deleteAddress", { id: orderDeliveryID }).then((response) => {
        callback(response.data);
    });
}

export function editAddress(orderDeliveryID, data, callback) {
    axios
        .post("/editAddress", { id: orderDeliveryID, data: data })
        .then((response) => {
            callback(response.data);
        });
}

export function getAddress(orderDeliveryID, callback) {
    axios.post("/getAddress", { id: orderDeliveryID }).then((response) => {
        callback(response.data.address[0]);
    });
}

export function createInvoice(data, callback) {
    axios.post("/createInvoice", { data: data }).then((response) => {
        callback(response.data);
    });
}
