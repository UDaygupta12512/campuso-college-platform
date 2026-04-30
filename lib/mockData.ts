export interface MockCollege {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  courses: string[];
  placement: number;
  avgPackage: number;
  topCompanies: string[];
  image: null;
  tier: string;
  examAccepted: string[];
  established: number;
  totalSeats: number;
  createdAt: string;
}

export const MOCK_COLLEGES: MockCollege[] = [
  { id:1, name:"Indian Institute of Technology Bombay", location:"Mumbai, Maharashtra", city:"Mumbai", state:"Maharashtra", fees:250000, rating:4.9, courses:["B.Tech","M.Tech","MBA","PhD"], placement:98.5, avgPackage:2800000, topCompanies:["Google","Microsoft","Goldman Sachs","McKinsey"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1958, totalSeats:1200, createdAt:"2024-01-01" },
  { id:2, name:"Indian Institute of Technology Delhi", location:"New Delhi, Delhi", city:"New Delhi", state:"Delhi", fees:250000, rating:4.9, courses:["B.Tech","M.Tech","MBA","PhD"], placement:97.8, avgPackage:2600000, topCompanies:["Amazon","Apple","BCG","Flipkart"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1961, totalSeats:1100, createdAt:"2024-01-01" },
  { id:3, name:"Indian Institute of Technology Madras", location:"Chennai, Tamil Nadu", city:"Chennai", state:"Tamil Nadu", fees:245000, rating:4.8, courses:["B.Tech","M.Tech","PhD","MBA"], placement:97.2, avgPackage:2500000, topCompanies:["Qualcomm","Samsung","Deloitte","Infosys"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1959, totalSeats:1050, createdAt:"2024-01-01" },
  { id:4, name:"Indian Institute of Technology Kanpur", location:"Kanpur, Uttar Pradesh", city:"Kanpur", state:"Uttar Pradesh", fees:240000, rating:4.8, courses:["B.Tech","M.Tech","PhD"], placement:96.5, avgPackage:2400000, topCompanies:["Intel","Cisco","Microsoft","Oracle"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1959, totalSeats:960, createdAt:"2024-01-01" },
  { id:5, name:"BITS Pilani", location:"Pilani, Rajasthan", city:"Pilani", state:"Rajasthan", fees:480000, rating:4.6, courses:["B.Tech","M.Tech","MBA","MSc","PhD"], placement:93.1, avgPackage:1900000, topCompanies:["Samsung","Texas Instruments","Adobe","Flipkart"], image:null, tier:"A", examAccepted:["BITSAT"], established:1964, totalSeats:2000, createdAt:"2024-01-01" },
  { id:6, name:"National Institute of Technology Trichy", location:"Tiruchirappalli, Tamil Nadu", city:"Tiruchirappalli", state:"Tamil Nadu", fees:140000, rating:4.5, courses:["B.Tech","M.Tech","MBA","PhD"], placement:92.3, avgPackage:1600000, topCompanies:["Zoho","Infosys","TCS","Cognizant"], image:null, tier:"A", examAccepted:["JEE Main"], established:1964, totalSeats:1800, createdAt:"2024-01-01" },
  { id:7, name:"Delhi Technological University", location:"New Delhi, Delhi", city:"New Delhi", state:"Delhi", fees:160000, rating:4.4, courses:["B.Tech","M.Tech","MBA","PhD"], placement:89.7, avgPackage:1400000, topCompanies:["Samsung","Deloitte","Ernst & Young","Capgemini"], image:null, tier:"A", examAccepted:["JEE Main"], established:1941, totalSeats:2300, createdAt:"2024-01-01" },
  { id:8, name:"VIT University Vellore", location:"Vellore, Tamil Nadu", city:"Vellore", state:"Tamil Nadu", fees:195000, rating:4.3, courses:["B.Tech","M.Tech","MBA","MCA"], placement:85.4, avgPackage:900000, topCompanies:["Infosys","Wipro","TCS","HCL"], image:null, tier:"B+", examAccepted:["VITEEE"], established:1984, totalSeats:8000, createdAt:"2024-01-01" },
  { id:9, name:"Manipal Institute of Technology", location:"Manipal, Karnataka", city:"Manipal", state:"Karnataka", fees:270000, rating:4.2, courses:["B.Tech","M.Tech","MBA","BCA"], placement:83.2, avgPackage:850000, topCompanies:["Wipro","Infosys","Accenture","IBM"], image:null, tier:"B+", examAccepted:["MET","JEE Main"], established:1957, totalSeats:6000, createdAt:"2024-01-01" },
  { id:10, name:"Jadavpur University", location:"Kolkata, West Bengal", city:"Kolkata", state:"West Bengal", fees:20000, rating:4.5, courses:["B.Tech","M.Tech","B.Sc","M.Sc","PhD"], placement:88.9, avgPackage:1200000, topCompanies:["TCS","Infosys","Cognizant","Wipro"], image:null, tier:"A", examAccepted:["WBJEE","JEE Main"], established:1955, totalSeats:1500, createdAt:"2024-01-01" },
  { id:11, name:"Amity University Noida", location:"Noida, Uttar Pradesh", city:"Noida", state:"Uttar Pradesh", fees:350000, rating:3.9, courses:["B.Tech","MBA","BCA","MCA","B.Sc"], placement:78.5, avgPackage:600000, topCompanies:["TCS","Wipro","Infosys","HCL"], image:null, tier:"B", examAccepted:["Amity JEE","JEE Main"], established:1995, totalSeats:12000, createdAt:"2024-01-01" },
  { id:12, name:"SRM Institute of Science and Technology", location:"Chennai, Tamil Nadu", city:"Chennai", state:"Tamil Nadu", fees:215000, rating:4.1, courses:["B.Tech","M.Tech","MBA","BCA","MCA"], placement:81.5, avgPackage:750000, topCompanies:["Infosys","TCS","Wipro","Cognizant"], image:null, tier:"B+", examAccepted:["SRMJEEE","JEE Main"], established:1985, totalSeats:10000, createdAt:"2024-01-01" },
  { id:13, name:"IIIT Hyderabad", location:"Hyderabad, Telangana", city:"Hyderabad", state:"Telangana", fees:400000, rating:4.5, courses:["B.Tech","M.Tech","PhD"], placement:95.2, avgPackage:2200000, topCompanies:["Google","Microsoft","Amazon","Flipkart"], image:null, tier:"A", examAccepted:["UGEE","JEE Main"], established:1998, totalSeats:700, createdAt:"2024-01-01" },
  { id:14, name:"Thapar Institute of Engineering", location:"Patiala, Punjab", city:"Patiala", state:"Punjab", fees:340000, rating:4.3, courses:["B.Tech","M.Tech","MBA","PhD"], placement:88.4, avgPackage:1100000, topCompanies:["Google","Amazon","Microsoft","Cisco"], image:null, tier:"A", examAccepted:["JEE Main"], established:1956, totalSeats:3000, createdAt:"2024-01-01" },
  { id:15, name:"Chandigarh University", location:"Chandigarh, Punjab", city:"Chandigarh", state:"Punjab", fees:185000, rating:4.0, courses:["B.Tech","MBA","MCA","BCA","B.Com"], placement:82.1, avgPackage:700000, topCompanies:["Infosys","Wipro","TCS","Accenture"], image:null, tier:"B+", examAccepted:["CUCET","JEE Main"], established:2012, totalSeats:15000, createdAt:"2024-01-01" },
  { id:16, name:"IIT Hyderabad", location:"Hyderabad, Telangana", city:"Hyderabad", state:"Telangana", fees:240000, rating:4.6, courses:["B.Tech","M.Tech","PhD"], placement:94.0, avgPackage:2000000, topCompanies:["Microsoft","Google","Qualcomm","Samsung"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2008, totalSeats:600, createdAt:"2024-01-01" },
  { id:17, name:"NIT Warangal", location:"Warangal, Telangana", city:"Warangal", state:"Telangana", fees:132000, rating:4.4, courses:["B.Tech","M.Tech","MBA","PhD"], placement:90.6, avgPackage:1350000, topCompanies:["Amazon","Deloitte","Infosys","KPMG"], image:null, tier:"A", examAccepted:["JEE Main"], established:1959, totalSeats:1700, createdAt:"2024-01-01" },
  { id:18, name:"Lovely Professional University", location:"Phagwara, Punjab", city:"Phagwara", state:"Punjab", fees:200000, rating:3.8, courses:["B.Tech","MBA","BCA","MCA","B.Sc"], placement:74.2, avgPackage:550000, topCompanies:["TCS","Wipro","HCL","Infosys"], image:null, tier:"B", examAccepted:["LPUNEST","JEE Main"], established:2005, totalSeats:20000, createdAt:"2024-01-01" },
  { id:19, name:"PSG College of Technology", location:"Coimbatore, Tamil Nadu", city:"Coimbatore", state:"Tamil Nadu", fees:80000, rating:4.3, courses:["B.Tech","M.Tech","MBA","MCA"], placement:87.6, avgPackage:900000, topCompanies:["Zoho","KONE","Bosch","ABB"], image:null, tier:"B+", examAccepted:["TNEA"], established:1951, totalSeats:2500, createdAt:"2024-01-01" },
  { id:20, name:"IIT BHU Varanasi", location:"Varanasi, Uttar Pradesh", city:"Varanasi", state:"Uttar Pradesh", fees:235000, rating:4.6, courses:["B.Tech","M.Tech","MBA","PhD"], placement:93.5, avgPackage:1800000, topCompanies:["Goldman Sachs","Microsoft","Amazon","Infosys"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1919, totalSeats:1300, createdAt:"2024-01-01" },
  { id:21, name:"Anna University", location:"Chennai, Tamil Nadu", city:"Chennai", state:"Tamil Nadu", fees:70000, rating:4.2, courses:["B.Tech","M.Tech","MBA","MCA","PhD"], placement:84.3, avgPackage:800000, topCompanies:["Zoho","Infosys","TCS","Cognizant"], image:null, tier:"A", examAccepted:["TNEA"], established:1978, totalSeats:3000, createdAt:"2024-01-01" },
  { id:22, name:"College of Engineering Pune", location:"Pune, Maharashtra", city:"Pune", state:"Maharashtra", fees:85000, rating:4.3, courses:["B.Tech","M.Tech"], placement:87.5, avgPackage:1050000, topCompanies:["TATA Motors","L&T","Infosys","Cognizant"], image:null, tier:"A", examAccepted:["MHT CET"], established:1854, totalSeats:1600, createdAt:"2024-01-01" },
  { id:23, name:"BMS College of Engineering", location:"Bangalore, Karnataka", city:"Bangalore", state:"Karnataka", fees:180000, rating:4.2, courses:["B.Tech","M.Tech","MBA"], placement:86.2, avgPackage:1000000, topCompanies:["Amazon","Infosys","Bosch","Siemens"], image:null, tier:"B+", examAccepted:["KCET","JEE Main"], established:1946, totalSeats:2500, createdAt:"2024-01-01" },
  { id:24, name:"KIIT University", location:"Bhubaneswar, Odisha", city:"Bhubaneswar", state:"Odisha", fees:350000, rating:4.1, courses:["B.Tech","MBA","Law","MCA","BCA"], placement:80.3, avgPackage:750000, topCompanies:["Infosys","TCS","Wipro","Accenture"], image:null, tier:"B+", examAccepted:["KIITEE","JEE Main"], established:1992, totalSeats:8000, createdAt:"2024-01-01" },
  { id:25, name:"Shiv Nadar University", location:"Greater Noida, Uttar Pradesh", city:"Greater Noida", state:"Uttar Pradesh", fees:600000, rating:4.3, courses:["B.Tech","M.Tech","MBA","B.Sc","PhD"], placement:86.5, avgPackage:1300000, topCompanies:["HCL","Amazon","Deloitte","EY"], image:null, tier:"A", examAccepted:["JEE Main","SAT"], established:2011, totalSeats:2500, createdAt:"2024-01-01" },
  { id:26, name:"NIT Surathkal", location:"Mangalore, Karnataka", city:"Mangalore", state:"Karnataka", fees:135000, rating:4.4, courses:["B.Tech","M.Tech","PhD"], placement:91.2, avgPackage:1400000, topCompanies:["Amazon","Infosys","Deloitte","KPMG"], image:null, tier:"A", examAccepted:["JEE Main"], established:1960, totalSeats:1400, createdAt:"2024-01-01" },
  { id:27, name:"PES University", location:"Bangalore, Karnataka", city:"Bangalore", state:"Karnataka", fees:385000, rating:4.2, courses:["B.Tech","M.Tech","MBA"], placement:85.6, avgPackage:1100000, topCompanies:["Amazon","Infosys","Wipro","Accenture"], image:null, tier:"B+", examAccepted:["PESSAT","JEE Main","KCET"], established:1988, totalSeats:3500, createdAt:"2024-01-01" },
  { id:28, name:"IIT Gandhinagar", location:"Gandhinagar, Gujarat", city:"Gandhinagar", state:"Gujarat", fees:245000, rating:4.5, courses:["B.Tech","M.Tech","PhD"], placement:92.8, avgPackage:1900000, topCompanies:["Microsoft","Amazon","Flipkart","Paytm"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2008, totalSeats:550, createdAt:"2024-01-01" },
  { id:29, name:"IIT Indore", location:"Indore, Madhya Pradesh", city:"Indore", state:"Madhya Pradesh", fees:238000, rating:4.5, courses:["B.Tech","M.Tech","PhD"], placement:91.5, avgPackage:1800000, topCompanies:["Microsoft","Amazon","Samsung","Goldman Sachs"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2009, totalSeats:520, createdAt:"2024-01-01" },
  { id:30, name:"BITS Pilani Goa Campus", location:"Goa, Goa", city:"Goa", state:"Goa", fees:475000, rating:4.5, courses:["B.Tech","M.Sc","MSc-Tech"], placement:91.7, avgPackage:1800000, topCompanies:["Samsung","Texas Instruments","Microsoft","Cisco"], image:null, tier:"A", examAccepted:["BITSAT"], established:2004, totalSeats:1000, createdAt:"2024-01-01" },
  { id:31, name:"NIT Rourkela", location:"Rourkela, Odisha", city:"Rourkela", state:"Odisha", fees:131000, rating:4.3, courses:["B.Tech","M.Tech","MBA","PhD"], placement:89.4, avgPackage:1200000, topCompanies:["Tata Steel","Infosys","Wipro","Cognizant"], image:null, tier:"A", examAccepted:["JEE Main"], established:1961, totalSeats:1600, createdAt:"2024-01-01" },
  { id:32, name:"Graphic Era University", location:"Dehradun, Uttarakhand", city:"Dehradun", state:"Uttarakhand", fees:165000, rating:3.9, courses:["B.Tech","MBA","MCA","B.Sc"], placement:76.5, avgPackage:550000, topCompanies:["Infosys","Wipro","TCS","Cognizant"], image:null, tier:"B", examAccepted:["JEE Main"], established:1993, totalSeats:4000, createdAt:"2024-01-01" },
  { id:33, name:"Nirma University", location:"Ahmedabad, Gujarat", city:"Ahmedabad", state:"Gujarat", fees:265000, rating:4.1, courses:["B.Tech","MBA","Law","B.Pharm","M.Tech"], placement:83.4, avgPackage:900000, topCompanies:["Adani","Reliance","Wipro","Infosys"], image:null, tier:"B+", examAccepted:["JEE Main"], established:2003, totalSeats:4000, createdAt:"2024-01-01" },
  { id:34, name:"IIT Patna", location:"Patna, Bihar", city:"Patna", state:"Bihar", fees:235000, rating:4.4, courses:["B.Tech","M.Tech","PhD"], placement:90.0, avgPackage:1700000, topCompanies:["Amazon","Flipkart","Infosys","Deloitte"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2008, totalSeats:500, createdAt:"2024-01-01" },
  { id:35, name:"IIT Mandi", location:"Mandi, Himachal Pradesh", city:"Mandi", state:"Himachal Pradesh", fees:237000, rating:4.3, courses:["B.Tech","M.Tech","PhD"], placement:88.5, avgPackage:1600000, topCompanies:["Amazon","Flipkart","Wipro","Samsung"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2009, totalSeats:450, createdAt:"2024-01-01" },
  { id:36, name:"Motilal Nehru NIT Prayagraj", location:"Prayagraj, Uttar Pradesh", city:"Prayagraj", state:"Uttar Pradesh", fees:130000, rating:4.3, courses:["B.Tech","M.Tech","MBA","PhD"], placement:89.0, avgPackage:1250000, topCompanies:["Google","Amazon","Microsoft","Flipkart"], image:null, tier:"A", examAccepted:["JEE Main"], established:1961, totalSeats:1500, createdAt:"2024-01-01" },
  { id:37, name:"Symbiosis Institute of Technology", location:"Pune, Maharashtra", city:"Pune", state:"Maharashtra", fees:420000, rating:4.0, courses:["B.Tech","M.Tech","MBA"], placement:79.4, avgPackage:750000, topCompanies:["Infosys","TCS","Wipro","Atos"], image:null, tier:"B", examAccepted:["SET","JEE Main"], established:2008, totalSeats:1800, createdAt:"2024-01-01" },
  { id:38, name:"Savitribai Phule Pune University", location:"Pune, Maharashtra", city:"Pune", state:"Maharashtra", fees:50000, rating:4.0, courses:["B.Tech","M.Tech","MBA","MCA","B.Sc","M.Sc"], placement:80.0, avgPackage:750000, topCompanies:["Infosys","Wipro","TCS","Persistent"], image:null, tier:"B+", examAccepted:["MHT CET"], established:1949, totalSeats:5000, createdAt:"2024-01-01" },
  { id:39, name:"IIT Kharagpur", location:"Kharagpur, West Bengal", city:"Kharagpur", state:"West Bengal", fees:235000, rating:4.7, courses:["B.Tech","M.Tech","MBA","Law","PhD"], placement:95.8, avgPackage:2200000, topCompanies:["TCS","Wipro","HCL","Accenture"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1951, totalSeats:2000, createdAt:"2024-01-01" },
  { id:40, name:"IIT Roorkee", location:"Roorkee, Uttarakhand", city:"Roorkee", state:"Uttarakhand", fees:235000, rating:4.7, courses:["B.Tech","M.Tech","MBA","PhD"], placement:94.5, avgPackage:2100000, topCompanies:["BPCL","L&T","NTPC","Google"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:1847, totalSeats:1700, createdAt:"2024-01-01" },
  { id:41, name:"R.V. College of Engineering", location:"Bangalore, Karnataka", city:"Bangalore", state:"Karnataka", fees:170000, rating:4.2, courses:["B.Tech","M.Tech"], placement:86.8, avgPackage:1000000, topCompanies:["Amazon","Wipro","Infosys","Intel"], image:null, tier:"B+", examAccepted:["KCET","JEE Main"], established:1963, totalSeats:2800, createdAt:"2024-01-01" },
  { id:42, name:"Ramaiah Institute of Technology", location:"Bangalore, Karnataka", city:"Bangalore", state:"Karnataka", fees:155000, rating:4.1, courses:["B.Tech","M.Tech","MBA"], placement:84.3, avgPackage:900000, topCompanies:["Bosch","Infosys","TCS","Wipro"], image:null, tier:"B+", examAccepted:["KCET","JEE Main"], established:1962, totalSeats:3000, createdAt:"2024-01-01" },
  { id:43, name:"Pune Institute of Computer Technology", location:"Pune, Maharashtra", city:"Pune", state:"Maharashtra", fees:120000, rating:4.2, courses:["B.Tech","M.Tech"], placement:85.0, avgPackage:900000, topCompanies:["Persistent","Infosys","Cognizant","Wipro"], image:null, tier:"B+", examAccepted:["MHT CET","JEE Main"], established:1983, totalSeats:1200, createdAt:"2024-01-01" },
  { id:44, name:"NSUT Delhi", location:"New Delhi, Delhi", city:"New Delhi", state:"Delhi", fees:100000, rating:4.2, courses:["B.Tech","M.Tech","PhD"], placement:87.3, avgPackage:1100000, topCompanies:["Samsung","Flipkart","Snapdeal","Deloitte"], image:null, tier:"A", examAccepted:["JEE Main"], established:1983, totalSeats:1400, createdAt:"2024-01-01" },
  { id:45, name:"Osmania University", location:"Hyderabad, Telangana", city:"Hyderabad", state:"Telangana", fees:35000, rating:3.8, courses:["B.Tech","MBA","B.Sc","M.Sc","Law","PhD"], placement:72.5, avgPackage:500000, topCompanies:["Infosys","TCS","Wipro","BHEL"], image:null, tier:"B", examAccepted:["TSEAMCET"], established:1918, totalSeats:4000, createdAt:"2024-01-01" },
  { id:46, name:"KJ Somaiya College of Engineering", location:"Mumbai, Maharashtra", city:"Mumbai", state:"Maharashtra", fees:200000, rating:4.0, courses:["B.Tech","M.Tech","MBA"], placement:80.5, avgPackage:800000, topCompanies:["Capgemini","Wipro","Infosys","L&T"], image:null, tier:"B+", examAccepted:["MHT CET","JEE Main"], established:1983, totalSeats:2200, createdAt:"2024-01-01" },
  { id:47, name:"KALINGA Institute of Industrial Technology", location:"Bhubaneswar, Odisha", city:"Bhubaneswar", state:"Odisha", fees:280000, rating:4.0, courses:["B.Tech","M.Tech","MBA","MCA"], placement:79.8, avgPackage:700000, topCompanies:["TCS","Wipro","Infosys","Tech Mahindra"], image:null, tier:"B+", examAccepted:["KIITEE"], established:1992, totalSeats:7000, createdAt:"2024-01-01" },
  { id:48, name:"Maharaja Sayajirao University", location:"Vadodara, Gujarat", city:"Vadodara", state:"Gujarat", fees:45000, rating:3.9, courses:["B.Tech","MBA","B.Sc","M.Sc","Law"], placement:73.4, avgPackage:550000, topCompanies:["Adani","Reliance","ONGC","BHEL"], image:null, tier:"B", examAccepted:["GUJCET","JEE Main"], established:1949, totalSeats:3000, createdAt:"2024-01-01" },
  { id:49, name:"IIT Gandhinagar", location:"Gandhinagar, Gujarat", city:"Gandhinagar", state:"Gujarat", fees:245000, rating:4.5, courses:["B.Tech","M.Tech","PhD"], placement:92.8, avgPackage:1900000, topCompanies:["Microsoft","Amazon","Flipkart","Paytm"], image:null, tier:"A+", examAccepted:["JEE Advanced"], established:2008, totalSeats:550, createdAt:"2024-01-01" },
  { id:50, name:"VIT Chennai", location:"Chennai, Tamil Nadu", city:"Chennai", state:"Tamil Nadu", fees:200000, rating:4.2, courses:["B.Tech","M.Tech","MBA"], placement:83.7, avgPackage:850000, topCompanies:["Zoho","HCL","Tech Mahindra","Infosys"], image:null, tier:"B+", examAccepted:["VITEEE"], established:2010, totalSeats:5000, createdAt:"2024-01-01" },
];

// Filter, sort, paginate mock data
export function queryMockColleges(params: {
  search?: string;
  state?: string;
  maxFees?: number;
  course?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) {
  const { search = "", state = "", maxFees, course = "", sortBy = "rating", page = 1, limit = 12 } = params;

  let results = [...MOCK_COLLEGES];

  if (search) results = results.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  if (state)  results = results.filter(c => c.state.toLowerCase().includes(state.toLowerCase()));
  if (maxFees) results = results.filter(c => c.fees <= maxFees);
  if (course)  results = results.filter(c => c.courses.includes(course));

  results.sort((a, b) => {
    if (sortBy === "fees")      return a.fees - b.fees;
    if (sortBy === "placement") return b.placement - a.placement;
    return b.rating - a.rating;
  });

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const colleges = results.slice((safePage - 1) * limit, safePage * limit);

  return { colleges, total, page: safePage, totalPages };
}

export function getMockCollegeById(id: number): MockCollege | null {
  return MOCK_COLLEGES.find(c => c.id === id) ?? null;
}

export function getMockCollegesByIds(ids: number[]): MockCollege[] {
  return ids.map(id => MOCK_COLLEGES.find(c => c.id === id)).filter(Boolean) as MockCollege[];
}
