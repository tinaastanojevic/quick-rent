import React from 'react'
import Navbar from './Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import CategoryEquipmentsPage from './CategoryEquipmentsPage'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import CreateEquipmentPage from './CreateEquipmentPage'
import AdminRequests from './AdminRequests'
import RequireAuth from './RequireAuth'
import OwnerProfile from './OwnerProfile'
import EquipmentPage from './EquipmentPage'

function App() {
    return (
        <div className=''>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/category/:category' element={<CategoryEquipmentsPage />} />

                    <Route element={<RequireAuth allowedRoles={["Admin", "Owner", "Customer"]} />}>
                        <Route path='/profile/:ownerUsername' element={<OwnerProfile />} />
                        <Route path='/equipment/:id' element={<EquipmentPage />} />

                    </Route>
                    <Route element={<RequireAuth allowedRoles={["Admin", "Owner"]} />}>
                        <Route path='/addEquipment' element={<CreateEquipmentPage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                        <Route path='/admin' element={<AdminRequests />} />
                    </Route>


                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App