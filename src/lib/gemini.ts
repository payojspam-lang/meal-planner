import type { FamilyMember, PantryItem, RecipeRecommendation } from "../types";

export async function fetchGeminiRecommendations(
    geminiKey: string,
    members: FamilyMember[],
    pantry: PantryItem[]
): Promise<RecipeRecommendation[]> {

    // We proxy the request through our backend to keep the prompt and processing logic secure.
    // The backend handles both Gemini AI processing and TheMealDB integration.

    const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            geminiKey,
            members,
            pantry
        })
    });

    if (!response.ok) {
        let errorMessage = "Failed to fetch recommendations";
        try {
            const err = await response.json();
            errorMessage = err.error || errorMessage;
        } catch (_) {
            errorMessage = `Server responded with ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();

    if (data.source === 'local_fallback_required') {
        throw new Error("Local fallback required. Gemini API key is missing or failed.");
    }

    return data.recommendations || [];
}
