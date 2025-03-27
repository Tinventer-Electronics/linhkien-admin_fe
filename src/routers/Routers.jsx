import React, { useEffect } from 'react';
import MainRouter from './MainRouter';
import AuthRouter from './AuthRouter';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { localDataNames } from '../constants/appInfo';
import { BrowserRouter } from 'react-router-dom';

const Routers = () => {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = () => {
        const data = localStorage.getItem(localDataNames.authData);
        if (data) {
            dispatch(addAuth(JSON.parse(data)));
        }
    };
    return <BrowserRouter>{auth.token ? <MainRouter /> : <AuthRouter />}</BrowserRouter>;
};

export default Routers;
