// Shared, framework-free QR helpers. Used at build time (Astro frontmatter) and in the browser.

export const TYPES = [
  { id: 'url', label: 'URL', fields: [{ k: 'url', label: 'Website URL', ph: 'https://example.com', it: 'url' }] },
  { id: 'text', label: 'Text', fields: [{ k: 'text', label: 'Your text', type: 'area', ph: 'Any text up to ~2,900 characters' }] },
  { id: 'email', label: 'Email', fields: [{ k: 'to', label: 'Email address', ph: 'name@example.com', it: 'email' }, { k: 'subject', label: 'Subject' }, { k: 'body', label: 'Message', type: 'area' }] },
  { id: 'phone', label: 'Phone', fields: [{ k: 'tel', label: 'Phone number', ph: '+1 202 555 0123', it: 'tel' }] },
  { id: 'sms', label: 'SMS', fields: [{ k: 'smsNum', label: 'Phone number', ph: '+1 202 555 0123', it: 'tel' }, { k: 'smsMsg', label: 'Message', type: 'area' }] },
  { id: 'whatsapp', label: 'WhatsApp', fields: [{ k: 'waNum', label: 'Number with country code', ph: '12025550123', it: 'tel' }, { k: 'waMsg', label: 'Prefilled message', type: 'area' }] },
  { id: 'wifi', label: 'Wi‑Fi', fields: [{ k: 'ssid', label: 'Network name (SSID)', half: 1 }, { k: 'wifiPass', label: 'Password', half: 1 }, { k: 'wifiEnc', label: 'Encryption', type: 'select', options: [['WPA', 'WPA / WPA2 / WPA3'], ['WEP', 'WEP'], ['nopass', 'None']] }] },
  { id: 'vcard', label: 'Contact', fields: [
    { k: 'vcFormat', label: 'Format', type: 'select', options: [['vcard', 'vCard 3.0'], ['mecard', 'MeCard']] },
    { k: 'first', label: 'First name', half: 1 }, { k: 'last', label: 'Last name', half: 1 },
    { k: 'org', label: 'Company', half: 1 }, { k: 'title', label: 'Job title', half: 1 },
    { k: 'mobile', label: 'Mobile', half: 1, it: 'tel' }, { k: 'work', label: 'Work phone', half: 1, it: 'tel' },
    { k: 'vemail', label: 'Email', half: 1, it: 'email' }, { k: 'website', label: 'Website', half: 1 },
    { k: 'street', label: 'Street' }, { k: 'city', label: 'City', half: 1 }, { k: 'zip', label: 'ZIP', half: 1 }, { k: 'country', label: 'Country' }] },
  { id: 'geo', label: 'Location', fields: [{ k: 'lat', label: 'Latitude', ph: '40.7128', half: 1 }, { k: 'lng', label: 'Longitude', ph: '-74.0060', half: 1 }, { k: 'geoQ', label: 'Place label (optional)' }, { k: 'geoFmt', label: 'Opens with', type: 'select', options: [['geo', 'Default maps app'], ['gmaps', 'Google Maps link']] }] },
  { id: 'event', label: 'Event', fields: [{ k: 'evTitle', label: 'Event title' }, { k: 'evLoc', label: 'Location' }, { k: 'evStart', label: 'Starts', it: 'datetime-local', half: 1 }, { k: 'evEnd', label: 'Ends', it: 'datetime-local', half: 1 }, { k: 'evDesc', label: 'Description', type: 'area' }] },
  { id: 'crypto', label: 'Crypto', fields: [{ k: 'coin', label: 'Currency', type: 'select', options: [['bitcoin', 'Bitcoin'], ['ethereum', 'Ethereum'], ['litecoin', 'Litecoin'], ['bitcoincash', 'Bitcoin Cash'], ['dash', 'Dash']] }, { k: 'addr', label: 'Receiver address' }, { k: 'amount', label: 'Amount', half: 1, it: 'number' }, { k: 'clabel', label: 'Label', half: 1 }, { k: 'cmsg', label: 'Message' }] },
  { id: 'review', label: 'Review', fields: [{ k: 'placeId', label: 'Google Place ID or review link', ph: 'ChIJ… or https://g.page/r/…/review' }] },
  { id: 'feedback', label: 'Feedback', fields: [{ k: 'formUrl', label: 'Feedback / survey form link', ph: 'https://forms.gle/…', it: 'url' }] },
  { id: 'app', label: 'App', fields: [{ k: 'appStore', label: 'Store', type: 'select', options: [['play', 'Google Play'], ['apple', 'Apple App Store']] }, { k: 'appId', label: 'App ID or store link', ph: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME' }] },
  { id: 'coupon', label: 'Coupon', fields: [{ k: 'cpTitle', label: 'Offer' }, { k: 'cpCode', label: 'Coupon code', half: 1 }, { k: 'cpExpiry', label: 'Valid until', it: 'date', half: 1 }, { k: 'cpTerms', label: 'Terms (optional)', type: 'area' }, { k: 'cpLink', label: 'Redeem link (optional)', it: 'url' }] },
  { id: 'payment', label: 'Payment', fields: [
    { k: 'payMethod', label: 'Method', type: 'select', options: [['paypal', 'PayPal'], ['upi', 'UPI'], ['venmo', 'Venmo'], ['cashapp', 'Cash App']] },
    { k: 'payId', label: 'PayPal.me / UPI ID / username / $cashtag', ph: 'username' },
    { k: 'payName', label: 'Payee name', showIf: ['payMethod', 'upi'], half: 1 },
    { k: 'payAmt', label: 'Amount (optional)', it: 'number', half: 1 },
    { k: 'payCur', label: 'Currency', showIf: ['payMethod', 'paypal'], ph: 'USD', half: 1 },
    { k: 'payNote', label: 'Note (optional)' }] },
];

// Social profile shortcuts for the URL type. Replace the placeholder after the prefix with a username.
export const SOCIALS = [
  { id: 'facebook', label: 'Facebook', ph: 'username', prefix: 'https://www.facebook.com/' },
  { id: 'youtube', label: 'YouTube', ph: '@username', prefix: 'https://www.youtube.com/' },
  { id: 'x', label: 'X (Twitter)', ph: 'username', prefix: 'https://x.com/' },
  { id: 'instagram', label: 'Instagram', ph: 'username', prefix: 'https://www.instagram.com/' },
  { id: 'telegram', label: 'Telegram', ph: 'username', prefix: 'https://t.me/' },
  { id: 'signal', label: 'Signal', ph: '+15551234567', prefix: 'https://signal.me/#p/' },
  { id: 'mastodon', label: 'Mastodon', ph: '@username', prefix: 'https://mastodon.social/' },
  { id: 'tiktok', label: 'TikTok', ph: '@username', prefix: 'https://www.tiktok.com/' },
  { id: 'threads', label: 'Threads', ph: '@username', prefix: 'https://www.threads.net/' },
  { id: 'bluesky', label: 'Bluesky', ph: 'username.bsky.social', prefix: 'https://bsky.app/profile/' },
  { id: 'linkedin', label: 'LinkedIn', ph: 'username', prefix: 'https://www.linkedin.com/in/' },
  { id: 'pinterest', label: 'Pinterest', ph: 'username', prefix: 'https://www.pinterest.com/' },
  { id: 'snapchat', label: 'Snapchat', ph: 'username', prefix: 'https://www.snapchat.com/add/' },
  { id: 'reddit', label: 'Reddit', ph: 'username', prefix: 'https://www.reddit.com/user/' },
  { id: 'github', label: 'GitHub', ph: 'username', prefix: 'https://github.com/' },
  { id: 'discord', label: 'Discord', ph: 'invitecode', prefix: 'https://discord.gg/' },
  { id: 'twitch', label: 'Twitch', ph: 'username', prefix: 'https://www.twitch.tv/' },
  { id: 'whatsapp', label: 'WhatsApp', ph: '12025550123', prefix: 'https://wa.me/' },
];

// Store link templates for the App type. Replace the YOUR_… part (a bare package name / numeric ID also works).
export const APP_LINKS = { play: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', apple: 'https://apps.apple.com/us/app/app-name/idYOUR_APP_ID' };

export const FIELD_DEFAULTS = { url: 'https://example.com', text: 'Hello, world! Replace this with your own text.', to: 'name@example.com', subject: 'Hello from QR Code Station', body: 'Hi there, I scanned your QR code!', tel: '+1 202 555 0123', smsNum: '+1 202 555 0123', smsMsg: 'Hello! I scanned your QR code.', waNum: '12025550123', waMsg: 'Hello! I scanned your QR code.', ssid: 'MyHomeWiFi', wifiPass: 'my-wifi-password', wifiEnc: 'WPA', wifiHidden: false, vcFormat: 'vcard', first: 'John', last: 'Doe', org: 'Example Inc.', title: 'Software Engineer', mobile: '+1 202 555 0123', work: '+1 202 555 0147', vemail: 'john.doe@example.com', website: 'https://example.com', street: '123 Main Street', city: 'New York', zip: '10001', country: 'United States', lat: '40.7128', lng: '-74.0060', geoQ: 'New York, NY, USA', geoFmt: 'geo', evTitle: 'Team Meetup', evLoc: 'New York, NY, USA', evStart: '2026-12-01T10:00', evEnd: '2026-12-01T11:00', evDesc: 'Join us for our monthly team meetup.', coin: 'bitcoin', addr: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', amount: '0.001', clabel: 'Donation', cmsg: 'Thanks for your support', placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4', formUrl: 'https://forms.gle/abc123XYZ', appStore: 'play', appId: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME', cpTitle: 'Get 20% off your next order', cpCode: 'SAVE20', cpExpiry: '2026-12-31', cpTerms: 'Valid on orders over $25. One use per customer.', cpLink: 'https://example.com/shop', payMethod: 'paypal', payId: 'example', payName: 'Jane Doe', payAmt: '10', payCur: 'USD', payNote: 'Thank you' };
export const DESIGN_DEFAULTS = { fg: '#0B0D0C', bg: '#FFFFFF', transparent: false, gradient: false, gradType: 'linear', grad2: '#58AE37', gradAngle: 45, customEyes: false, frameColor: '#0B0D0C', ballColor: '#0B0D0C', body: 'square', frame: 'square', ball: 'square' };
export const BODY = [['square', 'Square'], ['rounded', 'Rounded'], ['dots', 'Dots'], ['classy', 'Classy'], ['diamond', 'Diamond'], ['small', 'Small squares'], ['vertical', 'Vertical bars'], ['horizontal', 'Horizontal bars']];
export const FRAME = [['square', 'Square'], ['rounded', 'Rounded'], ['extra', 'Extra rounded'], ['circle', 'Circle'], ['leaf', 'Leaf'], ['pointed', 'Pointed']];
export const BALL = [['square', 'Square'], ['rounded', 'Rounded'], ['circle', 'Circle'], ['diamond', 'Diamond'], ['leaf', 'Leaf'], ['pointed', 'Pointed']];
export const ECC = [['L', 'Low', '~7% recovery'], ['M', 'Medium', '~15% recovery'], ['Q', 'Quartile', '~25% recovery'], ['H', 'High', '~30% recovery']];
export const PRESETS = [
  { name: 'Classic', ...DESIGN_DEFAULTS },
  { name: 'Charge', fg: '#2A6015', grad2: '#58AE37', gradient: true, gradType: 'linear', gradAngle: 45, body: 'rounded', frame: 'extra', ball: 'rounded' },
  { name: 'Dots', fg: '#0F1411', body: 'dots', frame: 'circle', ball: 'circle', customEyes: true, frameColor: '#3D8A20', ballColor: '#0F1411' },
  { name: 'Ocean', fg: '#0E4C5A', grad2: '#1F8A70', gradient: true, gradType: 'radial', body: 'classy', frame: 'leaf', ball: 'leaf' },
  { name: 'Bars', fg: '#1B1F1D', body: 'vertical', frame: 'rounded', ball: 'rounded', bg: '#EEF2EE' },
  { name: 'Ember', fg: '#1B1F1D', body: 'diamond', frame: 'pointed', ball: 'diamond', customEyes: true, frameColor: '#B45309', ballColor: '#B45309' },
  { name: 'Inverse', fg: '#8EE36A', body: 'small', bg: '#0B0D0C' },
  { name: 'Rounded', fg: '#0B0D0C', body: 'rounded', frame: 'rounded', ball: 'rounded' },
  { name: 'Soft', fg: '#334155', body: 'rounded', frame: 'extra', ball: 'circle', bg: '#F8FAFC' },
  { name: 'Bubble', fg: '#1D4ED8', grad2: '#7C3AED', gradient: true, gradAngle: 60, body: 'dots', frame: 'circle', ball: 'circle' },
  { name: 'Sunset', fg: '#F97316', grad2: '#BE185D', gradient: true, gradAngle: 135, body: 'rounded', frame: 'extra', ball: 'rounded' },
  { name: 'Berry', fg: '#86198F', grad2: '#BE185D', gradient: true, gradAngle: 45, body: 'classy', frame: 'leaf', ball: 'leaf' },
  { name: 'Forest', fg: '#14532D', body: 'classy', frame: 'leaf', ball: 'leaf', bg: '#F0FDF4', customEyes: true, frameColor: '#166534', ballColor: '#14532D' },
  { name: 'Diamonds', fg: '#7C2D12', body: 'diamond', frame: 'pointed', ball: 'diamond', bg: '#FFF7ED' },
  { name: 'Stripes', fg: '#0F766E', body: 'vertical', frame: 'rounded', ball: 'rounded' },
  { name: 'Lines', fg: '#1E3A8A', body: 'horizontal', frame: 'rounded', ball: 'circle' },
  { name: 'Pixel', fg: '#111827', body: 'small', frame: 'square', ball: 'square', bg: '#F3F4F6' },
  { name: 'Candy', fg: '#EC4899', grad2: '#7C3AED', gradient: true, gradAngle: 90, body: 'dots', frame: 'circle', ball: 'circle', customEyes: true, frameColor: '#7C3AED', ballColor: '#EC4899' },
  { name: 'Gold', fg: '#92400E', grad2: '#D97706', gradient: true, gradAngle: 45, body: 'classy', frame: 'extra', ball: 'rounded', bg: '#FFFBEB' },
  { name: 'Sky', fg: '#0369A1', grad2: '#0EA5E9', gradient: true, gradType: 'radial', body: 'rounded', frame: 'circle', ball: 'circle' },
  { name: 'Mint', fg: '#065F46', grad2: '#10B981', gradient: true, gradAngle: 45, body: 'dots', frame: 'rounded', ball: 'rounded', bg: '#ECFDF5' },
  { name: 'Crimson', fg: '#7F1D1D', body: 'diamond', frame: 'leaf', ball: 'leaf', customEyes: true, frameColor: '#DC2626', ballColor: '#7F1D1D' },
  { name: 'Slate', fg: '#334155', body: 'horizontal', frame: 'rounded', ball: 'circle', bg: '#F1F5F9' },
  { name: 'Leaf', fg: '#15803D', body: 'classy', frame: 'leaf', ball: 'leaf' },
  { name: 'Retro', fg: '#78350F', body: 'small', frame: 'square', ball: 'square', bg: '#FEF3C7' },
  { name: 'Ink drop', fg: '#0B0D0C', body: 'dots', frame: 'leaf', ball: 'circle' },
  { name: 'Arrow', fg: '#111827', body: 'diamond', frame: 'pointed', ball: 'pointed' },
  { name: 'Grape', fg: '#4C1D95', grad2: '#9333EA', gradient: true, gradType: 'radial', body: 'rounded', frame: 'extra', ball: 'circle', bg: '#FAF5FF' },
  { name: 'Ocean deep', fg: '#082F49', grad2: '#0E7490', gradient: true, gradAngle: 180, body: 'vertical', frame: 'rounded', ball: 'rounded' },
  { name: 'Neon', fg: '#22D3EE', grad2: '#A78BFA', gradient: true, gradAngle: 45, body: 'small', frame: 'rounded', ball: 'circle', bg: '#0B0D0C' },
  { name: 'Coral', fg: '#BE123C', body: 'rounded', frame: 'extra', ball: 'circle', customEyes: true, frameColor: '#BE123C', ballColor: '#0B0D0C', bg: '#FFF1F2' },
  { name: 'Sepia', fg: '#4A2511', bg: '#FDF1DC', body: 'small', frame: 'square', ball: 'square' },
  { name: 'Parchment', fg: '#3E2723', bg: '#F6ECD6', body: 'classy', frame: 'leaf', ball: 'leaf' },
  { name: 'Mint cream', fg: '#064E3B', bg: '#E4F8EE', body: 'rounded', frame: 'extra', ball: 'circle' },
  { name: 'Sky paper', fg: '#0C3B66', bg: '#E3F1FF', body: 'dots', frame: 'circle', ball: 'circle' },
  { name: 'Lavender', fg: '#3B1F7A', bg: '#EEE8FF', body: 'rounded', frame: 'extra', ball: 'rounded' },
  { name: 'Blush', fg: '#7A1236', bg: '#FFE8EE', body: 'diamond', frame: 'pointed', ball: 'diamond' },
  { name: 'Peach', fg: '#7C2D12', bg: '#FFEADB', body: 'small', frame: 'rounded', ball: 'rounded' },
  { name: 'Lemon', fg: '#3F3200', bg: '#FFF7BF', body: 'horizontal', frame: 'rounded', ball: 'rounded' },
  { name: 'Midnight', fg: '#E0E7FF', bg: '#0F172A', body: 'rounded', frame: 'extra', ball: 'circle' },
  { name: 'Cocoa', fg: '#FDE9D0', bg: '#2B1B12', body: 'small', frame: 'rounded', ball: 'rounded' },
  { name: 'Sage', fg: '#1F3D2B', bg: '#E6EFDF', body: 'classy', frame: 'leaf', ball: 'leaf' },
  { name: 'Sand', fg: '#2F2A1E', bg: '#F2E9D8', body: 'square', frame: 'square', ball: 'square' },
  { name: 'Rosewood', fg: '#6B1B2B', bg: '#FBE3DE', body: 'rounded', frame: 'extra', ball: 'leaf' },
  { name: 'Mist', fg: '#0B4F5C', bg: '#DDF4F7', body: 'vertical', frame: 'rounded', ball: 'rounded' },
  { name: 'Citrus', fg: '#7C2D12', grad2: '#86320F', gradient: true, gradAngle: 45, bg: '#FFF3D1', body: 'rounded', frame: 'extra', ball: 'rounded' },
  { name: 'Indigo', fg: '#1E1B4B', bg: '#E9EDFF', body: 'classy', frame: 'rounded', ball: 'circle' },
  { name: 'Terracotta', fg: '#7F2A15', bg: '#FBE7DC', body: 'diamond', frame: 'pointed', ball: 'pointed' },
  { name: 'Tea', fg: '#134E4A', bg: '#D9F5F0', body: 'dots', frame: 'rounded', ball: 'circle' },
  { name: 'Plum', fg: '#4A044E', bg: '#F9E6FD', body: 'classy', frame: 'extra', ball: 'leaf' },
  { name: 'Steel', fg: '#1F2937', bg: '#E4E7EB', body: 'horizontal', frame: 'square', ball: 'square' },
  { name: 'Newsprint', fg: '#111111', bg: '#ECE8DC', body: 'small', frame: 'square', ball: 'square' },
  { name: 'Brick', fg: '#0B3954', bg: '#FFF1E6', body: 'rounded', frame: 'rounded', ball: 'circle', customEyes: true, frameColor: '#8D0801', ballColor: '#8D0801' },
  { name: 'Bluebell', fg: '#1E3A8A', grad2: '#312E81', gradient: true, gradAngle: 90, bg: '#E8F0FE', body: 'dots', frame: 'circle', ball: 'circle' },
  { name: 'Moss', fg: '#1B3A1B', bg: '#E3EFC9', body: 'vertical', frame: 'leaf', ball: 'leaf' },
].map(p => ({ ...DESIGN_DEFAULTS, ...p }));

const n2 = v => +(+v).toFixed(3);
function rr(x, y, w, h, r) {
  const [a, b, c, d] = r.map(n2);
  return `M${n2(x + a)},${n2(y)}H${n2(x + w - b)}` + (b ? `A${b},${b} 0 0 1 ${n2(x + w)},${n2(y + b)}` : '') +
    `V${n2(y + h - c)}` + (c ? `A${c},${c} 0 0 1 ${n2(x + w - c)},${n2(y + h)}` : '') +
    `H${n2(x + d)}` + (d ? `A${d},${d} 0 0 1 ${n2(x)},${n2(y + h - d)}` : '') +
    `V${n2(y + a)}` + (a ? `A${a},${a} 0 0 1 ${n2(x + a)},${n2(y)}` : '') + 'Z';
}
const circ = (cx, cy, r) => `M${n2(cx - r)},${n2(cy)}a${n2(r)},${n2(r)} 0 1 0 ${n2(2 * r)},0a${n2(r)},${n2(r)} 0 1 0 ${n2(-2 * r)},0Z`;
const diamond = (x, y, s) => { const c = s / 2; return `M${n2(x + c)},${n2(y)}L${n2(x + s)},${n2(y + c)}L${n2(x + c)},${n2(y + s)}L${n2(x)},${n2(y + c)}Z`; };

function bodyCell(shape, x, y, { T, B, L, R }) {
  const h = 0.5;
  switch (shape) {
    case 'rounded': return rr(x, y, 1, 1, [!T && !L ? h : 0, !T && !R ? h : 0, !B && !R ? h : 0, !B && !L ? h : 0]);
    case 'dots': return circ(x + .5, y + .5, .43);
    case 'classy': return rr(x, y, 1, 1, [!T && !L ? h : 0, 0, !B && !R ? h : 0, 0]);
    case 'diamond': return diamond(x - .02, y - .02, 1.04);
    case 'small': return rr(x + .12, y + .12, .76, .76, [0, 0, 0, 0]);
    case 'vertical': return rr(x + .1, y, .8, 1, [!T ? .4 : 0, !T ? .4 : 0, !B ? .4 : 0, !B ? .4 : 0]);
    case 'horizontal': return rr(x, y + .1, 1, .8, [!L ? .4 : 0, !R ? .4 : 0, !R ? .4 : 0, !L ? .4 : 0]);
    default: return `M${x},${y}h1v1h-1Z`;
  }
}
function framePath(shape, x, y) {
  const pair = (o, i) => rr(x, y, 7, 7, o) + rr(x + 1, y + 1, 5, 5, i);
  switch (shape) {
    case 'rounded': return pair([2, 2, 2, 2], [1.2, 1.2, 1.2, 1.2]);
    case 'extra': return pair([3, 3, 3, 3], [2, 2, 2, 2]);
    case 'circle': return circ(x + 3.5, y + 3.5, 3.5) + circ(x + 3.5, y + 3.5, 2.5);
    case 'leaf': return pair([3, 0, 3, 0], [2, 0, 2, 0]);
    case 'pointed': return pair([3, 3, 0, 3], [2, 2, 0, 2]);
    default: return pair([0, 0, 0, 0], [0, 0, 0, 0]);
  }
}
function ballPath(shape, x, y) {
  switch (shape) {
    case 'rounded': return rr(x, y, 3, 3, [.9, .9, .9, .9]);
    case 'circle': return circ(x + 1.5, y + 1.5, 1.5);
    case 'diamond': return diamond(x - .3, y - .3, 3.6);
    case 'leaf': return rr(x, y, 3, 3, [1.5, 0, 1.5, 0]);
    case 'pointed': return rr(x, y, 3, 3, [1.4, 1.4, 0, 1.4]);
    default: return rr(x, y, 3, 3, [0, 0, 0, 0]);
  }
}

// Shape thumbnails use currentColor so they follow the site theme.
const SAMPLE = ['10110', '11011', '00101', '11100', '10111'];
export function bodyThumb(shape) {
  const on = (x, y) => y >= 0 && y < 5 && x >= 0 && x < 5 && SAMPLE[y][x] === '1';
  let d = '';
  for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (on(x, y)) d += bodyCell(shape, x, y, { T: on(x, y - 1), B: on(x, y + 1), L: on(x - 1, y), R: on(x + 1, y) });
  return `<svg viewBox="-.2 -.2 5.4 5.4" aria-hidden="true"><path fill="currentColor" d="${d}"/></svg>`;
}
export const frameThumb = s => `<svg viewBox="-.2 -.2 7.4 7.4" aria-hidden="true"><path fill-rule="evenodd" fill="currentColor" d="${framePath(s, 0, 0)}"/></svg>`;
export const ballThumb = s => `<svg viewBox="-.5 -.5 4 4" aria-hidden="true"><path fill="currentColor" d="${ballPath(s, 0, 0)}"/></svg>`;

// Gradient ids must be unique per SVG: several SVGs share one page (presets, preview), and a
// duplicate id makes url(#id) resolve to the first one in the document (or to a hidden one that never paints).
let gradN = 0;
const gradPrefix = typeof window === 'undefined' ? 's' : 'c' + Date.now().toString(36);
export function buildSvg(qr, o, px) {
  const n = qr.size, b = o.border ?? 4, S = n + 2 * b;
  const eye = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const ls = (o.logoSize || .22) * n;
  let lx0 = -1, lx1 = -1;
  if (o.logo && o.clearLogo) { lx0 = (n - ls) / 2 - .6; lx1 = (n + ls) / 2 + .6; }
  const cleared = (x, y) => lx0 >= 0 && x + .5 > lx0 && x + .5 < lx1 && y + .5 > lx0 && y + .5 < lx1;
  const on = (x, y) => qr.getModule(x, y) && !eye(x, y) && !cleared(x, y);
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (on(x, y))
    d += bodyCell(o.body, x + b, y + b, { T: on(x, y - 1), B: on(x, y + 1), L: on(x - 1, y), R: on(x + 1, y) });
  let defs = '', fill = o.fg;
  if (o.gradient) {
    const gid = `qg${gradPrefix}${++gradN}`;
    const c = S / 2;
    if (o.gradType === 'radial') defs = `<radialGradient id="${gid}" gradientUnits="userSpaceOnUse" cx="${c}" cy="${c}" r="${n2(S * .6)}"><stop offset="0" stop-color="${o.fg}"/><stop offset="1" stop-color="${o.grad2}"/></radialGradient>`;
    else { const a = (o.gradAngle - 90) * Math.PI / 180, dx = Math.cos(a) * c, dy = Math.sin(a) * c; defs = `<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="${n2(c - dx)}" y1="${n2(c - dy)}" x2="${n2(c + dx)}" y2="${n2(c + dy)}"><stop offset="0" stop-color="${o.fg}"/><stop offset="1" stop-color="${o.grad2}"/></linearGradient>`; }
    fill = `url(#${gid})`;
  }
  const fc = o.customEyes ? o.frameColor : fill, bc = o.customEyes ? o.ballColor : fill;
  let eyes = '';
  [[0, 0, 0], [n - 7, 0, 90], [0, n - 7, -90]].forEach(([ex, ey, rot]) => {
    const x = ex + b, y = ey + b, t = rot ? ` transform="rotate(${rot} ${x + 3.5} ${y + 3.5})"` : '';
    eyes += `<path fill-rule="evenodd" fill="${fc}"${t} d="${framePath(o.frame, x, y)}"/><path fill="${bc}"${t} d="${ballPath(o.ball, x + 2, y + 2)}"/>`;
  });
  let logo = '';
  if (o.logo) {
    const p = b + (n - ls) / 2, box = o.logoBg || o.logoStroke;
    const w = o.logoStroke ? (o.logoStrokeW || 3) * .12 : 0, inset = box ? ls * .14 + w : 0, is = ls - 2 * inset;
    if (box) logo = `<rect x="${n2(p + w / 2)}" y="${n2(p + w / 2)}" width="${n2(ls - w)}" height="${n2(ls - w)}" rx="${n2(ls * .24)}" fill="${o.logoBg ? o.logoBgColor : 'none'}"${w ? ` stroke="${o.logoStrokeColor}" stroke-width="${n2(w)}"` : ''}/>`;
    logo += `<image href="${o.logo}" x="${n2(p + inset)}" y="${n2(p + inset)}" width="${n2(is)}" height="${n2(is)}" preserveAspectRatio="xMidYMid meet"/>`;
  }
  const bg = o.transparent ? '' : `<rect width="${S}" height="${S}"${o.radius ? ` rx="${n2(S * o.radius / 100)}"` : ''} fill="${o.bg}"/>`;
  const size = px ? ` width="${px}" height="${px}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"${size}${o.body === 'square' ? ' shape-rendering="crispEdges"' : ''}>${defs ? '<defs>' + defs + '</defs>' : ''}${bg}<path fill="${fill}" d="${d}"/>${eyes}${logo}</svg>`;
}

const esc = s => String(s || '').replace(/([\\;,:"])/g, '\\$1');
const icsDate = v => v ? v.replace(/[-:]/g, '') + '00' : '';
export function buildPayload(type, d) {
  switch (type) {
    case 'url': return d.url.trim();
    case 'text': return d.text;
    case 'email': { if (!d.to) return ''; const q = []; if (d.subject) q.push('subject=' + encodeURIComponent(d.subject)); if (d.body) q.push('body=' + encodeURIComponent(d.body)); return 'mailto:' + d.to.trim() + (q.length ? '?' + q.join('&') : ''); }
    case 'phone': return d.tel ? 'tel:' + d.tel.replace(/[^\d+]/g, '') : '';
    case 'sms': return d.smsNum ? 'SMSTO:' + d.smsNum.replace(/[^\d+]/g, '') + ':' + d.smsMsg : '';
    case 'whatsapp': return d.waNum ? 'https://wa.me/' + d.waNum.replace(/\D/g, '') + (d.waMsg ? '?text=' + encodeURIComponent(d.waMsg) : '') : '';
    case 'wifi': return d.ssid ? `WIFI:T:${d.wifiEnc};S:${esc(d.ssid)};${d.wifiEnc !== 'nopass' ? 'P:' + esc(d.wifiPass) + ';' : ''}${d.wifiHidden ? 'H:true;' : ''};` : '';
    case 'vcard': {
      if (!(d.first || d.last || d.org || d.mobile || d.vemail)) return '';
      if (d.vcFormat === 'mecard') {
        let s = `MECARD:N:${esc(d.last)},${esc(d.first)};`;
        if (d.org) s += `ORG:${esc(d.org)};`; if (d.mobile) s += `TEL:${esc(d.mobile)};`; if (d.work) s += `TEL:${esc(d.work)};`;
        if (d.vemail) s += `EMAIL:${esc(d.vemail)};`; if (d.website) s += `URL:${esc(d.website)};`;
        const adr = [d.street, d.city, d.zip, d.country].filter(Boolean).join(' ');
        if (adr) s += `ADR:${esc(adr)};`;
        return s + ';';
      }
      const L = ['BEGIN:VCARD', 'VERSION:3.0', `N:${d.last};${d.first};;;`, `FN:${[d.first, d.last].filter(Boolean).join(' ')}`];
      if (d.org) L.push('ORG:' + d.org); if (d.title) L.push('TITLE:' + d.title);
      if (d.mobile) L.push('TEL;TYPE=CELL:' + d.mobile); if (d.work) L.push('TEL;TYPE=WORK:' + d.work);
      if (d.vemail) L.push('EMAIL:' + d.vemail); if (d.website) L.push('URL:' + d.website);
      if (d.street || d.city || d.zip || d.country) L.push(`ADR:;;${d.street};${d.city};;${d.zip};${d.country}`);
      L.push('END:VCARD'); return L.join('\n');
    }
    case 'geo': {
      if (!d.lat || !d.lng) return '';
      if (d.geoFmt === 'gmaps') return `https://maps.google.com/?q=${d.lat},${d.lng}`;
      return `geo:${d.lat},${d.lng}` + (d.geoQ ? `?q=${d.lat},${d.lng}(${encodeURIComponent(d.geoQ)})` : '');
    }
    case 'event': {
      if (!d.evTitle) return '';
      const L = ['BEGIN:VEVENT', 'SUMMARY:' + d.evTitle];
      if (d.evLoc) L.push('LOCATION:' + d.evLoc); if (d.evStart) L.push('DTSTART:' + icsDate(d.evStart));
      if (d.evEnd) L.push('DTEND:' + icsDate(d.evEnd)); if (d.evDesc) L.push('DESCRIPTION:' + d.evDesc.replace(/\n/g, '\\n'));
      L.push('END:VEVENT'); return L.join('\n');
    }
    case 'review': { const v = (d.placeId || '').trim(); return !v ? '' : /^https?:\/\//i.test(v) ? v : 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(v); }
    case 'feedback': return (d.formUrl || '').trim();
    case 'app': {
      const v = (d.appId || '').trim(); if (!v) return '';
      if (/^https?:\/\//i.test(v)) return v;
      if (d.appStore === 'apple') { const n = v.replace(/\D/g, ''); return n ? 'https://apps.apple.com/app/id' + n : ''; }
      return 'https://play.google.com/store/apps/details?id=' + encodeURIComponent(v);
    }
    case 'coupon': {
      if (!d.cpTitle && !d.cpCode) return '';
      const L = []; if (d.cpTitle) L.push(d.cpTitle); if (d.cpCode) L.push('Coupon code: ' + d.cpCode);
      if (d.cpExpiry) L.push('Valid until: ' + d.cpExpiry); if (d.cpTerms) L.push(d.cpTerms); if (d.cpLink) L.push('Redeem: ' + d.cpLink.trim());
      return L.join('\n');
    }
    case 'payment': {
      const id = (d.payId || '').trim(); if (!id) return '';
      const amt = (d.payAmt || '').trim(), note = (d.payNote || '').trim(), e = encodeURIComponent;
      if (d.payMethod === 'upi') return `upi://pay?pa=${e(id)}${d.payName ? '&pn=' + e(d.payName) : ''}${amt ? '&am=' + e(amt) : ''}&cu=INR${note ? '&tn=' + e(note) : ''}`;
      if (d.payMethod === 'venmo') { const q = ['txn=pay']; if (amt) q.push('amount=' + e(amt)); if (note) q.push('note=' + e(note)); return `https://venmo.com/${e(id.replace(/^@/, ''))}?${q.join('&')}`; }
      if (d.payMethod === 'cashapp') return `https://cash.app/$${e(id.replace(/^\$/, ''))}${amt ? '/' + e(amt) : ''}`;
      return `https://paypal.me/${e(id)}${amt ? '/' + e(amt) + e((d.payCur || '').trim().toUpperCase()) : ''}`;
    }
    case 'crypto': {
      if (!d.addr) return '';
      const q = []; if (d.amount) q.push('amount=' + d.amount); if (d.clabel) q.push('label=' + encodeURIComponent(d.clabel)); if (d.cmsg) q.push('message=' + encodeURIComponent(d.cmsg));
      return `${d.coin}:${d.addr.trim()}` + (q.length ? '?' + q.join('&') : '');
    }
  }
  return '';
}

function lum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 0;
  const v = parseInt(m[1], 16);
  const c = [v >> 16, (v >> 8) & 255, v & 255].map(x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); });
  return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
}
export function contrast(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }


// Content of the printable sheet (PDF): heading, detail lines and a "scan to…" caption.
// `T(english, vars)` translates a sheet string; the default keeps English.
export function buildSheet(type, d, T = (s, v) => (v ? s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '') : s)) {
  const L = [];
  const add = (k, v) => { if (v && String(v).trim()) L.push([T(k), String(v).trim()]); };
  switch (type) {
    case 'url': {
      const u = (d.url || '').trim(), sc = SOCIALS.find(s => u.startsWith(s.prefix));
      if (sc) { add('Profile', u); return { heading: T('Find us on {p}', { p: sc.label }), lines: L, caption: T('Scan to open {p}', { p: sc.label }) }; }
      let host = ''; try { host = new URL(u).hostname.replace(/^www\./, ''); } catch (e) {}
      add('Link', u); return { heading: host || T('Visit our website'), lines: L, caption: T('Scan to open the link') };
    }
    case 'text': add('Message', d.text); return { heading: T('Scan to read'), lines: L, caption: T('Scan to read the message') };
    case 'email': add('To', d.to); add('Subject', d.subject); return { heading: T('Send us an email'), lines: L, caption: T('Scan to send an email') };
    case 'phone': add('Phone', d.tel); return { heading: T('Call us'), lines: L, caption: T('Scan to call') };
    case 'sms': add('Phone', d.smsNum); add('Message', d.smsMsg); return { heading: T('Send us a text'), lines: L, caption: T('Scan to send a text message') };
    case 'whatsapp': add('WhatsApp', d.waNum); add('Message', d.waMsg); return { heading: T('Chat with us on WhatsApp'), lines: L, caption: T('Scan to start a chat') };
    case 'wifi':
      add('Network', d.ssid); if (d.wifiEnc !== 'nopass') add('Password', d.wifiPass); else add('Password', T('None (open network)'));
      add('Security', d.wifiEnc === 'nopass' ? '' : d.wifiEnc); if (d.wifiHidden) add('Note', T('Hidden network'));
      return { heading: T('Wi‑Fi'), lines: L, caption: T('Scan to connect') };
    case 'vcard':
      add('Name', [d.first, d.last].filter(Boolean).join(' ')); add('Title', d.title); add('Company', d.org);
      add('Mobile', d.mobile); add('Work', d.work); add('Email', d.vemail); add('Website', d.website);
      add('Address', [d.street, d.city, d.zip, d.country].filter(Boolean).join(', '));
      return { heading: [d.first, d.last].filter(Boolean).join(' ') || T('Contact'), lines: L.filter(l => l[0] !== T('Name')), caption: T('Scan to save contact') };
    case 'geo': add('Place', d.geoQ); add('Coordinates', d.lat && d.lng ? `${d.lat}, ${d.lng}` : ''); return { heading: T('Find us here'), lines: L, caption: T('Scan to open the map') };
    case 'event': {
      const fmt = v => { if (!v) return ''; const x = new Date(v); return isNaN(x) ? v : x.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); };
      add('Starts', fmt(d.evStart)); add('Ends', fmt(d.evEnd)); add('Where', d.evLoc); add('Details', d.evDesc);
      return { heading: d.evTitle || T('Event'), lines: L, caption: T('Scan to add to calendar') };
    }
    case 'review': return { heading: T('Loved your visit? Leave us a review'), lines: [], caption: T('Scan to review us on Google') };
    case 'feedback': return { heading: T('Tell us what you think'), lines: L, caption: T('Scan to give feedback') };
    case 'app': { const g = d.appStore !== 'apple'; add('Available on', g ? 'Google Play' : 'Apple App Store'); return { heading: T('Get our app'), lines: L, caption: g ? T('Scan to get it on Google Play') : T('Scan to get it on the App Store') }; }
    case 'coupon': add('Code', d.cpCode); add('Valid until', d.cpExpiry); add('Terms', d.cpTerms); return { heading: d.cpTitle || T('Special offer'), lines: L, caption: T('Scan to redeem') };
    case 'payment': { const m = { paypal: 'PayPal', upi: 'UPI', venmo: 'Venmo', cashapp: 'Cash App' }[d.payMethod] || 'Payment'; add('Pay with', m); add(d.payMethod === 'upi' ? 'UPI ID' : 'Account', d.payId); if (d.payMethod === 'upi') add('Name', d.payName); add('Amount', d.payAmt); add('Note', d.payNote); return { heading: T('Pay with {m}', { m }), lines: L, caption: T('Scan to pay') }; }
    case 'crypto': add('Currency', d.coin); add('Address', d.addr); add('Amount', d.amount); add('Label', d.clabel); add('Note', d.cmsg); return { heading: T('Payment request'), lines: L, caption: T('Scan to pay') };
  }
  return { heading: '', lines: L, caption: T('Scan me') };
}

// Quick color picks: a family swatch, then its shades from light to dark.
export const COLOR_FAMILIES = [
  { id: 'black', label: 'Black', shades: ['#000000', '#0B0D0C', '#111111', '#1A1A1A', '#222222', '#2B2B2B', '#333333', '#3D3D3D', '#4A4A4A', '#555555'] },
  { id: 'white', label: 'White', shades: ['#FFFFFF', '#FCFCFC', '#F9FAFB', '#F5F5F5', '#F1F5F9', '#EEEEEE', '#E8E8E8', '#E0E0E0', '#D9D9D9', '#CCCCCC'] },
  { id: 'gray', label: 'Gray', shades: ['#FAFAFA', '#F4F4F5', '#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B'] },
  { id: 'red', label: 'Red', shades: ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'] },
  { id: 'orange', label: 'Orange', shades: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#F97316', '#EA580C', '#C2410C', '#9A3412', '#7C2D12'] },
  { id: 'yellow', label: 'Yellow', shades: ['#FEFCE8', '#FEF9C3', '#FEF08A', '#FDE047', '#FACC15', '#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12'] },
  { id: 'green', label: 'Green', shades: ['#F0FDF4', '#DCFCE7', '#BBF7D0', '#86EFAC', '#4ADE80', '#22C55E', '#16A34A', '#15803D', '#166534', '#14532D'] },
  { id: 'teal', label: 'Teal', shades: ['#F0FDFA', '#CCFBF1', '#99F6E4', '#5EEAD4', '#2DD4BF', '#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A'] },
  { id: 'blue', label: 'Blue', shades: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'] },
  { id: 'purple', label: 'Purple', shades: ['#FAF5FF', '#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7', '#9333EA', '#7E22CE', '#6B21A8', '#581C87'] },
  { id: 'pink', label: 'Pink', shades: ['#FDF2F8', '#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843'] },
  { id: 'brown', label: 'Brown', shades: ['#FAF5F0', '#EFE3D6', '#E0CBB4', '#CDAE8C', '#B88F66', '#9C7048', '#7F5A38', '#664830', '#4F3825', '#3A291B'] },
];
