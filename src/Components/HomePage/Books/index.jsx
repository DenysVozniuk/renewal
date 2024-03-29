import React, { useState, useEffect, useContext } from "react";
import Context from "../../../Context";
import { bookPhoto1, bookPhoto2, bookPhoto3, bookPhoto4, bookPhoto5, bookPhoto6, bookPhoto7, bookPhoto8, bookPhoto9,
     bookPhoto10, bookPhoto11, bookPhoto12, bookPhoto13, bookPhoto14, bookPhoto15, bookPhoto16 } from "../../../img/Books";
import BookList from "./BookList";

const Books = () => {
    const [divideSize, setDivideSize] = useState(3);
    const contextValue = useContext(Context);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setDivideSize(3);
            } else if (width >= 744){
                setDivideSize(2);
            } else {
                setDivideSize(1);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    let cardList = [
        {
            image: bookPhoto1,
            title: 'Засади віровчення УЦХВЄ',
            bookPrice: 250,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 218 сторінок ',
                collapsibleInfoText2: 'У наявності укр. мовою',
                //collapsibleInfoText3: 'Аудіокнига - 9 годин',
                collapsibleText: 'Книга, в якій описані основні біблійні істини, на яких грунтується вчення церкви. Може слугувати, як посібник для проведення навчання у місцевих церковних громадах.'
            }
            //audioPrice: 300,
        },
        {
            image: bookPhoto2,
            title: 'Духовні дари',
            bookPrice: 280,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 320 сторінок',
                collapsibleInfoText2: 'У наявності укр. та рос. мовами',
                //collapsibleInfoText3: 'Аудіокнига - 11 годин',
                collapsibleText: 'У книзі автор дає характеристику дарів і плодів Святого Духа, показує різницю між ними, визнаючи домінуючий вплив плодів Духа. Для всіх, хто цікавиться Святим Духом та духовними дарами.'
            }
            //audioPrice: 300,
        },
        {
            image: bookPhoto14,
            title: 'Вірую, обіцяю',
            bookPrice: 200,
            copybookPrice: 50,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, посібник — 168 ст. / зошит — 40 ст.',
                collapsibleInfoText2: 'У наявності укр. мовою',
                //collapsibleInfoText3: 'Аудіокнига - 9 годин',
                collapsibleText: 'Призначений в першу чергу для тих, хто готує та готується до водного хрещення, а також для широкого кола віруючих - християн віри євангельської, які хочуть розширити або структурувати свої знання про основи Христового вчення.'
            }
            //audioPrice: 300,
        },
        {
            image: bookPhoto3,
            title: 'Богослужбова практика УЦХВЄ',
            bookPrice: 250,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 217 сторінок',
                collapsibleInfoText2: 'У наявності укр. та рос. мовами',
                //collapsibleInfoText3: 'Аудіокнига - 9 годин',
                collapsibleText: 'У посібнику подані корисні поради для служителів місцевих громад Церкви Християн Віри Євангельської щодо звершення різноманітних богослужінь: водного хрещення, Вечері Господньої, благословення дітей, шлюбу, похорону, посвячення дому молитви, дитячого, молодіжного, жіночого, євангелізаційного і музичного служінь, святкових зібрань, а також організації соціального служіння — як на основі Священного Писання, так і з досвіду, практики і розуміння нашого братства.'
            }
            //audioPrice: 300,
        },
        {
            image: bookPhoto4,
            title: 'Юність в об’єктиві',
            bookPrice: 120,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 124 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Книга для підлітків та молоді, у якій розглядаються 22 найважливіші теми  молодіжного життя через призму християнських принципів.'
            }
        },
        {
            image: bookPhoto5,
            title: 'У домі мого Батька',
            bookPrice: 300,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 220 сторінок',
                collapsibleInfoText2: 'У наявності укр. та рос. мовами',
                collapsibleInfoText3: 'Аудіокнига - 5 годин',
                collapsibleText: 'Книга про те, як бути батьком, який приносить благословення у свій дім. Написана на основі досвіду батька двох синів та однієї доньки. Дуже легка для читання, цікава та актуальна для кожного батька.'
            },
            audioPrice: 300,
        },
        {
            image: bookPhoto6,
            title: 'Основи християнської доктрини',
            bookPrice: 330,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 678 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'У книзі детально викладені доктрини про Бога, Писання, Христа, людину, гріх, демонологію, вічний стан тощо. Порушені також питання про людську і божественну природу Христа, призначення і передбачення людини.'
            }
        },
        {
            image: bookPhoto7,
            title: 'Що треба знати до шлюбу',
            bookPrice: 140,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 136 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Книга, що точно допоможе вам зробити правильні кроки на шляху до створення  сім’ї та зрозуміти Божий задум про сім’ю.'
            }
        },
        {
            image: bookPhoto15,
            title: 'Подорож довжиною в життя',
            bookPrice: 150,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 88 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Книга, яка може допомогти сімейним парам зробити правильні кроки у процесі побудови і розвитку сімʼї.'
            }
        },
        {
            image: bookPhoto9,
            title: 'Новий світанок',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 160 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Ця збірка є результатом літературного конкурсу ім. Джона Буньяна у 2020-ому році. Кожен із творів – шедевр, а в центрі кожного – любов до Господа.'
            }
        },
        {
            image: bookPhoto10,
            title: 'Гіркі сливи',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 72 сторінки',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Ця збірка є результатом літературного конкурсу ім. Джона Буньяна у 2017-ому році. Кожна історія у цій збірці торкається серця та відкриває новий погляд на відомі біблійні істини.'
            }
        },
        {
            image: bookPhoto11,
            title: 'Крізь сумніви',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 88 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Ця збірка є результатом літературного конкурсу ім. Джона Буньяна у 2019-ому році. Твори, що актуальні в будь-який час.'
            }
        },
        {
            image: bookPhoto12,
            title: 'Тонка грань',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 64 сторінки',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Ця збірка є результатом літературного конкурсу ім. Джона Буньяна у 2018-ому році. Правдиві та вигадані оповідання розчулюють та спонукають до роздумів про важливе.'
            }
        },
        {
            image: bookPhoto8,
            title: 'Я і депресія',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 72 сторінки',
                collapsibleInfoText2: 'У наявності укр. і рос. мовами',
                collapsibleText: 'У книзі пастор описує власну історію перемоги над відчаєм і душевними тривогами та дає практичні поради про те, як боротися з депресією та мінімізувати можливість її виникнення.'
            }
        },
        {
            image: bookPhoto13,
            title: 'Перемога над Голіафом',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 120 сторінок',
                collapsibleInfoText2: 'У наявності укр. і рос. мовами',
                collapsibleText: 'У новій книзі пастора Віктора Гайдучика описана його особиста історія — злети, падіння та перемога над депресією, дарована Богом через багатьох людей: друзів, християнських консультантів та християнських лікарів.'
            }
        },
        {
            image: bookPhoto16,
            title: 'Безпечне місце',
            bookPrice: 100,
            collapsibleContent: {
                collapsibleInfoText1: 'Друкована версія, 120 сторінок',
                collapsibleInfoText2: 'У наявності укр. мовою',
                collapsibleText: 'Ця збірка є результатом літературного конкурсу ім. Джона Буньяна 2021 - 2023 років. У ній – історії з життя під час війни і не тільки.'
            }
        },
    ];

    cardList = cardList.map((value, index) => {
        return {
            ...value,
            id: (index + 1)
        }
    })

    const list = [];
    for (let i = 0; i < cardList.length; i++){
        list.push({card: cardList[i], index: i});
    }

    return (
        <div ref={contextValue.booksSection} id="books" className="books-section">
            <div className="container books-container">
                <h2>Книги</h2>
                <div className="books-cards-container">
                    <BookList 
                        divideSize={divideSize}
                        cardList={list}
                    />
                </div>
            </div>
        </div>
    );
}

export default Books;