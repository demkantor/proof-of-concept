
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
    yield takeEvery('GET_LIST', getList);
    yield takeEvery('REMOVE_TASK', removeTask);
    yield takeEvery('ADD_TASK', addTask);
}

function* getList(){
    console.log('saga get')
    const mainList = yield axios.get('/api/list');
    console.log('saga GET list: ', mainList.data);
    yield put({type: 'SET_LIST', payload: mainList.data})
}

function* addTask(list){
  yield console.log('add task', list.payload)
    try {
        yield axios.post('/api/list', list);
        yield put({type: 'GET_LIST'})
    } catch(error){
        console.log(error);
    }
}

function* removeTask(id){
  yield console.log('remove saga', id)
    try {
        yield axios.delete(`/api/list/${id.payload}`);
        yield put({type: 'GET_LIST'})
    } catch(error){
        console.log(error);
    }
}


const mainListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST':
            return action.payload;
        default:
            return state;
    }
}


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
      mainListReducer,
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, 
    document.getElementById('root'));