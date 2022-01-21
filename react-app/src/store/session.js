// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

// thunks
export const login = (username, password, player) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            player
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {}
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (username, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return
    }
    dispatch(setUser(data))
}


const initialState = {users: {playerOne: null, playerTwo: null}}
let newState;
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            newState = { users: { ...state.users} }

            if (action.payload.player === 'Player One'){
                newState.users["playerOne"] = action.payload.user
                return newState
            }
            if (action.payload.player === 'Player Two'){
                newState.users["playerTwo"] = action.payload.user
                return newState
            }

        case REMOVE_USER:
            newState = { users: { ...state.users} }
            newState.users["playerOne"] = null
            newState.users["playerTwo"] = null
            return newState
        default:
            return state;
    }
}
