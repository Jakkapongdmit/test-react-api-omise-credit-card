import axios from 'axios'

const API_URL1 = 'http://localhost:3001' // แก้ไข URL ตาม backend ของคุณ
const API_URL2 = 'http://localhost:3001' // แก้ไข URL ตาม backend ของคุณ
const AUTH_TOKEN = import.meta.env.API_TOKEN
console.log('AUTH_TOKEN >> ', AUTH_TOKEN)

// Login 
export async function checkLogin(newData) {
  console.log('checkLogin data >>', newData);

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL1}/authen/login`, // Ensure the URL is correct
      headers: {
        'Content-Type': 'application/json'
      },
      data: newData // Data to send in the body
    });
    console.log('response >>> ', response.data);
    return response;
  } catch (error) {
    throw error
  }
}

export async function apiToken(accessToken,refreshToken) {

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL1}/authen/check/token`, // Ensure the URL is correct
      headers: {
        'Content-Type': 'application/json'
      },
      data: {accessToken:accessToken} // Data to send in the body
    });
    console.log('response >>> ', response.data);
    return response;
  } catch (error) {
    
    throw error
  }
}

export async function refreshTokenAPI(token) {
  try {
    
    const response = await axios({
      method: 'post',
      url: `${API_URL2}/authen/refresh`,
      headers: {
        'Content-Type': 'application/json'
      },
      data:{refreshToken:token}
    })
    return response.data;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw new Error('Session expired, please log in again.');
  }
}

// Function to get data with optional search term
export async function getData(searchTerm = '') {
  const response = await axios({
    method: 'get',
    url: searchTerm !== '' ? `${API_URL1}/products/${searchTerm}` : `${API_URL1}/products`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

// Function to add new data (POST request)
export async function addData(newData,accessToken) {
  console.log('newData >>', newData);

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL1}/products/create`, // Ensure the URL is correct
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: newData // Data to send in the body
    });
    console.log('response >>> ', response.data);
    return response.data;
  } catch (error) {
    console.error('err >>', error.response?.data || error.message); // Log the error details
    throw error
    
  }
}


// Function to delete data by ID (DELETE request)
export async function deleteData(id) {
  const response = await axios({
    method: 'delete',
    url: `${API_URL1}/products/delete?id=${id}`,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.data
}
