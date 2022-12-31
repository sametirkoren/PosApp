import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from './redux/store';
import { ThemeProvider } from './components/ThemeContext';
import Background from './components/Background';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <Background>
                <App />
            </Background>
        </ThemeProvider>
    </Provider>
);