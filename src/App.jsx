import React, { useState } from 'react';
import { routArr } from './Routing/Routing';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import URSbar from './Components/URSbar';
import URSloginPage from './Pages/URSloginPage';
import axios from 'axios';

export default function App() {
  axios.defaults.validateStatus = function() {
    return true; // this wont throw error whatever the response code is
    // the default is `return status >= 200 && status < 300;`
  };

  const [isLogged,setLogged] = useState(false)
  const router = createBrowserRouter(createRoutesFromElements([
    <Route
    path='/'
    element={isLogged ? <URSbar /> : <URSloginPage setLogged={setLogged}/>}
      children={
        routArr.map((item, index) => {
          return <Route
            key={index} 
            path={item.path}
            element={item.component}
          />
        })
        
      }

    />,
    // <Route path='/URSloginPage' element={<URSloginPage />} />
  ]));

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
