//action handlers
const GET_USERS = "user/GET_USER"
const EDIT_USER = "user/EDIT_USER"

const getUserAction = (users) => ({
    type: GET_USERS,
    payload: users
})

const editUserAction = (data) => ({
    type: EDIT_USER,
    payload: data
})

//Thunks
export const get_all_user = () => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    if (response.ok){
        const data = await response.json();
        //note: should return {"users": [user.to_dict() for user in users]}
        dispatch(getUserAction(data.users))
    } else {
        return {}
    }
}

export const get_users_for_game= () => async (dispatch) => {
    const response = await fetch(`/api/users/?player=${playerId}&opponent=${opponentId}`)
    if (response.ok){
        const data = await response.json();
        //note: should return {"users": [user.to_dict() for user in users]}
        dispatch(getUserAction(data.users))
    } else {
        return {}
    }
}

export const record_game_wins = (playerId) => async (dispatch) => {
    const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({playerId})
    })
    const data = await response.json();
    dispatch(editUserAction(data.user))

}



//Reducer
const initialState = { users: {} }
let newState;
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return { users: NormalizeUser(action.payload) }
        case EDIT_USER:
            newState = { users: { ...state.users} }
            newState.users[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
