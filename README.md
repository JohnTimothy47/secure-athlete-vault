# Athlete Registration System with FHE

**🚀 Live Demo**: [https://althlete.vercel.app/](https://althlete.vercel.app/)  
**📹 Demo Video**: [https://github.com/JohnTimothy47/secure-athlete-vault/blob/main/althlete.mp4](https://github.com/JohnTimothy47/secure-athlete-vault/blob/main/althlete.mp4)

A privacy-preserving athlete registration system built with Fully Homomorphic Encryption (FHE) using the FHEVM protocol by Zama. This system allows athletes to register with encrypted personal information while enabling age-based validation for sport categories.

## Quick Start

## Features

- **Privacy-Preserving Athlete Registration**: All athlete data is encrypted using FHE
- **Homomorphic Age Validation**: Compute age requirements without decrypting athlete data
- **Anonymous Athlete Participation**: Users can view encrypted athlete statistics
- **End-to-End Encryption**: Athlete data remains encrypted throughout the process
- **Rainbow Wallet Integration**: Easy wallet connection for athlete registration
- **Access Control**: Role-based permissions for administrative athlete operations
- **Emergency Stop**: Authorized operators can pause athlete registration
- **Input Validation**: Comprehensive validation for athlete registration data

## Deployment Guide

### Local Development
```bash
npm run node        # Start local Hardhat network
npm run deploy:localhost  # Deploy contracts to localhost
cd frontend && npm run dev  # Start frontend development server
```

### Sepolia Testnet
```bash
npm run deploy:sepolia    # Deploy to Sepolia testnet
npm run verify:sepolia    # Verify contracts on Etherscan
```

## Security Features

- **FHE Encryption**: All athlete data is homomorphically encrypted
- **Access Control**: Role-based permissions for administrative operations
- **Input Validation**: Comprehensive validation of athlete registration data
- **Emergency Stop**: Authorized operators can pause athlete registration

For detailed instructions see:
[FHEVM Hardhat Quick Start Tutorial](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial)

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm or yarn/pnpm**: Package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   npx hardhat vars set MNEMONIC

   # Set your Infura API key for network access
   npx hardhat vars set INFURA_API_KEY

   # Optional: Set Etherscan API key for contract verification
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

3. **Compile and test**

   ```bash
   npm run compile
   npm run test
   ```

4. **Deploy to local network**

   ```bash
   # Start a local FHEVM-ready node
   npx hardhat node
   # Deploy to local network
   npx hardhat deploy --network localhost
   ```

5. **Deploy to Sepolia Testnet**

   ```bash
   # Deploy to Sepolia
   npx hardhat deploy --network sepolia
   # Verify contract on Etherscan
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

6. **Test on Sepolia Testnet**

   ```bash
   # Once deployed, you can run a simple test on Sepolia.
   npx hardhat test --network sepolia
   ```

7. **Run the Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

   The application features:
   - **Dark theme** with purple gradients inspired by the lucky project
   - **Glassmorphism effects** for modern UI
   - **Privacy-first design** with FHE encryption
   - **RainbowKit wallet integration** with localhost support

8. **Interact with Deployed Contracts**

   ```bash
   # Register an athlete
   npx hardhat --network localhost task:register-athlete --name 12345 --age 15 --contact 67890 --category 0

   # Get athlete information
   npx hardhat --network localhost task:get-athlete-info

   # Check age requirement
   npx hardhat --network localhost task:check-age-requirement
   ```

## 📁 Project Structure

```
athlete-registration-system/
├── contracts/                    # Smart contract source files
│   └── AthleteRegistration.sol   # Main FHE athlete registration contract
├── deploy/                       # Deployment scripts
├── tasks/                        # Hardhat custom tasks
├── test/                         # Test files
│   ├── AthleteRegistration.ts         # Local network tests
│   └── AthleteRegistrationSepolia.ts  # Sepolia testnet tests
├── frontend/                     # Next.js frontend application
│   ├── components/
│   │   └── AthleteRegistrationDemo.tsx # Main registration component
│   ├── hooks/
│   │   └── useAthleteRegistration.tsx  # Custom hook for contract interaction
│   ├── abi/                      # Generated contract ABIs
│   └── public/                   # Static assets
├── hardhat.config.ts             # Hardhat configuration
└── package.json                  # Dependencies and scripts
```

## 🎯 Features

- **Privacy-Preserving Registration**: Athlete data (name, age, contact) is encrypted using FHE
- **Age-Based Validation**: Homomorphic operations validate age requirements without decryption
- **Multi-Category Support**: Different sport categories with varying minimum age requirements
- **Rainbow Wallet Integration**: Modern wallet connection experience
- **End-to-End Encryption**: Data remains encrypted from frontend to blockchain
- **Real-time Decryption**: Athletes can decrypt their own information on-demand

## 🏆 Sport Categories & Age Requirements

| Category | Minimum Age | Description |
|----------|-------------|-------------|
| Individual | 8 | Individual sports |
| Team | 10 | Team-based sports |
| Endurance | 12 | Long-distance/endurance sports |
| Combat | 14 | Martial arts and combat sports |
| Other | 8 | Other categories |

## 🔐 FHE Operations

The system uses FHE for:
- **Encrypted Storage**: All personal data is stored encrypted on-chain
- **Homomorphic Age Validation**: Age requirements are checked without decryption
- **Selective Decryption**: Only the athlete can decrypt their own information

## 🚀 Usage

### Frontend User Flow

1. **Connect Wallet**: Use Rainbow wallet to connect to the application
2. **Register as Athlete**: Fill out the registration form with:
   - Name (represented as number for demo)
   - Age
   - Contact information (as number for demo)
   - Sport category selection
3. **Data Encryption**: All data is encrypted client-side before submission
4. **View Encrypted Data**: See your encrypted information on-chain
5. **Decrypt Information**: Decrypt your personal data for private viewing

### Contract Functions

- `registerAthlete()`: Register with encrypted personal data
- `getEncryptedName()`: Retrieve encrypted name
- `getEncryptedAge()`: Retrieve encrypted age
- `getEncryptedContact()`: Retrieve encrypted contact
- `checkAgeRequirement()`: Homomorphic age validation
- `getAllEncryptedAthleteInfo()`: Get all encrypted athlete data

## 📜 Available Scripts

### Backend (Hardhat) Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm run compile`  | Compile all contracts    |
| `npm run test`     | Run all tests            |
| `npm run test:sepolia` | Run Sepolia tests    |
| `npm run coverage` | Generate coverage report |
| `npm run lint`     | Run linting checks       |
| `npm run clean`    | Clean build artifacts    |

### Frontend Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npm run start`    | Start production server  |
| `npm run lint`     | Run linting checks       |

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [FHEVM Hardhat Plugin](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/zama-ai/fhevm/issues)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

**Built with ❤️ by the Zama team**
