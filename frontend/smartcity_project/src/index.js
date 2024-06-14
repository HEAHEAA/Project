import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { HashRouter} from "react-router-dom";
import {ProSidebarProvider} from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProSidebarProvider>
        <HashRouter>
            <App/>
        </HashRouter>
    </ProSidebarProvider>
);

reportWebVitals();
