import { useState } from 'react';

interface CommentState {
    id: number;
    text: string;
    replies: CommentState[]
}

const CommentsApp = () => {

    const [comments, setComments] = useState<CommentState[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const AddNewComment = () => {
        const data = {
            id: Date.now(),
            text: newComment,
            replies: []
        }

        setComments([...comments, data])
        setNewComment('')
    }

    const addReply = (id: number, text: string) => {
        const addNestedComment = (commentList: CommentState[]): CommentState[] => {
            return commentList.map((comment: CommentState): CommentState => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            { id: Date.now(), text: text, replies: [] }
                        ]
                    }
                }
                return {
                    ...comment,
                    replies: addNestedComment(comment.replies)
                }
            })
        }

        setComments(addNestedComment(comments))
    }

    return (
        <div>
            <h3>Comment Section</h3>
            <div>
                <input type="text" placeholder='Type a comment' className='input' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={AddNewComment}>Add Comment</button>
            </div>

            <div>
                {
                    comments.map((comment: CommentState) => (
                        <Comment key={comment.id} comment={comment} addReply={addReply} />
                    ))
                }
            </div>
        </div>
    )
}

function Comment({ comment, addReply }: {
    comment: CommentState;
    addReply: (id: number, text: string) => void
}) {

    const [showReplyInput, setShowReplyInput] = useState<boolean>(false)
    const [replyText, setReplyText] = useState<string>("")

    const handleReply = () => {
        if (replyText.trim()) {
            addReply(comment.id, replyText)
            setReplyText("")
            setShowReplyInput(false)
        }
    }

    return (
        <div className='comment'>
            <p className='comment-text'>{comment.text}</p>
            <button className='add-reply' onClick={() => setShowReplyInput(true)}>add a reply</button>

            {
                showReplyInput && (
                    <div>
                        <input type="text" placeholder='Type your reply' value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                        <button onClick={handleReply}>Submit</button>
                    </div>
                )
            }

            <div>
                {
                    comment.replies.map((reply: CommentState) => (
                        <Comment key={reply.id} comment={reply} addReply={addReply} />
                    ))
                }
            </div>
        </div>
    )
}

export default CommentsApp