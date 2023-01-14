import React from 'react';
import { routArr } from './Routing/Routing';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import URSbar from './Components/URSbar';
import URSloginPage from './Pages/URSloginPage';

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements([
    <Route
    path='/'
    element={<URSbar />}
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
    <Route path='/URSloginPage' element={<URSloginPage />} />
  ]));

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
