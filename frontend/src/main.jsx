import { StrictMode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Find from '/src/pages/find.jsx'
import Finded from '/src/pages/finded.jsx'
import Message_list from '/src/pages/message_list.jsx'
import Saved from '/src/pages/saved.jsx'
import Message from '/src/pages/message.jsx'
import Offer from '/src/pages/offer.jsx'
import Me from '/src/pages/me.jsx'
import Me_pup from '/src/pages/me_pup.jsx'
import Log_reset from '/src/pages/reset_password.jsx'
import Degree from '/src/pages/degree.jsx'
import Feedback from '/src/pages/feedback.jsx'
import Feedback_pup from '/src/pages/feedback_pup.jsx'
import Offers_on_main from '/src/pages/offers_main.jsx'
import Settings from '/src/pages/settings.jsx'
import About from '/src/pages/about_us.jsx'
import Confident from '/src/pages/confident.jsx'
import NotFound from '/src/pages/notfound.jsx'
import Reg from '/src/pages/reg.jsx'
import Log from '/src/pages/log.jsx'
import CreateOffer from '/src/pages/create_offer.jsx'
import UpdateOffer from '/src/pages/update_offer.jsx'
import ChatCreate from '/src/pages/chat_create.jsx'
import MyLessons from '/src/pages/my_lessons.jsx'
import App from './App.jsx'
import Call from '/src/pages/call.jsx'
import Finded_deep from './pages/finded_deep.jsx'
import pers from '/src/static/docks/pryvacy.pdf'
import CallbackHandler from './pages/yandex_call_back.jsx'
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
