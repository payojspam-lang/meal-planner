export type AgeCategory = 'Infant' | 'Toddler' | 'Child' | 'Teen' | 'Adult' | 'Senior';
export type DietaryRestriction = 'Vegan' | 'Vegetarian' | 'No Nuts' | 'Gluten Free' | 'Dairy Free' | 'Pescatarian' | 'None';

export interface FamilyMember {
    id: string;
    name: string;
    ageCategory: AgeCategory;
    dietaryRestrictions: DietaryRestriction[];
}

export interface PantryItem {
    id: string;
    name: string;
    category: 'Staple' | 'Vegetable' | 'Protein' | 'Other';
}

export type MealType = 'Breakfast' | 'Lunch' | 'Refreshment' | 'Dinner';

export interface RecipeRecommendation {
    id: string;
    title: string;
    ingredients: string[];
    matchPercentage: number;
    missingIngredients: string[];
    prepTime: string;
    mealType: MealType;
    tier?: 1 | 2;
    tags?: string[];
    macros?: {
        calories: number;
        carbs: number;
        fat: number;
        protein: number;
    };
}

// A slot can hold a full recipe, a manual text entry, or be empty
export type DailySlotValue = RecipeRecommendation | string | null;

export interface DailyPlan {
    date: string; // YYYY-MM-DD format
    Breakfast: DailySlotValue;
    Lunch: DailySlotValue;
    Refreshment: DailySlotValue;
    Dinner: DailySlotValue;
}

export interface AppState {
    apiKey: string;
    familyMembers: FamilyMember[];
    pantry: PantryItem[];
    schedule: Record<string, DailyPlan>;
}
