import { useState } from 'react';
import TaskList from './TodoList';
import './Style.css';

function Features({tasks, onShowCompltedTask, onShowDeleted, onShowActiveTasks, onShowAll}) {
    const [activebtn, setActivebtn] = useState('all');
    const [pressedbtn, setPressedbtn] = useState(null);

    const Buttonstyle = (btn, color) => ({
        padding: '6px 12px', 
        backgroundColor: color,
        color: 'white', 
        border: 'none', 
        borderRadius: '5px' , 
        fontSize: '14px' , 
        fontWeight: activebtn === btn ? "600" : "400",
        fontFamily: 'inherit',
        opacity: pressedbtn === btn ? 0.75 : activebtn === btn ? 0.85 : 1, 
        transition: 'all 0.2s ease', 
        transform: pressedbtn === btn ? "scale(0.96)" : "scale(1)", 
        boxShadow: activebtn === btn ? "0 5px 18px rgba(0,0,0,0.45)"  : "0 3px 6px rgba(0,0,0,0.15)"    
    });
    const handleClick = (btnType, callback) => {
    setActivebtn(btnType);
    callback();
  };
    return (
        <div className = 'navDiv'>
            <button onClick={() => {
                handleClick('all', onShowAll);
            }}
            onMouseDown = {() => setPressedbtn('all')}
            onMouseUp = {() => setPressedbtn(null)}
            onMouseLeave = {() => setPressedbtn(null)}
            style = {Buttonstyle('all', '#69869cff')}>All Todos</button>
                        <button onClick={() => {
                handleClick('active', onShowActiveTasks);
            }}
            onMouseDown = {() => setPressedbtn('Active')}
            onMouseUp = {() => setPressedbtn(null)}
            onMouseLeave = {() => setPressedbtn(null)}
            style = {Buttonstyle('active', '#bba050ff')}>
            Active Todos</button>
            <button onClick = {() => { 
                handleClick('done', onShowCompltedTask);
            }} 
            onMouseDown = {() => setPressedbtn('done')}
            onMouseUp = {() => setPressedbtn(null)}
            onMouseLeave = {() => setPressedbtn(null)}
            style = {Buttonstyle('done', '#247b27ff')}>Done Todos</button>
            <button onClick={() => {
                handleClick('remove', onShowDeleted);
            }}            
            onMouseDown = {() => setPressedbtn('remove')}
            onMouseUp = {() => setPressedbtn(null)}
            onMouseLeave = {() => setPressedbtn(null)}
            style = {Buttonstyle('remove', '#dc2626')}>Remove Todos</button>
        </div>
    );
}
export default Features