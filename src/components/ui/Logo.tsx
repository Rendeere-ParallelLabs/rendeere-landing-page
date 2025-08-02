"use client";

import Image from "next/image";

interface LogoProps {
  smallSize?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
  showTagline?: boolean;
  inline?: boolean;
}

export function Logo({
  smallSize = false,
  size = "medium",
  showTagline = false,
  inline = false,
  animated = true,
  staticGradient = false,
}: LogoProps & { animated?: boolean; staticGradient?: boolean }) {
  const mounted = true; // Always mounted

  if (!mounted) {
    return (
      <div className={inline ? "flex items-center space-x-2" : "flex flex-col items-center"}>
        <div className="w-16 h-16 opacity-0" />
        <h1 className="text-3xl font-bold opacity-0">Rendeere</h1>
      </div>
    );
  }

  // Determine text size based on props
  let textSize = "";
  if (smallSize) textSize = "text-xl";
  else if (size === "small") textSize = "text-xl";
  else if (size === "medium") textSize = "text-3xl";
  else if (size === "large") textSize = "text-5xl md:text-6xl";
  else if (size === "xlarge") textSize = "text-5xl md:text-6xl";
  else if (size === "xxlarge") textSize = "text-4xl md:text-5xl";

  // Logo sizes (Tailwind)
  const logoSizes = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24 md:w-32 md:h-32",
    xlarge: "w-32 h-32 md:w-40 md:h-40",
    xxlarge: "w-48 h-48 md:w-60 md:h-60",
  };
  const logoSizeClass =
    smallSize ? logoSizes.small : logoSizes[size as keyof typeof logoSizes] ?? logoSizes.medium;

  // Clases de animación para versión animada (Hero) y estática (Navbar/ Footer)
  const logoAnimClass = "engineering-animated-gradient-logo";
  const textAnimClass = "engineering-animated-gradient-text";

  // Logo estático: imagen
  const logoImg = (      <Image
      src="/images/logo/logo.webp"
      alt="Rendeere logo"
      width={64}
      height={64}
      className={logoSizeClass}
      priority={size === "small" || size === "medium"}
      loading={size === "small" || size === "medium" ? "eager" : "lazy"}
      quality={90}
    />
  );

  // Para el texto, si se desea animado se añade la clase correspondiente
  let textClass = "font-bold";
  if (animated) textClass += " " + textAnimClass;
  else if (staticGradient) textClass += " gradient-text";

  return (
    <div className={inline ? "flex items-center space-x-2" : "flex flex-col items-center"}>
      {animated ? (
        <>
          {/* 1) Logo animado: div con máscara y degradado en movimiento */}
          <div className={`${logoSizeClass} ${logoAnimClass}`} />
          {/* 2) Texto animado */}
          <h1 className={`${textSize} font-bold ${textAnimClass}`}>
            Rendeere<span className="text-xs align-super">TM</span>
          </h1>
        </>
      ) : (
        <>
          {/* Versión estática: imagen y texto con degradado fijo */}
          {logoImg}
          <h1 className={`${textSize} ${textClass}`}>
            Rendeere<span className="text-xs align-super">TM</span>
          </h1>
        </>
      )}
      {(showTagline || (!smallSize && size === "medium")) && (
        <p
          className={`text-xs ${size === "xlarge" ? "text-sm md:text-base" : ""} tracking-widest mt-1 text-zinc-400`}
        >
          CREATING THE THINGS WE WISH EXISTED
        </p>
      )}
    </div>
  );
}
