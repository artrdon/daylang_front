import { Routes, Route } from 'react-router-dom'
import Find from '/src/pages/find.jsx'
import Finded from '/src/pages/finded.jsx'
import Me from '/src/pages/me.jsx'
import Log_reset from '/src/pages/reset_password.jsx'
import Settings from '/src/pages/settings.jsx'
import About from '/src/pages/about_us.jsx'
import NotFound from '/src/pages/notfound.jsx'
import Reg from '/src/pages/reg.jsx'
import Log from '/src/pages/log.jsx'
import MyWords from '/src/pages/my_words.jsx'
import TestAI from './pages/test_ai.jsx';
import Forbidden from './pages/forbidden.jsx';
import Privacy from './pages/privacy.jsx';
import Support from './pages/support.jsx'
import CallbackHandler from './pages/yandex_call_back.jsx'
import SmileTest from './pages/smile.jsx'


export default function Epp(){

    return(
        
        <Routes>
            <Route path="/auth/yandex/callback" element={<CallbackHandler />} />
    
            <Route path="/" element={<Find />}/>
            <Route path="/ai_speak/:id/" element={<TestAI />}/>
            <Route path="/smile/" element={<SmileTest />}/>
            {/*<Route path="/user/undefined/" element={<Log />}/>*/}
            <Route path="/log/" element={<Log />}/>
            {/*<Route path="/log/reset/" element={<Log_reset />}/>*/}
            <Route path="/reg/" element={<Reg />}/>
            {/*<Route path="/:language/" element={<Finded />}/>*/}
            <Route path="/user/:user/" element={<Me />}/>
            <Route path="/settings/" element={<Settings />}/>
            <Route path="/about_us/" element={<About />}/>
            <Route path='/my_words/' element={<MyWords />} />
            <Route path='/support/' element={<Support />} />
            <Route path="/privacy/" element={<Privacy />} />
            <Route path="/forbidden/" element={<Forbidden />} />
            <Route path="/not_found/" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    
    )
    
}
