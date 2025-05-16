import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

// Component for the copy button in code blocks
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700/70 hover:bg-gray-600/70 text-gray-300 hover:text-white transition-colors"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
}

// Component for the language indicator in code blocks
function LanguageIndicator({ language }: { language: string }) {
  // Map of language identifiers to display names
  const languageMap: Record<string, string> = {
    js: 'JavaScript',
    jsx: 'React JSX',
    ts: 'TypeScript',
    tsx: 'React TSX',
    py: 'Python',
    rb: 'Ruby',
    java: 'Java',
    go: 'Go',
    rust: 'Rust',
    c: 'C',
    cpp: 'C++',
    cs: 'C#',
    php: 'PHP',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    yaml: 'YAML',
    md: 'Markdown',
    sql: 'SQL',
    bash: 'Bash',
    sh: 'Shell',
    // Add more languages as needed
  };
  
  const displayName = languageMap[language] || language;
  
  return (
    <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-gray-700/70 text-gray-300 text-xs font-mono">
      {displayName}
    </div>
  );
}

export default function MarkdownRenderer({ content, isStreaming = false }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none break-words markdown-code-scrollbar">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const code = String(children).replace(/\n$/, '');
            
            // Check if this is an inline code block
            if (!className || !match) {
              return (
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            }
            
            // This is a code block with syntax highlighting
            return (
              <div className="relative my-2 group">
                <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                  {/* Language indicator */}
                  <LanguageIndicator language={language} />
                  
                  {/* Copy button */}
                  <CopyButton code={code} />
                  
                  {/* Code block with syntax highlighting */}
                  <SyntaxHighlighter
                    // @ts-expect-error - The type definitions for react-syntax-highlighter are incorrect
                    style={oneDark}
                    language={language}
                    showLineNumbers={true}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineNumberStyle={{ color: '#6b7280', paddingRight: '1em', borderRight: '1px solid #374151' }}
                    className="markdown-code-scrollbar"
                    customStyle={{
                      margin: 0,
                      padding: '2.5rem 1rem 1rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#121212',
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
