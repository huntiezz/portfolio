import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Modal from "@/components/Modal";

type Project = {
  title: string;
  tags: string;
  description: string;
  logo?: string;
  link?: string;
  isRed?: boolean;
  modalImage?: string;
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScrollToTop = () => {
      controls.start({
        x: 50,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeIn" }
      }).then(() => {
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut", delay: 0.1 }
        });
      });
    };

    window.addEventListener('scroll-to-top', handleScrollToTop);
    return () => window.removeEventListener('scroll-to-top', handleScrollToTop);
  }, [controls]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.getElementsByClassName("hover-card") as HTMLCollectionOf<HTMLElement>;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Donut Auction",
      tags: "Web App, Real-time",
      description: "Real-time Donut SMP auction viewer and betting platform.",
      logo: "/donutactionmedia.png",
      modalImage: "/donutactionmedia.png",
      isRed: false
    },
    {
      title: "tap.fun Waitlist",
      tags: "React, Next.js, TailwindCSS",
      description: "Unofficial waitlist landing page for tap.fun. (view the website, it looks better when taking a look)",
      logo: "/tap.funmedia.png",
      modalImage: "/tap.funmedia.png",
      link: "https://iideekk.vercel.app/",
      isRed: false
    },
    {
      title: "SurgeCheats",
      tags: "React, Next.js, TailwindCSS",
      description: "A website made for a customer. On this website i've used Sellhub's API to embed the products and allow users to purchase them.",
      modalImage: "/surgecheatsmedia.png",
      link: "https://surgecheats.fun",
      isRed: false
    },
    {
      title: "ezboosts",
      tags: "E-commerce, API Integration",
      description: "A specialized platform for Discord enhancements. Developed for a client to demonstrate the power of Swiftly's embed API, enabling seamless checkout experiences directly within external sites.",
      modalImage: "/ezboostsmedia.png",
      link: "https://ezboosts.vercel.app/",
      isRed: false
    }
  ];

  return (
    <motion.section
      id='projects'
      ref={cardsRef}
      animate={controls}
      className="max-w-4xl w-full flex flex-col mx-auto px-4 overflow-x-clip"
    >
      <motion.h1
        className="text-center font-bold text-5xl mt-24 mb-12"
        initial={{ transform: 'translateY(-30px)', opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96] }}
      >
        My Work
      </motion.h1>

      <motion.div
        className="hover-card group relative w-full bg-gray-100 dark:bg-[#111] rounded-xl border border-gray-300 dark:border-[#333] overflow-hidden mb-12"
        initial={{ transform: 'translateY(30px)', opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
        />

        <div className="p-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={index === projects.length - 1 && projects.length % 3 !== 0 && projects.length % 2 !== 0 ? "md:col-start-2" : ""}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onClick={() => {
                  if (project.modalImage) {
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="hover-card relative group h-full transition-[box-shadow] duration-200 rounded-md">
                  <div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)` }}
                  />
                  {project.link && !project.modalImage ? (
                    <Link href={project.link} className="block h-full relative z-0">
                      <ProjectCardItem project={project} />
                    </Link>
                  ) : (
                    <div className="h-full cursor-pointer relative z-0">
                      <ProjectCardItem project={project} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Modal open={selectedProject !== null} setOpen={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
            {selectedProject.modalImage && (
              <img
                src={selectedProject.modalImage}
                alt={selectedProject.title}
                className="w-full rounded-lg border border-[#333]"
              />
            )}
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {selectedProject.description}
            </p>
            {selectedProject.link && (
              <Link href={selectedProject.link} target="_blank" className="bg-white text-black font-semibold py-2 px-4 rounded-md text-center hover:bg-gray-200 transition-colors w-full">
                Visit Website
              </Link>
            )}
          </div>
        )}
      </Modal>
    </motion.section>
  );
}

function ProjectCardItem({ project }: { project: Project }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-md px-4 py-3 flex flex-row items-center justify-center hover:bg-gray-200 dark:hover:bg-[#252525] hover:border-gray-400 dark:hover:border-[#555] transition-all h-full group">
      <h3 className={`font-semibold text-sm ${project.isRed ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'} group-hover:text-gray-900 dark:group-hover:text-white transition-colors`}>
        {project.title}
      </h3>
    </div>
  )
}
