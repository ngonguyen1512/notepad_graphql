import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/system'
import './firebase/config.jsx'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Container maxWidth='100%' sx={{ textAlign: 'center', padding: '0 !important' }}>
      <RouterProvider router={router} />
    </Container>
  // </React.StrictMode>,
)
