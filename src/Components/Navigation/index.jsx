import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../Context";

const Navigation = (props) => {
    const { navClassName, listClassName, itemClassName, linkClassName, isLastClassName = false } = props;
    const contextValue = useContext(Context);
    const location = useLocation();

    const handlerClickOrder = (currentLink) => {
        contextValue.setIsMobileMenuOpen(() => false);
        contextValue.setAnchorLink(() => currentLink);
    }

    const handlerClickHome = (e, id) => {
        e.preventDefault();
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
                    <Link to="/" className={linkClassName} onClick={!location.pathname.includes('order') ? (e) => handlerClickHome(e, contextValue.aboutUsSection.current) : () => handlerClickOrder("about-us")}>Про нас</Link>
                </li>
                <li className={itemClassName}>
                    <Link to="/" className={linkClassName} onClick={!location.pathname.includes('order') ? (e) => handlerClickHome(e, contextValue.booksSection.current) : () => handlerClickOrder("books")}>Книги</Link>
                </li>
                <li className={itemClassName}>
                    <Link to="/" className={linkClassName} onClick={!location.pathname.includes('order') ? (e) => handlerClickHome(e, contextValue.projectsSection.current) : () => handlerClickOrder("projects")}>Проєкти</Link>
                </li>
                <li className={itemClassName}>
                    <Link to="/" className={`${linkClassName}${isLastClassName ? " last" : ""}`} onClick={!location.pathname.includes('order') ? (e) => handlerClickHome(e, contextValue.contactsSection.current) : () => handlerClickOrder("contacts")}>Контакти</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;