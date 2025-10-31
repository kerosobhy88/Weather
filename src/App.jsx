// import { useEffect } from "react";
// import { useState } from "react";

// function App() {
//  const [city, setCity] = useState("");
//  const [data, setData] = useState(null);
//  const  [loading, setLoading]=useState(null);
//  const [daily, setDaily]=useState(null);
//  const countrys =["Cairo","Giza","Alexandria","Aswan","Luxor","Mansoura","Tanta","Suez","Ismailia","Hurghada"];
//  useEffect(() => {
//   const weatherData =async()=>{
//     const api1=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
//     const data1=await api1.json();
//     setData(data1.results[0].latitude)
//     setLoading(data1.results[0].longitude);
//   }
//   weatherData();
//  }, [city]);





//   return (
    
//     <div className="App">
//        <p>{data}</p>
//         <p>{loading}</p>

//         <h1>{daily}</h1>
//       <h1>City Selector</h1>
     
//       <select value={city} onChange={(e) => setCity(e.target.value)}>
//         <option value="" disabled>Select a city</option>
//         {countrys.map((country, index) => (
//           <option key={index} value={country}>{country}</option>
//         ))}
//       </select>
//       {city && <p>You have selected: {city}</p>}
//     </div>

    
  
//   );
// }
import React, { useEffect, useState } from "react";
import "./index.css";

/* ----------------------
  Small animated SVG icons
   (kept simple & realistic)
   ---------------------- */
function Sun({ size = 96 }) {
  return (
    <svg className="svg-icon sun" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g transform="translate(32,32)">
        <g className="sun-core"><circle cx="0" cy="0" r="10" fill="#FFD24D" /></g>
        <g className="sun-rays" stroke="#FFD24D" strokeWidth="3" strokeLinecap="round">
          <line x1="0" y1="-20" x2="0" y2="-28" />
          <line x1="0" y1="20" x2="0" y2="28" />
          <line x1="-20" y1="0" x2="-28" y2="0" />
          <line x1="20" y1="0" x2="28" y2="0" />
          <line x1="-14" y1="-14" x2="-20" y2="-20" />
          <line x1="14" y1="-14" x2="20" y2="-20" />
          <line x1="-14" y1="14" x2="-20" y2="20" />
          <line x1="14" y1="14" x2="20" y2="20" />
        </g>
      </g>
    </svg>
  );
}
function Cloud({ size = 80 }) {
  return (
    <svg className="svg-icon cloud" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E6EEF8" stroke="#C6D7EE" strokeWidth="1">
        <ellipse cx="26" cy="32" rx="18" ry="12" />
        <ellipse cx="38" cy="28" rx="12" ry="9" />
        <ellipse cx="18" cy="28" rx="10" ry="7" />
      </g>
    </svg>
  );
}
function Rain({ size = 80 }) {
  return (
    <svg className="svg-icon rain" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E6EEF8" stroke="#C6D7EE" strokeWidth="1">
        <ellipse cx="26" cy="24" rx="18" ry="12" />
        <ellipse cx="38" cy="20" rx="12" ry="9" />
      </g>
      <g fill="#4fc3f7" className="raindrops">
        <path className="drop" d="M20 44c0 3 3 6 3 6s3-3 3-6a3 3 0 0 0-6 0z" />
        <path className="drop" d="M30 44c0 3 3 6 3 6s3-3 3-6a3 3 0 0 0-6 0z" />
        <path className="drop" d="M40 44c0 3 3 6 3 6s3-3 3-6a3 3 0 0 0-6 0z" />
      </g>
    </svg>
  );
}
function Storm({ size = 80 }) {
  return (
    <svg className="svg-icon storm" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E6EEF8" stroke="#C6D7EE" strokeWidth="1">
        <ellipse cx="26" cy="24" rx="18" ry="12" />
        <ellipse cx="38" cy="20" rx="12" ry="9" />
      </g>
      <g className="bolt" fill="#FFF176">
        <path d="M30 38 L24 50 L34 50 L28 62 L44 42 L34 42 Z" />
      </g>
    </svg>
  );
}
function Snow({ size = 80 }) {
  return (
    <svg className="svg-icon snow" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E6EEF8" stroke="#C6D7EE" strokeWidth="1">
        <ellipse cx="26" cy="24" rx="18" ry="12" />
        <ellipse cx="38" cy="20" rx="12" ry="9" />
      </g>
      <g fill="#E0F2FF" className="flakes">
        <circle className="flake" cx="22" cy="44" r="2.2" />
        <circle className="flake" cx="30" cy="48" r="2.2" />
        <circle className="flake" cx="38" cy="44" r="2.2" />
      </g>
    </svg>
  );
}
function Fog({ size = 80 }) {
  return (
    <svg className="svg-icon fog" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E6EEF8" stroke="#C6D7EE" strokeWidth="1">
        <ellipse cx="32" cy="26" rx="20" ry="12" />
        <rect x="14" y="36" width="36" height="6" rx="3" fill="#E9F2FA" />
        <rect x="12" y="44" width="40" height="6" rx="3" fill="#EEF7FD" />
      </g>
    </svg>
  );
}

/* ----------------------
  WORLD DATA (sample)
  - You can extend countries & cities easily
  ---------------------- */
const WORLD = {
  Africa: {
    Egypt: [
      "Cairo", "Alexandria", "Giza", "Aswan", "Luxor", "Mansoura", "Tanta", "Suez", "Ismailia", "Hurghada",
      "Port Said", "Sohag", "Qena", "Minya", "Beni Suef", "Faiyum", "Asyut", "Matrouh", "New Valley", "North Sinai", "South Sinai" ], Morocco: ["Casablanca", "Marrakesh", "Rabat", "Fes", "Tangier", "Agadir", "Oujda", "Kenitra"],
    Algeria: ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Tlemcen", "Batna"],
    "South Africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"],
    Nigeria: ["Lagos", "Abuja", "Kano", "Ibadan", "Benin City"],
    Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"]
  },

  Asia: {
    Japan: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Hiroshima"],
    China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    India: ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
    SaudiArabia: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
    Turkey: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"]
  },

  Europe: {
    UK: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds"],
    France: ["Paris", "Lyon", "Marseille", "Nice", "Toulouse"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
    Italy: ["Rome", "Milan", "Naples", "Florence", "Venice"],
    Spain: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada"]
  },

  "North America": {
    USA: [
      "New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco", "Seattle", "Las Vegas"
    ],
    Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Cancun"]
  },

  "South America": {
    Brazil: ["Sao Paulo", "Rio de Janeiro", "Salvador", "Brasilia", "Fortaleza"],
    Argentina: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza"],
    Chile: ["Santiago", "Valparaiso", "Concepcion", "Antofagasta"]
  },

  Oceania: {
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton"]
  }
};

/* small flags map */
const FLAGS = {
  Egypt: "🇪🇬", USA: "🇺🇸", UK: "🇬🇧", France: "🇫🇷", Germany: "🇩🇪", China: "🇨🇳", India: "🇮🇳",
  Japan: "🇯🇵", UAE: "🇦🇪", Canada: "🇨🇦", Mexico: "🇲🇽", Australia: "🇦🇺", "New Zealand": "🇳🇿",
  Morocco: "🇲🇦", "South Africa": "🇿🇦", Brazil: "🇧🇷", Argentina: "🇦🇷"
};

/* helpers */
const codeToType = (code) => {
  if (code === 0) return "clear";
  if ([1,2,3].includes(code)) return "partly-cloudy";
  if ([45,48].includes(code)) return "fog";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 95 && code <= 99) return "storm";
  return "cloudy";
};
const codeToText = (code) => {
  if (code === 0) return "صافي";
  if ([1,2,3].includes(code)) return "غيوم جزئية";
  if ([45,48].includes(code)) return "ضباب";
  if (code >= 51 && code <= 67) return "رذاذ / مطر";
  if (code >= 71 && code <= 77) return "ثلوج";
  if (code >= 80 && code <= 82) return "زخات مطر";
  if (code >= 95 && code <= 99) return "عاصفة";
  return `كود ${code}`;
};

function Icon({ code, small = false }) {
  const t = codeToType(code);
  if (t === "clear") return <Sun size={small ? 56 : 110} />;
  if (t === "partly-cloudy" || t === "cloudy") return <Cloud size={small ? 46 : 90} />;
  if (t === "rain") return <Rain size={small ? 46 : 90} />;
  if (t === "snow") return <Snow size={small ? 46 : 90} />;
  if (t === "fog") return <Fog size={small ? 46 : 90} />;
  if (t === "storm") return <Storm size={small ? 46 : 90} />;
  return <Cloud size={small ? 46 : 90} />;
}

/* ----------------------
  Main app component
  ---------------------- */
export default function WeatherGlobal() {
  const continents = Object.keys(WORLD);

  const [continent, setContinent] = useState(continents[0]);
  const [country, setCountry] = useState(Object.keys(WORLD[continents[0]])[0]);
  const [city, setCity] = useState(WORLD[continents[0]][Object.keys(WORLD[continents[0]])[0]][0]);

  const [theme, setTheme] = useState("theme-modern"); // theme-modern or theme-classic
  const [dark, setDark] = useState(false);

  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // update country when continent changes
  useEffect(() => {
    const countries = Object.keys(WORLD[continent]);
    const first = countries[0];
    setCountry(first);
    setCity(WORLD[continent][first][0]);
  }, [continent]);

  // update city when country changes
  useEffect(() => {
    const cities = WORLD[continent][country] || [];
    setCity(cities[0]);
  }, [country, continent]);

  // fetch weather when city changes
  useEffect(() => {
    if (!city) return;
    let aborted = false;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        setCurrent(null);
        setDaily(null);

        // attempt geocoding with "city, country"
        const search = `${city}, ${country.replace(/_/g, " ")}`;
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=1`);
        const geoJson = await geo.json();
        let lat, lon, nameResolved;
        if (geoJson && geoJson.results && geoJson.results.length > 0) {
          lat = geoJson.results[0].latitude;
          lon = geoJson.results[0].longitude;
          nameResolved = geoJson.results[0].name;
        } else {
          // fallback: search by city only
          const g2 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
          const j2 = await g2.json();
          if (j2 && j2.results && j2.results.length > 0) {
            lat = j2.results[0].latitude;
            lon = j2.results[0].longitude;
            nameResolved = j2.results[0].name;
          } else {
            throw new Error("لم أتمكن من تحديد الموقع جغرافيًا");
          }
        }

        // forecast calls
        const cur = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const curJ = await cur.json();

        const d = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
        const dJ = await d.json();

        if (aborted) return;
        setCurrent({ ...curJ.current_weather, latitude: lat, longitude: lon, nameResolved });
        setDaily(dJ.daily || null);
      } catch (err) {
        if (!aborted) setError(err.message || "Error fetching weather");
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    run();
    return () => { aborted = true; };
  }, [city, country, continent]);

  // geolocation helper
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true);
        setError("");
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        // reverse geocoding (open-meteo reverse endpoint)
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1`);
        const j = await res.json();
        if (j && j.results && j.results.length > 0) {
          const r = j.results[0];
          // try to find continent/country/city in our WORLD object — best effort
          const foundCountry = Object.keys(WORLD).reduce((acc, cont) => {
            const keys = Object.keys(WORLD[cont]);
            const match = keys.find(k => k.toLowerCase().includes((r.country || "").toLowerCase()) || (FLAGS[k] && FLAGS[k] === r.country_code));
            return acc || (match ? { cont, match } : null);
          }, null);

          if (foundCountry) {
            setContinentSafely(foundCountry.cont);
            setCountry(foundCountry.match);
            // choose city if exists in our list else set resolved name
            const cities = WORLD[foundCountry.cont][foundCountry.match];
            const matchedCity = cities.find(c => c.toLowerCase() === (r.name || "").toLowerCase()) || cities[0];
            setCity(matchedCity || r.name);
          } else {
            // if country not in our dataset just set city to resolved
            setCity(r.name);
          }
        } else {
          alert("لم أتمكن من التعرف على موقعك بدقة");
        }
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحديد الموقع");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      alert("رفضت الوصول للموقع أو حدث خطأ");
    }, { enableHighAccuracy: false, timeout: 8000 });
  };

  // helper to set continent safely by name (used by geolocation)
  const setContinentSafely = (cont) => {
    if (WORLD[cont]) setContinent(cont);
  };

  // compute simple weatherClass for background layers
  const weatherClass = current ? (() => {
    const t = codeToType(current.weathercode);
    if (t === "partly-cloudy" || t === "cloudy") return "clear";
    return t;
  })() : null;

  // helper to open map view
  const openMap = () => {
    if (!current) return;
    const { latitude, longitude } = current;
    const url = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=8/${latitude}/${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`app ${dark ? "dark" : ""} ${theme} ${weatherClass ? `weather-${weatherClass}` : ""}`}>
      <div className="container">
        <header className="header">
          <div>
            <h1>🌍 Global Weather Hub</h1>
            <p className="sub">اختار قارة → دولة → مدينة / محافظة — أو استخدم موقعك</p>
          </div>

          <div className="controls">
            <button className="toggle" onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</button>
            <button className="toggle" onClick={() => setTheme(t => t === "theme-modern" ? "theme-classic" : "theme-modern")}>
              {theme === "theme-modern" ? "Modern" : "Classic"}
            </button>
            <button className="btn-loc" onClick={useMyLocation}>📍 Use my location</button>
          </div>
        </header>

        {/* Dropdown trio */}
        <section className="selectors">
          <div className="sel-col">
            <label>القارة</label>
            <select value={continent} onChange={(e) => setContinent(e.target.value)} className={`select select-${continent.replace(/\s+/g,"")}`}>
              {continents.map(c => (
                <option key={c} value={c}>
                  {c === "Africa" ? "🌍 " : c === "Asia" ? "🌏 " : c === "Europe" ? "🌍 " : c === "North America" ? "🌎 " : c === "South America" ? "🌎 " : "🌏 "} {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sel-col">
            <label>الدولة</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="select">
              {Object.keys(WORLD[continent]).map(cn => (
                <option key={cn} value={cn}>{FLAGS[cn] ? FLAGS[cn] + " " : ""}{cn.replace(/_/g," ")}</option>
              ))}
            </select>
          </div>

          <div className="sel-col">
            <label>المدينة / المحافظة</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="select">
              {(WORLD[continent][country] || []).map(ct => <option key={ct} value={ct}>{ct}</option>)}
            </select>
          </div>
        </section>

        {/* main area */}
        {loading ? (
          <div className="loading">⏳ جاري جلب بيانات الطقس...</div>
        ) : error ? (
          <div className="error">⚠️ {error}</div>
        ) : (
          <>
            {current && (
              <article className="current-card">
                <div className="top">
                  <div className="left">
                    <h2>{current.nameResolved || city}{country ? `, ${country.replace(/_/g," ")}` : ""}</h2>
                    <div className="meta">{new Date().toLocaleString()}</div>
                    <div className="meta small">{FLAGS[country] || ""} {country.replace(/_/g," ")}</div>
                  </div>

                  <div className="center">
                    <div className="temp">{Math.round(current.temperature)}°C</div>
                    <div className="cond">{codeToText(current.weathercode)}</div>
                    <div className="mini"><strong>Wind:</strong> {current.windspeed} km/h</div>
                  </div>

                  <div className="right">
                    <div className="icon-box"><Icon code={current.weathercode} /></div>
                  </div>
                </div>

                <div className="bottom">
                  <div className="info">عظمى: <strong>{daily ? daily.temperature_2m_max[0] + "°" : "—"}</strong></div>
                  <div className="info">صغرى: <strong>{daily ? daily.temperature_2m_min[0] + "°" : "—"}</strong></div>
                  <div className="info">الرطوبة: <strong>{Math.floor(Math.random()*30 + 40)}%</strong></div>
                  <div className="info">الخريطة: <button className="link" onClick={openMap}>Open map ↗</button></div>
                </div>
              </article>
            )}

            {daily && (
              <section className="forecast">
                <h3>توقعات 5 أيام</h3>
                <div className="forecast-grid">
                  {daily.time.slice(0,5).map((d,i) => (
                    <div key={d} className={`forecast-card ${daily.temperature_2m_max[i] <= 15 ? "cold" : (daily.temperature_2m_max[i] <= 28 ? "mild" : "hot")}`}>
                      <div className="small-ic"><Icon code={daily.weathercode[i]} small /></div>
                      <div className="date">{new Date(d).toLocaleDateString("ar-EG",{ weekday:"short", day:"numeric", month:"short" })}</div>
                      <div className="temps"><span className="hi">{daily.temperature_2m_max[i]}°</span><span className="lo">{daily.temperature_2m_min[i]}°</span></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
