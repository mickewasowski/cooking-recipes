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
    const recipe = useSelector((state: IRootState) => getRecipeById(state.recipe, recipeId));
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const dispatcher = useDispatch();
    console.log(recipe);

    
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            console.log(`You have connected to socket: ${socket.id}`);
            console.log(socket)
        }
        socket.on('connect', onConnect);

        socket.on('typing-event-send', () => {
            console.log('someone is typing...')
        });

        socket.on('add-comment-success', (recipeIdFromDB) => {
            if (recipeId === recipeIdFromDB) {
                //TODO: dispatch an event to fetch the particular item by ID and update the store
                console.log('new comment added')
                dispatcher(getRecipeByIdThunk(recipeId));
            }
        });

        return () => {
            if (socket.connected) {
                socket.close();
                console.log(`closing socket`, socket)
            }
            socket.off('connect', onConnect);
        }
    }, [socket]);

    const emitEvent = (event) => {
        //socket.emit('typing-event-send', recipeId);
        setCommentText(event.target.value);
    }

    const handleComment = () => {
        socket.emit('add-comment', { recipeId, authorId: user?.id, commentText});
    }

    return(
        <section>
            <h2>Comments</h2>
            <div>
                <textarea onChange={emitEvent} placeholder="Type your comment here"></textarea>
                <input type="radio" placeholder="Anonymous"/>
                <button onClick={handleComment}>Comment</button>
            </div>
            <div>
                {/* we should render here all the comments with a load more button */}
                { recipe.comments &&
                    <section style={{ display: 'flex', flexDirection: 'column-reverse'}}>
                        { recipe.comments.map((c) => {
                            return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <p>{c.content}</p>
                                <p>{c.createdAt}</p>
                            </div>)
                        }) }
                    </section>
                }
            </div>
        </section>
    )
}

export default CommentsSection;
