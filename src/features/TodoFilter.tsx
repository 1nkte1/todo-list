import {useSortedTodos} from "../store/selectors";
import type {Filter} from "../store/types";
import {useFilter, useSetFilter} from "../store/selectors";

function TodoFilter() {
    const filters: Filter[] = ['all', 'active', 'completed'];
    const setFilter = useSetFilter();
    const filter = useFilter();

    return (
        <div className="todo-filter">
            {filters.map((f, index) =>
                <button className={"todo-filter__category" +
                    (filter === f ? " todo-filter__category_active" : "")}
                        type="button"
                        key={index}
                        onClick={() => setFilter(f)}>
                    <p>{f}</p>
                </button>
            )}
        </div>
    )
}

export default TodoFilter;