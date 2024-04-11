import { useAppSelector } from "../store";

export function TodoList(){

  const todo = useAppSelector(store => store.todo);
  return (
    <ul>
      {todo.map(i=> <li>{i}</li>)}
    </ul>
  )
}