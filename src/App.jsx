import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from './store/authSlice';
import api from './services/api';
import AppRoutes from './AppRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/me');
          dispatch(loginSuccess({
            user: response.data.user,
            token: token
          }));
        } catch (error) {
          console.error("Failed to fetch user:", error);
          dispatch(logout());
        }
      }
    };

    fetchUser();
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
