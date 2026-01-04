import React from 'react';
import './Style.css';
import { useState, useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TodoList.js';
import Features from './Features.js';
import { FaBox, FaCheckCircle, FaBan, FaSpinner } from 'react-icons/fa';

function App() {
    const [currentView, setCurrentView] = useState('taskList');
    const [tasks, dispatch] = useReducer(
      tasksReducer,
      initialTasks,
    );
    const Liststyle = (color) => ({
          display: 'flex', 
          width: '40vw',
          border: '1px solid grey' , 
          borderRadius: '8px', 
          height: '50px', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '8px', 
          backgroundColor: color,
          color: '#000000', 
          paddingLeft: '10px'
    });
    const Iconstyle = () => ({
      display: 'flex', 
      marginRight: '8px' ,
      gap: '5px' 
    });
    const Icon = (textColor) => ({
      color: textColor,
      alignItems: 'center'
    });

    function handleAddTask(text) {
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }
  
    function handleChangeTask(task) {
      dispatch({
        type: 'changed',
        task: task
      });
    }
  
    function handleDeleteTask(taskId) {
      dispatch({
        type: 'deleted',
        id: taskId,
      });
    }
    function handleRestoreTask(task) {
      dispatch({
        type: 'changed',
        task: { ...task, deleted: false }
     });
    }  
    function displayDeletedTask() {
      if (currentView !== 'remove') return null;
      const deletedTasks = tasks.filter(t => t.deleted);
      return (
      <>
      {currentView === 'remove' && (
      <div className='flexDiv'> 
      <div className='blockDiv'>
      <h3 className='header'>Remove Todos:</h3>
    {deletedTasks.length > 0 ? (
     deletedTasks.map(task => (
       <li key = {task.id} 
          style= {Liststyle('#f8d7da')}>
          {task.text}
          <div style = {Iconstyle()}>
             <button onClick={() => handleRestoreTask(task)}
              className='restoreBtn'>Restore</button>
             <FaBan size='20' style = {Icon('red')}/>
          </div>
          </li>
    ))) : (
      <div className='EmptyIconstyle'>
      <FaBox style={Icon('#9CA3AF')}/>
      </div>
    )}
    </div>
    </div>
      )}
    </>
      );
    }
   function displayCompltedTask() {
      if(currentView !== 'done') return null;
      const completed = tasks.filter(t => t.done);
      return (
        <>
        {currentView === 'done' && (
        <div className='flexDiv'>
        <div className='blockDiv'>
        <h3 className='header'>Done Todos:</h3>
        {completed.length > 0 ? (
          completed.map(task => (
          <li key = {task.id} 
          style= {Liststyle('#d7eadaff')}>
          {task.text}
          <div style = {Iconstyle()}>
             <FaCheckCircle size='20' style={Icon('green')}/>
          </div>
          </li>
          ))
        ) : (
        <div className='EmptyIconstyle'>
           <FaBox size="20" style={Icon('#9CA3AF')}/>
        </div>
        )}
        </div>
        </div>
        )}
        </>
        );
    }
    function displayActiveTasks() {
    if (currentView !== 'active') return null;
  
    const activeTasks = tasks.filter(
      task => !task.done && !task.deleted
    );
  
    return (
      <div className='flexDiv'>
        <div>
          <h3 className='header'>Active Todos:</h3>
  
          {activeTasks.length > 0 ? (
            activeTasks.map(task => (
              <li
                key={task.id}
                style={Liststyle('#f8f0e1ff')}
              >
                {task.text}
              <div style = {Iconstyle()}>
                <FaSpinner size = '20' style = {Icon('#e59409ff')}/>
              </div>
              </li>
            ))
          ) : (
            <div className='EmptyIconstyle'>
            <FaBox size="20" style = {Icon('#9CA3AF')}/>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div style = {{}}>
      <h1 className = 'Logo'>Todo List</h1>
      <AddTask
        onAddTask={handleAddTask} 
      /> <br />
      <Features 
      tasks = {tasks}
      onShowActiveTasks = {() => setCurrentView('active')}
      onShowCompltedTask = {() => setCurrentView('done')}
      onShowDeleted={() => setCurrentView('remove')}
      onShowAll={() => setCurrentView('taskList')}
      />
      <br />
      {currentView === 'taskList' && (
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask} 
      />)}

      {displayDeletedTask()}
      {displayActiveTasks()}
      {displayCompltedTask()}
    </div>
  );
}
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false,
        deleted: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.map(task =>
       task.id === action.id
      ? { ...task, deleted: true }
      : task
  );
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
let nextId = 3;
const initialTasks = [ 
  { id: 0, text: 'Clean my room', done: true, deleted: false},
  { id: 1, text: 'Do grocery shopping', done: true, deleted: false},
  { id: 2, text: 'Make dinner for today', done: false, deleted: false},
  { id: 3, text: 'Watch an english show', done: false, deleted: false},
  { id: 4, text: 'Visit Westminister University', done: false, deleted: false},
  { id: 5, text: 'Finish React homework', done: false, deleted: false}
];
export default App;
