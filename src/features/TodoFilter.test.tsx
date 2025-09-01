import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useFilter, useSetFilter} from '../store/selectors';
import TodoFilter from "./TodoFilter";

// jest.mock('../store/selectors', () => ({
//     __esModule: true,
//     useFilter: jest.fn(),
//     useSetFilter: jest.fn(),
// }));

jest.mock('../store/selectors');

const mockUseFilter = jest.mocked(useFilter);
const mockUseSetFilter = jest.mocked(useSetFilter);

describe('TodoFilter', () => {
    beforeEach(() => {
        mockUseFilter.mockReset();
        mockUseSetFilter.mockReset();
    })

    it('подсвечивает активный фильтр, добавляя класс', () => {
        mockUseFilter.mockReturnValue('active');
        mockUseSetFilter.mockReturnValue(jest.fn());
        render(<TodoFilter/>);

        const active = screen.getByRole('button', {name: 'active'});
        expect(active).toHaveClass('todo-filter__category_active');

        const completed = screen.getByText('completed');
        expect(completed).not.toHaveClass('todo-filter__category_active');
    })

    it('вызывает setFilter с нужным значением по клику', async () => {
        const user = userEvent.setup();
        mockUseFilter.mockReturnValue('all');
        const setFilterSpy = jest.fn();
        mockUseSetFilter.mockReturnValue(setFilterSpy);
        render(<TodoFilter/>);

        const completed = screen.getByRole('button', {name: 'completed'});
        await user.click(completed);

        expect(setFilterSpy).toHaveBeenCalledTimes(1);
        expect(setFilterSpy).toHaveBeenCalledWith('completed');
    })
})
