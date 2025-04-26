import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Type_offer({ lang }) {


    var arrLang = {
      'English': {
          'english': 'English',
          'germany': 'Germany',
          'russian': 'Russian',
          'chinese': 'Chinese',
          'french':  'French',
          'italian': 'Italian',
          'spanish': 'Spanish',
          'serbian': 'Serbian',
          'other': 'Others',
      },
      'Русский': {
          'english': 'Английский',
          'germany': 'Немецкий',
          'russian': 'Русский',
          'chinese': 'Китайский',
          'french':  'Французский',
          'italian': 'Итальянский',
          'spanish': 'Испанский',
          'serbian': 'Сербский',
          'other': 'Другие',
      },
      'Srpski': {
          'english': 'Engleski',
          'germany': 'Nemačka',
          'russian': 'Ruski',
          'chinese': 'Kineski',
          'french':  'Francuski',
          'italian': 'Italijanski',
          'spanish': 'Španski',
          'serbian': 'Srpski',
          'other': 'Drugi',
      },
      'Српски': {
          'english': 'Енглески',
          'germany': 'Немачка',
          'russian': 'Руски',
          'chinese': 'Кинески',
          'french':  'Француски',
          'italian': 'Италијански',
          'spanish': 'Шпански',
          'serbian': 'Српски',
          'other': 'Други',
      },
      'Deutsch': {
          'english': 'Englischsprachig',
          'germany': 'Deutschland',
          'russian': 'Russisch',
          'chinese': 'Chinesisch',
          'french':  'Französisch',
          'italian': 'Italienisch',
          'spanish': 'Spanisch',
          'serbian': 'Serbisch',
          'other': 'Others',
      },
      'Español': {
          'english': 'Inglés',
          'germany': 'Alemania',
          'russian': 'Ruso',
          'chinese': 'Chino',
          'french':  'Francés',
          'italian': 'Italiano',
          'spanish': 'Español',
          'serbian': 'Serbio',
          'other': 'Otros',
      },
      'عربي': {
          'english': 'الإنجليزية',
          'germany': 'ألمانيا',
          'russian': 'الروسية',
          'chinese': 'الصينية',
          'french':  'الفرنسية',
          'italian': 'الإيطالية',
          'spanish': 'الإسبانية',
          'serbian': 'الصربية',
          'other': 'آخرون',
      }

    }

  const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
    queryKey: ['lol'], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/lol/`);
      return response.data; // Возвращаем только данные
    },
  });

  if (loading) return (<>
      <div className="div_of_service">
            <img  alt="" style={{height: 100,width: 160,position: "absolute", zIndex: 10, top: 50, left: 20 }}/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ position: "absolute", fontSize: 25, zIndex: 10, fontWeight: 600, top: 170, color: "white" }}>

              </p>
            </div>
            <img src="/src/static/img/bluefon.png" alt="" className="service_img" />
            <div className="count_of_offers"></div>
          </div>

      </>);
  if (error) return <p>Error: {error}</p>;

    return (
            <>
            {data.map((data) => (


        <Link to={`/finded/${data.type}/`} key={data.id}>
          <div className="div_of_service" >
            <img src={data.lang_flag} alt={arrLang[lang][`${data.name_of_lang}`]} className='offer_type_flag_img'/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className='offer_type_name_of_lang'>
                {arrLang[lang][`${data.name_of_lang}`]}
              </p>
            </div>
            <img src="/src/static/img/bluefon.png" alt="fon" className="service_img" />
            <p className="count_of_offers">{data.number_of_offers}</p>
          </div>
        </Link>

                ))}
        </>
    )
}

export default Type_offer