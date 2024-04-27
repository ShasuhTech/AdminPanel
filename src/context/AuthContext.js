// React Imports
import { createContext, useEffect, useState } from 'react';

// Next Import
import { useRouter } from 'next/router';

// Axios
import axios from 'axios';
import { axiosInstance } from 'src/utilities/configureAxios';

// Config
import authConfig from 'src/configs/auth';

// Redux
import { useDispatch } from 'react-redux';
import { fetchNotification } from 'src/store/settings/tnc';
import { initializeNotification, removeLoader, setLoader } from 'src/store/apps/user';
import { AppDispatch } from 'src/store';

// Constants
import BACKEND_ROUTES from 'src/common/constant';

// Utilities
import { browserSignature } from 'src/utilities/conversions';
import { initializer } from 'src/configs/firebase';

// Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName) || '';

      if (storedToken) {
        try {
          const res = await axiosInstance.get(BACKEND_ROUTES.GET_PROFILE, {
            params: { include: 'roles' }
          });

          if (res.data.success) {
            dispatch(fetchNotification({ page: 1, perPage: 15, singlePage: true }));
            setUser({ ...res.data.data, role: 'admin' });
            if (window.location.href.includes('login')) {
              router.push('/');
            }
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
        router.push('/login');
      }
    };

    initAuth();

  }, [dispatch, router]);

  const handleLogin = async (params, errorCallback) => {
    dispatch(setLoader());

    const signature = window.localStorage.getItem('signature');
    if (!signature) {
      const signature123 = browserSignature();
      window.localStorage.setItem('signature', signature123);
    }

    await initializer();
    await dispatch(initializeNotification());

    try {
      const res = await axiosInstance.post(authConfig.loginEndpoint, params);

      if (res.data.success) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.data.token);

        const profileRes = await axiosInstance.get(BACKEND_ROUTES.GET_PROFILE, {
          headers: { Authorization: `Bearer ${res.data.data.token}` },
          params: { include: 'roles' }
        });

        if (profileRes.data.success) {
          dispatch(removeLoader());
          setUser({ ...profileRes.data.data, role: 'admin' });
          router.push('/');
          setLoading(false);
        }
      }
    } catch (err) {
      dispatch(removeLoader());
      if (errorCallback) errorCallback(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then(registrations => {
          for (const registration of registrations) {
            registration.unregister();
          }
        })
        .catch(err => {
          console.log('Service Worker registration failed: ', err);
        });
    }
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push('/login');
  };

  const handleRegister = (params, errorCallback) => {
    axios.post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({
            email: params.email,
            password: params.password,
            loginType: 1
          });
        }
      })
      .catch(err => errorCallback ? errorCallback(err) : null);
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
