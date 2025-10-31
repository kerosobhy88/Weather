import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './usersSlice'


export default function Users() {
const { list, loading, error } = useSelector((s) => s.users)
const dispatch = useDispatch()


useEffect(() => { dispatch(fetchUsers()) }, [dispatch])


if (loading) return <div className="skeleton" style={{ height: 120, width: 200 }} />
if (error) return <p>Error: {error}</p>
return <ul>{list.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
}