import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../lib/api'


export const fetchUsers = createAsyncThunk('users/fetch', async () => {
const { data } = await api.get('/users')
return data
})


const usersSlice = createSlice({
name: 'users',
initialState: { list: [], loading: false, error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchUsers.pending, (s) => { s.loading = true })
.addCase(fetchUsers.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
.addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.error.message })
}
})


export default usersSlice.reducer