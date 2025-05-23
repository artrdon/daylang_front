import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import arrLangOfferType from '/languages/offer_type.js'
import axios from 'axios';
import APIURL from '/api.js'
import WSAPIURL from '/wsapi.js';

function Type_offer({ lang }) {

  const { data: data, isLoading: loading, isError: error, error: errorDetails } = useQuery({
    queryKey: ['lol'], // Уникальный ключ запроса
    queryFn: async () => {
      const response = await axios.get(`${APIURL}/lol/`);
      return response.data; // Возвращаем только данные
    },
  });

 // console.log(data);

  if (loading) return (<>
      <div className="div_of_service">
            <img  alt="" style={{height: 100,width: 160,position: "absolute", zIndex: 10, top: 50, left: 20 }}/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ position: "absolute", fontSize: 25, zIndex: 10, fontWeight: 600, top: 170, color: "white" }}>

              </p>
            </div>
            <img src="/src/static/img/bluefon.png" alt="fon" className="service_img" />
            <div className="count_of_offers"></div>
          </div>

      </>);
  if (error) return <p>Error: {error}</p>;

  
    return (
            <>
            {data.map((data) => (


        <Link to={`/finded/${data.type}/`} key={data.id}>
          <div className="div_of_service" >
            <img src={data.lang_flag} alt={arrLangOfferType[lang][`${data.name_of_lang}`]} className='offer_type_flag_img'/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className='offer_type_name_of_lang'>
                {arrLangOfferType[lang][`${data.name_of_lang}`]}
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