// ─────────────────────────────────────────────────────────────
// Project data.
// Replace the placeholder image paths, GitHub and live URLs below
// with the real assets and links when they become available.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'zarkhaiz',
    index: '01',
    title: ['ZARKHAIZ', 'PAKISTAN'],
    category: 'Marketplace · Full-Stack',
    description:
      'A full-stack agriculture marketplace that connects farmers with agricultural products and digital services, built for real commerce workflows.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    features: [
      'Authentication',
      'Marketplace',
      'Farmer / Seller Roles',
      'Product Management',
      'Government Schemes',
      'AI Integration (Roadmap)',
    ],
    image: '/images/zarkhaiz.png',
    imageAlt: 'Zarkhaiz Pakistan — full-stack agriculture marketplace interface',
    cursorLabel: 'view',
    links: {
      github: 'https://github.com/Buildwithhamza-git/Zarkhaiz_Pakistan',
      live: 'https://example.com',
    },
  },
  {
    id: 'storyme',
    index: '02',
    title: ['STORYME', 'AI'],
    category: 'Generative AI · Product',
    description:
      'An AI-powered personalized storybook platform that transforms ideas and children\'s images into immersive illustrated stories.',
    tech: ['React', 'Node.js', 'AI APIs', 'Generative AI', 'Image Generation', 'PDF Generation', 'REST APIs'],
    features: [
      'AI Story Generation',
      'AI Image Generation',
      'Personalized Characters',
      'Storybook Creation',
      'PDF Generation',
      'Multi-page Stories',
    ],
    image: '/images/storyme-ai.png',
    imageAlt: 'StoryMe AI — personalized AI storybook creation platform',
    cursorLabel: 'explore',
    links: {
      github: 'https://github.com/Buildwithhamza-git/StoryMe-AI',
      live: 'https://example.com',
    },
  },
  {
    id: 'loan-approval',
    index: '03',
    title: ['LOAN', 'APPROVAL'],
    category: 'Machine Learning · Data Science',
    description:
      'An end-to-end Machine Learning loan approval system that classifies applications as approved or rejected using financial history and demographic features, deployed as a real-time Streamlit web app.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Matplotlib'],
    features: [
      'Approval / Rejection Prediction',
      'CIBIL & Asset Analysis',
      'Feature Engineering (LTI Ratio)',
      'XGBoost Final Model',
      '5-Fold Cross-Validation',
      'Real-time Streamlit App',
    ],
    image: '/images/loan-prediction.png',
    imageAlt: 'Loan Approval Prediction — machine learning loan approval system',
    cursorLabel: 'explore',
    pipeline: ['APPLICANT DATA', 'FEATURE ENGINEERING', 'MODELS', 'THRESHOLD TUNING', 'STREAMLIT DEPLOY'],
    links: {
      github: 'https://github.com/Buildwithhamza-git/ML-Projects',
      live: null,
    },
  },
]

export const profileImage = '/images/hamza.png'
