import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootReducer, RootState } from '@src/store/rootReducer'

// const epicMiddleware = createEpicMiddleware<any, any, any, any>({ // TODO ?
// 	dependencies: services,
// });
// function configureStore() {
// const middlewares = [epicMiddleware]
// const enhancers = composeEnhancers(applyMiddleware(...middlewares))
// return configureStore(rootReducer, {})
// }
// epicMiddleware.run(rootEpic)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
