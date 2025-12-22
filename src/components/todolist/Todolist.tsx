import s from "./Todolist.module.scss";
import type {FilterType, TaskType} from "../../layout/sections/main/Board.tsx";
import {useState} from "react";
import {Button} from "../button/Button.tsx";

type Props = {
    title: string;
    tasks: TaskType[];
    tlistId: string;
    onFilterChange: (val: FilterType, todolistId: string) => void;
    onDeleteTask: (id: TaskType["id"], todolistId: string) => void;
    onAddTask: (title: TaskType["title"], todolistId: string) => void;
    onChangeTask: (id: TaskType["id"], isDone: TaskType["isDone"], todolistId: string) => void;
    onDeleteList: (todolistId: string) => void;
};

export const Todolist = ({
                             title,
                             tasks,
                             onFilterChange,
                             onDeleteTask,
                             onAddTask,
                             tlistId,
                             onDeleteList,
                             onChangeTask
                         }: Props) => {
    const buttonArr: FilterType[] = ["all", "active", "completed"];

    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setValue(e.currentTarget.value);
    }

    const onAddTaskHandler = () => {
        if (value.trim() !== "") {
            onAddTask(value, tlistId);
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
    const onDeleteListHandler = () => {
        onDeleteList(tlistId)
    }
    return (
        <div className={s.todolistWrapper}>
            <h3 className={s.listTitle}>
                {title}
                <Button className={s.push} callback={onDeleteListHandler} title={"x"}/>
            </h3>
            <div className={s.inputWrapper}>
                <input className={s.inputAddTask} value={value}
                       onKeyDown={onKeyDownHandler}
                       onChange={onInputChange}
                       type={"text"} placeholder={"не забыть..."}/>
                <Button className={s.push} callback={onAddTaskHandler} title={"+"}/>
            </div>

            {error && <div style={{color: "brown"}}>{error}</div>}
            <ul className={s.tasks}>
                {tasks.map((task: TaskType) => {
                    const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeTask(task.id, e.currentTarget.checked, tlistId);
                    }
                    return (<li className={s.row}
                            key={task.id}>
                            <input type={"checkbox"}
                                   checked={task.isDone}
                                   onChange={onChangeTaskStatusHandler}/>

                            {task.title}
                            <Button className={s.push} title={"x"} callback={() => {
                                onDeleteTask(task.id, tlistId)
                            }}/>
                        </li>
                    )
                })}

            </ul>
            <div className={s.buttonWrapper}>
            {buttonArr.map((b: FilterType) => {
                const onClickButtonHandler = () => onFilterChange(b, tlistId);

                return (<Button
                        title={b}
                        // className={s.buttonFilter}
                        callback={onClickButtonHandler}/>
                )
            })}
            </div>
        </div>
    )

};