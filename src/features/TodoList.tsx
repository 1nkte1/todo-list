import Task from "../components/Task";
import {useSortedTodos} from "../store/selectors";

function TodoList() {
    const todos = useSortedTodos();

    return (
        <div className="todo-list">
            {todos.map(({id, text, completed}, index) =>
                <Task key={id} id={id} text={text} completed={completed} />)}
        </div>
    )
}

export default TodoList;