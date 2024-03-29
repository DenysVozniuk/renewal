const useChangeLanguage = (value) => {
    const handlerClick = (e) => {
        e.stopPropagation()
        value.handlerShowLanguageButton();
    }

    const handlerClickChangeLanguage = (e) => {
        e.stopPropagation();
        value.handlerShowLanguageButton();
    }

    return {
        handlerClick,
        handlerClickChangeLanguage
    };
}

export default useChangeLanguage;