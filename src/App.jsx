import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import Navbar from "./Components/Navbar";

function App() {
  const [todo, setTodo] = useState(""); //handle todo in input box
  // const [todos, setTodos] = useState([]); //hadnle all todos

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // to overcome react strict mode and bug that make your local storage empty, we set initial function which will run only one time 
  // when this state will be set in first time render
  // simplified ex : - Cheating in exam, you saw correct answer but you copy them again to get marks
  const [todos, setTodos] = useState(() => {
    // Initialize todos state with data from localStorage or an empty array
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // useState for fetching data from LocalStorage

  // saving data to localStorage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(JSON.parse(localStorage.getItem("todos")))
  };

  // useEffect to render all saved todos from LocalStorage
  useEffect(() => {
    let todoString = localStorage.getItem("todos");

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    saveToLS();
    // console.log("from UseEffect");
  }, [todos]);

  // changing state of input field value
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      handleAdd();
    }
  };

  // Adding todo to list (todos)
  const handleAdd = () => {
    if (!todo) {
      alert("Enter first to add");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // saveToLS();
  };

  // Checking and unchecking todo item
  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    //you need to pass value of array instead of passing reference of existing array, it wont re render again your componenets and styling wont be applying if you pass reference
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // saveToLS();
  };

  // Handler to edit
  const handleEdit = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    setTodo(todos[index].todo);
    handleDelete(e, todos[index].id);
    // saveToLS()
  };

  // handler to delete any todo
  const handleDelete = (e, id) => {
    let newTodo = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodo);
    // saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className="font-balooBhaijaan text-xl font-bold text-center">
          iTask - Manage Your All Tasks Here
        </h1>
        <hr className="bg-violet-900 my-1 h-1" />
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold my-2">Add a Todo</h2>
          <input
            onChange={handleChange}
            onKeyUp={handleEnter}
            type="text"
            value={todo}
            className="w-2/3 outline-none px-3 rounded-md py-1"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 hover:scale-110 duration-200"
          >
            Save
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        {todos.length == 0 && (
          <div className="m-5 font-balooBhaijaan">You don't have any todos</div>
        )}
        <div className="todos">
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/2 my-3 justify-between"
              >
                <div className="flex gap-5">
                  {item.isCompleted ? <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox" checked
                  /> : <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox" 
                />}
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full items-center gap-5">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:text-black  hover:bg-violet-200 hover:text-xl hover:scale-100 ease-in transition-all p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:text-red-700 hover:bg-violet-200 hover:text-xl hover:scale-110 ease-in transition-all p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
