"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GamingShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GamingShowcase({ isOpen, onClose }: GamingShowcaseProps) {
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
                src="/videos/Gaming2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground italic">
              Next-Gen AI Gaming. Worlds powered by Unreal Engine 5, Unity, Godot, XR and AI.
            </p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-700">
              Welcome to the <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text">Gaming Division</span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
              We are a creative hub where imagination meets <b>advanced technology</b>. We don’t just develop games — we build <b>worlds</b> and <b>stories</b> that evolve with you. Leveraging modern <b>game engines</b>, immersive <b>flat & XR experiences</b>, and the power of <b>artificial intelligence</b>, we craft <b>intuitive</b> and emotionally resonant <b>interactive worlds</b>.
              <br /><br />
              At <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text"><b>Rendeere</b></span>, we believe that <b>fine-tuned LLMs</b> can truly create <b>meaningful connections between humans and NPCs</b>.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-center">
              {[
                { imgSrc: "/images/icon/modelo-3d.png", alt: "Engine", text: 'Next gen<br /><span class="font-bold">Game Engines</span>' },
                { imgSrc: "/images/icon/xr.png", alt: "XR", text: 'Immersive<br /><span class="font-bold">XR Experiences</span>' },
                { imgSrc: "/images/icon/ai.png", alt: "AI", text: 'Conversational<br /><span class="font-bold">AI Integration</span>' },
                { imgSrc: "/images/icon/3d.png", alt: "3D", text: 'High-Fidelity<br /><span class="font-bold">3D Worlds</span>' },
                { imgSrc: "/images/icon/screen.png", alt: "Screen", text: 'Flat Screen<br /><span class="font-bold">Cross-platform Games</span>' },
                { imgSrc: "/images/icon/ai-generativa.png", alt: "AI-Generativa", text: 'Adaptive Games<br /><span class="font-bold">Interactive Worlds Powered by AI</span>' }

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
                Explore Demo
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