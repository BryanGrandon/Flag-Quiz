# Flag Quiz

A country flag quiz game built with React and TypeScript. Test your geographical knowledge by identifying countries from their flags and challenging yourself to improve your score and streak.

## Live Demo

- [🌐 Website Demo.](https://bryangrandon.github.io/Flag-Quiz/)

## Features

- Multiple-choice questions: Identify countries by their flags.
- Interactive gameplay: Select answers and receive immediate feedback.
- Score tracking: Keep track of your correct answers.
- Streak system: Build consecutive correct-answer streaks.
- Responsive design: Play on desktop and mobile devices.
- Persistent statistics: Save supported game statistics locally.

## 📚 Tech Stack

[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TS](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-grey?style=flag&logo=tailwind-css&logoColor=38B2AC)](https://tailwindcss.com/)

## 📦 Installation

```bash
# Clone the repository:
git clone https://github.com/BryanGrandon/Flag-Quiz.git

# Access the project folder
cd Flag-Quiz

# Install all the project dependencies with:
pnpm install

# And start the development server with:
pnpm run dev
```

## 📁 Project Structure

```text
src/
├── config/
├── features/
├── layout/
├── services/
├── shared/
└── styles/
```

## ⚙️ How It Works

1. Countries are fetched from the API.
2. A random country is selected.
3. Four options are generated.
4. The player's answer is validated.
5. The streak and score are updated.

## 📄 License

See the [LICENSE](/LICENCE.md) file for license rights and limitations (MIT).
