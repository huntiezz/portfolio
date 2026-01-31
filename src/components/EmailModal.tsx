import Modal from "@/components/Modal";
import { Mail } from "lucide-react";

interface EmailModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    email: string;
}

export default function EmailModal({ open, setOpen, email }: EmailModalProps) {
    const subject = "Hello from your website";
    const body = "Hi, I came from your website";

    const emailServices = [
        {
            name: "Gmail",
            icon: <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail" className="w-6 h-6" />,
            url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        },
        {
            name: "Outlook",
            icon: <img src="https://outlook.live.com/favicon.ico" alt="Outlook" className="w-6 h-6" />,
            url: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        },
        {
            name: "Yahoo Mail",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#6001D2" />
                    <path d="M14.5 7L12 12L9.5 7H7L10.5 14V17H13.5V14L17 7H14.5Z" fill="white" />
                </svg>
            ),
            url: `https://compose.mail.yahoo.com/?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        },
        {
            name: "iCloud Mail",
            icon: <img src="https://www.icloud.com/favicon.ico" alt="iCloud" className="w-6 h-6" />,
            url: `https://www.icloud.com/mail/`,
        },
        {
            name: "Mailto",
            icon: (
                <Mail className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ),
            url: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        },
    ];

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Me</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Choose your preferred email service to send me a message:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {emailServices.slice(0, 4).map((service) => (
                        <a
                            key={service.name}
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg hover:bg-gray-200 dark:hover:bg-[#252525] hover:border-gray-400 dark:hover:border-[#555] transition-all group"
                            onClick={() => setOpen(false)}
                        >
                            <div className="flex-shrink-0">{service.icon}</div>
                            <span className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                                {service.name}
                            </span>
                        </a>
                    ))}
                </div>
                <a
                    href={emailServices[4].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg hover:bg-gray-200 dark:hover:bg-[#252525] hover:border-gray-400 dark:hover:border-[#555] transition-all group"
                    onClick={() => setOpen(false)}
                >
                    <div className="flex-shrink-0">{emailServices[4].icon}</div>
                    <span className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                        {emailServices[4].name}
                    </span>
                </a>
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Email:</strong> {email}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        All options will pre-fill: "{body}"
                    </p>
                </div>
            </div>
        </Modal>
    );
}
