import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import type { RecipeRecommendation } from "../types.ts";
import { ShoppingCart, Check, RotateCcw, Trash2, Undo2, ClipboardCopy, Zap } from "lucide-react";

export default function GroceryList() {
    const { schedule, items } = useAppContext();
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [dismissedItems, setDismissedItems] = useState<Set<string>>(new Set());
    const [copiedItem, setCopiedItem] = useState<string | null>(null);
    const [bulkCopied, setBulkCopied] = useState(false);

    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const groceryList = useMemo(() => {
        const ingredientCounts: Record<string, number> = {};

        weekDays.forEach(day => {
            const dayKey = format(day, "yyyy-MM-dd");
            const plan = schedule[dayKey];
            if (!plan) return;

            (['Breakfast', 'Lunch', 'Refreshment', 'Dinner'] as const).forEach(slot => {
                const value = plan[slot];
                if (value && typeof value === 'object') {
                    const recipe = value as RecipeRecommendation;
                    recipe.ingredients.forEach(ing => {
                        const key = ing.toLowerCase();
                        ingredientCounts[key] = (ingredientCounts[key] || 0) + 1;
                    });
                }
            });
        });

        const pantryNames = new Set(items.map(i => i.name.toLowerCase()));
        const needToBuy = Object.entries(ingredientCounts)
            .filter(([name]) => !pantryNames.has(name))
            .map(([name, qty]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                qty,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        return needToBuy;
    }, [schedule, items, weekDays]);

    const visibleList = groceryList.filter(i => !dismissedItems.has(i.name));

    const toggleCheck = (item: string) => {
        setCheckedItems(prev => {
            const next = new Set(prev);
            if (next.has(item)) next.delete(item);
            else next.add(item);
            return next;
        });
    };

    const resetChecked = () => setCheckedItems(new Set());

    const clearAll = () => {
        setDismissedItems(new Set(groceryList.map(i => i.name)));
        setCheckedItems(new Set());
    };

    const undoClear = () => setDismissedItems(new Set());

    const copyItemForInstamart = (name: string, qty: number) => {
        const prompt = `Search for "${name}" on Swiggy Instamart and add ${qty > 1 ? qty + ' units' : '1 unit'} to my cart. Use my home address for delivery.`;
        navigator.clipboard.writeText(prompt);
        setCopiedItem(name);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const sendAllToInstamart = () => {
        const unpurchased = visibleList.filter(i => !checkedItems.has(i.name));
        const itemList = unpurchased.map(i => `- ${i.name}${i.qty > 1 ? ` (qty: ${i.qty})` : ''}`).join('\n');
        const prompt = `I need to order groceries from Swiggy Instamart. Please search for and add the following items to my cart, one by one. Use my home address for delivery.\n\nGrocery List:\n${itemList}\n\nAfter adding all items, show me the cart summary with total cost.`;
        navigator.clipboard.writeText(prompt);
        setBulkCopied(true);
        setTimeout(() => setBulkCopied(false), 3000);
    };

    const weekLabel = `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d")}`;

    return (
        <div id="section-grocery" className="card space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <ShoppingCart size={20} className="text-primary" />
                    Grocery List
                </h2>
                <div className="flex items-center gap-2">
                    {checkedItems.size > 0 && (
                        <button
                            onClick={resetChecked}
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5"
                        >
                            <RotateCcw size={13} /> Reset
                        </button>
                    )}
                    {visibleList.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                        >
                            <Trash2 size={13} /> Clear All
                        </button>
                    )}
                </div>
            </div>
            <p className="text-xs text-textMain/50">Items needed for week of {weekLabel} based on your scheduled meals, minus what's in your pantry.</p>

            {/* Undo banner after clearing */}
            {dismissedItems.size > 0 && visibleList.length === 0 && groceryList.length > 0 && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <p className="text-sm text-amber-800">List cleared ({dismissedItems.size} items removed)</p>
                    <button onClick={undoClear} className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors">
                        <Undo2 size={13} /> Undo
                    </button>
                </div>
            )}

            {visibleList.length === 0 && dismissedItems.size === 0 ? (
                <div className="text-sm text-textMain/50 italic py-4 text-center">
                    No ingredients to buy. Schedule some meals first!
                </div>
            ) : visibleList.length > 0 ? (
                <ul className="space-y-1">
                    {visibleList.map(({ name, qty }) => {
                        const isChecked = checkedItems.has(name);
                        const isCopied = copiedItem === name;
                        return (
                            <li key={name}>
                                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${isChecked ? 'bg-success/10 text-textMain/40 line-through' : 'hover:bg-gray-50 text-textMain'}`}>
                                    <button
                                        onClick={() => toggleCheck(name)}
                                        className="flex items-center gap-3 flex-1 text-left"
                                    >
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-success border-success text-white' : 'border-muted/50'}`}>
                                            {isChecked && <Check size={12} />}
                                        </div>
                                        <span className="flex-1">{name}</span>
                                        {qty > 1 && (
                                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isChecked ? 'bg-gray-200 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                                                ×{qty}
                                            </span>
                                        )}
                                    </button>
                                    {/* Per-item Instamart add */}
                                    {!isChecked && (
                                        <button
                                            onClick={() => copyItemForInstamart(name, qty)}
                                            className={`shrink-0 p-1.5 rounded-lg transition-all ${isCopied ? 'bg-success/10 text-success' : 'text-muted/40 hover:text-primary hover:bg-primary/5'}`}
                                            title="Copy Instamart prompt for this item"
                                        >
                                            {isCopied ? <Check size={14} /> : <ClipboardCopy size={14} />}
                                        </button>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : null}

            {visibleList.length > 0 && (
                <div className="flex items-center justify-between border-t border-muted/20 pt-4 mt-4">
                    <p className="text-xs text-textMain/50 font-medium">
                        {checkedItems.size} / {visibleList.length} purchased
                    </p>
                    <button
                        onClick={sendAllToInstamart}
                        className={`text-xs py-2.5 px-5 rounded-xl font-semibold flex items-center gap-2 transition-all ${bulkCopied
                                ? 'bg-success text-white shadow-sm shadow-success/20'
                                : 'btn-primary shadow-sm shadow-primary/20'
                            }`}
                    >
                        {bulkCopied ? (
                            <><Check size={14} /> Copied to clipboard!</>
                        ) : (
                            <><Zap size={14} /> Send to Instamart</>
                        )}
                    </button>
                </div>
            )}

            {/* MCP Setup Help */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-xs text-orange-800 space-y-1.5">
                <p className="font-semibold flex items-center gap-1.5">🛒 Swiggy Instamart MCP</p>
                <p>Click <strong>&quot;Send to Instamart&quot;</strong> to copy a prompt, then paste it in your AI editor (Cursor/VS Code) with Swiggy MCP enabled.</p>
                <p className="text-orange-600">Setup: Add <code className="bg-orange-100 px-1 rounded">{"{ \"swiggy-instamart\": { \"type\": \"http\", \"url\": \"https://mcp.swiggy.com/im\" } }"}</code> to your MCP config.</p>
            </div>
        </div>
    );
}
