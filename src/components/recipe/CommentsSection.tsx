import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { IRootState } from '../../store/root-reducer';
import { getRecipeById } from '../../store/recipe/recipe.selector';
import { getRecipeById as getRecipeByIdThunk } from '../../store/recipe/recipe.thunk';
import { getCurrentUser } from '../../store/user/user.selector';

interface IProps {
    recipeId: string;
}

const socket = io('http://localhost:5505', {
    autoConnect: false,
});

function CommentsSection({ recipeId }: IProps) {
    const [commentText, setCommentText] = useState('');
    const [isAnon, setIsAnon] = useState(false);
    const recipe = useSelector((state: IRootState) => getRecipeById(state.recipe, recipeId));
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const dispatcher = useDispatch();
    
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            console.log(`You have connected to socket: ${socket.id}`);
            console.log(socket)
        }
        socket.on('connect', onConnect);

        socket.on('add-comment-success', (recipeIdFromDB) => {
            if (recipeId === recipeIdFromDB) {
                dispatcher(getRecipeByIdThunk(recipeId));
            }
        });

        return () => {
            if (socket.connected) {
                socket.close();
            }
            socket.off('connect', onConnect);
        }
    }, [socket]);

    const emitEvent = (event) => {
        setCommentText(event.target.value);
    }

    const handleComment = () => {
        socket.emit('add-comment', { recipeId, authorId: user?.id, commentText, isAnon });
        setCommentText('');
        setIsAnon(false);
    }

    return(
        <section className='comments-setion_wrapper'>
            <hr />
            <h2>Comments</h2>
            <div className='comments-user-input'>
                <textarea onChange={emitEvent} placeholder="Type your comment here" value={commentText}></textarea>
                <div className='comments-buttons-container'>
                    <span>
                        <label>Anonymous: </label>
                        <input checked={isAnon} onChange={() => setIsAnon(!isAnon)} type="radio" placeholder="Anonymous"/>
                    </span>
                    <button onClick={handleComment}>Comment</button>
                </div>
            </div>
            <div className='comments-contents'>
                { recipe.comments.length ?
                    <section>
                        { recipe.comments.map((c) => {
                            return (<div key={c.id} className='comment-content'>
                                <p className='content-text'>{c.content}</p>
                                <p>{new Date(c.createdAt).toDateString()}</p>
                                { !c.isAnon && <p>{c.authorName}</p>}
                            </div>)
                        }) }
                    </section>
                    : <p className='none-added'>No comments yet</p>
                }
            </div>
        </section>
    )
}

export default CommentsSection;
