import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const todoList = [];


  const [filterText, setfilterText]  = useState("All");
  const [name, setDoname] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [doList, setDolist] = useState(todoList);
  const [edit, setEdit] = useState(true);
  const [id, setId] = useState("");

  let filterList = ()=>doList.filter((elements)=>{
    //console.log(filterList);
    if(filterText==="Completed")
    {
      //console.log(filterList);
      return elements.status === "Completed";
    }
    else if(filterText === "Not Completed"){
      console.log("Not Competed");
      return elements.status === "Not Completed";
    }
    else{
      console.log("All");
      return elements;
    }
  })

  return (
    <div className="App">
      <div className='head-section'>My todo</div>
      <div className='edit-area'>
        <input type='text' 
        value={name} 
        onChange={(event) => setDoname(event.target.value)} 
        placeholder='Todo Name'/>

        <input type='text' value={description} onChange={(event)=>setDescription(event.target.value)} placeholder='Todo Description'></input>
        {edit ?<button onClick={()=>{
          //console.log(name, discription)
          if(name !== "" && description !== ""){
          const NewToDos = {
            name,
            description,
            status          
          }
          setDolist([...doList, NewToDos]);
          setDoname("");
          setDescription("");
          
        }else(alert("Enter the ToDo Name & Description"));
        }}>Add Todo</button>:<button onClick={()=>{
          const uptoDo= {
            name, 
            description,
            status
          }
          console.log(id);
          doList.splice(id, 1, uptoDo);
          setEdit(!edit);
          setStatus("Not Completed")
          setDoname("");
          setDescription("");
          }}>Update ToDo</button>}
        
      </div>
      <div className="row task-section">
        <div>My Todos</div>
        <div className='filter-section'>Status Filter  :  {"   "}
        {/* {console.log(state)} */}
          <select id='status'  onChange={(event)=> {
            setfilterText(event.target.value)
            }}>
            <option>All</option>
            <option>Completed</option>
            <option>Not Completed</option>
          </select> 
        </div>
      </div>
      <div className="row main-section">
      {filterList().map((list, index)=>( 
        <div className="cart">
        {/* <div className="cart-head">{index} {list.name}</div> */}
        <div className="cart-body"> 
          <p>Name  : {list.name}</p>
          <p>Description  : {list.description}</p>
          Status  :  <select style = {list.status != "Completed" ? { background:'#f7729e' } : { background:'#0db391' } } 
          onChange={(event)=>{
            const findToDo = doList.find((element, doId)=>doId === index);
            //setStatus();
            const updateStatus={
              name: findToDo.name,
              description : findToDo.description,
              status : event.target.value
            } 

            doList.splice(index, 1, updateStatus);
            console.log(status) 
          }}>
            
          <option> {list.status}</option>
          <option>{list.status === "Completed" ? "Not Completed" : "Completed"}</option>
        </select>  
        </div>
        <div className="cart-footer">
        <button className='btn-edit' disabled = {edit? false:true} onClick={()=>{
          const findToDo = doList.find((_element, doId)=>doId === index);
          setDoname(findToDo.name);
          setDescription(findToDo.description);
          setStatus(findToDo.status);
          setId(index);
          setEdit(!edit);
          }} >Edit</button>
          <button className='btn-delete' onClick={()=>
          setDolist([...doList].filter((dolis, doid)=>doid !== index))
          }>Delete</button>
        </div>
      </div>
        ))}
      </div>
    </div>
  );
}

export default App;


