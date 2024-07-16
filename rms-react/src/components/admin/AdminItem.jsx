import React from 'react'
import AdminCustomCategory from './AdminCategory/AdminCustomCategory'
import AdminCustomCompany from './AdminCompany/AdminCustomCompany'
import AdminCustomJob from './AdminJob/AdminCustomJob'
// import Category from '../user/categories/Category'

const AdminItem = () => {
    return (
        <>
            <AdminCustomCategory />
            <AdminCustomCompany />
            <AdminCustomJob />
        </>
    )
}

export default AdminItem