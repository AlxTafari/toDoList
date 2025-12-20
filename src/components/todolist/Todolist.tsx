import s from "./Todolist.module.scss";
import type {FilterType, TaskType} from "../../layout/sections/main/Board.tsx";
import {useState} from "react";

type Props = {
    title: string;
    tasks: TaskType[];
    onFilterChange: (val: FilterType) => void;
    onDeleteTask: (id: TaskType["id"]) => void;
    onAddTask: (title: TaskType["title"]) => void;
    onChangeTask: (id: TaskType["id"], isDone: TaskType["isDone"]) => void;
};

export const Todolist = ({title, tasks, onFilterChange, onDeleteTask, onAddTask, onChangeTask}: Props) => {
    const buttonArr: FilterType[] = ["All", "Active", "Completed"];

    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setValue(e.currentTarget.value);
    }

    const onAddTaskHandler = () => {
        if (value.trim() !== "") {
            onAddTask(value);
            setValue("");
        } else {
            setError("Поле не может быть пустым")
        }};

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddTaskHandler()
        }
    }

    return (
        <div className={s.todolistWrapper}>
            <h3> {title} </h3>
            <input value={value}
                   onKeyDown={onKeyDownHandler}
                   onChange={onInputChange}
                   type={"text"} placeholder={"не забыть..."}/>
            <button onClick={onAddTaskHandler}> +
            </button>
            {error && <div style={{color: "brown"}} >{error}</div>}
            <ul>
                {tasks.map((task: TaskType) => {
                    const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeTask(task.id, e.currentTarget.checked)
                    }
                    return (<li key={task.id}>
                        <input type={"checkbox"}
                               checked={task.isDone}
                               onChange={onChangeTaskStatusHandler}/>

                        {task.title}
                        <button onClick={() => {
                            onDeleteTask(task.id)
                        }}>x
                        </button>
                    </li>
                )})}

            </ul>

            {buttonArr.map(b => {
                const onClickButtonHandler = () => onFilterChange(b);

                return (<button
                        className={s.buttonFilter}
                        onClick={onClickButtonHandler}>
                        {b}
                    </button>
                )
            })}
        </div>
    )

};