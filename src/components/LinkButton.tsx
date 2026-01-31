import Link from "next/link";

export default function LinkButton({ label, link, width }: { label: string, link: string, width: string }) {
    return (
        <Link href={link} target="_blank" className={`${width} bg-gray-200 dark:bg-secondary hover:bg-gray-300 dark:hover:bg-accent duration-300 border-1 border-gray-300 dark:border-accent px-2 py-1.5s text-lg font-medium text-gray-800 dark:text-white flex items-center justify-center rounded-lg`}>
            {label}
        </Link>
    );
}
