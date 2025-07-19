// 🌍 Configuración de localización para México
// Locale configuration for Spanish Mexico

export const LOCALE_CONFIG = {
  // Configuración principal
  locale: 'es-MX',
  currency: 'MXN',
  timezone: 'America/Mexico_City',
  
  // Formatos de fecha
  dateFormats: {
    short: 'dd/MM/yyyy',
    medium: 'd MMM yyyy',
    long: 'd MMMM yyyy',
    full: 'EEEE, d MMMM yyyy',
  },
  
  // Formatos de hora
  timeFormats: {
    short: 'HH:mm',
    medium: 'HH:mm:ss',
    long: 'HH:mm:ss z',
    full: 'HH:mm:ss zzzz',
  },
  
  // Configuración de números
  numberFormat: {
    decimal: ',',
    thousands: ' ',
    precision: 2,
  },
  
  // Configuración de moneda
  currencyFormat: {
    symbol: '$',
    symbolPosition: 'before', // 'before' | 'after'
    showSymbol: true,
    showCode: false, // MXN
    precision: 2,
  },
  
  // Configuración telefónica México
  phoneFormat: {
    country: 'MX',
    countryCode: '+52',
    nationalFormat: '## #### ####',
    internationalFormat: '+52 ## #### ####',
  },
  
  // Días de la semana
  weekdays: {
    short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    long: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  },
  
  // Meses
  months: {
    short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    long: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  },
  
  // Configuración RTL/LTR
  direction: 'ltr' as const,
  
  // Configuración de validación específica para México
  validation: {
    postalCodePattern: /^\d{5}$/,
    phonePattern: /^(\+52\s?)?(\d{2}\s?\d{4}\s?\d{4}|\d{10})$/,
    rfc: /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/,
    curp: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/,
  },
  
  // Formatos de dirección mexicana
  addressFormat: {
    order: ['street', 'number', 'colony', 'city', 'state', 'postalCode'],
    required: ['street', 'city', 'state'],
    labels: {
      street: 'Calle',
      number: 'Número',
      colony: 'Colonia',
      city: 'Ciudad',
      state: 'Estado',
      postalCode: 'Código Postal',
      country: 'País',
    },
  },
} as const;

// Helper para obtener configuración específica
export const getLocaleConfig = () => LOCALE_CONFIG;

// Helper para configurar Intl formatters
export const createDateFormatter = (options?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(LOCALE_CONFIG.locale, {
    timeZone: LOCALE_CONFIG.timezone,
    ...options,
  });
};

export const createNumberFormatter = (options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(LOCALE_CONFIG.locale, options);
};

export const createCurrencyFormatter = (options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(LOCALE_CONFIG.locale, {
    style: 'currency',
    currency: LOCALE_CONFIG.currency,
    ...options,
  });
};