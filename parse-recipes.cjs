const fs = require('fs');
const path = require('path');

const rawData = `
const RECIPES = [
  { name: "Veggie Omelette", required: ["eggs", "onion"], optional: ["tomato", "spinach", "mushroom"], tags: ["breakfast", "high-protein"], timeMins: 15 },
  { name: "Chickpea Spinach Curry", required: ["chickpeas", "onion", "garlic"], optional: ["spinach", "tomato", "rice"], tags: ["vegan", "one-pot"], timeMins: 30 },
  { name: "Pasta Primavera", required: ["pasta", "olive oil", "garlic"], optional: ["broccoli", "bell pepper", "zucchini"], tags: ["vegetarian", "quick"], timeMins: 25 },
  { name: "Lentil Soup", required: ["lentils", "onion", "carrot"], optional: ["garlic", "tomato", "cabbage"], tags: ["vegan", "soup"], timeMins: 35 },
  { name: "Rice and Beans Bowl", required: ["rice", "beans"], optional: ["tomato", "onion", "bell pepper"], tags: ["vegan", "meal-prep"], timeMins: 20 },
  { name: "Vegetable Fried Rice", required: ["rice", "eggs", "onion"], optional: ["peas", "carrot", "green beans"], tags: ["quick", "one-pan"], timeMins: 20 },
  { name: "Tomato Basil Pasta", required: ["pasta", "tomato", "olive oil"], optional: ["garlic", "onion", "spinach"], tags: ["vegetarian", "quick"], timeMins: 18 },
  { name: "Stuffed Bell Peppers", required: ["bell pepper", "rice"], optional: ["beans", "tomato", "onion"], tags: ["baked", "vegetarian"], timeMins: 40 },
  { name: "Aloo Matar", required: ["potato", "peas", "onion"], optional: ["tomato", "garlic", "rice"], tags: ["vegan", "indian"], timeMins: 30 },
  { name: "Mushroom Toast", required: ["bread", "mushroom"], optional: ["garlic", "onion", "spinach"], tags: ["breakfast", "quick"], timeMins: 15 },
  { name: "Cabbage Stir Fry", required: ["cabbage", "onion", "garlic"], optional: ["carrot", "peas", "rice"], tags: ["vegan", "stir-fry"], timeMins: 18 },
  { name: "Broccoli Pasta", required: ["pasta", "broccoli", "garlic"], optional: ["olive oil", "mushroom", "peas"], tags: ["vegetarian", "quick"], timeMins: 22 },
  { name: "Carrot Lentil Stew", required: ["lentils", "carrot", "onion"], optional: ["tomato", "garlic", "spinach"], tags: ["vegan", "stew"], timeMins: 35 },
  { name: "Zucchini Noodles", required: ["zucchini", "garlic", "olive oil"], optional: ["tomato", "mushroom", "onion"], tags: ["low-carb", "quick"], timeMins: 15 },
  { name: "Bean Tacos", required: ["beans", "onion"], optional: ["tomato", "cabbage", "bell pepper"], tags: ["mexican", "quick"], timeMins: 20 },
  { name: "Spinach Rice Pilaf", required: ["rice", "spinach", "onion"], optional: ["peas", "garlic", "carrot"], tags: ["one-pot", "vegetarian"], timeMins: 25 },
  { name: "Potato Hash", required: ["potato", "onion"], optional: ["bell pepper", "eggs", "mushroom"], tags: ["breakfast", "one-pan"], timeMins: 20 },
  { name: "Shakshuka", required: ["eggs", "tomato", "onion"], optional: ["bell pepper", "garlic", "bread"], tags: ["breakfast", "one-pan"], timeMins: 25 },
  { name: "Veggie Quesadilla", required: ["bread", "bell pepper"], optional: ["onion", "tomato", "beans"], tags: ["quick", "snack"], timeMins: 12 },
  { name: "Cauliflower Rice Bowl", required: ["cauliflower", "onion"], optional: ["peas", "carrot", "garlic"], tags: ["low-carb", "quick"], timeMins: 18 },
  { name: "Tomato Lentil Pasta", required: ["lentils", "pasta", "tomato"], optional: ["garlic", "onion", "spinach"], tags: ["high-protein", "vegetarian"], timeMins: 30 },
  { name: "Green Bean Stir Fry", required: ["green beans", "garlic", "onion"], optional: ["carrot", "rice", "mushroom"], tags: ["vegan", "stir-fry"], timeMins: 20 },
  { name: "Pea Mushroom Pasta", required: ["pasta", "peas", "mushroom"], optional: ["garlic", "onion", "olive oil"], tags: ["vegetarian", "quick"], timeMins: 22 },
  { name: "Rustic Veg Soup", required: ["onion", "carrot", "tomato"], optional: ["cabbage", "potato", "beans"], tags: ["vegan", "soup"], timeMins: 32 },
  { name: "Chickpea Salad Toast", required: ["chickpeas", "bread"], optional: ["tomato", "onion", "cabbage"], tags: ["quick", "high-protein"], timeMins: 10 },
  { name: "Moong Dal Khichdi (Baby)", required: ["rice", "moong dal"], optional: ["carrot", "bottle gourd", "ghee"], tags: ["indian", "baby-friendly", "toddler-friendly", "one-pot"], timeMins: 25 },
  { name: "Vegetable Suji Upma (Toddler)", required: ["suji", "onion"], optional: ["carrot", "peas", "ghee"], tags: ["indian", "toddler-friendly", "quick"], timeMins: 18 },
  { name: "Ragi Porridge", required: ["ragi flour"], optional: ["ghee", "milk", "banana"], tags: ["indian", "baby-friendly", "breakfast"], timeMins: 12 },
  { name: "Poha with Veg (Toddler)", required: ["poha", "onion"], optional: ["peas", "carrot", "potato"], tags: ["indian", "toddler-friendly", "quick"], timeMins: 15 },
  { name: "Dal Rice Mash", required: ["rice", "lentils"], optional: ["ghee", "pumpkin", "carrot"], tags: ["indian", "baby-friendly", "comfort"], timeMins: 25 },
  { name: "Pumpkin Dal Soup (Baby)", required: ["pumpkin", "moong dal"], optional: ["ghee", "garlic", "carrot"], tags: ["indian", "baby-friendly", "soup"], timeMins: 22 },
  { name: "Besan Chilla (Soft)", required: ["besan", "onion"], optional: ["tomato", "spinach", "ghee"], tags: ["indian", "toddler-friendly", "breakfast"], timeMins: 15 },
  { name: "Sweet Potato Khichdi", required: ["rice", "moong dal", "sweet potato"], optional: ["ghee", "carrot", "peas"], tags: ["indian", "baby-friendly", "one-pot"], timeMins: 28 },
  { name: "Beetroot Rice Mash", required: ["rice", "beetroot"], optional: ["ghee", "carrot", "peas"], tags: ["indian", "baby-friendly", "toddler-friendly"], timeMins: 24 },
  { name: "Lauki Dal (Bottle Gourd)", required: ["bottle gourd", "moong dal"], optional: ["onion", "garlic", "ghee"], tags: ["indian", "baby-friendly", "toddler-friendly"], timeMins: 26 },
];
`;

const RECIPES = eval(rawData + "; RECIPES;");
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const generatedCode = RECIPES.map(r => {
  let mealType = "Dinner";
  if (r.tags.includes("breakfast")) mealType = "Breakfast";
  else if (r.tags.includes("lunch")) mealType = "Lunch";
  else if (r.tags.includes("snack")) mealType = "Refreshment";

  const ingredients = [...r.required, ...r.optional].map(capitalize);

  const dietaryFlags = [];
  if (r.tags.includes("vegan")) dietaryFlags.push("Vegan", "Dairy-free", "Egg-free");
  if (r.tags.includes("vegetarian") || r.tags.includes("vegan")) dietaryFlags.push("Vegetarian");

  if (!ingredients.some(i => ['egg', 'eggs'].includes(i.toLowerCase())) && !dietaryFlags.includes("Egg-free")) dietaryFlags.push("Egg-free");
  if (!ingredients.some(i => ['milk', 'ghee', 'yogurt', 'cheese', 'butter'].includes(i.toLowerCase())) && !dietaryFlags.includes("Dairy-free")) dietaryFlags.push("Dairy-free");
  if (!ingredients.some(i => ['bread', 'pasta', 'suji', 'wheat'].includes(i.toLowerCase()))) dietaryFlags.push("Gluten-free");

  let finalDiets = [...new Set(dietaryFlags)];

  return `    {
        title: "${r.name}",
        ingredients: ${JSON.stringify(ingredients)},
        prepTime: "${r.timeMins} min",
        mealType: "${mealType}",
        tags: ${JSON.stringify(r.tags)},
        dietaryFlags: ${JSON.stringify(finalDiets)}
    }`;
}).join(",\\n");

const fallbackPath = path.join(__dirname, 'src', 'lib', 'fallbackRecipes.ts');
let fileContent = fs.readFileSync(fallbackPath, 'utf8');

const lines = fileContent.split('\\n');
const idx = lines.findIndex(l => l.includes('function fuzzyMatch(ingredient: string, pantryName: string): boolean'));

if (idx !== -1) {
  // We want to insert right before the closing "];" which is typically 2 lines above
  lines.splice(idx - 2, 0, ",\\n    // EXTRAS FROM PARTH-OS\\n" + generatedCode);
  fs.writeFileSync(fallbackPath, lines.join('\\n'));
  console.log("Recipes inserted!");
} else {
  console.log("Could not find fuzzyMatch signature to insert before.");
}
