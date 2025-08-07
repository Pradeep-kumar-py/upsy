'use client';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaSearch, FaCalendar, FaClock, FaArrowRight, FaBookmark, FaEye, FaShare, FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  featured: boolean;
  tags: string[];
  image: string;
  views: string;
  likes: string;
}

// Helper function for formatting dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Sample blog posts data - in a real app, this would come from an API/CMS
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Personal Loans: A Comprehensive Guide for First-Time Borrowers',
    excerpt: 'Everything you need to know about personal loans, from application to approval, including tips for getting the best rates and avoiding common pitfalls.',
    content: 'Lorem ipsum...',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
      role: 'Financial Advisor'
    },
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    category: {
      name: 'Finance',
      slug: 'finance',
      color: 'from-blue-500 to-blue-600'
    },
    featured: true,
    tags: ['Personal Loans', 'Finance', 'Guide'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    views: '2.5k',
    likes: '124'
  },
  {
    id: '2',
    title: 'How to Improve Your Credit Score: 10 Proven Strategies',
    excerpt: 'Learn practical strategies to boost your credit score and unlock better financial opportunities for loans, credit cards, and more.',
    content: 'Lorem ipsum...',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'Credit Specialist'
    },
    publishedAt: '2024-01-12',
    readTime: '7 min read',
    category: {
      name: 'Credit',
      slug: 'credit',
      color: 'from-green-500 to-green-600'
    },
    featured: false,
    tags: ['Credit Score', 'Financial Health', 'Tips'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    views: '1.8k',
    likes: '89'
  },
  {
    id: '3',
    title: 'The Future of Digital Lending: Technology Trends Shaping Finance',
    excerpt: 'Explore how AI, blockchain, and mobile technology are revolutionizing the lending industry and what it means for borrowers.',
    content: 'Lorem ipsum...',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'Tech Writer'
    },
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    category: {
      name: 'Technology',
      slug: 'technology',
      color: 'from-purple-500 to-purple-600'
    },
    featured: false,
    tags: ['FinTech', 'AI', 'Blockchain'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    views: '3.2k',
    likes: '156'
  },
  {
    id: '4',
    title: 'Emergency Fund vs Personal Loan: Which Option is Right for You?',
    excerpt: 'Compare the pros and cons of building an emergency fund versus taking a personal loan for unexpected expenses.',
    content: 'Lorem ipsum...',
    author: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'Financial Planner'
    },
    publishedAt: '2024-01-08',
    readTime: '4 min read',
    category: {
      name: 'Planning',
      slug: 'planning',
      color: 'from-orange-500 to-orange-600'
    },
    featured: false,
    tags: ['Emergency Fund', 'Financial Planning', 'Personal Loans'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
    views: '1.5k',
    likes: '78'
  },
  {
    id: '5',
    title: 'Student Loan Refinancing: When and How to Make the Switch',
    excerpt: 'Discover when student loan refinancing makes sense and how to navigate the process successfully to save money.',
    content: 'Lorem ipsum...',
    author: {
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      role: 'Education Finance Expert'
    },
    publishedAt: '2024-01-05',
    readTime: '8 min read',
    category: {
      name: 'Education',
      slug: 'education',
      color: 'from-indigo-500 to-indigo-600'
    },
    featured: false,
    tags: ['Student Loans', 'Refinancing', 'Education'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
    views: '2.1k',
    likes: '134'
  },
  {
    id: '6',
    title: 'Small Business Loans: Funding Your Entrepreneurial Dreams',
    excerpt: 'A comprehensive guide to small business loan options, requirements, and application strategies for new entrepreneurs.',
    content: 'Lorem ipsum...',
    author: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      role: 'Business Advisor'
    },
    publishedAt: '2024-01-03',
    readTime: '10 min read',
    category: {
      name: 'Business',
      slug: 'business',
      color: 'from-red-500 to-red-600'
    },
    featured: true,
    tags: ['Business Loans', 'Entrepreneurship', 'Funding'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    views: '4.1k',
    likes: '245'
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Memoize categories to avoid recalculation on every render
  const categories = useMemo(() => [
    { name: 'All', slug: 'all', count: blogPosts.length },
    { name: 'Finance', slug: 'finance', count: blogPosts.filter(post => post.category.slug === 'finance').length },
    { name: 'Credit', slug: 'credit', count: blogPosts.filter(post => post.category.slug === 'credit').length },
    { name: 'Technology', slug: 'technology', count: blogPosts.filter(post => post.category.slug === 'technology').length },
    { name: 'Planning', slug: 'planning', count: blogPosts.filter(post => post.category.slug === 'planning').length },
    { name: 'Education', slug: 'education', count: blogPosts.filter(post => post.category.slug === 'education').length },
    { name: 'Business', slug: 'business', count: blogPosts.filter(post => post.category.slug === 'business').length }
  ], []);

  // Memoize featured and regular posts
  const featuredPosts = useMemo(() => blogPosts.filter(post => post.featured), []);
  const regularPosts = useMemo(() => 
    filteredPosts.filter(post => !post.featured || selectedCategory !== 'all' || searchQuery), 
    [filteredPosts, selectedCategory, searchQuery]
  );

  // Optimize scroll behavior setup
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Optimize filtering logic
  const filterPosts = useCallback(() => {
    let filtered = blogPosts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category.slug === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory]);

  // Clear filters function
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  // Handle category selection
  const handleCategorySelect = useCallback((categorySlug: string) => {
    setSelectedCategory(categorySlug);
  }, []);

  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .glass-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-card-dark {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .initial-hidden {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full font-medium mb-6">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                  Upsy Blog
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Financial Insights &
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                    Smart Solutions
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed font-light max-w-4xl mx-auto">
                  Discover expert insights on personal finance, lending solutions, and financial planning to help you make informed decisions for your future.
                </p>
                
                {/* Search Bar */}
                <motion.div 
                  className="max-w-md mx-auto relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-6 py-4 pl-12 text-gray-700 bg-white/95 backdrop-blur-sm rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
                    aria-label="Search articles"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll initial-hidden">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Explore by Category
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Find the financial insights you need, organized by topic
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 animate-on-scroll initial-hidden">
              {categories.map((category, index) => (
                <motion.button
                  key={category.slug}
                  onClick={() => handleCategorySelect(category.slug)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-2xl transition-all duration-300 hover-lift ${
                    selectedCategory === category.slug
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
                      : 'glass-card-dark text-gray-700 hover:bg-blue-50'
                  }`}
                  aria-pressed={selectedCategory === category.slug}
                  aria-label={`Filter by ${category.name} category`}
                >
                  {category.name} <span className="ml-1 opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 animate-on-scroll initial-hidden">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Featured Articles
                </h2>
                <p className="text-gray-600 text-lg">
                  Our most popular and impactful content
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="glass-card-dark rounded-3xl overflow-hidden hover-lift animate-on-scroll initial-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="relative h-64">
                      <Image
                        src={post.image}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${post.category.color}`}>
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${post.category.color} mb-2`}>
                          {post.category.name}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-sm text-gray-500">{post.author.role}</p>
                          </div>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <span className="group-hover:mr-2 transition-all duration-300">Read More</span>
                          <FaArrowRight className="inline-block w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll initial-hidden">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-gray-600 text-lg">
                Stay updated with our latest insights and tips
              </p>
            </div>
            
            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="glass-card-dark rounded-2xl overflow-hidden hover-lift animate-on-scroll initial-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={`Article image for ${post.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${post.category.color}`}>
                          {post.category.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                          aria-label={`Bookmark ${post.title}`}
                        >
                          <FaBookmark className="w-3 h-3 text-gray-600" />
                        </button>
                        <button 
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                          aria-label={`Share ${post.title}`}
                        >
                          <FaShare className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{post.author.name}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                {post.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaHeart className="w-3 h-3" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300"
                        >
                          Read <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-on-scroll initial-hidden">
                <div className="glass-card-dark rounded-3xl p-12 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSearch className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or browse different categories.</p>
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105"
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="animate-on-scroll initial-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full font-medium mb-6">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                Stay Updated
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Get the Latest 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  Financial Insights
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of readers who get our expert insights on personal finance and lending solutions delivered straight to their inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/50 text-gray-700 shadow-lg"
                />
                <button className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl">
                  <span className="group-hover:mr-2 transition-all duration-300">Subscribe</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                No spam, unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
