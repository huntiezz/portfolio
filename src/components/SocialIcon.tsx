import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

export default function SocialIcon({ url, icon, delay, onClick }: { url: string, icon: ReactNode, delay: number, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <>
      <motion.li
        className="flex flex-col"
        initial={{ transform: 'translateY(-30px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
        transition={{ duration: 0.5, delay: delay, ease: [0.39, 0.21, 0.12, 0.96], }}
        viewport={{ amount: 0.1, once: true }}
      >
        <Link
          draggable={false}
          href={url}
          target="_blank"
          className="p-2 bg-gray-200 dark:bg-secondary hover:bg-gray-300 dark:hover:bg-accent border-1 border-gray-300 dark:border-accent rounded-lg duration-300"
          onClick={onClick}
        >
          {icon}
        </Link>
      </motion.li>
    </>
  );
}
