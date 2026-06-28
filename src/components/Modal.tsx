import { Fragment, ReactNode } from "react";
import { Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { modalShell } from "@/components/portfolio/cardUi";

export default function Modal({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} transition as="div" className="relative z-[150]" onClose={() => setOpen(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div aria-hidden className="fixed inset-0 z-[1] bg-black/50 dark:bg-black/70" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <DialogPanel className={modalShell}>{children}</DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  );
}
