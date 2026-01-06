import type { Meta, StoryObj } from "@storybook/react-vite";
import { Todolist } from "./Todolist";
import type { FilterType, TaskType } from "../../layout/sections/main/Board";

const meta: Meta<typeof Todolist> = {
    title: "Components/Todolist",
    component: Todolist,
};

export default meta;
type Story = StoryObj<typeof Todolist>;

const tasks: TaskType[] = [
    { id: "1", title: "Выучить React", isDone: false },
    { id: "2", title: "Разобраться со Storybook", isDone: true },
    { id: "3", title: "Сделать тудулист", isDone: false },
];

export const Default: Story = {
    args: {
        title: "Мой Todolist",
        tasks,
        tlistId: "todolist-1",

        onAddTask: (title: string, todolistId: string) => {
            console.log("add task:", title, todolistId);
        },

        onDeleteTask: (id: string, todolistId: string) => {
            console.log("delete task:", id, todolistId);
        },

        onChangeTask: (id: string, isDone: boolean, todolistId: string) => {
            console.log("change task:", id, isDone, todolistId);
        },

        onDeleteList: (todolistId: string) => {
            console.log("delete list:", todolistId);
        },

        onFilterChange: (val: FilterType, todolistId: string) => {
            console.log("filter:", val, todolistId);
        },
    },
};
