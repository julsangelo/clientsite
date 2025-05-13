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

export function addToCart(productID, quantity, callback) {
    axios
        .post("/addToCart", { productID: productID, quantity: quantity })
        .then((response) => {
            callback(response.data);
        });
}

export function getCart(callback) {
    axios.get("/getCart").then((response) => {
        callback(response.data);
    });
}

export function updateItemQuantity(productID, action) {
    axios.post("/updateItemQuantity", { productID: productID, action: action });
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

export function removeItem(productID, callback) {
    axios.post("/removeItem", { productID: productID }).then((response) => {
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

export function getResetCode(data, callback) {
    axios.post("/getResetCode", data).then((response) => {
        callback(response.data);
    });
}

export function checkResetCode(data, callback) {
    axios.post("/checkResetCode", data).then((response) => {
        callback(response.data);
    });
}

export function resetPassword(token, data, callback) {
    axios.post("/resetPassword", { token, data }).then((response) => {
        callback(response.data);
    });
}

export function productReview(data, callback) {
    axios.post("/productReview", { data }).then((response) => {
        callback(response.data);
    });
}

export function getReview(callback) {
    axios.post("/getReview").then((response) => {
        callback(response.data);
    });
}

export function getAllReview(callback) {
    axios.get("/getAllReview").then((response) => {
        callback(response.data);
    });
}

export function getProductReview(productID, callback) {
    axios.post("/getProductReview", { productID }).then((response) => {
        callback(response.data.productReview);
    });
}

export function updateProfile(data, callback) {
    axios.post("/updateProfile", { data }).then((response) => {
        callback(response.data);
    });
}

export function getFeaturedProduct(callback) {
    axios.get("/featuredProduct").then((response) => {
        callback(response.data);
    });
}
