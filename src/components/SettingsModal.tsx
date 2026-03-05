import { X, Key, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";

interface SettingsModalProps {
    onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
    const { geminiKey, setGeminiKey } = useAppContext();
    const [showKey, setShowKey] = useState(false);

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
                    <Key size={20} className="text-primary" /> API Settings
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-textMain mb-1">
                            Gemini API Key
                        </label>
                        <p className="text-xs text-textMain/60 mb-3">
                            Required for AI-powered recipe generation. Your key is stored securely in your browser's local storage and only sent directly to the backend proxy.
                        </p>
                        <div className="relative">
                            <input
                                type={showKey ? "text" : "password"}
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full bg-white border border-muted/40 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-textMain transition-colors"
                            >
                                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-800 space-y-1">
                        <p className="font-semibold flex items-center gap-2">
                            <ShieldCheck size={14} className="text-blue-600" /> Secure Proxy
                        </p>
                        <p>Requests are now routed through our secure backend API. Your key is never exposed to external clients.</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full btn-primary mt-2 flex justify-center items-center gap-2"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
