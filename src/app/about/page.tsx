"use client";

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Footer } from '@/components/ui/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from '@/components/ui/Logo';
import { motion } from 'framer-motion';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function TeamMember({
  image,
  name,
  title,
  bio,
  linkedinUrl,
}: {
  image: string;
  name: string;
  title: string;
  bio: string;
  linkedinUrl?: string;
}) {
  const cardClasses = "frosted-card overflow-hidden h-full flex flex-col text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card className={cardClasses}>
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-[3/4]">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-custom-mint">{title}</p>
          </div>
        </div>
        <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
          <p className="text-gray-300 mb-4 flex-grow">{bio}</p>
          {linkedinUrl && (
            <div className="mt-auto pt-4 border-t border-white/10">
               <SocialIcon href={linkedinUrl}>
                <LinkedinIcon className="w-5 h-5" />
                <span className="ml-2">LinkedIn</span>
              </SocialIcon>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SocialIcon({
  href = "#",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      className="rounded-md bg-custom-teal/10 border-custom-teal/50 text-custom-mint hover:bg-custom-teal/30 hover:text-white hover:border-custom-teal w-full justify-start"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center">
        {children}
      </a>
    </Button>
  );
}

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Rendeere</title>
        <meta name="description" content="About Rendeere: who we are, our mission, vision, and passionate team at the forefront of immersive technology." />
      </Head>

      <main className="bg-background text-foreground pt-10 md:pt-16">
        
        <section className="relative py-24 sm:py-32 text-center overflow-hidden bg-gradient-to-b from-custom-deep-blue/50 via-background to-background mt-7 sm:mt-0">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex justify-center"
            >
              <Logo size="xxlarge" showTagline={false} inline={false} animated={true} staticGradient={true}/>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 engineering-animated-gradient-text"
            >
              Meet the <span className="gradient-text">Rendeere</span> Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300"
            >
              Rendeere is an innovative tech company focused on creating immersive experiences that merge the digital and physical worlds.
                Our team brings together expertise in AI, XR, and 3D design to develop cutting-edge solutions.

                We are passionate about exploring the frontiers of technology to build tools and worlds that once only lived in the imagination—always striving to deliver real, tangible value to our clients, users and gamers.
            </motion.p>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0f1e33] via-background to-[#0f1e33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl font-bold mb-16 text-center engineering-animated-gradient-text"
            >
              Our Leadership
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <TeamMember
                image="/images/team/gines.png"
                name="Ginés Díaz Chamorro"
                title="CEO & Head of Strategy and Creative Technology"
                bio="Telecommunications Engineer specialized in electronics. Holds a Master’s in Artificial Intelligence and a Master’s in Telecommunications Engineering. Passionate about 3D design, game engines, extended reality, and virtual worlds. After leading the proof-of-concept “Aurora” — an AI + XR assistant — he now heads R&D projects that blend electronics, AI, photogrammetry, and immersive experiences based on high-fidelity 3D rendering. At Rendeere, he bridges business vision and technology, manages partnerships, and fosters sustainable innovation. (Also a bit of an Open Source geek, Pianist and music production freak) 😉"
                linkedinUrl="https://www.linkedin.com/in/gines-diaz-chamorro/"
              />
              <TeamMember
                image="/images/team/isaac.png"
                name="Isaac Nahaniel Silva Urbina"
                title="Director of Engineering & CTO"
                bio="Mechatronics Engineer with a Master’s in AI and a sharp instinct for building — from prototypes to scalable immersive systems. At Rendeere, he leads the engineering vision with strong roots in electronics, control, and 3D environments, bridging industrial logic with digital innovation across XR, AI, and simulation. Curious by nature and passionate about invention, he transforms ideas into functional tech — from local LLMs to spatial interfaces — always blending technical precision with creative thinking. (Also a low-key futurist, tech explorer, nature enthusiast, and animal lover 🐾🌱🤖)"
                linkedinUrl="https://www.linkedin.com/in/isaac-nahaniel-silva-urbina-0685b3100/"
              />
	      <TeamMember
                image="/images/team/lucia.png"
                name="Lucía María López Peñalver"
                title="Chief Marketing Officer (CMO) & Digital Strategy Director"
                bio="Digital Communication Specialist with a Master’s in Digital Marketing and a background in Interactive Media. Passionate about storytelling, technological innovation, and the power of generative AI to transform how we communicate. With experience in teaching, journalism, and marketing, she bridges strategy and creativity to build purpose-driven brands. At Rendeere, she leads marketing and sales, shaping the company’s value proposition around AI-powered interactive 3D worlds and positioning it at the crossroads of XR, immersive storytelling, and scalable innovation.
(Also a lover of photography, anime, rock music, and cats — actively involved in a local feline rescue organization 📸🎸🐾)"
		linkedinUrl="https://www.linkedin.com/in/luciamarialopezpenalver/"
              />

            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Our Mission</h3>
              <div className="frosted-card p-6 sm:p-8 rounded-xl shadow-xl">
                <p className="text-lg text-gray-300">
                  To drive the fusion of digital and physical worlds through interactive 3D experiences that combine artificial intelligence, mixed reality, and advanced rendering — creating real value for businesses, educational institutions, and consumers, while fostering a work environment where talent can truly thrive.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay:0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Our Vision</h3>
              <div className="frosted-card p-6 sm:p-8 rounded-xl shadow-xl">
                <p className="text-lg text-gray-300">
                  To be the global reference in immersive innovation: the company that redefines how we learn, work, and entertain ourselves, enabling anyone to interact with information and virtual environments as seamlessly
                  as in the real world.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-20 sm:py-28 text-center bg-gradient-to-t from-custom-deep-blue/40 via-background to-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl sm:text-5xl font-extrabold mb-6 engineering-animated-gradient-text"
            >
              Experience Reality, <span className="gradient-text">Reimagined.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-xl text-gray-300 mb-10"
            >
              Join us in shaping the future of immersive technology. Explore opportunities to collaborate, join our team, or be among the first to experience our latest innovations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Button
                asChild
                className="bg-custom-teal hover:bg-custom-blue text-white px-10 py-7 text-lg font-semibold"
              >
                <a href="mailto:technologies@rendeere.com" className="inline-block">Get in Touch</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

