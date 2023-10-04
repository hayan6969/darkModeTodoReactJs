import React from 'react'
import { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoList({todo}) {
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const{deleteTodo, updateTodo, toggleComplete,todos} = useTodo();
    const edit=()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg})
    }
    const toggleCompleted=()=>{
        toggleComplete(todo.id);
        
    }
  return (
    <div className={` w-30 rounded-lg flex h-10 justify-between p-1  ${todo.completed ? "bg-[#c6e9a7] dark:bg-green-700" : "bg-white dark:bg-gray-800"}`}>
     <input 
     onChange={toggleCompleted}
     checked={todo.completed}   
     type="checkbox" 
     onClick={console.log(todos)}

     />
     <input 
    className= {` w-full m-1 rounded-lg p-3 dark:bg-gray-600 dark:text-white text-black ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        type="text"
        readOnly={!isTodoEditable}
        disabled={!isTodoEditable}
        onChange={(e)=>setTodoMsg(e.target.value)}

      />
     <button
     onClick={()=>{
        
        if(isTodoEditable){
            edit();
            setIsTodoEditable((prev)=>{return !prev})
        }
        else{
            setIsTodoEditable((prev)=>{return !prev})
        }
        

     }} 
     >{isTodoEditable?"📂":"📝"}</button>
     <button 
     onClick={()=>{
         deleteTodo(todo.id)
     }}
     >❌</button>
    </div>
  )
}

export default TodoList