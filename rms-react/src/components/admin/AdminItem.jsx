import React from 'react'
import AdminCustomCategory from './AdminCategory/AdminCustomCategory'
import AdminCustomCompany from './AdminCompany/AdminCustomCompany'
import AdminCustomJob from './AdminJob/AdminCustomJob'
import AdminCustomBan from './AdminBan/AdminCustomBan'
// import Category from '../user/categories/Category'

const AdminItem = () => {
    return (
        <>
            <AdminCustomCategory />
            <AdminCustomCompany />
            <AdminCustomJob />
            <AdminCustomBan />
        </>
    )
}

export default AdminItem