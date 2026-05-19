# Gridaan CMS

A premium, minimalistic, and institutional school management portal and CMS backend designed for managing school websites.

- **Live URL**: [https://cmsgridaan.vercel.app/](https://cmsgridaan.vercel.app/)
- **API Endpoint**: `https://cmsgridaan.vercel.app/api/school-data`

---

## 🚀 Features

- **Administrative Control Panel**: Secure login portal for managing school data, banners, upcoming events, fee structures, academic records, and co-curricular details.
- **Dynamic Notice Board**: Live announcements marquee with mute/unmute control.
- **CBSE Mandatory Public Disclosures**: Standard-compliant layout mapping PDF links and tables of school records (NOC, safety certificates, SMC, PTA, building details).
- **Vibrant Photo Gallery & Testimonials**: Showcase campus life with interactive albums and five-star parent reviews.
- **Consumable JSON API**: Clean, CORS-enabled endpoints allowing developers to easily feed the CMS content into external marketing or admissions landing sites.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Database / Storage**: Supabase JSONB
- **Style**: Tailwind CSS
- **Icons**: Custom optimized inline SVGs and Lucide React

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anonymous-key
NEXT_PUBLIC_ADMIN_EMAIL=admin@school.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔗 Live API Integration

Integrate the CMS with any external client website (e.g. HTML, React, WordPress) by adding this script to your site:

```javascript
async function loadSchoolData() {
  try {
    const response = await fetch("https://cmsgridaan.vercel.app/api/school-data");
    const data = await response.json();
    
    // Dynamically set elements
    document.getElementById("school-name").innerText = data.schoolName;
    document.getElementById("school-phone").innerText = data.phone;
    document.getElementById("school-email").innerText = data.email;
    document.getElementById("school-address").innerText = data.address;
  } catch (error) {
    console.error("Error loading CMS school data:", error);
  }
}
window.addEventListener("DOMContentLoaded", loadSchoolData);
```
