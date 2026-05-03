import { Fragment, ReactNode } from 'react'
import { Dialog, TransitionChild, DialogPanel } from '@headlessui/react'

export default function Modal({ children, open, setOpen }: { children: ReactNode, open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Dialog open={open} transition as="div" className="relative z-[150]" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            aria-hidden
                            className="fixed inset-0 z-[1] bg-black/25 backdrop-blur-[2px] transition-opacity dark:bg-black/35 dark:backdrop-blur-[3px]"
                        />
                    </TransitionChild>

                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-0 translate-y-4 sm:translate-y-0"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-0 translate-y-4 sm:translate-y-0"
                    >
                        <DialogPanel className="relative z-[2] mx-4 my-8 max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-[52rem] transform overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.06] transition-all dark:border-white/[0.12] dark:bg-[#1e1e26] dark:shadow-[0_28px_100px_rgba(0,0,0,0.55)] dark:ring-white/[0.08] md:p-6 sm:m-8">
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    )
}