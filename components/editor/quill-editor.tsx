'use client';

import React, { useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
import { useTheme } from 'next-themes';

// Dynamically import react-quill to avoid SSR issues and support ref
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

interface QuillEditorProps {
  initialHtml?: string;
  onChangeHtml?: (html: string) => void;
  isReadOnly?: boolean;
}

export default function QuillEditor({
  initialHtml,
  onChangeHtml,
  isReadOnly,
}: QuillEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reactQuillRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();

  // Custom Image Handler
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
          // Toast or loading state could be added here
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          const url = data.url;

          // Insert image into editor at current cursor position
          const quill = reactQuillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        }
      }
    };
  }, []);

  // Configure Quill modules
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ color: [] }, { background: [] }],       // dropdown with defaults from theme
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'], // remove formatting button
      ],
      handlers: {
        image: imageHandler, // override default image handler
      },
    },
  }), [imageHandler]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet',
    'link', 'image', 'video',
  ];

  return (
    <div className={`quill-custom-wrapper ${resolvedTheme === 'dark' ? 'dark-mode' : ''} border border-input rounded-xl overflow-hidden bg-background`}>
      <ReactQuill
        forwardedRef={reactQuillRef}
        theme="snow"
        value={initialHtml || ''}
        onChange={(content: string) => {
          if (onChangeHtml) {
            // react-quill passes '<p><br></p>' for empty content
            if (content === '<p><br></p>') {
              onChangeHtml('');
            } else {
              onChangeHtml(content);
            }
          }
        }}
        readOnly={isReadOnly}
        modules={modules}
        formats={formats}
        className="h-full min-h-[300px] flex flex-col"
      />
    </div>
  );
}
