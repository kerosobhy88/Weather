import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementBy } from './counterSlice'


export default function Counter() {
const value = useSelector((s) => s.counter.value)
const dispatch = useDispatch()
return (
<div>
<h3>Value: {value}</h3>
<button onClick={() => dispatch(increment())}>+1</button>
<button onClick={() => dispatch(decrement())}>-1</button>
<button onClick={() => dispatch(incrementBy(5))}>+5</button>
</div>
)
}