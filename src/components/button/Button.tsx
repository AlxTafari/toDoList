import s from "./Button.module.scss"
import clsx from "clsx";

type Props = {
    title: string;
    callback: () => void;
    className?: string;
};
export const Button = ({title, callback, className}: Props) => {
    const onButtonHandler = () => callback()

    return (
        <button  className={clsx(s.button, className)} onClick={onButtonHandler}>{title}</button>
    );
};