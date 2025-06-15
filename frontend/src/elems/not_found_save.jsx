import arrLangNotFound from '/languages/not_found_and_so.js';

function NotFoundSave({ iwant , lang}) {

    return (
            <>
            <div className='not_found_no_yet' style={{width: "100%", height: "100%"}}>
                <p className='not_found_no_yet_font'>{arrLangNotFound[lang][iwant]}</p>
            </div>
        </>
    )
}

export default NotFoundSave