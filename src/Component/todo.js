import React from 'react'
import {useState,useEffect} from 'react';
import '../App.css';

const getData = () => {
    const list = localStorage.getItem("myList");
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const[inputData,setInputData] = useState();
    const[item,setItem] = useState(getData());
    const[isEdit,setEdit] = useState("");
    const[isToggle,setToggle] = useState(false);

    const addItem = () => {
        if(!inputData){
            alert("Please Add Data")
        }
        else if(inputData && isToggle){
            setItem(
                item.map((currElem)=> {
                    if(currElem.id === isEdit){
                        return {...currElem,name: inputData}
                    }
                    return currElem;
                })
            )
            setInputData("");
            setToggle(false);
        }
        else{
            const newData = {
                id: new Date().getTime().toString(),
                name:inputData
            }
            setItem([...item,newData]);
            setInputData("");

        }
    }

    const editItem = (index) => {
        const item_todo = item.find((e)=> {
            return e.id === index;
        })
        setEdit(index);
        setInputData(item_todo.name);
        setToggle(true)
    }

    const deleteItem = (index) => {
        const updateItem = item.filter((currElem)=>{
            return currElem.id !== index;
        })
        setItem(updateItem);
       
    }

    const removeAll = () => {
        setItem([]);
    }

    useEffect(() => {
        localStorage.setItem("myList", JSON.stringify(item));
    },[item])

    return (
        <>
           <div className = "main-div">
               <div className = "todo-div">
                    <div>
                        <div className = "image">
                            <img src = "todo.png" alt = "Todo-Logo"/>
                        </div>
                        <p>Add Your List Here</p>
                    </div>
                    <div className = "main-content">
                        <div className = "addItem">
                            <input type = "text" placeholder = "Add Item" className = "form-control"
                            value = {inputData} onChange = {(e) => setInputData(e.target.value)} 
                            />
                            {isToggle ?(
                                <i className="fa fa-edit add-btn" onClick = {addItem}></i>
                                ):
                                (
                                <i className="fa fa-plus add-btn" onClick = {addItem}></i>
                                )}
                        </div>
                        <div className ="show-item">
                        {item.map((currElem) => {
                            return(
                                <div className ="eachItem" key = {currElem.id}>
                                    <h5>{currElem.name}</h5>
                                    <div className ="todo-btn">
                                        <i className="fa fa-edit edit-btn" onClick = {()=> editItem(currElem.id)}></i>
                                        <i className="fa fa-trash-alt dlt-btn"onClick = {() => deleteItem(currElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}        
                        </div>
                        <div className ="remove">
                            <button className ="remove-all" onClick = {removeAll}>
                                CHECK LIST
                            </button>
                        </div>
                    </div>
               </div>
           </div> 
        </>
    )
}

export default Todo
