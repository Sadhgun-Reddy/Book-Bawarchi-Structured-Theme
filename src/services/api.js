import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for 401 token renewal
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and it's not a retry already
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // If there's no refresh token, sign out
                if (!refreshToken) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Call your refresh token endpoint
                // NOTE: Make sure to replace '/auth/refresh' with actual refresh endpoint
                const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
                    refreshToken,
                });

                const newToken = response.data.token;
                localStorage.setItem('token', newToken);

                // Update header and retry original request
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh fails, sign out
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
