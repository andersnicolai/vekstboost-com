import { UserData } from '../types/forms';

// Event typer
export type FacebookEventType = 'ViewContent' | 'Lead' | 'Contact' | 'Schedule';

interface EventData {
  event_name: FacebookEventType;
  event_time: number;
  event_source_url: string;
  action_source: 'website';
  user_data: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    client_user_agent: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    inquiry_type?: string;
    company?: string;
    content_category?: string;
    content_name?: string;
    content_type?: string;
  };
}

// Helper function to get cookie value
const getCookieValue = (name: string): string | undefined => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(`${name}=([^;]*)`);
    return match ? match[1] : undefined;
  }
  return undefined;
};

// Send event til server
const sendServerEvent = async (eventData: EventData) => {
  try {
    const response = await fetch('/api/facebook-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending server event:', error);
    return null;
  }
};

// ViewContent event
export const trackViewContent = async (
  contentName: string,
  contentCategory: string,
  contentType: string = 'product'
) => {
  // Browser event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      content_type: contentType
    });
  }

  // Server event
  await sendServerEvent({
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    action_source: 'website',
    user_data: {
      client_user_agent: window.navigator.userAgent,
      fbp: getCookieValue('_fbp'),
      fbc: getCookieValue('_fbc')
    },
    custom_data: {
      content_name: contentName,
      content_category: contentCategory,
      content_type: contentType
    }
  });
};

// Lead event
export const trackLeadEvent = async (userData: UserData) => {
  // Browser event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      currency: 'NOK',
      value: 5000,
      inquiry_type: userData.inquiryType,
      company: userData.company
    });
  }

  // Server event
  await sendServerEvent({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    action_source: 'website',
    user_data: {
      email: userData.email,
      phone: userData.phone,
      first_name: userData.firstName,
      last_name: userData.lastName,
      client_user_agent: window.navigator.userAgent,
      fbp: getCookieValue('_fbp'),
      fbc: getCookieValue('_fbc')
    },
    custom_data: {
      currency: 'NOK',
      value: 5000,
      inquiry_type: userData.inquiryType,
      company: userData.company
    }
  });
};

// Contact event
export const trackContactEvent = async (userData?: Partial<UserData>) => {
  // Browser event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact');
  }

  // Server event
  await sendServerEvent({
    event_name: 'Contact',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    action_source: 'website',
    user_data: {
      ...(userData?.email && { email: userData.email }),
      ...(userData?.phone && { phone: userData.phone }),
      ...(userData?.firstName && { first_name: userData.firstName }),
      ...(userData?.lastName && { last_name: userData.lastName }),
      client_user_agent: window.navigator.userAgent,
      fbp: getCookieValue('_fbp'),
      fbc: getCookieValue('_fbc')
    },
    custom_data: userData ? {
      inquiry_type: userData.inquiryType,
      company: userData.company
    } : undefined
  });
};

// Schedule event
export const trackScheduleEvent = async (userData: UserData) => {
  // Browser event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Schedule', {
      currency: 'NOK',
      value: 2500,
      inquiry_type: userData.inquiryType,
      company: userData.company
    });
  }

  // Server event
  await sendServerEvent({
    event_name: 'Schedule',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    action_source: 'website',
    user_data: {
      email: userData.email,
      phone: userData.phone,
      first_name: userData.firstName,
      last_name: userData.lastName,
      client_user_agent: window.navigator.userAgent,
      fbp: getCookieValue('_fbp'),
      fbc: getCookieValue('_fbc')
    },
    custom_data: {
      currency: 'NOK',
      value: 2500,
      inquiry_type: userData.inquiryType,
      company: userData.company
    }
  });
}; 