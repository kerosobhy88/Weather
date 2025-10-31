import { useTodoStore } from './useTodoStore'


export default function TodoList() {
const { todos, addTodo, removeTodo } = useTodoStore()
return (
<div>
<button onClick={() => addTodo('Learn Zustand')}>Add</button>
{todos.map((t) => (
<div key={t.id}>
{t.text} <button onClick={() => removeTodo(t.id)}>x</button>
</div>
))}
</div>
)
}