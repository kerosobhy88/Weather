import { memo, useState, useCallback } from 'react'


const Item = memo(({ text, onClick }) => {
console.log('Render:', text)
return <button onClick={onClick}>{text}</button>
})


export default function PerformanceDemo() {
const [count, setCount] = useState(0)
const handleClick = useCallback(() => setCount((c) => c + 1), [])


return (
<div>
<Item text="Click me" onClick={handleClick} />
<p>Count: {count}</p>
</div>
)
}