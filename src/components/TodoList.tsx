import { useSelector } from "react-redux"

export function TodoList(){

  const todo = useSelector(store => store.todo);
  return (
    <ul>
      {todo.map(i=> <li>{i}</li>)}
    </ul>
  )
}