import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { getAutharizationAsync } from 'src/@core/services/autharization.service';
import { AuthContext } from 'src/context/AuthContext'
import Error401 from 'src/pages/401';

type GuardProps = {
    children: ReactNode,
}

export default function Guard({children} : GuardProps) {
    const {user} = useContext(AuthContext);
    const [autharized, setAutharized] = useState(false)
    useEffect(()=>{
        if(user){
            getAutharizationAsync((user._id?.toString()), ['ADMIN']).then(response => setAutharized(response.length > 0))
        }
    }, [user])
    if(user){
        if(autharized){
            return (<>{children}</>)
        } else {
        return (<Error401/>)
        }
    } else {
        return (<>{children}</>)
    }
}
