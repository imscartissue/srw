const METRICS = {
  schoolEnvironment: { label: 'School Environment', weight: 0.30, key: 'schoolEnvironment' },
  infrastructure: { label: 'Infrastructure', weight: 0.20, key: 'infrastructure' },
  netCost: { label: 'Net Cost', weight: 0.20, key: 'netCost' },
  netBenefit: { label: 'Net Benefit', weight: 0.30, key: 'netBenefit' },
  complaint: { label: 'Complaint', weight: 0, key: 'complaint' },
};

const CATEGORY_MAP = [
  { key: 'environment', label: 'School Environment', metrics: ['schoolEnvironment'] },
  { key: 'infrastructure', label: 'Infrastructure', metrics: ['infrastructure'] },
  { key: 'cost', label: 'Net Cost', metrics: ['netCost'] },
  { key: 'benefit', label: 'Net Benefit', metrics: ['netBenefit'] },
  { key: 'complaint', label: 'Complaint', metrics: ['complaint'] },
];

function computeNetCost(school) {
  if (school.cost !== undefined) return school.cost;
  return Math.min(95, Math.round(15 * Math.sqrt((school.annualFee || 0) / 10000)));
}

function computeOverallScore(school) {
  let score = 0;
  for (const m of Object.values(METRICS)) {
    const val = m.key === 'netCost' ? computeNetCost(school) : (typeof school[m.key] === 'number' ? school[m.key] : 0);
    score += (m.key === 'netCost' ? (100 - val) : val) * m.weight;
  }
  return Math.round(score * 10) / 10;
}

function computeCategoryScores(school) {
  const cats = {};
  for (const cat of CATEGORY_MAP) {
    const vals = cat.metrics.map(m => m === 'netCost' ? computeNetCost(school) : (typeof school[m] === 'number' ? school[m] : 0));
    cats[cat.key] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10;
  }
  return cats;
}

export function rankSchools(schools) {
  return schools
    .map(s => ({ ...s, netCost: computeNetCost(s), overallScore: computeOverallScore(s), categoryScores: computeCategoryScores(s) }))
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((s, i) => ({ ...s, rank: i + 1 }));
}

export { METRICS, CATEGORY_MAP, computeOverallScore, computeCategoryScores };

const schoolsData = [
  {
    id: 6,
    name: 'Premier International IB Continuum School',
    shortName: 'PIB',
    location: 'Kathmandu Valley',
    logoInitials: 'PI',
    logoColor: '#0d9488',
    type: 'Private',
    gradeRange: '+2',
    description: 'Premier IB offers an International Baccalaureate curriculum with a focus on holistic education and global perspectives.',
    schoolEnvironment: 62.4,
    infrastructure: 75,
    netBenefit: 70,
    complaint: 'Information Unavailable',
    cost: 45,
    admissionFee: 200000,
    monthlyFee: 50000,
    annualFee: 600000,
  },
  {
    id: 8,
    name: 'Graded English Medium School',
    shortName: 'GEMS',
    location: 'Kathmandu Valley',
    logoInitials: 'GE',
    logoColor: '#2563eb',
    type: 'Private',
    gradeRange: '+2',
    description: 'GEMS (Graded English Medium School) is a well-established private school in Lalitpur known for its strong academic foundation and disciplined environment. The school offers a comprehensive education from early grades through higher secondary level. Students benefit from a supportive learning atmosphere with modern teaching approaches and a wide range of extracurricular activities.',
    schoolEnvironment: 57,
    infrastructure: 85,
    netBenefit: 70,
    complaint: 'Information Unavailable',
    cost: 50,
    admissionFee: 80000,
    monthlyFee: 25000,
    annualFee: 300000,
  },
  {
    id: 2,
    name: 'St. Xavier\'s College Maitighar',
    shortName: 'SXC M',
    location: 'Kathmandu Valley',
    logoInitials: 'SX',
    logoColor: '#b91c1c',
    type: 'Private',
    gradeRange: '+2',
    description: 'St. Xavier\'s College, Maitighar is a premier higher secondary institution with a strong Jesuit tradition. Students benefit from a wide range of extracurricular activities, a supportive alumni network, and excellent teaching staff. The college emphasizes holistic development beyond the curriculum, encouraging students to be proactive and self-directed learners. While infrastructure varies across campuses, recent renovations have improved facilities.',
    schoolEnvironment: 62,
    infrastructure: 72,
    netBenefit: 74,
    complaint: 'Information Unavailable',
    admissionFee: 36468,
    monthlyFee: 12156,
    annualFee: 145872,
  },
  {
    id: 1,
    name: 'Budhanilkantha School',
    shortName: 'BNKS',
    location: 'Kathmandu Valley',
    logoInitials: 'BS',
    logoColor: '#1a365d',
    type: 'Public',
    gradeRange: '+2',
    description: 'Budhanilkantha School is one of the most prestigious residential schools in Nepal, known for its strong academic environment, disciplined culture, and excellent alumni network. Students appreciate the competitive atmosphere that pushes them to excel, with ample resources and clubs to explore interests. The school has a strong reputation and provides quality education with good infrastructure, though some facilities show signs of age.',
    schoolEnvironment: 80,
    infrastructure: 77,
    netBenefit: 74,
    complaint: 'Information Unavailable',
    admissionFee: 105000,
    monthlyFee: 35000,
    annualFee: 420000,
  },
  {
    id: 9,
    name: 'Chelsea World School',
    shortName: 'CWS',
    location: 'Kathmandu Valley',
    logoInitials: 'CW',
    logoColor: '#059669',
    type: 'Private',
    gradeRange: '+2',
    description: 'Chelsea World School is a reputable institution in Kathmandu offering NEB +2 programs and Cambridge GCE A-Levels. The academy provides a well-rounded education with strong academic results and excellent placement records. Known for its modern facilities and dedicated faculty, Chelsea prepares students for higher education both in Nepal and abroad.',
    schoolEnvironment: 55,
    infrastructure: 80,
    netBenefit: 70,
    complaint: 'Information Unavailable',
    cost: 60,
    admissionFee: 70000,
    monthlyFee: 22000,
    annualFee: 264000,
  },
  {
    id: 3,
    name: 'Kendriya Vidyalaya',
    shortName: 'KV',
    location: 'Kathmandu Valley',
    logoInitials: 'KV',
    logoColor: '#b45309',
    type: 'Private',
    gradeRange: '+2',
    description: 'Kendriya Vidyalaya offers a strong academic curriculum aligned with Indian education standards, making it an excellent choice for students pursuing higher studies in India. The school provides good post-graduation benefits with accessible scholarships for Indian institutions. The teaching quality is generally good, though the school follows a traditional approach with strict discipline policies and a formal environment.',
    schoolEnvironment: 63,
    infrastructure: 50,
    netBenefit: 85,
    complaint: 'Information Unavailable',
    admissionFee: 66000,
    monthlyFee: 22000,
    annualFee: 264000,
  },
  {
    id: 10,
    name: 'Global School of Science',
    shortName: 'GSS',
    location: 'Kathmandu Valley',
    logoInitials: 'GS',
    logoColor: '#7c3aed',
    type: 'Private',
    gradeRange: '+2',
    description: 'Global School of Science (GSS), under Global College of Management, is a specialized +2 science college in Kathmandu. The college focuses exclusively on science education with a student-centric academic model. GSS is known for its experienced faculty and comprehensive scholarship programs, preparing students for careers in medicine, engineering, and other science fields.',
    schoolEnvironment: 48,
    infrastructure: 70,
    netBenefit: 40,
    complaint: 'Information Unavailable',
    cost: 40,
    admissionFee: 60000,
    monthlyFee: 18000,
    annualFee: 216000,
  },
  {
    id: 4,
    name: 'Kathmandu Model College',
    shortName: 'KMC',
    location: 'Kathmandu Valley',
    logoInitials: 'KM',
    logoColor: '#0f172a',
    type: 'Private',
    gradeRange: '+2',
    description: 'Kathmandu Model College (KMC) is a well-known +2 college in Kathmandu known for its academic rigor and disciplined environment. The college maintains strict policies regarding appearance and conduct, with a strong focus on academic achievement. Teachers are generally helpful for serious students, and the college provides a structured learning environment. However, some students find the rules around hairstyle and uniform to be overly strict, and the infrastructure varies between blocks.',
    schoolEnvironment: 72,
    infrastructure: 48,
    netBenefit: 65,
    complaint: 'Information Unavailable',
    admissionFee: 170001,
    monthlyFee: 56667,
    annualFee: 680004,
  },
  {
    id: 7,
    name: 'St. Xavier\'s Jawlakhel',
    shortName: 'SXC J',
    location: 'Kathmandu Valley',
    logoInitials: 'SJ',
    logoColor: '#b91c1c',
    type: 'Private',
    gradeRange: '+2',
    description: 'St. Xavier\'s Jawlakhel is a campus of St. Xavier\'s College offering a range of programs with a focus on accessible education.',
    schoolEnvironment: 40,
    infrastructure: 35,
    netBenefit: 45,
    complaint: 'Information Unavailable',
    cost: 15,
    admissionFee: 20000,
    monthlyFee: 8000,
    annualFee: 96000,
  },
  {
    id: 5,
    name: 'Uniglobe College',
    shortName: 'UC',
    location: 'Kathmandu Valley',
    logoInitials: 'UC',
    logoColor: '#7c3aed',
    type: 'Private',
    gradeRange: '+2',
    description: 'Uniglobe College is a +2 college in Kathmandu offering Science, Management, and Humanities programs. The college provides decent model sets and past papers for exam preparation, and some teachers are genuinely supportive of students\' future goals. Extracurricular activities can be beneficial for those who actively participate. However, students note that the infrastructure is cramped compared to other colleges at similar fee levels, and some find the overall experience to lack the personal connection found at other institutions.',
    schoolEnvironment: 66,
    infrastructure: 46,
    netBenefit: 38,
    complaint: 'Information Unavailable',
    admissionFee: 39501,
    monthlyFee: 13167,
    annualFee: 158004,
  },
];

export default schoolsData;
