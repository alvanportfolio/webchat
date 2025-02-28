/**
 * Parses an AI message to extract reasoning content and final response
 * @param message The full AI message that may contain reasoning in <think> tags
 * @returns An object with reasoning and finalResponse properties
 */
export function parseAIMessage(message: string): { reasoning: string | null; finalResponse: string } {
  // Check if the message contains thinking tags
  const thinkRegex = /<think>([\s\S]*?)<\/think>/;
  const match = message.match(thinkRegex);
  
  // Check for incomplete think tags (during streaming)
  const hasOpenTag = message.includes('<think>');
  const hasCloseTag = message.includes('</think>');
  
  // Handle incomplete tags during streaming
  if (hasOpenTag && !hasCloseTag) {
    // If we have an opening tag but no closing tag yet (streaming in progress)
    const parts = message.split('<think>');
    if (parts.length >= 2) {
      const reasoning = parts[1].trim();
      // During streaming, we don't show any final response until the thinking is complete
      return {
        reasoning,
        finalResponse: ''
      };
    }
  }
  
  if (!match) {
    // No complete thinking tags found, return the original message
    return {
      reasoning: null,
      finalResponse: message
    };
  }
  
  // Extract the reasoning content (between <think> tags)
  const reasoning = match[1].trim();
  
  // Extract the final response (everything after the </think> tag)
  const finalResponseIndex = message.indexOf('</think>') + '</think>'.length;
  const finalResponse = message.substring(finalResponseIndex).trim();
  
  return {
    reasoning,
    finalResponse
  };
} 