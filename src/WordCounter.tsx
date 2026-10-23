import { useEffect, useState } from 'react'



const WordCounter = () => {

  const [input, setInput] = useState('');
  const [wordCount, setWordCount] = useState<Record<string, number>>({})

  useEffect(() => {
    handleCount()
  }, [input])

  const handleCount = () => {
    if (!input.trim()) return;

    const cleanText = input.toLowerCase().trim();
    const newText = cleanText.split(/\s+/)
    let obj: Record<string, number> = {}

    for (let i = 0; i < newText.length; i++) {
      if (obj[newText[i]]) {
        obj[newText[i]]++
      } else {
        obj[newText[i]] = 1
      }
    }

    setWordCount(obj)
  }

  return (
    <div className='container'>
      <h1>Word Counter</h1>

      <div>
        <textarea placeholder='type your text here' onChange={(e) => setInput(e.target.value)}></textarea>
      </div>

      <div>
        <h3>Word Frequencies</h3>
        <div>
          {
            Object.entries(wordCount).map(([word, count]) => {
              return (
                <li key={word} className='list-style'>
                  <span className='word-count'>{word} count : </span>
                  <span>{count}</span>
                </li>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default WordCounter