import { useState, useEffect } from 'react';
import { Search, Clock, ArrowRight, BookOpen, AlertTriangle, FileText, MapPin } from 'lucide-react';

type Page = 
  | 'home' 
  | 'services/tourist-visa-extension' 
  | 'apply' 
  | 'track' 
  | 'knowledge' 
  | 'tools' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'refund' 
  | 'disclaimer' 
  | 'admin';

interface KnowledgeCenterProps {
  navigate: (page: Page) => void;
}

const categories = [
  { id: 'all', name: 'All Articles', icon: BookOpen },
  { id: 'extension', name: 'Visa Extension', icon: FileText },
  { id: 'overstay', name: 'Overstay Rules', icon: AlertTriangle },
  { id: 'updates', name: 'Immigration Updates', icon: Clock },
  { id: 'guide', name: 'Thailand Stay Guide', icon: MapPin },
];

const articles = [
  {
    id: 1,
    title: 'Complete Guide to Thailand Tourist Visa Extension',
    excerpt: 'Everything you need to know about extending your tourist visa in Thailand, including requirements, process, and timeline.',
    category: 'extension',
    readTime: '8 min read',
    date: '2026-02-01',
  },
  {
    id: 2,
    title: 'Understanding Overstay Penalties in Thailand',
    excerpt: 'Learn about the fines, consequences, and how to avoid overstaying your visa in Thailand.',
    category: 'overstay',
    readTime: '5 min read',
    date: '2026-01-28',
  },
  {
    id: 3,
    title: 'New Immigration Rules for 2026',
    excerpt: 'Stay updated with the latest changes to Thailand immigration policies and visa regulations.',
    category: 'updates',
    readTime: '4 min read',
    date: '2026-01-20',
  },
  {
    id: 4,
    title: 'Best Places to Stay in Bangkok for Digital Nomads',
    excerpt: 'Discover the top neighborhoods, coworking spaces, and accommodation options for long-term stays.',
    category: 'guide',
    readTime: '10 min read',
    date: '2026-01-15',
  },
  {
    id: 5,
    title: 'How to Fill Out the TM.7 Extension Form',
    excerpt: 'Step-by-step guide to completing the TM.7 form correctly for your visa extension application.',
    category: 'extension',
    readTime: '6 min read',
    date: '2026-01-10',
  },
  {
    id: 6,
    title: 'What Happens If You Overstay by One Day?',
    excerpt: 'Real stories and practical advice for dealing with accidental overstays in Thailand.',
    category: 'overstay',
    readTime: '7 min read',
    date: '2026-01-05',
  },
  {
    id: 7,
    title: 'Thailand Visa Run Options in 2026',
    excerpt: 'Explore the current visa run routes and alternatives for extending your stay in Thailand.',
    category: 'guide',
    readTime: '9 min read',
    date: '2025-12-28',
  },
  {
    id: 8,
    title: 'Immigration Office Hours and Locations',
    excerpt: 'Complete list of immigration offices across Thailand with updated hours and contact information.',
    category: 'updates',
    readTime: '5 min read',
    date: '2025-12-20',
  },
];

const KnowledgeCenter = ({ navigate }: KnowledgeCenterProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="w-full min-h-screen pt-20 pb-16 bg-[#F6F7F6]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Knowledge Center
          </h1>
          <p className="text-[#6D6D6D] max-w-xl mx-auto">
            Expert guides and resources to help you navigate Thailand visa requirements and make the most of your stay.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D6D6D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-[#111111] outline-none focus:ring-2 focus:ring-[#D7FF3B] transition-all border border-[rgba(17,17,17,0.06)]"
              placeholder="Search articles..."
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-[#6D6D6D] hover:text-[#111111] border border-[rgba(17,17,17,0.06)]'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="card-premium p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-[#6D6D6D] uppercase tracking-wider">
                  {categories.find((c) => c.id === article.category)?.name}
                </span>
                <span className="text-[#6D6D6D]">•</span>
                <span className="text-xs text-[#6D6D6D] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#6D6D6D] transition-colors">
                {article.title}
              </h3>
              
              <p className="text-sm text-[#6D6D6D] mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              
              <button
                onClick={() => navigate('knowledge')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover:text-[#6D6D6D] transition-colors"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#F6F7F6] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#6D6D6D]" />
            </div>
            <h3 className="text-lg font-semibold text-[#111111] mb-2">No articles found</h3>
            <p className="text-sm text-[#6D6D6D]">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="card-premium p-8 inline-block max-w-lg">
            <h3 className="text-xl font-semibold text-[#111111] mb-2">
              Need personalized help?
            </h3>
            <p className="text-[#6D6D6D] mb-4">
              Our team is ready to answer your specific visa questions.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KnowledgeCenter;
