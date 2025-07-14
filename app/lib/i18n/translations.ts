export type Language = 'en' | 'si' | 'ta';

export interface Translations {
  navigation: {
    home: string;
    services: string;
    pricing: string;
    about: string;
    contact: string;
    bookMeeting: string;
  };
  hero: {
    titleMain: string;
    titleAccent: string;
    subtitle: string;
    startProject: string;
    viewPricing: string;
    stats: {
      projects: string;
      satisfaction: string;
      loadTime: string;
    };
    exploreSite: string;
    yearFounded: string;
    commitment: string;
    availability: string;
    letsBuild: string;
    openForProjects: string;
    reachOut: string;
    startAProject: string;
  };
  services: {
    title: string;
    subtitle: string;
    webApps: {
      title: string;
      description: string;
    };
    mobileApps: {
      title: string;
      description: string;
    };
    systemIntegration: {
      title: string;
      description: string;
    };
    seo: {
      title: string;
      description: string;
    };
    uiux: {
      title: string;
      description: string;
    };
    gameDev: {
      title: string;
      description: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    customRequirements: string;
    scheduleConsultation: string;
  };
  about: {
    title: string;
    executionFocused: {
      title: string;
      description: string;
    };
    techAgnostic: {
      title: string;
      description: string;
    };
    builtToScale: {
      title: string;
      description: string;
    };
    humanTouch: {
      title: string;
      description: string;
    };
    lightningFast: string;
    subSecondLoad: string;
    uptime: string;
    support: string;
    intro: string;
    mission: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      projectType: string;
      message: string;
      sendMessage: string;
      sending: string;
      nameRequired: string;
      emailRequired: string;
      phoneRequired: string;
      projectTypeRequired: string;
      messageRequired: string;
      success: string;
      error: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      projectTypePlaceholder: string;
    };
    projectTypes: {
      webApp: string;
      mobileApp: string;
      systemIntegration: string;
      ecommerce: string;
      notSure: string;
      selectType: string;
    };
    scheduleCall: {
      title: string;
      subtitle: string;
      button: string;
    };
    contactInfo: {
      title: string;
      email: string;
      location: string;
      responseTime: string;
    };
    getInTouch: string;
    description: string;
    scheduleMeeting: string;
  };
  calendar: {
    title: string;
    chooseDate: string;
    availableTimes: string;
    yourDetails: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    meetingSummary: string;
    duration: string;
    bookMeeting: string;
    booking: string;
    fillRequiredFields: string;
    placeholder: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    selectDate: string;
    selectTime: string;
    schedule: string;
    scheduling: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    services: string;
    webApps: string;
    mobileApps: string;
    systemIntegration: string;
    contact: string;
    rightsReserved: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    close: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    required: string;
  };
  showcase: {
    frameworks: string;
    languages: string;
    hosting: string;
    productionReady: string;
    expertise: string;
    fastReliableScalable: string;
    supportingAll: string;
  };
  spiderWebPricing: {
    interactiveBuilder: string;
    clickToExplore: string;
    estimatedTotal: string;
    howItWorks: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    resetSelection: string;
    getQuote: string;
    selectedFeatures: string;
    startByClicking: string;
    resetView: string;
    zoom: string;
    startHere: string;
    webDevelopment: string;
    landingPage: string;
    ecommerceStore: string;
    adminDashboard: string;
    portfolioSite: string;
    mobileDevelopment: string;
    iosApp: string;
    androidApp: string;
    crossPlatform: string;
    uiuxDesign: string;
    legend: string;
    selected: string;
    available: string;
    locked: string;
    scrollToZoom: string;
    dragToPan: string;
    hoverForDetails: string;
    clickToSelect: string;
    navigation: string;
    scrollWheelToZoom: string;
    clickAndDragToPan: string;
    hoverNodesForDescriptions: string;
    clickToSelectFeatures: string;
    centerDescription: string;
    webDevelopmentDescription: string;
    landingPageDescription: string;
    ecommerceStoreDescription: string;
    adminDashboardDescription: string;
    portfolioSiteDescription: string;
    mobileDevelopmentDescription: string;
    iosAppDescription: string;
    androidAppDescription: string;
    crossPlatformDescription: string;
    uiuxDesignDescription: string;
    systemIntegration: string;
    systemIntegrationDescription: string;
    apiDevelopment: string;
    apiDevelopmentDescription: string;
    paymentGateway: string;
    paymentGatewayDescription: string;
    crmIntegration: string;
    crmIntegrationDescription: string;
    databaseSetup: string;
    databaseSetupDescription: string;
    devopsCloud: string;
    devopsCloudDescription: string;
    cloudHosting: string;
    cloudHostingDescription: string;
    cicdPipeline: string;
    cicdPipelineDescription: string;
    monitoringAnalytics: string;
    monitoringAnalyticsDescription: string;
    featuresSelected: string;
    deselect: string;
    select: string;
  };
  meeting: {
    toast: {
      success: string;
      error: string;
    };
    messages: {
      bookingFailed: string;
      bookingSuccess: string;
      invalidDate: string;
      invalidTime: string;
    };
  };
  api: {
    toast: {
      networkError: string;
    };
    messages: {
      networkError: string;
      serverError: string;
      timeout: string;
      unauthorized: string;
      forbidden: string;
      notFound: string;
    };
  };
  validation: {
    requiredField: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidName: string;
    tooShort: string;
    tooLong: string;
    invalidFormat: string;
  };
  form: {
    submissionFailed: string;
    validationFailed: string;
    success: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    navigation: {
      home: 'Home',
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      bookMeeting: 'Book Meeting',
    },
    hero: {
      titleMain: 'Secure Software that',
      titleAccent: 'just works',
      subtitle: "We're a lean Sri Lankan software development agency. No bloated processes, no complexity. Just high-quality web apps, mobile solutions, and integrated systems that scale.",
      startProject: 'Start Your Project',
      viewPricing: 'View Pricing',
      stats: {
        projects: 'Projects Delivered',
        satisfaction: 'Client Satisfaction',
        loadTime: 'Page Load Time',
      },
      exploreSite: 'Explore site',
      yearFounded: 'Year Founded',
      commitment: 'Commitment',
      availability: 'Availability',
      letsBuild: 'Let\'s build something great together.',
      openForProjects: 'We\'re open for new projects and collaborations.',
      reachOut: 'Reach out and let\'s make your idea a reality!',
      startAProject: 'Start a Project',
    },
    services: {
      title: 'What we build',
      subtitle: 'Focus on your goals, not our tools. We adapt tech to your needs, not the other way around.',
      webApps: {
        title: 'Web Applications',
        description: 'Modern, responsive web apps built with the latest tech. Fast, secure, and scalable.'
      },
      mobileApps: {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile solutions delivering great user experiences.'
      },
      systemIntegration: {
        title: 'System Integration',
        description: 'Seamless integration of existing systems with modern solutions and APIs.'
      },
      seo: {
        title: 'SEO Optimization',
        description: 'Improve visibility, attract qualified traffic, and build trust through ethical SEO practices.'
      },
      uiux: {
        title: 'UI/UX Design',
        description: 'Design intuitive interfaces and seamless experiences that delight users and maximize conversions.'
      },
      gameDev: {
        title: 'Game Development',
        description: 'From concept to release-deliver high-quality games faster, more flexibly, and cost‑effectively.'
      },
    },
    pricing: {
      title: 'Build your solution',
      subtitle: 'Interactive pricing that adapts to your needs. Click, explore, and build your perfect solution.',
      customRequirements: 'Need something not shown in the web? Let\'s discuss your custom requirements.',
      scheduleConsultation: 'Schedule a Free Consultation',
    },
    about: {
      title: 'Why choose Us?',
      executionFocused: {
        title: 'Execution Focused',
        description: 'We ship fast. No endless meetings or bureaucracy. Just results.',
      },
      techAgnostic: {
        title: 'Platform Neutral',
        description: 'Right tool for the job. We adapt to your needs, not the other way around.',
      },
      builtToScale: {
        title: 'Built to Scale',
        description: 'Every solution is designed with growth in mind. Start small, scale big.',
      },
      humanTouch: {
        title: 'Human Touch',
        description: 'We believe in genuine connections. Like cats, we\'re independent but loyal.',
      },
      lightningFast: 'Lightning Fast',
      subSecondLoad: 'Sub-second load times',
      uptime: 'Uptime',
      support: 'Support',
      intro: 'Welcome to {name}, a new digital studio passionate about building modern, scalable, and delightful web experiences. We\'re a small, ambitious team working with early clients and growing our portfolio.',
      mission: 'Our mission: <span class="italic">to help you launch, scale, and succeed online</span>.',
    },
    contact: {
      title: 'Ready to build?',
      subtitle: 'Let\'s discuss your project. No lengthy forms, no sales pitches. Just a conversation.',
      form: {
        name: 'Name *',
        email: 'Email *',
        phone: 'Phone',
        projectType: 'Project Type *',
        message: 'Tell us about your project *',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        nameRequired: 'Name must be at least 2 characters',
        emailRequired: 'Please enter a valid email',
        phoneRequired: 'Please enter a valid phone number',
        projectTypeRequired: 'Please select a project type',
        messageRequired: 'Message must be at least 10 characters',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        error: 'Failed to send message. Please try again or contact us directly.',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '+94 xxx xxx xxx',
        messagePlaceholder: 'What would you like to discuss?',
        submit: 'Send Message',
        submitting: 'Sending...',
        projectTypePlaceholder: 'Select your project type',
      },
      projectTypes: {
        webApp: '🌐 Web Application',
        mobileApp: '📱 Mobile App',
        systemIntegration: '🔗 System Integration',
        ecommerce: '🛒 E-commerce Store',
        notSure: '🤔 Not Sure Yet',
        selectType: '🚀 Select your project type',
      },
      scheduleCall: {
        title: 'Prefer to talk?',
        subtitle: 'Schedule a free 30-minute consultation to discuss your project in detail.',
        button: 'Schedule Free Call',
      },
      contactInfo: {
        title: 'Get in touch',
        email: 'neqo360@gmail.com',
        location: 'Colombo, Sri Lanka',
        responseTime: 'Usually respond within 2 hours',
      },
      getInTouch: 'Get in touch',
      description: 'Reach out to us for any questions or project discussions.',
      scheduleMeeting: 'Schedule a Meeting',
    },
    calendar: {
      title: 'Schedule a Meeting',
      chooseDate: 'Choose Date',
      availableTimes: 'Available Times',
      yourDetails: 'Your Details',
      name: 'Name *',
      email: 'Email *',
      phone: 'Phone',
      message: 'Message',
      meetingSummary: 'Meeting Summary',
      duration: 'Duration: 30 minutes',
      bookMeeting: 'Book Meeting',
      booking: 'Booking...',
      fillRequiredFields: 'Please fill in all required fields',
      placeholder: {
        name: 'Your full name',
        email: 'your@email.com',
        phone: '+94 xxx xxx xxx',
        message: 'What would you like to discuss?',
      },
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      schedule: 'Schedule',
      scheduling: 'Scheduling...',
    },
    footer: {
      copyright: '© 2025 Neqo360',
      tagline: 'Digital Solutions',
      services: 'Services',
      webApps: 'Web Applications',
      mobileApps: 'Mobile Apps',
      systemIntegration: 'System Integration',
      contact: 'Contact',
      rightsReserved: 'All rights reserved.',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      required: 'Required',
    },
    showcase: {
      frameworks: 'Frameworks',
      languages: 'Languages',
      hosting: 'Cloud & Hosting',
      productionReady: 'Production Ready',
      expertise: 'Expertise in 10+ frameworks and languages',
      fastReliableScalable: 'Fast • Reliable • Scalable',
      supportingAll: 'Supporting all major frameworks and languages',
    },
    spiderWebPricing: {
      interactiveBuilder: 'Interactive Project Builder',
      clickToExplore: 'Explore and select features to build your custom solution',
      estimatedTotal: 'Estimated Total',
      selected: 'Selected',
      available: 'Available',
      locked: 'Locked',
      howItWorks: 'How it works:',
      step1: '1. Start from the center',
      step2: '2. Click sectors to unlock options',
      step3: '3. Select features to build your quote',
      step4: '4. Watch the web grow with your choices',
      resetSelection: 'Reset Selection',
      getQuote: 'Get Quote for Rs. {total}',
      selectedFeatures: 'Selected Features',
      startByClicking: 'Start by clicking the center node',
      resetView: 'Reset View',
      zoom: 'Zoom: {percent}%',
      startHere: 'Start Here',
      webDevelopment: 'Web Development',
      landingPage: 'Landing Page',
      ecommerceStore: 'E-commerce Store',
      adminDashboard: 'Admin Dashboard',
      portfolioSite: 'Portfolio Site',
      mobileDevelopment: 'Mobile Development',
      iosApp: 'iOS App',
      androidApp: 'Android App',
      crossPlatform: 'Cross-Platform',
      uiuxDesign: 'UI/UX Design',
      legend: 'Legend',
      scrollToZoom: '• Scroll to zoom',
      dragToPan: '• Drag to pan',
      hoverForDetails: '• Hover for details',
      clickToSelect: '• Click to select',
      navigation: 'Navigation:',
      scrollWheelToZoom: 'Scroll wheel to zoom in/out',
      clickAndDragToPan: 'Click and drag to pan around',
      hoverNodesForDescriptions: 'Hover nodes for descriptions',
      clickToSelectFeatures: 'Click to select features',
      centerDescription: 'Choose your development path to unlock features',
      webDevelopmentDescription: 'Modern, responsive web applications and websites',
      landingPageDescription: 'Professional single-page website with modern design',
      ecommerceStoreDescription: 'Full-featured online store with payment integration',
      adminDashboardDescription: 'Comprehensive management interface with analytics',
      portfolioSiteDescription: 'Showcase your work with an elegant portfolio',
      mobileDevelopmentDescription: 'Native and cross-platform mobile applications',
      iosAppDescription: 'Native iOS application with App Store optimization',
      androidAppDescription: 'Native Android app with Google Play optimization',
      crossPlatformDescription: 'React Native or Flutter app for both platforms',
      uiuxDesignDescription: 'Professional mobile app design and user experience',
      systemIntegration: 'System Integration',
      systemIntegrationDescription: 'Connect and synchronize your existing systems',
      apiDevelopment: 'API Development',
      apiDevelopmentDescription: 'Custom REST, GraphQL, or webhook integrations',
      paymentGateway: 'Payment Gateway',
      paymentGatewayDescription: 'Secure payment processing with multiple providers',
      crmIntegration: 'CRM Integration',
      crmIntegrationDescription: 'Connect with Salesforce, HubSpot, or custom CRM',
      databaseSetup: 'Database Setup',
      databaseSetupDescription: 'Database design, optimization, and migration',
      devopsCloud: 'DevOps & Cloud',
      devopsCloudDescription: 'Infrastructure, deployment, and monitoring solutions',
      cloudHosting: 'Cloud Hosting',
      cloudHostingDescription: 'AWS, GCP, or Azure deployment and management',
      cicdPipeline: 'CI/CD Pipeline',
      cicdPipelineDescription: 'Automated testing, building, and deployment',
      monitoringAnalytics: 'Monitoring & Analytics',
      monitoringAnalyticsDescription: 'Performance monitoring and error tracking',
      featuresSelected: '{count} features selected',
      deselect: 'Deselect',
      select: 'Select',
    },
    meeting: {
      toast: {
        success: "Meeting request sent successfully! We'll get back to you soon.",
        error: 'Failed to book meeting. Please try again.'
      },
      messages: {
        bookingFailed: 'Failed to book meeting. Please try again.',
        bookingSuccess: "Meeting request sent successfully! We'll get back to you soon.",
        invalidDate: 'Please select a valid date.',
        invalidTime: 'Please select a valid time.'
      }
    },
    api: {
      toast: {
        networkError: 'Network error. Please check your connection and try again.'
      },
      messages: {
        networkError: 'Network error. Please check your connection and try again.',
        serverError: 'Server error. Please try again later.',
        timeout: 'Request timed out. Please try again.',
        unauthorized: 'You are not authorized to perform this action.',
        forbidden: 'Access denied.',
        notFound: 'Resource not found.'
      }
    },
    validation: {
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      invalidName: 'Name can only contain letters and spaces',
      tooShort: 'This field is too short',
      tooLong: 'This field is too long',
      invalidFormat: 'Invalid format',
    },
    form: {
      submissionFailed: 'Failed to submit form. Please try again.',
      validationFailed: 'Please fix the errors above and try again.',
      success: 'Form submitted successfully!',
    },
  },
  si: {
    navigation: {
      home: 'මුල් පිටුව',
      services: 'සේවා',
      pricing: 'මිල',
      about: 'අප ගැන',
      contact: 'සම්බන්ධ වන්න',
      bookMeeting: 'සාකච්ඡාවක් වෙන් කරන්න',
    },
    hero: {
      titleMain: 'හොඳින් ක්‍රියාත්මක වන',
      titleAccent: 'මෘදුකාංග',
      subtitle: 'අපි ශ්‍රී ලංකාවේ සුළු මෘදුකාංග සංවර්ධන ආයතනයක්. අනවශ්‍ය ක්‍රියාවලි නැත, සංකීර්ණතා නැත. ගුණාත්මක වෙබ් යෙදුම්, ජංගම විසඳුම් සහ පරිමාණය කළ හැකි ඒකාබද්ධ පද්ධති පමණි.',
      startProject: 'ඔබේ ව්‍යාපෘතිය ආරම්භ කරන්න',
      viewPricing: 'මිල බලන්න',
      stats: {
        projects: 'සම්පූර්ණ ව්‍යාපෘති',
        satisfaction: 'පාරිභෝගික සතුට',
        loadTime: 'පිටු පූරණ කාලය',
      },
      exploreSite: 'නිවැරදි මෙවලම',
      yearFounded: 'පිටුව පිරිවිය',
      commitment: 'ප්‍රතිඵල පමණි',
      availability: 'ප්‍රතිඵල පමණි',
      letsBuild: 'අපි ස්වාරීන නමුත් විශ්වසනීය.',
      openForProjects: 'අපි ස්වාරීන නමුත් විශ්වසනීය.',
      reachOut: 'අපි ස්වාරීන නමුත් විශ්වසනීය.',
      startAProject: 'ඔබේ ව්‍යාපෘතිය වෙන් කරන්න',
    },
    services: {
      title: 'අපි ගොඩනඟන දේ',
      subtitle: 'ක්‍රියාත්මක වීම සහ ප්‍රතිඵල මත අවධානය යොමු කරන තාක්ෂණික-උදාසීන විසඳුම්',
      webApps: {
        title: 'වෙබ් යෙදුම්',
        description: 'නවතම තාක්ෂණයන් සමඟ ගොඩනගන ලද නවීන, ප්‍රතිචාරාත්මක වෙබ් යෙදුම්. වේගවත්, ආරක්ෂිත සහ පරිමාණය කළ හැකිය.'
      },
      mobileApps: {
        title: 'ජංගම යෙදුම්',
        description: 'විශිෂ්ට පරිශීලක අත්දැකීම් ලබා දෙන ස්වදේශීය සහ cross-platform ජංගම විසඳුම්.'
      },
      systemIntegration: {
        title: 'පද්ධති ඒකාබද්ධ කිරීම',
        description: 'වර්තමාන පද්ධති නවීන විසඳුම් සහ API සමඟ අඛණ්ඩව ඒකාබද්ධ කිරීම.'
      },
      seo: {
        title: 'SEO Optimization',
        description: 'Improve visibility, attract qualified traffic, and build trust through ethical SEO practices.'
      },
      uiux: {
        title: 'UI/UX Design',
        description: 'Design intuitive interfaces and seamless experiences that delight users and maximize conversions.'
      },
      gameDev: {
        title: 'Game Development',
        description: 'From concept to release-deliver high-quality games faster, more flexibly, and cost‑effectively.'
      },
    },
    pricing: {
      title: 'ඔබේ විසඳුම ගොඩනඟන්න',
      subtitle: 'ඔබේ අවශ්‍යතාවයන්ට ගැලපෙන අන්තර්ක්‍රියාකාරී මිල. ක්ලික් කර, ගවේෂණය කර, ඔබේ පරිපූර්ණ විසඳුම ගොඩනඟන්න.',
      customRequirements: 'වෙබ් එකේ නොපෙන්වන දෙයක් අවශ්‍යද? ඔබේ අභිරුචි අවශ්‍යතා සාකච්ඡා කරමු.',
      scheduleConsultation: 'නොමිලේ සාකච්ඡාවක් වෙන් කරන්න',
    },
    about: {
      title: 'ඇයි අපි තෝරන්නේ?',
      executionFocused: {
        title: 'ක්‍රියාත්මක වීම මත අවධානය',
        description: 'අපි වේගයෙන් යවමු. අනවශ්‍ය රැස්වීම් හෝ නිලධාරිවාදය නැත. ප්‍රතිඵල පමණි.',
      },
      techAgnostic: {
        title: 'තාක්ෂණික උදාසීන',
        description: 'කාර්යය සඳහා නිවැරදි මෙවලම. අපි ඔබේ අවශ්‍යතාවයන්ට ගැලපෙමු, අනෙක් ආකාරයට නොවේ.',
      },
      builtToScale: {
        title: 'පරිමාණය කළ හැකි විසඳුම්',
        description: 'ඉදිරියට වර්ධනය කළ හැකි ලෙස සැලසුම් කර ඇත. කුඩා ආරම්භ කර, විශාල ව්‍යාපෘතිවලට පරිවර්තනය වන්න.',
      },
      humanTouch: {
        title: 'මානව ස්පර්ශය',
        description: 'අපි සැබෑ සම්බන්ධතා විශ්වාස කරමු. බළලුන් මෙන්, අපි ස්වාரීන නමුත් විශ්වසනීය.',
      },
      lightningFast: 'විදුලි වේගයෙන්',
      subSecondLoad: 'තත්පරයකට අඩු පූරණ කාල',
      uptime: 'ක්‍රියාත්මක කාලය',
      support: 'සහාය',
      intro: '{name} වෙත සාදරයෙන් පිළිගනිමු! නවීන, පරිමාණය කළ හැකි සහ ආකර්ෂණීය වෙබ් අත්දැකීම් නිර්මාණය කිරීමේ උනන්දුවෙන් යුත් නව ඩිජිටල් ස්ටුඩියෝවකි. අපි කුඩා, උනන්දුවෙන් යුත් කණ්ඩායමක් වන අතර පළමු ගනුදෙනුකරුවන් සමඟ වැඩ කරමින් අපගේ පෝර්ට්ෆෝලියෝව වර්ධනය කරමින් සිටිමු.',
      mission: 'අපගේ මෙහෙවර: <span class="italic">ඔබට අන්තර්ජාලයේදී ආරම්භ වීමට, වර්ධනය වීමට සහ සාර්ථක වීමට උපකාර කිරීමයි</span>.',
    },
    contact: {
      title: 'ගොඩනැගීමට සූදානම්ද?',
      subtitle: 'ඔබේ ව්‍යාපෘතිය සාකච්ඡා කරමු. දිගු පෝරම් නැත, විකුණුම් කථා නැත. සාකච්ඡාවක් පමණි.',
      form: {
        name: 'නම *',
        email: 'විද්‍යුත් තැපෑල *',
        phone: 'දුරකථන අංකය',
        projectType: 'ව්‍යාපෘති වර්ගය *',
        message: 'ඔබේ ව්‍යාපෘතිය ගැන අපට කියන්න *',
        sendMessage: 'පණිවිඩය යවන්න',
        sending: 'යවමින්...',
        nameRequired: 'නම අවම වශයෙන් අකුරු 2ක් විය යුතුය',
        emailRequired: 'කරුණාකර වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න',
        phoneRequired: 'කරුණාකර වලංගු විද්‍යුත් දුරකථන අංකය ඇතුළත් කරන්න',
        projectTypeRequired: 'කරුණාකර ව්‍යාපෘති වර්ගයක් තෝරන්න',
        messageRequired: 'පණිවිඩය අවම වශයෙන් අකුරු 10ක් විය යුතුය',
        success: 'පණිවිඩය සාර්ථකව යවන ලදී! අපි ඉක්මනින් ඔබට පිළිතුරු දෙන්නෙමු.',
        error: 'පණිවිඩය යැවීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න හෝ අපට සෘජුවම සම්බන්ධ වන්න.',
        namePlaceholder: 'ඔබේ සම්පූර්ණ නම',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '+94 xxx xxx xxx',
        messagePlaceholder: 'ඔබ සාකච්ඡා කිරීමට කැමති දේ කුමක්ද?',
        submit: 'පණිවිඩය යවන්න',
        submitting: 'යවමින්...',
        projectTypePlaceholder: 'ඔබේ ව්‍යාපෘති වර්ගය තෝරන්න',
      },
      projectTypes: {
        webApp: '🌐 වෙබ් යෙදුම',
        mobileApp: '📱 ජංගම යෙදුම',
        systemIntegration: '🔗 පද්ධති ඒකාබද්ධ කිරීම',
        ecommerce: '🛒 වෙළඳසැල',
        notSure: '🤔 நிர்வாகம் இல்லை',
        selectType: '🚀 ඔබේ ව්‍යාපෘති වර්ගය තෝරන්න',
      },
      scheduleCall: {
        title: 'කතා කිරීමට කැමතිද?',
        subtitle: 'ඔබේ ව්‍යාපෘතිය විස්තරාත්මකව සාකච්ඡා කිරීමට නොමිලේ මිற்றி 30ක සාකච්ඡාවක් වෙන් කරන්න.',
        button: 'නොමිලේ ඇம்තුමක් වෙන් කරන්න',
      },
      contactInfo: {
        title: 'සම්බන්ධ වන්න',
        email: 'neqo360@gmail.com',
        location: 'කොළඹ, ශ්‍රී ලංකාව',
        responseTime: 'සාஸ்கார විය 2 மணி நேரத்திற்குள் பதிலளிக்கிறோம்',
      },
      getInTouch: 'සම්බන්ධ වන්න',
      description: 'கேள்விகளுக்கு அல்லது திட்ட விவாதங்களுக்கு எங்களை அணுகவும்.',
      scheduleMeeting: 'සාකච්ඡාවක් වෙන් කරන්න',
    },
    calendar: {
      title: 'සාකච්ඡාවක් වෙන් කරන්න',
      chooseDate: 'දිනය තෝරන්න',
      availableTimes: 'ලබා ගත හැකි කාල',
      yourDetails: 'ඔබේ විස්තර',
      name: 'නම *',
      email: 'විද්‍යුත් තැපෑල *',
      phone: 'දුරකථන අංකය',
      message: 'පණිවිඩය',
      meetingSummary: 'සාකච්ඡා සාරාංශය',
      duration: 'කාලය: මිනිත්තු 30',
      bookMeeting: 'සාකච්ඡාව වෙන් කරන්න',
      booking: 'වෙන් කරමින්...',
      fillRequiredFields: 'කරුණාකර සියලුම අවශ්‍ය ක්ෂේත්‍ර පුරවන්න',
      placeholder: {
        name: 'ඔබේ සම්පූර්ණ නම',
        email: 'your@email.com',
        phone: '+94 xxx xxx xxx',
        message: 'ඔබ සාකච්ඡා කිරීමට කැමති දේ කුමක්ද?',
      },
      selectDate: 'දිනය තෝරන්න',
      selectTime: 'කාලය තෝරන්න',
      schedule: 'වෙන් කරන්න',
      scheduling: 'වෙන් කරමින්...',
    },
    footer: {
      copyright: '© 2025 Neqo360',
      tagline: 'ඩිජිටල් විසඳුම්',
      services: 'සේවා',
      webApps: 'වෙබ් යෙදුම්',
      mobileApps: 'ජංගම යෙදුම්',
      systemIntegration: 'පද්ධති ඒකාබද්ධ කිරීම',
      contact: 'සම්බන්ධ වන්න',
      rightsReserved: 'සියලු හිමිකම් ඇවිරිණි.',
    },
    common: {
      loading: 'පූරණය වෙමින්...',
      error: 'දෝෂය',
      success: 'සාර්ථකයි',
      close: 'වසන්න',
      cancel: 'අවලංගු කරන්න',
      save: 'සුරකින්න',
      edit: 'සංස්කරණය කරන්න',
      delete: 'මකන්න',
      required: 'අවශ්‍යයි',
    },
    showcase: {
      frameworks: '枠යෙදුම්',
      languages: 'භාෂා',
      hosting: 'මෝඩ්‍යුලය සහ සත්කාරක',
      productionReady: 'தயாரான தயாரிப்பு',
      expertise: '枠යෙදුම් සහ භාෂා 10+ சுயாதீனம்',
      fastReliableScalable: 'விரைவு • நம்பகமானது • அளவிடக்கூடியது',
      supportingAll: 'முக்கிய枠மைப்புகள் மற்றும் மொழிகளை ஆதரிக்கிறது',
    },
    spiderWebPricing: {
      interactiveBuilder: 'இணைய திட்ட உருவாக்கி',
      clickToExplore: 'விருப்பங்களை ஆராய கிளிக் செய்து உங்கள் தீர்வை உருவாக்குங்கள்',
      estimatedTotal: 'மதிப்பிடப்பட்ட மொத்தம்',
      selected: 'தேர்ந்தெடுக்கப்பட்டது',
      available: 'கிடைக்கிறது',
      locked: 'பூட்டப்பட்டது',
      howItWorks: 'இது எப்படி வேலை செய்கிறது:',
      step1: '1. மையத்திலிருந்து தொடங்குங்கள்',
      step2: '2. விருப்பங்களை திறக்க பிரிவுகளை கிளிக் செய்யவும்',
      step3: '3. உங்கள் மேற்கோளுக்கு அம்சங்களைத் தேர்ந்தெடுக்கவும்',
      step4: '4. உங்கள் தேர்வுகளுடன் வலை வளர்வதைப் பாருங்கள்',
      resetSelection: 'தேர்வை மீட்டமை',
      getQuote: 'ரூ. {total}க்கு மேற்கோள் பெறுங்கள்',
      selectedFeatures: 'Selected Features',
      startByClicking: 'Start by clicking the center node',
      resetView: 'Reset View',
      zoom: 'Zoom: {percent}%',
      startHere: 'Start Here',
      webDevelopment: 'Web Development',
      landingPage: 'Landing Page',
      ecommerceStore: 'E-commerce Store',
      adminDashboard: 'Admin Dashboard',
      portfolioSite: 'Portfolio Site',
      mobileDevelopment: 'Mobile Development',
      iosApp: 'iOS App',
      androidApp: 'Android App',
      crossPlatform: 'Cross-Platform',
      uiuxDesign: 'UI/UX Design',
      legend: 'Legend',
      scrollToZoom: '• Scroll to zoom',
      dragToPan: '• Drag to pan',
      hoverForDetails: '• Hover for details',
      clickToSelect: '• Click to select',
      navigation: 'Navigation:',
      scrollWheelToZoom: 'Scroll wheel to zoom in/out',
      clickAndDragToPan: 'Click and drag to pan around',
      hoverNodesForDescriptions: 'Hover nodes for descriptions',
      clickToSelectFeatures: 'Click to select features',
      centerDescription: 'Choose your development path to unlock features',
      webDevelopmentDescription: 'Modern, responsive web applications and websites',
      landingPageDescription: 'Professional single-page website with modern design',
      ecommerceStoreDescription: 'Full-featured online store with payment integration',
      adminDashboardDescription: 'Comprehensive management interface with analytics',
      portfolioSiteDescription: 'Showcase your work with an elegant portfolio',
      mobileDevelopmentDescription: 'Native and cross-platform mobile applications',
      iosAppDescription: 'Native iOS application with App Store optimization',
      androidAppDescription: 'Native Android app with Google Play optimization',
      crossPlatformDescription: 'React Native or Flutter app for both platforms',
      uiuxDesignDescription: 'Professional mobile app design and user experience',
      systemIntegration: 'System Integration',
      systemIntegrationDescription: 'Connect and synchronize your existing systems',
      apiDevelopment: 'API Development',
      apiDevelopmentDescription: 'Custom REST, GraphQL, or webhook integrations',
      paymentGateway: 'Payment Gateway',
      paymentGatewayDescription: 'Secure payment processing with multiple providers',
      crmIntegration: 'CRM Integration',
      crmIntegrationDescription: 'Connect with Salesforce, HubSpot, or custom CRM',
      databaseSetup: 'Database Setup',
      databaseSetupDescription: 'Database design, optimization, and migration',
      devopsCloud: 'DevOps & Cloud',
      devopsCloudDescription: 'Infrastructure, deployment, and monitoring solutions',
      cloudHosting: 'Cloud Hosting',
      cloudHostingDescription: 'AWS, GCP, or Azure deployment and management',
      cicdPipeline: 'CI/CD Pipeline',
      cicdPipelineDescription: 'Automated testing, building, and deployment',
      monitoringAnalytics: 'Monitoring & Analytics',
      monitoringAnalyticsDescription: 'Performance monitoring and error tracking',
      featuresSelected: '{count} features selected',
      deselect: 'Deselect',
      select: 'Select',
    },
    meeting: {
      toast: {
        success: "Meeting request sent successfully! We'll get back to you soon.",
        error: 'Failed to book meeting. Please try again.'
      },
      messages: {
        bookingFailed: 'Failed to book meeting. Please try again.',
        bookingSuccess: "Meeting request sent successfully! We'll get back to you soon.",
        invalidDate: 'Please select a valid date.',
        invalidTime: 'Please select a valid time.'
      }
    },
    api: {
      toast: {
        networkError: 'Network error. Please check your connection and try again.'
      },
      messages: {
        networkError: 'Network error. Please check your connection and try again.',
        serverError: 'Server error. Please try again later.',
        timeout: 'Request timed out. Please try again.',
        unauthorized: 'You are not authorized to perform this action.',
        forbidden: 'Access denied.',
        notFound: 'Resource not found.'
      }
    },
    validation: {
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      invalidName: 'Name can only contain letters and spaces',
      tooShort: 'This field is too short',
      tooLong: 'This field is too long',
      invalidFormat: 'Invalid format',
    },
    form: {
      submissionFailed: 'Failed to submit form. Please try again.',
      validationFailed: 'Please fix the errors above and try again.',
      success: 'Form submitted successfully!',
    },
  },
  ta: {
    navigation: {
      home: 'முகப்பு',
      services: 'சேவைகள்',
      pricing: 'விலை',
      about: 'எங்களைப் பற்றி',
      contact: 'தொடர்பு',
      bookMeeting: 'சந்திப்பு ஏற்பாடு',
    },
    hero: {
      titleMain: 'சரியாக வேலை செய்யும்',
      titleAccent: 'மென்பொருள்',
      subtitle: 'நாங்கள் இலங்கையின் மென்பொருள் மேம்பாட்டு நிறுவனம். தேவையற்ற செயல்முறைகள் இல்லை, சிக்கல்கள் இல்லை. உயர்தர வலை பயன்பாடுகள், மொபைல் தீர்வுகள் மற்றும் அளவிடக்கூடிய ஒருங்கிணைந்த அமைப்புகள் மட்டுமே.',
      startProject: 'உங்கள் திட்டத்தைத் தொடங்குங்கள்',
      viewPricing: 'விலையைக் காண்க',
      stats: {
        projects: 'முடிக்கப்பட்ட திட்டங்கள்',
        satisfaction: 'வாடிக்கையாளர் திருப்தி',
        loadTime: 'பக்கம் ஏற்றும் நேரம்',
      },
      exploreSite: 'Explore site',
      yearFounded: 'Year Founded',
      commitment: 'Commitment',
      availability: 'Availability',
      letsBuild: 'Let\'s build something great together.',
      openForProjects: 'We\'re open for new projects and collaborations.',
      reachOut: 'Reach out and let\'s make your idea a reality!',
      startAProject: 'Start a Project',
    },
    services: {
      title: 'நாங்கள் உருவாக்குவது',
      subtitle: 'செயல்பாட்டு கவனம் மற்றும் முடிவுகளை நோக்கி தொழில்நுட்பம் சாரா தீர்வுகள்',
      webApps: {
        title: 'வலை பயன்பாடுகள்',
        description: 'புதிய தொழில்நுட்பங்களுடன் உருவாக்கப்பட்ட நவீன, பதிலளிக்கும் வலை பயன்பாடுகள். விரைவு, பாதுகாப்பான மற்றும் அளவிடக்கூடியது.'
      },
      mobileApps: {
        title: 'மொபைல் பயன்பாடுகள்',
        description: 'சிறந்த பயனர் அனுபவங்களை வழங்கும் சொந்த மற்றும் குறுக்கு தள மொபைல் தீர்வுகள்.'
      },
      systemIntegration: {
        title: 'அமைப்பு ஒருங்கிணைப்பு',
        description: 'நவீன தீர்வுகள் மற்றும் API களுடன் உள்ளமைப்புகளை எளிதாக ஒருங்கிணைத்தல்.'
      },
      seo: {
        title: 'SEO Optimization',
        description: 'Improve visibility, attract qualified traffic, and build trust through ethical SEO practices.'
      },
      uiux: {
        title: 'UI/UX Design',
        description: 'Design intuitive interfaces and seamless experiences that delight users and maximize conversions.'
      },
      gameDev: {
        title: 'Game Development',
        description: 'From concept to release-deliver high-quality games faster, more flexibly, and cost‑effectively.'
      },
    },
    pricing: {
      title: 'உங்கள் தீர்வை உருவாக்குங்கள்',
      subtitle: 'உங்கள் தேவைகளுக்கு ஏற்ப மாறும் ஊடாடும் விலை. கிளிக் செய்து, ஆராய்ந்து, உங்கள் சரியான தீர்வை உருவாக்குங்கள்.',
      customRequirements: 'வலையில் காட்டப்படாத ஏதாவது தேவையா? உங்கள் தனிப்பட்ட தேவைகளை விவாதிப்போம்.',
      scheduleConsultation: 'இலவச ஆலோசனை ஏற்பாடு',
    },
    about: {
      title: 'ஏன் அழைப்பு செய்ய வேண்டும்?',
      executionFocused: {
        title: 'செயல்பாட்டு கவனம்',
        description: 'நாங்கள் வேகமாக வழங்குகிறோம். முடிவில்லா கூட்டங்கள் அல்லது நிர்வாகம் இல்லை. முடிவுகள் மட்டுமே.',
      },
      techAgnostic: {
        title: 'தொழில்நுட்ப சாரா',
        description: 'வேலைக்கு சரியான கருவி. நாங்கள் உங்கள் தேவைகளுக்கு ஏற்ப மாற்றமடைகிறோம், மற்ற வழியில் அல்ல.',
      },
      builtToScale: {
        title: 'அளவிட வடிவமைக்கப்பட்டது',
        description: 'ஒவ்வொரு தீர்வும் வளர்ச்சியை மனதில் வைத்து வடிவமைக்கப்பட்டுள்ளது. சிறியதாகத் தொடங்கி, பெரியதாக அளவிடுங்கள்.',
      },
      humanTouch: {
        title: 'மனித தொடர்பு',
        description: 'நாங்கள் உண்மையான தொடர்புகளை நம்புகிறோம். பூனைகளைப் போல, நாங்கள் சுதந்திரமானவர்கள் ஆனால் விசுவாசமானவர்கள்.',
      },
      lightningFast: 'மின்னல் வேகம்',
      subSecondLoad: 'வினாடிக்கு குறைவான ஏற்றும் நேரம்',
      uptime: 'இயக்க நேரம்',
      support: 'ஆதரவு',
      intro: '{name} இற்கு வரவேற்கிறோம்! நவீன, அளவிடக்கூடிய மற்றும் மகிழ்ச்சிகரமான வலை அனுபவங்களை உருவாக்கும் ஆர்வமுள்ள புதிய டிஜிட்டல் ஸ்டுடியோ. ஆரம்ப வாடிக்கையாளர்களுடன் பணியாற்றும் சிறிய, ஆர்வமுள்ள குழுவாக நாங்கள் வளர்ந்து வருகிறோம்.',
      mission: 'எங்கள் பணி: <span class="italic">உங்களை ஆன்லைனில் தொடங்க, வளர, வெற்றி பெற உதவுவது</span>.',
    },
    contact: {
      title: 'கட்டுவதற்கு தயாரா?',
      subtitle: 'உங்கள் திட்டத்தை விவாதிப்போம். நீண்ட படிவங்கள் இல்லை, விற்பனை பேச்சுகள் இல்லை. ஒரு உரையாடல் மட்டுமே.',
      form: {
        name: 'பெயர் *',
        email: 'மின்னஞ்சல் *',
        phone: 'தொலைபேசி',
        projectType: 'திட்ட வகை *',
        message: 'உங்கள் திட்டத்தைப் பற்றி எங்களிடம் கூறுங்கள் *',
        sendMessage: 'செய்தியை அனுப்பு',
        sending: 'அனுப்புகிறது...',
        nameRequired: 'பெயர் குறைந்தது 2 எழுத்துகள் இருக்க வேண்டும்',
        emailRequired: 'சரியான மின்னஞ்சலை உள்ளிடவும்',
        phoneRequired: 'சரியான யோசிக்கும் தொலைபேசி அடையாளம் இருக்க வேண்டும்',
        projectTypeRequired: 'திட்ட வகையைத் தேர்ந்தெடுக்கவும்',
        messageRequired: 'செய்தி குறைந்தது 10 எழுத்துகள் இருக்க வேண்டும்',
        success: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நாங்கள் விரைவில் உங்களுக்கு பதிலளிப்போம்.',
        error: 'செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளவும்.',
        namePlaceholder: 'உங்கள் முழு பெயர்',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '+94 xxx xxx xxx',
        messagePlaceholder: 'நீங்கள் என்ன விவாதிக்க விரும்புகிறீர்கள்?',
        submit: 'செய்தியை அனுப்பு',
        submitting: 'அனுப்புகிறது...',
        projectTypePlaceholder: 'உங்கள் திட்ட வகையைத் தேர்ந்தெடுக்கவும்',
      },
      projectTypes: {
        webApp: '🌐 வலை பயன்பாடு',
        mobileApp: '📱 மொபைல் பயன்பாடு',
        systemIntegration: '🔗 அமைப்பு ஒருங்கிணைப்பு',
        ecommerce: '🛒 மின் வணிக கடை',
        notSure: '🤔 இன்னும் உறுதியாக இல்லை',
        selectType: '🚀 உங்கள் திட்ட வகையைத் தேர்ந்தெடுக்கவும்',
      },
      scheduleCall: {
        title: 'பேச விரும்புகிறீர்களா?',
        subtitle: 'உங்கள் திட்டத்தை விரிவாக விவாதிக்க இலவச 30 நிமிட ஆலோசனையை ஏற்பாடு செய்யுங்கள்.',
        button: 'இலவச அழைப்பு ஏற்பாடு',
      },
      contactInfo: {
        title: 'தொடர்பு கொள்ளுங்கள்',
        email: 'neqo360@gmail.com',
        location: 'கொழும்பு, இலங்கை',
        responseTime: 'பொதுவாக 2 மணி நேரத்திற்குள் பதிலளிக்கிறோம்',
      },
      getInTouch: 'தொடர்பு கொள்ளுங்கள்',
      description: 'எந்த கேள்விகளுக்கும் அல்லது திட்ட விவாதங்களுக்கும் எங்களை அணுகவும்.',
      scheduleMeeting: 'சந்திப்பை முன்பதிவு செய்யவும்',
    },
    calendar: {
      title: 'சந்திப்பை முன்பதிவு செய்யவும்',
      chooseDate: 'தேதியைத் தேர்ந்தெடுக்கவும்',
      availableTimes: 'கிடைக்கும் நேரங்கள்',
      yourDetails: 'உங்கள் விவரங்கள்',
      name: 'பெயர் *',
      email: 'மின்னஞ்சல் *',
      phone: 'தொலைபேசி',
      message: 'செய்தி',
      meetingSummary: 'சந்திப்பு சுருக்கம்',
      duration: 'நேரம்: 30 நிமிடங்கள்',
      bookMeeting: 'சந்திப்பை முன்பதிவு செய்யவும்',
      booking: 'முன்பதிவு செய்கிறது...',
      fillRequiredFields: 'அனைத்து தேவையான புலங்களையும் நிரப்பவும்',
      placeholder: {
        name: 'உங்கள் முழு பெயர்',
        email: 'your@email.com',
        phone: '+94 xxx xxx xxx',
        message: 'நீங்கள் என்ன விவாதிக்க விரும்புகிறீர்கள்?',
      },
      selectDate: 'தேதியைத் தேர்ந்தெடுக்கவும்',
      selectTime: 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
      schedule: 'முன்பதிவு செய்யவும்',
      scheduling: 'முன்பதிவு செய்கிறது...',
    },
    footer: {
      copyright: '© 2025 Neqo360',
      tagline: 'டிஜிட்டல் தீர்வுகள்',
      services: 'சேவைகள்',
      webApps: 'வலை பயன்பாடுகள்',
      mobileApps: 'மொபைல் பயன்பாடுகள்',
      systemIntegration: 'அமைப்பு ஒருங்கிணைப்பு',
      contact: 'தொடர்பு',
      rightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    },
    common: {
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',
      close: 'மூடு',
      cancel: 'ரத்து செய்',
      save: 'சேமி',
      edit: 'திருத்து',
      delete: 'அழி',
      required: 'தேவை',
    },
    showcase: {
      frameworks: '枠மைப்புகள்',
      languages: 'மொழிகள்',
      hosting: 'மேகம் & ஹோஸ்டிங்',
      productionReady: 'தயாராக உள்ளது',
      expertise: '10+枠மைப்புகள் மற்றும் மொழிகளில் அனுபவம்',
      fastReliableScalable: 'விரைவு • நம்பகமானது • அளவிடக்கூடியது',
      supportingAll: 'முக்கிய枠மைப்புகள் மற்றும் மொழிகளுக்கு ஆதரவு',
    },
    spiderWebPricing: {
      interactiveBuilder: 'ஊடாடும் திட்ட உருவாக்கி',
      clickToExplore: 'விருப்பங்களை தேர்வு செய்து உங்கள் தீர்வை உருவாக்குங்கள்',
      estimatedTotal: 'மதிப்பிடப்பட்ட மொத்தம்',
      selected: 'தேர்ந்தெடுக்கப்பட்டது',
      available: 'கிடைக்கிறது',
      locked: 'பூட்டப்பட்டுள்ளது',
      howItWorks: 'இது எப்படி செயல்படுகிறது:',
      step1: '1. மையத்திலிருந்து தொடங்குங்கள்',
      step2: '2. விருப்பங்களை திறக்க பிரிவுகளை கிளிக் செய்யவும்',
      step3: '3. உங்கள் மேற்கோளுக்கு அம்சங்களைத் தேர்ந்தெடுக்கவும்',
      step4: '4. உங்கள் தேர்வுகளுடன் வலை வளர்வதைப் பாருங்கள்',
      resetSelection: 'தேர்வை மீட்டமை',
      getQuote: 'ரூ. {total}க்கு மேற்கோள் பெறுங்கள்',
      selectedFeatures: 'தேர்ந்தெடுத்த அம்சங்கள்',
      startByClicking: 'மையத்தை கிளிக் செய்து தொடங்குங்கள்',
      resetView: 'காட்சியை மீட்டமை',
      zoom: 'பெரிதாக்கு: {percent}%',
      startHere: 'இங்கே தொடங்குங்கள்',
      webDevelopment: 'வலை மேம்பாடு',
      landingPage: 'துவக்க பக்கம்',
      ecommerceStore: 'மின் வணிகக் கடை',
      adminDashboard: 'நிர்வாகக் கட்டுப்பாடு',
      portfolioSite: 'போர்ட்ஃபோலியோ தளம்',
      mobileDevelopment: 'மொபைல் மேம்பாடு',
      iosApp: 'iOS பயன்பாடு',
      androidApp: 'Android பயன்பாடு',
      crossPlatform: 'குறுக்கு தளம்',
      uiuxDesign: 'UI/UX வடிவமைப்பு',
      legend: 'விளக்கம்',
      scrollToZoom: '• பெரிதாக்க ஸ்க்ரோல் செய்யவும்',
      dragToPan: '• நகர்த்த இழுக்கவும்',
      hoverForDetails: '• விவரங்களுக்கு ஹோவர் செய்யவும்',
      clickToSelect: '• தேர்வு செய்ய கிளிக் செய்யவும்',
      navigation: 'வழிசெலுத்தல்:',
      scrollWheelToZoom: 'பெரிதாக்க ஸ்க்ரோல் செய்யவும்',
      clickAndDragToPan: 'நகர்த்த கிளிக் செய்து இழுக்கவும்',
      hoverNodesForDescriptions: 'விவரங்களுக்கு ஹோவர் செய்யவும்',
      clickToSelectFeatures: 'அம்சங்களை தேர்வு செய்ய கிளிக் செய்யவும்',
      centerDescription: 'விருப்பங்களைத் திறக்க உங்கள் மேம்பாட்டு பாதையைத் தேர்ந்தெடுக்கவும்',
      webDevelopmentDescription: 'நவீன, பதிலளிக்கும் வலை பயன்பாடுகள் மற்றும் தளங்கள்',
      landingPageDescription: 'நவீன வடிவமைப்புடன் தொழில்முறை ஒரே பக்கம் தளம்',
      ecommerceStoreDescription: 'முழுமையான அம்சங்களுடன் ஆன்லைன் கடை மற்றும் கட்டண ஒருங்கிணைப்பு',
      adminDashboardDescription: 'பரிபூரண மேலாண்மை இடைமுகம் மற்றும் பகுப்பாய்வு',
      portfolioSiteDescription: 'அழகான போர்ட்ஃபோலியோவில் உங்கள் படைப்புகளை வெளிப்படுத்துங்கள்',
      mobileDevelopmentDescription: 'சொந்த மற்றும் குறுக்கு தள மொபைல் பயன்பாடுகள்',
      iosAppDescription: 'App Store மேம்படுத்தப்பட்ட சொந்த iOS பயன்பாடு',
      androidAppDescription: 'Google Play மேம்படுத்தப்பட்ட சொந்த Android பயன்பாடு',
      crossPlatformDescription: 'இரு தளங்களுக்கும் React Native அல்லது Flutter பயன்பாடு',
      uiuxDesignDescription: 'தொழில்முறை மொபைல் பயன்பாட்டு வடிவமைப்பு மற்றும் அனுபவம்',
      systemIntegration: 'அமைப்பு ஒருங்கிணைப்பு',
      systemIntegrationDescription: 'உங்கள் தற்போதைய அமைப்புகளை இணைத்து ஒத்திசைக்கவும்',
      apiDevelopment: 'API மேம்பாடு',
      apiDevelopmentDescription: 'தனிப்பயன் REST, GraphQL அல்லது webhook ஒருங்கிணைப்பு',
      paymentGateway: 'கட்டண வாயில்',
      paymentGatewayDescription: 'பல வழங்குநர்களுடன் பாதுகாப்பான கட்டண செயலாக்கம்',
      crmIntegration: 'CRM ஒருங்கிணைப்பு',
      crmIntegrationDescription: 'Salesforce, HubSpot அல்லது தனிப்பயன் CRM உடன் இணைக்கவும்',
      databaseSetup: 'தரவுத்தள அமைப்பு',
      databaseSetupDescription: 'தரவுத்தள வடிவமைப்பு, மேம்பாடு மற்றும் இடமாற்றம்',
      devopsCloud: 'DevOps & மேகம்',
      devopsCloudDescription: 'அடித்தளம், வெளியீடு மற்றும் கண்காணிப்பு தீர்வுகள்',
      cloudHosting: 'மேகம் ஹோஸ்டிங்',
      cloudHostingDescription: 'AWS, GCP அல்லது Azure வெளியீடு மற்றும் மேலாண்மை',
      cicdPipeline: 'CI/CD குழாய்',
      cicdPipelineDescription: 'தானியங்கி சோதனை, கட்டமைப்பு மற்றும் வெளியீடு',
      monitoringAnalytics: 'கண்காணிப்பு மற்றும் பகுப்பாய்வு',
      monitoringAnalyticsDescription: 'செயல்திறன் கண்காணிப்பு மற்றும் பிழை கண்காணிப்பு',
      featuresSelected: '{count} அம்சங்கள் தேர்ந்தெடுக்கப்பட்டுள்ளன',
      deselect: 'தேர்வு நீக்கு',
      select: 'தேர்வு செய்',
    },
    meeting: {
      toast: {
        success: "சந்திப்பு கோரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் தொடர்பு கொள்கிறோம்.",
        error: 'சந்திப்பை முன்பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      },
      messages: {
        bookingFailed: 'சந்திப்பை முன்பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
        bookingSuccess: "சந்திப்பு கோரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் தொடர்பு கொள்கிறோம்.",
        invalidDate: 'சரியான தேதியைத் தேர்ந்தெடுக்கவும்.',
        invalidTime: 'சரியான நேரத்தைத் தேர்ந்தெடுக்கவும்.',
      },
    },
    api: {
      toast: {
        networkError: 'பிணைய பிழை. உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
      },
      messages: {
        networkError: 'பிணைய பிழை. உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
        serverError: 'சேவையக பிழை. பிறகு முயற்சிக்கவும்.',
        timeout: 'வேண்டுகோள் காலாவதியானது. மீண்டும் முயற்சிக்கவும்.',
        unauthorized: 'இந்த செயலை செய்ய உங்களுக்கு அனுமதி இல்லை.',
        forbidden: 'அணுகல் மறுக்கப்பட்டது.',
        notFound: 'வளத்தை காணவில்லை.',
      },
    },
    validation: {
      requiredField: 'இந்த புலம் அவசியம்',
      invalidEmail: 'சரியான மின்னஞ்சலை உள்ளிடவும்',
      invalidPhone: 'சரியான தொலைபேசி எண்ணை உள்ளிடவும்',
      invalidName: 'பெயரில் எழுத்துகள் மற்றும் இடைவெளிகள் மட்டுமே இருக்க வேண்டும்',
      tooShort: 'இந்த புலம் மிகவும் குறுகியது',
      tooLong: 'இந்த புலம் மிகவும் நீளமாக உள்ளது',
      invalidFormat: 'தவறான வடிவம்',
    },
    form: {
      submissionFailed: 'படிவத்தை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      validationFailed: 'மேலுள்ள பிழைகளை சரிசெய்து மீண்டும் முயற்சிக்கவும்.',
      success: 'படிவம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
    },
  },
}; 