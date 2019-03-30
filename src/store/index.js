import {createStore,applyMiddleware} from "redux";
import rootReducer from "../reducer";
import createSagaMiddleware from "redux-saga";
import saga from '../saga'

const SagaMiddleware = createSagaMiddleware()

let store = createStore(rootReducer,applyMiddleware(SagaMiddleware));
SagaMiddleware.run(saga)

export default store;
