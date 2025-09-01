import type {Todo} from "../store/types";
import {useToggle} from "../store/selectors";

function Task({id, text, completed}: Todo) {
    const toggle = useToggle();
    const handleToggle = () => toggle(id);

    return (
        <div className="task"
             onClick={handleToggle}>

            <input type="checkbox"
                   checked={completed}/>
            <p {...completed && {style: {textDecoration: 'line-through'}}}>{text}</p>

        </div>
    )
}

export default Task;