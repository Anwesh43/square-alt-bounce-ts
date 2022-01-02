import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface SABProps {
    w : number, 
    h : number ,
    scale : number, 
    onClick : Function
}
const SquareAltBounce = (props : SABProps) => {
    const {barStyle} = useStyle(props.w, props.h, props.scale)
    return <React.Fragment>
        {[0, 1].map( i => 
            (<div key = {`bar_${i}`} onClick = {() => props.onClick()} style = {barStyle(i)}>
            </div>)
        )}
    </React.Fragment>
}

export default withContext(SquareAltBounce)