"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TourShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TourShowcase({ isOpen, onClose }: TourShowcaseProps) {
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
                src="/videos/Tourism.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground italic">
              XR Tours & Next-Gen Game Worlds. Photogrammetry, AI, and immersive sound for the future of interactive experiences.
            </p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-700">
              XR Tours &<br />
              <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text">
                Patrimony Reconstruction
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
              We are redefining the next generation of <b>virtual tourism</b> by creating <b>real and imaginary worlds in XR</b>. Using techniques such as <b>photogrammetry, generative AI, and spatial sound</b>, we develop immersive environments for tourists and researchers to explore and interact with history and fantasy.
              <br /><br />
              Our mission is to <b>merge tourism, culture, and technology</b>, offering <b>innovative experiences</b> that transform environments into spaces of <b>exploration and adventure</b>.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-center">
              {[
                { imgSrc: "/images/icon/photo-editing.png", alt: "Photogrammetry", text: 'Real-World<br /><span class="font-bold">Photogrammetry</span>' },
                { imgSrc: "/images/icon/ai.png", alt: "AI", text: 'Generative<br /><span class="font-bold">AI Worlds</span>' },
                { imgSrc: "/images/icon/xr.png", alt: "XR", text: 'Immersive<br /><span class="font-bold">XR Gameplay</span>' },
                { imgSrc: "/images/icon/sound.png", alt: "Spatial Sound", text: 'Spatial<br /><span class="font-bold">Audio</span>' },
                { imgSrc: "/images/icon/3d.png", alt: "3D", text: 'High-Fidelity<br /><span class="font-bold">3D Assets</span>' },
                { imgSrc: "/images/icon/tourism.png", alt: "Tourism", text: 'Cultural &<br /><span class="font-bold">Tourism Experiences</span>' },
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
                Explore XR Worlds
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