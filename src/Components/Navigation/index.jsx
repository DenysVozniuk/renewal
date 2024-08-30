import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../Context";

const Navigation = (props) => {
    const { navClassName, listClassName, itemClassName, linkClassName, isLastClassName = false } = props;
    const contextValue = useContext(Context);
    const location = useLocation();

    const handlerClickNotHome = (currentLink) => {
        contextValue.setIsMobileMenuOpen(() => false);
        contextValue.setAnchorLink(() => currentLink);
    }

    const handlerClickHome = (e, id) => {
        contextValue.setIsMobileMenuOpen(() => false);
        document.querySelector('body').classList.contains('no-scroll') && (document.querySelector('body').classList.remove('no-scroll'));
        window.scroll({
            left: 0,
            top: id.offsetTop,
            behavior: 'smooth'
        });
    }

    return (
        <nav className={navClassName}>
            <ul className={listClassName}>
                <li className={itemClassName}>
                    <Link 
                        to="/"
                        className={linkClassName}
                        onClick={
                            (location.pathname.includes('order') || location.pathname.includes('agreement'))
                            ? 
                            () => handlerClickNotHome("about-us")
                            : 
                            (e) => handlerClickHome(e, contextValue.aboutUsSection.current)
                        }
                    >
                        Про нас
                    </Link>
                </li>
                <li className={itemClassName}>
                    <Link 
                        to="/"
                        className={linkClassName}
                        onClick={
                            (location.pathname.includes('order') || location.pathname.includes('agreement'))
                            ? 
                            () => handlerClickNotHome("books")
                            : 
                            (e) => handlerClickHome(e, contextValue.booksSection.current)
                        }
                    >
                        Книги
                    </Link>
                </li>
                <li className={itemClassName}>
                    <Link 
                        to="/"
                        className={linkClassName}
                        onClick={
                            (location.pathname.includes('order') || location.pathname.includes('agreement'))
                            ? 
                            () => handlerClickNotHome("projects")
                            : 
                            (e) => handlerClickHome(e, contextValue.projectsSection.current)
                        }
                    >
                        Проєкти
                    </Link>
                </li>
                <li className={itemClassName}>
                    <Link 
                        to="/"
                        className={`${linkClassName}${isLastClassName ? " last" : ""}`}
                        onClick={
                            (location.pathname.includes('order') || location.pathname.includes('agreement'))
                            ? 
                            () => handlerClickNotHome("contacts")
                            : 
                            (e) => handlerClickHome(e, contextValue.contactsSection.current)
                        }
                    >
                        Контакти
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;