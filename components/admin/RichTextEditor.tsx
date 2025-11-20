'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploading, setUploading] = useState(false);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/blog/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      insertText(`<img src="${data.url}" alt="Image" class="w-full rounded-lg my-4" />\n`);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<h1>', '</h1>\n')}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<h2>', '</h2>\n')}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<h3>', '</h3>\n')}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<strong>', '</strong>')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<em>', '</em>')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<ul>\n  <li>', '</li>\n</ul>\n')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<ol>\n  <li>', '</li>\n</ol>\n')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<a href="URL">', '</a>')}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>

        <label className="cursor-pointer">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={uploading}
            title="Upload Image"
            asChild
          >
            <span>
              {uploading ? (
                <Upload className="w-4 h-4 animate-spin" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
            </span>
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 min-h-[400px] focus:outline-none font-mono text-sm"
        placeholder="Write your blog content here... Use the toolbar buttons to format text and add images."
      />
    </div>
  );
}
