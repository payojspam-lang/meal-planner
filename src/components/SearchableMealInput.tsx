import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { RECIPE_DB } from '../lib/fallbackRecipes';
import type { MealType } from '../types';

interface SearchableMealInputProps {
    mealType: MealType;
    value: string;
    onChange: (val: string) => void;
    onSelectRecipe: (title: string) => void;
    placeholder: string;
}

export default function SearchableMealInput({
    mealType,
    value,
    onChange,
    onSelectRecipe,
    placeholder
}: SearchableMealInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter recipes based on meal type and current input
    const filteredRecipes = RECIPE_DB.filter(r =>
        r.mealType === mealType &&
        r.title.toLowerCase().includes(value.toLowerCase())
    );

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
            setHighlightedIndex(prev => (prev + 1) % (filteredRecipes.length || 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setIsOpen(true);
            setHighlightedIndex(prev => (prev - 1 + (filteredRecipes.length || 1)) % (filteredRecipes.length || 1));
        } else if (e.key === 'Enter') {
            if (isOpen && filteredRecipes.length > 0) {
                onSelectRecipe(filteredRecipes[highlightedIndex].title);
                setIsOpen(false);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative flex-1" ref={containerRef}>
            <div className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsOpen(true);
                        setHighlightedIndex(0);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3 bg-white border-2 border-primary/10 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-medium placeholder:text-textMain/30"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
                    <Search size={18} />
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-textMain/30 hover:text-primary transition-colors"
                >
                    <ChevronDown size={20} className={`duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {isOpen && (value.length > 0 || filteredRecipes.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto custom-scrollbar">
                    {filteredRecipes.length > 0 ? (
                        <div className="p-2 space-y-1">
                            <div className="px-3 py-1 text-[10px] font-bold text-textMain/40 uppercase tracking-widest">Recipe Suggestions</div>
                            {filteredRecipes.map((recipe, idx) => (
                                <button
                                    key={recipe.title}
                                    type="button"
                                    onClick={() => {
                                        onSelectRecipe(recipe.title);
                                        setIsOpen(false);
                                    }}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${idx === highlightedIndex ? 'bg-primary/5 text-primary' : 'text-textMain hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{recipe.title}</span>
                                        <span className="text-xs opacity-60 truncate max-w-[200px]">{recipe.ingredients.slice(0, 3).join(', ')}...</span>
                                    </div>
                                    {idx === highlightedIndex && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center">
                            <p className="text-sm text-textMain/50 font-medium italic">Hit Enter to add manual dish</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
