import type { DailyExperiment, QuizQuestion } from '../types/lab';

export const DAILY_EXPERIMENTS: DailyExperiment[] = [
  {
    id: 'daily-non-newtonian',
    title: 'Oobleck: Solid ya Liquid? (Non-Newtonian Fluid)',
    category: 'Matter & Viscosity',
    timeMinutes: 5,
    materials: ['4 chammach Cornflour (Makke ka aata)', '2–3 chammach Paani', '1 Katori'],
    steps: [
      'Katori mein cornflour daalo aur dheere-dheere thoda paani mila kar smooth paste banao.',
      'Ab ungli se surface par TEZI se thappad maaro — ye rock-solid ban jayega!',
      'Ab apni ungli bilkul DHEERE se andar dubao — ye paani ki tarah andar chala jayega!',
    ],
    scienceBehind: 'Oobleck ek Non-Newtonian shear-thickening fluid hai. Tez force lagane par cornstarch particles ek saath lock hokar solid ban jaate hain; slow force par wo aaram se slip ho jaate hain.',
    safetyNote: 'Demo ke baad isse sink mein mat bahana (pipe jam ho sakta hai), dustbin mein daalna.',
  },
  {
    id: 'daily-atmospheric-pressure',
    title: 'Ulta Glass Paani Challenge (Air Pressure)',
    category: 'Atmospheric Physics',
    timeMinutes: 4,
    materials: ['1 glass poora paani se bhara', '1 stiff postcard ya thick playing card'],
    steps: [
      'Sink ke upar khade hokar glass ko kinare tak paani se bhar lo.',
      'Card ko glass ke munh par rakho aur haath se halka dabao taaki air gap na rahe.',
      'Glass ko ulta palat kar niche se haath hata lo — paani nahi girega!',
    ],
    scienceBehind: 'Bahar ki hawa (Atmospheric Pressure ~101,325 Pa) niche se card par upar ki taraf itna zabardast dhakka maarti hai ki wo glass ke paani ke wazan ko aasani se rok leti hai!',
    safetyNote: 'Sink ya balcony ke upar try karo taaki agar card slip ho toh floor gila na ho.',
  },
  {
    id: 'daily-density-tower',
    title: '3-Layer Liquid Rainbow Tower',
    category: 'Fluid Density',
    timeMinutes: 6,
    materials: ['1 tall clear glass', '2 chammach Shahad (Honey)', 'Paani (thoda food color/haldi)', '2 chammach Cooking Oil'],
    steps: [
      'Glass ke bottom mein sabse pehle Honey daalo.',
      'Side ki wall se dheere-dheere colored Paani daalo — wo honey ke upar tairne lagega!',
      'Ab sabse upar Oil daalo — teeno liquids bina mix hue 3 alag floors bana lenge!',
    ],
    scienceBehind: 'Har liquid ki Density (Mass per Volume) alag hoti hai: Honey (~1.4 g/cm³) sabse bhari hai toh neeche rehta hai, Paani (1.0 g/cm³) beech mein, aur Oil (~0.9 g/cm³) sabse halka hone se upar tairta hai.',
    safetyNote: '100% safe kitchen liquid experiment.',
  },
  {
    id: 'daily-refraction-coin',
    title: 'Gayab Sikka Wapas Laao (Light Refraction)',
    category: 'Optics & Refraction',
    timeMinutes: 4,
    materials: ['1 empty ceramic/steel cup', '1 sikka (coin)', '1 jug paani'],
    steps: [
      'Sikke ko khali cup ke bottom mein rakho aur aise angle par peeche hato jahan sikka cup ke kinare ke peeche chhup jaye.',
      'Ab bina apna sir hilaaye, kisi se cup mein paani dalwao — jaise hi cup bharega, sikka jaadu se wapas dikhne lagega!',
    ],
    scienceBehind: 'Paani se hawa mein nikalte waqt light rays mud jaati hain (Refraction). Is bending ki wajah se tumhari aankh ko sikka thoda upar utha hua dikhta hai!',
    safetyNote: '100% safe tabletop optics experiment.',
  },
  {
    id: 'daily-turmeric-indicator',
    title: 'Secret Acid-Base Invisible Ink',
    category: 'Chemistry Lab',
    timeMinutes: 7,
    materials: ['1 chammach Haldi + paani', '1 cotton bud', 'White paper', 'Baking soda ya sabun ka paani', 'Nimbu ras'],
    steps: [
      'Baking soda ko thode paani mein gholo aur cotton bud se white paper par secret message likh kar sukhne do (dikhai nahi dega!).',
      'Ab paper par haldi-paani ka paste brush karo — likha hua message turant DEEP RED chamak uthega!',
      'Upar se nimbu ras lagao toh red wapas peela hokar gayab ho jayega!',
    ],
    scienceBehind: 'Haldi mein Curcumin naam ka natural chemical indicator hota hai jo Base (pH > 7) ke contact mein laal-bhoora ho jaata hai aur Acid milne par wapas peela!',
    safetyNote: 'Wash hands after handling haldi taaki kapde peele na hon.',
  },
  {
    id: 'daily-center-of-mass',
    title: 'Impossible Spoon-Fork Balance Trick',
    category: 'Mechanics & Gravity',
    timeMinutes: 5,
    materials: ['1 steel fork', '1 steel spoon', '1 toothpick', '1 glass'],
    steps: [
      'Fork aur spoon ke heads ko aapas mein tight interlock karo.',
      'Dono ke beech ke gap mein toothpick fasaao aur toothpick ke dusre end ko glass ke kinare par tikao.',
      'Dheere se chhod do — dono bhari spoons hawa mein ek single toothpick par balance ho jayengi!',
    ],
    scienceBehind: 'Fork aur spoon ke handles aage ki taraf jhuke hone se poore system ka Center of Mass toothpick ke contact point ke bilkul niche aa jaata hai, jisse wo stable equilibrium mein rehta hai.',
    safetyNote: 'Toothpick ke sharp end se ungli sambhalo.',
  },
  {
    id: 'daily-capillary-action',
    title: 'Walking Water Rainbow (Capillary Action)',
    category: 'Plant Biology & Cohesion',
    timeMinutes: 8,
    materials: ['3 glasses', 'Paani + 2 alag colors (haldi / ink / food color)', '2 folded tissue paper strips'],
    steps: [
      'Left aur right glass mein colored paani bharo aur beech wala glass bilkul KHALI rakho.',
      'Tissue paper ke bridge bana kar dono side se khali glass mein daal do.',
      '15–30 minute mein paani gravity ke khilaf upar chadh kar khali glass mein bhar jayega aur naya mix color banayega!',
    ],
    scienceBehind: 'Isse Capillary Action kehte hain — bilkul isi tarah bade-bade ped bina kisi pump ke zameen se 100 feet upar pattiyon tak paani pahunchate hain!',
    safetyNote: '100% safe passive observation.',
  },
  {
    id: 'daily-static-water-bend',
    title: 'Bijli se Paani ki Dhaar Modo (Electrostatics)',
    category: 'Electricity & Charge',
    timeMinutes: 3,
    materials: ['1 plastic comb ya inflated balloon', 'Tap (Nal) se girta patla paani'],
    steps: [
      'Nal ko itna halka kholo ki ek bilkul patli seedhi paani ki dhaar gire.',
      'Plastic comb ko sukhe baalon mein 15 second tez ragdo.',
      'Comb ko bina chhooye paani ki dhaar ke 1 cm paas laao — paani seedhe se mud kar comb ki taraf bend ho jayega!',
    ],
    scienceBehind: 'Ragadne se comb par negative static charge aa jaata hai. Paani ke H2O molecules polar hote hain (ek end + aur ek -), isliye comb paani ke positive side ko bina touch kiye attract kar leta hai!',
    safetyNote: 'Comb ko paani mein geela mat karna warna static charge khatam ho jayega.',
  },
  {
    id: 'daily-egg-salt-float',
    title: 'Dead Sea Magic: Doobe Hue Anda/Nimbu Ko Tairao',
    category: 'Buoyancy & Solutions',
    timeMinutes: 5,
    materials: ['1 tall glass paani', '1 fresh nimbu (ya kachcha anda)', '4 chammach namak'],
    steps: [
      'Normal paani ke glass mein nimbu/anda daalo — wo sidha bottom mein doob jayega.',
      'Ab usme 3–4 chammach namak ghol kar wapas daalo — is baar wo upar tairne lagega!',
    ],
    scienceBehind: 'Namak ghulne se paani ke molecules ke beech bhari Na⁺ aur Cl⁻ ions bhar jaate hain jisse paani ki Density badh jaati hai aur Buoyant Upthrust nimbu ke wazan se zyada ho jaata hai!',
    safetyNote: '100% safe kitchen density demo.',
  },
  {
    id: 'daily-sound-hanger',
    title: 'Church Bell in Your Ears (Sound in Solids)',
    category: 'Acoustics & Waves',
    timeMinutes: 4,
    materials: ['1 metal coat hanger ya steel spoon', '2 pieces of 50cm cotton string'],
    steps: [
      'Steel spoon ya metal hanger ke beech mein dono strings baandh lo.',
      'Dono strings ke ends ko apni dono index fingers par lapet kar kaano ke bahar halke se lagao.',
      'Ab jhuk kar hanger/spoon ko table ke kinare se halka takrao — kaano mein kisi badi temple bell jaisi deep echo sunai degi!',
    ],
    scienceBehind: 'Sound waves hawa ke comparison mein solid metal aur tight string ke zariye bahut kam energy loss ke saath seedha aapke skull aur kaan tak pahunchti hain.',
    safetyNote: 'Ungli kaan ke andar mat daalna, sirf bahar ear flap par rakho.',
  },
];

export const QUIZ_POOL: QuizQuestion[] = [
  {
    id: 'q1',
    eraId: 4,
    question: 'Electric Bulb ke andar filament banane ke liye TUNGSTEN metal hi kyu use hota hai?',
    options: [
      'Kyunki Tungsten sabse sasta metal hai',
      'Kyunki iska melting point duniya ke metals mein highest (~3,422°C) hai',
      'Kyunki Tungsten magnet se chipak jaata hai',
      'Kyunki ye thanda reh kar light deta hai',
    ],
    correctIndex: 1,
    explanation: '10 Billion Percent sahi! Bulb mein filament ko ~2,500°C par glow karna padta hai — Tungsten 3,422°C tak bina pighle white-hot light deta hai.',
  },
  {
    id: 'q2',
    eraId: 4,
    question: 'Electric Fuse me TIN / Tin-Lead alloy ka wire kyu lagaya jaata hai?',
    options: [
      'Taaki wo kabhi na toote',
      'Kyunki uska melting point low (~232°C) hota hai aur overcurrent par jaldi pighal kar ghar bachata hai',
      'Kyunki wo bijli ko 2x badha deta hai',
      'Kyunki Tin ka rang chamakdar hota hai',
    ],
    correctIndex: 1,
    explanation: 'Bilkul Senku logic! Fuse ka kaam hai jaldi kurbani dena — low melting point hone se extra current aate hi wire pighal kar circuit kaat deta hai.',
  },
  {
    id: 'q3',
    eraId: 2,
    question: 'Koyla (Coal), Pencil ki nok (Graphite) aur Heera (Diamond) — teeno kis ek element ke bane hain?',
    options: ['Silicon', 'Iron', 'Carbon', 'Sulfur'],
    correctIndex: 2,
    explanation: '10 Billion Percent Carbon magic! Bas atomic arrangement aur pressure ka farq hai — flat layers = Graphite, 3D tetrahedral crystal = Diamond!',
  },
  {
    id: 'q4',
    eraId: 1,
    question: 'Stone Age mein sharp blades banane ke liye Flint ya Obsidian patthar hi kyu chunte the?',
    options: [
      'Kyunki wo bahut naram hote hain',
      'Kyunki unme Conchoidal Fracture hota hai jisse razor-sharp edge banti hai',
      'Kyunki wo paani mein tairte hain',
      'Kyunki wo magnet se bante hain',
    ],
    correctIndex: 1,
    explanation: 'High-silica Flint aur Obsidian todne par choora nahi bante, balki curved conchoidal edges bana kar surgical blade jitne sharp ho jaate hain!',
  },
  {
    id: 'q5',
    eraId: 3,
    question: 'Dr. Senku ne Stone World mein infection rokne aur mail hatane ke liye tel (oil) + wood-ash lye se kya banaya?',
    options: ['Cement', 'Glass', 'Sabun (Soap)', 'Plastic'],
    correctIndex: 2,
    explanation: 'Saponification! Oil + Base (Lye) milkar Soap aur Glycerin banate hain jo bacteria/viruses ki fatty layer tod kar saaf karte hain.',
  },
  {
    id: 'q6',
    eraId: 3,
    question: 'Haldi (Turmeric) ke paste par agar aap Sabun ya Baking Soda (Base) lagao toh uska rang kaisa ho jayega?',
    options: ['Neela (Blue)', 'Hara (Green)', 'Laal-Bhoora (Deep Red)', 'Safed (White)'],
    correctIndex: 2,
    explanation: 'Haldi ek natural pH indicator hai! Acid mein wo peela rehta hai aur Base lagate hi turant Deep Red ho jaata hai.',
  },
  {
    id: 'q7',
    eraId: 5,
    question: 'Aeroplane sirf Fuel le jaata hai, par Space Rocket apna khud ka Liquid Oxygen (LOX) bhi kyu le jaata hai?',
    options: [
      'Astronauts ke peene ke liye',
      'Kyunki space mein hawa (Vacuum) nahi hoti toh fuel jalane ke liye oxygen saath le jaani padti hai',
      'Rocket ko thanda rakhne ke liye',
      'Rocket ko halka karne ke liye',
    ],
    correctIndex: 1,
    explanation: 'Space mein zero air hai! Fuel ko chamber mein jala kar thrust paida karne ke liye rocket apna Oxidizer (Liquid O2) khud carry karta hai.',
  },
  {
    id: 'q8',
    eraId: 5,
    question: 'Agar garmi mein aap kamre ke andar Refrigerator (Fridge) ka darwaza khula chhod dein toh kamra kya hoga?',
    options: [
      'Kamra AC ki tarah thanda ho jayega',
      'Kamra thoda aur GARAM ho jayega',
      'Temperature bilkul same rahega',
      'Fridge mein barf jam jayegi',
    ],
    correctIndex: 1,
    explanation: 'Thermodynamics ka rule! Fridge jitni heat aage se kheenchta hai, peeche ki coils aur compressor usse zyada heat kamre mein hi chhod dete hain.',
  },
  {
    id: 'q9',
    eraId: 6,
    question: 'Internet ki Optical Fiber cable mein data kis form mein aur kis rule par travel karta hai?',
    options: [
      'Sound waves · Echo',
      'Laser Light Pulses · Total Internal Reflection',
      'Copper electrons · Resistance',
      'Magnetic waves · Gravity',
    ],
    correctIndex: 1,
    explanation: '10 Billion Percent light speed! Ultra-pure glass fiber ke andar laser pulses Total Internal Reflection se bounce hote hue Terabits data le jaate hain.',
  },
  {
    id: 'q10',
    eraId: 2,
    question: 'Pure Iron (Loha) mein lagbhag 1% kya milane se wo super-strong STEEL (Faulad) ban jaata hai?',
    options: ['Carbon', 'Sodium', 'Sulfur', 'Gold'],
    correctIndex: 0,
    explanation: 'Chhote Carbon atoms Iron crystal ki layers ke beech ghus kar unhe slip hone se lock kar dete hain — ban jaata hai Faulad (Steel)!',
  },
  {
    id: 'q11',
    eraId: 4,
    question: 'Solar Panel dhoop se bijli banane ke liye kis Semiconductor element ke wafers use karta hai?',
    options: ['Copper', 'Silicon', 'Aluminium', 'Tungsten'],
    correctIndex: 1,
    explanation: 'Rait (Sand / SiO2) se nikla ultra-pure Silicon dhoop ke photons absorb karke Photovoltaic Effect se seedha electric current banata hai.',
  },
  {
    id: 'q12',
    eraId: 3,
    question: 'Glass banate waqt rait (Silica) mein Soda Ash (Na2CO3) kyu milaya jaata hai?',
    options: [
      'Glass ko hara rang dene ke liye',
      'Rait ka melting point 1,700°C se kam karke ~1,400°C par pighlane ke liye',
      'Glass ko rubber jaisa lachila banane ke liye',
      'Glass ko magnet banane ke liye',
    ],
    correctIndex: 1,
    explanation: 'Pure Silica 1,700°C par pighalti hai — Soda Ash flux ka kaam karke melting point ~300°C neeche le aata hai!',
  },
  {
    id: 'q13',
    eraId: 6,
    question: 'Aapka Smartphone GPS bina Internet ke bhi sahi location kaise nikalta hai?',
    options: [
      'Mobile tower ke Wi-Fi se',
      '4+ Space Satellites ke Atomic Clock time-signals aur Einstein Relativity se',
      'Phone ke compass magnet se',
      'Bluetooth sensors se',
    ],
    correctIndex: 1,
    explanation: 'Phone sirf space ke 4 satellites se aane wale time signals ka delay (Δt) measure karke trilateration se exact location nikalta hai!',
  },
  {
    id: 'q14',
    eraId: 7,
    question: 'Sooraj (Sun) bina Oxygen ke 4.5 Billion saal se energy kaise bana raha hai?',
    options: [
      'Koyla jala kar',
      'Nuclear Fusion (Hydrogen atoms ko jod kar Helium banakar)',
      'Nuclear Fission (Uranium tod kar)',
      'Chemical Battery se',
    ],
    correctIndex: 1,
    explanation: 'Sooraj ke core mein extreme pressure aur heat se Hydrogen nuclei fuse hokar Helium bante hain aur E=mc² se massive energy nikalti hai!',
  },
  {
    id: 'q15',
    eraId: 1,
    question: 'Mitti ke ghade (Clay Pot) mein garmiyon mein paani bina bijli ke thanda kaise rehta hai?',
    options: [
      'Mitti khud barf banati hai',
      'Microscopic pores se paani bahar aakar Evaporate hota hai aur andar ki heat le jaata hai',
      'Ghada sunlight ko bijli banata hai',
      'Mitti ke andar magnet hota hai',
    ],
    correctIndex: 1,
    explanation: 'Evaporative Cooling! Liquid se vapor banne ke liye paani ghade ke andar se latent heat kheench leta hai.',
  },
  {
    id: 'q16',
    eraId: 4,
    question: 'Electric Motor ko lagatar ek hi direction mein ghumane ke liye kaunsa part har 180° par current palat-ta hai?',
    options: ['Filament', 'Split-Ring Commutator', 'Glass Dome', 'PVC Coating'],
    correctIndex: 1,
    explanation: 'Split-Ring Commutator har aadhe chakkar mein coil ki current direction flip karta hai taaki magnetic torque hamesha ek taraf push kare!',
  },
  {
    id: 'q17',
    eraId: 3,
    question: 'Haber-Bosch Process hawa ki Nitrogen (N2) aur Hydrogen se kya banata hai jisne duniya ki kheti badal di?',
    options: ['Sulfuric Acid', 'Ammonia (Fertilizer)', 'Gunpowder', 'Soap'],
    correctIndex: 1,
    explanation: '10 Billion Percent vital invention! Hawa ke N≡N triple bond ko tod kar Ammonia (NH3) banana hi modern fertilizers ka base hai.',
  },
  {
    id: 'q18',
    eraId: 5,
    question: 'Microscope mein agar Objective lens 40x ho aur Eyepiece lens 10x ho, toh total zoom kitna hoga?',
    options: ['50x', '4x', '400x', '30x'],
    correctIndex: 2,
    explanation: 'Compound Microscope mein dono lenses ka magnification multiply hota hai: 40 × 10 = 400x!',
  },
  {
    id: 'q19',
    eraId: 7,
    question: 'Hydroponics (bina mitti ki kheti) mein paani ke andar Air Pump lagana kyu zaroori hota hai?',
    options: [
      'Taaki paani mehak na maare',
      'Taaki paudhe ki jadon (roots) ko saans lene ke liye Oxygen milti rahe',
      'Taaki paani garam rahe',
      'Taaki patte neele ho jayein',
    ],
    correctIndex: 1,
    explanation: 'Roots ko bhi respiration ke liye O2 chahiye! Khade bina-hawa wale paani mein roots gal jaati hain.',
  },
  {
    id: 'q20',
    eraId: 6,
    question: 'Touchscreen ungli se chal jaati hai par dry plastic pen se kyu nahi chalti?',
    options: [
      'Screen ko sirf skin ka color pasand hai',
      'Capacitive screen ko aapki conductive human body ke electrical charge change ki zaroorat hoti hai',
      'Plastic pen halka hota hai',
      'Ungli mein garmi zyada hoti hai',
    ],
    correctIndex: 1,
    explanation: 'Capacitive screens electric field detect karti hain — hamari body conductive hai, jabki plastic insulator hone se field change nahi karta!',
  },
];

export function getDailyExperimentForDate(dateStr: string): DailyExperiment {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return DAILY_EXPERIMENTS[hash % DAILY_EXPERIMENTS.length];
}

export function drawQuizSet(count = 10): QuizQuestion[] {
  const pool = [...QUIZ_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
