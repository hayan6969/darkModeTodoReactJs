import { useState,useEffect } from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import Todolist from "./components/TodoList";
import { ThemeProvider } from "./context/Theme";

function App() {
  const [todos, setTodos] = useState([])
  const [theme,setTheme] = useState("light");
  const darkTheme =()=>{
setTheme("dark");
  }
  const lightTheme =()=>{
    setTheme("light");
  }

  useEffect(()=>{
    document.querySelector("html").classList.remove("dark","light");
    document.querySelector("html").classList.add(theme);
  },[theme])

  const onChangebtn=(e)=>{
    const status=e.currentTarget.checked;
    if(status){
      darkTheme();
    }
    else{
      lightTheme();
    }
  }
const[bgVal,setBgVal]=useState("bg-[#79a8ee]");
  const bgGrad =(e)=>{
    const statusgrad=e.currentTarget.checked;
   if(statusgrad){
    setBgVal("bg-gradient-to-r from-purple-500 to-pink-500")
   }
   else{
     setBgVal("bg-[#79a8ee]")
   }
  }

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    
    <ThemeProvider value={{theme,darkTheme,lightTheme}}>
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className= {`${bgVal} min-h-screen py-8 dark:bg-black`} >
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white ">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <input type="checkbox" className="mb-5 "   onChange={onChangebtn} />
                  <label className="text-black ml-3 dark:text-white">Dark Mode</label>
                  <input type="checkbox" className="ml-10 " onChange={bgGrad}   />
                  <label className="text-black ml-3 dark:text-white">Bg Gradient</label>
                  <div className="mb-4">
                      {/* Todo form goes here */} 
                      <TodoForm />
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                        <div key={todo.id}
                        className='w-full'
                        >
                          <Todolist todo={todo} />
                          
                        </div>
                      ))}
                  </div>
              </div>
          </div>
  </TodoProvider>
  </ThemeProvider>  
        
        
      
    
  );
}


export default App;


