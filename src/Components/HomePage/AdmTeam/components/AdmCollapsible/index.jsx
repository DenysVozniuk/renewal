import React, {useEffect} from "react";

const AdmCollapsible = (props) => {
    const { index, height, setHeight, collapsibleContent, collapsibleContents, collapsibleText, activeStates } = props;

    useEffect(() => {
        for(let i = 0; i < activeStates.length; i++){
            if(activeStates[i].activeState){
                if(collapsibleContent){
                    if(collapsibleContent.current === collapsibleContents.current[activeStates[i].contentPosition].current){
                        setHeight((val) => { 
                            return val.map((v, i) => {
                                if(i === index){
                                    return collapsibleContent.current.scrollHeight;
                                } 
                                return v;    
                            })
                        });
                        return;
                    }
                }
            }
            else {
                setHeight((val) => { 
                    return val.map((v, i) => {
                        if(i === index){
                            return 0;
                        } 
                        return v;    
                    })
                })
            }
        }
    }, [activeStates])
    return (
        <div
            className="collapsible-content"
            index={index}
            style={{ maxHeight: height }}
            ref={collapsibleContent}
        >
            <div className="adm-content">
                {collapsibleText}
            </div>
        </div>
    );
}

export default AdmCollapsible;