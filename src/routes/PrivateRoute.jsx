import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import React from 'react'
import { AuthContext } from '../providers/AuthProvider'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <div>loading....</div>
  }

  if (user) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute