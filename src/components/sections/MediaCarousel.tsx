'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'

type MediaItem = {
  src: string
  alt?: string
  title?: string
  type?: 'image' | 'youtube'
}

type MediaCarouselProps = {
  items: MediaItem[]
  autoPlay?: boolean
  interval?: number
}

export function MediaCarousel({
  items,
  autoPlay = true,
  interval = 5000,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [playedVideos, setPlayedVideos] = useState<Record<number, boolean>>({})
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap())
    carouselApi.on('select', onSelect)
    setCurrentIndex(carouselApi.selectedScrollSnap())
    return () => {
      carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi || !isAutoPlaying) return

    const intervalId = setInterval(() => {
      if (!carouselApi) return
      const nextIndex = (carouselApi.selectedScrollSnap() + 1) % items.length
      carouselApi.scrollTo(nextIndex)
    }, interval)

    return () => clearInterval(intervalId)
  }, [isAutoPlaying, interval, items.length, carouselApi])

  const handlePause = () => setIsAutoPlaying(false)
  const handleResume = () => setIsAutoPlaying(true)

  return (
    <section id="visual-showcase" className="py-16 px-4 bg-gradient-to-b from-black to-custom-deep-blue/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Visual <span className="gradient-text">Showcase</span> 📺
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            A gallery of our work, innovations, and creative achievements.
          </motion.p>
        </div>

        <div
          className="w-full"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          <Carousel
            className="w-full"
            opts={{ align: 'center', loop: true }}
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index} className="md:basis-2/3 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="frosted-card overflow-hidden">
                      <div className="aspect-video overflow-hidden relative">
                        {item.type === 'youtube' ? (
                          playedVideos[index] ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${item.src.split('v=')[1].split('&')[0]}?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0`}
                              title={item.title || 'YouTube Video'}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div
                              className="relative w-full h-full cursor-pointer group"
                              onClick={() => {
                                setPlayedVideos(prev => ({ ...prev, [index]: true }))
                                setIsAutoPlaying(false)
                              }}
                            >
                              <Image
                                src={`https://img.youtube.com/vi/${item.src.split('v=')[1].split('&')[0]}/hqdefault.jpg`}
                                alt={item.title || 'Video thumbnail'}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transform group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300">
                                <svg className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )
                        ) : (
                          <Image
                            src={item.src}
                            alt={item.alt || 'Carousel image'}
                            fill
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                            className="transform group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {item.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h3 className="text-white text-lg font-medium">{item.title}</h3>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-2 justify-between">
              <CarouselPrevious className="frosted-glass border-custom-teal text-custom-teal" />
              <CarouselNext className="frosted-glass border-custom-teal text-custom-teal" />
            </div>
          </Carousel>

          <div className="flex justify-center mt-8 gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-custom-teal w-6' : 'bg-white/30'
                }`}
                onClick={() => {
                  carouselApi?.scrollTo(idx)
                  setIsAutoPlaying(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}