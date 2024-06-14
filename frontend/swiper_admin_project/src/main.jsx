import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './_style/index.css'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            cacheTime: 1000 * 60 * 5,
        }
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </QueryClientProvider>
)
