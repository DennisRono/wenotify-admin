import { combineReducers } from 'redux'
import { configureStore, Middleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '@/store/slices/auth-slice'
import analyticsReducer from '@/store/slices/analytics'
import reportsReducer from '@/store/slices/crime-reports'
import commentsReducer from '@/store/slices/comments'
import evidenceReducer from '@/store/slices/evidence'
import locationsReducer from '@/store/slices/locations'
import notificationsReducer from '@/store/slices/notifications'
import usersReducer from '@/store/slices/users'
import { authApi } from '@/store/services/auth-api'
import { persistReducer, persistStore } from 'redux-persist'
import storage from './useWebStorage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["authApi"],
}

const allReducers = combineReducers({
  auth: authReducer,
  analytics: analyticsReducer,
  reports: reportsReducer,
  comments: commentsReducer,
  evidence: evidenceReducer,
  locations: locationsReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  [authApi.reducerPath]: authApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, allReducers)

export const makeStore = () => {
  const store: any = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(authApi.middleware as Middleware<{}, RootState>),
  })

  setupListeners(store.dispatch)

  return store
}

export const store = makeStore()

export const persistor = persistStore(store)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
