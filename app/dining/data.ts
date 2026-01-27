export type MenuItem = {
    name: string;
    price: number;
    description: string;
    isVeg: boolean;
}

export const MENU_CATEGORIES = ["Main Dishes & Sides", "Swallow Meals"];

export const MENU_ITEMS: Record<string, MenuItem[]> = {
    "Main Dishes & Sides": [
        { name: "Jollof Rice", price: 4000, description: "Classic Nigerian smoky rice dish.", isVeg: true },
        { name: "White Rice", price: 4000, description: "Steamed white rice.", isVeg: true },
        { name: "Spicy Chicken", price: 2000, description: "Succulent chicken piece with spicy sauce.", isVeg: false },
        { name: "Indomie Spicy", price: 2500, description: "Spicy noodles prepared with vegetables and seasoning.", isVeg: true },
        { name: "Chicken Peppersoup", price: 2500, description: "Hot and spicy broth with chicken.", isVeg: false },
        { name: "Yam and Egg Sauce", price: 3000, description: "Boiled yam served with savory egg sauce.", isVeg: true },
        { name: "Afang Soup / Chicken", price: 4000, description: "Rich vegetable soup with chicken.", isVeg: false },
        { name: "Vegetable Soup / Chicken", price: 4000, description: "Fresh vegetable soup served with chicken.", isVeg: false },
        { name: "Shawarma / Chicken", price: 2500, description: "Wrap with chicken filling and creamy sauce.", isVeg: false },
        { name: "Special Fried Rice", price: 4000, description: "Fried rice with mixed vegetables and special seasoning.", isVeg: false },
        { name: "Spicy Chicken (Large)", price: 2500, description: "Large portion of spicy chicken.", isVeg: false },
        { name: "Fried 2 pieces Egg", price: 1000, description: "Two fried eggs.", isVeg: true },
    ],
    "Swallow Meals": [
        { name: "Garri & Egusi", price: 4000, description: "Cassava flakes dough served with melon seed soup and protein.", isVeg: false },
        { name: "Garri & Afang", price: 4000, description: "Cassava flakes dough served with Afang soup and protein.", isVeg: false },
        { name: "Semo & Soup", price: 4000, description: "Semolina dough served with your choice of soup (Egusi, Afang, Okra) and protein.", isVeg: false },
        { name: "Pounded Yam & Soup", price: 4000, description: "Soft pounded yam served with soup and protein.", isVeg: false },
        { name: "Amala & Soup", price: 4000, description: "Yam flour dough served with soup and protein.", isVeg: false },
    ]
};
