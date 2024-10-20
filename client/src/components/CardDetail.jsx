// src/CardDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share, MessageCircle, ThumbsUp, ArrowLeft, ArrowRight } from 'lucide-react';

const CardDetail = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([
    { id: 1, text: 'Great view!', replies: [] },
    { id: 2, text: 'Amazing place!', replies: [] },
  ]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState({});

  const cardIndex = users.findIndex((usercard) => usercard._id === id);
  const postCard = users[cardIndex];
  console.log("card " ,postCard)
  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleShare = () => {
    alert('Shared successfully!');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (newReply[commentId]?.trim()) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...comment.replies, newReply[commentId]],
              }
            : comment
        )
      );
      setNewReply((prevReplies) => ({ ...prevReplies, [commentId]: '' }));
    }
  };

  const handleNavigate = (direction) => {
    const newIndex = cardIndex + direction;
    if (newIndex >= 0 && newIndex < users.length) {
      navigate(`/user/${users[newIndex]._id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-8 md:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavigate(-1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => handleNavigate(1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300"
        >
          <ArrowRight size={24} />
        </button>

        {/* Card Image */}
        <img
          src={postCard?.profilePicture}
          alt={"aloe"}
          className="w-full h-60 object-cover rounded-md mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">{}</h2>

        {/* User Details */}
        <div className="flex items-center mb-6">
          <img
            src={postCard.profilePicture}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h4 className="font-semibold">{`Shared by User ${postCard._id}`}</h4>
            <p className="text-gray-600 dark:text-gray-400">{postCard.bio}</p>
          </div>
        </div>

        {/* Like, Share, and Comment Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            <ThumbsUp size={18} />
            <span>Like ({likes})</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            <Share size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* Comments and Replies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded mb-2">
                <p>{comment.text}</p>
                <div className="ml-4 mt-2">
                  <h4 className="text-sm font-semibold mb-1">Replies</h4>
                  {comment.replies.map((reply, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-200 dark:bg-gray-600 rounded mb-1 text-sm"
                    >
                      {reply}
                    </div>
                  ))}
                  <div className="flex mt-2">
                    <input
                      type="text"
                      className="flex-1 p-1 border border-gray-300 dark:border-gray-600 rounded-l text-sm"
                      value={newReply[comment.id] || ''}
                      onChange={(e) =>
                        setNewReply((prevReplies) => ({
                          ...prevReplies,
                          [comment.id]: e.target.value,
                        }))
                      }
                      placeholder="Reply..."
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      className="px-2 bg-blue-500 text-white rounded-r text-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Section */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="px-4 bg-blue-500 text-white rounded-r"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;


 