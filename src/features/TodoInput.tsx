import {useState} from "react";
import {useAdd} from "../store/selectors";


function TodoInput() {
    const [text, setText] = useState('');
    const add = useAdd();

    const addTask = () => {
        add(text);
        setText("");
    };

    return (
        <div className="todo-input">
            <input className="todo-input__input"
                   type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   placeholder="what should i do?"/>
            <button className="todo-input__submit"
                    type="button"
                    onClick={addTask}>+</button>
        </div>
    )
}

export default TodoInput;