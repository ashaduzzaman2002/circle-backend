const slugify = require('slugify');
const { City } = require('../models/Model');

function generateUniqueSlugForRestaurant(string, callback) {
    let slug = slugify(string);
  
    
    City.restaurants(slug, (exists) => {
      if (!exists) {
        callback(slug);
      } else {
        let identifier = Date.now();
        slug = `${slug}-${identifier}`;
        generateUniqueSlug(string, callback);
      }
    });
  }
  