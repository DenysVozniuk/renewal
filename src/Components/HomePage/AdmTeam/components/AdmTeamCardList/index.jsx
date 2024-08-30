import React, { useState, useRef, useEffect } from "react";
import AdmTeamCard from "../AdmTeamCard";
import AdmCollapsible from "../AdmCollapsible";

const AdmTeamCardList = (props) => {
    const { data, divideSize } = props;
    const [card, setCard] = useState(null);

    const AdmTeamRowList = [];
    for(let i = 0; i < data.length; i += divideSize){
        const row = [];
        for(let j = 0; j < divideSize && i + j < data.length; j++){
            row.push(data[i + j]);
        }
        AdmTeamRowList.push(row);
    }

    const [height, setHeight] = useState(AdmTeamRowList.map(() => 0));
    const [collapsibleText, setCollapsibleText] = useState(AdmTeamRowList.map(() => null));
    const collapsibleContentRefs = useRef(AdmTeamRowList.map(() => React.createRef()));

    let activeStatesInitialArray = [];
    AdmTeamRowList.forEach((value, index) => {
        value.forEach(() => {
            activeStatesInitialArray.push({activeState: false, contentPosition: index});
        })
    })

    activeStatesInitialArray = activeStatesInitialArray.map((v, i) => {
        return {
            ...v,
            cardPosition: i
        };
    });

    const [activeStates, setActiveStates] = useState(activeStatesInitialArray);
    useEffect(() => {
        setHeight(AdmTeamRowList.map(() => 0));
        setCollapsibleText(AdmTeamRowList.map(() => null));
        collapsibleContentRefs.current = AdmTeamRowList.map(() => React.createRef());
        setActiveStates(activeStatesInitialArray);
    }, [divideSize]);
    return (
        <>
            {
                AdmTeamRowList.map((value, index) => {
                    return (
                        <div key={index} className="adm-card-row">
                            <div className="adm-card-block">
                                {
                                    value.map((v, i) => {
                                        return (
                                            <AdmTeamCard 
                                                key={i}
                                                currentIndex={v.index}
                                                currentContentIndex={index}
                                                card={v.card}
                                                setCollapsibleText={setCollapsibleText}
                                                activeStates={activeStates}
                                                setActiveStates={setActiveStates}
                                                setCollapsibleContentCard={setCard}
                                            />
                                        );
                                    })
                                }
                            </div>
                            <AdmCollapsible 
                                index={index}
                                height={height[index]}
                                setHeight={setHeight}
                                collapsibleContent={collapsibleContentRefs.current[index]}
                                collapsibleContents={collapsibleContentRefs}
                                collapsibleText={collapsibleText[index]}
                                activeStates={activeStates}
                            />
                        </div>
                    );
                })                
            }
        </>
    );
}

export default AdmTeamCardList;