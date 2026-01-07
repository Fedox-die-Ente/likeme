# 🚀 LikeME

A short, concise description of your project. What does it do and why is it useful?

<div align="center">

![GitHub License](https://img.shields.io/github/license/feeeedox/likeme?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/feeeedox/likeme?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/feeeedox/likeme?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/feeeedox/likeme?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/feeeedox/likeme?style=for-the-badge)

</div>

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [🔧 Configuration](#-configuration)
- [🤝 Contributing](#-contributing)
- [🐛 Bug Reports](#-bug-reports)
- [💡 Feature Requests](#-feature-requests)
- [📑 General Issues](#-general-issues)
- [❓ FAQ](#-faq)
- [🏆 Acknowledgments](#-acknowledgments)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/feeeedox/likeme.git

# Navigate to project directory
cd likeme

# Install dependencies
yarn install

# Start the development server
yarn dev
```

## ✨ Features

- ♥️ **Like System** - Let people like your GitHub profile with one click
- 🎨 **Beautiful Badges** - Dynamic SVG badges showing your likes, bio, and stats
- 👤 **User Profiles** - Personal dashboard to manage your profile and bio
- 📊 **Like Analytics** - See who likes you and track your popularity
- 🔐 **GitHub OAuth** - Secure authentication via GitHub
- ⚡ **Fast Performance** - Optimized with caching and efficient queries
- 🎯 **Easy Integration** - Add to your README with one line of code
- 🇩🇪 **Legal Compliance** - GDPR-compliant with German Imprint & Privacy Policy
- 🗑️ **Data Control** - Delete your account and data anytime

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (connect to your external MySQL/MariaDB instance)
DATABASE_URL=mysql://user:password@your-db-host:3306/likeme

# GitHub OAuth
NUXT_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret

# Session Secret (generate with: openssl rand -base64 32)
NUXT_SESSION_PASSWORD=password-with-at-least-32-characters
```

## 🤝 Contributing

Contributions are very welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for your changes
5. **Commit your changes**
   ```bash
   git commit -m 'Add: amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting

### Code Style

- Use 4 spaces for indentation (like you prefer! 😊)
- Use meaningful variable names
- Add comments for complex logic
- Follow the project's ESLint configuration

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/feeeedox/likeme.git

# Install dependencies
yarn install

# Start development server
yarn dev
```

## 🐛 Bug Reports

Found a bug? Please use our [🐛 Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) when creating an issue.

### Required Information

- 🐞 **Description** – What exactly went wrong?
- 🔁 **Steps to Reproduce** – How can we replicate the bug?
- ✅ **Expected Behavior** – What should have happened instead?
- 📸 **Screenshots** – If possible, add screenshots or GIFs
- 🖥️ **Environment** – OS, browser, Node.js version, project version
- ➕ **Additional Context** – Any extra info that could help

👉 Create a new bug report
here: [New Bug Report](https://github.com/feeeedox/likeme/issues/new?template=bug_report.md)

## 💡 Feature Requests

Got an idea for improvement? Use our [💡 Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) to share
it.

### Required Information

- ✨ **Feature Description** – What should be added/changed?
- 🎯 **Motivation & Problem** – Why is this feature valuable?
- 🛠️ **Proposed Solution** – How could it be implemented?
- 🔄 **Alternatives** – Any other approaches you considered
- 📸 **Mockups / Screenshots** – Optional design or concept images
- ➕ **Additional Context** – Extra notes, links, or references

👉 Submit your idea
here: [New Feature Request](https://github.com/feeeedox/likeme/issues/new?template=feature_request.md)

## 📑 General Issues

For discussions, questions, or other ideas, use our [📝 General Issue template](.github/ISSUE_TEMPLATE/general_issue.md).

### Required Information

- 📝 **Summary** – A clear and concise description of the issue
- 🤔 **Context** – Why are you opening this issue? (discussion, feedback, question)
- 🎯 **Goal** – What do you want to achieve with this issue?
- ➕ **Additional Notes** – Extra details, links, or references

👉 Open a general issue
here: [New General Issue](https://github.com/feeeedox/likeme/issues/new?template=general_issue.md)

## ❓ FAQ

<details>
<summary><strong>My badge is outdated</strong></summary>

We have caching in place to reduce server load. Badges are updated every 5 minutes.
</details>

<details>
<summary><strong>Which Node.js version is required?</strong></summary>

The project requires Node.js version 20.0 or higher.
</details>

<details>
<summary><strong>How can I contribute to the project?</strong></summary>

See the [Contributing](#-contributing) section for detailed information.
</details>

<details>
<summary><strong>Is the project free of charge?</strong></summary>

Yes, the project is open source and available free of charge under the MIT license.
</details>

<details>
<summary><strong>How do I report a bug?</strong></summary>

Create an issue in the GitHub repository with a detailed description of the problem.
</details>

## 🏆 Acknowledgments

### Contributors

<div align="center">

<a href="https://github.com/feeeedox/likeme/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=feeeedox/likeme" />
</a>

</div>

### Tools & Libraries Used

![Nuxt.js](https://img.shields.io/badge/nuxt.js-%2300C58E.svg?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-%2300CFFF.svg?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 📊 Project Stats

### Project Activity

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/feeeedox/likeme?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/feeeedox/likeme?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/feeeedox/likeme?style=for-the-badge)

## 💰 Support the Project

If you like the project, there are several ways you can support it:

### 🌟 Star the Repository

Give the project a star on GitHub!

### ☕ Buy Me a Coffee

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/feeeedox)

### 💝 Sponsor

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/feeeedox)

### 👍 Like me on LikeME

[![LikeME](https://likeme.fedox.ovh/api/badge/feeeedox)](https://likeme.fedox.ovh/u/feeeedox)

### 🗣️ Spread the Word

- Share on social media
- Write a blog post
- Tell your friends and colleagues

## 🔐 Security

### Reporting Security Vulnerabilities

If you discover a security vulnerability, please send an email to f3dox@proton.me. All security vulnerabilities
will be promptly addressed.

### Security Measures

- All dependencies are regularly updated
- Security scanning with automated tools
- Following OWASP guidelines
- Regular security audits

## 📄 License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
MIT License

Copyright (c) 2025 Florian Ohldag

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

### Project Maintainer

**Florian** - [@feeeedox](https://github.com/feeeedox)

### Get in Touch

<div align="center">

<a href="https://github.com/feeeedox" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
</a>
<a href="https://instagram.com/feeeedox" target="_blank">
<img src=https://img.shields.io/badge/instagram-%23000000.svg?&style=for-the-badge&logo=instagram&logoColor=white alt=instagram style="margin-bottom: 5px;" />
</a>
<a href="https://codepen.com/feeeedox" target="_blank">
<img src=https://img.shields.io/badge/codepen-%23131417.svg?&style=for-the-badge&logo=codepen&logoColor=white alt=codepen style="margin-bottom: 5px;" />
</a>
<a href="https://stackoverflow.com/users/16288266" target="_blank">
<img src=https://img.shields.io/badge/stackoverflow-%23F28032.svg?&style=for-the-badge&logo=stackoverflow&logoColor=white alt=stackoverflow style="margin-bottom: 5px;" />
</a>
<a href="mailto:f3dox@proton.me" target="_blank">
<img src=https://img.shields.io/badge/Proton%20Mail-6D4AFF?&style=for-the-badge&logo=protonmail&logoColor=fff alt=mail style="margin-bottom: 5px;" />
</a>
<a target="_blank">
<img src="https://img.shields.io/badge/fedox-7289DA?&style=for-the-badge&logo=discord&logoColor=white" alt="discord" style="margin-bottom: 5px;" />
</a>

</div>

### Project Links

- **Issues**: [GitHub Issues](https://github.com/feeeedox/likeme/issues)
- **Detailed Documentation**: [README_FEATURES.md](README_FEATURES.md)

---

<div align="center">

**[⬆ Back to Top](#%EF%B8%8F-likeme)**

Made with ❤️ by [Florian](https://github.com/feeeedox)

![Profile views](https://visitor-badge.laobi.icu/badge?page_id=feeeedox.likeme&left_text=Profile+views)

</div>

---

<div align="center">

<sub>README template generated using [better-repo](https://github.com/feeeedox/better-repo)</sub>

</div>
