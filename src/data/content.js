export const phone = '+94760846996'
export const phoneDisplay = '+94 76 084 6996'
export const email = 'drtechservicelk@gmail.com'
export const address = '121/B Ethul Kotte, Sri Jayawardenepura Kotte'

export const socials = {
    facebook: 'https://web.facebook.com/drtechai',
    linkedin: 'https://www.linkedin.com/in/deepal-rupasinghe/',
    youtube: 'https://www.youtube.com/@drtechlk',
    tiktok: 'https://www.tiktok.com/@drtechservices',
}

export function waLink(message) {
    return `https://wa.me/94760846996?text=${encodeURIComponent(message)}`
}

export const waMessages = {
    hero: 'Hi DR TECH, I need help with my computer or device',
    basicVisit: 'Hi DR TECH, I want to book a Basic Visit or Diagnosis',
    businessGrowthPackage: 'Hi DR TECH, I want the Business Digital Starter Package',
    businessOnline: 'Hi DR TECH, I want help putting my business online',
    monthlyCare: 'Hi DR TECH, I want a Monthly Business IT Care plan',
    contact: 'Hi DR TECH, I need help with my device',
    footer: 'Hi DR TECH, I need IT support',
    floatingAction: 'Hi DR TECH, I need help with my device',
}

// Price ranges shown identically in every language in the original site
// (they were never present as translation keys, so they stayed English/digits regardless of locale).
export const prices = {
    diagnosisFrom: 'LKR 1,500',
    basicVisit: 'LKR 1,500 - 2,500',
    laptopBoost: 'LKR 3,500 - 7,500',
    windowsSetup: 'LKR 3,500 - 6,500',
    wifiPrinter: 'LKR 2,500 - 5,000',
    smallBizVisit: 'LKR 3,500 - 7,500',
    starter: 'LKR 7,500',
    growth: 'LKR 15,000',
    pro: 'LKR 25,000+',
}
