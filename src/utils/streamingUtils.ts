/**
 * Parses a stream of Server-Sent Events (SSE) data
 * @param reader The ReadableStreamDefaultReader to read from
 * @param onChunk Callback function for each chunk of data
 * @param onDone Callback function when the stream is complete
 */
export async function parseSSEResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (chunk: string) => void,
  onDone: () => void
) {
  const decoder = new TextDecoder();
  let buffer = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete SSE messages
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          try {
            if (data === '[DONE]') {
              break;
            }
            
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Error parsing SSE message:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading stream:', error);
  } finally {
    onDone();
  }
}

/**
 * Creates a chat completion request to the API with streaming
 * @param baseUrl The base URL of the API
 * @param apiKey The API key
 * @param model The model to use
 * @param messages The messages to send
 * @param onChunk Callback function for each chunk of data
 * @param onDone Callback function when the stream is complete
 */
export async function createChatCompletion(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
) {
  try {
    const endpoint = `${baseUrl}/chat/completions`;
    console.log(`Sending request to: ${endpoint}`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = '';
      
      // Handle specific error codes with user-friendly messages
      if (response.status === 401) {
        errorMessage = `Authentication error (401): Please check your API key.`;
      } else if (response.status === 403) {
        errorMessage = `Access denied (403): You don't have permission to use this model.`;
      } else if (response.status === 404) {
        errorMessage = `Not found (404): The requested resource was not found.`;
      } else if (response.status === 429) {
        errorMessage = `Rate limit exceeded (429): Too many requests. Please try again later.`;
      } else if (response.status >= 500) {
        errorMessage = `Server error (${response.status}): The AI provider is experiencing issues.`;
      } else {
        // For other errors, include the original error message but in a more controlled way
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = `API request failed: ${response.status} - ${errorJson.message || errorJson.error || 'Unknown error'}`;
        } catch {
          errorMessage = `API request failed: ${response.status} - ${errorText.substring(0, 100)}`;
        }
      }
      
      // Instead of throwing an error, call the onError callback
      onError(new Error(errorMessage));
      return; // Exit the function early
    }
    
    if (!response.body) {
      onError(new Error('Response body is null'));
      return; // Exit the function early
    }
    
    const reader = response.body.getReader();
    await parseSSEResponse(reader, onChunk, onDone);
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)));
  }
} 