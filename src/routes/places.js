const express = require('express');
const router = express.Router();

const places = [
  {
    place: 'Paris, France',
    photo: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
    description: 'The City of Light, home to the Eiffel Tower, Louvre Museum, and charming cafes along the Seine.'
  },
  {
    place: 'Kyoto, Japan',
    photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
    description: 'Ancient capital with stunning temples, traditional gardens, and the magical cherry blossom season.'
  },
  {
    place: 'Santorini, Greece',
    photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    description: 'Breathtaking sunsets, white-washed buildings, and crystal-clear waters of the Aegean Sea.'
  },
  {
    place: 'New York City, USA',
    photo: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'The city that never sleeps, featuring Times Square, Central Park, and iconic skyline views.'
  },
  {
    place: 'Machu Picchu, Peru',
    photo: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    description: 'Ancient Incan citadel perched high in the Andes Mountains, a UNESCO World Heritage site.'
  },
  {
    place: 'Bali, Indonesia',
    photo: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800',
    description: 'Tropical paradise with rice terraces, spiritual temples, and pristine beaches.'
  },
  {
    place: 'Swiss Alps',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Majestic mountain peaks, world-class skiing, and picturesque alpine villages.'
  },
  {
    place: 'Marrakech, Morocco',
    photo: 'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?w=800',
    description: 'Vibrant souks, stunning architecture, and the magical atmosphere of the medina.'
  }
];

router.get('/', (req, res) => {
  res.json(places);
});

module.exports = router; 