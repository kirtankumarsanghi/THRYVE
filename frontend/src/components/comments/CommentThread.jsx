import React from 'react';
import CommentCard from './CommentCard';
import AddCommentForm from './AddCommentForm';
import { MessageSquare } from 'lucide-react';

export default function CommentThread({ comments = [], onAddComment }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 text-white font-semibold mb-4">
        <MessageSquare className="w-5 h-5 text-primary" /> Review Thread
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar max-h-[300px]">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-10">
            No feedback recorded yet.
          </div>
        )}
      </div>
      
      <AddCommentForm onSubmit={onAddComment} />
    </div>
  );
}
