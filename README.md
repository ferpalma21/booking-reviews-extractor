# booking-reviews-extractor

`booking-reviews-extractor` is a lightweight Node.js module to extract review scores and featured reviews from public Booking.com hotel pages.  
It uses `cheerio` for fast HTML parsing — no Puppeteer or headless browser required.

---

## ✨ Features

- 📊 Extract overall review score
- 🗣️ Extract featured user reviews (name, country, text)
- 🌐 Supports localized labels (English, Spanish, French, German)
- ⚡ Lightweight (no Puppeteer)
- 📦 Simple CommonJS export

---

## 📦 Installation

```bash
npm install -S booking-reviews-extractor
```
## 🔧 Usage

### Basic Example:
```
const { bookingRequest } = require('booking-reviews-extractor');

(async () => {
  const url = 'https://www.booking.com/hotel/example.html';
  const result = await bookingRequest(url);
  console.log(result);
})();
```

### Example Output:
```
{
  "score": {
    "score": 8.9,
    "text": "Fabulous"
  },
  "reviews": [
    {
      "name": "Marie",
      "country": "France",
      "text": "Great location and clean room!"
    },
    {
      "name": "Tom",
      "country": "Germany",
      "text": "Very friendly staff and good breakfast."
    }
  ]
}
```
