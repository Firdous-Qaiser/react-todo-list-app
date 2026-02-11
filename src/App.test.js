import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const initialTasks = [ 
  { id: 0, text: 'Clean my room', done: true, deleted: false},
  { id: 1, text: 'Do grocery shopping', done: true, deleted: false},
  { id: 2, text: 'Make dinner for today', done: false, deleted: false},
  { id: 3, text: 'Watch an english show', done: false, deleted: false},
  { id: 4, text: 'Visit Westminister University', done: false, deleted: false},
  { id: 5, text: 'Finish React homework', done: false, deleted: false}
];

describe ('Todo List App', () => { // describe: used to group related test together 
  test('Load tasks on intial render', () => { // test is an actual test case, where to check if something works correctly or not 
    render(<App />);
    initialTasks.forEach(task => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    })
  });

  test('Add a new Task', () => {
    render(<App />);

    const newTask = 'Leaving the party at 10pm';
    const InputField = screen.getByPlaceholderText('ENTER TASK');
    fireEvent.change(InputField, {target: {value: newTask}});

    const addBtn = screen.getByTestId('addon');
    fireEvent.click(addBtn);

    expect(screen.getByText(newTask)).toBeInTheDocument();
  });
  
  test('Display completed tasks', () => {
    render(<App />);
    const doneBtn = screen.getByTestId('done_btn'); // Select the element in DOM with test-id 'done_btn' 
    fireEvent.click(doneBtn); //fireEvent means simulates the user active on this component 'Typing', Focusing', clicking'
     
    initialTasks.forEach(task => {
      if(task.done && !task.deleted) {
        expect(screen.getByText(task.text)).toBeInTheDocument();
      }
      else {
        expect(screen.queryByText(task.text)).not.toBeInTheDocument();      
      }
      //Difference B/W Get and Query selection by test:- 
      //get = find the element with text if not found throw an immediate error.
      //query = find the element with text if not found return with null.
    });
  });
  
  test('Delete a task & display deleted tasks', () => {
    render(<App />);

    const delIcon = screen.getAllByTestId('delIcon'); //returns an array
    fireEvent.click(delIcon[0]); //Simulate the click action on array first index/First task from intial task  

    const delBtn = screen.getByTestId('remove_btn');
    fireEvent.click(delBtn);

    initialTasks.forEach(task => {
      if(task.id === 0) {
        expect(screen.getByText(task.text)).toBeInTheDocument();
      }
      else {
        expect(screen.queryByText(task.text)).not.toBeInTheDocument();
      }
    });
  });

  test('Edit a First task', () => {
    render(<App />);

    const editIcon = screen.getAllByTestId('editIcon');
    fireEvent.click(editIcon[0]);

    const editInput = screen.getByDisplayValue(initialTasks[0].text);
    //getByDisplayValue() = This method is used for form elements like input, textarea
    
    fireEvent.change(editInput, { target: { value: 'Clean my room today' }})
    //It simulates user typing into input field 
    //fireEvent.keyDown(editInput, { key: 'Enter' , code: 'Enter'})
    //It simulates pressing the Enter key on the keyboard

    const saveIcon = screen.getAllByTestId('saveIcon');
    fireEvent.click(saveIcon[0]);

    expect(screen.getByText('Clean my room today')).toBeInTheDocument();
    expect(screen.queryByText(initialTasks[0].text)).not.toBeInTheDocument();
  });

  test('Restored the deleted task', () => {
    render(<App />);

    const delIcon = screen.getAllByTestId('delIcon')[0]; 
    fireEvent.click(delIcon); 

    fireEvent.click(screen.getByRole('button', { name: /Remove Todos/i }));

    const restoreBtn = screen.getAllByTestId('restore_icon')[0];
    fireEvent.click(restoreBtn);

    fireEvent.click(screen.getByRole('button', { name: /All Todos/i }));
    
    initialTasks.forEach(task => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  test('Display active tasks', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', {name: /Active Todos/i}));
    initialTasks.forEach(task => {
      if(!task.done) {
        expect(screen.getByText(task.text)).toBeInTheDocument();
      }
      else {
        expect(screen.queryByText(task.text)).not.toBeInTheDocument();
      }
    });
  });
});


