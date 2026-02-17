
export default class TrendingFeature {
  constructor(container) {
    this.container = container;
  }

  render(book) {
    if (!this.container) return;
    this.container.innerHTML = trendingFeatureTemplate(book);
  }
}

export function trendingFeatureTemplate(book) {
  return `
    <div class="trending-card">
      <img 
        src="${book.cover}" 
        alt="Cover of ${book.title}"
        class="trending-cover"
        loading="lazy"
      >

      <h3 class="trending-title">${book.title}</h3>

      <p class="trending-label">🔥 Trending Now</p>

      <a href="/trending/index.html" class="btn">
        View All Trending
      </a>
    </div>
  `;
}
