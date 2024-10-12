
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import BreweryPage from './components/breweries/brewery-page/BreweryPage'
import BreweryList from './components/breweries/brewery-list/BreweryList'
import BreweryDetails from './components/breweries/brewery-details/BreweryDetails'
import BrewerDashboard from './components/brewer/brewer-dashboard/BrewerDashboard'
import BrewerPage from './components/brewer/brewer-page/BrewerPage'
import AddBrewery from './components/brewer/add-brewery/AddBrewery'
import CustomerPage from './components/customer/customer-page/CustomerPage'
import CustomerProfile from './components/customer/customer-profile/CustomerProfile'
import CustomersContextProvider from './contexts/customer-context/CustomersContextProvider'
import AdminPage from './components/admin/admin-page/AdminPage'
import AdminDashboard from './components/admin/admin-dashboard/AdminDashboard'
import EditBrewery from './components/brewer/edit-brewery/EditBrewery'




function App() {

  return (
    <Router>
      <div className="app-layout">
       <Header />

      <main className="main-content">
      <CustomersContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/breweries' element={<BreweryPage />}>
            <Route index element={<BreweryList />} />
            <Route path=':breweryId' element={<BreweryDetails />} /> 
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/brewers' element={<BrewerPage />}>
          <Route path='' element={<BrewerDashboard />} />
          <Route path='add' element= {<AddBrewery />} />
          <Route path=':breweryId/edit' element={<EditBrewery/>}/>
        </Route>
        
        <Route path='/admin' element={<AdminPage/>} >
          <Route index element={<AdminDashboard />} />
        </Route>


        <Route path='/customers' element={<CustomerPage />} />
        <Route path='/profile' element={<CustomerProfile />} />

      </Routes>
      </CustomersContextProvider>
      </main>

      <footer className="custom-footer">
          &copy; getTapped 2024
        </footer>
    </div>
    </Router>
  )
}

export default App


