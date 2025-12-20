import s from "./Board.module.scss"
import {Todolist} from "../../../components/todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

type BoardType = {
    title: string,
};

export type FilterType = "All" | "Active" | "Completed"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const Board = ({title}: BoardType) => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "сделать базовую структуру", isDone: true},
        {id: v1(), title: "сделать логику", isDone: false},
        {id: v1(), title: "довести структуру до ума", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterType>("All");

    const currentTasks = filter === "All"
        ? tasks
        : filter === "Active"
            ? tasks.filter(task => !task.isDone)
            : tasks.filter(task => task.isDone)

    const onFilterChange = (val: FilterType) => {
        setFilter(val)
        console.log(title)
    }

    const onDeleteTask = (id: TaskType["id"]) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const onAddTask = (title: TaskType["title"]) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const onChangeTask = (id: TaskType["id"], isDone: TaskType["isDone"]) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id
                    ? {...t, isDone}
                    : t
            )
        )
    }

    return (
        <section className={s.main}>
            <h2>{title}</h2>

            <div className={s.mainWrapper}>
                <Todolist title={"Создаем клёвый тудулист"}
                          tasks={currentTasks}
                          onFilterChange={onFilterChange}
                          onDeleteTask={onDeleteTask}
                          onAddTask={onAddTask}
                          onChangeTask={onChangeTask}
                />
                <button>Добавить список задач</button>
            </div>
        </section>
    );
};