# PAGE-R Medical Study Platform

A terminal-styled medical education platform for medical students featuring flashcards, case labs, PDF management, study tracking, mood & journal, and neural games.

## Project info

**URL**: https://lovable.dev/projects/f5e590a3-ede9-429c-b065-b6fce42f2909

## Features

- 🎯 **Flashcard System**: Study medical terms with interactive flashcards
- 🔬 **Case Lab**: Practice diagnostic skills with clinical scenarios  
- 📚 **PDF Zone**: Upload and manage medical PDFs
- 📅 **Calendar**: Track exams, community visits, and references
- 📊 **Study Stats**: Visualize study patterns and progress
- 📝 **Mood & Journal**: Track mental health and reflect on learning
- 🎮 **Neural Games**: Reinforce learning through gamified activities
  - Diagnosis Dash: Time-trial diagnostic challenges
  - Memory Flip: Match medical terms with definitions
  - Typing Challenge: Speed typing of medical terminology
  - Scrambled Terms: Unscramble medical words
  - Flashcard Duel: Quick-fire flashcard review

## Project Structure

```
src/
├── components/     # Reusable UI components (shadcn/ui)
├── data/          # Medical data and game content
│   ├── medicalDictionary.ts    # Medical terms and definitions
│   └── diagnosisCases.ts       # Clinical case scenarios
├── pages/         # Main application pages
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f5e590a3-ede9-429c-b065-b6fce42f2909) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f5e590a3-ede9-429c-b065-b6fce42f2909) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
