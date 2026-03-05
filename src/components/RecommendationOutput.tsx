import { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { fetchGeminiRecommendations } from "../lib/gemini.ts";
import { getLocalRecommendations } from "../lib/fallbackRecipes.ts";
import type { RecipeRecommendation } from "../types.ts";
import { AlertCircle, Loader2, Sparkles, Database, Plus } from "lucide-react";
import AddToMenuModal from "./AddToMenuModal.tsx";

export const DRAG_TYPE_RECIPE = "RECIPE";

export default function RecommendationOutput() {
    const { members, selectedMemberIds, items, dietaryRestrictions } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<RecipeRecommendation[]>([]);
    const [source, setSource] = useState<'ai' | 'local' | null>(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeRecommendation | null>(null);

    const handleGenerate = async () => {
        setError(null);
        setLoading(true);

        try {
            // Use Gemini AI by default now since we have a hardcoded key
            const selectedMembers = members.filter(m => selectedMemberIds.includes(m.id));
            const results = await fetchGeminiRecommendations(selectedMembers.length > 0 ? selectedMembers : members, items);
            setRecommendations(results);
            setSource('ai');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");

            // Fallback to local even if AI fails
            try {
                const results = getLocalRecommendations(items, dietaryRestrictions);
                setRecommendations(results);
                setSource('local');
                setError(null);
            } catch {
                // keep original error
            }
        } finally {
            setLoading(false);
            setVisibleCount(5);
        }
    };

    const handleDragStart = (e: React.DragEvent, recipe: RecipeRecommendation) => {
        e.dataTransfer.setData(DRAG_TYPE_RECIPE, JSON.stringify(recipe));
    };

    return (
        <div className="space-y-6">
            <div className="sticky top-0 z-20 bg-background/90 backdrop-blur pb-4 pt-2 md:pt-0">
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full btn-primary flex justify-center items-center gap-2 shadow-lg shadow-primary/20 h-14"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Recommend Meals"}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex gap-3 text-sm">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {!loading && recommendations.length === 0 && !error && (
                <div className="card text-center py-16 text-muted border-dashed flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center text-primary/50 text-3xl mb-2">🍽️</div>
                    <div>
                        <p className="font-semibold text-textMain/80 text-lg">Select ingredients and click Recommend</p>
                        <p className="text-sm max-w-sm mx-auto mt-2 text-textMain/60">
                            Toggle your pantry items, then click "Recommend Meals" to generate personalized recipes. Works both with and without an API key!
                        </p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card animate-pulse bg-surface/50 h-40 border-dashed border-primary/20 border-2">
                            <div className="h-6 w-1/3 bg-primary/20 rounded mb-4"></div>
                            <div className="flex gap-2 mb-2">
                                <div className="h-4 w-16 bg-primary/20 rounded-full"></div>
                                <div className="h-4 w-24 bg-primary/20 rounded-full"></div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="h-3 w-3/4 bg-primary/10 rounded"></div>
                                <div className="h-3 w-1/2 bg-primary/10 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && recommendations.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Recommendations
                            <span className="text-xs font-normal text-muted">Drag to schedule →</span>
                        </h2>
                        <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${source === 'ai' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {source === 'ai' ? <Sparkles size={12} /> : <Database size={12} />}
                            {source === 'ai' ? 'AI-Powered' : 'Local Matching'}
                        </div>
                    </div>
                    {recommendations.slice(0, visibleCount).map(r => {
                        const isTier1 = r.tier === 1;
                        return (
                            <div
                                key={r.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, r)}
                                className="card cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors group"
                                title="Drag me to a schedule slot!"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-textMain">{r.title}</h3>
                                    <div className="flex gap-2 items-center">
                                        <div className={`px-3 py-1 rounded-full text-[12px] font-[600] shrink-0 ${isTier1 ? 'bg-success text-white' : 'bg-accentTan text-white'}`}>
                                            {r.matchPercentage}% Match
                                        </div>
                                        <button
                                            onClick={() => setSelectedRecipe(r)}
                                            className="p-1 -my-1 text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-colors flex items-center justify-center"
                                            title="Add to Menu"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    <span className="text-xs bg-gray-100 text-textMain/70 px-2 py-1 rounded-md font-medium">{r.mealType}</span>
                                    <span className="text-xs bg-gray-100 text-textMain/70 px-2 py-1 rounded-md font-medium">{r.prepTime}</span>
                                    {r.tags?.map(tag => (
                                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">{tag}</span>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs font-semibold text-textMain/70 uppercase">Ingredients:</span>
                                        <p className="text-sm text-textMain mt-1">{r.ingredients.join(', ')}</p>
                                    </div>

                                    {r.missingIngredients && r.missingIngredients.length > 0 && (
                                        <div className="bg-red-50 p-2 rounded-lg mt-2">
                                            <span className="text-xs font-semibold text-red-800 uppercase flex items-center gap-1">
                                                <AlertCircle size={12} /> Missing:
                                            </span>
                                            <p className="text-sm text-red-700 mt-1">{r.missingIngredients.join(', ')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {visibleCount < recommendations.length && (
                        <button
                            onClick={() => setVisibleCount(prev => prev + 5)}
                            className="w-full py-3 mt-4 rounded-xl border-2 border-dashed border-primary/30 text-primary font-medium hover:bg-primary/5 transition-colors"
                        >
                            See More Recommendations ({recommendations.length - visibleCount} remaining)
                        </button>
                    )}
                </div>
            )}

            {selectedRecipe && (
                <AddToMenuModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
        </div>
    );
}
