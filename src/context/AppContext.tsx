import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import type { FamilyMember, PantryItem, DailyPlan, DailySlotValue } from "../types.ts";
import React from "react";

interface AppContextType {
    // Family Members
    members: FamilyMember[];
    addMember: (member: FamilyMember) => void;
    removeMember: (id: string) => void;
    updateMember: (id: string, updated: Partial<FamilyMember>) => void;
    // API
    geminiKey: string;
    setGeminiKey: (key: string) => void;
    // Member Targeting
    selectedMemberIds: string[];
    toggleMemberSelection: (id: string) => void;
    selectAllMembers: () => void;
    deselectAllMembers: () => void;
    // Global Dietary Restrictions
    dietaryRestrictions: string[];
    toggleDietaryRestriction: (r: string) => void;
    // Pantry
    items: PantryItem[];
    addItem: (item: PantryItem) => void;
    removeItem: (id: string) => void;
    toggleSuggestion: (name: string, category: PantryItem['category']) => void;
    // Schedule
    schedule: Record<string, DailyPlan>;
    getPlan: (date: string) => DailyPlan;
    updatePlan: (date: string, plan: Partial<DailyPlan>) => void;
    updateSlot: (date: string, slot: string, value: DailySlotValue) => void;
    clearDay: (date: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
    // Family Members
    const [members, setMembers] = useLocalStorage<FamilyMember[]>("meal-planner-members", []);
    const addMember = (member: FamilyMember) => setMembers((prev) => [...prev, member]);
    const removeMember = (id: string) => {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        setSelectedMemberIds((prev) => prev.filter((sid) => sid !== id));
    };
    const updateMember = (id: string, updated: Partial<FamilyMember>) =>
        setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));

    // API
    const [geminiKey, setGeminiKey] = useLocalStorage<string>("meal-planner-gemini-key", "");

    // Member Targeting
    const [selectedMemberIds, setSelectedMemberIds] = useLocalStorage<string[]>("meal-planner-selected-members", []);
    const toggleMemberSelection = (id: string) =>
        setSelectedMemberIds((prev) => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
    const selectAllMembers = () => setSelectedMemberIds(members.map(m => m.id));
    const deselectAllMembers = () => setSelectedMemberIds([]);

    // Global Dietary Restrictions
    const [dietaryRestrictions, setDietaryRestrictions] = useLocalStorage<string[]>("meal-planner-diets", []);
    const toggleDietaryRestriction = (r: string) =>
        setDietaryRestrictions((prev) => prev.includes(r) ? prev.filter(d => d !== r) : [...prev, r]);

    // Pantry
    const [items, setItems] = useLocalStorage<PantryItem[]>("meal-planner-pantry", []);
    const addItem = (item: PantryItem) => setItems((prev) => [...prev, item]);
    const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
    const toggleSuggestion = (name: string, category: PantryItem['category']) => {
        setItems((prev) => {
            const existing = prev.find(i => i.name.toLowerCase() === name.toLowerCase());
            if (existing) return prev.filter(i => i.name.toLowerCase() !== name.toLowerCase());
            return [...prev, { id: crypto.randomUUID(), name, category }];
        });
    };

    // Schedule
    const [schedule, setSchedule] = useLocalStorage<Record<string, DailyPlan>>("meal-planner-schedule", {});
    const emptyPlan = (date: string): DailyPlan => ({
        date,
        Breakfast: null,
        Lunch: null,
        Refreshment: null,
        Dinner: null,
    });
    const getPlan = (date: string): DailyPlan => schedule[date] || emptyPlan(date);
    const updatePlan = (date: string, plan: Partial<DailyPlan>) =>
        setSchedule((prev) => ({
            ...prev,
            [date]: { ...getPlan(date), ...plan },
        }));
    const updateSlot = (date: string, slot: string, value: DailySlotValue) =>
        setSchedule((prev) => ({
            ...prev,
            [date]: { ...getPlan(date), [slot]: value },
        }));
    const clearDay = (date: string) =>
        setSchedule((prev) => ({
            ...prev,
            [date]: emptyPlan(date),
        }));

    return (
        <AppContext.Provider
            value={{
                members, addMember, removeMember, updateMember,
                geminiKey, setGeminiKey,
                selectedMemberIds, toggleMemberSelection, selectAllMembers, deselectAllMembers,
                dietaryRestrictions, toggleDietaryRestriction,
                items, addItem, removeItem, toggleSuggestion,
                schedule, getPlan, updatePlan, updateSlot, clearDay,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
