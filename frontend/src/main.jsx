import { StrictMode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Epp from './epp.jsx'
import WebSocketProvider from './once/web_socket_provider.jsx'

const queryClient = new QueryClient();




createRoot(document.querySelector('body')).render(
        
        <StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <WebSocketProvider>
                        
                            <Epp/>

                    </WebSocketProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>,


)
