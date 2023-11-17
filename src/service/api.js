import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Thay đổi URL cho phù hợp với backend http://your-backend-url/api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
