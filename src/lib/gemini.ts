import type { FamilyMember, PantryItem, RecipeRecommendation } from "../types";

const SYSTEM_PROMPT = `
You are an expert Indian chef and nutritionist. Based on the provided target audience, their dietary restrictions, and available pantry ingredients, generate exactly 10 distinct recipe recommendations. Your goal is to generate recipe recommendations based STRICTLY on the family's dietary constraints and available pantry inventory.
You must solve a multi-variable optimization problem: the recipes MUST satisfy the dietary constraints of ALL selected family members concurrently (an AND constraint).

IMPORTANT RULES:
1. FUZZY MATCHING: Treat generic terms as matches for specific inventory. For example, if the user has "canned tomatoes", a recipe requiring "tomatoes" is a 100% match.
2. TIERING:
   - Tier 1: 100% ingredient match (accounting for fuzzy logic). All required ingredients are in the pantry.
   - Tier 2: 70-99% match. The user has most ingredients but is missing a few. List these explicitly in 'missingIngredients'.
3. Do not invent ingredients out of thin air if you are claiming a 100% match.
4. Output EXACTLY 10 recommendations covering: Breakfast, Lunch, Refreshment, and Dinner.
5. "Refreshment" can be a simple snack (e.g. "Apple slices") depending on inventory.
6. AT LEAST ONE recommendation MUST be a Tier 1 (100% match), using only the available pantry ingredients (unless the pantry is entirely empty).

Return a valid JSON object with this schema:
{
  "recommendations": [
    {
      "id": "uuid-string-here",
      "title": "Recipe Name",
      "ingredients": ["List", "of", "all", "required", "ingredients"],
      "missingIngredients": ["List", "what", "is", "missing", "or", "empty", "array"],
      "matchPercentage": 100,
      "prepTime": "15 mins",
      "mealType": "Breakfast",
      "tier": 1,
      "macros": {
        "calories": 450,
        "carbs": 40,
        "fat": 15,
        "protein": 20
      }
    }
  ]
}
`;

const GEMINI_API_KEY = "{string}";

export async function fetchGeminiRecommendations(
    members: FamilyMember[],
    pantry: PantryItem[]
): Promise<RecipeRecommendation[]> {
    const apiKey = GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API Key is missing.");
    if (members.length === 0) throw new Error("Please add at least one target audience member.");

    const memberDescriptions = members
        .map(m => `- ${m.name} (${m.ageCategory}): ${m.dietaryRestrictions.join(', ')}`)
        .join('\n');

    const pantryDescriptions = pantry
        .map(p => p.name)
        .join(', ');

    const userPrompt = `
Here is the current state:
TARGET AUDIENCE:
${memberDescriptions}

AVAILABLE PANTRY (FUZZY MATCH THESE):
${pantryDescriptions || "Empty pantry"}

Generate exactly 10 distinct recommendations strictly adhering to the JSON schema.
`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": apiKey
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT + "\n\n" + userPrompt }]
                    }
                ],
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.7,
                }
            })
        }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Failed to fetch from Gemini API");
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
        throw new Error("Empty response from Gemini API");
    }

    try {
        const parsed = JSON.parse(content);
        return parsed.recommendations.map((r: Record<string, unknown>) => ({
            ...r,
            id: crypto.randomUUID(),
            tier: r.tier as 1 | 2
        })) as RecipeRecommendation[];
    } catch {
        throw new Error("Failed to parse JSON from Gemini response.");
    }
}
