'use client';

import { ReactNode, useCallback, useEffect, useState } from "react";

import Button from "@/@core/components/Button/index";
import { cn } from "@/lib/utils";
import CloseIcon from "@/../public/icons/close-icon.svg"
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    IconComponent?: ReactNode;
    SecoundaryIconComponent?: ReactNode
    titleIcon?: ReactNode,
    titelClassName?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    IconComponent,
    SecoundaryIconComponent,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    titleIcon,
    titelClassName
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="       
          justify-center 
          items-center 
          flex 
          overflow-hidden
          fixed 
          inset-0 
          z-40 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
            >
                <div className="
          relative 
          w-[95%]
          
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-[98%]
          lg:h-auto
          md:h-auto
          "
                >
                    {/*content*/}
                    <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
                        <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-[32px]
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
                        >

                            <div className="
                flex 
                items-center 
                p-6
                
                rounded-t
                justify-center
                relative
                
                "
                            >
                                <button
                                    className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                                    onClick={handleClose}
                                >
                                    {<CloseIcon className="fill-neutral-600 absolute -left-4 -translate-y-[50%]  sm:translate-x-0 sm:-translate-y-[50%] " />}
                                </button>

                                {/* <div className={cn("text-lg sm:text-xl  font-extrabold text-primary-400 flex flex-row justify-center items-center gap-3 text-center", titelClassName)} >
                                    {titleIcon}
                                    {title}
                                </div> */}

                            </div>

                            <div className="w-full relative p-4 flex-auto self-center">
                                {body}
                            </div>

                            {(secondaryAction || actionLabel) && (
                                <div className="flex flex-col gap-2 p-6">
                                    <div className="flex flex-row items-center gap-4 w-full">
                                        {secondaryAction && secondaryActionLabel && (
                                            <Button
                                                disabled={disabled}
                                                onClick={handleSecondaryAction}
                                                text={secondaryActionLabel}
                                                IconComponent={SecoundaryIconComponent}
                                            />
                                        )}
                                        {actionLabel && (
                                            <Button
                                                disabled={disabled}
                                                text={actionLabel}
                                                onClick={handleSubmit}
                                                className={cn({ "w-full bg-primary-300 rounded-[20px]": !secondaryAction })}
                                            />
                                        )}
                                    </div>
                                    {footer}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;