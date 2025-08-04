import React, { useState, Fragment, useEffect } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Button, buttonVariants } from "./button";
import { DemoForm } from "../modals/book-demo";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

const MODALS = {
  "book-demo": <DemoForm />,
};

export type ModalType = keyof typeof MODALS;

interface ModalButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  modal: ModalType;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  arrow?: boolean;
}

export const ModalButton = ({
  className,
  variant = "default",
  size = "default",
  modal,
  children,
  asChild = false,
  arrow = false,
  ...props
}: ModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalContent = MODALS[modal];

  return (
    <>
      <Button
        className={cn(className, "cursor-pointer")}
        variant={variant}
        size={size}
        asChild={asChild}
        arrow={arrow}
        onClick={openModal}
        {...props}
      >
        {children}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 py-12 text-center flex flex-col items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-950 shadow-xl rounded-xl">
                <button
                  type="button"
                  className="absolute top-4 right-4 z-10 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={closeModal}
                >
                  <X className="h-4 w-4 cursor-pointer" />
                  <span className="sr-only">Close</span>
                </button>
                <div className="p-6 bg-background">{modalContent}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
