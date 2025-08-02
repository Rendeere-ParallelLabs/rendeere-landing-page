'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Sheet, SheetContent, SheetTrigger } from './sheet'
import { Logo } from './Logo'
import Link from 'next/link'
import React from 'react'
import { DialogTitle } from './dialog'

export const Navbar = React.memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 frosted-glass backdrop-blur-lg bg-black/50'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex-shrink-0">
          <a
            href="/"
            className="flex items-center space-x-2"
            aria-label="Go to homepage"
          >
            <Logo size="small" showTagline={false} inline animated={false} staticGradient={true} />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white hover:text-custom-teal transition-colors focus:outline focus:outline-2 focus:outline-custom-teal"
            aria-label="Navigate to Home"
          >
            Home
          </Link>
          <Link
            href="/#technologies"
            className="text-white hover:text-custom-teal transition-colors focus:outline focus:outline-2 focus:outline-custom-teal"
            aria-label="Navigate to Technologies section"
          >
            Technologies
          </Link>
          <Link
            href="/#projects"
            className="text-white hover:text-custom-teal transition-colors focus:outline focus:outline-2 focus:outline-custom-teal"
            aria-label="Navigate to Projects section"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-custom-teal transition-colors focus:outline focus:outline-2 focus:outline-custom-teal"
            aria-label="Navigate to About page"
          >
            About
          </Link>
          <a href="mailto:technologies@rendeere.com" className="inline-block">
            <Button className="bg-custom-teal hover:bg-custom-blue text-white ml-4">
              Contact Us
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-custom-teal hover:bg-transparent"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="frosted-card border-none">
              <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
              <div className="flex justify-center mb-7 mt-5">
                <Logo size="large" />
              </div>
              <nav className="flex flex-col space-y-6 pt-4">
                <Link
                  href="/"
                  className="text-lg text-white hover:text-custom-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to Home"
                >
                  Home
                </Link>
                <Link
                  href="/#technologies"
                  className="text-lg text-white hover:text-custom-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to Technologies section"
                >
                  Technologies
                </Link>
                <Link
                  href="/#projects"
                  className="text-lg text-white hover:text-custom-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to Projects section"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-lg text-white hover:text-custom-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Navigate to About page"
                >
                  About
                </Link>
                <a href="mailto:technologies@rendeere.com" className="inline-block">
                  <Button
                    className="bg-custom-teal hover:bg-custom-blue text-white w-full mt-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
})
