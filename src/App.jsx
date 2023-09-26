import {useState, useRef} from 'react'
import {FaRegSquarePlus, FaTrashCan,FaFilePen} from "react-icons/fa6"
import "./style.css"
import './App.css'

function App() {
  const inputRef = useRef(0)
  const [items, setItems] = useState(() => {
    const localStorageData = localStorage.getItem('Carlz')
    return localStorageData ? JSON.parse(localStorageData) : []
  });

  const handleDelete = (id) => {
    const itemList = items.filter((item)  => item.id !== id)
    setItems(itemList)
    localStorage.setItem("Carlz", JSON.stringify(itemList))
  }

  const [addItem , setAddItem] = useState('');

  const handleAddItems = (e) => {
    e.preventDefault()
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const newItem = {id, item: addItem, editable: false}
    const setItemList = [...items, newItem]
    if(addItem.trim() !== ''){
      setItems(setItemList)
      setAddItem('')
      localStorage.setItem("Carlz", JSON.stringify(setItemList))
    }else{
      setAddItem('')
     alert("Please enter your notes")
      inputRef.current.focus()
    }
   
  }

  const handleEdit = (id) => {
    const editeList = items.map((item) => item.id === id ? {...item, editable: !item.editable} : item)
    setItems(editeList)
  }

  const handleEditToggle = (id) => {
    const editedList = items.map((item) =>
      item.id === id ? { ...item, editable: !item.editable } : item
    );
    setItems(editedList);
    localStorage.setItem('Carlz', JSON.stringify(editedList));
  };

  const handleEditContentChange = (id, content) => {
    const updatedList = items.map((item) => item.id === id  ? { ...item, item: content } : item);
    setItems(updatedList);
  };

  return (
    <main>
      <form className='topContainer' onSubmit={handleAddItems}>
        <input 
          id='inputBox' 
          type="text" 
          required
          placeholder='Enter your notes here'
          ref={inputRef}
          value={addItem}
          onChange={(e) => setAddItem(e.target.value)}
        />
        <FaRegSquarePlus 
          id='saveIcon'
          type='submit'
          onClick={handleAddItems}  
        />
      </form>


      <ul className='middleContainer'>
        {items.map((item) => (
        <li className='item' key={item.id}>
          <p 
            className='notesContainer' 
            contentEditable={item.editable}
            style={{backgroundColor: `${item.editable ? "rgb(255, 220, 160)" : ""}`}}
            onBlur={(e) => handleEditContentChange(item.id, e.target.innerText)}
          >{item.item}</p>
        <FaFilePen 
          className='editBtn'
          onClick={() => {
            if(item.editable){
              handleEditToggle(item.id)
            }else{
              handleEdit(item.id)
          
            }
          }}
        />
        <FaTrashCan 
          className='deleteBtn'
          onClick={() => handleDelete(item.id)}
        />
        </li>))}
      </ul>
    </main>
  )
}

export default App
