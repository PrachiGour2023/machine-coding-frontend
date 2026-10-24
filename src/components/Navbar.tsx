import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='nav-container'>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : "nav-item"}>Home</NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? "active" : "nav-item"}>Products</NavLink>
    </nav>
  )
}

export default Navbar