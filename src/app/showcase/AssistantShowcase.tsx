"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AssistantShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssistantShowcase({ isOpen, onClose }: AssistantShowcaseProps) {
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
                src="/videos/Sarah-Demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground italic">
              Sarah. Your assistant, seamlessly embedded into real life. Coming soon to Meta Quest 3/3S devices.
            </p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-700">
              Meet{' '}
              <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text">Sarah</span>
              , your intelligent{' '}
              <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text">XR</span> assistant.
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
              <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text"><b>Sarah</b></span> is a <b>mixed reality assistant for Meta Quest 3 and 3S</b>, powered by fully customizable <b>open-source AI backends</b>, adaptable to any environment she's deployed in. She perceives, understands, and guides you through both virtual and real-world spaces — all while maintaining natural, <b>live voice-to-voice conversations</b>. Experience <span className="bg-gradient-to-r from-custom-blue via-custom-teal to-custom-mint text-transparent bg-clip-text"><b>Sarah</b></span> on your own, with friends, or impress clients with a personalized company tour. <b>Coming soon to Meta Quest devices.</b>
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-center">
              {[
                { imgSrc: "/images/icon/ollama.png", alt: "Ollama Logo", text: 'Powered by <span class="font-bold">Ollama</span><br />using <span class="font-bold">any custom LLM.</span>' },
                { imgSrc: "/images/icon/indoor.png", alt: "Indoor Navigation Icon", text: 'Space navigation via<br/><span class="font-bold">OpenXR.</span>' },
                { imgSrc: "/images/icon/computervision.png", alt: "Computer Vision Icon", text: 'Computer Vision<br /><span class="font-bold">Capabilities</span>' },
                { imgSrc: "/images/icon/local.jpg", alt: "Backend Options Icon", text: 'Backend <span class="font-bold">Cloud</span> or<br />fully <span class="font-bold">Local</span>' },
                { imgSrc: "/images/icon/llm.png", alt: "Customizable LLM Icon", text: 'Fully customizable<br /><span class="font-bold">LLM</span>' },
                { imgSrc: "/images/icon/opensourse.jpg", alt: "Open Source Icon", text: 'Data<br /><span class="font-bold">is fully yours.</span>' },
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
            Watch her in action!
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