import React from "react";
import { useState } from "react";

const Menu = () =>{

  const [user,setInput] = useState('');
  const [veracidad,setveracidad] = useState(false);
  const [finaluser,setfinal] = useState('');
  const [password,setpassword] = useState('');
  const enviarRequest =  async(e) =>{
    e.preventDefault();
    console.log(user);
    try{
      const response = await fetch(`http://localhost:8000/getuser?usuario=${user}`,{
        method : 'GET',
      });
      if(!response.ok){
        console.log("Error HTTP");
      }
      else{
        const data = await response.json();
        console.log(data);
        setveracidad(true);
        setfinal(data[0].usuario)
        setpassword(data[0].impuesto);
      }
    } catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="App">
      <h3>Base de Datos</h3>
      <section className="main-container">
        <form>
            <input type='box' value={user} onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={e => enviarRequest(e)}>Buscar</button>
        </form>
        {veracidad && <section className='response'>
          <p>{finaluser}</p>
          <p>{password}</p>
        </section>
        }
      </section>
    </div>
  );
}

export default Menu;