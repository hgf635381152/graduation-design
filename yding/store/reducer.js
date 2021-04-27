import ActionTypes from './actionTypes';


const defaultState = {
    userId: '',
    userName: '',
    isLogin: false
}
const { USER_LOGIN } = ActionTypes

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName,
                isLogin: true
            }
        
        default:
            return state
    }
}