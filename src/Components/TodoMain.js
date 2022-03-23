import React, { useEffect, useState } from 'react'
import './TodoMain.css'
const getLocalData = () =>{
  const data = localStorage.getItem("todoKey");
  if(data)
  {
    return JSON.parse(data);
  }
  else{
    return [];
  }
}
function TodoMain() {
 
   const [text, setText]=useState("");
   const [items, setItems] = useState(getLocalData());
   const [toggleButton, setToggleButton] = useState(false);
   const [updateItem, setUpdateItem ] =useState("");
   

  const handleSave = ()=>{
    if(!text)
    {
      alert("Please intput items");
    }
    else if(text && toggleButton)
    {
      setItems(
        items.map((currEle)=>{
          if(currEle.id===updateItem)
          {
            setToggleButton(false);
            return {...currEle, name: text}
            

          }
          else{
            return currEle;
          }
        })
      )

    }
    else
    {
      const dataIndexKey = {
        id: new Date().getTime().toString(),
        name: text,

      }
      
      setItems([...items, dataIndexKey]);
      
    }
    setText("");


    

  }
  const handleChange =(e) =>{
    
    setText(e);

  }
  const handleEdit=(e)=>{

    const updatedItem = items.find((currEle)=>{
        return currEle.id === e
       
    });
    setText(updatedItem.name);
    setToggleButton(true);
    setUpdateItem(e);
  
   

  };
  const handleDelete=(e)=>{


    if(window.confirm('Confirm to delete?')===true)
    {
      const deletedItem = items.filter((currEle)=>{
        return currEle.id !== e
      });
      setItems(deletedItem);

    }
    

  };
  const handleDeleteAll=()=>{

 
    if((window.confirm('Are you sure want to delete all?'))===true)
    {
      setItems([]);
    }

      
    
   
  };
  useEffect(()=>{
    localStorage.setItem('todoKey',JSON.stringify(items));
  },[items]);
  return (
    <>
    <div className="main-coin">
      <h2>Daily TODO List</h2>
 
  
      <div className="icon">
          <img src="https://icon-library.com/images/todo-list-icon/todo-list-icon-15.jpg" alt="todo icon" className='todo-img' />
            <form className='input-field'>
              <input type="text" className='input-text' value={text} onChange={(e)=>handleChange(e.target.value)}  placeholder="Enter your list item here"/>
              {
                toggleButton ? <i className="fa-solid fa-floppy-disk" onClick={()=>handleSave()}></i> : <i className="fa-solid fa-circle-plus"onClick={()=>handleSave()}></i>
              }
              
              
            </form>
      </div>

{
  items.map((currEle)=>{
   
    return(
     
      
        <div className="test-item" key = {currEle.id}>
      <div className="display-items">
        <div className="show-items">
        <strong>{currEle.name}</strong>
        </div>
        <div className="items-e-btn mx-5">
        <i className="fa-solid fa-pen-to-square" onClick={()=>handleEdit(currEle.id)}></i>
        <i className="fa-solid fa-circle-minus mx-2" onClick={()=>handleDelete(currEle.id)}></i>
        </div>
      </div>
      </div>
      
    )

  })
}

    



     <button className='c-btn' onClick={()=>handleDeleteAll()}>CHECK LIST</button>
 
    </div>
    </>
  )
}

export default TodoMain
