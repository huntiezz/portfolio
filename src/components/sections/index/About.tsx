import AboutCard from "@/components/AboutCard";
import { Tech } from "../../../../typings";
import { motion } from "framer-motion";

import { useState, useRef, useEffect } from "react";
import TechBadge from "@/components/TechBadge";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
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
  let frontendTech: Tech[] = [
    { title: "HTML", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />, link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { title: "CSS", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />, link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { title: "TailwindCSS", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />, link: "https://tailwindcss.com/" },
    { title: "Framer Motion", icon: <img alt="" draggable={false} className="h-6" src="https://r2.e-z.host/2082d908-7c65-4fc3-b02a-5f50f9141543/5q2uj9zv.png" />, link: "https://www.framer.com/motion/" },
    { title: "GSAP", icon: <img alt="" draggable={false} className="h-6" src="https://r2.e-z.host/2082d908-7c65-4fc3-b02a-5f50f9141543/zkji5ma1.png" />, link: "https://gsap.com/" },
    { title: "Three.js", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" />, link: "https://threejs.org/" },
  ]

  let frameworksTech: Tech[] = [
    { title: "React", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />, link: "https://react.dev/" },
    { title: "Next.js", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" />, link: "https://nextjs.org/" },
    { title: "Vite", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" />, link: "https://vitejs.dev/" },
    { title: "Astro", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg" />, link: "https://astro.build/" },
    { title: "Vue", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />, link: "https://vuejs.org/" },
    { title: "Svelte", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" />, link: "https://svelte.dev/" },
  ]

  let backendTech: Tech[] = [
    { title: "TypeScript", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />, link: "https://www.typescriptlang.org/" },
    { title: "JavaScript", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { title: "Node.js", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />, link: "https://nodejs.org/" },
    { title: "Supabase", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />, link: "https://supabase.com/" },
    { title: "C#", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" />, link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { title: "C++", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" />, link: "https://isocpp.org/" },
    { title: "C", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" />, link: "https://en.cppreference.com/w/c" },
    { title: "Python", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />, link: "https://python.org/" },
    { title: "Express", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />, link: "https://expressjs.com/" }
  ]

  let otherTech: Tech[] = [
    { title: "Antigravity", icon: <img alt="" draggable={false} className="h-6" src="https://brandlogos.net/wp-content/uploads/2025/12/google_antigravity-logo_brandlogos.net_qu4jc.png" />, link: "https://antigravity.google/" },
    { title: "Cursor", icon: <img alt="" draggable={false} className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Cursor_logo.png" />, link: "https://cursor.com/" },
    { title: "Windsurf", icon: <img alt="" draggable={false} className="h-6" src="https://exafunction.github.io/public/brand/windsurf-black-symbol.svg" />, link: "https://windsurf.com/" },
    { title: "Lovable", icon: <img alt="" draggable={false} className="h-6" src="https://lovable.dev/img/logo/lovable-logo-icon.png" />, link: "https://lovable.dev/" },
    { title: "Vercel", icon: <img alt="" draggable={false} className="h-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwNwDUq_S0U6wDzS60c45kVK5zpxF-03wsQ&s" />, link: "https://vercel.com/" },
    { title: "v0", icon: <img alt="" draggable={false} className="h-6" src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/v0.png" />, link: "https://v0.app/" },
    { title: "Cloudflare", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" />, link: "https://cloudflare.com/" },
    { title: "Replit", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg" />, link: "https://replit.com/" },
    { title: "Namecheap", icon: <img alt="" draggable={false} className="h-6" src="https://www.namecheap.com/assets/img/nc-icon/favicon.ico" />, link: "https://namecheap.com/" },
    { title: "Visual Studio Code", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />, link: "https://code.visualstudio.com/" },
    { title: "Visual Studio", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" />, link: "https://visualstudio.microsoft.com/" },
    { title: "Claude Code", icon: <img alt="" draggable={false} className="h-6" src="https://hieufromwaterloo.ca/post/claude-code-complete-guide/featured.jpg.png" />, link: "https://code.claude.com" },
    { title: "Git", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />, link: "https://git-scm.com/" },
    { title: "Github", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />, link: "https://github.com/" },
    { title: "Linear", icon: <img alt="" draggable={false} className="h-6" src="https://images.seeklogo.com/logo-png/48/2/linear-icon-logo-png_seeklogo-483921.png" />, link: "https://linear.app/" },
    { title: "Windows", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" />, link: "https://www.microsoft.com/windows/" },
    { title: "Mac", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" />, link: "https://www.apple.com/mac/" },
    { title: "Linux", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />, link: "https://www.linux.org/" },
    { title: "ChatGPT", icon: <img alt="" draggable={false} className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" />, link: "https://chat.openai.com/" },
    { title: "Shadcn", icon: <img alt="" draggable={false} className="h-6" src="https://ui.shadcn.com/favicon.ico" />, link: "https://ui.shadcn.com/" }
  ]


  const [activeTab, setActiveTab] = useState<'frontend' | 'frameworks' | 'backend' | 'other'>('frontend');



  return (
    <>
      <section id='about' ref={containerRef} className="max-w-4xl w-full flex flex-col mx-auto">
        <motion.h1
          className="text-center font-bold text-5xl mt-16"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          About Me
        </motion.h1>
        <div className="flex flex-col gap-4 mt-4">
          <motion.div
            className="w-full"
            initial={{ transform: 'translateY(-30px)', opacity: 0 }}
            whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
            viewport={{ amount: 0.1, once: true }}
          >
            <AboutCard
              title="My Journey"
              description={<>I’m a 15-year-old Prompt Engineer with a passion for technology and software development. At 13, I discovered Fortnite hacks, which sparked my curiosity in systems, kernels, and problem-solving. By 14, I launched my own service, earning $4,000, an early lesson in entrepreneurship.
                <br /><br />
                In 2025, my dad introduced me to web development, leading to an internship as a QA tester at Safello, one of Sweden’s top fintech companies. I later became a part-time Prompt Engineer, working on <a className="underline hover:text-white transition-all" href="https://wutao.app" target="_blank">Wu-Tao</a>. Currently, I’m building my own digital ecommerce platform, <a className="underline hover:text-white transition-all" href="https://swiftly.gg" target="_blank">Swiftly</a>, while continually growing my skills and pushing myself to create technology that matters.</>}
              direction="top"
              span={2}
              delay={0.1}
              gradient="bg-gradient-to-tl"
            />
          </motion.div>


          <motion.div
            className="hover-card group relative sm:p-8 p-6 w-full bg-gradient-to-br from-primary to-secondary rounded-lg border-1 border-accent shadow-2xl shadow-background"
            initial={{ transform: 'translateY(30px)', opacity: 0 }}
            whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.39, 0.21, 0.12, 0.96], }}
            viewport={{ amount: 0.1, once: true }}
          >
            <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
              style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)` }}
            />

            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-200 dark:bg-black/20 rounded-lg backdrop-blur-sm relative z-20">
              <button
                onClick={() => setActiveTab('frontend')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'frontend'
                  ? 'bg-gray-400 dark:bg-white/20 text-gray-900 dark:text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-white/10'
                  }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setActiveTab('frameworks')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'frameworks'
                  ? 'bg-gray-400 dark:bg-white/20 text-gray-900 dark:text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-white/10'
                  }`}
              >
                Frameworks
              </button>
              <button
                onClick={() => setActiveTab('backend')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'backend'
                  ? 'bg-gray-400 dark:bg-white/20 text-gray-900 dark:text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-white/10'
                  }`}
              >
                Backend
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'other'
                  ? 'bg-gray-400 dark:bg-white/20 text-gray-900 dark:text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-white/10'
                  }`}
              >
                Tools
              </button>
            </div>


            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[200px] relative z-20"
            >
              {activeTab === 'frontend' && (
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Frontend Development</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
                    I create engaging user interfaces with modern frameworks and creative technologies. My frontend work focuses on interactive experiences, smooth animations, and responsive design that works beautifully across all devices.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {frontendTech.map((tech, index) => (
                      <motion.a
                        key={tech.title}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-card relative flex items-center gap-2 p-3 bg-gray-300 dark:bg-white/10 rounded-lg hover:bg-gray-400 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                          style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)` }}
                        />
                        <div className="flex-shrink-0 relative z-20">{tech.icon}</div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white/90 truncate relative z-20">
                          {tech.title}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'frameworks' && (
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Frameworks & Libraries</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
                    I leverage powerful frameworks and libraries to build scalable, high-performance web applications. This enables me to develop complex features efficiently while maintaining clean and maintainable code.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {frameworksTech.map((tech, index) => (
                      <motion.a
                        key={tech.title}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-card relative flex items-center gap-2 p-3 bg-gray-300 dark:bg-white/10 rounded-lg hover:bg-gray-400 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                          style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)` }}
                        />
                        <div className="flex-shrink-0 relative z-20">{tech.icon}</div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white/90 truncate relative z-20">
                          {tech.title}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'backend' && (
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Backend Development</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
                    I build robust server-side solutions and APIs that power creative applications. My backend experience includes databases, cloud services, and scalable architectures for digital products.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {backendTech.map((tech, index) => (
                      <motion.a
                        key={tech.title}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-card relative flex items-center gap-2 p-3 bg-gray-300 dark:bg-white/10 rounded-lg hover:bg-gray-400 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                          style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)` }}
                        />
                        <div className="flex-shrink-0 relative z-20">{tech.icon}</div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white/90 truncate relative z-20">
                          {tech.title}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'other' && (
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Tools & Technologies</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-4 leading-relaxed">
                    My creative toolkit includes design software, development tools, cloud platforms, and emerging technologies that help bring innovative ideas to life.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {otherTech.map((tech, index) => (
                      <motion.a
                        key={tech.title}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-card relative flex items-center gap-2 p-3 bg-gray-300 dark:bg-white/10 rounded-lg hover:bg-gray-400 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                          style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)` }}
                        />
                        <div className="flex-shrink-0 relative z-20">{tech.icon}</div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white/90 truncate relative z-20">
                          {tech.title}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>


        </div>
      </section>
    </>
  );
}
