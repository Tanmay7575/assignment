
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext.tsx';

const queryClient=new QueryClient();
createRoot(document.getElementById('root')!).render(
 
    <QueryClientProvider client={queryClient}> 
    
    <BrowserRouter>
        <AuthContextProvider>
          <App />  
        </AuthContextProvider>
          </BrowserRouter> 
    </QueryClientProvider>
    
   
  
)
