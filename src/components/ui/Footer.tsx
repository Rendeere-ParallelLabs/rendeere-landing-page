'use client'

import { motion } from 'framer-motion'
import { Button } from './button'
import { Logo } from './Logo'
import Link from 'next/link'
import React from 'react'

export const Footer = React.memo(function Footer() {
  return (
    <footer className="bg-black pb-10 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size="medium" animated={false} staticGradient={true}/>
            </div>
            <p className="text-gray-400 mb-4">
              Pushing the boundaries of innovation through engineering, gaming, XR, and AI.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="/miscellaneous/warning"
                className="w-10 h-10 flex items-center justify-center rounded-full frosted-glass text-custom-teal transition-all hover:bg-custom-teal hover:text-white focus:outline focus:outline-2 focus:outline-custom-teal"
                aria-label="Visit Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="/miscellaneous/warning"
                className="w-10 h-10 flex items-center justify-center rounded-full frosted-glass text-custom-teal transition-all hover:bg-custom-teal hover:text-white focus:outline focus:outline-2 focus:outline-custom-teal"
                aria-label="Visit Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="/miscellaneous/warning"
                className="w-10 h-10 flex items-center justify-center rounded-full frosted-glass text-custom-teal transition-all hover:bg-custom-teal hover:text-white focus:outline focus:outline-2 focus:outline-custom-teal"
                aria-label="Visit Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="/miscellaneous/warning"
                className="w-10 h-10 flex items-center justify-center rounded-full frosted-glass text-custom-teal transition-all hover:bg-custom-teal hover:text-white focus:outline focus:outline-2 focus:outline-custom-teal"
                aria-label="Visit LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#technologies" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Technologies
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-custom-teal transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:technologies@rendeere.com" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/miscellaneous/warning" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/miscellaneous/warning" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Videogames
                </Link>
              </li>
              <li>
                <Link href="/miscellaneous/warning" className="text-gray-400 hover:text-custom-teal transition-colors">
                  XR Experiences
                </Link>
              </li>
              <li>
                <Link href="/miscellaneous/warning" className="text-gray-400 hover:text-custom-teal transition-colors">
                  Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
            <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Let’s Connect!</h3>
            <p className="text-gray-400 mb-6">
              Interested in our products, have a project, want to join our team, or have a question? We’d love to hear from you! Contact us to create something amazing together.
            </p>
            <a
              href="mailto:technologies@rendeere.com"
              className="inline-block"
            >
              <Button className="bg-custom-teal hover:bg-custom-blue text-white whitespace-nowrap w-full">
              Contact Us
              </Button>
            </a>
            </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Rendeere. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/miscellaneous/warning" className="text-gray-500 hover:text-custom-teal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/miscellaneous/warning" className="text-gray-500 hover:text-custom-teal transition-colors">
              Terms of Service
            </Link>
            <Link href="/miscellaneous/warning" className="text-gray-500 hover:text-custom-teal transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
})
