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
4. Output EXACTLY 4 recommendations: One for Breakfast, one for Lunch, one for Refreshment, and one for Dinner.
5. "Refreshment" can be a simple snack (e.g. "Apple slices") depending on inventory.
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

export async function fetchRecommendations(
    apiKey: string,
    members: FamilyMember[],
    pantry: PantryItem[]
): Promise<RecipeRecommendation[]> {
    if (!apiKey) throw new Error("API Key is missing.");
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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            temperature: 0.7,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ]
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Failed to fetch from OpenAI");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    try {
        const parsed = JSON.parse(content);
        return parsed.recommendations.map((r: Record<string, unknown>) => ({
            ...r,
            id: crypto.randomUUID(), // Guarantee unique IDs
            tier: r.tier as 1 | 2
        })) as RecipeRecommendation[];
    } catch {
        throw new Error("Failed to parse JSON schema from OpenAI response.");
    }
}
