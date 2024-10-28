import { useEffect, useState, useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'
export function Profile( props ) {
    const profile = useContext( ProfileContext)
    useEffect( () => console.log(profile) )
    return(
        <div>
        
        </div>

    )
}