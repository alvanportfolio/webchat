import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would call an AI service here
    // For now, we'll just echo back a simple response
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = {
      id: Date.now().toString(),
      content: `This is a simulated AI response to: "${message}".\n\nIn a real application, this would be the response from an AI model like GPT-4 or another language model.`,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Chat API is working. Use POST to send messages.' }
  );
} 