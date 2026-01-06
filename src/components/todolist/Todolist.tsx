import s from "./Todolist.module.scss";
import type {FilterType, TaskType} from "../../layout/sections/main/Board.tsx";
import {Button} from "../button/Button.tsx";
import {TitleEditor} from "../titleEditor/TitleEditor.tsx";
import {CreateItemForm} from "../input/CreateItemForm.tsx";

type Props = {
    title: string;
    tasks: TaskType[];
    tlistId: string;
    onFilterChange: (val: FilterType, todolistId: string) => void;
    onDeleteTask: (id: TaskType["id"], todolistId: string) => void;
    onAddTask: (title: TaskType["title"], todolistId: string) => void;
    onChangeTask: (id: TaskType["id"], isDone: TaskType["isDone"], todolistId: string) => void;
    onChangeTaskTitle: (id: TaskType["id"], title: string, todolistId: string ) => void;
    onChangeListTitle: (todolistId: string, title: string, ) => void;
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
                             onChangeTask,
                             onChangeTaskTitle,
                             onChangeListTitle,
                         }: Props) => {

    const buttonArr: FilterType[] = ["all", "active", "completed"];

    const onAddTaskHandler = (title:string) => {
        onAddTask(title, tlistId);
    };

    const onDeleteListHandler = () => {
        onDeleteList(tlistId)
    }

    const onChangeListTitleHandler = (title: string) => {
        onChangeListTitle(tlistId, title);
    }
    return (
        <div className={s.todolistWrapper}>
            <h3 className={s.listTitle}>
                <TitleEditor title={title} onChange={onChangeListTitleHandler} />
                <Button className={s.push} callback={onDeleteListHandler} title={"x"}/>
            </h3>
            <CreateItemForm createItem={onAddTaskHandler} placeholder={"не забыть.."} />
            <ul className={s.tasks}>
                {tasks.map((task: TaskType) => {
                    const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeTask(task.id, e.currentTarget.checked, tlistId);
                    }
                    const onChangeTaskTitleHandler = (newTitle: string) => {
                        onChangeTaskTitle(task.id, newTitle, tlistId );
                    }
                    return (
                            <li className={s.row}
                            key={task.id}>
                            <input type={"checkbox"}
                                   checked={task.isDone}
                                   onChange={onChangeTaskStatusHandler}/>
                            <span className={task.isDone ? s.taskIsDone : s.task}>
                               <TitleEditor title={task.title} onChange={onChangeTaskTitleHandler}/>
                            </span>

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