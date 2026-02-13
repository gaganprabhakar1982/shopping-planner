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

export const defaultMasterItems = [
  // Dairy
  { name: 'Milk', category: 'Dairy', defaultQty: 1, defaultPackets: 2 },
  { name: 'Curd / Yogurt', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },
  { name: 'Paneer', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },
  { name: 'Butter', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },
  { name: 'Cheese', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },
  { name: 'Ghee', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },
  { name: 'Cream', category: 'Dairy', defaultQty: 1, defaultPackets: 1 },

  // Vegetables
  { name: 'Onion', category: 'Vegetables', defaultQty: 2, defaultPackets: 1 },
  { name: 'Tomato', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Potato', category: 'Vegetables', defaultQty: 2, defaultPackets: 1 },
  { name: 'Green Chilli', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Ginger', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Garlic', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Capsicum', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Carrot', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Beans', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Spinach', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Cauliflower', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Brinjal', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Cabbage', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Coriander Leaves', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Curry Leaves', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },
  { name: 'Lemon', category: 'Vegetables', defaultQty: 1, defaultPackets: 1 },

  // Fruits
  { name: 'Banana', category: 'Fruits', defaultQty: 6, defaultPackets: 1 },
  { name: 'Apple', category: 'Fruits', defaultQty: 4, defaultPackets: 1 },
  { name: 'Orange', category: 'Fruits', defaultQty: 4, defaultPackets: 1 },
  { name: 'Grapes', category: 'Fruits', defaultQty: 1, defaultPackets: 1 },
  { name: 'Papaya', category: 'Fruits', defaultQty: 1, defaultPackets: 1 },
  { name: 'Pomegranate', category: 'Fruits', defaultQty: 2, defaultPackets: 1 },
  { name: 'Watermelon', category: 'Fruits', defaultQty: 1, defaultPackets: 1 },

  // Grains & Pulses
  { name: 'Rice', category: 'Grains & Pulses', defaultQty: 5, defaultPackets: 1 },
  { name: 'Wheat Flour (Atta)', category: 'Grains & Pulses', defaultQty: 5, defaultPackets: 1 },
  { name: 'Toor Dal', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Moong Dal', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Chana Dal', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Urad Dal', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Masoor Dal', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Rajma', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Poha', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Oats', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Suji (Semolina)', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Besan', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },
  { name: 'Maida', category: 'Grains & Pulses', defaultQty: 1, defaultPackets: 1 },

  // Spices
  { name: 'Turmeric Powder', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Red Chilli Powder', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Coriander Powder', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Cumin (Jeera)', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Mustard Seeds', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Garam Masala', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Salt', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Sugar', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Black Pepper', category: 'Spices', defaultQty: 1, defaultPackets: 1 },
  { name: 'Bay Leaves', category: 'Spices', defaultQty: 1, defaultPackets: 1 },

  // Snacks
  { name: 'Biscuits', category: 'Snacks', defaultQty: 1, defaultPackets: 2 },
  { name: 'Namkeen / Mixture', category: 'Snacks', defaultQty: 1, defaultPackets: 1 },
  { name: 'Chips', category: 'Snacks', defaultQty: 1, defaultPackets: 2 },
  { name: 'Bread', category: 'Snacks', defaultQty: 1, defaultPackets: 1 },
  { name: 'Eggs', category: 'Snacks', defaultQty: 1, defaultPackets: 1 },
  { name: 'Instant Noodles', category: 'Snacks', defaultQty: 1, defaultPackets: 4 },
  { name: 'Peanuts', category: 'Snacks', defaultQty: 1, defaultPackets: 1 },
  { name: 'Dry Fruits Mix', category: 'Snacks', defaultQty: 1, defaultPackets: 1 },

  // Beverages
  { name: 'Tea (Chai)', category: 'Beverages', defaultQty: 1, defaultPackets: 1 },
  { name: 'Coffee', category: 'Beverages', defaultQty: 1, defaultPackets: 1 },
  { name: 'Juice', category: 'Beverages', defaultQty: 1, defaultPackets: 1 },
  { name: 'Soft Drinks', category: 'Beverages', defaultQty: 1, defaultPackets: 2 },
  { name: 'Water Bottles', category: 'Beverages', defaultQty: 1, defaultPackets: 1 },

  // Household
  { name: 'Dish Soap', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Laundry Detergent', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Floor Cleaner', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Toilet Cleaner', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Scrub Pad', category: 'Household', defaultQty: 1, defaultPackets: 2 },
  { name: 'Garbage Bags', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Aluminium Foil', category: 'Household', defaultQty: 1, defaultPackets: 1 },
  { name: 'Tissues / Napkins', category: 'Household', defaultQty: 1, defaultPackets: 1 },

  // Personal Care
  { name: 'Soap', category: 'Personal Care', defaultQty: 1, defaultPackets: 3 },
  { name: 'Shampoo', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
  { name: 'Toothpaste', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
  { name: 'Toothbrush', category: 'Personal Care', defaultQty: 1, defaultPackets: 2 },
  { name: 'Hair Oil', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
  { name: 'Body Lotion', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
  { name: 'Face Wash', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
  { name: 'Deodorant', category: 'Personal Care', defaultQty: 1, defaultPackets: 1 },
]
