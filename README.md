# 🎫 TicketPass

TicketPass is a web application designed to sell both free and paid tickets for educational events. Built with modern tech stack, it provides a seamless user experiance for event organizers and attenedees.

## Tabel of contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## Overview

Ticketpass allows users to create, manage, and sell tickets for educational events. It supports both free and paid events, with intergrated payment processing for seamless transactions. The app is buit with React.js and Next.js, and it leverages several modern tools and services to ensure a robust and scalabel platform.

## Features

- **User Authenication:** Secure user registration and login with [Clerk](https://clerk.com/)
- **Event Management:** Create and manage educational events.
- **Ticket Sales:** Sell free and apid tickets with [Stripe](https://stripe.com/) integration for payments.
- **Database Management:** Robust data handling with [Prisma](https://prisma.io/) and [MongoDB](https://mongodb.com/).
- **File Uploads:** Upload files using UploadThing.
- **Styling:** Modern and responsive design with Shadcn.

## Tech Stack

- **Frontend:** [React.js](https://reactjs.org/), [Next.js](https://nextjs.org/)

- **Backend:** [Next.js](https://nextjs.org/)
- **Authentication:**[Clerk](https://clerk.com/)
- **Database:** [MongoDB](https://mongodb.com/)
- **ORM:** [Prisma](https://prisma.io/)
- **Payments:** [Stripe](https://stripe.com/)
- **File Uploads:** [UploadThing](https://uploadthing.com/)
- **Styling:** [Shadcn](https://ui.shadcn.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Getting Started

#### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDb instance (local or cloud)
- Stripe account
- Clerk account
- uploadThing account

### Installation

1. Clone repository:

```bash
git clone https://github.com/username/ticketpass.git
cd ticketpass
```

2.Install dependencies:

```bash
  npm install
  #or
  yarn install
```

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_SERVER_URL =http://localhost:3000/
DATABASE_URL=your_mongodb_connection_url
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Running the App

1. Run database migrations with Prisma:
   ```bash
   npx prisma migrate dev
   ```
2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
