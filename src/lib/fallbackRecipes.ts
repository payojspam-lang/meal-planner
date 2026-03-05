import type { RecipeRecommendation, PantryItem, MealType } from "../types.ts";

interface FallbackRecipe {
    title: string;
    ingredients: string[];
    prepTime: string;
    mealType: MealType;
    tags: string[];
    dietaryFlags: string[]; // matches the global dietary restriction labels
    macros?: { calories: number; carbs: number; fat: number; protein: number };
}

// BREAKFAST
export const RECIPE_DB: FallbackRecipe[] = [
    { title: "Poha", ingredients: ["Poha", "Onion", "Peas", "Turmeric", "Mustard Seeds", "Curry Leaves"], prepTime: "15 min", mealType: "Breakfast", tags: ["indian", "quick", "light"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 350, carbs: 65, fat: 8, protein: 5 } },
    { title: "Besan Chilla", ingredients: ["Besan", "Onion", "Tomato", "Green Chilli", "Coriander"], prepTime: "10 min", mealType: "Breakfast", tags: ["indian", "high-protein", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 280, carbs: 35, fat: 10, protein: 12 } },
    { title: "Masala Dosa", ingredients: ["Rice", "Urad Dal", "Potato", "Onion", "Mustard Seeds"], prepTime: "30 min", mealType: "Breakfast", tags: ["south-indian", "classic"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 420, carbs: 60, fat: 15, protein: 10 } },
    { title: "Upma", ingredients: ["Suji", "Onion", "Green Chilli", "Peanuts", "Curry Leaves"], prepTime: "15 min", mealType: "Breakfast", tags: ["indian", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free"], macros: { calories: 320, carbs: 45, fat: 12, protein: 8 } },
    { title: "Oats Smoothie Bowl", ingredients: ["Oats", "Yogurt", "Banana", "Honey", "Berries"], prepTime: "10 min", mealType: "Breakfast", tags: ["healthy", "quick"], dietaryFlags: ["Vegetarian", "Egg-free", "Gluten-free"], macros: { calories: 300, carbs: 48, fat: 6, protein: 14 } },
    { title: "Aloo Paratha", ingredients: ["Atta", "Potato", "Onion", "Green Chilli", "Ghee"], prepTime: "25 min", mealType: "Breakfast", tags: ["north-indian", "filling"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 450, carbs: 60, fat: 18, protein: 10 } },
    { title: "Ragi Porridge", ingredients: ["Ragi Flour", "Milk", "Jaggery", "Cardamom"], prepTime: "10 min", mealType: "Breakfast", tags: ["baby-friendly", "healthy", "millet"], dietaryFlags: ["Vegetarian", "Egg-free", "Gluten-free"], macros: { calories: 250, carbs: 45, fat: 5, protein: 8 } },
    { title: "Egg Bhurji", ingredients: ["Eggs", "Onion", "Tomato", "Green Chilli", "Turmeric"], prepTime: "10 min", mealType: "Breakfast", tags: ["indian", "high-protein", "quick"], dietaryFlags: ["Vegetarian", "Gluten-free", "Dairy-free"], macros: { calories: 220, carbs: 8, fat: 15, protein: 14 } },

    // LUNCH
    { title: "Dal Tadka", ingredients: ["Lentils", "Onion", "Tomato", "Garlic", "Cumin Seeds", "Ghee"], prepTime: "25 min", mealType: "Lunch", tags: ["indian", "comfort-food"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 380, carbs: 55, fat: 12, protein: 18 } },
    { title: "Rajma Chawal", ingredients: ["Beans", "Rice", "Onion", "Tomato", "Garlic", "Ginger"], prepTime: "40 min", mealType: "Lunch", tags: ["north-indian", "protein-rich"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 550, carbs: 90, fat: 8, protein: 22 } },
    { title: "Chole Bhature", ingredients: ["Chickpeas", "Atta", "Yogurt", "Onion", "Ginger"], prepTime: "35 min", mealType: "Lunch", tags: ["punjabi", "festive"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 750, carbs: 95, fat: 30, protein: 20 } },
    { title: "Palak Paneer", ingredients: ["Spinach", "Paneer", "Onion", "Garlic", "Cream"], prepTime: "30 min", mealType: "Lunch", tags: ["north-indian", "creamy"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 420, carbs: 15, fat: 32, protein: 18 } },
    { title: "Aloo Gobi", ingredients: ["Potato", "Cauliflower", "Onion", "Tomato", "Cumin Seeds"], prepTime: "25 min", mealType: "Lunch", tags: ["indian", "dry-curry"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 280, carbs: 35, fat: 14, protein: 6 } },
    { title: "Vegetable Pulao", ingredients: ["Rice", "Carrot", "Peas", "Beans", "Ghee", "Bay Leaf"], prepTime: "25 min", mealType: "Lunch", tags: ["indian", "one-pot"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 400, carbs: 65, fat: 12, protein: 8 } },
    { title: "Sambar Rice", ingredients: ["Rice", "Lentils", "Drumstick", "Carrot", "Tamarind"], prepTime: "30 min", mealType: "Lunch", tags: ["south-indian", "healthy"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 380, carbs: 70, fat: 5, protein: 14 } },
    { title: "Pasta Arrabiata", ingredients: ["Pasta", "Canned Tomatoes", "Garlic", "Olive Oil", "Basil"], prepTime: "20 min", mealType: "Lunch", tags: ["italian", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free"], macros: { calories: 450, carbs: 75, fat: 10, protein: 12 } },

    // REFRESHMENT
    { title: "Masala Chai & Pakora", ingredients: ["Tea", "Milk", "Ginger", "Besan", "Onion"], prepTime: "15 min", mealType: "Refreshment", tags: ["indian", "snack", "rainy-day"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 350, carbs: 40, fat: 18, protein: 8 } },
    { title: "Moong Dal Chaat", ingredients: ["Moong Dal", "Onion", "Tomato", "Lemon", "Coriander"], prepTime: "10 min", mealType: "Refreshment", tags: ["indian", "protein-rich", "healthy"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 200, carbs: 30, fat: 5, protein: 12 } },
    { title: "Banana Smoothie", ingredients: ["Banana", "Yogurt", "Honey", "Milk"], prepTime: "5 min", mealType: "Refreshment", tags: ["quick", "healthy", "kid-friendly"], dietaryFlags: ["Vegetarian", "Egg-free", "Gluten-free"], macros: { calories: 250, carbs: 45, fat: 4, protein: 10 } },
    { title: "Mango Lassi", ingredients: ["Yogurt", "Mango", "Sugar", "Cardamom"], prepTime: "5 min", mealType: "Refreshment", tags: ["indian", "refreshing"], dietaryFlags: ["Vegetarian", "Egg-free", "Gluten-free"], macros: { calories: 280, carbs: 50, fat: 6, protein: 8 } },

    // DINNER
    { title: "Khichdi", ingredients: ["Rice", "Moong Dal", "Ghee", "Cumin Seeds", "Turmeric"], prepTime: "25 min", mealType: "Dinner", tags: ["comfort-food", "easy-digest", "baby-friendly"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 320, carbs: 52, fat: 8, protein: 12 } },
    { title: "Roti & Sabzi Thali", ingredients: ["Atta", "Potato", "Cauliflower", "Spinach", "Ghee"], prepTime: "30 min", mealType: "Dinner", tags: ["north-indian", "balanced"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 480, carbs: 65, fat: 16, protein: 14 } },
    { title: "Paneer Butter Masala", ingredients: ["Paneer", "Tomato", "Cream", "Butter", "Cashews"], prepTime: "30 min", mealType: "Dinner", tags: ["rich", "north-indian", "restaurant-style"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 550, carbs: 20, fat: 45, protein: 20 } },
    { title: "Baingan Bharta", ingredients: ["Eggplant", "Onion", "Tomato", "Garlic", "Mustard Oil"], prepTime: "25 min", mealType: "Dinner", tags: ["indian", "smoky"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 240, carbs: 28, fat: 12, protein: 6 } },
    { title: "Mixed Vegetable Curry", ingredients: ["Carrot", "Peas", "Potato", "Beans", "Coconut Milk"], prepTime: "25 min", mealType: "Dinner", tags: ["indian", "mild", "kid-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 310, carbs: 35, fat: 16, protein: 8 } },
    { title: "Mushroom Masala", ingredients: ["Mushroom", "Onion", "Tomato", "Garlic", "Cream"], prepTime: "20 min", mealType: "Dinner", tags: ["indian", "rich"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 320, carbs: 22, fat: 24, protein: 10 } },
    { title: "Egg Curry", ingredients: ["Eggs", "Onion", "Tomato", "Garlic", "Turmeric", "Garam Masala"], prepTime: "25 min", mealType: "Dinner", tags: ["indian", "protein-rich"], dietaryFlags: ["Gluten-free", "Dairy-free"], macros: { calories: 380, carbs: 18, fat: 26, protein: 22 } },
    { title: "Bottle Gourd Chana Dal", ingredients: ["Bottle Gourd", "Chickpeas", "Tomato", "Turmeric", "Ghee"], prepTime: "30 min", mealType: "Dinner", tags: ["indian", "light", "healthy"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 290, carbs: 40, fat: 8, protein: 15 } },
    { title: "Sweet Potato Tikki", ingredients: ["Sweet Potato", "Peas", "Besan", "Cumin Seeds", "Coriander"], prepTime: "20 min", mealType: "Dinner", tags: ["indian", "snack", "kid-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free"], macros: { calories: 340, carbs: 55, fat: 10, protein: 8 } },

    // BABY & TODDLER (From Kitchen Kathukutty)
    { title: "Papaya Puree", ingredients: ["Papaya"], prepTime: "5 min", mealType: "Refreshment", tags: ["baby-food", "puree", "healthy", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 50, carbs: 13, fat: 0, protein: 0 } },
    { title: "Carrot Puree", ingredients: ["Carrot"], prepTime: "15 min", mealType: "Lunch", tags: ["baby-food", "puree", "healthy"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 40, carbs: 9, fat: 0, protein: 1 } },
    { title: "ABC Puree", ingredients: ["Apple", "Beetroot", "Carrot"], prepTime: "20 min", mealType: "Lunch", tags: ["baby-food", "puree", "healthy"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 60, carbs: 15, fat: 0, protein: 1 } },
    { title: "Apple Banana Pear Puree", ingredients: ["Apple", "Banana", "Pear"], prepTime: "15 min", mealType: "Refreshment", tags: ["baby-food", "puree", "healthy"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 80, carbs: 20, fat: 0, protein: 1 } },
    { title: "Home made Cerelac / Sathu Maavu", ingredients: ["Rice", "Wheat", "Millets", "Moong Dal", "Almonds"], prepTime: "10 min", mealType: "Breakfast", tags: ["baby-food", "porridge", "healthy"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 150, carbs: 30, fat: 2, protein: 5 } },
    { title: "Idiyappam", ingredients: ["Rice Flour", "Coconut"], prepTime: "30 min", mealType: "Breakfast", tags: ["toddler-food", "steamed", "south-indian"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 200, carbs: 45, fat: 2, protein: 4 } },
    { title: "Kal Dosa", ingredients: ["Rice", "Urad Dal", "Fenugreek"], prepTime: "15 min", mealType: "Breakfast", tags: ["toddler-food", "soft", "south-indian"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 120, carbs: 25, fat: 1, protein: 3 } },
    { title: "Kara Kuzhi Paniyaram", ingredients: ["Idly Batter", "Onion", "Mustard Seeds", "Curry Leaves"], prepTime: "20 min", mealType: "Breakfast", tags: ["toddler-food", "snack", "south-indian"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 180, carbs: 30, fat: 5, protein: 4 } },
    { title: "Sothi (Coconut milk Vegetable stew)", ingredients: ["Coconut Milk", "Carrot", "Beans", "Potato"], prepTime: "30 min", mealType: "Lunch", tags: ["toddler-food", "stew", "mild"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 250, carbs: 20, fat: 18, protein: 3 } },
    { title: "Tomato Kolakari (Khicidi)", ingredients: ["Rice", "Tomato", "Moong Dal", "Ghee"], prepTime: "25 min", mealType: "Lunch", tags: ["toddler-food", "one-pot", "tangy"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 280, carbs: 45, fat: 8, protein: 6 } },
    { title: "Baby Corn Pulao", ingredients: ["Rice", "Baby Corn", "Onion", "Ghee"], prepTime: "30 min", mealType: "Lunch", tags: ["toddler-food", "rice-dish", "mild"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 300, carbs: 50, fat: 9, protein: 5 } },
    { title: "Beet root Rice", ingredients: ["Rice", "Beetroot", "Ghee", "Cashews"], prepTime: "25 min", mealType: "Lunch", tags: ["toddler-food", "colourful", "iron-rich"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 270, carbs: 48, fat: 7, protein: 5 } },
    { title: "Almond Mutter Mushroom", ingredients: ["Mushroom", "Peas", "Almonds", "Onion", "Tomato"], prepTime: "30 min", mealType: "Dinner", tags: ["toddler-food", "gravy", "rich"], dietaryFlags: ["Vegetarian", "Gluten-free", "Egg-free"], macros: { calories: 240, carbs: 15, fat: 16, protein: 8 } },
    { title: "Veg Masala Macaroni", ingredients: ["Pasta", "Tomato", "Carrot", "Peas"], prepTime: "20 min", mealType: "Dinner", tags: ["toddler-food", "pasta", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free"], macros: { calories: 320, carbs: 60, fat: 5, protein: 9 } },
    { title: "Cheese Paratha", ingredients: ["Atta", "Cheese", "Ghee"], prepTime: "20 min", mealType: "Dinner", tags: ["toddler-food", "high-calcium", "kids-favourite"], dietaryFlags: ["Vegetarian", "Egg-free"], macros: { calories: 250, carbs: 30, fat: 12, protein: 8 } },
    { title: "Multigrain Roti", ingredients: ["Atta", "Ragi Flour", "Besan"], prepTime: "25 min", mealType: "Dinner", tags: ["toddler-food", "healthy", "high-fibre"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free"], macros: { calories: 150, carbs: 28, fat: 2, protein: 5 } },
    { title: "Sweet Corn Soup", ingredients: ["Sweet Corn", "Carrot", "Beans", "Vegetable Broth"], prepTime: "15 min", mealType: "Refreshment", tags: ["toddler-food", "soup", "comfort"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"], macros: { calories: 90, carbs: 18, fat: 1, protein: 3 } },

    // EXTRAS FROM PARTH-OS
    { title: "Veggie Omelette", ingredients: ["Eggs", "Onion", "Tomato", "Spinach", "Mushroom"], prepTime: "15 min", mealType: "Breakfast", tags: ["breakfast", "high-protein"], dietaryFlags: ["Dairy-free", "Gluten-free"] },
    { title: "Chickpea Spinach Curry", ingredients: ["Chickpeas", "Onion", "Garlic", "Spinach", "Tomato", "Rice"], prepTime: "30 min", mealType: "Dinner", tags: ["vegan", "one-pot"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Pasta Primavera", ingredients: ["Pasta", "Olive Oil", "Garlic", "Broccoli", "Bell Pepper", "Zucchini"], prepTime: "25 min", mealType: "Dinner", tags: ["vegetarian", "quick"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free"] },
    { title: "Lentil Soup", ingredients: ["Lentils", "Onion", "Carrot", "Garlic", "Tomato", "Cabbage"], prepTime: "35 min", mealType: "Dinner", tags: ["vegan", "soup"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Rice and Beans Bowl", ingredients: ["Rice", "Beans", "Tomato", "Onion", "Bell Pepper"], prepTime: "20 min", mealType: "Dinner", tags: ["vegan", "meal-prep"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Vegetable Fried Rice", ingredients: ["Rice", "Eggs", "Onion", "Peas", "Carrot", "Green Beans"], prepTime: "20 min", mealType: "Dinner", tags: ["quick", "one-pan"], dietaryFlags: ["Dairy-free", "Gluten-free"] },
    { title: "Tomato Basil Pasta", ingredients: ["Pasta", "Tomato", "Olive Oil", "Garlic", "Onion", "Spinach"], prepTime: "18 min", mealType: "Dinner", tags: ["vegetarian", "quick"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free"] },
    { title: "Stuffed Bell Peppers", ingredients: ["Bell Pepper", "Rice", "Beans", "Tomato", "Onion"], prepTime: "40 min", mealType: "Dinner", tags: ["baked", "vegetarian"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Aloo Matar", ingredients: ["Potato", "Peas", "Onion", "Tomato", "Garlic", "Rice"], prepTime: "30 min", mealType: "Dinner", tags: ["vegan", "indian"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Mushroom Toast", ingredients: ["Bread", "Mushroom", "Garlic", "Onion", "Spinach"], prepTime: "15 min", mealType: "Breakfast", tags: ["breakfast", "quick"], dietaryFlags: ["Egg-free", "Dairy-free"] },
    { title: "Cabbage Stir Fry", ingredients: ["Cabbage", "Onion", "Garlic", "Carrot", "Peas", "Rice"], prepTime: "18 min", mealType: "Dinner", tags: ["vegan", "stir-fry"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Broccoli Pasta", ingredients: ["Pasta", "Broccoli", "Garlic", "Olive Oil", "Mushroom", "Peas"], prepTime: "22 min", mealType: "Dinner", tags: ["vegetarian", "quick"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free"] },
    { title: "Carrot Lentil Stew", ingredients: ["Lentils", "Carrot", "Onion", "Tomato", "Garlic", "Spinach"], prepTime: "35 min", mealType: "Dinner", tags: ["vegan", "stew"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Zucchini Noodles", ingredients: ["Zucchini", "Garlic", "Olive Oil", "Tomato", "Mushroom", "Onion"], prepTime: "15 min", mealType: "Dinner", tags: ["low-carb", "quick"], dietaryFlags: ["Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Bean Tacos", ingredients: ["Beans", "Onion", "Tomato", "Cabbage", "Bell Pepper"], prepTime: "20 min", mealType: "Dinner", tags: ["mexican", "quick"], dietaryFlags: ["Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Spinach Rice Pilaf", ingredients: ["Rice", "Spinach", "Onion", "Peas", "Garlic", "Carrot"], prepTime: "25 min", mealType: "Dinner", tags: ["one-pot", "vegetarian"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Potato Hash", ingredients: ["Potato", "Onion", "Bell Pepper", "Eggs", "Mushroom"], prepTime: "20 min", mealType: "Breakfast", tags: ["breakfast", "one-pan"], dietaryFlags: ["Dairy-free", "Gluten-free"] },
    { title: "Shakshuka", ingredients: ["Eggs", "Tomato", "Onion", "Bell Pepper", "Garlic", "Bread"], prepTime: "25 min", mealType: "Breakfast", tags: ["breakfast", "one-pan"], dietaryFlags: ["Dairy-free"] },
    { title: "Veggie Quesadilla", ingredients: ["Bread", "Bell Pepper", "Onion", "Tomato", "Beans"], prepTime: "12 min", mealType: "Refreshment", tags: ["quick", "snack"], dietaryFlags: ["Egg-free", "Dairy-free"] },
    { title: "Cauliflower Rice Bowl", ingredients: ["Cauliflower", "Onion", "Peas", "Carrot", "Garlic"], prepTime: "18 min", mealType: "Dinner", tags: ["low-carb", "quick"], dietaryFlags: ["Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Tomato Lentil Pasta", ingredients: ["Lentils", "Pasta", "Tomato", "Garlic", "Onion", "Spinach"], prepTime: "30 min", mealType: "Dinner", tags: ["high-protein", "vegetarian"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free"] },
    { title: "Green Bean Stir Fry", ingredients: ["Green Beans", "Garlic", "Onion", "Carrot", "Rice", "Mushroom"], prepTime: "20 min", mealType: "Dinner", tags: ["vegan", "stir-fry"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Pea Mushroom Pasta", ingredients: ["Pasta", "Peas", "Mushroom", "Garlic", "Onion", "Olive Oil"], prepTime: "22 min", mealType: "Dinner", tags: ["vegetarian", "quick"], dietaryFlags: ["Vegetarian", "Egg-free", "Dairy-free"] },
    { title: "Rustic Veg Soup", ingredients: ["Onion", "Carrot", "Tomato", "Cabbage", "Potato", "Beans"], prepTime: "32 min", mealType: "Dinner", tags: ["vegan", "soup"], dietaryFlags: ["Vegan", "Dairy-free", "Egg-free", "Vegetarian", "Gluten-free"] },
    { title: "Chickpea Salad Toast", ingredients: ["Chickpeas", "Bread", "Tomato", "Onion", "Cabbage"], prepTime: "10 min", mealType: "Dinner", tags: ["quick", "high-protein"], dietaryFlags: ["Egg-free", "Dairy-free"] },
    { title: "Moong Dal Khichdi (Baby)", ingredients: ["Rice", "Moong Dal", "Carrot", "Bottle Gourd", "Ghee"], prepTime: "25 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "toddler-friendly", "one-pot"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Vegetable Suji Upma (Toddler)", ingredients: ["Suji", "Onion", "Carrot", "Peas", "Ghee"], prepTime: "18 min", mealType: "Dinner", tags: ["indian", "toddler-friendly", "quick"], dietaryFlags: ["Egg-free"] },
    { title: "Ragi Porridge (Baby)", ingredients: ["Ragi Flour", "Ghee", "Milk", "Banana"], prepTime: "12 min", mealType: "Breakfast", tags: ["indian", "baby-friendly", "breakfast"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Poha with Veg (Toddler)", ingredients: ["Poha", "Onion", "Peas", "Carrot", "Potato"], prepTime: "15 min", mealType: "Dinner", tags: ["indian", "toddler-friendly", "quick"], dietaryFlags: ["Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Dal Rice Mash", ingredients: ["Rice", "Lentils", "Ghee", "Pumpkin", "Carrot"], prepTime: "25 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "comfort"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Vazhaithandu (Plantain Pith) Dosa", ingredients: ["Plantain Pith", "Rice", "Urad Dal"], prepTime: "20 min", mealType: "Breakfast", tags: ["healthy", "toddler-friendly", "south-indian"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Vendhaya (Fenugreek) Dosa", ingredients: ["Rice", "Fenugreek Seeds", "Urad Dal"], prepTime: "15 min", mealType: "Breakfast", tags: ["healthy", "toddler-friendly", "south-indian"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Green Peas Dosa", ingredients: ["Rice", "Green Peas", "Ginger", "Urad Dal"], prepTime: "20 min", mealType: "Breakfast", tags: ["healthy", "colourful", "toddler-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Gobi Masala Roast", ingredients: ["Cauliflower", "Onion", "Tomato", "Dosa Batter"], prepTime: "25 min", mealType: "Breakfast", tags: ["toddler-friendly", "tasty"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Moong dhal Chilla", ingredients: ["Moong Dal", "Ginger", "Coriander", "Curry Leaves"], prepTime: "15 min", mealType: "Breakfast", tags: ["high-protein", "baby-friendly", "quick"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Cheese stuffed gobi koftha curry", ingredients: ["Cauliflower", "Cheese", "Tomato", "Cashews", "Cream"], prepTime: "40 min", mealType: "Dinner", tags: ["rich", "kids-favourite", "party-food"], dietaryFlags: ["Vegetarian", "Egg-free", "Gluten-free"] },
    { title: "Almond Daliya Khicidi", ingredients: ["Broken Wheat", "Almonds", "Carrot", "Moong Dal", "Ghee"], prepTime: "30 min", mealType: "Lunch", tags: ["healthy", "filling", "baby-friendly"], dietaryFlags: ["Vegetarian", "Egg-free"] },
    { title: "Red poha Upma", ingredients: ["Red Poha", "Onion", "Peas", "Carrot", "Peanuts"], prepTime: "15 min", mealType: "Breakfast", tags: ["healthy", "iron-rich", "toddler-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Egg-free", "Dairy-free", "Gluten-free"] },
    { title: "Spring onion kootu", ingredients: ["Spring Onion", "Moong Dal", "Coconut", "Turmeric"], prepTime: "20 min", mealType: "Lunch", tags: ["healthy", "mild", "toddler-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Chayote Kootu", ingredients: ["Chayote", "Moong Dal", "Coconut", "Ginger"], prepTime: "20 min", mealType: "Lunch", tags: ["healthy", "mild", "baby-friendly"], dietaryFlags: ["Vegetarian", "Vegan", "Gluten-free", "Egg-free", "Dairy-free"] },
    { title: "Pumpkin Dal Soup (Baby)", ingredients: ["Pumpkin", "Moong Dal", "Ghee", "Garlic", "Carrot"], prepTime: "22 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "soup"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Besan Chilla (Soft)", ingredients: ["Besan", "Onion", "Tomato", "Spinach", "Ghee"], prepTime: "15 min", mealType: "Breakfast", tags: ["indian", "toddler-friendly", "breakfast"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Sweet Potato Khichdi", ingredients: ["Rice", "Moong Dal", "Sweet Potato", "Ghee", "Carrot", "Peas"], prepTime: "28 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "one-pot"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Beetroot Rice Mash", ingredients: ["Rice", "Beetroot", "Ghee", "Carrot", "Peas"], prepTime: "24 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "toddler-friendly"], dietaryFlags: ["Egg-free", "Gluten-free"] },
    { title: "Lauki Dal (Bottle Gourd)", ingredients: ["Bottle Gourd", "Moong Dal", "Onion", "Garlic", "Ghee"], prepTime: "26 min", mealType: "Dinner", tags: ["indian", "baby-friendly", "toddler-friendly"], dietaryFlags: ["Egg-free", "Gluten-free"] },
];

function fuzzyMatch(ingredient: string, pantryName: string): boolean {
    const a = ingredient.toLowerCase();
    const b = pantryName.toLowerCase();
    return a === b || a.includes(b) || b.includes(a);
}

export function getLocalRecommendations(
    pantryItems: PantryItem[],
    dietaryRestrictions: string[]
): RecipeRecommendation[] {
    const pantryNames = pantryItems.map(i => i.name);

    // Filter by dietary restrictions first
    let filtered = RECIPE_DB;
    if (dietaryRestrictions.length > 0) {
        filtered = RECIPE_DB.filter(r =>
            dietaryRestrictions.every(dr => r.dietaryFlags.includes(dr))
        );
    }

    // Score each recipe
    const scored = filtered.map(recipe => {
        const matched = recipe.ingredients.filter(ing =>
            pantryNames.some(pn => fuzzyMatch(ing, pn))
        );
        const missing = recipe.ingredients.filter(ing =>
            !pantryNames.some(pn => fuzzyMatch(ing, pn))
        );
        const matchPercentage = Math.round((matched.length / recipe.ingredients.length) * 100);

        return {
            id: crypto.randomUUID(),
            title: recipe.title,
            ingredients: recipe.ingredients,
            matchPercentage,
            missingIngredients: missing,
            prepTime: recipe.prepTime,
            mealType: recipe.mealType,
            tier: (matchPercentage === 100 ? 1 : 2) as 1 | 2,
            tags: recipe.tags,
        };
    });

    // Sort: Tier 1 first (100%), then by match % descending
    scored.sort((a, b) => {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return b.matchPercentage - a.matchPercentage;
    });

    // Return top recipes with at least 30% match, or all if pantry is empty
    if (pantryNames.length === 0) return scored;
    return scored.filter(r => r.matchPercentage >= 30);
}
