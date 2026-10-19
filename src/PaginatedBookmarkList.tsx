import { useState } from 'react';

interface ArticleState {
  id: number;
  title: string;
  content: string;
  bookmarked: boolean;
}

const ARTICLES_PER_PAGE = 5;

const getDummyArticleData = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: i + 1,
      title: `Article ${i + 1}`,
      content: `This is the content of article ${i + 1}`,
      bookmarked: false
    }
  })
}

const PaginatedBookmarkList = () => {

  const [articles, setArticles] = useState<ArticleState[]>(getDummyArticleData(23));
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [showBookmarked, setShowBookmarked] = useState<boolean>(false)

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const filteredArticle = showBookmarked ? articles.filter((article) => article.bookmarked) : articles;
  const currentArticle = filteredArticle.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
  const totalPages = Math.ceil(filteredArticle.length / ARTICLES_PER_PAGE)

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  const handleBookmarkToggle = (item: ArticleState) => {
    setArticles(prev =>
      prev.map(article => article === item ? { ...article, bookmarked: !article.bookmarked } : article)
    )
  }

  return (
    <div>
      <div className='header'>
        <h2>Articles</h2>
        <label>
          <input type="checkbox" checked={showBookmarked} onChange={() => {setShowBookmarked(!showBookmarked)
            setCurrentPage(1)
          }} />
          Show only bookmarked
        </label>
      </div>
      {currentArticle.map((item: ArticleState) => {
        return (
          <div className='article-container' key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
            <span className={`bookmark ${item.bookmarked ? 'active' : ''}`} onClick={() => handleBookmarkToggle(item)}>
              ★
            </span>
          </div>
        )
      })}

      <div className='pagination'>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default PaginatedBookmarkList