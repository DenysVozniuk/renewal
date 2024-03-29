const useCollapsibleButtons = (activeStates, setActiveStates, setCollapsibleText, setCollapsibleContentCard) => {
    const closeCollapsibleButtons = (setState, deepStatesArray) => {
        if(deepStatesArray === 1){
            setState((prevState) => {
                return prevState.map((v, i) => {
                    return false;
                });
            });
        }
        else if (deepStatesArray === 2){
            setState((prevState) => {
                return prevState.map((val) => {
                    return {
                        ...val,
                        activeState: false
                    };
                });
            });

        }
    };

    const setCollapsibleContent = (deepStatesArray, setText, text, setCard, card, currentContentIndex = 0) => {
        if(deepStatesArray === 1){
            setText(() => text);
        }
        else if (deepStatesArray === 2){
            setText((prevState) => {
                return prevState.map((v, i) => {
                    if(i === currentContentIndex){
                        return text;
                    }
                    return v;
                });
            });
            if(card && setCard !== null){
                setCard(() => card);
            }    
        }
    };

    const toggleCollapsibleButton = (value, textValue, currentIndex, deepStatesArray, currentContentIndex, currentCardInfo) => {
        if(deepStatesArray === 1){
            let pushTimeout = false;
            activeStates.forEach((v, i) => {
                if(i !== currentIndex && v){
                    closeCollapsibleButtons(setActiveStates, deepStatesArray);
                    pushTimeout = true;
                }
            });
            if(pushTimeout){
                setTimeout(() => {
                    setCollapsibleContent(deepStatesArray, setCollapsibleText, textValue, setCollapsibleContentCard, currentCardInfo);
                    setActiveStates((prevState) => {
                        return prevState.map((v, i) => {
                            if(i === currentIndex){
                                return value;
                            }
                            return v;
                        });
                    });
                }, 250);
            }
            else{
                setCollapsibleContent(deepStatesArray, setCollapsibleText, textValue, setCollapsibleContentCard, currentCardInfo);
                setActiveStates((prevState) => {
                    return prevState.map((v, i) => {
                        if(i === currentIndex){
                            return value;
                        }
                        return v;
                    });
                });
            }
        }
        else if(deepStatesArray === 2){
            let pushTimeout = false;
            activeStates.forEach((val, index) => {
                if(index !== currentIndex && val.activeState){
                    closeCollapsibleButtons(setActiveStates, deepStatesArray);
                    pushTimeout = true;
                }
            });
            if(pushTimeout){
                setTimeout(() => {
                    setCollapsibleContent(deepStatesArray, setCollapsibleText, textValue, setCollapsibleContentCard, currentCardInfo, currentContentIndex);
                    setActiveStates((prevState) => {
                        return prevState.map((val, ind) => {
                            if(ind === currentIndex){
                                return {
                                    ...val,
                                    activeState: value
                                };
                            }
                            return val;
                        });
                    });
                }, 250);
            }
            else{
                setCollapsibleContent(deepStatesArray, setCollapsibleText, textValue, setCollapsibleContentCard, currentCardInfo, currentContentIndex);
                setActiveStates((prevState) => {
                    return prevState.map((val, ind) => {
                        if(ind === currentIndex){
                            return {
                                ...val,
                                activeState: value
                            };
                        }
                        return val;
                    });
                });
            }
        }
    };

    return { closeCollapsibleButtons, toggleCollapsibleButton };
}

export default useCollapsibleButtons;