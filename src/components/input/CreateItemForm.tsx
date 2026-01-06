import s from "../todolist/Todolist.module.scss";
import {Button} from "../button/Button.tsx";
import {useState} from "react";

type Props = {
    createItem: (title: string)=> void,
    placeholder: string
};
export const CreateItemForm = ({createItem,placeholder}: Props) => {
    const maxLength = 30;
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setValue(e.currentTarget.value);
    }
    const onAddTaskHandler = () => {
        if (value.trim() !== "") {
            createItem(value);
            setValue("");
        } else {
            setError("Поле не может быть пустым")
        }
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddTaskHandler()
        }
    }
    return (
        <div className={s.inputWrapper} data-length={`${value.length}/${maxLength}`}>
            <input
                maxLength={maxLength} className={s.inputAddTask} value={value}
                onKeyDown={onKeyDownHandler}
                onChange={onInputChange}
                type={"text"} placeholder={placeholder}/>
            <Button className={s.push} callback={onAddTaskHandler} title={"+"}/>
            {error && <div style={{color: "brown"}}>{error}</div>}
        </div>


)

};