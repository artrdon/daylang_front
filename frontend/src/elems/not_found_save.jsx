import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';

function NotFoundSave({ iwant }) {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lang = getCookie('lang');


    var arrLang = {
      'English': {
          'saved': "You don't have any saved suggestions yet",
          'no_offers': 'No results',
          'messages': "You don't have any chats yet",
      },
      'Русский': {
          'saved': 'У вас пока нет сохранённый предложений',
          'no_offers': 'Нет результатов',
          'messages': 'У вас пока нет чатов',
      },
      'Srpski': {
          'saved': 'Još uvek nemate sačuvane predloge',
          'no_offers': 'Nema rezultata',
          'messages': 'Još nemate nikakve razgovore',
      },
      'Српски': {
          'saved': 'Још увек немате сачуване предлоге',
          'no_offers': 'Нема резултата',
          'messages': 'Још немате никакве разговоре',
      },
      'Deutsch': {
          'saved': 'Sie haben noch keine gespeicherten Vorschläge',
          'no_offers': 'Keine Ergebnisse',
          'messages': 'Du hast noch keine Chats',
      },
      'Español': {
          'saved': 'Aún no tiene ninguna sugerencia guardada',
          'no_offers': 'No hay resultados',
          'messages': 'Aún no tienes chats',
      },
      'عربي': {
          'saved': 'ليس لديك أي اقتراحات محفوظة حتى الآن',
          'no_offers': 'لا توجد نتائج',
          'messages': 'ليس لديك أي محادثات حتى الآن',
      }

    }


    return (
            <>
            <div style={{width: "100%", height: 300, display: "flex", justifyContent: "center"}}>
                <h1 style={{marginTop: 50,}}>{arrLang[lang][iwant]}</h1>
            </div>
        </>
    )
}

export default NotFoundSave