import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoInput from "./TodoInput";

const mockUseAdd = jest.fn();
jest.mock('../store/selectors', () => ({
    __esModule: true,
    useAdd: () => mockUseAdd,
}))

describe('TodoInput', () => {
    beforeEach(() => {
         mockUseAdd.mockClear();
    });

    it('вызывает add и очищает поле ввода', async () => {
        render(<TodoInput/>);

        const input = screen.getByRole("textbox");
        const button = screen.getByRole('button');

        await userEvent.type(input, "купить хлеб");
        await userEvent.click(button);

        expect(mockUseAdd).toHaveBeenCalledTimes(1);
        expect(mockUseAdd).toHaveBeenCalledWith("купить хлеб");
        expect(input).toHaveValue('');
    })
})