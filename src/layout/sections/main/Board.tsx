import s from "./Board.module.scss"
import {Todolist} from "../../../components/todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {GridWrapper} from "../../../components/gridWrapper/GridWrapper.tsx";
import {Button} from "../../../components/button/Button.tsx";

type BoardType = {
    title: string,
};

export type FilterType = "all" | "active" | "completed"

type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const Board = ({title}: BoardType) => {

    const onFilterChange = (val: FilterType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = val;
            setTodolists([...todolists])
        }
        console.log(todolist);
    }

    const onDeleteTask = (id: TaskType["id"], todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const filtredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filtredTasks
        setTasksObj({...tasksObj})
    }

    const createTask = (title: TaskType["title"], todolistId: string) => {
        const task = {id: v1(), title, isDone: false};
        tasksObj[todolistId] = [task, ...tasksObj[todolistId]]
        setTasksObj({...tasksObj})
    }

    const onChangeTask = (id: TaskType["id"], isDone: TaskType["isDone"], todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    const todolistId1 = v1();
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "Первый тудулист", filter: "all"},
        {id: todolistId2, title: "Второй тудулист", filter: "all"},
    ])

    const [tasksObj, setTasksObj] = useState({
            [todolistId1]: [
                {id: v1(), title: "сделать базовую структуру", isDone: true},
                {id: v1(), title: "сделать логику", isDone: false},
                {id: v1(), title: "довести структуру до ума", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Купить воду", isDone: true},
                {id: v1(), title: "Купить слона", isDone: false},

            ],
        }
    )

    const onAddNewList = (title: TodolistType["title"]) => {
        const newList = v1()
        setTodolists([...todolists, {id: newList, title, filter: "all"}])
        // дальше нужно добавить процесс соеденения нового листа с объектом рисующим задачи иначе все ломается
        setTasksObj({...tasksObj, [newList]: []})
        console.log(todolists)
    }

    const onDeleteList = (todolistId: string) => {
        setTodolists([...todolists.filter(t => t.id !== todolistId)])
        delete tasksObj[todolistId]
    }
    const ListNum = todolists.length + 1;

    return (
        <section className={s.main}>
            <h2>{title}</h2>

            <GridWrapper cols={5} >
                {todolists.map((tl) => {
                    // const tasksObj = tasksObj[tl.id]
                    const currentTasks = tl.filter === "all"
                        ? tasksObj[tl.id]
                        : tl.filter === "active"
                            ? tasksObj[tl.id].filter(task => !task.isDone)
                            : tasksObj[tl.id].filter(task => task.isDone)



                    return <Todolist key={tl.id}
                                     tlistId={tl.id}
                                     title={tl.title}
                                     tasks={currentTasks}
                                     onFilterChange={onFilterChange}
                                     onDeleteTask={onDeleteTask}
                                     onAddTask={createTask}
                                     onChangeTask={onChangeTask}
                                     onDeleteList={onDeleteList}
                    />
                })}
                <Button className={s.addListBtn} title={"add list"} callback={()=>{onAddNewList(("List № " + ListNum))}} />
            </GridWrapper>
        </section>
    );
};