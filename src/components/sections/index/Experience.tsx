import ExperienceCard from "@/components/ExperienceCard";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Experience() {
    const cardsRef = useRef<HTMLUListElement>(null);

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

    return (
        <>
            <section id='experience' className="max-w-4xl w-full flex flex-col mx-auto">
                <motion.h1
                    className="text-center font-bold text-5xl mt-16 -mb-2"
                    initial={{ transform: 'translateY(-30px)', opacity: 0 }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
                    viewport={{ amount: 0.1, once: true }}
                >
                    Experience
                </motion.h1>
                <ul ref={cardsRef} className={`flex flex-col pt-6 pb-1 gap-4 overflow-hidden`}>


                    <ExperienceCard
                        url="https://swiftly.gg/"
                        title="Swiftly.gg"
                        fullDescription={[
                            "Founded and currently building Swiftly.gg, a custom e-commerce platform focused on streamlined online sales.",
                            "Designing, developing, and managing the full tech stack, including frontend, backend, and AI-driven tools.",
                            "Gaining hands-on experience in entrepreneurship, product development, and scaling a digital platform."
                        ]}
                        cardImage="https://swiftly.gg/favicon.png"
                        cardDescription={<>Founder of <a className="underline hover:text-white transition-all" href="https://swiftly.gg/" target="_blank">Swiftly.gg</a>, an e-commerce platform where I manage development, design, and AI integration. Building hands-on experience in entrepreneurship and digital product scaling.</>}
                        media={["https://files.catbox.moe/mqypag.png"]}
                        myRole="Founder"
                        timeline="October 2025 - Present"
                        delay={0.1}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://www.bytehack.net/"
                        title="ByteHack"
                        fullDescription={[
                            "Developing and maintaining ByteHack, a private forum software and cheating community.",
                            "Managed a growing community of 400+ users and 100+ active threads.",
                            "Focused on forum feature development, security, and platform stability.",
                            "Btw, landing page looks ugly cause I only focused on forum."
                        ]}
                        cardImage="https://www.bytehack.net/logo.png"
                        cardDescription={<>Developer for <a className="underline hover:text-white transition-all" href="https://www.bytehack.net/" target="_blank">ByteHack</a>, a private cheating forum software. Managing 100+ threads and 400+ users while focusing on software development and platform stability.</>}
                        media={["https://files.catbox.moe/yosnlg.png", "https://files.catbox.moe/qnyprs.png"]}
                        myRole="Developer"
                        timeline="December 2025 - Present"
                        delay={0.2}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://safello.com/"
                        title="Safello"
                        fullDescription={[
                            "Worked as a part-time Prompt Engineer at Safello, one of Sweden's top 10 fintech companies.",
                            <>Developed and optimized AI prompts for <a className="underline hover:text-white transition-all" href="https://wutao.app" target="_blank">Wu-Tao</a>, improving efficiency and output quality.</>,
                            "Gained hands-on experience in AI-driven product development and fintech applications."
                        ]}
                        cardImage="https://files.catbox.moe/4m17zp.png"
                        cardDescription={<>Worked as a Prompt Engineer at Safello, contributing to AI prompt development for <a className="underline hover:text-white transition-all" href="https://wutao.app" target="_blank">Wu-Tao</a>. Gained practical experience in AI-driven product development within a leading fintech environment.</>}
                        media={["https://files.catbox.moe/v66m59.png"]}
                        myRole="Prompt Engineer"
                        timeline="October 2025 - January 2026"
                        delay={0.3}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://safello.com/"
                        title="Safello"
                        fullDescription={[
                            "Completed a 1-week internship at one of Sweden's top 10 fintech companies.",
                            "Worked as a QA Intern, contributing to quality assurance processes.",
                            "Gained valuable experience in a professional fintech environment."
                        ]}
                        cardImage="https://files.catbox.moe/4m17zp.png"
                        cardDescription="Completed a 1-week internship as a QA Intern at Safello, one of Sweden's top 10 fintech companies. Gained insight into professional QA testing/fintech industries."
                        media={[]}
                        myRole="QA Intern"
                        timeline="September 2025 - October 2025"
                        delay={0.4}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://pagesnlhybrid.vercel.app/"
                        title="Nlhybrid"
                        fullDescription={[
                            "Developed the official website and the C# web view UI.",
                            "Nlhybrid was a server-side in-game skin switcher.",
                            "The community grew to 118k Discord members and achieved millions of views."
                        ]}
                        cardImage="https://files.catbox.moe/9km011.png"
                        cardDescription="Developed the website and C# web view UI for Nlhybrid, a popular server-side in-game skin switcher with 118k Discord members and millions of views."
                        media={["https://files.catbox.moe/1ggqx8.mp4"]}
                        myRole="Developer"
                        timeline="April 2025 - Oct 2025"
                        delay={0.5}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://luminacheats.com/"
                        title="Lumina Cheats"
                        fullDescription={[
                            "Owned and developed a Counter Strike 2 cheat software in C++.",
                            <>Partnered with <a className="underline hover:text-white transition-all" href="https://undetek.com" target="_blank">Undetek</a> (20k+ members) for marketing.</>,
                            "Focused on internal software development while partner handled other aspects."
                        ]}
                        cardImage="https://files.catbox.moe/00ubl5.webp"
                        cardDescription={<>Co-owned and developed an internal C++ cheat for Counter Strike 2. Partnered with <a className="underline hover:text-white transition-all" href="https://undetek.com" target="_blank">Undetek</a> regarding marketing.</>}
                        media={["https://luminacheats.com/wp-content/uploads/2025/06/free-cs2-cheats.webp"]}
                        myRole="Co-Owner & Developer"
                        timeline="June 2025 - August 2025"
                        delay={0.6}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://webhookwizardy.vercel.app/"
                        title="Webhook Wizardy"
                        fullDescription={[
                            "My first ever website, created as a webhook spammer tool.",
                            "Built as a learning project to understand web development basics.",
                            "Deployed on Vercel."
                        ]}
                        cardImage="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
                        cardDescription="A webhook spammer website, my first ever website. Created to learn the basics of web development."
                        media={["https://files.catbox.moe/ym7uoc.png"]}
                        myRole="Developer"
                        timeline="April 2025"
                        delay={0.65}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://ohioskibiditoilet.mysellauth.com/"
                        title="Encryption"
                        fullDescription={[
                            "Founded and operated a Fortnite cheat selling business.",
                            "Successfully earned $4,000 in revenue during the operational period.",
                            "Collaborated closely with a developer to maintain and improve the product."
                        ]}
                        cardImage="https://imagedelivery.net/HL_Fwm__tlvUGLZF2p74xw/a617759f-4172-4bf8-bf1d-b4fd6e150800/public"
                        cardDescription="Founded and operated a Fortnite cheat selling business from September to December 2024. Earned $4,000 in revenue and worked alongside a developer to deliver quality services."
                        media={["https://files.catbox.moe/u72n31.png"]}
                        myRole="Founder"
                        timeline="Sept 2024 - Dec 2024"
                        delay={0.7}
                        gradient="bg-gradient-to-br"
                    />

                </ul>
            </section>
        </>
    );
}
