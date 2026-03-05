import { useLocalStorage } from "./useLocalStorage.ts";
import type { FamilyMember, PantryItem, DailyPlan } from "../types.ts";

export function useFamilyMembers() {
    const [members, setMembers] = useLocalStorage<FamilyMember[]>("meal-planner-members", []);

    const addMember = (member: FamilyMember) => setMembers((prev) => [...prev, member]);
    const removeMember = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));
    const updateMember = (id: string, updated: Partial<FamilyMember>) =>
        setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));

    return { members, addMember, removeMember, updateMember };
}

export function usePantry() {
    const [items, setItems] = useLocalStorage<PantryItem[]>("meal-planner-pantry", []);

    const addItem = (item: PantryItem) => setItems((prev) => [...prev, item]);
    const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

    return { items, addItem, removeItem };
}

export function useSchedule() {
    const [schedule, setSchedule] = useLocalStorage<Record<string, DailyPlan>>("meal-planner-schedule", {});

    const getPlan = (date: string) =>
        schedule[date] || {
            date,
            Breakfast: null,
            Lunch: null,
            Refreshment: null,
            Dinner: null,
        };

    const updatePlan = (date: string, plan: Partial<DailyPlan>) =>
        setSchedule((prev) => ({
            ...prev,
            [date]: { ...getPlan(date), ...plan },
        }));

    return { schedule, getPlan, updatePlan };
}

export function useSettings() {
    const [apiKey, setApiKey] = useLocalStorage<string>("meal-planner-apikey", "");
    return { apiKey, setApiKey };
}
