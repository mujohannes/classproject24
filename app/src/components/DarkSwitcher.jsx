import Form from 'react-bootstrap/Form'
import { useState, useEffect} from 'react'

export function DarkSwitcher( props ) {
    const [ checked, setChecked ] = useState()
    let prefLoaded = false

    const htmlElement = document.querySelector('html')


    useEffect( () => {
        if( checked ) {
            htmlElement.setAttribute('data-bs-theme','dark')
            storePref('themepref','dark')
        }
        else {
            htmlElement.setAttribute('data-bs-theme','light')
            storePref('themepref','light')
        }
    },[checked])

    useEffect( () => {
        if( !prefLoaded ) {
            const pref = readPref('themepref')
            console.log( pref )
            if( pref == 'dark' ) {
                setChecked(true)
            }
            else {
                setChecked(false)
            }
            prefLoaded = true
        }
    }, [prefLoaded])


    const storePref = (name,value) => {
        if( window.localStorage ) {
            window.localStorage.setItem(name,value)
        }
    }
    const readPref = (name) => {
        if( window.localStorage ) {
            const pref = window.localStorage.getItem(name)
            return pref
        }
        else {
            return false
        }
    }
    
    return(
        <Form >
            <Form.Check 
                type='switch'
                id='theme-switch'
                label='dark mode'
                checked={checked}
                onChange={ (event) => (checked) ? setChecked(false) : setChecked(true) }
                className="text-light"
            />
        </Form>
    )

}