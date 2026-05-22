// ─── TYPES ─────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  coverImage?: string;
  images: GalleryImage[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  image: string;
  qualification?: string;
  experience?: string;
  bio?: string;
}

export interface Notice {
  id: string;
  text: string;
  date: string;
  type: 'general' | 'exam' | 'holiday' | 'event' | 'urgent';
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  description: string;
  image?: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  image: string;
  linkText?: string;
  linkUrl?: string;
}

export interface CustomPage {
  id: string;
  title: string;
  content: string;
  showInMenu: boolean;
  menuGroup?: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  type: 'link' | 'page' | 'section';
  target: string;
  children?: MenuItem[];
  showInMenu: boolean;
  showInFooter: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  photo?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface DisclosureTable {
  title: string;
  rows: { field: string; detail: string; link?: string }[];
}

export interface SchoolData {
  schoolName: string;
  shortName: string;
  tagline: string;
  headerLogo: string;
  footerLogo: string;
  favicon?: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  establishedYear: string;
  affiliationBoard: string;
  affiliationNumber: string;
  schoolCode: string;
  schoolType: string;
  medium: string;
  classes: string;
  mandatoryDisclosureLink: string;
  admissionsOpen: boolean;
  admissionsText: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  email2?: string;
  phone: string;
  phone2?: string;
  whatsapp?: string;
  googleMapLink: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  twitterLink: string;
  banners: { id: string; image: string; title: string; subtitle: string; buttonText?: string; buttonLink?: string }[];
  aboutUsText: string;
  aboutUsImage: string;
  visionText: string;
  missionText: string;
  coreValues: { id: string; title: string; description: string; icon: string }[];
  highlights: { id: string; label: string; value: string; icon: string }[];
  facilities: FacilityItem[];
  chairpersonName: string;
  chairpersonMessage: string;
  chairpersonPhoto: string;
  principalName: string;
  principalMessage: string;
  principalPhoto: string;
  principalQualification: string;
  academicSections: { id: string; title: string; description: string; image?: string }[];
  subjects: { id: string; grade: string; list: string }[];
  activities: { id: string; name: string; description: string; image?: string }[];
  faculty: FacultyMember[];
  notices: Notice[];
  upcomingEvents: EventItem[];
  achievements: Achievement[];
  photoAlbums: PhotoAlbum[];
  testimonials: TestimonialItem[];
  footerAboutText: string;
  campusTimings: { day: string; time: string }[];
  officeTimings: { day: string; time: string }[];
  customPages: CustomPage[];
  disclosureData: DisclosureTable[];
}

export const initialData: SchoolData = {
  schoolName: "Gridaan School",
  shortName: "ZPS",
  tagline: "Education for a better future",
  headerLogo: "https://placehold.co/240x80/1e293b/white?text=ZPS+Logo",
  footerLogo: "https://placehold.co/240x80/ffffff/1e293b?text=ZPS+Logo",
  primaryColor: "#1e3a5f",
  accentColor: "#f59e0b",
  fontFamily: "default",
  establishedYear: "2010",
  affiliationBoard: "CBSE",
  affiliationNumber: "2133590",
  schoolCode: "71741",
  schoolType: "Co-educational",
  medium: "English Medium",
  classes: "Nursery to Class XII",
  mandatoryDisclosureLink: "/disclosure",
  admissionsOpen: true,
  admissionsText: "Admissions open for 2025–26.",
  address: "NH-28 Pipra Urf Titala Sukrauri, Hata Kushinagar, U.P.",
  city: "Kushinagar",
  state: "Uttar Pradesh",
  pincode: "274203",
  email: "zpskushinagar@gmail.com",
  phone: "9415378607",
  googleMapLink: "",
  facebookLink: "https://facebook.com",
  instagramLink: "https://instagram.com",
  youtubeLink: "https://youtube.com",
  twitterLink: "https://twitter.com",
  banners: [
    { id: "1", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800", title: "Gridaan School", subtitle: "Empowering students through academic rigor and robust moral values.", buttonText: "Explore Campus", buttonLink: "about" },
    { id: "2", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800", title: "Holistic Excellence", subtitle: "State-of-the-art infrastructure combined with traditional cultural roots.", buttonText: "View Academics", buttonLink: "academics" },
    { id: "3", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1800", title: "Nurturing Leaders", subtitle: "Committed faculty fostering intellectual curiosity and leadership.", buttonText: "Our Faculty", buttonLink: "faculty" }
  ],
  aboutUsText: "Gridaan School is situated at NH-28 Pipra Urf Titala Sukrauri, Hata Kushinagar, U.P. Affiliated with CBSE (Affiliation No: 2133590, School Code: 71741), we provide premium English Medium education from Nursery to Class XII. Our campus spans 9,295 sq. meters of lush green, secure environment equipped with modern classrooms, advanced science and computer laboratories, and vast sports facilities.",
  aboutUsImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1800",
  visionText: "To be an institution of global excellence that fosters intellectual curiosity, ethical leadership, and dedicated citizenship grounded in Indian cultural values.",
  missionText: "To provide a rigorous academic curriculum and vibrant co-curricular environment where every student discovers their unique potential and builds robust moral character.",
  coreValues: [
    { id: "1", title: "Academic Rigor", description: "Fostering deep conceptual understanding and analytical thinking.", icon: "📚" },
    { id: "2", title: "Moral Integrity", description: "Upholding honesty, discipline, and respect for all cultures.", icon: "🌟" },
    { id: "3", title: "Holistic Development", description: "Encouraging sports, arts, and community service alongside academics.", icon: "🏆" },
    { id: "4", title: "Global Perspective", description: "Equipping students with modern technological competencies.", icon: "🌐" }
  ],
  highlights: [
    { id: "1", label: "Students Enrolled", value: "1,200+", icon: "👨‍🎓" },
    { id: "2", label: "Expert Faculty", value: "22+", icon: "👩‍🏫" },
    { id: "3", label: "Campus Area", value: "9,295 m²", icon: "🏫" },
    { id: "4", label: "CBSE Affiliated", value: "100%", icon: "✅" }
  ],
  facilities: [
    { id: "1", title: "Digital Library", description: "A vast collection of reference books, journals, and CBSE digital archives in a quiet reading environment.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800", linkText: "Read More →", linkUrl: "about" },
    { id: "2", title: "Modern Science Labs", description: "State-of-the-art Physics, Chemistry, and Biology laboratories equipped with advanced apparatus for hands-on learning.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800", linkText: "View Labs →", linkUrl: "academics" },
    { id: "3", title: "Sports Complex", description: "Vast playground featuring a football pitch, volleyball courts, and indoor sports facilities fostering athletic excellence.", image: "https://images.unsplash.com/photo-1574629810360-7efbed1e9e71?q=80&w=800", linkText: "Explore Sports →", linkUrl: "activities" }
  ],
  chairpersonName: "Dr. R. K. Sharma",
  chairpersonMessage: "Welcome to Gridaan School. Our mission is to impart quality education that prepares children to excel in an increasingly complex world while staying anchored to their traditional values.",
  chairpersonPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  principalName: "Mr. Vikash Mishra",
  principalMessage: "Greetings to all parents and well-wishers! At Gridaan School, we believe that education is about empowering individual potential. Our dedicated educators work tirelessly to ensure every child thrives in a secure, dynamic learning atmosphere.",
  principalPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  principalQualification: "MA. B.ed.",
  academicSections: [
    { id: "1", title: "Primary Education (Nursery - Class V)", description: "Focusing on foundational literacy, numeracy, and joyful learning through interactive activities.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800" },
    { id: "2", title: "Middle & Secondary (Class VI - X)", description: "Rigorous CBSE curriculum developing critical inquiry, scientific aptitude, and language proficiency.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800" },
    { id: "3", title: "Senior Secondary (Class XI - XII)", description: "Comprehensive preparation in Science, Commerce, and Humanities streams for board examinations and competitive careers.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" }
  ],
  subjects: [
    { id: "1", grade: "Senior Secondary (Science)", list: "Physics, Chemistry, Mathematics, Biology, English Core, Computer Science" },
    { id: "2", grade: "Senior Secondary (Commerce)", list: "Accountancy, Business Studies, Economics, Mathematics, English Core, Physical Education" },
    { id: "3", grade: "Secondary (Class IX - X)", list: "English, Hindi / Sanskrit, Mathematics, Science, Social Science, Information Technology" }
  ],
  activities: [
    { id: "1", name: "Annual Sports Meet & Athletics", description: "Track and field events, football, basketball, and indoor games encouraging physical fitness and team spirit.", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800" },
    { id: "2", name: "Science & Innovation Exhibition", description: "Annual working model exhibitions where students showcase innovative solutions to real-world challenges.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800" }
  ],
  faculty: [
    { id: "1", name: "Mr. Vikash Mishra", designation: "Principal", department: "Administration & English", qualification: "MA. B.ed.", experience: "15 Years", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400", bio: "Passionate educator dedicated to academic rigor and value-based leadership." },
    { id: "2", name: "Mrs. Anjali Sharma", designation: "Senior PGT", department: "Mathematics", qualification: "M.Sc., B.Ed.", experience: "12 Years", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400", bio: "Making mathematics intuitive and engaging for high school students." },
    { id: "3", name: "Mr. Rajesh Verma", designation: "PGT", department: "Physics & Science Lab", qualification: "M.Sc., B.Ed.", experience: "9 Years", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400", bio: "Bringing physics concepts to life through practical experiments and demonstrations." }
  ],
  notices: [
    { id: "1", text: "Annual Examination Schedule for Session 2025-26 has been published.", date: "15-03-2026", type: "exam" },
    { id: "2", text: "Parent-Teacher Meeting (PTM) for all classes on Saturday, 28th March.", date: "12-03-2026", type: "general" },
    { id: "3", text: "Summer Vacation Camp registrations are now open in the school office.", date: "10-03-2026", type: "event" }
  ],
  upcomingEvents: [
    { id: "1", title: "Annual Day Function 2026", date: "2026-04-15", description: "Cultural performances, award ceremony, and celebration of student achievements." },
    { id: "2", title: "Inter-School Science Colloquium", date: "2026-05-10", description: "Regional science debate and quiz competition hosted at Gridaan auditorium." }
  ],
  achievements: [
    { id: "1", title: "District Top Rank in CBSE Class XII", year: "2025", description: "Three students secured 98%+ aggregate in the CBSE Board examinations.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200" },
    { id: "2", title: "Inter-School Sports Champions", year: "2025", description: "Gridaan Boys Football team won the zonal gold trophy.", image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=200" }
  ],
  photoAlbums: [
    {
      id: "1", title: "Annual Function & Celebrations", coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", images: [
        { id: "101", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", caption: "Students performing traditional folk dance" },
        { id: "102", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800", caption: "Graduation and felicitation ceremony" },
        { id: "103", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", caption: "Auditorium packed with proud parents" }
      ]
    },
    {
      id: "2", title: "Campus & Labs Infrastructure", coverImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800", images: [
        { id: "201", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800", caption: "Main academic building and lawn" },
        { id: "202", url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", caption: "Computer Science laboratory" },
        { id: "203", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800", caption: "Well-equipped library with reading zones" }
      ]
    }
  ],
  testimonials: [
    { id: "1", name: "Dr. Santosh Tripathi", role: "Parent of Aarav, Class X", message: "Gridaan School has provided an exceptional foundation for my son. The teachers are highly supportive and emphasize discipline and academic excellence.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { id: "2", name: "Priya Singh", role: "Alumnus (Batch of 2022)", message: "The values and confidence I gained at Gridaan helped me succeed at top universities. The balance between studies and sports is perfect.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" }
  ],
  footerAboutText: "Gridaan School, Kushinagar",
  campusTimings: [
    { day: "Monday – Friday", time: "8:00 AM – 2:30 PM" },
    { day: "Saturday", time: "8:00 AM – 12:30 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  officeTimings: [
    { day: "Monday – Saturday", time: "9:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  customPages: [],
  disclosureData: [
    {
      title: "A. General Information",
      rows: [
        { field: "Name of the school", detail: "Gridaan School" },
        { field: "Affiliation No", detail: "2133590" },
        { field: "School Code", detail: "71741" },
        { field: "Complete Address with pin code", detail: "NH-28 Pipra Urf Titala Sukrauri, Hata Kushinagar, U.P." },
        { field: "Principal Name & Qualification", detail: "Mr. Vikash Mishra, MA. B.ed." },
        { field: "School Email -Id", detail: "zpskushinagar@gmail.com" },
        { field: "Contact Details", detail: "(+91) 9415378607" },
      ]
    },
    {
      title: "B. Documents and Information",
      rows: [
        { field: "Copy of no objection certificate(NOC)", detail: "View Document", link: "#" },
        { field: "Copies of Affiliation/Upgradation Letter", detail: "View Document", link: "#" },
        { field: "Copies of Societies/Trust Registration", detail: "View Document", link: "#" },
        { field: "Copies of Recognition certificate (RTE)", detail: "View Document", link: "#" },
        { field: "Copy of valid Building safety certificate", detail: "View Document", link: "#" },
        { field: "Copy of valid fire Safety certificate", detail: "View Document", link: "#" },
        { field: "Copy of the DEO certificate", detail: "View Document", link: "#" },
        { field: "Copies of valid water, Health and Sanitation", detail: "View Document", link: "#" },
      ]
    },
    {
      title: "C. Result and Academics",
      rows: [
        { field: "Fee Structure of the school", detail: "Download", link: "#" },
        { field: "Annual Academic Calender", detail: "Download", link: "#" },
        { field: "List of School management committee(SMC)", detail: "Download", link: "#" },
        { field: "List of PTA members", detail: "Download", link: "#" },
        { field: "Last three Year Result of the Board", detail: "Download", link: "#" },
      ]
    },
    {
      title: "D. staff (Teaching)",
      rows: [
        { field: "Principal", detail: "1" },
        { field: "Total No. of teachers", detail: "22" },
        { field: "PGT", detail: "5" },
        { field: "TGT", detail: "8" },
        { field: "PRT", detail: "8" },
        { field: "Teachers section ratio", detail: "1:1.5" },
        { field: "Details of Special educator", detail: "NIL" },
        { field: "Details of counsellor and wellness", detail: "NIL" },
      ]
    },
    {
      title: "E. School Infrastructure",
      rows: [
        { field: "Total campus area (in square mtr)", detail: "9295" },
        { field: "No and size of the class rooms", detail: "Less than 400: 4, Greater than 500: 8, Between 400-500: 37" },
        { field: "No and size of laboratories (including computer labs)", detail: "1=174sq Mtr (Computer Lab), 3=108sq Mtr (18 X 6) (Echs)" },
        { field: "Internet facility", detail: "Yes" },
        { field: "No of Girls Toilets", detail: "7" },
        { field: "No of Boys Toilets", detail: "11" },
        { field: "Link of Youtube video of inspection", detail: "Watch Now", link: "https://www.youtube.com/watch?v=a7JQKMuvBtQ" },
      ]
    }
  ],
};