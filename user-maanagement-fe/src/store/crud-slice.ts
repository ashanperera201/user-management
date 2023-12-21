
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  data: null,
}


export const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    modalClose: (state) => {
      state.type = ''
      state.data = null
    },
    modalCreate: (state) => {
      state.type = 'create'
      state.data = null
    },
    modalEdit: (state, action) => {
      state.type = 'edit'
      state.data = action.payload
    }

  }
})

export default crudSlice.reducer
export const {modalClose, modalCreate, modalEdit} = crudSlice.actions
