import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

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
  const [renderedContent, setRenderedContent] = useState(content);
  
  // Apply typing effect for streaming content
  useEffect(() => {
    if (!isStreaming) {
      setRenderedContent(content);
      return;
    }
    
    setRenderedContent(content);
  }, [content, isStreaming]);
  
  return (
    <div className="prose prose-invert max-w-none break-words overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const code = String(children).replace(/\n$/, '');
            
            return !inline && match ? (
              <div className="relative my-3 group">
                <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                  {/* Language indicator */}
                  <LanguageIndicator language={language} />
                  
                  {/* Copy button */}
                  <CopyButton code={code} />
                  
                  {/* Code block with syntax highlighting */}
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    showLineNumbers={true}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineNumberStyle={{ color: '#6b7280', paddingRight: '1em', borderRight: '1px solid #374151' }}
                    customStyle={{
                      margin: 0,
                      padding: '2.5rem 1rem 1rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#1e293b',
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm break-words whitespace-normal" {...props}>
                {children}
              </code>
            );
          },
          // Customize other elements with reduced spacing and proper wrapping
          p: ({ children }) => <p className="my-1 leading-relaxed break-words whitespace-normal">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 my-1.5 break-words">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 my-1.5 break-words">{children}</ol>,
          li: ({ children }) => <li className="my-0.5 break-words">{children}</li>,
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2 break-words">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mt-3 mb-1.5 break-words">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mt-2 mb-1 break-words">{children}</h3>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words overflow-wrap">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-600 pl-4 py-0.5 my-2 text-gray-300 bg-gray-800/30 rounded-r break-words">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 max-w-full">
              <table className="border-collapse border border-gray-700 w-full table-auto">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-700">{children}</tr>,
          th: ({ children }) => <th className="border border-gray-700 px-4 py-2 text-left break-words">{children}</th>,
          td: ({ children }) => <td className="border border-gray-700 px-4 py-2 break-words">{children}</td>,
          // Add proper spacing for breaks
          br: () => <br className="my-0" />,
          // Ensure proper spacing between adjacent elements
          div: ({ children }) => <div className="my-0 break-words">{children}</div>,
          span: ({ children }) => <span className="my-0 break-words">{children}</span>,
          // Handle pre tags for better overflow
          pre: ({ children }) => <pre className="overflow-x-auto max-w-full">{children}</pre>,
          // Handle images to prevent overflow
          img: ({ src, alt, ...props }) => (
            <img 
              src={src} 
              alt={alt || ''} 
              className="max-w-full h-auto rounded-md" 
              {...props} 
            />
          ),
        }}
      >
        {renderedContent}
      </ReactMarkdown>
    </div>
  );
} 