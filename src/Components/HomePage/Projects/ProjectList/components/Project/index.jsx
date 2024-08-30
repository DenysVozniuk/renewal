import React from "react";
import { instagramLink, viberLink, telegramLink } from "../../../../../../img/Projects";

const Project = (props) => {
    const { index, img, text, href, isButton = false, isSocialLinks = false, telegramHref = null, instagramHref = null, viberHref = null } = props;
    return (
        <div className="project-card">
            <div className="project-card-wrap">
                <div className="project-card-head">
                    <img src={img} alt={`project-${index}`} />
                    {
                        isSocialLinks && (
                            <div className="project-links">
                                <div className="project-link project-link-instagram"><a href={instagramHref}>{instagramLink}</a></div>
                                <div className="project-link project-link-viber"><a href={viberHref}>{viberLink}</a></div>
                                <div className="project-link project-link-telegram"><a href={telegramHref}>{telegramLink}</a></div>
                            </div>
                        )
                    }
                    {
                        isButton && <a target="_blank" rel='noreferrer' href={href}>Відкрити</a>
                    }
                    
                </div>
                <div className="project-card-body">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export default Project;