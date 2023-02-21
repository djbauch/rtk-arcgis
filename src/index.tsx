import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './bootstrap.css'
import App from './App'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  LoaderFunction,
  ActionFunction
} from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/Root'

import { Provider } from 'react-redux'
import { store } from './app/store'

// MUI's default typography relies only on these. See https://mui.com/material-ui/getting-started/installation/
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Index from './routes/Index'
import ErrorPage from './routes/ErrorPage'
import { Item, loader as itemLoader } from './routes/Item'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="/" path="/" element={<Root />} errorElement={<ErrorPage />} loader={rootLoader} action={rootAction}>
      <Route errorElement={<ErrorPage />} />
      <Route index={true} element={<Index />} />
      <Route path="items/:itemId"
      element={<Item />}
      loader = {itemLoader as unknown as LoaderFunction}
      />
    </Route>
  ])
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>
)
