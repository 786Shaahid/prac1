import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
function App() {
  const [user,setUser]=useState("");
  useEffect(()=>{
   const  fetchData= async ()=>{
          const res= await axios.get('/get')  ;
          console.log(res.data);
          setUser(res.data)
     }
     fetchData();
  },[])

  return (
    <div className="App">
      <h1>hii,{user.message}</h1>
    </div>
  );
}

export default App;
