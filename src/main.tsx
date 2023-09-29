
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </ChakraProvider>
  // </React.StrictMode>,
)
