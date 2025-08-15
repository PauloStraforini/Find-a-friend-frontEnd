import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { routeTree } from './routeTree.gen'
import { queryClient } from './lib/react-query.ts'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Cria o router
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Tipagem do router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render do App
const rootElement = document.getElementById('root') || document.getElementById('app')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </StrictMode>
  )
}

reportWebVitals()
