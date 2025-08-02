"use client";

import dynamic from 'next/dynamic';

// Dynamically import sections
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection').then(mod => mod.FeaturesSection), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection').then(mod => mod.ProjectsSection), { ssr: false });
const MediaCarousel = dynamic(() => import('@/components/sections/MediaCarousel').then(mod => mod.MediaCarousel), { ssr: false });
const Footer = dynamic(() => import('@/components/ui/Footer').then(mod => mod.Footer), { ssr: false });

// Sample images for the carousel - using static paths instead of random unsplash
// This data can be passed as props if needed, or kept here if it's static for this content
const carouselImages = [
  {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=5cSaVAUWKcI',
    alt: 'Sarah, your custom XR NPC.',
    title: 'Sarah, your custom XR NPC for Meta Quest devices.'
  },
  {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=MuXvQke1Cjs',
    alt: 'XR Tours',
    title: 'XR Tours for Meta Quest devices.'
  },
  {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=8xhK67IUe8s',
    alt: 'Meet Deere',
    title: 'Meet Deere — the guide and soul of our upcoming indie game, currently in development.'
  },
  {
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=h6HJO47JAfQ',
    alt: 'Sarah Multilingual - Agent Assistant',
    title: 'Sarah, your agentic and multilingual assistant.'
  }
];

export default function ClientPageContent() {
  return (
    <>
      <div id="technologies">
        <FeaturesSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="showcase">
        <MediaCarousel items={carouselImages} />
      </div>

      <Footer />
    </>
  );
}
