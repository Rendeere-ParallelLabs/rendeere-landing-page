'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const AssistantShowcase = dynamic(() => import('@/app/showcase/AssistantShowcase'), { ssr: false })
const GamingShowcase = dynamic(() => import('@/app/showcase/GamingShowcase'), { ssr: false })
const TourShowcase = dynamic(() => import('@/app/showcase/TourShowcase'), { ssr: false })
const LabShowcase = dynamic(() => import('@/app/showcase/LabShowcase'), { ssr: false })

type Project = {
  id: string
  title: string
  description: string
  image: string
  category: ('engineering' | 'gaming' | 'xr' | 'ai')[]
  tags: string[]
}

const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Meet Sarah',
    description: 'Sarah is powered by cutting-edge open-source and XR technologies. She sees, understands, and helps navigate both virtual and real environments.',
    image: '/videos/Sarah_face.mp4',
    category: ['engineering', 'ai'],
    tags: ['XR', 'Computer Vision', 'Animation', 'AI Assistant', 'Open Source', '3D']
  },
  {
    id: 'proj2',
    title: 'Next-Gen AI Gaming',
    description: 'Rendeere merges creativity and technology to create immersive worlds through games, AI, and cutting-edge rendering techniques.',
    image: '/videos/Gaming.mp4',
    category: ['gaming'],
    tags: ['Multiplayer', 'Procedural Generation', 'Physics', ' 3D and XR', 'AI driven']
  },
  {
    id: 'proj3',
    title: 'XR Tours and Patrimony Reconstruction',
    description: 'We offer reconstruction of heritage environments in XR using photogrammetry, generative AI, spatial sound, and other techniques, for innovative immersive tourism.',
    image: '/videos/Tour.mp4',
    category: ['xr'],
    tags: ['XR', 'Holograms', '3D', 'Multiplayer', 'Collaboration'], 
  },
  {
    id: 'proj4',
    title: 'Research Laboratory',
    description: 'Our innovation area researches hologram technologies and immersive experiences, fostering a collaborative environment where ideas are valued and developed.',
    image: '/videos/Laboratory.mp4',
    category: ['engineering', 'ai'],
    tags: ['Electronics', 'Programming', 'Holograms', 'Collaboration','Industrial', 'AI', 'Gaming']
  }
]
const isVideo = (src: string) => {
  return src.match(/\.(mp4|webm|ogg)$/i);
};

const ProjectCard = ({ project, onViewProject }: { project: Project; onViewProject: (projectId: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      layout
      className="h-full"
    >
      <CardContainer className="w-full h-full min-h-100 max-h-[32rem]">
        <CardBody className="relative w-full h-100 rounded-xl overflow-hidden bg-transparent group/card">
          <CardItem translateZ={60} className="relative z-10 w-full h-full">
            <Card className="frosted-card overflow-hidden h-full flex flex-col bg-transparent shadow-none min-h-96 max-h-[32rem]">
              <div className="relative h-90 md:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                {isVideo(project.image) ? (
                  <video
                    src={project.image}
                    className="w-full h-full object-cover object-top min-h-mobile-vid"
                    autoPlay loop muted playsInline
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="bg-custom-deep-blue"
                    loading="lazy"
                  />
                )}
              </div>
              <CardHeader className="px-6 pb-2">
                <CardTitle className="text-xl text-white">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 h-80 py-2 flex-grow">
                <p className="text-gray-300 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-custom-teal/20 text-custom-mint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6">
                <Button
                  variant="ghost"
                  className="text-custom-turquoise hover:text-custom-teal hover:bg-custom-teal/10 w-full"
                  onClick={() => onViewProject(project.id)}
                >
                  View Project
                </Button>
              </CardFooter>
            </Card>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  )
}

type TabValue = 'all' | 'engineering' | 'gaming' | 'xr' | 'ai';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const [isGamingModalOpen, setIsGamingModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(project => project.category.includes(activeTab))

  // Function to handle the click on "View Project"
  const handleViewProject = (projectId: string) => {
    if (projectId === 'proj1') { // 'proj1' is the ID de "Meet Sarah"
      setIsAssistantModalOpen(true);
    } else if (projectId === 'proj2') { // 'proj2' is the ID de "Next-Gen AI Gaming"
      setIsGamingModalOpen(true);
    } else if (projectId === 'proj3') { // 'proj3' is the ID de "XR Tours and Patrimony Reconstruction"
      setIsTourModalOpen(true);
    } else if (projectId === 'proj4') { // 'proj4' is the ID de "Research Laboratory"
      setIsLabModalOpen(true);  
    } else {
      // Here you can manage navigation to other project pages if needed.
      console.log("Ver proyecto:", projectId);
      //router.push(`/projects/${projectId}`); // Example if we had dynamic routes
    }
  };
  return (
    <>
      <section id="projects" className="py-24 px-4 bg-gradient-to-b from-custom-deep-blue/40 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            >
              Our <span className="gradient-text">Projects</span> ⚒️
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Explore our latest projects across engineering, gaming, XR, and artificial intelligence.
            </motion.p>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={(value) => setActiveTab(value as TabValue)}
          >
            <div className="flex justify-center mb-12">
              <TabsList className="frosted-glass">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="gaming">Videogames</TabsTrigger>
                <TabsTrigger value="xr">XR</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                <AnimatePresence>
                  {filteredProjects.map(project => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      onViewProject={handleViewProject}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>

{/*           <div className="flex justify-center mt-12">
            <Button className="bg-custom-teal hover:bg-custom-blue text-white px-8 py-6">
              View All Projects
            </Button>
          </div> */}
        </div>
      </section>
      <AssistantShowcase 
        isOpen={isAssistantModalOpen} 
        onClose={() => setIsAssistantModalOpen(false)} 
      />
      <GamingShowcase 
        isOpen={isGamingModalOpen} 
        onClose={() => setIsGamingModalOpen(false)} 
      />
      <TourShowcase 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
      />
      <LabShowcase 
        isOpen={isLabModalOpen} 
        onClose={() => setIsLabModalOpen(false)} 
      />
    </>
  )
}