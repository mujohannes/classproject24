import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Logout( props ) {
    const navigate = useNavigate()

    useEffect( () => {
        signOut( props.authapp )
        .then( () => {
            // take the user back to home page
            navigate("/")
        } )
        .catch( (error) => { console.log(error) } )
    } )

    return(
        <div></div>
    )
}