import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API}/news`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-in">News & Updates</h1>
          <p className="text-lg sm:text-xl max-w-3xl text-gray-300 animate-in" style={{ animationDelay: '0.2s' }}>
            Stay updated with our latest projects, achievements, and community initiatives.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <Link
                  to={`/news/${article.id}`}
                  key={article.id}
                  data-testid={`news-article-${index}`}
                >
                  <article
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      <img
                        src={article.image_url || 'https://images.unsplash.com/photo-1559690869-1005b5a5ee41?crop=entropy&cs=srgb&fm=jpg&q=85'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-[#20B2AA] transition-colors duration-200">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.short_content || article.content}
                      </p>
                      <div className="flex items-center gap-2 text-[#20B2AA] font-medium text-sm group-hover:gap-4 transition-all duration-200">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
