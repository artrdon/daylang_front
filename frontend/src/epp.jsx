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
import WebSocketProvider from './once/web_socket_provider.jsx'


export default function Epp(){

    return(
        
        <Routes>
            <Route path="/auth/yandex/callback" element={<CallbackHandler />} />
    
            <Route path="/" element={<Find />}/>
            <Route path="/user/undefined/" element={<Log />}/>
            <Route path="/log/" element={<Log />}/>
            <Route path="/log/reset/" element={<Log_reset />}/>
            <Route path="/reg/" element={<Reg />}/>
            <Route path="/create_offer/" element={<CreateOffer />}/>
            <Route path="/update_offer/:username/:index/" element={<UpdateOffer />}/>
            <Route path="/create_chat/:username/:id/" element={<ChatCreate />}/>
            <Route path="/finded/:language/" element={<Finded />}/>
            <Route path="/finded/:language/:format/:target/:age/:microphone/:min/:max/" element={<Finded_deep />}/>
            <Route path="/t/user/:user/" element={<Me />}/>
            <Route path="/t/user/:user/degree/" element={<Degree />}/>
            <Route path="/t/user/:user/feedback/" element={<Feedback />}/>
            <Route path="/p/user/:user/" element={<Me_pup />}/>
            <Route path="/p/user/:user/feedback/" element={<Feedback_pup />}/>
            <Route path="/t/user/:user/offers/" element={<Offers_on_main />}/>
            <Route path="/message_list/" element={<Message_list />}/>
            <Route path="/saved/" element={<Saved />}/>
            <Route path="/message_list/:id/" element={<Message />}/>
            <Route path="/settings/" element={<Settings />}/>
            <Route path="/about_us/" element={<About />}/>
            <Route path="/:username/offer/:id/" element={<Offer />}/>
            <Route path='/my_lessons/' element={<MyLessons />} />
            <Route path="/call/:id/" element={<Call />}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    
    )
    
}
