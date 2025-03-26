import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';

function Type_offer({ lang }) {


    var arrLang = {
      'English': {
          'English': 'English',
          'Germany': 'Germany',
          'Russian': 'Russian',
          'Chinese': 'Chinese',
          'French':  'French',
          'Italian': 'Italian',
          'Spanish': 'Spanish',
          'Serbian': 'Serbian',
          'Other': 'Others',
      },
      'Русский': {
          'English': 'Английский',
          'Germany': 'Немецкий',
          'Russian': 'Русский',
          'Chinese': 'Китайский',
          'French':  'Французский',
          'Italian': 'Итальянский',
          'Spanish': 'Испанский',
          'Serbian': 'Сербский',
          'Other': 'Другие',
      },
      'Srpski': {
          'English': 'Engleski',
          'Germany': 'Nemačka',
          'Russian': 'Ruski',
          'Chinese': 'Kineski',
          'French':  'Francuski',
          'Italian': 'Italijanski',
          'Spanish': 'Španski',
          'Serbian': 'Srpski',
          'Other': 'Drugi',
      },
      'Српски': {
          'English': 'Енглески',
          'Germany': 'Немачка',
          'Russian': 'Руски',
          'Chinese': 'Кинески',
          'French':  'Француски',
          'Italian': 'Италијански',
          'Spanish': 'Шпански',
          'Serbian': 'Српски',
          'Other': 'Други',
      },
      'Deutsch': {
          'English': 'Englischsprachig',
          'Germany': 'Deutschland',
          'Russian': 'Russisch',
          'Chinese': 'Chinesisch',
          'French':  'Französisch',
          'Italian': 'Italienisch',
          'Spanish': 'Spanisch',
          'Serbian': 'Serbisch',
          'Other': 'Others',
      },
      'Español': {
          'English': 'Inglés',
          'Germany': 'Alemania',
          'Russian': 'Ruso',
          'Chinese': 'Chino',
          'French':  'Francés',
          'Italian': 'Italiano',
          'Spanish': 'Español',
          'Serbian': 'Serbio',
          'Other': 'Otros',
      },
      'عربي': {
          'English': 'الإنجليزية',
          'Germany': 'ألمانيا',
          'Russian': 'الروسية',
          'Chinese': 'الصينية',
          'French':  'الفرنسية',
          'Italian': 'الإيطالية',
          'Spanish': 'الإسبانية',
          'Serbian': 'الصربية',
          'Other': 'آخرون',
      }

    }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://api.daylang.ru/lol/');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




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


                <Link to={`/finded/${data.name_of_lang}/`} key={data.id}>
          <div className="div_of_service" >
            <img src={data.lang_flag} alt="" style={{height: 100,width: 160,position: "absolute", zIndex: 10, top: 50, left: 20 }}/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ position: "absolute", fontSize: 25, zIndex: 10, fontWeight: 600, top: 170, color: "white" }}>
                {arrLang[lang][`${data.name_of_lang}`]}
              </p>
            </div>
            <img src="/src/static/img/bluefon.png" alt="" className="service_img" />
            <div className="count_of_offers">{data.number_of_offers}</div>
          </div>
        </Link>

                ))}
        </>
    )
}

export default Type_offer