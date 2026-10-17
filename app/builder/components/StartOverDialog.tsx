import React, {type ReactNode, useRef} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {buttonVariants} from "@/components/ui/button";
import {useTestimonialContent} from "@/context/TestimonialContentContext";

/** Asks before wiping the card. The trigger is whichever button the layout puts in its header. */
function StartOverDialog({children}: { children: ReactNode }) {
    const {resetCard} = useTestimonialContent();
    const confirmed = useRef(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent
                className="sm:max-w-sm"
                // Reset once the dialog has finished closing, so the card toss isn't hidden behind the overlay.
                onCloseAutoFocus={() => {
                    if (confirmed.current) {
                        confirmed.current = false;
                        resetCard();
                    }
                }}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>Start over?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This clears the name, quote, photo and design settings. You can’t undo it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep editing</AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({variant: "destructive"})}
                        onClick={() => {
                            confirmed.current = true;
                        }}
                    >
                        Start over
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default StartOverDialog;
