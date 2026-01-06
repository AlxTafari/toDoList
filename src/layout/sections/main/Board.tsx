import s from "./Board.module.scss"
import {Todolist} from "../../../components/todolist/Todolist.tsx";
import {useEffect, useState} from "react";
import {v1} from "uuid";
import {GridWrapper} from "../../../components/gridWrapper/GridWrapper.tsx";
import {CreateItemForm} from "../../../components/input/CreateItemForm.tsx";

type BoardType = {
    title: string,
};

export type FilterType = "all" | "active" | "completed"

type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
}

type TasksStateType = {
    [key: string]: TaskType[]
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
    const changeTaskTitle = (id: TaskType["id"], newTitle: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    const todolistId1 = v1();
    const todolistId2 = v1();


    const defaultTodolists: TodolistType[] = [
        {id: todolistId1, title: "Создаем тудулист", filter: "all"},
        {id: todolistId2, title: "Список покупок", filter: "all"},
    ]

    const [todolists, setTodolists] = useState<TodolistType[]>(()=> {
            const strTodolists = localStorage.getItem('todolists')
            return strTodolists ? JSON.parse(strTodolists) : defaultTodolists
        }
        // [
        //     {id: todolistId1, title: "Создаем тудулист", filter: "all"},
        //     {id: todolistId2, title: "Список покупок", filter: "all"},
        // ]
    )

    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
    }, [todolists])

    const [tasksObj, setTasksObj] = useState<TasksStateType>(() => {
        const str = localStorage.getItem("tasks")
        return str ? JSON.parse(str) : {
            [todolistId1]: [
                {id: v1(), title: "сделать базовую структуру", isDone: true},
                {id: v1(), title: "сделать логику", isDone: true},
                {id: v1(), title: "довести структуру до ума", isDone: false},
                {id: v1(), title: "добавить localStorage", isDone: true},
            ],
            [todolistId2]: [
                {id: v1(), title: "Вода", isDone: true},
                {id: v1(), title: "Хлеб", isDone: false},
                {id: v1(), title: "Соль", isDone: false},
            ],
        }
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasksObj))
    }, [tasksObj])



    const onAddNewList = (title: TodolistType["title"]) => {
        const newList = v1()
        setTodolists([...todolists, {id: newList, title, filter: "all"}])
        // дальше нужно добавить процесс соеденения нового листа с объектом рисующим задачи иначе все ломается
        setTasksObj({...tasksObj, [newList]: []})
        console.log(todolists)
    }

    const onDeleteList = (todolistId: string) => {
        setTodolists([...todolists.filter(t => t.id !== todolistId)])
        const copyTasks = {...tasksObj}
        delete copyTasks[todolistId]
        setTasksObj({...copyTasks})
    }

    const changeListTitle = (todolistID: string, title: string) => {
        setTodolists([...todolists.map(t => t.id === todolistID ? {...t, title}  : t)])
    }
    return (
        <section className={s.main}>
            <CreateItemForm createItem={onAddNewList} placeholder={"новый список"} />
            <h2>{title}</h2>

            <GridWrapper minColumnWidth={"300px"} rowGap={"1rem"}>
                {todolists.map((tl) => {
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
                                     onChangeTaskTitle={changeTaskTitle}
                                     onChangeListTitle={changeListTitle}
                                     onDeleteList={onDeleteList}
                    />
                })}
            </GridWrapper>
        </section>
    );
};