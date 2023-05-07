import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface AccountState {
    value: string
}

const initialState: AccountState = {
    value: ""
}

export const accountSlice = createSlice({
    name: 'account',
    initialState, 
    reducers: {
        setAccount: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const {setAccount} = accountSlice.actions
export default accountSlice.reducer