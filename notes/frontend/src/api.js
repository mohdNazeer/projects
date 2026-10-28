import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api/note"
})
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

api.interceptors.response.use(
    res => res,
    async err => {
        const original = err.config;

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/auth/refreshToken", {},
                    { withCredentials: true }
                );

                localStorage.setItem("accessToken", data.accessToken);
                return api(original);
            } catch (e) {
                localStorage.clear();
                if (window.location.pathname !== "/login")
                    window.location.href = "/login";
                return Promise.reject(e);
            }
        }
        return Promise.reject(err);
    }
);

export default api;