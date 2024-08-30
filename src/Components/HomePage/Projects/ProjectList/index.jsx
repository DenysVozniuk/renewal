import React from "react";
import Project from "./components/Project";

const ProjectList = (props) => {
    const { projectList } = props;
    return (
        <div className="project-cards">
            {
                projectList.map((value, index) => {
                    return !value.isSocialLinks ? (
                        <Project
                            key={index}
                            index={index}
                            img={value.photo}
                            text={value.text}
                            href={value.href}
                            isButton={value.isButton}
                        />
                    ) : (
                        <Project
                            key={index}
                            index={index}
                            img={value.photo}
                            text={value.text}
                            href={value.href}
                            isSocialLinks={value.isSocialLinks}
                            telegramHref={value.telegramHref}
                            instagramHref={value.instagramHref}
                            viberHref={value.viberHref}
                        />
                    );
                })
            }
        </div>
    );
}

export default ProjectList;