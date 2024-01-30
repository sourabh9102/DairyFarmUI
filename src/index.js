import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import store from './app/store'
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);