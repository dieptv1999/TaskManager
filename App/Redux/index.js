import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import common from './Common'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  common,
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
