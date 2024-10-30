import { useEffect, useState, useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'
export function Profile( props ) {
    //const [userProfile,setUserProfile] = useContext( ProfileContext)
    //const profile = useContext( ProfileContext )
    useEffect( () => console.log(props.data ) )
    return(
        <div>
            
        </div>

    )
}