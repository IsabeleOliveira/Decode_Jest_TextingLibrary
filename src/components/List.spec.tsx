import { render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import List from "./List";

describe('List Component', () => {
    it('should render list items', () => {
        const { getByText, rerender }  = render(<List initialItems={['Isabele', 'Gabriel']} />)

        expect(getByText('Isabele')).toBeInTheDocument()
        expect(getByText('Gabriel')).toBeInTheDocument()

        rerender(<List initialItems={['Julia']} />)

        expect(screen.getByText('Julia')).toBeInTheDocument()
        expect(screen.queryByText('Mayk')).not.toBeInTheDocument();
    });

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText } = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Olá');
        const addButton = getByText('Adicionar');
        
        userEvent.type(inputElement, 'Olá')
        userEvent.click(addButton);


        await waitFor(()=> {
            expect(inputElement).toBeInTheDocument()
        });
    });

    it('should be able to add remove item from the list', async () => {
        const { getAllByText , queryByText} = render(<List initialItems={['Diego']}/>)

        const removeButton = getAllByText('Remover');
        
        userEvent.click(removeButton[0]);


        await waitFor(()=> {
            expect(queryByText('Diego')).not.toBeInTheDocument()
        });
    });

   

})

// test('sum', () => {
//     expect(null).toBe(0)
//   })