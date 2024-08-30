import React, {useState, useEffect} from "react";
import useCollapsibleButtons from "../../Hooks/useCollapsibleButtons";
import useCollapseButtonClick from "../../Hooks/useCollapseButtonClick";

function CollapsibleButton(props) {
    const { currentIndex, currentContentIndex, currentActiveState, currentButton, activeStates, setActiveStates,
         deepStatesArray, setCollapsibleText, text, card, setCollapsibleContentCard, cardInfo,
         additionalClass, distanceFromAbove = null, setDistanceFromAbove = null } = props;
    const { toggleCollapsibleButton } = useCollapsibleButtons(activeStates, setActiveStates, setCollapsibleText, setCollapsibleContentCard);
    const [distance, setDistance] = useState(0);
    const [distanceTranslateY, setDistanceTranslateY] = useState(0);
    // const currentButton = useRef(null);
    const { handlerCollapseButtonClick } = useCollapseButtonClick(currentButton.current, card, setDistanceFromAbove !==null ? setDistanceFromAbove : setDistance);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 744) {
                setDistanceTranslateY(62);
            }
            else {
                setDistanceTranslateY(42);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <button
            index={currentIndex}
            className={`collapsible-btn${currentActiveState ? ' active' : ''} ${additionalClass}`}
            onClick={() => handlerCollapseButtonClick(toggleCollapsibleButton, currentActiveState, text, currentIndex, deepStatesArray, currentContentIndex, cardInfo)}
            style={{transform: currentActiveState ? (`translateY(${distanceFromAbove !== null ? (distanceFromAbove + distanceTranslateY) : (distance + distanceTranslateY)}px)`) : null}}
            ref={currentButton}
        >
            <span></span>
        </button>
    );
}

export default CollapsibleButton;