import { create } from 'zustand'


export const useTodoStore = create((set) => ({
todos: [],
addTodo: (text) => set((s) => ({ todos: [...s.todos, { id: Date.now(), text }] })),
removeTodo: (id) => set((s) => ({ todos: s.todos.filter(t => t.id !== id) })),
}))