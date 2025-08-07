'use client';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCalendar, FaClock, FaArrowLeft, FaShare, FaBookmark, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
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
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Sample blog posts data - replace with actual API call
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Personal Loans: A Comprehensive Guide for First-Time Borrowers',
      excerpt: 'Everything you need to know about personal loans, from application to approval, including tips for getting the best rates.',
      content: `
        <p>Personal loans have become an increasingly popular financial tool for individuals looking to consolidate debt, make large purchases, or handle unexpected expenses. Unlike credit cards, personal loans offer fixed interest rates and structured repayment plans, making them an attractive option for those seeking financial predictability.</p>

        <h2>What Are Personal Loans?</h2>
        <p>A personal loan is an unsecured loan that you can use for various purposes. Unlike auto loans or mortgages that are secured by the asset being purchased, personal loans are backed only by your promise to repay and your creditworthiness.</p>

        <h2>Types of Personal Loans</h2>
        <h3>1. Unsecured Personal Loans</h3>
        <p>These are the most common type of personal loans. They don't require collateral, but typically have higher interest rates because the lender takes on more risk.</p>

        <h3>2. Secured Personal Loans</h3>
        <p>These loans require collateral, such as a savings account or CD. They often offer lower interest rates but put your asset at risk if you can't repay.</p>

        <h2>How to Qualify for a Personal Loan</h2>
        <ul>
          <li><strong>Credit Score:</strong> Most lenders prefer scores of 600 or higher</li>
          <li><strong>Income:</strong> Steady, verifiable income is crucial</li>
          <li><strong>Debt-to-Income Ratio:</strong> Keep it below 40%</li>
          <li><strong>Employment History:</strong> Stable employment demonstrates reliability</li>
        </ul>

        <h2>Tips for Getting the Best Rates</h2>
        <p>To secure the most favorable terms on your personal loan:</p>
        <ol>
          <li>Check your credit score and improve it if necessary</li>
          <li>Shop around with multiple lenders</li>
          <li>Consider getting pre-qualified to see potential rates</li>
          <li>Have all your financial documents ready</li>
          <li>Consider a co-signer if your credit isn't ideal</li>
        </ol>

        <h2>Common Uses for Personal Loans</h2>
        <p>Personal loans can be used for various purposes, including:</p>
        <ul>
          <li>Debt consolidation</li>
          <li>Home improvements</li>
          <li>Medical expenses</li>
          <li>Wedding expenses</li>
          <li>Emergency expenses</li>
          <li>Large purchases</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Personal loans can be a valuable financial tool when used responsibly. By understanding the different types available, qualification requirements, and application process, you can make an informed decision that aligns with your financial goals. Remember to compare offers from multiple lenders and read all terms carefully before signing.</p>
      `,
      author: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/60/60',
        role: 'Financial Advisor',
        bio: 'Sarah has over 10 years of experience in personal finance and helps individuals make informed financial decisions.'
      },
      publishedAt: '2024-01-15',
      readTime: '5 min read',
      category: {
        name: 'Finance',
        slug: 'finance',
        color: 'bg-blue-500'
      },
      featured: true,
      tags: ['Personal Loans', 'Finance', 'Guide', 'Credit'],
      image: '/api/placeholder/800/400'
    }
  ];

  useEffect(() => {
    if (!params?.id) return;
    
    // Find the post by ID
    const foundPost = blogPosts.find(p => p.id === params.id);
    setPost(foundPost || null);

    // Set related posts (same category, excluding current post)
    if (foundPost) {
      const related = blogPosts
        .filter(p => p.category.slug === foundPost.category.slug && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [params?.id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #374151;
        }
        
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
          color: #4b5563;
        }
        
        .prose ul, .prose ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        
        {/* Article Header */}
        <article className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Blog Link */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${post.category.color}`}>
                  {post.category.name}
                </span>
                <div className="flex items-center text-gray-500 text-sm gap-4">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {post.title}
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {post.excerpt}
              </motion.p>

              {/* Author & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <FaBookmark className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
                    <FaShare className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <motion.div 
              className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Article Content */}
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{post.author.role}</p>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <motion.article
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${relatedPost.category.color}`}>
                          {relatedPost.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                        <Link 
                          href={`/blog/${relatedPost.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
