import {useTodoStore} from './todoStore';

export const useFilter = () => useTodoStore(s => s.filter);
export const useTodos = () => useTodoStore(s => s.todos);
export const useAdd = () => useTodoStore(s => s.add);
export const useToggle = () => useTodoStore(s => s.toggle);
export const useClear = () => useTodoStore(s => s.clear);
export const useSetFilter = () => useTodoStore(s => s.setFilter);

export const useCountActive = () => useTodoStore(s => s.todos.filter(t => !t.completed).length);

export const useSortedTodos = () => {
    const todos = useTodos();
    const filter = useFilter();
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
};
