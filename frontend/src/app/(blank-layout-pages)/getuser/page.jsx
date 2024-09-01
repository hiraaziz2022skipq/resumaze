'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('access_token')
      if (!token) {
        router.push('/login')
        return
      }
      try {
        const response = await fetch('http://localhost:8000/api/auth/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await response.json()
        console.log(data)
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
        // router.push('/login')
      }
    }
    fetchUser()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return <div>Welcome, {user.name}</div>
}

export default Page
