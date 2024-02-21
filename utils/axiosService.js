// AxiosService.js
import axios from 'axios';
import CONFIG from '../config.js';

class AxiosService {
  constructor(baseUrl) {
    this.url = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
        'X-IBM-Client-Id': CONFIG.ClientID, 
      },
    });
  }

  async get(endpoint, config = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error('Axios get error:', error.response);
      throw error;
    }
  }

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.axiosInstance.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Axios post error:', error.response);
      throw error;
    }
  }
    // Add a method for DELETE requests
    async delete(endpoint, config = {}) {
        try {
          const response = await this.axiosInstance.delete(endpoint, config);
          return response.data;
        } catch (error) {
          console.error('Axios delete error:', error.response);
          throw error;
        }
      }
    
      // Add a method for PUT requests (commonly used for updates)
      async update(endpoint, data = {}, config = {}) {
        try {
          const response = await this.axiosInstance.put(endpoint, data, config);
          return response.data;
        } catch (error) {
          console.error('Axios update error:', error.response);
          throw error;
        }
      }
}

export default AxiosService;
