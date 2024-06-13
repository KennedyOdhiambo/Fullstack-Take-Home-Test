import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/mulish'
import '@fontsource/mulish/400.css'
import '@fontsource/mulish/400-italic.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
   uri: 'http://localhost:4000/',
   cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   </React.StrictMode>
)
