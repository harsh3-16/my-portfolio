"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Skeleton } from "./ui/Skeleton";
import { Modal } from "./ui/Modal";
import toast from "react-hot-toast";

function WorkCard({ project }: { project: any }) {
  const card = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use contextSafe (best practice for React 19 / GSAP events)
  const onEnter = () => {
    gsap.to(image.current, {
      scale: 1.05,
      filter: "grayscale(0%)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(image.current, {
      scale: 1,
      filter: "grayscale(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    toast.success(`Opening ${project.title} overview`, {
      icon: '✨',
    });
  };

  return (
    <>
      <div
        ref={card}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleOpenModal}
        className="group cursor-pointer w-full"
      >
        <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] mb-6 rounded-md">
          {/* SKELETON LAYER: Shows while image loads */}
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 z-10 w-full h-full" />
          )}

          {/* Image Container */}
          <div
            ref={image}
            className="w-full h-full relative grayscale transition-all duration-500 ease-out"
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Gradient Overlay for atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Year Badge */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1 border border-white/20 rounded-full backdrop-blur-md bg-black/30">
            <span className="text-xs text-white/80 font-mono">
              {project.year}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <h2 className="text-4xl font-oswald font-bold uppercase text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
              {project.title}
            </h2>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              {project.category}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <span className="text-lg leading-none mb-1">↗</span>
          </div>
        </div>
      </div>

      {/* UNIVERSAL MODAL for Project Details */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-oswald font-bold uppercase tracking-tight text-white mb-2">
              {project.title}
            </h3>
            <div className="flex gap-4 text-sm text-neutral-400 font-mono mb-4">
              <span>{project.year}</span>
              <span>•</span>
              <span className="uppercase">{project.category}</span>
            </div>
            <p className="text-neutral-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>
          <div className="mt-8 flex justify-center pb-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-8 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Close Project
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WorkCard;
