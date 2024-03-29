const useCollapseButtonClick = (button, card, setDistance) => {
    const handlerCollapseButtonClick = (toggleCollapsibleButton, value, textValue, currentIndex, deepStatesArray, currentContentIndex, currentCardInfo) => {
        getDistance(button);
        toggleCollapsibleButton(!value, textValue, currentIndex, deepStatesArray, currentContentIndex, currentCardInfo);
    };

    const getDistance = (button) => {
        setDistance(() => card.offsetHeight - (button.offsetTop + button.offsetHeight));
    };
    return {
        handlerCollapseButtonClick
    };
}

export default useCollapseButtonClick;