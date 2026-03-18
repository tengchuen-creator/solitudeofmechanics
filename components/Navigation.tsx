'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/') ? 'active' : ''

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link href="/" className="nav-logo">
        Solitude of Mechanics
      </Link>
      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button className="nav-close" onClick={() => setMenuOpen(false)}>
          Close
        </button>
        <li>
          <Link
            href="/collection"
            className={isActive('/collection')}
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </Link>
        </li>
        <li>
          <Link
            href="/essays"
            className={isActive('/essays')}
            onClick={() => setMenuOpen(false)}
          >
            Essays
          </Link>
        </li>
        <li>
          <Link
            href="/manufacturers"
            className={isActive('/manufacturers')}
            onClick={() => setMenuOpen(false)}
          >
            Manufacturers
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={isActive('/about')}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
