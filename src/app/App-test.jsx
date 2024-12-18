import React, { useState, useEffect } from 'react';
import { getData, addData, deleteData, checkLogin, refreshTokenAPI,apiToken } from './api';
import AddForm from './components/AddForm';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import LoginForm from './components/LoginForm';
import { jwtDecode } from 'jwt-decode'; // For token decoding
import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('add');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState();

  console.log('====================================');
  console.log("localStorage.getItem('accessToken') >>> ",localStorage.getItem('accessToken'));
  console.log('====================================');
  useEffect(() => {
    const checkLoginStatus = async () => {
      const login = await checkToken(accessToken, refreshToken);
      if (isLoggedIn) {
        loadData();
      }
    };
  
    checkLoginStatus();
  }, [isLoggedIn]);
  

  
  const checkToken = async (accToken,reToken) => {
    
    
    try {
      const response = await apiToken(accToken,reToken)
      console.log('====================================');
      console.log("response>> checkToken",response);
      console.log('====================================');
      if (response.status === 401) {
        clearTokens()
      }else{
        console.log('====================================');
        console.log("testtttt");
        console.log('====================================');
        storeTokens(accessToken, refreshToken);
      }
    } catch (error) {
      clearTokens()
      throw error
      
    }
  }
  const loadData = async (search = '') => {
    const responseData = await getData(search, accessToken);
    setData(responseData);
  };

  const handleAdd = async (newData) => {
    try {
      await addData(newData, accessToken);
      loadData(); 
    } catch (error) {
      if (error.response && error.response.status === 401) {

        try {
          const newAccessToken = await refreshTokenAPI(refreshToken);
          setAccessToken(newAccessToken);
          await addData(newData, newAccessToken);
          loadData(); 
        } catch (refreshError) {
          console.error('refresh token invalit:', refreshError);
          clearTokens();
        }
        
      } else {
        console.error('Error :', error);
      }
    }
  };

  const handleDelete = async (id) => {
    await deleteData(id, accessToken);
    loadData();
  };

  const handleSearch = (term) => {
    loadData(term);
    setSearchTerm(term);
  };

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
    setSearchTerm('');
  };

  const storeTokens = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setIsLoggedIn(true);
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  const handleLogin = async (status) => {
    console.log('====================================');
    console.log('Login !!!!????');
    console.log('====================================');
    try {
      const response = await checkLogin(status);
      console.log('====================================');
      console.log("response.status >> ",response.status);
      console.log('====================================');
      setUser(status)
      if (response.status === 201) {
        storeTokens(response.data.access_token, response.data.refresh_token);
      } else {
        clearTokens();
      }
    } catch (error) {
      if (error.response && error.response.status === 401 && refreshToken) {
        try {
          const newTokens = await refreshTokenAPI(refreshToken);
          if (newTokens) {
            storeTokens(newTokens.access_token, newTokens.refresh_token);
            return handleLogin(user); // Retry login after refresh
          } else {
            clearTokens();
            throw error;
          }
        } catch (err) {
          clearTokens();
          throw err;
        }
      } else {
        clearTokens();
        throw error;
      }
    }
  };

  


  // Check every 1 minute if token is expired
  

  return (
    <div className="container">
      <h1>API Management</h1>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={clearTokens}>Logout</button>
          <select value={mode} onChange={handleModeChange}>
            <option value="add">Add Data</option>
            <option value="search">Search Data</option>
          </select>

          {mode === 'add' ? (
            <AddForm onAdd={handleAdd} />
          ) : (
            <SearchForm onSearch={handleSearch} />
          )}

          <DataTable data={data} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default App;
