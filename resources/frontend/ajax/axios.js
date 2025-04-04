import axios from "axios";

let axiosClient = axios.create({
    withCredentials: true,
});

export function setCsrfToken(token) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
}

axios.defaults.headers.common["X-CSRF-TOKEN"] = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

axiosClient.interceptors.request.use((config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    () => {
        let { response } = error;
    },
);

export default axios;
