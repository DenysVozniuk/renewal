import React, {useContext} from "react";
import Context from "../../../Context";
import ProjectList from "./ProjectList";
import { projectPhoto1, projectPhoto2, projectPhoto3, projectPhoto4, projectPhoto5, projectPhoto6, projectPhoto7, projectPhoto8 } from "../../../img/Projects";


const Projects = () => {
    const contextValue = useContext(Context);
    const projectList = [
        {
            photo: projectPhoto1,
            text: 'Навчальна платформа, де розміщуються відеокурси на різні теми разом з додатковими матеріалами, які стануть у нагоді для якісного християнського навчання. Це чудова нагода розвиватися, незалежно від свого місцезнаходження.',
            href: 'https://onovlennia.com.ua/',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto2,
            text: 'Модульне навчання для душеопікунів-консультантів. Знаходиться у стані розробки. Призначене для молоді та членів церков, які хочуть навчитися надавати першу психологічну допомогу собі та ближнім у кризових ситуаціях.',
            href: 'https://onovlennia.com.ua/',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto3,
            text: 'Започаткований 24 лютого 2022-ого року. Про те, що болить, і про Того, хто допомагає проходити цей біль. Кожен новий випуск – раз на два тижні.',
            href: 'https://www.youtube.com/watch?v=9rnsRjDf2-g&list=PLbikoj5UiVGMlPQ5u8PWpwb3PVISK-fZV',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto4,
            text: 'Підбірка розмов з цікавими людьми на важливі теми, про які не завжди говорять за кафедрою. Кожен новий випуск – щомісяця.',
            href: 'https://www.youtube.com/watch?v=aPjsghx90gM&list=PLbikoj5UiVGPefoHGFvRAXUpX-9lG6y2s',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto5,
            text: 'Щодня у Telegram, Viber або Instagram учасникам проєкту (їх понад 7 тис.) приходить нагадування про читання Біблії разом із аудіозаписами певних розділів.',
            href: '#',
            isButton: false,
            isSocialLinks: true,
            telegramHref: 'https://t.me/bibleforyear',
            instagramHref: 'https://www.instagram.com/project.sola.scriptura?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            viberHref: 'https://invite.viber.com/?g2=AQAkjN35kWtVokyyXMKLsjZlA9QDXKRn7XjWPyO%2B6fhLPWco688XUgK8x%2FjMelez'
        },
        {
            photo: projectPhoto6,
            text: 'Навчальний відеокурс на основі книги для кожного, хто готує та готується до водного хрещення.',
            href: 'https://onovlennia.com.ua/courses/viruyu-obitsyayu/',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto7,
            text: 'Створено для збереження інформації та висвітлення діяльності місцевих церков, особливо в час війни. Наразі діяльність проєкту призупинена.',
            href: 'https://www.youtube.com/watch?v=0xMDHf8J9t8&t=3s',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        },
        {
            photo: projectPhoto8,
            text: 'Серія прямих ефірів на дискусійні теми у християнському контексті, завдання яких - спонукати глядача до роздумів та дослідження Слова Божого.',
            href: 'https://www.youtube.com/watch?v=J1wgor6njts&list=PLbikoj5UiVGPZVjC7x2zEri1kOC7hgdZE',
            isButton: true,
            isSocialLinks: false,
            telegramHref: null,
            instagramHref: null,
            viberHref: null
        }
    ];
    return (
        <div ref={contextValue.projectsSection} id="projects" className="projects-section">
            <div className="container projects-container">
                <h2>Наші проєкти</h2>
                <div className="projects-cards-container">
                    <ProjectList 
                        projectList={projectList}
                    />
                </div>
                {/* <div className="support-button"><a href="#" >Підтримати</a></div> */}
            </div>
        </div>
    );
}

export default Projects;