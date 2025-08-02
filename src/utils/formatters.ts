// 🇲🇽 Formatters para México - Grupo Naser

// ============================================================================
// CURRENCY FORMATTING (Pesos Mexicanos)
// ============================================================================

export const formatCurrency = (amount: number | string, options?: {
  showCents?: boolean;
  prefix?: string;
}): string => {
  const { showCents = true, prefix = '$' } = options || {};
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return `${prefix}0`;
  }

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });

  return formatter.format(numericAmount);
};

// Formato simple para precios (sin símbolo de moneda)
export const formatPrice = (amount: number | string, showCents = false): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return '0';
  }

  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(numericAmount);
};

// ============================================================================
// DATE FORMATTING (Español México)
// ============================================================================

export const formatDate = (date: string | Date, format: 'short' | 'long' | 'full' | 'relative' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (format === 'relative') {
    if (diffInMinutes < 1) {
      return 'Hace un momento';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `Hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `Hace ${months} mes${months !== 1 ? 'es' : ''}`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `Hace ${years} año${years !== 1 ? 's' : ''}`;
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Mexico_City',
  };

  switch (format) {
    case 'short':
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
      break;
    case 'long':
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
      break;
    case 'full':
      options.weekday = 'long';
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
      break;
  }

  return new Intl.DateTimeFormat('es-MX', options).format(dateObj);
};

// Formato de hora
export const formatTime = (date: string | Date, includeSeconds = false): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Hora inválida';
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Mexico_City',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  if (includeSeconds) {
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat('es-MX', options).format(dateObj);
};

// Formato completo fecha y hora
export const formatDateTime = (date: string | Date): string => {
  return `${formatDate(date, 'long')} a las ${formatTime(date)}`;
};

// ============================================================================
// PHONE FORMATTING (México)
// ============================================================================

export const formatPhone = (phone: string): string => {
  // Remover todos los caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Manejar números de México
  if (cleaned.length === 10) {
    // Formato: 55 5688 7866
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('52')) {
    // Formato internacional: +52 55 5688 7866
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    // Formato: 1 55 5688 7866
    return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  
  // Si no coincide con formatos conocidos, devolver tal como está
  return phone;
};

// ============================================================================
// TEXT FORMATTING
// ============================================================================

export const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - suffix.length) + suffix;
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  if (!text) return text;
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

// Formatear nombres propios mexicanos
export const formatName = (name: string): string => {
  const words = name.toLowerCase().split(' ');
  const prepositions = ['de', 'del', 'la', 'las', 'los', 'y', 'e'];
  
  return words
    .map(word => {
      if (prepositions.includes(word)) {
        return word;
      }
      return capitalizeFirst(word);
    })
    .join(' ');
};

// ============================================================================
// FILE SIZE FORMATTING
// ============================================================================

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

export const formatNumber = (number: number | string, decimals = 0): string => {
  const numericValue = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(numericValue)) {
    return '0';
  }

  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numericValue);
};

// Formato para porcentajes
export const formatPercentage = (value: number, decimals = 1): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

// ============================================================================
// SLUG/URL FORMATTING
// ============================================================================

export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .trim();
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidMexicanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('52'));
};

export const isValidMexicanPostalCode = (postalCode: string): boolean => {
  const cleaned = postalCode.replace(/\D/g, '');
  return cleaned.length === 5;
};