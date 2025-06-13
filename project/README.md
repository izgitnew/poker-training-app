# 🃏 Poker Training App

A comprehensive poker training application built with React Native and Expo. Practice your poker skills with realistic scenarios, track your progress, and improve your game with detailed analytics.

## 🚀 Features

### 🎯 Practice Mode
- **Realistic Scenarios**: Practice with dynamically generated poker hands
- **Multiple Game Phases**: Train on preflop, flop, turn, and river decisions
- **Position Awareness**: Learn optimal play from all table positions
- **Instant Feedback**: Get immediate analysis of your decisions with detailed explanations

### 📊 Analytics Dashboard
- **Performance Tracking**: Monitor your accuracy and improvement over time
- **Grade Distribution**: See how your decisions are graded (A+ to F)
- **Position Analysis**: Understand your strengths and weaknesses by position
- **Streak Tracking**: Keep track of your winning streaks and personal bests

### 📚 Learning Resources
- **Poker Glossary**: Comprehensive dictionary of poker terms
- **Category Filtering**: Browse terms by basics, betting, positions, hands, and strategy
- **Search Functionality**: Quickly find specific terms and definitions

### 👤 Profile & Progress
- **Level System**: Advance through levels as you improve
- **Achievement System**: Unlock achievements for various milestones
- **Statistics Overview**: View your overall performance metrics
- **Customizable Settings**: Personalize your learning experience

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router 4.0
- **Icons**: Lucide React Native
- **Fonts**: Inter & Roboto Mono (Google Fonts)
- **Platform**: Cross-platform (iOS, Android, Web)

## 📱 Screenshots

*Add screenshots of your app here*

## 🏗️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/poker-training-app.git
cd poker-training-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the app:
   - **Web**: Open http://localhost:8081 in your browser
   - **iOS**: Use the Expo Go app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code

## 🎮 How to Use

### Practice Mode
1. Navigate to the **Practice** tab
2. Review the dealt hand and game situation
3. Consider your position, pot odds, and hand strength
4. Make your decision: Fold, Call, or Raise
5. Review the detailed feedback and explanation
6. Continue practicing to improve your skills

### Analytics
1. Visit the **Analytics** tab to view your progress
2. Review your overall statistics and recent performance
3. Analyze your play by position to identify areas for improvement
4. Check your grade distribution to see decision quality trends

### Learning
1. Use the **Learn** tab to access the poker glossary
2. Search for specific terms or browse by category
3. Study definitions to improve your poker knowledge

## 🎯 Game Features

### Hand Evaluation
- Advanced hand strength calculation
- Pot odds analysis
- Expected value computation
- Position-based strategy adjustments

### Realistic Scenarios
- Dynamic hand generation
- Varied betting patterns
- Multiple game phases
- Different table positions

### Progress Tracking
- Accuracy percentage
- Decision grading system
- Streak tracking
- Experience points and levels

## 🔧 Development

### Project Structure
```
app/
├── (tabs)/           # Tab navigation screens
│   ├── index.tsx     # Practice screen
│   ├── analytics.tsx # Analytics dashboard
│   ├── glossary.tsx  # Learning resources
│   └── profile.tsx   # User profile
├── _layout.tsx       # Root layout
└── +not-found.tsx    # 404 page

components/
├── ActionButton.tsx      # Reusable action buttons
├── Card.tsx             # Playing card component
├── PositionDiagram.tsx  # Table position visualization
└── StatsCard.tsx        # Statistics display cards

utils/
├── pokerLogic.ts        # Core poker game logic
└── pokerGlossary.ts     # Glossary data and functions

types/
└── poker.ts             # TypeScript type definitions
```

### Key Components

- **GameState**: Manages current hand state and betting action
- **HandEvaluation**: Calculates optimal decisions and expected values
- **PositionDiagram**: Visual representation of table positions
- **StatsCard**: Reusable component for displaying statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Poker hand evaluation algorithms
- Expo team for the excellent development platform
- React Native community for continuous improvements
- Lucide for beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the poker glossary for game-related questions

---

**Happy Learning! 🎲**

*Improve your poker skills one hand at a time.*