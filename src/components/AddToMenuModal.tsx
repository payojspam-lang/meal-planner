import { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAppContext } from "../context/AppContext.tsx";
import type { RecipeRecommendation } from "../types.ts";

interface AddToMenuModalProps {
    recipe: RecipeRecommendation;
    onClose: () => void;
}

export default function AddToMenuModal({ recipe, onClose }: AddToMenuModalProps) {
    const { updateSlot } = useAppContext();
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [slot, setSlot] = useState<string>("Dinner");

    const handleSave = () => {
        updateSlot(date, slot, recipe);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-surface rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Add to Menu
                        </h2>
                        <button onClick={onClose} className="p-2 -mr-2 text-muted hover:text-textMain hover:bg-gray-100 rounded-xl transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <p className="font-semibold text-primary">{recipe.title}</p>
                        <p className="text-sm text-textMain/70 mt-1 flex items-center gap-1"><Clock size={14} /> {recipe.prepTime}</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-textMain/70 mb-2">Select Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-muted/50 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-textMain/70 mb-2">Select Meal</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Breakfast', 'Lunch', 'Refreshment', 'Dinner'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSlot(s)}
                                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors border
                                            ${slot === s ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-surface text-textMain/70 border-muted/50 hover:bg-gray-50'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={handleSave} className="w-full btn-primary h-12 text-base">
                            Add to Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
