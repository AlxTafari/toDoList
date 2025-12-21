import react from "@vitejs/plugin-react";

type Props = {
    title: string;
    callback: () => void;
    className: 
};
export const Button = ({title, callback}: Props) => {
    const onButtonHandler = () => callback()

    return (
        <button onClick={onButtonHandler}>{title}</button>
    );
};