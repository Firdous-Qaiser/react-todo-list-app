import React from 'react';
import AddTask from './AddTask.js';
import TaskList from './TodoList.js';
import Features from './Features.js';
import { useState, useReducer } from 'react';
import './Style.css';
import { FaBox, FaCheckCircle, FaBan, FaSpinner } from 'react-icons/fa';

function App() {

  const [currentView, setCurrentView] = useState('taskList');

  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  /* LIST STYLE */

  const Liststyle = (color) => ({
    display: 'flex',
    width: '100%',
    maxWidth: '750px',
    boxSizing: 'border-box',
    border: '1px solid grey',
    borderRadius: '8px',
    minHeight: '60px',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
    backgroundColor: color,
    color: '#000000',
    padding: '10px 15px'
  });

  /* ADD TASK */

  function handleAddTask(text) {

    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });

  }

  /* CHANGE TASK */

  function handleChangeTask(task) {

    dispatch({
      type: 'changed',
      task: task
    });

  }
  /* DELETE TASK */

  function handleDeleteTask(taskId) {

    dispatch({
      type: 'deleted',
      id: taskId,
    });

  }

  /* RESTORE TASK */

  function handleRestoreTask(task) {

    dispatch({
      type: 'changed',
      task: {
        ...task,
        deleted: false
      }
    });

  }

  /* REMOVED TASKS */

  function displayDeletedTask() {

    if (currentView !== 'remove') return null;

    const deletedTasks = tasks.filter(
      t => t.deleted
    );

    return (

      <div className='flexDiv'>

        <div className='blockDiv'>

          <h3 className='header'>
            Remove Todos:
          </h3>

          {deletedTasks.length > 0 ? (

            deletedTasks.map(task => (

              <li
                key={task.id}
                style={Liststyle('#f8d7da')}
              >

                {/* TASK TEXT */}
                <span className='taskText'>
                  {task.text}
                </span>

                {/* ICON GROUP */}
                <div className='iconGroup'>

                  <button
                    onClick={() =>
                      handleRestoreTask(task)
                    }
                    className='restoreBtn'
                    data-testid='restore_icon'
                  >
                    Restore
                  </button>

                  <FaBan
                    size={18}
                    style={{ color: 'red' }}
                  />

                </div>

              </li>

            ))

          ) : (

            <div className='EmptyIconstyle'>

              <FaBox
                style={{ color: '#9CA3AF' }}
                data-testid='emptyIcon'
              />

            </div>

          )}

        </div>

      </div>

    );
  }

  /* COMPLETED TASKS */

  function displayCompltedTask() {

    if (currentView !== 'done') return null;

    const completed = tasks.filter(
      t => t.done
    );

    return (

      <div className='flexDiv'>

        <div className='blockDiv'>

          <h3 className='header'>
            Done Todos:
          </h3>

          {completed.length > 0 ? (

            completed.map(task => (

              <li
                key={task.id}
                style={Liststyle('#d7eada')}
              >

                {/* TASK TEXT */}
                <span className='taskText'>
                  {task.text}
                </span>

                {/* ICON GROUP */}
                <div className='iconGroup'>

                  <FaCheckCircle
                    size={18}
                    style={{ color: 'green' }}
                  />

                </div>

              </li>

            ))

          ) : (

            <div className='EmptyIconstyle'>

              <FaBox
                size={20}
                style={{ color: '#9CA3AF' }}
              />

            </div>

          )}

        </div>

      </div>

    );
  }

  /* ACTIVE TASKS */

  function displayActiveTasks() {

    if (currentView !== 'active') return null;

    const activeTasks = tasks.filter(
      task => !task.done && !task.deleted
    );

    return (

      <div className='flexDiv'>

        <div className='blockDiv'>

          <h3 className='header'>
            Active Todos:
          </h3>

          {activeTasks.length > 0 ? (

            activeTasks.map(task => (

              <li
                key={task.id}
                style={Liststyle('#f8f0e1')}
              >

                {/* TASK TEXT */}
                <span className='taskText'>
                  {task.text}
                </span>

                {/* ICON GROUP */}
                <div className='iconGroup'>

                  <FaSpinner
                    size={18}
                    style={{ color: '#e59409' }}
                  />

                </div>

              </li>

            ))

          ) : (

            <div className='EmptyIconstyle'>

              <FaBox
                size={20}
                style={{ color: '#9CA3AF' }}
              />

            </div>

          )}

        </div>

      </div>

    );
  }

  return (

    <div>

      <h1 className='Logo'>
        Todo List
      </h1>

      <AddTask
        onAddTask={handleAddTask}
      />

      <br />

      <Features
        tasks={tasks}

        onShowActiveTasks={() =>
          setCurrentView('active')
        }

        onShowCompltedTask={() =>
          setCurrentView('done')
        }

        onShowDeleted={() =>
          setCurrentView('remove')
        }

        onShowAll={() =>
          setCurrentView('taskList')
        }
      />

      <br />

      {currentView === 'taskList' && (

        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />

      )}

      {displayDeletedTask()}

      {displayActiveTasks()}

      {displayCompltedTask()}

    </div>

  );
}

function tasksReducer(tasks, action) {

  switch (action.type) {

    case 'added': {

      return [

        ...tasks,

        {
          id: action.id,
          text: action.text,
          done: false,
          deleted: false
        }

      ];
    }

    case 'changed': {

      return tasks.map(t => {

        if (t.id === action.task.id) {
          return action.task;
        }

        return t;

      });
    }

    case 'deleted': {

      return tasks.map(task =>

        task.id === action.id

          ? {
              ...task,
              deleted: true
            }

          : task

      );
    }

    default: {

      throw Error(
        'Unknown action: ' + action.type
      );

    }
  }
}

/* INITIAL TASKS */

let nextId = 6;

const initialTasks = [

  {
    id: 0,
    text: 'Clean my room',
    done: true,
    deleted: false
  },

  {
    id: 1,
    text: 'Do grocery shopping',
    done: true,
    deleted: false
  },

  {
    id: 2,
    text: 'Make dinner for today',
    done: false,
    deleted: false
  },

  {
    id: 3,
    text: 'Watch an english show',
    done: false,
    deleted: false
  },

  {
    id: 4,
    text: 'Visit Westminister University',
    done: false,
    deleted: false
  },

  {
    id: 5,
    text: 'Finish React homework',
    done: false,
    deleted: false
  }

];

export default App;
