import { useState } from 'react'

const CopyClipboard = () => {

    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [textCopied, setTextCopied] = useState<boolean>(false);

    const handleCopyText = () => {
        setError("")
        if (!text.trim()) {
            setError('Type some values to copy')
            return;
        }


        navigator.clipboard.writeText(text)
        setTextCopied(true)

        setTimeout(() => {
            setTextCopied(false)
        }, 2000);
    }

    return (
        <div>
            <h2>Copy to Clipboard</h2>
            <div>
                <div className='copy-clipboard'>
                    <label>Enter your text:
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    </label>
                    <button onClick={handleCopyText}>Copy</button>
                </div>
                {error && <p style={{
                    color: 'red',
                    textAlign: 'center'
                }}>
                    {error}
                </p>}
                {
                    textCopied && (
                        <p style={{
                            color: 'green',
                            textAlign: 'center'
                        }}>Copied</p>
                    )
                }
            </div>
        </div>
    )
}

export default CopyClipboard