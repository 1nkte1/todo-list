import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from "./Task";

const mockUseToggle = jest.fn();
jest.mock('../store/selectors', () => ({
    __esModule: true,
    useToggle: () => mockUseToggle,
}));

describe('Task', () => {
    beforeEach(() => {
        mockUseToggle.mockClear();
    });

    it('completed=false: чекбокс не отмечен и текст не зачеркнут', () => {
        render(<Task id={1} text="купить арбуз" completed={false}/>);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        const text = screen.getByText('купить арбуз');
        expect(text).not.toHaveStyle('text-decoration: line-through');
    });

    it('completed=true: чекбокс отмечен и текст зачеркнут', () => {
        render (<Task id={1} text="купить арбуз" completed={true}/>);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();

        const text = screen.getByText('купить арбуз');
        expect(text).toHaveStyle('text-decoration: line-through');
    });

    it('при клике на чекбокс вызывается toggle', async () => {
        const user = userEvent.setup();
        render(<Task id={2} text="оплатить счет" completed={false}/>);

        await user.click(screen.getByRole('checkbox'));
        expect(mockUseToggle).toHaveBeenCalledTimes(1);
        expect(mockUseToggle).toHaveBeenCalledWith(2);
    });

    it('при клике на текст задачи также вызывается toggle', async () => {
        const user = userEvent.setup();
        render(<Task id={3} text="купить хлеб" completed={true}/>);

        await user.click(screen.getByText('купить хлеб'));
        expect(mockUseToggle).toHaveBeenCalledWith(3);
    });
})