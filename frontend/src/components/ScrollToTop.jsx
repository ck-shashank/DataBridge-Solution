import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const { hash } = location

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const id = hash.substring(1)

    const scrollToElement = () => {
      const element = document.getElementById(id)
      if (element) {
        const yOffset = -100 // header height
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset

        window.scrollTo({ top: y, behavior: 'smooth' })
      } else {
        // retry until DOM is ready
        requestAnimationFrame(scrollToElement)
      }
    }

    scrollToElement()
  }, [location.key]) // 🔥 THIS IS THE KEY

  return null
}

export default ScrollToTop
