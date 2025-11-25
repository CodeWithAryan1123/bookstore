/**
 * Utility to dynamically update meta tags for SEO
 */

export const updateMetaTags = ({ title, description, image, url, type = 'website' }) => {
  // Update title
  if (title) {
    document.title = title;
    updateMetaTag('og:title', title);
    updateMetaTag('twitter:title', title);
  }

  // Update description
  if (description) {
    updateMetaTag('description', description, 'name');
    updateMetaTag('og:description', description);
    updateMetaTag('twitter:description', description);
  }

  // Update image
  if (image) {
    updateMetaTag('og:image', image);
    updateMetaTag('twitter:image', image);
  }

  // Update URL
  if (url) {
    updateMetaTag('og:url', url);
    updateMetaTag('twitter:url', url);
  }

  // Update type
  updateMetaTag('og:type', type);
};

/**
 * Helper function to update or create a meta tag
 */
const updateMetaTag = (property, content, attributeName = 'property') => {
  let element = document.querySelector(`meta[${attributeName}="${property}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, property);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

/**
 * Reset meta tags to default values
 */
export const resetMetaTags = () => {
  updateMetaTags({
    title: 'Once Upon A Bookshelf - Your Literary Paradise',
    description: 'Discover a world of books at Once Upon A Bookshelf. Shop bestsellers, new releases, and classics across all genres. Fast shipping, great prices, and curated collections.',
    image: 'https://onceuponabookshelf.com/og-image.jpg',
    url: 'https://onceuponabookshelf.com/',
    type: 'website'
  });
};
