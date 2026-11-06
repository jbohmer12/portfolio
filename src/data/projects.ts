// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit text, swap images,
//  reorder projects. The pages rebuild from this file.
//
//  Images: drop files into /public/projects/<slug>/ and set the
//  `src` on a media item (e.g. '/projects/redline/hero.jpg').
//  Any media item without `src` renders as a generative visual
//  in the project's palette, so the site never looks broken.
// ─────────────────────────────────────────────────────────────

export type Media = {
  src?: string;          // image or .mp4/.webm path in /public
  alt: string;
  caption?: string;
  wide?: boolean;        // full-bleed
  fit?: 'contain';       // show the whole image (screens, logos, posters) instead of cropping
  bg?: string;           // backdrop color when fit is 'contain'
};

export type Section = {
  label: string;         // small mono label, e.g. "Problem"
  title: string;
  body: string[];        // paragraphs
  points?: { k: string; v: string }[];
  media?: Media[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;              // one-line positioning
  summary: string;
  type: string;                // shown in project index
  year: string;
  award?: string;
  palette: [string, string, string]; // drives the generative visuals
  meta: { k: string; v: string }[];
  stats?: { value: string; label: string }[];
  cover: Media;
  sections: Section[];
  link?: { label: string; href: string };
};

const allProjects: Project[] = [
  {
    slug: 'redline',
    index: '01',
    title: 'Redline',
    kicker: 'The system I built to dig a dealership out of a shipping container of parts, and then turned into a product.',
    summary:
      'I was hired to get a container of motorcycle parts onto eBay. I ended up building the software that does it, and now I’m turning it into a product for powersports dealers.',
    type: 'Product design · Full-stack',
    year: '2025–',
    palette: ['#ff2a2a', '#ff8a00', '#14060a'],
    meta: [
      { k: 'Role', v: 'Founder, designer and developer' },
      { k: 'Timeline', v: '2025–Present' },
      { k: 'Stack', v: 'Supabase · Netlify · eBay Sell API' },
      { k: 'Type', v: 'B2B SaaS' },
    ],
    stats: [
      { value: '<1 min', label: 'to identify, list and locate a part' },
      { value: '150+', label: 'listings I got live on their eBay store' },
      { value: 'Solo', label: 'research, design and code' },
    ],
    cover: { src: '/projects/redline/cover.jpg', alt: 'Redline IMS landing page: Stop letting parts collect dust', wide: true },
    link: { label: 'the live site', href: 'https://ridersinventory.netlify.app/' },
    sections: [
      {
        label: 'The job',
        title: 'A shipping container full of parts',
        body: [
          'I was hired on commission at a Miami motorsports dealership to work through a shipping container full of parts and get them listed on eBay. It was a mess.',
          'Their eBay store barely got any views, and when orders did come in, we sometimes couldn’t ship them because nobody knew where the part was.',
        ],
      },
      {
        label: 'The old way',
        title: 'About a dozen steps for every part',
        body: [
          'Before the app, every single part went like this: search the part number on Google, figure out what it was, keep the tab open so I wouldn’t lose the info, label it, put it back in the container, walk inside, log in to eBay, find the part again on my phone, upload the photos from my laptop because eBay wasn’t logged in on my phone, fill in the listing, and post it.',
          'Then do it again. There were thousands of parts, across different brands, years, models and conditions.',
        ],
        media: [{ src: '/projects/redline/story.jpg', alt: 'How I tell the story on the Redline site', wide: true }],
      },
      {
        label: 'What I built',
        title: 'One flow from part number to live listing',
        body: [
          'So I built a system to do the repetitive part for me. Type or scan the OEM number and AI identifies the part and fills in the make, model, year, category and description. Every part gets a QR label and a location, and one click pushes the listing to eBay.',
          'I designed and built it myself on Supabase and Netlify, using the eBay Sell API.',
        ],
        points: [
          { k: 'AI part identification', v: 'An OEM number fills in make, model, year, category and a market-ready description.' },
          { k: 'QR labels and locations', v: 'Scan a label to pull up the part and where it lives.' },
          { k: 'Direct eBay listing', v: 'One click to list; status updates when it sells or ends.' },
          { k: 'Roles for floor staff', v: 'Staff can add and scan parts, but only admins can price, list or delete.' },
        ],
        media: [
          { src: '/projects/redline/dashboard.jpg', alt: 'Inventory dashboard: stock, eBay status and AI fill', fit: 'contain', bg: '#e9e7e2' },
          { src: '/projects/redline/sign-in.jpg', alt: 'Sign-in with password or 4-digit PIN for floor staff', fit: 'contain', bg: '#e1e0dd' },
          { src: '/projects/redline/workflow.jpg', alt: 'The four-step flow from warehouse to eBay', wide: true },
        ],
      },
      {
        label: 'Result',
        title: 'Under a minute per part',
        body: [
          'I used it myself for a week, then pitched it to my boss. Identifying, categorizing, listing and locating a part went from that whole routine to under a minute, and I got more than 150 listings live on their eBay store.',
        ],
        media: [{ src: '/projects/redline/features.jpg', alt: 'The full feature set', wide: true }],
      },
      {
        label: 'Now',
        title: 'From one warehouse to a product',
        body: [
          'The dealership wasn’t ready to invest in the rest of the setup, like a thermal printer for the QR labels, so I moved on. I rebranded the app as Redline IMS and I’m building it into a SaaS product for powersports dealers, with tiered plans, a free trial and CSV import from the systems dealers already use.',
        ],
        media: [{ src: '/projects/redline/compare.jpg', alt: 'How Redline compares to existing tools', wide: true }],
      },
    ],
  },
  {
    slug: 'step',
    index: '02',
    title: 'STEP',
    kicker: 'A pedestrian-safety wearable and companion app.',
    summary:
      'A discreet GPS-enabled device and app that alerts pedestrians to hazards and improves communication between people on foot and drivers.',
    type: 'Product · UX · Industrial',
    year: 'Concept',
    award: 'Red Dot Junior Award 2025',
    palette: ['#2f7bff', '#3ec8ff', '#030816'],
    meta: [
      { k: 'Role', v: 'Product / UX designer' },
      { k: 'Context', v: 'SCAD, UX Design' },
      { k: 'Recognition', v: 'Red Dot Junior Award 2025' },
      { k: 'Type', v: 'Device + companion app' },
    ],
    cover: { src: '/projects/step/cover.jpg', alt: 'STEP device with Red Dot winner 2025 badge', wide: true },
    sections: [
      {
        label: 'Problem',
        title: 'Streets fail the people walking on them',
        body: [
          'Many pedestrian accidents come down to poor infrastructure and a lack of communication between drivers and pedestrians. The brief we set ourselves: make the moment of crossing safer, with both sides more aware of each other.',
          // TODO(add): one real stat + the research you did (interviews, observation, testing)
        ],
      },
      {
        label: 'Concept',
        title: 'Hazard alerts you can feel',
        body: [
          'STEP pairs small, portable devices with a companion app. GPS and app connectivity drive real-time hazard detection and alerts, so people are warned without having to stare at a phone.',
        ],
        points: [
          { k: 'Discreet', v: 'Small enough to carry every day without drawing attention.' },
          { k: 'Alerting', v: 'Real-time hazard alerts without looking at a screen.' },
          { k: 'Connected', v: 'GPS and a companion app tie the system together.' },
        ],
        media: [{ src: '/projects/step/devices.jpg', alt: 'STEP device family', wide: true }],
      },
      {
        label: 'System',
        title: 'One system for both sides of the crosswalk',
        body: [
          // TODO(verify): confirm how the driver unit and pedestrian device talk to each other
          'The system covers both people in the moment that matters: a pedestrian device, a driver-side unit, and an app that handles onboarding and trip history.',
        ],
        media: [
          { src: '/projects/step/pucks-glow.jpg', alt: 'Pedestrian devices with light feedback' },
          { src: '/projects/step/driver-unit.jpg', alt: 'Driver-side unit' },
          { src: '/projects/step/app-onboarding.jpg', alt: 'App onboarding with QR pairing', fit: 'contain', bg: '#eef1f6' },
          { src: '/projects/step/app-drives.jpg', alt: 'App trip history', fit: 'contain', bg: '#eef1f6' },
        ],
      },
      {
        label: 'Iteration',
        title: 'Small enough to carry, strong enough to notice',
        body: [
          'The core tension was size versus signal. We built working prototypes with real electronics in a printed housing, so we could test the alerts in hand before committing to a final form.',
          'The prototype runs on an Arduino Micro driving a small round display and three vibration motors, so an alert can be felt as well as seen.',
        ],
        media: [
          { src: '/projects/step/prototype.jpg', alt: 'Working electronics prototype', fit: 'contain', bg: '#0d0f12' },
          { src: '/projects/step/firmware.jpg', alt: 'Prototype firmware', caption: 'Prototype firmware: round display plus three vibration motors', fit: 'contain', bg: '#1e1f22' },
          { src: '/projects/step/hologram.jpg', alt: 'Final device render' },
        ],
      },
      {
        label: 'Outcome',
        title: 'Recognized by Red Dot',
        body: [
          'STEP won a Red Dot in 2025, one of the most recognized international design awards for emerging designers.',
        ],
      },
    ],
  },
  {
    slug: 'ooln',
    index: '03',
    title: 'Ooln',
    kicker: 'One of two designers at an early AI trading startup, doing whatever needed design.',
    summary:
      'Ooln was a small startup building an AI co-pilot for traders. I worked on everything from the product itself to the logo, landing pages and trailers.',
    type: 'Product · Brand · Growth',
    year: '2025',
    palette: ['#9b5cff', '#c98bff', '#0a0614'],
    meta: [
      { k: 'Role', v: 'UX intern, one of two designers' },
      { k: 'Timeline', v: 'Jun–Jul 2025' },
      { k: 'Team', v: 'Two designers, engineers and the founders' },
      { k: 'Today', v: 'Rebranded as Wendy' },
    ],
    cover: { src: '/projects/ooln/hero.jpg', alt: 'Ooln landing page: Move Different', wide: true },
    link: { label: 'wendy.trade', href: 'https://wendy.trade/' },
    sections: [
      {
        label: 'Context',
        title: 'Two designers and a lot of jobs',
        body: [
          'It was just me and the designer I did my senior project with. We worked directly with the engineers and the CEOs, so everything we designed had to be something they could ship fast. Budget was tight and the pace was faster, so I was basically doing a million jobs at once.',
          'Anything that needed design had my hands on it somehow: teaser trailers for the product, event flyers, pitch decks, app mockups, landing pages.',
        ],
      },
      {
        label: 'Product',
        title: 'Testing which product to build',
        body: [
          'We tested the idea as a mobile app and as a web app, and ended up on a Chrome extension because that’s what the budget allowed.',
        ],
        media: [
          { src: '/projects/ooln/extension-on-chart.jpg', alt: 'The Chrome extension running on top of a trading screen', wide: true },
          { src: '/projects/ooln/extension-chat.jpg', alt: 'Extension panel: trade card and chat', wide: true },
          { src: '/projects/ooln/wireframe-sketch.jpg', alt: 'Early layout sketch: header and horizontal scroll', fit: 'contain', bg: '#f3f1ec', wide: true },
        ],
      },
      {
        label: 'Brand and growth',
        title: 'Logo, landing pages and trailers',
        body: [
          'My partner and I directed the logo and brand strategy together. We designed several versions of the landing page and tested them, and I made teaser trailers for the product.',
          'The company has since rebranded as Wendy, which builds market signals and indicators for AI trading agents.',
        ],
        media: [
          { src: '/projects/ooln/app-icon.jpg', alt: 'App icon', fit: 'contain', bg: '#ffffff' },
          { src: '/projects/ooln/wordmark.png', alt: 'Wordmark', fit: 'contain', bg: '#f4f1f8' },
        ],
      },
    ],
  },
  {
    slug: 'club-de-lo-roto',
    index: '04',
    title: 'Club de lo Roto',
    kicker: 'My take on the repair café: a Miami event series for fixing broken things, and the app that runs it.',
    summary:
      'Repair events that feel like something you’d actually want to go to, with a brand, a website and an app built around them.',
    type: 'Founder · Brand · Product',
    year: '2026–',
    palette: ['#ddb641', '#f0d27a', '#0f0c03'],
    meta: [
      { k: 'Role', v: 'Founder · brand · product' },
      { k: 'Timeline', v: '2026–Present' },
      { k: 'Where', v: 'Miami, FL' },
      { k: 'Type', v: 'Community brand + app' },
    ],
    cover: { src: '/projects/club-de-lo-roto/cover.jpg', alt: 'Club de lo Roto: Trae lo roto. Nos sentamos. Lo arreglamos.', wide: true, fit: 'contain', bg: '#fdf6ea' },
    link: { label: 'clubdeloroto.com', href: 'https://clubdeloroto.com' },
    sections: [
      {
        label: 'Why',
        title: 'Keeping things alive',
        body: [
          'I found Repair Café online while I was experimenting with building hardware and PCBs, and I wanted to start something like it in Miami. But the format felt dated. Most of these events happen in church basements. They have that hacker feeling, but I wanted something people would actually look forward to going to.',
          'I like the idea of keeping equipment alive. I ride a 2004 motorcycle that I refuse to sell, because of how much I’ve learned from fixing it.',
        ],
      },
      {
        label: 'Identity',
        title: 'Brand and social first',
        body: [
          'After quickly sketching out how the events would work, I started on the branding and social media. I wanted the type to feel organic and handwritten, even a little messy, so I set the name in Dripdrop, a liquid typeface, and paired it with a gold circle. The gold is a nod to kintsugi, the Japanese practice of repairing broken pottery with gold so the break becomes part of the piece.',
          'One early call shaped the format: nobody brings a broken lamp to a club at midnight, so the events run during the day.',
        ],
        media: [
          { src: '/projects/club-de-lo-roto/logo-circle.svg', alt: 'Primary mark, gold circle', fit: 'contain', bg: '#fdf6ea' },
          { src: '/projects/club-de-lo-roto/logo-mark.svg', alt: 'Wordmark', caption: 'Wordmark set in Dripdrop by SetSail Studios', fit: 'contain', bg: '#ddb641' },
        ],
      },
      {
        label: 'The website',
        title: 'Finding the fixers',
        body: [
          'A repair event is only as good as the people fixing things, so the first job was finding volunteers. I could have posted a Google Form on Instagram, but a real site makes it feel like something worth signing up for.',
          'I designed and coded it myself. It switches between Spanish and English, because that’s Miami. The look is neo-brutalist on purpose: monospace type, hard shadows, flat gold. It feels like a workbench, and it lets the messy Dripdrop logo be the only loose thing on the page.',
          'The event is split into five stations so volunteers can pick what they know. You don’t need to fix everything, one category is enough.',
        ],
        points: [
          { k: 'Five stations', v: 'Electronics, furniture, bikes, clothing and textiles, and general.' },
          { k: 'Volunteer form', v: 'Name, availability, which stations, and what you can fix.' },
          { k: 'Newsletter', v: 'Dates, events, and what we’re fixing.' },
          { k: 'Built with', v: 'Hand-coded HTML and CSS, hosted on GitHub Pages.' },
        ],
        media: [
          { src: '/projects/club-de-lo-roto/site-hero.jpg', alt: 'clubdeloroto.com home page', wide: true },
          { src: '/projects/club-de-lo-roto/site-stations.jpg', alt: 'Station cards', wide: true },
        ],
      },
      {
        label: 'The app',
        title: 'Making the event interactive',
        body: [
          'Once the brand was in place I started thinking about how the actual day would run. Most repair cafés check people in with pen and paper. I figured, why not use my own skills and make it more interactive. So I’m building an iPhone app for it.',
          'It has two sides. Visitors register their broken item when they arrive and follow it while it gets fixed, kind of like tracking a delivery. Fixers get their own view to pick up items at their station and update the status as they work.',
          'Then I wanted to make it a little game. Every fix counts toward how much stuff you’ve kept out of the trash, and both visitors and fixers earn badges along the way. The point is to give people a reason to come back next month.',
        ],
        points: [
          { k: 'Check-in', v: 'Register your item on your phone instead of a clipboard.' },
          { k: 'Live status', v: 'Follow your item from waiting to fixed.' },
          { k: 'Fixer view', v: 'Claim items at your station and update them as you go.' },
          { k: 'Your impact', v: 'See how much you’ve saved from the trash.' },
          { k: 'Badges', v: 'Separate ones for visitors and fixers.' },
        ],
      },
      {
        label: 'Next',
        title: 'An invite-only test',
        body: [
          'The app still needs work, but a rough version runs. The plan is an invite-only event first, to test the logistics and see how feasible it is to run these regularly.',
          'After that, the first public event goes inside something Miami already shows up to, like a flea market or a coffee shop patio, instead of asking people to find a new place. If it works, it becomes monthly.',
        ],
        points: [
          { k: 'Step 1', v: 'Recruit 4 to 6 fixers across at least three stations.' },
          { k: 'Step 2', v: 'Private, invite-only pilot.' },
          { k: 'Step 3', v: 'First public event at an existing Miami market.' },
          { k: 'Step 4', v: 'Monthly events.' },
        ],
      },
    ],
  },
  {
    slug: 'colectivo-under',
    index: '00',
    title: 'Colectivo Under',
    kicker: 'The underground house music collective I founded in Savannah, and the brand that grew around it.',
    summary:
      'What started as a few private parties became Savannah’s home for underground house music. I built the brand, designed every flyer and ran the nights myself.',
    type: 'Founder · Brand · Event design',
    year: '2023–',
    palette: ['#f2efe6', '#ffffff', '#050505'],
    meta: [
      { k: 'Role', v: 'Founder · brand · production' },
      { k: 'Timeline', v: '2023–Present' },
      { k: 'Where', v: 'Savannah, GA' },
      { k: 'Type', v: 'Nightlife brand + event series' },
    ],
    stats: [
      { value: '21', label: 'Events in 3 years' },
      { value: '2,600+', label: 'Tickets sold' },
      { value: '$26K+', label: 'Net revenue' },
      { value: '5', label: 'Sold-out nights' },
    ],
    cover: { src: '/projects/colectivo-under/cover.jpg', alt: 'Colectivo Under showcase', wide: true, fit: 'contain', bg: '#000000' },
    sections: [
      {
        label: 'Why',
        title: 'A scene that wasn’t there',
        body: [
          'I noticed Savannah’s nightlife was missing an underground house music scene, so I started hosting small private parties.',
          'As they grew, I reached out to the house DJs in Savannah and brought them together under one party.',
        ],
      },
      {
        label: 'Brand',
        title: 'A placeholder that stuck',
        body: [
          'At first there was no brand. After a few events I realized something special was happening, so I made up Colectivo Under as a placeholder name and logo.',
          'We grew so fast that the placeholder became the brand. I ended up developing a full identity around it, and every anniversary the logo gets a costume.',
        ],
        media: [
          { src: '/projects/colectivo-under/aparicion.jpg', alt: 'Colectivo Under x La Aparición Speakeasy', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/underground-sessions.jpg', alt: 'Underground Sessions 005', fit: 'contain', bg: '#000000' },
        ],
      },
      {
        label: 'Flyers',
        title: 'My own playground',
        body: [
          'The flyers are where I got to experiment the most. Every event was a chance to try a new layout, typeface or mood while still feeling like the same collective.',
          'For bigger nights I made a set of artist cards so each DJ had something to share on their own.',
        ],
        media: [
          { src: '/projects/colectivo-under/mad-radio.jpg', alt: 'Mad Radio Takeover', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/lucky-7.jpg', alt: 'Lucky 7 After Dark', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/the-opening.jpg', alt: 'The Opening', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/the-closing.jpg', alt: 'The Closing', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/artist-paul-coman.jpg', alt: 'Artist card: Paul Coman', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/artist-nars.jpg', alt: 'Artist card: Nars', fit: 'contain', bg: '#000000' },
        ],
      },
      {
        label: 'Merch',
        title: 'Brand you can carry',
        body: [
          'To get the logo into more hands, I made custom lighters with the Colectivo mark. It’s something people actually keep in their pocket and pull out at every party, so the brand travels on its own.',
        ],
        media: [
          { src: '/projects/colectivo-under/merch-lighters.jpg', alt: 'Colectivo Under lighters, white and black' },
          { src: '/projects/colectivo-under/merch-batch.jpg', alt: 'A batch of finished lighters' },
        ],
      },
      {
        label: 'The nights',
        title: 'What it felt like',
        body: [
          'From packed warehouse nights to outdoor day parties, the room mattered as much as the flyer.',
          'One of my favorites was Prison Break at Vici Rooftop, one of our first nights. It sold out and became our anniversary theme: orange jumpsuits for the guests and crime scene tape around the booth.',
        ],
        media: [
          { src: '/projects/colectivo-under/night-crowd.jpg', alt: 'A packed night', wide: true },
          { src: '/projects/colectivo-under/night-beams.jpg', alt: 'Beams and haze' },
          { src: '/projects/colectivo-under/night-lights.jpg', alt: 'Lighting over the booth' },
          { src: '/projects/colectivo-under/halloween-tape.jpg', alt: 'Prison break Halloween', caption: 'Prison Break at Vici Rooftop. Photo: Santiago Avella' },
          { src: '/projects/colectivo-under/halloween-booth.jpg', alt: 'Crime scene tape on the booth', caption: 'Photo: Santiago Avella' },
          { src: '/projects/colectivo-under/halloween-dj.jpg', alt: 'DJ in a jumpsuit', caption: 'Photo: Santiago Avella' },
          { src: '/projects/colectivo-under/night-setup.jpg', alt: 'The booth' },
          { src: '/projects/colectivo-under/day-party.jpg', alt: 'Outdoor day party' },
          { src: '/projects/colectivo-under/night-booth.jpg', alt: 'Behind the decks' },
        ],
      },
      {
        label: 'Production',
        title: 'Running the night',
        body: [
          'Beyond the visuals, I ran everything else too. My job started weeks before each event with the Instagram campaigns that sold the night. Across 21 events our pages pulled close to 30,000 views, and our biggest night, The Opening, sold 281 of 287 tickets. On the night I was always the first one there and the last one to leave.',
        ],
        points: [
          { k: 'Promotion', v: 'Instagram campaigns, plus putting up flyers around the city myself.' },
          { k: 'Curation', v: 'Building each lineup around local DJs, plus international bookings.' },
          { k: 'Production', v: 'Venues, budgets and settlements.' },
          { k: 'Lighting', v: 'Designing the light for each room.' },
          { k: 'Door', v: 'Checking people in, often myself.' },
        ],
        media: [
          { src: '/projects/colectivo-under/return-to-sender.jpg', alt: 'Return to Sender', fit: 'contain', bg: '#000000' },
          { src: '/projects/colectivo-under/rituals.jpg', alt: 'Rituals', fit: 'contain', bg: '#000000' },
        ],
      },
    ],
  },
  {
    slug: 'exalt',
    index: '00',
    title: 'Exalt XLR8',
    kicker: 'An AI-powered helmet and app that coaches motorcycle riders on the track.',
    summary:
      'A helmet that pairs with the bike and a companion app to give riders real-time coaching, tailored training programs and haptic feedback while they ride.',
    type: 'Product design · UX · Brand',
    year: '2024',
    award: 'Indigo Design Award 2025',
    palette: ['#ff3355', '#c9ccd1', '#0a0a0c'],
    meta: [
      { k: 'Role', v: 'UX and product design' },
      { k: 'Timeline', v: 'SCAD, 2024' },
      { k: 'Type', v: 'Wearable + mobile app' },
      { k: 'Recognition', v: 'Indigo Design Award 2025' },
    ],
    cover: { src: '/projects/exalt/hero.jpg', alt: 'Exalt XLR8 helmet', wide: true },
    link: { label: 'the Indigo Award page', href: 'https://www.indigoaward.com/winners/9382' },
    sections: [
      {
        label: 'The ask',
        title: 'Coaching at 120 mph',
        body: [
          'Track riders learn by feel and by whatever a coach can tell them between sessions. We wanted to give them metrics and feedback in the moment, without changing how they ride.',
        ],
      },
      {
        label: 'Design',
        title: 'Familiar on the outside',
        body: [
          'Riders are picky about their helmets, so we kept the design as unintrusive as possible and stayed close to the shape of helmets they already trust. The technology lives inside.',
          'The helmet gives real-time feedback through virtual coaching and adaptive haptics, so a rider can feel a correction instead of reading one.',
        ],
        media: [
          { src: '/projects/exalt/helmet.jpg', alt: 'Inside the helmet', wide: true },
        ],
      },
      {
        label: 'The app',
        title: 'Everything after the session',
        body: [
          'The companion app covers what happens off the bike: live data during a session, a rider profile, and training programs built around how you actually ride.',
        ],
        points: [
          { k: 'Dashboard', v: 'Live speed and bike data during a session.' },
          { k: 'Profile', v: 'Rider stats, goals and gear.' },
          { k: 'Training', v: 'Tailored programs and track maps.' },
        ],
        media: [
          { src: '/projects/exalt/screens.jpg', alt: 'App screens: Dashboard, Profile, Training', wide: true, fit: 'contain', bg: '#111111' },
        ],
      },
      {
        label: 'Testing',
        title: 'Real riders',
        body: [
          'We tested the concept with multiple riders and used their feedback to keep developing it. For testing we built a physical prototype, down to the packaging and a quick-start card that walks riders through calibrating the helmet.',
        ],
        media: [
          { src: '/projects/exalt/prototype-kit.jpg', alt: 'Physical prototype with packaging and quick-start card', fit: 'contain', bg: '#f2f2f0' },
          { src: '/graphic/exalt-poster.jpg', alt: 'Exalt XLR8 poster', fit: 'contain', bg: '#0a0a0c' },
        ],
      },
    ],
  },
];

const order = ['redline', 'step', 'colectivo-under', 'ooln', 'exalt', 'club-de-lo-roto'];
export const projects: Project[] = order
  .map((slug) => allProjects.find((p) => p.slug === slug)!)
  .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, '0') }));

// ─────────────────────────────────────────────────────────────
//  Side projects: small things I built for myself.
// ─────────────────────────────────────────────────────────────
export type SideProject = { title: string; type: string; img: string; w: number; h: number; bg?: string; body: string[]; link?: { label: string; href: string } };

export const side: SideProject[] = [
  {
    title: 'Ctrl+Bill',
    type: 'Web app · Client tool',
    img: '/side/ctrl-bill.jpg', w: 2000, h: 1018, bg: '#f3eee6',
    body: [
      'Paste the week, get the invoice. I built this for a client who runs a cleaning team: they paste the schedule their team already writes, and it sorts every property into its price tier, totals the bill and keeps a log of who cleaned what.',
      'Pricing tiers are editable, reports export to CSV, and past weeks are saved. They have used it every week since I built it.',
    ],
  },
  {
    title: 'SF Day Guide',
    type: 'Web app',
    img: '/side/sf-guide.jpg', w: 1568, h: 654, bg: '#131418',
    body: [
      'I built this to find my way around San Francisco during Tech Week, a city I didn’t know. It plans a day across 93 hand-picked stops with hours, costs and Muni routes.',
      'It ended up being my business card. I’d show it to people I met, they always loved the crime report feature, and I got real feedback on it.',
    ],
    link: { label: 'Try it', href: 'https://jbohmer12.github.io/sf-guide/' },
  },
  {
    title: 'Crate',
    type: 'Web app',
    img: '/side/crate.jpg', w: 1160, h: 757,
    body: [
      'A fun project for myself. As a vinyl collector I wanted to know which of my records are the hardest to find and the least owned, so Crate estimates the value and rarity of my collection.',
      'I kept adding whatever I needed while digging and DJing, and now it has a small group of beta testers.',
    ],
    link: { label: 'Try it', href: 'https://jbohmer12.github.io/Crate/' },
  },
];

// ─────────────────────────────────────────────────────────────
//  Earlier work: school product projects, shown as a compact strip.
// ─────────────────────────────────────────────────────────────
export type EarlierProject = { title: string; type: string; year: string; imgs: { src: string; w: number; h: number; alt: string; poster?: string }[]; body: string };

export const earlier: EarlierProject[] = [
  {
    title: 'Peercam',
    type: 'Product · UX · for Peerspace',
    year: '2024',
    imgs: [
      { src: '/more/peercam-a.jpg', w: 2000, h: 1094, alt: 'Peercam device' },
      { src: '/more/peercam-c.jpg', w: 2000, h: 1250, alt: 'Peercam with Peerspace branding' },
    ],
    body: 'A camera for Peerspace events that doubles as an icebreaker. LEDs guide guests through small group games in the awkward first hour, and the companion app turns the photos into a shared scrapbook. We field tested it at a real event.',
  },
  {
    title: 'Toggle',
    type: 'Product · UX · Wearable',
    year: '2024',
    imgs: [
      { src: '/more/toggle-vision.mp4', poster: '/more/toggle-vision-poster.jpg', w: 1280, h: 720, alt: 'From the Toggle vision video: pairing the earpiece with the app' },
      { src: '/more/toggle-b.jpg', w: 1920, h: 1080, alt: 'Toggle case open and closed' },
    ],
    body: 'An earpiece that helps people with ADHD focus: tailored work sessions, noise blocking and progress tracking. The tagline was "meant to be deleted," because the goal is to build habits good enough that you stop needing it.',
  },
];

export const site = {
  name: 'Joaquin Böhmer',
  role: 'Designer',
  location: 'Miami, FL. Working remotely',
  email: 'jbohmer12@gmail.com',
  calendar: 'https://cal.com/joaquin-bohmer/30min',
  linkedin: 'https://www.linkedin.com/in/joaquin-boehmer/',
  github: 'https://github.com/jbohmer12',
  resume: '/resume.pdf',
};

export const awards = [
  { name: 'Red Dot', detail: 'Junior Award 2025, for STEP' },
  { name: 'Indigo Design Award', detail: '2025, for Exalt XLR8' },
];

export const experience = [
  { when: '2025–Now', what: 'Independent product designer & developer', where: 'Redline, Club de lo Roto, client tools' },
  { when: '2025', what: 'UX intern, led product design', where: 'Ooln, AI trading co-pilot' },
  { when: '2023–Now', what: 'Founder', where: 'Colectivo Under: 21 events, 2,600+ tickets, $26K+ revenue' },
  { when: '2022', what: 'Head of visuals & design', where: 'Misfits, audiovisual studio in Cali' },
  { when: '2018', what: 'Media & marketing intern', where: 'KTM North America, Junior Racing Program' },
];

// ─────────────────────────────────────────────────────────────
//  Graphic & print: masonry grid on the homepage.
//  w/h = pixel size of the file (keeps true proportions, no cropping).
//  span: 'wide' = 2 columns, 'full' = whole row.
// ─────────────────────────────────────────────────────────────
export type GraphicItem = { src: string; w: number; h: number; title: string; type: string; span?: 'wide' | 'full' };

export const graphic: GraphicItem[] = [
  { src: '/graphic/jack-spread-1.jpg', w: 2400, h: 729, title: 'In The Beginning (There Was Jack)', type: 'Editorial spread', span: 'full' },
  { src: '/graphic/sunwaves-poster.jpg', w: 1479, h: 2000, title: 'Sunwaves 28', type: 'Festival campaign · Poster' },
  { src: '/graphic/found-on-39th.jpg', w: 1080, h: 1350, title: 'Found on 39th', type: 'Pop-up poster' },
  { src: '/graphic/sunwaves-banner.jpg', w: 2400, h: 1318, title: 'Sunwaves 28', type: 'Festival campaign · Banner', span: 'wide' },
  { src: '/graphic/salomon-function.jpg', w: 1600, h: 900, title: 'Salomon FSF case study', type: 'Presentation design', span: 'wide' },
  { src: '/graphic/valentines.jpg', w: 1147, h: 1529, title: 'Valentine’s Day Pop-up', type: 'Event poster' },
  { src: '/graphic/playing-cards.jpg', w: 1800, h: 1423, title: 'Playing card deck', type: 'Illustration · Packaging' },
  { src: '/graphic/jack-spread-3.jpg', w: 2400, h: 729, title: 'In The Beginning (There Was Jack)', type: 'Editorial spread', span: 'full' },
  { src: '/graphic/typeface-sketch.jpg', w: 1309, h: 1800, title: 'Custom typeface', type: 'Type design · WIP' },
  { src: '/graphic/salomon-lineup.jpg', w: 1600, h: 900, title: 'Salomon FSF case study', type: 'Presentation design', span: 'wide' },
  { src: '/graphic/vinyl-photo.jpg', w: 1200, h: 1800, title: 'Off Beat on Time', type: 'Hand-bound book · Vinyl cover' },
  { src: '/graphic/agents-of-change.jpg', w: 1160, h: 873, title: 'Off Beat on Time', type: 'Spread · Agents of Change' },
  { src: '/graphic/offbeat-disco.jpg', w: 2000, h: 1333, title: 'Off Beat on Time', type: 'Printed spread · Disco', span: 'wide' },
  { src: '/graphic/offbeat-stitching.jpg', w: 1333, h: 2000, title: 'Off Beat on Time', type: 'Hand stitching detail' },
  { src: '/graphic/isometric.jpg', w: 1800, h: 1200, title: 'Isometric storefront', type: 'Illustration', span: 'wide' },
];
