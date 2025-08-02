'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Logo } from '@/components/ui/Logo'
import { useState, useEffect } from 'react'

// Lazy load Scene with no SSR for performance
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => mod.Scene), { 
  ssr: false, 
  loading: () => <span />
})

export function HeroSection() {
  const [logoSize, setLogoSize] = useState<'xlarge' | 'xxlarge'>("xxlarge");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLogoSize(window.innerWidth < 768 ? "xlarge" : "xxlarge");
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgroundForest_blur.webp"
          alt="Forest background"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

      {/* Three.js Canvas for 3D elements */}
      <div className="absolute inset-0 z-10 opacity-90">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          {/* Large Logo */}
          <div className="flex justify-center mb-8 mt-1 sm:mt-0">
            <Logo 
              showTagline={true} 
              size={logoSize} 
              inline={false} 
              animated={true} 
              staticGradient={false}
            />
          </div>
          {/* Tagline */}

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Shaping the Future of <span className="gradient-text">3D Rendering</span> and <span className="gradient-text">AI</span> for <span className="gradient-text">you.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-sm md:text-lg text-gray-300 mb-8"
          >
            We build cutting-edge 3D worlds powered by AI—designed for XR, desktop, consoles, and beyond.
            Through R&D and design, we create immersive environments that unlock new ways to experience digital realities—for gamers, businesses, and visionaries.
            <br></br>If <span className="gradient-text">you can imagine it</span>, we can <span className="gradient-text">build it.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-row gap-4 justify-center flex-wrap"
          >
            <a href="#projects">
              <Button className="bg-custom-teal hover:bg-custom-blue text-white px-6 py-4 md:px-8 md:py-6 text-sm md:text-lg">
                See What We Build 👀
              </Button>
            </a>
            <a href="mailto:technologies@rendeere.com" className="inline-block">
              <Button
                variant="outline"
                className="border-custom-teal text-custom-teal hover:bg-custom-teal/10 px-6 py-4 md:px-8 md:py-6 text-sm md:text-lg"
              >
                Contact Us 📞
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-1"
            >
              <motion.div
                className="w-1 h-2 bg-custom-teal rounded-full"
              />
            </motion.div>
            {/* <p className="text-sm text-gray-400 mb-2 sm:ml-4">Scroll to discover</p> */}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
