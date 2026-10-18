import React, { useState } from 'react'

const ARTICLES_PER_PAGE = 5;

const getDummyArticleData = (count: number) => {
   return Array.from({ length: count}, (_, i) => {
     return {
      id: i + 1,
      title: `Article ${i + 1}`,
      content: `This is the content of article ${i + 1}`,
      bookmarked: false
     }
   })
}

const PaginatedBookmarkList = () => {

  const [articles, setArticles] = useState(getDummyArticleData(23));
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const currentArticle = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)

  return (
    <div>
      <div className='header'>
        <h2>Articles</h2>
        <label>
          <input type="checkbox" />
          Show only bookmarked
        </label>
      </div>
      {currentArticle.map((item) => {
        return (
          <div className='article-container' key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
            <span>
              ★
            </span>
          </div>
        )
      })}

      <div className='pagination'>
        <button>Prev</button>
        <span>Page 1 of 1</span>
        <button>Next</button>
      </div>
    </div>
  )
}

export default PaginatedBookmarkList