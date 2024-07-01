import axios from 'axios';

const tokenVerification = async (token) => {
  try {
    const tokenString = String(token);
    const response = await axios.post('http://localhost:12345/api/token/verifyToken', { token: tokenString });
    return response.data; // Should return user data if token is valid
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export default tokenVerification;