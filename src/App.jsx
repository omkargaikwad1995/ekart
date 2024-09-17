import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import AuthLayout from './layout/AuthLayout'
import AdminLayout from './components/admin-component/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-component/layout'
import NotFound from './pages/not-found/notFound'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page/Unauth'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'

function App() {

  // const isAuthenticated = false;
  // const user = {
  //   name:"omkar",
  //   role:"admin"
  // }

  const {user, isAuthenticated, isLoading} =useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>.....Loading</div>;

  // console.log(isLoading, user);

  return (
    <div className='flex flex-1 overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <AuthLayout/>
        </CheckAuth>}>
          <Route path='signin' element={<Signin/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>
        <Route path='/admin' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout/>
        </CheckAuth>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='products' element={<AdminProducts/>}/>
        </Route>
        <Route path='/shop' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout/>
        </CheckAuth>}>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='account' element={<ShoppingAccount/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/unauth-page' element={<UnauthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
