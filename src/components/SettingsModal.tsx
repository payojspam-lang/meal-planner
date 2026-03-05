import { X, Sparkles } from "lucide-react";

interface SettingsModalProps {
    onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {

    return (
        <div className="fixed inset-0 bg-textMain/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-xl border border-muted/20 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-textMain transition-colors"
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-primary" /> Settings
                </h2>

                <div className="space-y-4">
                    <div className="bg-success-50 border border-success-200 rounded-xl px-4 py-3 text-xs text-success-800 space-y-1">
                        <p className="font-semibold flex items-center gap-2">
                            <Sparkles size={14} className="text-success" /> AI Features Active
                        </p>
                        <p>Gemini 2.0 Flash is currently powering your meal recommendations with a built-in key.</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-800 space-y-1">
                        <p className="font-semibold">💡 Smart Matching</p>
                        <p>The system automatically considers your pantry inventory and dietary restrictions for all family members.</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full btn-primary mt-2"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
