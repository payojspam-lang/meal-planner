import { useAppContext } from "../context/AppContext.tsx";
import { Check, User } from "lucide-react";

export default function TargetAudienceWidget() {
    const { members, selectedMemberIds, toggleMemberSelection } = useAppContext();

    return (
        <div className="card space-y-3 h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Target Audience</h2>
                <span className="text-xs text-muted">{selectedMemberIds.length} selected</span>
            </div>

            {members.length === 0 ? (
                <div className="text-sm text-textMain/50 italic p-4 border border-dashed border-muted/50 rounded-xl text-center">
                    Go to the Family tab to add members.
                </div>
            ) : (
                <ul className="divide-y divide-muted/15">
                    {members.map(m => {
                        const isSelected = selectedMemberIds.includes(m.id);
                        const initials = m.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
                        const restrictions = m.dietaryRestrictions?.filter(r => r !== 'None') ?? [];

                        return (
                            <li key={m.id}>
                                <button
                                    onClick={() => toggleMemberSelection(m.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${isSelected ? 'bg-primary/5' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-all ${isSelected
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'bg-gray-100 text-textMain/50'
                                        }`}>
                                        {initials || <User size={18} />}
                                    </div>

                                    {/* Name & Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-textMain truncate">{m.name}</p>
                                        <p className="text-xs text-muted">
                                            {m.ageCategory}
                                            {restrictions.length > 0 && (
                                                <span className="text-textMain/40"> · {restrictions.join(', ')}</span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Checkbox */}
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${isSelected
                                            ? 'bg-primary border-primary text-white'
                                            : 'border-muted/40'
                                        }`}>
                                        {isSelected && <Check size={12} />}
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
