export const categories = [
  'Dairy',
  'Vegetables',
  'Fruits',
  'Grains & Pulses',
  'Spices',
  'Snacks',
  'Beverages',
  'Household',
  'Personal Care',
  'Other',
]

export const categoryEmojis = {
  'Dairy': '🥛',
  'Vegetables': '🥬',
  'Fruits': '🍎',
  'Grains & Pulses': '🌾',
  'Spices': '🌶️',
  'Snacks': '🍪',
  'Beverages': '🍵',
  'Household': '🧹',
  'Personal Care': '🧴',
  'Other': '📦',
}

export const units = [
  { value: 'pcs', label: 'pcs' },
  { value: 'kg', label: 'kg' },
  { value: 'g', label: 'g' },
  { value: 'L', label: 'L' },
  { value: 'ml', label: 'ml' },
]

export const categoryPreviews = {
  'Dairy': 'Milk, Curd, Paneer, Butter, Cheese...',
  'Vegetables': 'Onion, Tomato, Potato, Carrot, Beans...',
  'Fruits': 'Apple, Banana, Orange, Grapes...',
  'Grains & Pulses': 'Rice, Wheat, Dal, Chickpeas...',
  'Spices': 'Turmeric, Cumin, Coriander, Chili...',
  'Snacks': 'Biscuits, Chips, Namkeen, Nuts...',
  'Beverages': 'Tea, Coffee, Juice, Soft Drinks...',
  'Household': 'Detergent, Soap, Tissue, Cleaner...',
  'Personal Care': 'Shampoo, Toothpaste, Soap, Lotion...',
  'Other': 'Miscellaneous items...',
}

export const defaultMasterItems = [
  // Dairy
  { name: 'Milk', category: 'Dairy', defaultQty: 1, defaultUnit: 'L' },
  { name: 'Curd / Yogurt', category: 'Dairy', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Paneer', category: 'Dairy', defaultQty: 200, defaultUnit: 'g' },
  { name: 'Butter', category: 'Dairy', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Cheese', category: 'Dairy', defaultQty: 200, defaultUnit: 'g' },
  { name: 'Ghee', category: 'Dairy', defaultQty: 1, defaultUnit: 'L' },
  { name: 'Cream', category: 'Dairy', defaultQty: 200, defaultUnit: 'ml' },

  // Vegetables
  { name: 'Onion', category: 'Vegetables', defaultQty: 2, defaultUnit: 'kg' },
  { name: 'Tomato', category: 'Vegetables', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Potato', category: 'Vegetables', defaultQty: 2, defaultUnit: 'kg' },
  { name: 'Green Chilli', category: 'Vegetables', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Ginger', category: 'Vegetables', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Garlic', category: 'Vegetables', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Capsicum', category: 'Vegetables', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Carrot', category: 'Vegetables', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Beans', category: 'Vegetables', defaultQty: 250, defaultUnit: 'g' },
  { name: 'Spinach', category: 'Vegetables', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Cauliflower', category: 'Vegetables', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Brinjal', category: 'Vegetables', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Cabbage', category: 'Vegetables', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Coriander Leaves', category: 'Vegetables', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Curry Leaves', category: 'Vegetables', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Lemon', category: 'Vegetables', defaultQty: 6, defaultUnit: 'pcs' },

  // Fruits
  { name: 'Banana', category: 'Fruits', defaultQty: 6, defaultUnit: 'pcs' },
  { name: 'Apple', category: 'Fruits', defaultQty: 4, defaultUnit: 'pcs' },
  { name: 'Orange', category: 'Fruits', defaultQty: 4, defaultUnit: 'pcs' },
  { name: 'Grapes', category: 'Fruits', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Papaya', category: 'Fruits', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Pomegranate', category: 'Fruits', defaultQty: 2, defaultUnit: 'pcs' },
  { name: 'Watermelon', category: 'Fruits', defaultQty: 1, defaultUnit: 'pcs' },

  // Grains & Pulses
  { name: 'Rice', category: 'Grains & Pulses', defaultQty: 5, defaultUnit: 'kg' },
  { name: 'Wheat Flour (Atta)', category: 'Grains & Pulses', defaultQty: 5, defaultUnit: 'kg' },
  { name: 'Toor Dal', category: 'Grains & Pulses', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Moong Dal', category: 'Grains & Pulses', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Chana Dal', category: 'Grains & Pulses', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Urad Dal', category: 'Grains & Pulses', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Masoor Dal', category: 'Grains & Pulses', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Rajma', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Poha', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Oats', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Suji (Semolina)', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Besan', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },
  { name: 'Maida', category: 'Grains & Pulses', defaultQty: 500, defaultUnit: 'g' },

  // Spices
  { name: 'Turmeric Powder', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Red Chilli Powder', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Coriander Powder', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Cumin (Jeera)', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Mustard Seeds', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Garam Masala', category: 'Spices', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Salt', category: 'Spices', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Sugar', category: 'Spices', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Black Pepper', category: 'Spices', defaultQty: 50, defaultUnit: 'g' },
  { name: 'Bay Leaves', category: 'Spices', defaultQty: 1, defaultUnit: 'pcs' },

  // Snacks
  { name: 'Biscuits', category: 'Snacks', defaultQty: 2, defaultUnit: 'pcs' },
  { name: 'Namkeen / Mixture', category: 'Snacks', defaultQty: 200, defaultUnit: 'g' },
  { name: 'Chips', category: 'Snacks', defaultQty: 2, defaultUnit: 'pcs' },
  { name: 'Bread', category: 'Snacks', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Eggs', category: 'Snacks', defaultQty: 12, defaultUnit: 'pcs' },
  { name: 'Instant Noodles', category: 'Snacks', defaultQty: 4, defaultUnit: 'pcs' },
  { name: 'Peanuts', category: 'Snacks', defaultQty: 250, defaultUnit: 'g' },
  { name: 'Dry Fruits Mix', category: 'Snacks', defaultQty: 250, defaultUnit: 'g' },

  // Beverages
  { name: 'Tea (Chai)', category: 'Beverages', defaultQty: 250, defaultUnit: 'g' },
  { name: 'Coffee', category: 'Beverages', defaultQty: 100, defaultUnit: 'g' },
  { name: 'Juice', category: 'Beverages', defaultQty: 1, defaultUnit: 'L' },
  { name: 'Soft Drinks', category: 'Beverages', defaultQty: 2, defaultUnit: 'L' },
  { name: 'Water Bottles', category: 'Beverages', defaultQty: 1, defaultUnit: 'L' },

  // Household
  { name: 'Dish Soap', category: 'Household', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Laundry Detergent', category: 'Household', defaultQty: 1, defaultUnit: 'kg' },
  { name: 'Floor Cleaner', category: 'Household', defaultQty: 1, defaultUnit: 'L' },
  { name: 'Toilet Cleaner', category: 'Household', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Scrub Pad', category: 'Household', defaultQty: 2, defaultUnit: 'pcs' },
  { name: 'Garbage Bags', category: 'Household', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Aluminium Foil', category: 'Household', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Tissues / Napkins', category: 'Household', defaultQty: 1, defaultUnit: 'pcs' },

  // Personal Care
  { name: 'Soap', category: 'Personal Care', defaultQty: 3, defaultUnit: 'pcs' },
  { name: 'Shampoo', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Toothpaste', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Toothbrush', category: 'Personal Care', defaultQty: 2, defaultUnit: 'pcs' },
  { name: 'Hair Oil', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Body Lotion', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Face Wash', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
  { name: 'Deodorant', category: 'Personal Care', defaultQty: 1, defaultUnit: 'pcs' },
]
