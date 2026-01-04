import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import './Style.css';

function AddTask({onAddTask}) {
    const [addTask, setAddTask] = useState('');
    return (
        <div className = 'addTaskDiv'>
            <input 
            placeholder = 'ENTER TASK'
            value = {addTask}
            onChange={e => setAddTask(e.target.value)}
            className="adTask">
            </input>
            <button onClick={handleClick} className="addBtn"
            ><FaPlus /></button>
        </div>
    );
    function handleClick(e) {
        e.preventDefault();
        const task = addTask.trim();
        if(!task) {
            alert(`Task can't be empty`);
            return;
        }
        onAddTask(task);
        setAddTask('');
    }
}
export default AddTask;