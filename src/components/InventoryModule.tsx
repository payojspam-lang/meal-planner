import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import { useAppContext } from "../context/AppContext.tsx";

const EXHAUSTIVE_STAPLES = [
    // Grains & Flours
    'Rice (Basmati/Sona Masuri)', 'Brown Rice', 'Whole Wheat Atta', 'Maida (Refined Flour)',
    'Suji (Semolina)', 'Poha (Flattened Rice)', 'Oats', 'Dalia (Broken Wheat)',
    'Besan (Gram Flour)', 'Ragi Flour', 'Bajra Flour', 'Jowar Flour',
    'Rice Flour', 'Quinoa', 'Pasta', 'Noodles', 'Bread',
    // Dals & Lentils
    'Toor Dal (Pigeon Pea)', 'Moong Dal (Yellow)', 'Green Moong (Whole)',
    'Masoor Dal (Red Lentil)', 'Chana Dal', 'Urad Dal', 'Rajma (Kidney Beans)',
    'Kabuli Chana (White Chickpeas)', 'Kala Chana (Black Chickpeas)', 'Lobia (Black-eyed Peas)',
    'Soybeans', 'Matar (Dried Peas)',
    // Oils & Fats
    'Mustard Oil', 'Sunflower Oil', 'Groundnut Oil', 'Olive Oil', 'Coconut Oil',
    'Ghee', 'Butter', 'Sesame Oil',
    // Dairy & Alternatives
    'Milk', 'Yogurt (Dahi)', 'Paneer', 'Cheese', 'Cream', 'Coconut Milk', 'Tofu', 'Eggs',
    // Core Spices (Powders)
    'Turmeric (Haldi)', 'Red Chilli Powder', 'Coriander Powder', 'Cumin Powder',
    'Garam Masala', 'Amchur (Mango Powder)', 'Chaat Masala', 'Black Pepper',
    'Salt', 'Black Salt (Kala Namak)', 'Hing (Asafoetida)',
    // Whole Spices
    'Cumin Seeds (Jeera)', 'Mustard Seeds (Rai)', 'Coriander Seeds', 'Fennel Seeds (Saunf)',
    'Fenugreek Seeds (Methi)', 'Cloves (Laung)', 'Cardamom (Elaichi)', 'Cinnamon (Dalchini)',
    'Bay Leaf (Tej Patta)', 'Star Anise', 'Curry Leaves', 'Dry Red Chillies',
    // Nuts & Seeds
    'Peanuts', 'Almonds', 'Cashews', 'Walnuts', 'Raisins', 'Dates',
    'Sesame Seeds (Til)', 'Flax Seeds', 'Chia Seeds', 'Pumpkin Seeds',
    // Condiments & Extras
    'Sugar', 'Jaggery (Gud)', 'Honey', 'Tamarind (Imli)', 'Lemon Juice',
    'Tomato Ketchup', 'Soy Sauce', 'Vinegar', 'Ginger Garlic Paste'
].sort();

const EXHAUSTIVE_VEGETABLES = [
    // Aromatics
    'Onion', 'Tomato', 'Garlic', 'Ginger', 'Green Chilli', 'Coriander Leaves (Dhania)',
    'Mint Leaves (Pudina)',
    // Roots
    'Potato', 'Carrot', 'Beetroot', 'Radish (Mooli)', 'Sweet Potato', 'Turnip', 'Colocasia (Arbi)',
    // Gourds & Melons
    'Bottle Gourd (Lauki)', 'Bitter Gourd (Karela)', 'Ridge Gourd (Turai)', 'Sponge Gourd (Nenua)',
    'Ash Gourd', 'Snake Gourd', 'Ivy Gourd (Tindora)', 'Pointed Gourd (Parwal)', 'Pumpkin (Kaddu)',
    // Greens
    'Spinach (Palak)', 'Fenugreek Leaves (Methi)', 'Mustard Greens (Sarson)', 'Amaranth Leaves (Chaulai)',
    'Cabbage', 'Spring Onion', 'Bathua',
    // Others
    'Cauliflower (Gobi)', 'Broccoli', 'Capsicum / Bell Pepper (Shimla Mirch)',
    'French Beans', 'Cluster Beans (Gawar Phali)', 'Broad Beans (Sem)', 'Green Peas (Matar)',
    'Lady Finger (Bhindi)', 'Brinjal / Eggplant (Baingan)', 'Mushroom',
    'Raw Banana', 'Raw Papaya', 'Jackfruit (Kathal)', 'Drumstick (Moringa)'
].sort();

// Generic Searchable Dropdown Component
function SearchableDropdown({
    options,
    onAdd,
    placeholder,
    category
}: {
    options: string[],
    onAdd: (name: string, category: 'Staple' | 'Vegetable') => void,
    placeholder: string,
    category: 'Staple' | 'Vegetable'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (option: string) => {
        onAdd(option, category);
        setSearch("");
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && search.trim()) {
            onAdd(search.trim(), category);
            setSearch("");
            setIsOpen(false);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="w-full border border-muted/50 rounded-xl bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/50 transition-all flex items-center pr-3"
                onClick={() => setIsOpen(true)}
            >
                <Search size={16} className="text-muted ml-3 shrink-0" />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full pl-2 py-2.5 bg-transparent outline-none text-sm placeholder:text-muted/70"
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <ChevronDown size={16} className="text-muted shrink-0" />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-muted/30 rounded-xl shadow-lg shadow-black/5 max-h-60 overflow-y-auto z-50 p-2 text-sm">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleSelect(opt)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {opt}
                            </button>
                        ))
                    ) : (
                        <div className="text-muted p-3 text-center">
                            <p>No exact matches.</p>
                            <button
                                onClick={() => handleSelect(search)}
                                className="text-primary font-medium hover:underline mt-1"
                            >
                                Add "{search}" as custom item
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default function InventoryModule() {
    const { items, addItem, removeItem } = useAppContext();

    const handleAdd = (name: string, category: 'Staple' | 'Vegetable') => {
        if (!name.trim()) return;

        // Prevent exactly duplicate names
        const exists = items.some(i => i.name.toLowerCase() === name.toLowerCase());
        if (!exists) {
            addItem({ id: crypto.randomUUID(), name, category });
        }
    };

    const staples = items.filter(i => i.category === 'Staple');
    const vegetables = items.filter(i => i.category === 'Vegetable');

    return (
        <div id="section-meals" className="card space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">Pantry Inventory</h2>

            {/* Pantry Staples */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-textMain/80">Pantry Staples</h3>
                <SearchableDropdown
                    options={EXHAUSTIVE_STAPLES}
                    onAdd={handleAdd}
                    placeholder="Search staples or type custom..."
                    category="Staple"
                />

                <div className="flex flex-wrap gap-2">
                    {staples.map(i => (
                        <div key={i.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-textMain border border-muted/30 hover:border-muted/50 transition-colors shadow-sm">
                            {i.name}
                            <button onClick={() => removeItem(i.id)} className="text-muted hover:text-red-500 transition-colors bg-white rounded-full p-0.5">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    {staples.length === 0 && <span className="text-sm text-textMain/40 italic pl-1">No staples added yet.</span>}
                </div>
            </div>

            <hr className="border-muted/20" />

            {/* Vegetables */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-textMain/80">Vegetables</h3>
                <SearchableDropdown
                    options={EXHAUSTIVE_VEGETABLES}
                    onAdd={handleAdd}
                    placeholder="Search vegetables or type custom..."
                    category="Vegetable"
                />

                <div className="flex flex-wrap gap-2">
                    {vegetables.map(i => (
                        <div key={i.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-textMain border border-muted/30 hover:border-muted/50 transition-colors shadow-sm">
                            {i.name}
                            <button onClick={() => removeItem(i.id)} className="text-muted hover:text-red-500 transition-colors bg-white rounded-full p-0.5">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    {vegetables.length === 0 && <span className="text-sm text-textMain/40 italic pl-1">No vegetables added yet.</span>}
                </div>
            </div>

        </div>
    );
}
