import { useState} from "react";

type Props = {
    title: string,
    onChange: (newTitle: string) => void,
};
export const TitleEditor = ({title, onChange}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const activeteEditMode = () => {
        setEditMode(true)
        setNewTitle(title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(newTitle)
    }
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    return editMode
        ? <input value={newTitle} onChange={onChangeTitle} onBlur={activateViewMode} autoFocus onKeyDown={(e) => {if (e.key === 'Enter') {
            activateViewMode();
        }}}/>
        : <span onDoubleClick={activeteEditMode}>{title}</span>

};