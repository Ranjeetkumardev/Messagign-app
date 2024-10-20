import React from 'react'
import { useGetUserByIdQuery } from '../features/apiSlice'

const fetchUserData = () => {
    const {data : userdata , isLoading , error  }  = useGetUserByIdQuery()

    if(isLoading) return <div>Loading..</div>
    if(error) return <div>{error}</div>
  return (
    <>
        {userdata ? userdata : <div>unable to fetch user data </div>}
    </>
  )
}

export default fetchUserData