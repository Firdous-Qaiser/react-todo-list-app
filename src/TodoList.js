import { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaBan} from 'react-icons/fa';
import './Style.css';

function TaskList({tasks, onChangeTask,  onDeleteTask}) 
    {    
    const[editID, setEditID] = useState(null);
    const[value, setValue] = useState('');

    const Labelstyle = () => ({
        display: 'flex', 
        marginRight: '8px', 
        gap: '4px'
    });
    const Taskliststyle = (Taskdeleted) => ({
        display: 'flex', 
        width: '40vw',
        border: '1px solid grey' , 
        borderRadius: '8px', 
        height: '50px', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '8px', 
        backgroundColor: Taskdeleted ? '#f8d7da': '#ECEFF1',
        color: '#111827', 
        textDecoration: Taskdeleted ? 'line-through' : 'none', 
        opacity: Taskdeleted ? 0.6: 1
    });
    return (
    <div className = 'flexDiv'>
    <div className ="blockDiv">
        <h3 className ="header">All Todos:</h3>
        {tasks.map(task => 
        <li key = {task.id} style= {Taskliststyle(task.deleted)}>
        <label style = {Labelstyle()}>
            <input 
            type= 'checkbox'
            checked = {task.done}
            onChange={() => onChangeTask({...task, done: !task.done})}
            disabled = {task.deleted}
            className="lg-checkBox"
            >
            </input>
            {editID === task.id ? 
            (<input
            type = 'text'
            value = {value}
            onChange={(e) => setValue(e.target.value)}
            disabled = {task.deleted}
            >
            </input>) : (
                task.text
            )}  
        </label>   
        <div style = {{display: 'flex', marginRight: '5px', gap: '8px'}}>
        {task.deleted && <FaBan size = {16} className="icon-banTask"/>}
        {editID === task.id ?
        (<button
        onClick={() => handleSaveClick(task)} disabled = {task.deleted}><FaSave size = {16} className="icon-edit" /></button>)
         : (
        <button
        onClick={() => handleEditClick(task)} disabled = {task.deleted}><FaEdit size = {16} className="icon-save" /></button>
        )}
        <button
        onClick={() => handleDeleteClick(task.id)} disabled = {task.deleted}><FaTrash size = {16} className="icon-del"/></button>
        </div>
        </li>
        )}  
    </div>
    </div>
    );
    function handleEditClick(task) {
        setEditID(task.id);
        setValue(task.text);
    }
    function handleSaveClick(task) {
        if(value.trim() === '') {
            alert('Task can\'t be Empty');
            return;
        }
        onChangeTask({...task, text: value});
        setEditID(null);
        setValue('');
    }
    function handleDeleteClick(tid) {
        onDeleteTask(tid);
    }
}
export default TaskList;
