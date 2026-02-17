
export default class TopRatedFeature {
  constructor(container) {
    this.container = container;
  }

  render(book, rating) {
    if (!this.container) return;

    this.container.innerHTML = topRatedFeatureTemplate(book, rating);
    }
}

export function topRatedFeatureTemplate(book, rating) {
  return `
    <div class="top-rated-card">
      <img 
        src="${book.cover}" 
        alt="Cover of ${book.title}"
        class="top-rated-cover"
        loading="lazy"
      >

      <h3 class="top-rated-title">${book.title}</h3>

      <p class="top-rated-rating">
        ⭐ ${rating.average.toFixed(1)} 
        <span class="votes">(${rating.count} votes)</span>
      </p>

      <a href="/top_rated/index.html" class="btn">
        View Full Ranking
      </a>
    </div>
  `;
}
