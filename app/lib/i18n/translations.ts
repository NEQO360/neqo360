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
    title: string;
    subtitle: string;
    startProject: string;
    viewPricing: string;
    stats: {
      projects: string;
      satisfaction: string;
      loadTime: string;
    };
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
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      projectType: string;
      message: string;
      sendMessage: string;
      sending: string;
      nameRequired: string;
      emailRequired: string;
      projectTypeRequired: string;
      messageRequired: string;
      success: string;
      error: string;
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
  };
  footer: {
    copyright: string;
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
      title: 'Software that just works',
      subtitle: "We're a lean Sri Lankan software development agency. No bloated processes, no complexity. Just high-quality web apps, mobile solutions, and integrated systems that scale.",
      startProject: 'Start Your Project',
      viewPricing: 'View Pricing',
      stats: {
        projects: 'Projects Delivered',
        satisfaction: 'Client Satisfaction',
        loadTime: 'Page Load Time',
      },
    },
    services: {
      title: 'What we build',
      subtitle: 'Tech-stack agnostic solutions focused on execution and results',
      webApps: {
        title: 'Web Applications',
        description: 'Modern, responsive web apps built with the latest technologies. Fast, secure, and scalable.',
      },
      mobileApps: {
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile solutions that deliver exceptional user experiences.',
      },
      systemIntegration: {
        title: 'System Integration',
        description: 'Seamless integration of existing systems with modern solutions and APIs.',
      },
    },
    pricing: {
      title: 'Build your solution',
      subtitle: 'Interactive pricing that adapts to your needs. Click, explore, and build your perfect solution.',
      customRequirements: 'Need something not shown in the web? Let\'s discuss your custom requirements.',
      scheduleConsultation: 'Schedule a Free Consultation',
    },
    about: {
      title: 'Why choose Neqo360?',
      executionFocused: {
        title: 'Execution Focused',
        description: 'We ship fast. No endless meetings or bureaucracy. Just results.',
      },
      techAgnostic: {
        title: 'Tech Agnostic',
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
    },
    contact: {
      title: 'Ready to build?',
      subtitle: 'Let\'s discuss your project. No lengthy forms, no sales pitches. Just a conversation.',
      form: {
        name: 'Name *',
        email: 'Email *',
        projectType: 'Project Type *',
        message: 'Tell us about your project *',
        sendMessage: 'Send Message',
        sending: 'Sending...',
        nameRequired: 'Name must be at least 2 characters',
        emailRequired: 'Please enter a valid email',
        projectTypeRequired: 'Please select a project type',
        messageRequired: 'Message must be at least 10 characters',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        error: 'Failed to send message. Please try again or contact us directly.',
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
        email: 'hello@neqo360.com',
        location: 'Colombo, Sri Lanka',
        responseTime: 'Usually respond within 2 hours',
      },
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
    },
    footer: {
      copyright: '© 2025 Neqo360',
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
      title: 'හොඳින් ක්‍රියාත්මක වන මෘදුකාංග',
      subtitle: 'අපි ශ්‍රී ලංකාවේ සුළු මෘදුකාංග සංවර්ධන ආයතනයක්. අනවශ්‍ය ක්‍රියාවලි නැත, සංකීර්ණතා නැත. ගුණාත්මක වෙබ් යෙදුම්, ජංගම විසඳුම් සහ පරිමාණය කළ හැකි ඒකාබද්ධ පද්ධති පමණි.',
      startProject: 'ඔබේ ව්‍යාපෘතිය ආරම්භ කරන්න',
      viewPricing: 'මිල බලන්න',
      stats: {
        projects: 'සම්පූර්ණ ව්‍යාපෘති',
        satisfaction: 'පාරිභෝගික සතුට',
        loadTime: 'පිටු පූරණ කාලය',
      },
    },
    services: {
      title: 'අපි ගොඩනඟන දේ',
      subtitle: 'ක්‍රියාත්මක වීම සහ ප්‍රතිඵල මත අවධානය යොමු කරන තාක්ෂණික-උදාසීන විසඳුම්',
      webApps: {
        title: 'වෙබ් යෙදුම්',
        description: 'නවතම තාක්ෂණයන් සමඟ ගොඩනගන ලද නවීන, ප්‍රතිචාරාත්මක වෙබ් යෙදුම්. වේගවත්, ආරක්ෂිත සහ පරිමාණය කළ හැකිය.',
      },
      mobileApps: {
        title: 'ජංගම යෙදුම්',
        description: 'විශිෂ්ට පරිශීලක අත්දැකීම් ලබා දෙන ස්වදේශීය සහ cross-platform ජංගම විසඳුම්.',
      },
      systemIntegration: {
        title: 'පද්ධති ඒකාබද්ධ කිරීම',
        description: 'වර්තමාන පද්ධති නවීන විසඳුම් සහ API සමඟ අඛණ්ඩව ඒකාබද්ධ කිරීම.',
      },
    },
    pricing: {
      title: 'ඔබේ විසඳුම ගොඩනඟන්න',
      subtitle: 'ඔබේ අවශ්‍යතාවයන්ට ගැලපෙන අන්තර්ක්‍රියාකාරී මිල. ක්ලික් කර, ගවේෂණය කර, ඔබේ පරිපූර්ණ විසඳුම ගොඩනඟන්න.',
      customRequirements: 'වෙබ් එකේ නොපෙන්වන දෙයක් අවශ්‍යද? ඔබේ අභිරුචි අවශ්‍යතා සාකච්ඡා කරමු.',
      scheduleConsultation: 'නොමිලේ සාකච්ඡාවක් වෙන් කරන්න',
    },
    about: {
      title: 'ඇයි Neqo360 තෝරන්නේ?',
      executionFocused: {
        title: 'ක්‍රියාත්මක වීම මත අවධානය',
        description: 'අපි වේගයෙන් යවමු. අනවශ්‍ය රැස්වීම් හෝ නිලධාරිවාදය නැත. ප්‍රතිඵල පමණි.',
      },
      techAgnostic: {
        title: 'තාක්ෂණික උදාසීන',
        description: 'කාර්යය සඳහා නිවැරදි මෙවලම. අපි ඔබේ අවශ්‍යතාවයන්ට ගැලපෙමු, අනෙක් ආකාරයට නොවේ.',
      },
      builtToScale: {
        title: 'පරිමාණය කිරීමට ගොඩනගන ලද',
        description: 'සෑම විසඳුමක්ම වර්ධනය සිතා ගනිමින් සැලසුම් කර ඇත. කුඩාවට ආරම්භ කර, විශාලව පරිමාණය කරන්න.',
      },
      humanTouch: {
        title: 'මානව ස්පර්ශය',
        description: 'අපි සැබෑ සම්බන්ධතා විශ්වාස කරමු. බළලුන් මෙන්, අපි ස්වාධීන නමුත් විශ්වසනීය.',
      },
      lightningFast: 'විදුලි වේගයෙන්',
      subSecondLoad: 'තත්පරයකට අඩු පූරණ කාල',
      uptime: 'ක්‍රියාත්මක කාලය',
      support: 'සහාය',
    },
    contact: {
      title: 'ගොඩනැගීමට සූදානම්ද?',
      subtitle: 'ඔබේ ව්‍යාපෘතිය සාකච්ඡා කරමු. දිගු පෝරම් නැත, විකුණුම් කථා නැත. සාකච්ඡාවක් පමණි.',
      form: {
        name: 'නම *',
        email: 'විද්‍යුත් තැපෑල *',
        projectType: 'ව්‍යාපෘති වර්ගය *',
        message: 'ඔබේ ව්‍යාපෘතිය ගැන අපට කියන්න *',
        sendMessage: 'පණිවිඩය යවන්න',
        sending: 'යවමින්...',
        nameRequired: 'නම අවම වශයෙන් අකුරු 2ක් විය යුතුය',
        emailRequired: 'කරුණාකර වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න',
        projectTypeRequired: 'කරුණාකර ව්‍යාපෘති වර්ගයක් තෝරන්න',
        messageRequired: 'පණිවිඩය අවම වශයෙන් අකුරු 10ක් විය යුතුය',
        success: 'පණිවිඩය සාර්ථකව යවන ලදී! අපි ඉක්මනින් ඔබට පිළිතුරු දෙන්නෙමු.',
        error: 'පණිවිඩය යැවීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න හෝ අපට සෘජුවම සම්බන්ධ වන්න.',
      },
      projectTypes: {
        webApp: '🌐 වෙබ් යෙදුම',
        mobileApp: '📱 ජංගම යෙදුම',
        systemIntegration: '🔗 පද්ධති ඒකාබද්ධ කිරීම',
        ecommerce: '🛒 වෙළඳසැල',
        notSure: '🤔 තවමත් නිශ්චිත නැත',
        selectType: '🚀 ඔබේ ව්‍යාපෘති වර්ගය තෝරන්න',
      },
      scheduleCall: {
        title: 'කතා කිරීමට කැමතිද?',
        subtitle: 'ඔබේ ව්‍යාපෘතිය විස්තරාත්මකව සාකච්ඡා කිරීමට නොමිලේ මිනිත්තු 30ක සාකච්ඡාවක් වෙන් කරන්න.',
        button: 'නොමිලේ ඇමතුමක් වෙන් කරන්න',
      },
      contactInfo: {
        title: 'සම්බන්ධ වන්න',
        email: 'hello@neqo360.com',
        location: 'කොළඹ, ශ්‍රී ලංකාව',
        responseTime: 'සාමාන්‍යයෙන් පැය 2ක් තුළ පිළිතුරු දෙයි',
      },
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
    },
    footer: {
      copyright: '© 2025 Neqo360',
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
      title: 'சரியாக வேலை செய்யும் மென்பொருள்',
      subtitle: 'நாங்கள் இலங்கையின் மென்பொருள் மேம்பாட்டு நிறுவனம். தேவையற்ற செயல்முறைகள் இல்லை, சிக்கல்கள் இல்லை. உயர்தர வலை பயன்பாடுகள், மொபைல் தீர்வுகள் மற்றும் அளவிடக்கூடிய ஒருங்கிணைந்த அமைப்புகள் மட்டுமே.',
      startProject: 'உங்கள் திட்டத்தைத் தொடங்குங்கள்',
      viewPricing: 'விலையைக் காண்க',
      stats: {
        projects: 'முடிக்கப்பட்ட திட்டங்கள்',
        satisfaction: 'வாடிக்கையாளர் திருப்தி',
        loadTime: 'பக்கம் ஏற்றும் நேரம்',
      },
    },
    services: {
      title: 'நாங்கள் உருவாக்குவது',
      subtitle: 'செயல்படுத்தல் மற்றும் முடிவுகளில் கவனம் செலுத்தும் தொழில்நுட்ப-சாரா தீர்வுகள்',
      webApps: {
        title: 'வலை பயன்பாடுகள்',
        description: 'சமீபத்திய தொழில்நுட்பங்களுடன் கட்டப்பட்ட நவீன, பதிலளிக்கும் வலை பயன்பாடுகள். வேகமான, பாதுகாப்பான மற்றும் அளவிடக்கூடிய.',
      },
      mobileApps: {
        title: 'மொபைல் பயன்பாடுகள்',
        description: 'சிறந்த பயனர் அனுபவத்தை வழங்கும் உள்நாட்டு மற்றும் குறுக்கு-மேடை மொபைல் தீர்வுகள்.',
      },
      systemIntegration: {
        title: 'அமைப்பு ஒருங்கிணைப்பு',
        description: 'தற்போதைய அமைப்புகளை நவீன தீர்வுகள் மற்றும் API களுடன் மென்மையாக ஒருங்கிணைத்தல்.',
      },
    },
    pricing: {
      title: 'உங்கள் தீர்வை உருவாக்குங்கள்',
      subtitle: 'உங்கள் தேவைகளுக்கு ஏற்ப மாறும் ஊடாடும் விலை. கிளிக் செய்து, ஆராய்ந்து, உங்கள் சரியான தீர்வை உருவாக்குங்கள்.',
      customRequirements: 'வலையில் காட்டப்படாத ஏதாவது தேவையா? உங்கள் தனிப்பட்ட தேவைகளை விவாதிப்போம்.',
      scheduleConsultation: 'இலவச ஆலோசனை ஏற்பாடு',
    },
    about: {
      title: 'ஏன் Neqo360 தேர்வு செய்ய வேண்டும்?',
      executionFocused: {
        title: 'செயல்படுத்தலில் கவனம்',
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
    },
    contact: {
      title: 'கட்டுவதற்கு தயாரா?',
      subtitle: 'உங்கள் திட்டத்தை விவாதிப்போம். நீண்ட படிவங்கள் இல்லை, விற்பனை பேச்சுகள் இல்லை. ஒரு உரையாடல் மட்டுமே.',
      form: {
        name: 'பெயர் *',
        email: 'மின்னஞ்சல் *',
        projectType: 'திட்ட வகை *',
        message: 'உங்கள் திட்டத்தைப் பற்றி எங்களிடம் கூறுங்கள் *',
        sendMessage: 'செய்தியை அனுப்பு',
        sending: 'அனுப்புகிறது...',
        nameRequired: 'பெயர் குறைந்தது 2 எழுத்துகள் இருக்க வேண்டும்',
        emailRequired: 'சரியான மின்னஞ்சலை உள்ளிடவும்',
        projectTypeRequired: 'திட்ட வகையைத் தேர்ந்தெடுக்கவும்',
        messageRequired: 'செய்தி குறைந்தது 10 எழுத்துகள் இருக்க வேண்டும்',
        success: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நாங்கள் விரைவில் உங்களுக்கு பதிலளிப்போம்.',
        error: 'செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளவும்.',
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
        email: 'hello@neqo360.com',
        location: 'கொழும்பு, இலங்கை',
        responseTime: 'பொதுவாக 2 மணி நேரத்திற்குள் பதிலளிக்கிறோம்',
      },
    },
    calendar: {
      title: 'சந்திப்பு ஏற்பாடு',
      chooseDate: 'தேதியைத் தேர்ந்தெடுக்கவும்',
      availableTimes: 'கிடைக்கக்கூடிய நேரங்கள்',
      yourDetails: 'உங்கள் விவரங்கள்',
      name: 'பெயர் *',
      email: 'மின்னஞ்சல் *',
      phone: 'தொலைபேசி',
      message: 'செய்தி',
      meetingSummary: 'சந்திப்பு சுருக்கம்',
      duration: 'காலம்: 30 நிமிடங்கள்',
      bookMeeting: 'சந்திப்பு ஏற்பாடு',
      booking: 'ஏற்பாடு செய்கிறது...',
      fillRequiredFields: 'தேவையான அனைத்து புலங்களையும் நிரப்பவும்',
      placeholder: {
        name: 'உங்கள் முழு பெயர்',
        email: 'your@email.com',
        phone: '+94 xxx xxx xxx',
        message: 'நீங்கள் என்ன விவாதிக்க விரும்புகிறீர்கள்?',
      },
    },
    footer: {
      copyright: '© 2025 Neqo360',
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
  },
}; 