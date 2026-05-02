import React from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
    confirmLabel = 'Có',
    cancelLabel = 'Không',
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <div className="bg-background rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center gap-5 min-w-[280px] max-w-[450px] border border-LightOutline/40">
                {/* Trash Icon */}
                <div className="text-LightRed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>

                {/* Message */}
                <p className="text-LightRed text-center be-vietnam-pro-medium text-size-base leading-relaxed">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-6 mt-1 w-full justify-center">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-7 py-1.5 rounded-lg border border-LightOutline text-text be-vietnam-pro-light text-size-small hover:bg-LightOutline/20 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-7 py-1.5 rounded-lg bg-LightRed text-white be-vietnam-pro-medium text-size-small hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? '...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
