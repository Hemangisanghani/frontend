// react
import React, { useEffect, useState } from 'react'

// context
export const AuthContext = React.createContext()

/**
 * Auth Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setCurrentUser(token)
    } else {
      setCurrentUser('')
    }
  }, [])

  const onAuthChange = (token) => {
    setCurrentUser(token)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        onAuthChange: onAuthChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
