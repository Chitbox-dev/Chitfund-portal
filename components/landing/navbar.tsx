import type React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  const navigationItems = [
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ]

  return (
    <nav>
      <ul>
        {navigationItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
