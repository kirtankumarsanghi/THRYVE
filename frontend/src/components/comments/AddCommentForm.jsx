import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function AddCommentForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-auto">
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your review feedback..."
        className="w-full bg-dark border border-border rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
      />
      <button 
        type="submit"
        disabled={!text.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-md text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
