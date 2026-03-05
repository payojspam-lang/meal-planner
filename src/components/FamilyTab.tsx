import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext.tsx";
import type { AgeCategory } from "../types.ts";

const AGE_CATEGORIES: AgeCategory[] = ['Infant', 'Toddler', 'Child', 'Teen', 'Adult', 'Senior'];
const GLOBAL_DIETS = ['Vegetarian', 'Vegan', 'Egg-free', 'Dairy-free', 'Gluten-free'];

export default function FamilyTab() {
    const { members, addMember, removeMember, selectedMemberIds, toggleMemberSelection, dietaryRestrictions, toggleDietaryRestriction } = useAppContext();
    const [name, setName] = useState("");
    const [age, setAge] = useState<AgeCategory>('Adult');
    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => {
        if (!name.trim()) return;
        const newMember = {
            id: crypto.randomUUID(),
            name: name.trim(),
            ageCategory: age,
            dietaryRestrictions: [] as any[],
        };
        addMember(newMember);
        toggleMemberSelection(newMember.id);
        setName("");
        setAge('Adult');
        setShowForm(false);
    };

    return (
        <div id="section-family" className="card space-y-4">
            <h2 className="text-xl font-bold">Target Audience</h2>
            <p className="text-xs text-textMain/50">Select who you're cooking for. Constraints are applied to recommendations.</p>

            {/* Member Chips with selection toggle */}
            <div className="flex flex-wrap gap-2">
                {members.map(m => {
                    const isSelected = selectedMemberIds.includes(m.id);
                    return (
                        <div key={m.id} className="flex items-center gap-0">
                            <button
                                onClick={() => toggleMemberSelection(m.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-l-full text-sm font-medium transition-all border ${isSelected
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-surface text-textMain/70 border-muted/50 hover:bg-gray-50'
                                    }`}
                            >
                                {isSelected && <Check size={14} />}
                                {m.name}
                                <span className="opacity-60 text-xs">({m.ageCategory})</span>
                            </button>
                            <button
                                onClick={() => removeMember(m.id)}
                                className="px-2 py-2 border border-l-0 border-muted/50 rounded-r-full text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
                {members.length === 0 && (
                    <div className="text-sm text-textMain/50 italic">No family members yet.</div>
                )}
            </div>

            {/* Add member form */}
            {showForm ? (
                <div className="border-t border-muted/20 pt-4 space-y-3">
                    <input
                        placeholder="Name (e.g., Dad)"
                        className="w-full border border-muted/50 rounded-xl px-4 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
                        autoFocus
                    />
                    <div className="flex gap-2 text-xs overflow-x-auto pb-1">
                        {AGE_CATEGORIES.map(ac => (
                            <button
                                key={ac}
                                onClick={() => setAge(ac)}
                                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors border ${age === ac ? 'bg-accentTan text-white border-accentTan font-bold' : 'bg-surface border-muted/50 hover:bg-gray-50'
                                    }`}
                            >
                                {ac}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleAdd} disabled={!name.trim()} className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1 disabled:opacity-50">
                            <Plus size={14} /> Add
                        </button>
                        <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-muted hover:text-textMain border border-muted/50 rounded-xl">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)} className="w-full border border-dashed border-muted/50 text-muted rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm">
                    <Plus size={16} /> Add Family Member
                </button>
            )}

            {/* Global Dietary Restrictions */}
            <div className="border-t border-muted/20 pt-4">
                <h3 className="text-sm font-bold mb-3">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {GLOBAL_DIETS.map(diet => {
                        const isChecked = dietaryRestrictions.includes(diet);
                        return (
                            <label key={diet} className="flex items-center gap-2 cursor-pointer text-sm select-none">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleDietaryRestriction(diet)}
                                    className="w-4 h-4 rounded border-muted/50 text-primary focus:ring-primary/50 accent-primary"
                                />
                                {diet}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
