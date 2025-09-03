interface FooterLink {
  label: string;
  href: string;
}

interface FooterCompany {
  name: string;
  tagline: string;
  parent: string;
  description?: string;
  address: string;
  zip: string;
  city: string;
  email: string;
  phone: string;
}

interface FooterServices {
  title: string;
  items: FooterLink[];
}

interface FooterResources {
  title: string;
  items: FooterLink[];
}

interface FooterContact {
  title: string;
  email: string;
  phone: string;
  address: string[];
}

export interface FooterType {
  company: FooterCompany;
  services: FooterServices;
  resources: FooterResources;
  contact: FooterContact;
  legal: FooterLink[];
  copyright: string;
  partOf?: {
    main: string;
  } | string;
  links?: Array<{
    text: string;
    href: string;
  }>;
  socialLinks?: Array<{
    text: string;
    href: string;
  }>;
}

export interface Dictionary {
  lang: string;
  title: string;
  metadata: {
    title: string;
    description: string;
    keywords?: string;
  };
  header: {
    nav: {
      home: string;
      services: string;
      about: string;
      contact: string;
      results: string;
      pricing: string;
    };
    contact: {
      email: string;
      phone: string;
    };
  };
  website: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    problem: {
      title: string;
      subtitle: string;
      before: {
        title: string;
        items: string[];
      };
      after: {
        title: string;
        items: string[];
      };
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    services: {
      title: string;
      description: string;
      items: {
        title: string;
        description: string;
      }[];
      cta: {
        title: string;
        description: string;
        button: string;
      };
    };
  };
  footer: {
    company: {
      name: string;
      tagline: string;
      parent: string;
      description?: string;
      address: string;
      zip: string;
      city: string;
      email: string;
      phone: string;
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      address: string[];
    };
    services: {
      title: string;
      items: {
        label: string;
        href: string;
      }[];
    };
    resources: {
      title: string;
      items: {
        label: string;
        href: string;
      }[];
    };
    legal: {
      copyright: string;
      privacy: string;
      cookies: string;
      terms: string;
    };
  };
  onedev: {
    partOf: string;
    companyName: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    form: {
      name: string;
      company: string;
      phone: string;
      email: string;
      subject: string;
      message: string;
      options: {
        website: string;
        marketing: string;
        consulting: string;
        other: string;
      };
      submit: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  contactForm: {
    step1: {
      title: string;
      email: string;
      emailPlaceholder: string;
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      startBoost: string;
      or: string;
      submitNow: string;
    };
    step2: {
      company: string;
      companyPlaceholder: string;
      investmentLevel: string;
      message: string;
      messagePlaceholder: string;
      back: string;
      sendMessage: string;
      packageInterest?: string;
      customSolutionInterest?: string;
    };
    marketing: {
      title: string;
      subtitle: string;
      monthlyBudget: string;
      packages: {
        basic: {
          label: string;
          desc: string;
          description: string;
        };
        growth: {
          label: string;
          desc: string;
          description: string;
        };
        premium: {
          label: string;
          desc: string;
          description: string;
        };
      };
      noThanks: string;
    };
    investment: {
      foundation: string;
      growth: string;
      transformation: string;
    };
    success: {
      title: string;
      subtitle: string;
      resourcesTitle: string;
      articles: {
        seo: {
          title: string;
          description: string;
          readArticle: string;
        };
        leads: {
          title: string;
          description: string;
          readArticle: string;
          category?: string;
        };
        cases: {
          title: string;
          description: string;
          viewCases: string;
          category?: string;
        };
      };
      navigation: {
        backToHome: string;
        exploreArticles: string;
      };
    };
  };
  hero: {
    title: string;
    description: {
      main: string;
      sub: string;
    };
    subtitle: string;
    cta: string;
    needsBoost: string;
    trustedBy: string;
    readMore: string;
    stats: {
      roi: {
        number: string;
        label: string;
      };
      support: {
        number: string;
        label: string;
      };
      satisfaction: {
        number: string;
        label: string;
      };
    };
  };
  websiteShowcase: {
    title: string;
    subtitle: string;
    akupunktur: {
      title: string;
      description: string;
    };
    malerfirma: {
      title: string;
      description: string;
    };
    vaskehjelp: {
      title: string;
      description: string;
    };
    visitWebsite: string;
    technicalStack: string;
    pressEscToClose: string;
  };
  enhancedWebsiteShowcase?: {
    title: string;
    subtitle: string;
    metrics: {
      roi: {
        value: string;
        label: string;
        description: string;
      };
      conversion: {
        value: string;
        label: string;
        description: string;
      };
      loadTime: {
        value: string;
        label: string;
        description: string;
      };
      leads: {
        value: string;
        label: string;
        description: string;
      };
    };
    websites: {
      vaskefirma: {
        title: string;
        description: string;
        businessChallenge: string;
        solution: string;
        businessImpact: string;
        clientQuote: string;
        clientName: string;
        clientRole: string;
      };
      malerfirma: {
        title: string;
        description: string;
        businessChallenge: string;
        solution: string;
        businessImpact: string;
        clientQuote: string;
        clientName: string;
        clientRole: string;
      };
      akupunktur: {
        title: string;
        description: string;
        businessChallenge: string;
        solution: string;
        businessImpact: string;
        clientQuote: string;
        clientName: string;
        clientRole: string;
      };
    };
    labels: {
      conversion: string;
      loadTime: string;
      leads: string;
      seeDetails: string;
      projectDetails: string;
      challenge: string;
      solution: string;
      businessResults: string;
      investmentLevel: string;
      package: string;
      visitWebsite: string;
      similarResults: string;
      pressEscToClose: string;
      discussProject: string;
      moreLeads: string;
    };
  };
  getStarted: {
    title: string;
    subtitle: string;
    video: {
      title: string;
      url?: string;
    };
    stats: {
      calls: {
        number: string;
        label: string;
      };
      conversion: {
        number: string;
        label: string;
      };
      satisfaction: {
        number: string;
        label: string;
      };
    };
    benefits: {
      title: string;
      items: string[];
    };
  };
  websiteBuilder?: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    socialProof: {
      satisfiedCustomers: string;
      customerSatisfaction: string;
      customers: string;
    };
    features: {
      aiContent: {
        title: string;
        description: string;
      };
      leadCapture: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
    pricing: {
      title: string;
      subtitle: string;
      plans: {
        starter: {
          title: string;
          price: string;
          description: string;
        };
        professional: {
          title: string;
          price: string;
          description: string;
        };
        enterprise: {
          title: string;
          price: string;
          description: string;
        };
      };
    };
    cta: {
      title: string;
      subtitle: string;
    };
    industries: {
      title: string;
      list: Array<{
        emoji: string;
        name: string;
      }>;
    };
    successStories: {
      title: string;
      stories: Array<{
        name: string;
        location: string;
        quote: string;
        result: string;
      }>;
    };
    faq: {
      title: string;
      questions: Array<{
        q: string;
        a: string;
      }>;
    };
  };
  [key: string]: any;  // Tillat alle andre felt
} 