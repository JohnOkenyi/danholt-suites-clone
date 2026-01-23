export type MenuItem = {
    name: string;
    price: number;
    description: string;
    isVeg: boolean;
}

export const MENU_CATEGORIES = ["Appetizers", "Main Courses", "Desserts", "Beverages", "Wine Selection"];

export const MENU_ITEMS: Record<string, MenuItem[]> = {
    "Appetizers": [
        { name: "Suya Platter", price: 5500, description: "Spicy grilled beef skewers served with onions, tomatoes, and dried pepper.", isVeg: false },
        { name: "Pepper Soup", price: 4500, description: "Hot and spicy broth with assorted meats and traditional spices.", isVeg: false },
        { name: "Moi Moi", price: 3000, description: "Steamed bean pudding made from black-eyed peas, onions, and fresh ground peppers.", isVeg: true },
    ],
    "Main Courses": [
        { name: "Jollof Rice with Chicken", price: 8500, description: "The legendary Nigerian smoked rice served with fried plantains and grilled chicken.", isVeg: false },
        { name: "Egusi Soup with Pounded Yam", price: 9000, description: "Ground melon seed soup with leaf vegetables and assorted meat, served with soft pounded yam.", isVeg: false },
        { name: "Efo Riro with Eba", price: 7500, description: "Rich vegetable soup stirred in palm oil with crayfish and locust beans, served with cassava flour dough.", isVeg: false },
        { name: "Fried Rice with Chicken", price: 8000, description: "Stir-fried rice with mixed vegetables, liver, and prawns, paired with succulent chicken.", isVeg: false },
    ],
    "Desserts": [
        { name: "Chin Chin", price: 2000, description: "Crunchy fried dough nuggets, a beloved Nigerian snack.", isVeg: true },
        { name: "Puff Puff", price: 1500, description: "Soft, spongy, deep-fried dough balls dusted with sugar.", isVeg: true },
    ],
    "Beverages": [
        { name: "Chapman", price: 2500, description: "Nigeria's signature fruity mocktail with cucumber, lemon, and grenadine.", isVeg: true },
        { name: "Zobo Drink", price: 1800, description: "Refreshing hibiscus flower drink infused with ginger and pineapple.", isVeg: true },
        { name: "Nigerian Beer Selection", price: 2000, description: "Chilled selection of popular local lagers and stouts.", isVeg: true },
    ],
    "Wine Selection": [
        { name: "Palm Wine", price: 3500, description: "Traditional sweet, milky accents, tapped fresh from the palm tree.", isVeg: true },
    ]
};
