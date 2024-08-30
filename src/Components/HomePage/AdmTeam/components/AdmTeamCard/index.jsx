import React from "react";
import { useRef } from "react";
import CollapsibleButton from "../../../../CollapsibleButton"


const AdmTeamCard = (props) => {
    const { currentIndex, currentContentIndex, card, setCollapsibleText, activeStates, setActiveStates, setCollapsibleContentCard } = props;
    const cardRef = useRef(null);
    const currentButton = useRef(null);

    return (
        <div className="adm-card" ref={cardRef}>
            <div className="adm-image-container">
                <div className="adm-image">
                    <img style={card.imageStyles} src={card.image} alt={currentIndex} />
                </div>
            </div>
            <div className="adm-card-content">
                <h3>{card.headingText}</h3>
                <p>{card.text}</p>
            </div>
            <CollapsibleButton
                currentIndex={currentIndex}
                currentContentIndex={currentContentIndex}
                currentActiveState={activeStates[currentIndex].activeState}
                currentButton={currentButton}
                activeStates={activeStates}
                setActiveStates={setActiveStates}
                deepStatesArray={2}
                setCollapsibleText={setCollapsibleText}
                text={card.collapsibleText}
                card={cardRef.current}
                setCollapsibleContentCard={setCollapsibleContentCard}
                cardInfo={card}
                additionalClass={''}
            />
        </div>
    );
}

export default AdmTeamCard;