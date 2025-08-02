'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Button } from '@/components/ui/button'

type FeatureCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay: number
}

const FeatureCard = ({ title, description, icon, color, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <CardContainer className="w-full h-full">
        <CardBody className="relative w-full h-70 rounded-xl overflow-hidden bg-transparent group/card">
          <CardItem translateZ={60} className="relative z-10 w-full h-full">
            <Card className="frosted-card h-full overflow-hidden bg-transparent shadow-none">
              <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
                    {icon}
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-gray-300">{description}</p>
              </CardContent>
{/*               <CardFooter>
                <Button variant="ghost" className="text-custom-turquoise hover:text-custom-teal hover:bg-custom-teal/10">
                  Learn more
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
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </CardFooter> */}
            </Card>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  )
}

export function FeaturesSection() {
  const features = [
    {
      title: "Engineering",
      description: "Cutting-edge engineering solutions powered by precision and innovation, designed to solve complex problems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-custom-blue">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      color: "bg-custom-blue",
      delay: 0.1
    },
    {
      title: "Videogames",
      description: "Immersive gaming experiences that push the boundaries of storytelling, graphics, and player engagement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-custom-teal">
          <rect width="20" height="12" x="2" y="6" rx="2" />
          <path d="M12 18v4" />
          <path d="M8 22h8" />
          <circle cx="12" cy="12" r="2" />
          <path d="M8 12h.01" />
          <path d="M16 12h.01" />
        </svg>
      ),
      color: "bg-custom-teal",
      delay: 0.2
    },
    {
      title: "Flat & XR Experiences",
      description: "Revolutionary flat, augmented and virtual reality solutions that transform how users interact with digital content.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-custom-turquoise">
          <path d="M6 14h12" />
          <path d="M6 10h8" />
          <path d="M3 20V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1" />
          <path d="M2 23h5v-5l8-8h2" />
          <path d="M19 7v2" />
        </svg>
      ),
      color: "bg-custom-turquoise",
      delay: 0.3
    },
    {
      title: "Artificial Intelligence",
      description: "Advanced AI solutions that learn, adapt, and evolve to provide intelligent insights and automation capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-custom-mint">
          <path d="M12 2a8 8 0 0 1 8 8v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a8 8 0 0 1 8-8Z" />
          <path d="M9 19v-5a1 1 0 0 0-1-1H5" />
          <path d="M15 19v-5a1 1 0 0 1 1-1h3" />
          <path d="M9 9h6" />
        </svg>
      ),
      color: "bg-custom-mint",
      delay: 0.4
    }
  ]

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-black to-custom-deep-blue/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Our <span className="gradient-text">Technologies</span> 🔧
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We combine cutting-edge technologies to create innovative solutions
            that push the boundaries of what's possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
