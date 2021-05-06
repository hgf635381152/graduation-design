import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage  from 'redux-persist/lib/storage'

const defaultState = {
    userId: 0,
    userName: 0,
    isLogin: false
}

const persistConfig = {
    key: 'root', // 必须有的
    storage: AsyncStorage , // 缓存机制

}

const persistedReducer = persistReducer(persistConfig, reducer)

function createMyStore(initialState = defaultState) {
    const store = createStore(persistedReducer, initialState, applyMiddleware(ReduxThunk))
    return store
}

export default createMyStore
