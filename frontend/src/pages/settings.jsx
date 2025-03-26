import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from '/src/App.jsx'
import AppLoad from '/src/AppLoad.jsx'
import SettingsForm from '/src/elems/settingfrom.jsx'
import NotFoundSave from '/src/elems/not_found_save.jsx'
import Settings_load from '/src/load_elems/settings_load.jsx'
import axios from 'axios';


function Settings() {

    const [count, setCount] = useState(0)

   /* function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const csrfToken = getCookie('csrftoken');*/

    document.querySelector("title").textContent = "Settings";

    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const [data1, setData1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

axios.defaults.withCredentials = true;


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');
    let [langua, setData10] = useState(null);

    langua = lang;

  const [data12, setData12] = useState(null);
  const [loading12, setLoading12] = useState(true);
  const [error12, setError12] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.daylang.ru/userinfo/');
        setData(response.data);
        if (response.data === 'unauthenticated_ttt')
            window.location.replace('/log/');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.daylang.ru/usersettings/');
        setData1(response.data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.daylang.ru/getchatlist/');
        setData12(response.data);
      } catch (err) {
        setError12(err.message);
      } finally {
        setLoading12(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return (
      <>
      <AppLoad lang={langua}/>
      <Settings_load/>
</>

  );
  if (error) return <p>Error: {error}</p>;


  if (loading1) return (
      <>
      <AppLoad lang={langua}/>
      <Settings_load/>
</>

  );
  if (error1) return <p>Error: {error}</p>;

  if (loading12) return (
      <>
      <AppLoad lang={langua}/>
      <Settings_load/>
</>

  );
  if (error12) return <p>Error: {error}</p>;

  document.querySelector("title").textContent = `${data.first_name} ${data.last_name} | Настройки`;

//  console.log(data);
    return (
        <>
<App name={data.first_name} lastname={data.last_name} username={data.username} lang={langua} if_teach={data.i_am_teacher} mess_count={data12[1]} photo={data.photo} balance={data.balance}/>
{(() => {
        if (data1.length === 0) {
          return (<>
                      <NotFoundSave iwant={"saved"}/>
                </>)
        }
        else{
            if (data1 === "unauthenticated_ttt") {
              return (<>
                          <NotFoundSave iwant={"saved"}/>
                    </>)
            }
            else{
                return (<>
                     <SettingsForm language={data1.language} name={data.first_name} surname={data.last_name} about_myself={data1.about_myself} about_my_degree={data1.about_my_degree} if_teacher={data.i_am_teacher} photo={data.photo}/>
                    </>)
                }
        }
      })()}

</>

  )
}

export default Settings
