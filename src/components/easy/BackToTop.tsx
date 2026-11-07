import { useEffect, useState } from 'react';
import './style.css';

const data = Array.from({ length: 40 }, (_, i) => i)
const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }

    return (
        <div className='back-to-top-container'>
            {
                data.map((item) => {
                    return (
                        <p>This is a paragraph {item}</p>
                    )
                })
            }
            {isVisible && <button className='back-to-top-btn' onClick={handleScrollToTop}>Back To Top</button>}
        </div>
    )
}

export default BackToTop