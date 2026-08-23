import { useEffect, useRef, useState } from 'react'
import cursorImage from '../assets/images/cursor.jpg'

function Cursor() {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleMove(e) {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      if (!isVisible) setIsVisible(true)
    }

    function handleOver(e) {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true)
      }
    }

    function handleOut(e) {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mouseout', handleOut)
    }
  }, [isVisible])

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-[9999] hidden lg:block transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transform: 'translate(-4px, -2px)' }}
    >
      <img
        src={cursorImage}
        alt=""
        draggable={false}
        className={`w-7 h-7 transition-transform duration-200 ease-out drop-shadow-md select-none ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
      />
    </div>
  )
}

export default Cursor