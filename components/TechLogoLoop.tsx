"use client"

import LogoLoop from './LogoLoop';
import Image from 'next/image';

const techLogos = [
  {
    src: "/svg/apple.svg",
    alt: "Apple",
    title: "Apple",
    href: "https://apple.com"
  },
  {
    src: "/svg/samsung.svg",
    alt: "Samsung",
    title: "Samsung",
    href: "https://samsung.com"
  },
  {
    src: "/svg/adidas.svg",
    alt: "Adidas",
    title: "Adidas",
    href: "https://adidas.com"
  },
  {
    src: "/svg/nike.svg",
    alt: "Nike",
    title: "Nike",
    href: "https://nike.com"
  },
  {
    src: "/svg/bmw.svg",
    alt: "BMW",
    title: "BMW",
    href: "https://bmw.com"
  },
  {
    src: "/svg/puma.svg",
    alt: "Puma",
    title: "Puma",
    href: "https://puma.com"
  },
  {
    src: "/svg/nikon.svg",
    alt: "Nikon",
    title: "Nikon",
    href: "https://nikon.com"
  },
  {
    src: "/svg/unilever.svg",
    alt: "Unilever",
    title: "Unilever",
    href: "https://unilever.com"
  },
];

export default function TechLogoLoop() {
  return (
    <div style={{ height: '60px', position: 'relative', overflow: 'hidden' }}>
      <LogoLoop
        logos={techLogos}
        speed={80}
        direction="left"
        logoHeight={48}
        gap={60}
        hoverSpeed={20}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology and brand partners"
      />
    </div>
  );
}
