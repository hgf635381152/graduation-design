import { createStore } from 'redux';
import reducer from './reducer';


function createMyStore(initialState = defaultState) {
    const MyStore = createStore(reducer, initialState);
    return MyStore
}

export default createMyStore
