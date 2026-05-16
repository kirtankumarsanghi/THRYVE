import React from 'react';

export default function CommentCard({ comment }) {
  return (
    <div className="bg-dark/50 border border-border/50 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          {comment.author === 'Current Manager' && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
          {comment.author}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(comment.timestamp).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{comment.text}</p>
    </div>
  );
}
