import React from 'react';
import TodoFilter from './features/TodoFilter';
import TodoInput from './features/TodoInput';
import TodoList from './features/TodoList';
import {useClear, useCountActive} from "./store/selectors";

function Todo() {
    const clear = useClear();
    const activeCount = useCountActive();

  return (
      <div className="todo-wrapper">
          <div className="todo">
              <div className="todo__header">
                  <h1>my todo list</h1>
                  <button className="todo__clear"
                          type="button"
                          onClick={clear}>
                      clear completed
                  </button>
              </div>

              <p className="todo__counter">{`tasks remaining: ${activeCount}`}</p>

              <div className="todo__body">
                  <TodoFilter/>

                  <div className="todo__list">
                      <TodoInput/>
                      <TodoList/>
                  </div>
              </div>

          </div>
      </div>
  );
}

export default Todo;
