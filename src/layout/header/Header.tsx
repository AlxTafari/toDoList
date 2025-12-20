import s from "./Header.module.scss"
import {Icon} from "../../components/Logo.tsx";

export const Header = () => {
    return (
        <header className={s.header}>
            <a href={"#"}>
                <Icon iconId={"code"} fill={"#555"}/>
            </a>

            <h2 className={s.siteTitle}> ALEXELLO </h2>
        </header>
    );
};