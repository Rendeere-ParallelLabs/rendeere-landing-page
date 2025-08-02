"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LabShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LabShowcase({ isOpen, onClose }: LabShowcaseProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card text-card-foreground rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto relative bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-x-10 gap-y-8 items-center pt-8 md:pt-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="overflow-hidden rounded-lg">
              <video
                src="/videos/Lab3.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground italic">
              Research Laboratory. Exploring the future of holograms, XR, AI, and immersive experiences.
            </p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-700">
              Research <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text">Laboratory</span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
              At <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text"><b>Rendeere</b></span>, we explore new ways of experiencing realities through the development of innovative <b>custom hardware</b>, blending cutting-edge <b>research</b> with <b>immersive technology</b>.
              <br /><br />
              Our innovation lab is dedicated to pushing the boundaries of <b>technology and creativity</b>. Here, engineers, artists, and visionaries work side by side to <b>prototype new experiences</b>, experiment with <b>electronics and programming</b>, and create the next generation of <b>interactive systems</b>. Every idea is valued, every project is a <b>step toward the future</b>.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-center">
              {[
                { imgSrc: "/images/icon/electronic.png", alt: "Electronics", text: 'Advanced<br /><span class="font-bold">Electronics</span>' },
                { imgSrc: "/images/icon/dev.png", alt: "Programming", text: 'Innovative<br /><span class="font-bold">Programming</span>' },
                { imgSrc: "/images/icon/hologram.png", alt: "Holograms", text: 'Hologram<br /><span class="font-bold">Technologies</span>' },
                { imgSrc: "/images/icon/xr.png", alt: "XR", text: 'Immersive<br /><span class="font-bold">XR Experiences</span>' },
                { imgSrc: "/images/icon/ai.png", alt: "AI", text: 'Artificial<br /><span class="font-bold">Intelligence</span>' },
                { imgSrc: "/images/icon/collaboration.png", alt: "Collaboration", text: 'Multidisciplinary<br /><span class="font-bold">Collaboration</span>' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-2 rounded-md hover:bg-accent/50">
                  <Image
                    src={item.imgSrc}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="mb-1.5"
                    loading="lazy"
                  />
                  <p
                    className="text-xs font-medium text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/#visual-showcase"
                onClick={onClose}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Discover our innovations
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}