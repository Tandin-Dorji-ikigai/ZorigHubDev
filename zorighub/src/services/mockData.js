// Mock data for testing the frontend without backend
export const mockArtisans = [
  {
    _id: '1',
    fullName: 'Pema Wangmo',
    email: 'pema@example.com',
    photo: '/src/assets/images/people/pema.jpg',
    bio: 'Specializing in hand-woven silk textiles using techniques passed down through five generations of her family. Each pattern tells stories from Bhutanese folklore.',
    testimonial: 'This craft saved my family after my husband passed away. With what I earn, I can send my children to school and keep our traditions alive.',
    category: 'Single mother of three',
    specialization: 'Hand-woven silk textiles',
    walletAddress: '0x123...abc'
  },
  {
    _id: '2',
    fullName: 'Sangay Dorji',
    email: 'sangay@example.com',
    photo: '/src/assets/images/people/tshering.jpg',
    bio: 'Masters the intricate art of silver filigree despite limited mobility. His work decorates Buddhist altars and royal palaces throughout Bhutan.',
    testimonial: 'They said I couldn\'t continue my craft after the accident. This platform gave me a way to support my family and prove them wrong.',
    category: 'Disability artisan',
    specialization: 'Silver filigree',
    walletAddress: '0x456...def'
  },
  {
    _id: '3',
    fullName: 'Tashi Dorji',
    email: 'tashi@example.com',
    photo: '/src/assets/images/people/karma.jpg',
    bio: 'Creates traditional bamboo craftwork that was almost lost after floods destroyed his village. Each piece represents resilience of Bhutanese culture.',
    testimonial: 'When the floods took everything, this craft gave me purpose. Now I teach others so our traditions won\'t disappear.',
    category: 'Flood survivor',
    specialization: 'Bamboo craftwork',
    walletAddress: '0x789...ghi'
  }
];

export const mockProducts = [
  {
    _id: '1',
    name: 'Bhutanese Silk Scarf',
    description: 'Handwoven with 8 traditional symbols of protection',
    price: 3250,
    artisanShare: 850,
    image: '/src/assets/images/crafts/weave.jpg',
    artisan: mockArtisans[0],
    category: 'Textiles',
    featured: true,
    inStock: true,
    quantity: 5
  },
  {
    _id: '2',
    name: 'Silver Offering Bowls',
    description: 'Ritual vessels crafted following temple specifications',
    price: 12800,
    artisanShare: 3200,
    image: '/src/assets/images/crafts/silver-bowl.jpg',
    artisan: mockArtisans[1],
    category: 'Metalwork',
    featured: true,
    inStock: true,
    quantity: 3
  },
  {
    _id: '3',
    name: 'Traditional Bamboo Basket',
    description: 'Handwoven bamboo basket using ancient techniques',
    price: 1500,
    artisanShare: 400,
    image: '/api/placeholder/300/200',
    artisan: mockArtisans[2],
    category: 'Basketry',
    featured: false,
    inStock: true,
    quantity: 8
  },
  {
    _id: '4',
    name: 'Wooden Prayer Wheel',
    description: 'Intricately carved prayer wheel with traditional motifs',
    price: 5600,
    artisanShare: 1400,
    image: '/api/placeholder/300/200',
    artisan: mockArtisans[0],
    category: 'Woodwork',
    featured: true,
    inStock: false,
    quantity: 0
  }
];

export const mockCategories = [
  { _id: '1', name: 'Textiles', description: 'Traditional woven fabrics and clothing' },
  { _id: '2', name: 'Metalwork', description: 'Silver and bronze crafted items' },
  { _id: '3', name: 'Basketry', description: 'Bamboo and cane woven products' },
  { _id: '4', name: 'Woodwork', description: 'Carved wooden artifacts and furniture' },
  { _id: '5', name: 'Pottery', description: 'Traditional clay vessels and decorative items' }
];

export const mockUser = {
  _id: 'user1',
  fullName: 'John Doe',
  email: 'john@example.com',
  photo: 'https://static.thenounproject.com/png/4530368-200.png',
  walletAddress: '0xabc...123',
  role: 'buyer'
};



export const mockBuyers = [
  {
    _id: 'buyer1',
    fullName: 'Alice Buyer',
    email: 'alice@example.com',
    walletAddress: '0xBuyer1Address',
    purchaseHistory: [],
    role: 'buyer'
  },
  {
    _id: 'buyer2',
    fullName: 'Bob Shopper',
    email: 'bob@example.com',
    walletAddress: '0xBuyer2Address',
    purchaseHistory: [],
    role: 'buyer'
  }
];

export const mockAdmins = [
  {
    _id: 'admin1',
    fullName: 'Admin User',
    email: 'admin@example.com',
    walletAddress: '0xAdmin1Address',
    role: 'admin'
  }
];


