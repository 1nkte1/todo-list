import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useClear, useCountActive} from "../store/selectors";
import Todo from "./Todo";

jest.mock('../features/TodoList', () => () => <div/>);
jest.mock('../features/TodoInput', () => () => <div/>);
jest.mock('../features/TodoFilter', () => () => <div/>);
jest.mock('../store/selectors');
const mockUseClear = jest.mocked(useClear);
const mockUseCountActive = jest.mocked(useCountActive);

describe('Todo', () => {
    beforeEach(() => {
        mockUseClear.mockReset();
        mockUseCountActive.mockReset();
    });

    it('в счетчике отображается количество активных задач из useCountActive', () => {
        mockUseCountActive.mockReturnValue(3);
        mockUseClear.mockReturnValue(jest.fn());
        render(<Todo/>);

        expect(screen.getByText('tasks remaining: 3')).toBeInTheDocument();
    });

    it('по клику на кнопку clear completed вызывает useClear', async () => {
        const user = userEvent.setup();
        const clearSpy = jest.fn();
        mockUseClear.mockReturnValue(clearSpy);
        render(<Todo/>);

        const button = screen.getByRole('button', {name: "clear completed"});
        await user.click(button);
        expect(clearSpy).toHaveBeenCalledTimes(1);
    });
});

