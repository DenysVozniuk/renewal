import React, { useState, useEffect } from "react";
import AdmTeamCardList from "./components/AdmTeamCardList";
import { admPhoto1, admPhoto2, admPhoto3 } from "../../../img/Adm-team";

function AdmTeam() {
    const [divideSize, setDivideSize] = useState(3);
    const [admCard1WidthAndHeight, setAdmCard1WidthAndHeight] = useState(0);
    const [admCard1Transform, setAdmCard1Transform] = useState('');
    const [admCard2WidthAndHeight, setAdmCard2WidthAndHeight] = useState(0);
    const [admCard2Transform, setAdmCard2Transform] = useState('');
    const [admCard3WidthAndHeight, setAdmCard3WidthAndHeight] = useState(0);
    const [admCard3Transform, setAdmCard3Transform] = useState('');


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setDivideSize(3);
                setAdmCard1WidthAndHeight(488);
                setAdmCard1Transform('translateX(-134px) translateY(-88px)');
                setAdmCard2WidthAndHeight(330);
                setAdmCard2Transform('translateX(-51px) translateY(-43px)');
                setAdmCard3WidthAndHeight(470);
                setAdmCard3Transform('translateX(-129px) translateY(-78px)');

            } else if (width >= 321) {
                setDivideSize(1);
                setAdmCard1WidthAndHeight(488);
                setAdmCard1Transform('translateX(-134px) translateY(-88px)');
                setAdmCard2WidthAndHeight(330);
                setAdmCard2Transform('translateX(-51px) translateY(-43px)');
                setAdmCard3WidthAndHeight(470);
                setAdmCard3Transform('translateX(-129px) translateY(-78px)');
            }
            else {
                setDivideSize(1);
                setAdmCard1WidthAndHeight(265);
                setAdmCard1Transform('translateX(-74px) translateY(-44px)');
                setAdmCard2WidthAndHeight(173);
                setAdmCard2Transform('translateX(-27px) translateY(-24px)');
                setAdmCard3WidthAndHeight(255);
                setAdmCard3Transform('translateX(-71px) translateY(-42px)');
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const textList = [
        {
            image: admPhoto2,
            imageStyles: {
                width: `${admCard2WidthAndHeight}px`,
                height: `${admCard2WidthAndHeight}px`,
                transform: admCard2Transform
            },
            headingText: "Віктор Вознюк",
            text: "директор Департаменту освіти УЦХВЄ",
            collapsibleText: (<p>Народився 4 липня 1970 року в місті Острог Рівненської області у християнській родині. Батько, Вознюк Володимир Іванович був пресвітером місцевої церкви.  Після служби в армії у 1991 році Віктор прийняв водне хрещення по вірі та став членом церкви християн віри євангельської в м. Острог. Того ж року він розпочав служити в напрямку євангелізації, а з 1994 року це служіння стало ще активнішим разом із музичним гуртом “Вефіль”.<br /><br />2002 по 2010 рік Віктор служив пастором у с. Кунів Ізяславського району Хмельницької області, а з 2001 р. по  2010 р. – адміністратором відділу євангелізації союзу ХВЄ України. Навчався у Національному університеті “Острозька академія”, міжнародному університеті “Vision” та Київському Біблійному інституті, де отримав ступінь магістра теології. У Чернівецькій біблійній семінарії отримав диплом доктора богословʼя, а у 2024 році цей диплом було визнано на державному рівні.<br /><br /> 21 травня 2010 на Всеукраїнському з’їзді братерства Віктор Володимирович Вознюк був призначений директором Департаменту освіти Церкви ХВЄ України.<br /><br />Разом з дружиною Аллою народили та виховали трьох синів, один з яких одружений.</p>)
        },
        {
            image: admPhoto1,
            imageStyles: {
                width: `${admCard1WidthAndHeight}px`,
                height: `${admCard1WidthAndHeight}px`,
                transform: admCard1Transform
            },
            headingText: "Богдан Галюк",
            text: "заступник директора Департаменту освіти УЦХВЄ",
            collapsibleText: (<p>Народився 29 травня 1984 року в Івано-Франківську. У 2001 році закінчив Українську гімназію №1. У Київському біблійному інституті здобув ступінь бакалавра пасторського служіння, у Львівській богословській семінарії – магістра богослов'я, у Чернівецькій біблійній семінарії – доктора богослов'я. У Прикарпатському національному університеті ім. В. Стефаника – магістра мистецтва.<br /><br />З 2004 року по 2012 р. працював головним редактором християнської молодіжної газети "Рибка". З 2008 р. по 2009 р. – редактором відділу новин Всеукраїнської громадсько-політичної газети "Експрес". З 2011 р. по 2019 р. – секретарем, а з 2019 р. і до сьогодні – заступником керівника Департаменту освіти Української Церкви Християн Віри Євангельської.<br /><br />Є автором та співавтором художніх та теологічних книг («Вірність», «Скарб», «Незручне запитання», «Він завжди тебе чекатиме!», «Бог щоночі запалював світильник»), викладачем теологічних дисциплін в духовних навчальних закладах України, Європи та США, дияконом Української церкви ХВЄ м. Івано-Франківська.<br /><br />З дружиною Марічкою виховують трьох дітей – доньок Євангеліну і Соломію та сина Богдара.</p>)
        },
        {
            image: admPhoto3,
            imageStyles: {
                width: `${admCard3WidthAndHeight}px`,
                height: `${admCard3WidthAndHeight}px`,
                transform: admCard3Transform
            },
            headingText: "Василь Попудник",
            text: "заступник директора Департаменту освіти УЦХВЄ",
            collapsibleText: (<p>Народився 10 березня 1978 року в селі Волосянці Велико-Березнянського району Закарпатської області. Навчався у Виноградівському політехнічному технікумі. Отримав диплом молодшого спеціаліста за спеціальністю «Будівництво, монтаж і експлуатація ліній електропередач».<br /><br />Водночас (із 1993 р. по 1996 р.) навчався у Львівському заочному біблійному інституті (пастирське відділення). Декілька років був керівником молоді та вів активну проповідницьку й музичну діяльність у своїй місцевості на Закарпатті.<br /><br />Із 2000 р. по 2003 р. навчався у Львівській богословській семінарії, отримав ступінь бакалавра богослов’я. З 2005 року розпочав викладацьку діяльність. Із 2007 р. по 2010 рік навчався у Львівській богословській семінарії, отримав ступінь магістра богословʼя.<br /><br />Станом на сьогодні, починаючи із 2010 року є заступником директора Департаменту освіти УЦХВЄ.<br /><br />У 2014-2018 рр. навчався у Чернівецькому національному університеті. Став бакалавром правознавства. В цей же час навчався у Львівській богословській семінарії у співпраці зі Слов’янським університетом штату Вашингтон, отримав ступінь доктора богословʼя.<br /><br />Проживає на Прикарпатті – у місті Івано-Франківську. Разом з дружиною Галиною виховали двох дітей: дочку Юлію та сина Юрія.</p>)
        }
    ];
    
    const data = [];
    for (let i = 0; i < textList.length; i++){
        data.push({card: textList[i], index: i});
    }

    return (
        <>
            <div className="adm-section">
                <div className="container adm-container">
                    <h2 className="adm-heading">Адміністрація</h2>
                    <div className="adm-div">
                        <div className="adm-cards">
                            <AdmTeamCardList 
                                data={data}
                                divideSize={divideSize}
                                setDivideSize={setDivideSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdmTeam;