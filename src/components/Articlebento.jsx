import React from 'react';
import { useNavigate } from 'react-router-dom';

const Articlebento = () => {
  const handleViewAllClick = () => {
    // Navigate to sleep tips page
    window.location.href = '/tips';
  };

  const handleArticleClick = (articleId) => {
    // Navigate to specific article
    window.location.href = `/tips`;
  };

  const articles = [
    {
      id: 'foods-for-sleep',
      title: 'Foods That Help You Sleep—and Ones to Avoid',
      category: 'Read on Sleep Tips',
      image: 'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/top-ten-foods-for-health-2x.jpg?rev=890e0016d9824d5789d4eaa610ce606e',
      className: 'row-span-2'
    },
    {
      id: 'better-sleep-habits',
      title: '7 Proven Habits for Better Sleep Every Night',
      category: 'Read on Sleep Tips',
      image: 'https://www.thesun.co.uk/wp-content/uploads/2018/07/NINTCHDBPICT000414213273.jpg?w=620',
      className: 'col-span-1'
    },
    {
      id: 'sleep-stress-cycle',
      title: 'Sleep & Stress: Breaking the Cycle',
      category: 'Read on Sleep Tips',
      image: 'https://img-cdn.medkomtek.com/H-fGl-o22HFzFP5rs4q9MhTaIC8=/0x0/smart/filters:quality(100):format(webp)/article/hjI36RwUZPr6YifFS5f_F/original/026414100_1521379248-7-Manfaat-Sehat-Meditasi-di-Hari-Raya-Nyepi-By_GlebSStock-Shutterstock.jpg?w=256&q=100',
      className: 'col-span-1'
    },
    {
      id: 'screens-stealing-sleep',
      title: 'How Screens Are Stealing Your Sleep',
      category: 'Read on Sleep Tips',
      image: 'https://www.chronobiology.com/wp-content/uploads/2020/06/Horizontal-In-Text-Image-768x528.jpg',
      className: 'col-span-1'
    },
    {
      id: 'exercise-and-sleep',
      title: 'How Exercise Improves Sleep (And When to Do It)',
      category: 'Read on Sleep Tips',
      image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/2293/conversions/l0908b16207233934035-thumb.jpg',
      className: 'col-span-1'
    }
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h2 className="text-4xl font-bold text-white mb-2">Find Sleep Tips</h2>
            <p className="text-white text-lg">Discover practical advice and healthy habits to improve your sleep quality.</p>
          </div>
          <button
            onClick={handleViewAllClick}
            className="text-yellow-400 text-lg font-medium hover:text-yellow-300 transition-colors duration-200 ml-8"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-96">
          {/* First article - Large card spanning 2 rows */}
          <div
            className="relative rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 row-span-2"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-semibold mb-2 leading-tight">
                {articles[0].title}
              </h3>
              <p className="text-yellow-400 text-sm font-medium">
                {articles[0].category}
              </p>
            </div>
          </div>

          <div
            className="relative rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[1].image}
              alt={articles[1].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold mb-1 leading-tight">
                {articles[1].title}
              </h3>
              <p className="text-yellow-400 text-xs font-medium">
                {articles[1].category}
              </p>
            </div>
          </div>

          <div
            className="relative rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[2].image}
              alt={articles[2].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold mb-1 leading-tight">
                {articles[2].title}
              </h3>
              <p className="text-yellow-400 text-xs font-medium">
                {articles[2].category}
              </p>
            </div>
          </div>

          <div
            className="relative rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[3].image}
              alt={articles[3].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold mb-1 leading-tight">
                {articles[3].title}
              </h3>
              <p className="text-yellow-400 text-xs font-medium">
                {articles[3].category}
              </p>
            </div>
          </div>

          <div
            className="relative rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[4].image}
              alt={articles[4].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-semibold mb-1 leading-tight">
                {articles[4].title}
              </h3>
              <p className="text-yellow-400 text-xs font-medium">
                {articles[4].category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articlebento;
