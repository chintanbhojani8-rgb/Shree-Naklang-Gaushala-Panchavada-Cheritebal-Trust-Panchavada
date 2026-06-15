import { Cow, Bill, EventItem } from './types';

const cowImages = [
  'https://images.pexels.com/photos/30147593/pexels-photo-30147593.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/35270836/pexels-photo-35270836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30604308/pexels-photo-30604308.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/36795118/pexels-photo-36795118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30147594/pexels-photo-30147594.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  'https://images.pexels.com/photos/30147592/pexels-photo-30147592.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
];

export const defaultCows: Cow[] = [
  {
    id: '1',
    name: 'ગંગા',
    breed: 'ગીર',
    age: 5,
    gender: 'Female',
    health: 'Healthy',
    weight: '350 kg',
    color: 'Brown',
    tagNumber: 'NK-001',
    photo: cowImages[0],
    price: '₹45,000',
    dateAdded: '2024-01-15',
    notes: 'Very calm and healthy cow',
  },
  {
    id: '2',
    name: 'લક્ષ્મી',
    breed: 'ગીર',
    age: 3,
    gender: 'Female',
    health: 'Healthy',
    weight: '280 kg',
    color: 'White & Brown',
    tagNumber: 'NK-002',
    photo: cowImages[1],
    price: '₹38,000',
    dateAdded: '2024-02-20',
    notes: 'Good milk production',
  },
  {
    id: '3',
    name: 'નંદી',
    breed: 'કાંકરેજ',
    age: 7,
    gender: 'Male',
    health: 'Healthy',
    weight: '450 kg',
    color: 'Grey',
    tagNumber: 'NK-003',
    photo: cowImages[3],
    price: '₹55,000',
    dateAdded: '2024-03-10',
    notes: 'Strong bull',
  },
  {
    id: '4',
    name: 'રાધા',
    breed: 'સાહિવાલ',
    age: 2,
    gender: 'Female',
    health: 'Under Treatment',
    weight: '200 kg',
    color: 'Red Brown',
    tagNumber: 'NK-004',
    photo: cowImages[2],
    price: '₹25,000',
    dateAdded: '2024-04-05',
    notes: 'Young calf, under vaccination',
  },
  {
    id: '5',
    name: 'કૃષ્ણ',
    breed: 'ગીર',
    age: 1,
    gender: 'Male',
    health: 'Healthy',
    weight: '120 kg',
    color: 'Dark Brown',
    tagNumber: 'NK-005',
    photo: cowImages[4],
    price: '₹18,000',
    dateAdded: '2024-05-12',
    notes: 'Playful calf',
  },
  {
    id: '6',
    name: 'સરસ્વતી',
    breed: 'ગીર',
    age: 6,
    gender: 'Female',
    health: 'Healthy',
    weight: '380 kg',
    color: 'Light Brown',
    tagNumber: 'NK-006',
    photo: cowImages[5],
    price: '₹50,000',
    dateAdded: '2024-06-01',
    notes: 'Excellent breed quality',
  },
  {
    id: '7',
    name: 'ગૌરી',
    breed: 'કાંકરેજ',
    age: 4,
    gender: 'Female',
    health: 'Sick',
    weight: '300 kg',
    color: 'White',
    tagNumber: 'NK-007',
    photo: cowImages[0],
    price: '₹35,000',
    dateAdded: '2024-06-15',
    notes: 'Under observation',
  },
  {
    id: '8',
    name: 'શંકર',
    breed: 'ગીર',
    age: 8,
    gender: 'Male',
    health: 'Healthy',
    weight: '500 kg',
    color: 'Dark Grey',
    tagNumber: 'NK-008',
    photo: cowImages[3],
    price: '₹60,000',
    dateAdded: '2024-07-01',
    notes: 'Senior bull, very strong',
  },
];

export const defaultBills: Bill[] = [
  { id: '1', date: '2024-06-01', description: 'Cattle Feed Purchase', amount: 15000, category: 'Feed', vendor: 'Jay Ambe Feeds' },
  { id: '2', date: '2024-06-05', description: 'Veterinary Checkup', amount: 5000, category: 'Medical', vendor: 'Dr. Patel Veterinary' },
  { id: '3', date: '2024-06-10', description: 'Water Supply', amount: 3000, category: 'Utilities', vendor: 'Jasdan Water Board' },
  { id: '4', date: '2024-06-15', description: 'Hay & Grass Purchase', amount: 12000, category: 'Feed', vendor: 'Kisan Agro' },
  { id: '5', date: '2024-06-20', description: 'Medicine Purchase', amount: 8000, category: 'Medical', vendor: 'Veterinary Pharmacy' },
  { id: '6', date: '2024-06-25', description: 'Staff Salary', amount: 25000, category: 'Salary', vendor: 'Staff' },
  { id: '7', date: '2024-07-01', description: 'Electricity Bill', amount: 4500, category: 'Utilities', vendor: 'PGVCL' },
  { id: '8', date: '2024-07-05', description: 'Maintenance & Repair', amount: 7000, category: 'Maintenance', vendor: 'Local Contractor' },
];

export const defaultEvents: EventItem[] = [
  {
    id: '1',
    title: 'ગૌ પૂજા મહોત્સવ',
    date: '2024-06-15',
    description: 'Annual cow worship festival celebrated with great devotion and community participation.',
    photos: [cowImages[0], cowImages[4]],
    videoUrl: '',
  },
  {
    id: '2',
    title: 'વેક્સિનેશન ડ્રાઈવ',
    date: '2024-07-01',
    description: 'Vaccination drive for all cattle in the gaushala conducted by certified veterinarians.',
    photos: [cowImages[2], cowImages[5]],
    videoUrl: '',
  },
];

export const LOGO_URL = 'https://plain-apac-prod-public.komododecks.com/202606/14/82LRPVQRfVjSGIKyeSjt/image.png';

export const INSTAGRAM_URL = 'https://www.instagram.com/shree_naklank_gaushala?igsh=MXJheGxlbmxia2dt';
export const YOUTUBE_URL = 'https://youtube.com/@naklanggaushalapanchavada?si=ouovUiSOJWvvYzIO';

export const CONTACTS = [
  { name: 'Sureshbhai Radadiya', phone: '9714641333' },
  { name: 'Hareshbhai Butani', phone: '9824561116' },
];

export const ADDRESS = {
  name: 'Naklank Gaushala Charitable Trust',
  taluka: 'Jasdan',
  district: 'Rajkot',
  village: 'Panchavada',
  state: 'Gujarat, India',
};

export const OPERATOR_PASSWORD = 'Ramdev@5291';
