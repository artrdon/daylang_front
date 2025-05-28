import { StrictMode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Epp from './epp.jsx'
import WebSocketProvider from './once/web_socket_provider.jsx'

const queryClient = new QueryClient();


if (window.trustedTypes?.createPolicy) {
    window.trustedTypes.createPolicy('defaults', {
      createHTML: (html) => {html.replace(/<iframe[^>]*onload\s*=[^>]+>/gi, ''); console.log("fuck u")},
      createScriptURL: url => {url.replace(/javascript:/gi, 'blocked:'); console.log("fuck u")}
    });
  }



createRoot(document.querySelector('body')).render(
        
        <StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <WebSocketProvider>
                        
                            <Epp queryClient={queryClient}/>

                    </WebSocketProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>,


)
