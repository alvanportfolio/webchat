import { NextRequest, NextResponse } from 'next/server';

// In a real application, this would be stored in a database
let chats = [
  {
    id: 'chat1',
    title: 'How to build a website with React',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: 'chat2',
    title: 'Explain machine learning algorithms',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
  },
  {
    id: 'chat3',
    title: 'How to optimize SEO for a website',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
  },
  {
    id: 'chat4',
    title: 'Write a Python script to scrape websites',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
];

export async function GET() {
  // Group chats by date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  
  const groupedChats = {
    'Today': [] as typeof chats,
    'Yesterday': [] as typeof chats,
    'Previous 7 days': [] as typeof chats,
    'Older': [] as typeof chats,
  };
  
  chats.forEach(chat => {
    const chatDate = new Date(chat.updatedAt);
    chatDate.setHours(0, 0, 0, 0);
    
    if (chatDate.getTime() === today.getTime()) {
      groupedChats['Today'].push(chat);
    } else if (chatDate.getTime() === yesterday.getTime()) {
      groupedChats['Yesterday'].push(chat);
    } else if (chatDate >= lastWeekStart) {
      groupedChats['Previous 7 days'].push(chat);
    } else {
      groupedChats['Older'].push(chat);
    }
  });
  
  // Remove empty groups
  Object.keys(groupedChats).forEach(key => {
    if (groupedChats[key as keyof typeof groupedChats].length === 0) {
      delete groupedChats[key as keyof typeof groupedChats];
    }
  });
  
  return NextResponse.json({ chats: groupedChats });
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    const newChat = {
      id: `chat${Date.now()}`,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    chats = [newChat, ...chats];
    
    return NextResponse.json({ chat: newChat });
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
} 