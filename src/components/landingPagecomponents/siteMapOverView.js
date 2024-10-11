// components/SitemapOverview.js
import React from 'react';
import sitemapImg from './Cover.png'; // Import the uploaded image

const SitemapOverview = () => {
  return (
    <section>
      <div>
        <img src={sitemapImg} alt="Sitemap Overview" style={{ width: '100%' }} />
      </div>
    </section>
  );
};

export default SitemapOverview;
