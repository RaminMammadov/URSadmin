import React, { useEffect, useState } from 'react';
import { routArr } from './Routing/Routing';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import URSbar from './Components/URSbar';
import URSloginPage from './Pages/URSloginPage';
import axios from 'axios';
import Loading from './Components/Loading';
export default function App() {
  axios.defaults.withCredentials = true;
  const [isLogged, setLogged] = useState(false);
  const [userData, setUserData] = useState('');
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    axios.post(`https://185.48.182.52/v1/checkAuth`, {}).then(response => {
      console.log(response)
      if (response.data.isLogged) {
        setLogged(true)
      } else {
        setLogged(false)
      }
    }).catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const router = createBrowserRouter(createRoutesFromElements([
    <Route
      path='/'
      element={
        isLoading ? <Loading /> :
          isLogged ? <URSbar setLoading={setLoading} setLogged={setLogged} userData={userData} /> : <URSloginPage setUserData={setUserData} setLogged={setLogged} setLoading={setLoading} />
      }
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
