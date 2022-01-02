import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w,
        h,
    }
}

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10 
    const shift: number = size / 4 
    const position = 'absolute'
    const background = '#indigo'
    return {
        barStyle(i : number) : CSSProperties {
            const upShift: number = shift * sinify(scale) * (1 - 2 * i)
            const left = `${w / 2 - size / 2 + upShift}px`
            const top = `${h / 2 - size / 2 + upShift}px`
            const width = `${size}px`
            const height = `${shift}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background 
            }
        }
    }
}