import { FormEvent, useState } from "react"

export function AddTodo(){

  const [newTodo, setNewTodo] = useState('')

  function handeNewTodo(e:FormEvent){
    e.preventDefault();
    console.log(newTodo);
  }

  return(
    <form onSubmit={handeNewTodo}>
      <input type="text" placeholder="Novo to-do" value={newTodo} onChange={(e)=> setNewTodo(e.target.value)}/>
      <button type="submit">Adicionar</button>
    </form>
  )
}