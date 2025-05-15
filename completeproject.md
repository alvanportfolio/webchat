# Alvan World - AI Chat Application Documentation

## 1. Introduction

Welcome to Alvan World, an intelligent AI chat application built with Next.js, Tailwind CSS, NextAuth.js for authentication, Prisma with SQLite for database management, and Zustand for state management. This document provides an overview of the project structure, key functionalities, and guidance for new contributors.

## 2. Project Structure

The project is organized into several main directories:

*   **`/` (Root Directory):**
    *   Configuration files: `.env`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `package.json`, `yarn.lock`.
    *   `IMPROVEMENT_PLAN.md`: Contains the plan followed for recent major refactoring and improvements.
    *   `icon.ico`: Main application icon.
*   **`public/`:** Contains static assets accessible directly via URL.
    *   `icon.ico`: A copy of the main application icon (ensure it's here for web serving).
    *   `icons/`: Directory containing various sizes of application icons for favicons, PWA, Apple touch icons, etc. (e.g., `favicon-16x16.png`, `apple-touch-icon.png`).
    *   Other static images like `file.svg`, `globe.svg`, etc.
*   **`prisma/`:** Contains all Prisma-related files.
    *   `schema.prisma`: Defines the database schema (models for User, Account, Session, VerificationToken for NextAuth.js). Configured to use SQLite.
    *   `dev.db`: The SQLite database file (created after `prisma db push`).
*   **`src/`:** Contains the core source code of the application.
    *   **`app/`:** Next.js App Router directory.
        *   `layout.tsx`: The root layout for the application. It's a Server Component that exports `metadata` (for favicons, site title) and uses `AppProviders` for client-side context.
        *   `page.tsx`: The landing page of the application.
        *   `globals.css`: Global stylesheets, including Tailwind CSS directives and custom overrides for `prose` (Markdown styling).
        *   `api/auth/[...nextauth]/route.ts`: The NextAuth.js dynamic API route handler. Configures authentication providers (Email provider with Prisma adapter), callbacks, and email sending.
        *   `api/chat/route.ts`: API route for handling chat completions (streaming).
        *   `api/chats/route.ts`: (Potentially for fetching/managing chat list - current usage might vary).
        *   `auth/verify-request/page.tsx`: Page displayed to the user after requesting an email sign-in link, prompting them to check their email.
        *   `chat/page.tsx`: Entry point for the chat interface. It generates a new UUID and redirects to `/chat/[id]`.
        *   `chat/[id]/page.tsx`: The main page for a specific chat session, identified by `[id]` (a UUID). Dynamically loads `ChatContainer`.
        *   `error.tsx`, `global-error.tsx`, `favicon.ico`: Standard Next.js special files.
    *   **`components/`:** Reusable React components.
        *   `AppProviders.tsx`: A Client Component that wraps the application with all necessary client-side context providers (`SessionProvider`, `AuthProvider`, `ToastProvider`). It also contains the main visual layout structure (sidebar, main content area).
        *   `ChatContainer.tsx`: The core component for the chat interface. Manages message display, sending new messages, and interaction with conversation/history stores.
        *   `ChatInput.tsx`: Component for the text input area, including auto-resizing, send button, and loading states.
        *   `ChatHeader.tsx`: Displays the header of the chat interface.
        *   `Message.tsx`: Renders individual chat messages (user or AI), including parsing for `<think>` tags.
        *   `MarkdownRenderer.tsx`: Responsible for rendering Markdown content to HTML using `react-markdown` and `react-syntax-highlighter`. Contains custom renderers to control styling and spacing.
        *   `Sidebar.tsx`: The application's sidebar component.
        *   `ui/`: Subdirectory for smaller, generic UI elements.
            *   `auth-modal.tsx`: Modal for email sign-in.
            *   `loader.tsx`: Contains `Loader` and `FullPageLoader` components for loading states.
            *   `button.tsx`, `shimmer-button.tsx`, etc.
    *   **`context/`:** React Context providers.
        *   `AuthContext.tsx`: Provides authentication state (`isLoggedIn`, `isLoading`, `userEmail`, `userId`) and functions (`login`, `logoutUser`) derived from NextAuth.js's `useSession`.
    *   **`hooks/`:** Custom React hooks.
        *   `useDisableNextJsErrorOverlay.ts`: Hook to disable the Next.js error overlay in development.
        *   `useToast.tsx`: Hook for using the toast notification system.
    *   **`lib/`:** General utility functions.
        *   `utils.ts`: General utility functions.
    *   **`store/`:** Zustand state management stores.
        *   `conversationStore.ts`: Manages the messages for each individual chat session.
        *   `chatHistoryStore.ts`: Manages the list of chat sessions (ID, title, last message time).
        *   `userProfileStore.ts`: Manages user-specific profile information like username, profile picture, and user ID.
        *   `apiConfigStore.ts`: Stores API configuration details (e.g., for the AI provider).
        *   `sidebarStore.ts`: Manages the state of the sidebar (open/closed).
    *   **`utils/`:** Specific utility functions.
        *   `messageParser.ts`: Parses AI messages to separate `<think>` blocks from the final response.
        *   `streamingUtils.ts`: Contains functions for making streaming API calls for chat completions.
    *   `next-auth.d.ts`: TypeScript declaration file to augment NextAuth.js types (e.g., to add `id` to the `Session.user` type).

## 3. Key Functionalities & Flow

### 3.1. Authentication

*   **Provider:** NextAuth.js using the Email (passwordless) provider.
*   **Database:** Prisma with a SQLite database (`prisma/dev.db`) stores user accounts, sessions, and verification tokens.
*   **Flow:**
    1.  User clicks a "Sign In" button, which opens the `AuthModal` ([`src/components/ui/auth-modal.tsx`](src/components/ui/auth-modal.tsx:1)).
    2.  User enters their email and submits.
    3.  The `login` function from `AuthContext` is called, which in turn calls NextAuth.js's `signIn('email', { email, callbackUrl: '/chat' })`.
    4.  NextAuth.js (via [`src/app/api/auth/[...nextauth]/route.ts`](src/app/api/auth/[...nextauth]/route.ts:1)):
        *   Checks if the user exists in the database via PrismaAdapter.
        *   Generates a verification token and stores it.
        *   Sends a sign-in email using Nodemailer and the SMTP settings from `.env`. For development, if SMTP is not fully configured, it logs the link to the console. The email template is customized in this file.
    5.  User is redirected to the `/auth/verify-request` page, prompting them to check their email.
    6.  User clicks the link in their email.
    7.  NextAuth.js verifies the token, signs the user in, creates a session (JWT strategy), and updates user/session data in the database.
    8.  User is redirected to the `callbackUrl` ( `/chat`).
*   **Session Management:** `useSession` hook from `next-auth/react` is used in `AuthContext` to get session status and user data.
*   **Route Protection:** Protected pages (e.g., [`src/app/chat/[id]/page.tsx`](src/app/chat/[id]/page.tsx:1)) use `useAuth` to check `isLoggedIn` and `isLoading`. If not logged in, they redirect to the home page (`/`). The home page also redirects to `/chat` if the user is already logged in.

### 3.2. Chat Interface

*   **Navigation:** Accessing `/chat` redirects to `/chat/[uuid]` where `uuid` is a newly generated version 4 UUID.
*   **Chat State:**
    *   `ChatContainer.tsx` is the main component for an individual chat. It receives the `chatId` (UUID) from the URL.
    *   Messages for the current chat are managed by `useConversationStore`.
    *   A chat is only added to `useChatHistoryStore` when the *first message* is sent in that chat session. The title is derived from the first message content.
*   **Message Sending & Streaming:**
    *   `ChatInput.tsx` captures user input.
    *   On send, `handleSendMessage` in `ChatContainer.tsx` adds the user message to the conversation store.
    *   It then calls `createChatCompletion` (from [`src/utils/streamingUtils.ts`](src/utils/streamingUtils.ts:1)) to make a streaming API request to your AI backend (configured via `apiConfigStore`).
    *   AI responses are streamed back, and the corresponding AI message in `conversationStore` is updated chunk by chunk.
*   **Markdown Rendering:**
    *   AI responses (and potentially user messages if Markdown input is allowed) are rendered using `MarkdownRenderer.tsx`.
    *   This component uses `react-markdown` with `remark-gfm` for GitHub Flavored Markdown.
    *   Syntax highlighting for code blocks is done using `react-syntax-highlighter` with the `oneDark` theme.
    *   Custom renderers are provided for HTML elements (`p`, `li`, `ul`, `ol`, `code`, etc.) to control styling and minimize spacing, aiming for a compact chat-like appearance.
    *   Global CSS overrides in `globals.css` for `.prose` elements further refine the typography.

## 4. Styling

*   **Framework:** Tailwind CSS.
*   **Configuration:** `tailwind.config.ts` (standard setup), `postcss.config.mjs` (for Tailwind processing).
*   **Global Styles:** [`src/app/globals.css`](src/app/globals.css:1) includes Tailwind base directives, custom CSS variables, and global overrides for HTML elements and the `.prose` class (for Markdown).
*   **Animations:** Framer Motion is used for UI animations (e.g., modals, loaders).

## 5. State Management

*   **Client-Side State:** Zustand is used for managing global client-side state.
    *   `conversationStore.ts`: Stores messages for active chat sessions, keyed by `chatId`.
    *   `chatHistoryStore.ts`: Stores a list of all chats (ID, title, last message time) for potential display in a sidebar or history view.
    *   `userProfileStore.ts`: Stores user details like `userId`, `username`, `profilePicture`.
    *   `apiConfigStore.ts`: For API endpoint and key settings.
    *   `sidebarStore.ts`: For managing the visibility state of the sidebar.
*   **Persistence:** Some stores (e.g., `userProfileStore`, `apiConfigStore`, `chatHistoryStore`, `conversationStore`) use `persist` middleware from Zustand to save state to `localStorage`.

## 6. Environment Variables (`.env`)

The following environment variables are crucial:

*   `DATABASE_URL`: Connection string for the Prisma database (e.g., `"file:./dev.db"` for SQLite).
*   `NEXTAUTH_SECRET`: A strong, random string used to sign NextAuth.js JWTs and cookies. **Must be set by the developer.**
*   `NEXTAUTH_URL`: The canonical URL of your application (e.g., `http://localhost:3000` for development).
*   `EMAIL_SERVER_HOST`: SMTP server host for sending sign-in emails.
*   `EMAIL_SERVER_PORT`: SMTP server port.
*   `EMAIL_SERVER_USER`: SMTP server username.
*   `EMAIL_SERVER_PASSWORD`: SMTP server password.
*   `EMAIL_FROM`: The "from" address for sign-in emails.

## 7. Getting Started for Contributors

1.  **Clone the Repository.**
2.  **Install Dependencies:** Run `yarn install` (or `yarn` if using Yarn Berry/v2+).
3.  **Set up Environment Variables:**
    *   Copy `.env.example` (if one exists) to `.env` or create `.env` from scratch.
    *   Fill in `DATABASE_URL` (defaults to `"file:./dev.db"`).
    *   **Crucially, generate and set a strong `NEXTAUTH_SECRET`.** You can use `openssl rand -base64 32` in your terminal.
    *   Set `NEXTAUTH_URL` to `http://localhost:3000` for local development.
    *   Configure `EMAIL_SERVER_*` and `EMAIL_FROM` if you want to test with a real email provider. Otherwise, NextAuth.js will log sign-in links to the console during development.
4.  **Prepare Database:**
    *   Run `npx prisma generate` (or `yarn prisma generate`) to generate the Prisma Client.
    *   Run `npx prisma db push` (or `yarn prisma db push`) to create the database schema (this will create `prisma/dev.db` if it doesn't exist).
5.  **Run Development Server:**
    *   Run `yarn dev`.
    *   Open `http://localhost:3000` in your browser.

## 8. Potential Areas for Future Development / TODOs

*   **PWA Functionality:** Implement a `manifest.json` and service worker for Progressive Web App capabilities.
*   **Chat History UI:** Develop UI elements (e.g., in the sidebar) to display and switch between past chat sessions from `chatHistoryStore`.
*   **Performance Optimization:**
    *   Use `@next/bundle-analyzer` to identify large JavaScript modules.
    *   Further optimize component rendering and data fetching.
    *   Consider virtualization for very long chat lists if performance becomes an issue.
*   **Error Handling:** Enhance UI for API errors or other runtime issues beyond toasts.
*   **User Profile Customization:** Allow users to update their username and profile picture through `ProfileModal`.
*   **Testing:** Add unit and integration tests.

This documentation should provide a solid foundation for understanding and contributing to the Alvan World project.