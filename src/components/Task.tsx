import type {Todo} from "../store/types";
import {useToggle} from "../store/selectors";

function Task({id, text, completed}: Todo) {
    const toggle = useToggle();
    const handleToggle = () => toggle(id);

    return (
        <label className="task">
            <input type="checkbox"
                   checked={completed}
                   onChange={handleToggle}/>
            <p style={completed ? {textDecoration: "line-through"} : undefined}>{text}</p>

        </label>
    )
}

export default Task;