import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type { Todo, Filter } from './types';

type todoState = {
    todos: Todo[];
    filter: Filter;
    nextId: number;
    add: (text: string) => void;
    toggle: (id: number) => void;
    clear: () => void;
    setFilter: (f: Filter) => void;
}

export const useTodoStore = create<todoState>()(
    persist(
        (set) => ({
            todos: [],
            filter: 'all',
            nextId: 1,
            add: (text) =>
                set((s) =>
                    !text.trim()
                        ? s
                        : {todos: [{id: s.nextId, text: text.trim(), completed: false}, ...s.todos],
                            nextId: s.nextId + 1}
                ),
            toggle: (id) =>
                set((s) => (
                    {todos: s.todos.map(t => t.id === id
                            ? {...t, completed: !t.completed}
                            : t)}
                    )),
            clear: () => set((s) => (
                {todos: s.todos.filter(t => !t.completed)}
            )),
            setFilter: (f) => set(
                {filter: f}
            ),
        }),
        {name: 'todo-store'}
    )
);