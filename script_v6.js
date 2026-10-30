let currentUser = { username: 'admin', password: 'admin', name: 'מנהל מערכת', role: 'מנהל איכות ראשי', team: 'all', isAdmin: true };
try {
    const savedUser = localStorage.getItem('clinic_current_user');
    if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.name) currentUser = parsedUser;
    }
} catch(e) {}
let formsSchema = null;
let usersDb = [];
let filledFormsDb = [];
let departmentsDb = [];
let proceduresDb = [];
let trainingsDb = [];

function initTrainingsDb() {
    let stored = localStorage.getItem('clinic_trainings');
    if (stored) {
        trainingsDb = JSON.parse(stored);
    } else {
        trainingsDb = [
            { id: Date.now(), title: 'יישום חוק החולה הנוטה למות', url: 'dying_patient_law.html', icon: '📜', external: true },
            { id: 1, title: 'מארז מניעת זיהומים', url: 'native_infections', icon: '🦠', external: false },
            { id: 2, title: 'מארז לטיפול תומך', url: 'native_supportive_care', icon: '🤝', external: false }
        ];
    }
    let changed = false;
    trainingsDb.forEach(t => {
        if (t.url && (t.url.includes('docs.google.com') || t.url.includes('forms/d/e/'))) {
            changed = true;
            if (t.title.includes('טיפול תומך') || t.url.includes('1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q')) {
                t.url = 'native_supportive_care'; 
                t.external = false;
            } else if (t.title.includes('מניעת זיהומים') || t.url.includes('1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A')) {
                t.url = 'native_infections'; 
                t.external = false;
            } else {
                t.url = 'native_infections';
                t.external = false;
            }
        } else if (t.url === '1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q' || t.url === 'native_supportive_care') {
             t.url = 'native_supportive_care';
             t.external = false;
             changed = true;
        } else if (t.url === '1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A' || t.url === 'native_infections') {
             t.url = 'native_infections';
             t.external = false;
             changed = true;
        }
    });
    
    if (!trainingsDb.find(t => t.title === 'סימולציית תירגול לאיבחון שבריריות')) {
        trainingsDb.push({ id: Date.now() + 2, title: 'סימולציית תירגול לאיבחון שבריריות', url: 'frailty_simulation.html', icon: '👵🏼', external: true });
        changed = true;
    }

    if (changed || !stored) {
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
    }
}
initTrainingsDb();

let protocolsDb = [];
let introFeedbackDb = [];
let trainingsAnswersDb = [];

function initProtocolsDb() {
    const stored = localStorage.getItem('clinic_protocols');
    if (stored) {
        try {
            protocolsDb = JSON.parse(stored);
        } catch(e) {
            protocolsDb = [];
        }
    } else {
        protocolsDb = [];
    }
    
    function upsertProtocol(item) {
        const idx = protocolsDb.findIndex(p => p.link === item.link);
        if (idx >= 0) {
            protocolsDb[idx] = Object.assign({}, protocolsDb[idx], item);
        } else {
            protocolsDb.unshift(item);
        }
    }

    // 1. Wound Care Protocol ( סל חבישות 2024 ומקראה דירוג 1-6 )
    upsertProtocol({
        id: "proto_wound_care_2024",
        title: "פרוטוקול טיפולי בפצעים - סל חבישות מתקדמות 2024 ומקראה דירוג פצעי לחץ",
        link: "wound_care_protocol.html",
        category: "clinical",
        type: "document",
        author: "מאיה שקולניק גזית",
        desc: "פרוטוקול קליני מוסדי מלא הכולל סל חבישות מתקדמות 2024 (ספוגים, אלגינטים, סילבר, הידרוג'ל, VAC), מקראה מקיפה לדירוג פצעי לחץ 1-6 ופצע טראומטי. מותאם לתצוגת A4 והדפסה."
    });

    // 2. Admission Delirium Flowchart ( זיהוי ואבחנת דליריום בקבלה רפואית )
    upsertProtocol({
        id: "proto_delirium_admission",
        title: "זיהוי ואבחנת דליריום בקבלה רפואית: תרשים זרימה אלגוריתמי וסימנים אדומים",
        link: "delirium_admission_protocol.html",
        category: "clinical",
        type: "document",
        author: "מאיה שקולניק גזית",
        desc: "תרשים זרימה אלגוריתמי מעשי לקבלה רפואית: זיהוי שינוי חריף בהכרה, בדיקת קשב, תנודתיות ביממה, אלגוריתם CAM מלא, סימנים אדומים, DELIRIUM mnemonic ו-4 פעולות מיידיות."
    });

    // 3. Delirium Comprehensive Infographic ( דליריום בקשישים - CAM ו-3 ה-D's )
    upsertProtocol({
        id: "proto_delirium_infographic",
        title: "כרזת הדרכה: דליריום בקשישים - זיהוי מהיר, CAM ושלושת ה-D's",
        link: "delirium_comprehensive_guide.jpeg",
        category: "clinical",
        type: "infographic",
        author: "מאיה שקולניק גזית",
        desc: "אינפוגרפיקה קלינית: אלגוריתם אבחון CAM, אבחנה מבדלת 3 ה-D's (דליריום מול דמנציה ודיכאון), מודל מאזני הסיכון (פגיעות מול טריגרים), אזהרה מדליריום שקט ועקרונות מניעה HELP."
    });

    // 4. Stoma Care 5 Steps ( החלפה בטוחה של ציוד הסטומה )
    upsertProtocol({
        id: "proto_stoma_5steps",
        title: "מדריך חזותי: צעד אחר צעד - החלפה בטוחה של ציוד הסטומה (5 שלבים)",
        link: "stoma_care_5steps_guide.jpeg",
        category: "clinical",
        type: "infographic",
        author: "מאיה שקולניק גזית",
        desc: "הנחיות חזותיות לביצוע בטוח: הסרה עדינה והכנת העור, ניקוי וייבוש מלא, שימוש במגבון הגנה ומדידה 1-2 מ\"מ, הצמדת הבסיס וחימומו, וחיבור השקית והחגורה."
    });

    // 5. Flaminal Wound Healing ( ריפוי פצעים עם Flaminal )
    upsertProtocol({
        id: "proto_flaminal_guide",
        title: "מדריך קליני חזותי: ריפוי פצעים עם Flaminal (Hydro / Forte)",
        link: "flaminal_wound_guide.jpeg",
        category: "clinical",
        type: "infographic",
        author: "מאיה שקולניק גזית",
        desc: "התאמת פורמולת פלמינל לפי רמת הפרשה, 3 שלבי טיפול (נקו, מרחו 4-5 מ\"מ, כסו), 84% שיפור בניקיון רקמה נמקית Slough, תדירות החלפה וטיפים למעבר בין Hydro ל-Forte."
    });

    // 6. Existing clinical essentials
    if (!protocolsDb.find(p => p.link === 'frailty_simulation.html')) {
        protocolsDb.push({
            id: "proto_frailty_sim",
            title: "סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)",
            link: "frailty_simulation.html",
            category: "clinical",
            type: "simulation",
            desc: "לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית."
        });
    }

    if (!protocolsDb.find(p => p.link === 'hand_hygiene_5_moments.jpeg')) {
        protocolsDb.push({
            id: "proto_hand_hygiene",
            title: "חמשת הרגעים להיגיינת ידיים",
            link: "hand_hygiene_5_moments.jpeg",
            category: "infection",
            type: "infographic",
            desc: "כרזת הדרכה רב-לשונית ל-5 הרגעים להיגיינת הידיים לפי סטנדרט ארגון הבריאות העולמי (WHO)."
        });
    }

    // Clean old protocols of any Beit Hadar mention
    protocolsDb.forEach(p => {
        if (p.desc && p.desc.includes('בית הדר')) {
            p.desc = p.desc.replace(/בית הדר אשדוד/g, 'מערך הסיעוד והגריאטריה').replace(/בית הדר/g, 'המרכז הגריאטרי');
        }
        if (p.title && p.title.includes('בית הדר')) {
            p.title = p.title.replace(/בית הדר/g, '');
        }
    });

    try {
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    } catch(e) {}
}


function renderIntro() {
    let curName = (currentUser && currentUser.name) ? currentUser.name : "מנהל מערכת"; let hasAnswered = introFeedbackDb.find(f => f.user === curName);
    let feedbackForm = hasAnswered ? `<div class="card" style="margin-top: 20px; background: var(--success); color: white;">תודה שענית על המשוב!</div>` : `
    <div class="card" style="margin-top: 30px; border-top: 4px solid var(--primary-color);">
        <h3 style="margin-bottom: 15px;">משוב על הפורטל הארגוני</h3>
        <p style="margin-bottom: 15px;">נשמח לשמוע את דעתך על מנת לשפר את הפורטל (1 = כלל לא, 5 = במידה רבה מאוד).</p>
        <form onsubmit="submitIntroFeedback(event)">
            <div class="form-group">
                <label>1. עד כמה הפורטל ידידותי וקל לשימוש?</label>
                <select name="q1" required><option value="">בחר...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>2. האם הפורטל מסייע לך בעבודתך היומיומית?</label>
                <select name="q2" required><option value="">בחר...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>3. האם תהליך חיפוש הנהלים נוח?</label>
                <select name="q3" required><option value="">בחר...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>4. האם הצגת הלומדות וההדרכות ברורה?</label>
                <select name="q4" required><option value="">בחר...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>5. שביעות רצון כללית מהפורטל:</label>
                <select name="q5" required><option value="">בחר...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <button type="submit" class="btn">שלח משוב</button>
        </form>
    </div>`;

    return `
        <div class="fade-in">
            <div class="card" style="border-right: 4px solid var(--primary-color); padding: 30px;">
                <h2 style="margin-bottom: 20px;">הדרכת מבוא: משמעות הפורטל הארגוני</h2>
                <h3 style="margin-bottom: 20px; color: var(--primary-color);">חשיבות האתר לארגונים במערכת הבריאות הגריאטרית</h3>

                <!-- סרטון מבוא והדרכה -->
                <div style="margin-bottom: 25px; background: #0f172a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.12); border: 1px solid var(--border-color);">
                    <video controls preload="metadata" style="width: 100%; max-height: 480px; display: block; margin: 0 auto; background: #000;">
                        <source src="intro_video.mp4" type="video/mp4">
                        הדפדפן שלך אינו תומך בניגון וידאו.
                    </video>
                </div>

                <p style="margin-bottom: 15px; line-height: 1.8; font-size: 16px;">
                    ניהול סיכונים ובקרת איכות הם נדבכים מרכזיים בטיפול באוכלוסייה הגריאטרית. אוכלוסייה זו מאופיינת ברגישות גבוהה, ריבוי מחלות רקע (מולטי-מורבידיות), ופגיעות יתר לזיהומים ולטעויות בטיפול התרופתי.
                    <br><br>
                    <strong>מערכת "פורטל ארגוני" זו פותחה במטרה לתת מענה הוליסטי לצרכים אלו:</strong>
                </p>
                <ul style="margin-right: 20px; margin-bottom: 25px; line-height: 1.8; font-size: 16px;">
                    <li style="margin-bottom: 10px;"><strong>תיעוד ובקרה בזמן אמת:</strong> כלי בקרת האיכות הדיגיטליים מאפשרים לאתר כשלים באופן מיידי במחלקות האשפוז ולתקנם, מבלי להמתין לדוחות חודשיים.</li>
                    <li style="margin-bottom: 10px;"><strong>הטמעת נהלים ומעקב קריאה:</strong> מנגנון נהלי העבודה מבטיח שכל איש צוות מודע לנהלים המעודכנים של משרד הבריאות, תוך חיוב קריאה וריענון אחת לשנה. הדבר מקטין משמעותית חשיפה משפטית ומקצועית של המוסד.</li>
                    <li style="margin-bottom: 10px;"><strong>רצף למידה והדרכה:</strong> שילוב הלומדות בתוך פלטפורמה אחת מספק כלי Onboarding חזק לעובדים חדשים, וכן מרחב ריענון נגיש לצוותים הקיימים, כנדרש בבקרות משרד הבריאות.</li>
                    <li style="margin-bottom: 10px;"><strong>ניהול מבוסס נתונים (Data-Driven):</strong> הדשבורד וסוכן המחקר החכם מאפשרים להנהלה לזהות מגמות, לנתח התפלגויות בין מחלקות, ולקבל החלטות מבוססות נתונים אובייקטיביים.</li>
                </ul>
                <div style="background: var(--bg-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); text-align: center; margin-bottom: 30px;">
                    <h4 style="margin-bottom: 10px; color: var(--primary-color);">סיכום</h4>
                    <p style="font-size: 16px;">הפורטל מעביר את המוסד מניהול תגובתי לניהול פרואקטיבי, משפר את איכות חיי המטופל הקשיש, ומבטיח סביבת טיפול בטוחה ומקצועית יותר.</p>
                </div>

                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 30px 0;">

                <div style="display: flex; gap: 20px; align-items: center; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <img src="maya-profile.jpeg" alt="מאיה שקולניק גזית" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    <div>
                        <h3 style="margin-bottom: 5px;">נוצר על ידי: מאיה שקולניק גזית</h3>
                        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 10px;">
                            R.N, BA, M.H.A, Policy Management Specialist
                        </p>
                        <a href="cv.html" target="_blank" style="color: var(--primary-color); font-weight: bold; text-decoration: none;">📄 צפה בקורות החיים המלאים</a>
                    </div>
                </div>
            </div>
            ${feedbackForm}
        </div>
    `;
}

function submitIntroFeedback(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    let sum = parseInt(formObj.q1) + parseInt(formObj.q2) + parseInt(formObj.q3) + parseInt(formObj.q4) + parseInt(formObj.q5);
    let avg = sum / 5;
    introFeedbackDb.push({
        user: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        answers: formObj,
        score: avg
    });
    localStorage.setItem('clinic_intro_feedback', JSON.stringify(introFeedbackDb));
    showToast('תודה! המשוב התקבל בהצלחה.', 'success');
    navigate('intro');
}

let currentProtocolCategory = 'all';

function setProtocolFilter(category) {
    currentProtocolCategory = category;
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.innerHTML = renderProtocols();
}

function filterProtocolsSearch() {
    const q = (document.getElementById('protocol-search')?.value || '').toLowerCase().trim();
    document.querySelectorAll('.protocol-card-item').forEach(el => {
        const text = el.innerText.toLowerCase();
        if (!q || text.includes(q)) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

function openProtocolModal(imgSrc, title) {
    let modal = document.getElementById('protocol-image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'protocol-image-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px);
            z-index: 99999; display: flex; flex-direction: column;
            align-items: center; justify-content: center; padding: 20px;
            animation: fadeIn 0.25s ease-out;
        `;
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div style="background: var(--surface-color); color: var(--text-primary); border-radius: 16px; max-width: 1100px; width: 95%; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid var(--border-color);">
            <div style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-color);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 24px;">🖼️</span>
                    <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${title}</h3>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="${imgSrc}" target="_blank" class="btn" style="padding: 6px 14px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" title="פתח בחלון חדש / הדפסה">
                        <span>פתח בחלון נפרד ↗</span>
                    </a>
                    <button class="btn" style="background: var(--primary-color); padding: 6px 14px; font-size: 13px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;" onclick="closeProtocolModal()" title="חזרה למסך הקודם">⬅ חזרה למסך הקודם</button>
                    <button class="btn" style="background: var(--danger); padding: 6px 12px; font-size: 16px; border-radius: 8px;" onclick="closeProtocolModal()" title="סגור">✕</button>
                </div>
            </div>
            <div style="flex: 1; overflow: auto; padding: 15px; display: flex; justify-content: center; align-items: center; background: #0b1120;">
                <img src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); cursor: zoom-in;" onclick="this.style.maxHeight = this.style.maxHeight === 'none' ? '80vh' : 'none'; this.style.cursor = this.style.maxHeight === 'none' ? 'zoom-out' : 'zoom-in';" title="לחץ להגדלה/הקטנה">
            </div>
            <div style="padding: 10px 20px; font-size: 12px; color: var(--text-secondary); text-align: center; border-top: 1px solid var(--border-color); background: var(--bg-color);">
                💡 טיפ: ניתן ללחוץ על התמונה להגדלה מלאה, או על כפתור "פתח בחלון נפרד" להדפסה ותלייה במחלקה.
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.onclick = (e) => {
        if (e.target === modal) closeProtocolModal();
    };
    
    document.addEventListener('keydown', handleProtocolModalEsc);
}

function closeProtocolModal() {
    const modal = document.getElementById('protocol-image-modal');
    if (modal) { const vid = modal.querySelector('video'); if (vid) vid.pause(); modal.style.display = 'none'; }
    document.removeEventListener('keydown', handleProtocolModalEsc);
}

function handleProtocolModalEsc(e) { if (e.key === 'Escape') closeProtocolModal(); }
function openProtocolVideoModal(videoSrc, title) {
    let modal = document.getElementById('protocol-image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'protocol-image-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.25s ease-out;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `<div style="background: var(--surface-color); color: var(--text-primary); border-radius: 16px; max-width: 1000px; width: 95%; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid var(--border-color);"><div style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-color);"><div style="display: flex; align-items: center; gap: 10px;"><span style="font-size: 24px;">🎥</span><h3 style="margin: 0; font-size: 18px; font-weight: 700;">${title}</h3></div><div style="display: flex; gap: 10px; align-items: center;"><button class="btn" style="background: var(--primary-color); padding: 6px 14px; font-size: 13px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;" onclick="closeProtocolModal()">⬅ חזרה למסך הקודם</button><button class="btn" style="background: var(--danger); padding: 6px 12px; font-size: 16px; border-radius: 8px;" onclick="closeProtocolModal()" title="סגור">✕</button></div></div><div style="flex: 1; overflow: auto; padding: 15px; display: flex; justify-content: center; align-items: center; background: #000;"><video src="${videoSrc}" controls autoplay style="max-width: 100%; max-height: 75vh; border-radius: 8px;"></video></div></div>`;
    modal.style.display = 'flex';
    modal.onclick = (e) => { if (e.target === modal) closeProtocolModal(); };
    document.addEventListener('keydown', handleProtocolModalEsc);
}
function handleProtocolModalEscUnused(e) {
    if (e.key === 'Escape') closeProtocolModal();
}

function renderProtocols() {
    protocolsDb.forEach(p => {
        if (p.link === 'pharmacological_risk.html' || (p.title && p.title.includes('ניהול סיכונים פרמקולוגיים'))) {
            p.title = 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח';
            p.link = 'clinical_monitoring_guide.html';
            p.category = 'medication';
            p.desc = 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.';
        }
    });
    if (!protocolsDb.find(p => p.link === 'frailty_simulation.html')) {
        protocolsDb.push({
            id: Date.now() + 10,
            title: 'סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)',
            link: 'frailty_simulation.html',
            category: 'clinical',
            desc: 'לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית.'
        });
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    }
    const filter = currentProtocolCategory || 'all';
    const filteredList = protocolsDb.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'medication') return p.category === 'medication' || (p.title && (p.title.includes('תרופות') || p.title.includes('פרמקולוגיים')));
        if (filter === 'aspiration') return p.category === 'aspiration' || (p.title && p.title.includes('אספירציה'));
        if (filter === 'clinical') return p.category === 'clinical' || (p.title && (p.title.includes('שבריריות') || p.title.includes('עצירות')));
        if (filter === 'infographic') return p.type === 'infographic' || p.link.match(/\.(png|jpg|jpeg|webp)$/i);
        return true;
    });

    return `
        <div class="fade-in">
            <div style="margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h2 style="margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
                            <span>📑</span> טפסים ופרוטוקולים טיפוליים
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 15px; margin: 0;">
                            מאגר פרוטוקולים קליניים, כרזות ואינפוגרפיקות מקצועיות להטמעה, הדרכה ובקרה במחלקה.
                        </p>
                    </div>
                </div>

                <!-- Search and Categories -->
                <div style="display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap; align-items: center;">
                    <div style="flex: 1; min-width: 250px;">
                        <input type="text" id="protocol-search" placeholder="🔍 חיפוש פרוטוקול, נושא או אינפוגרפיקה..." oninput="filterProtocolsSearch()" style="width: 100%; padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-primary); font-size: 14px;">
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="btn" style="padding: 8px 14px; font-size: 13px; border-radius: 8px; background: ${filter === 'all' ? 'var(--primary-color)' : 'var(--surface-color)'}; color: ${filter === 'all' ? '#fff' : 'var(--text-primary)'}; border: 1px solid var(--border-color);" onclick="setProtocolFilter('all')">הכל (${protocolsDb.length})</button>
                        <button class="btn" style="padding: 8px 14px; font-size: 13px; border-radius: 8px; background: ${filter === 'medication' ? 'var(--primary-color)' : 'var(--surface-color)'}; color: ${filter === 'medication' ? '#fff' : 'var(--text-primary)'}; border: 1px solid var(--border-color);" onclick="setProtocolFilter('medication')">💊 בטיחות תרופתית</button>
                        <button class="btn" style="padding: 8px 14px; font-size: 13px; border-radius: 8px; background: ${filter === 'infographic' ? 'var(--primary-color)' : 'var(--surface-color)'}; color: ${filter === 'infographic' ? '#fff' : 'var(--text-primary)'}; border: 1px solid var(--border-color);" onclick="setProtocolFilter('infographic')">🖼️ אינפוגרפיקות וכרזות</button>
                        <button class="btn" style="padding: 8px 14px; font-size: 13px; border-radius: 8px; background: ${filter === 'aspiration' ? 'var(--primary-color)' : 'var(--surface-color)'}; color: ${filter === 'aspiration' ? '#fff' : 'var(--text-primary)'}; border: 1px solid var(--border-color);" onclick="setProtocolFilter('aspiration')">🫁 מניעת אספירציה</button>
                        <button class="btn" style="padding: 8px 14px; font-size: 13px; border-radius: 8px; background: ${filter === 'clinical' ? 'var(--primary-color)' : 'var(--surface-color)'}; color: ${filter === 'clinical' ? '#fff' : 'var(--text-primary)'}; border: 1px solid var(--border-color);" onclick="setProtocolFilter('clinical')">📋 שבריריות ועצירות</button>
                    </div>
                </div>
            </div>

            <div class="forms-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                ${filteredList.map(p => {
                    const isImg = p.link.match(/\.(png|jpg|jpeg|webp)$/i) || p.type === 'infographic';
                    const isVid = p.link.match(/\.(mp4|webm)$/i) || p.type === 'video';
                    const isHtml = p.link.match(/\.html$/i);
                    const safeTitle = (p.title || '').replace(/'/g, "\\'");
                    
                    let badgeBg = '#3b82f6';
                    let badgeText = 'פרוטוקול';
                    let icon = '📄';
                    
                    if (isImg) {
                        badgeBg = '#8b5cf6';
                        badgeText = 'אינפוגרפיקה קלינית';
                        icon = '🖼️';
                    } else if (isVid) {
                        badgeBg = '#ef4444';
                        badgeText = 'סרטון הדרכה';
                        icon = '🎥';
                    } else if (p.category === 'medication') {
                        badgeBg = '#0284c7';
                        badgeText = 'בטיחות תרופתית';
                        icon = '💊';
                    }

                    return `
                        <div class="card protocol-card-item" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: 12px; padding: 20px; transition: transform 0.2s, box-shadow 0.2s; position: relative;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                                    <span style="background: ${badgeBg}18; color: ${badgeBg}; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 20px; border: 1px solid ${badgeBg}40; display: inline-flex; align-items: center; gap: 4px;">
                                        ${icon} ${badgeText}
                                    </span>
                                </div>

                                ${isImg ? `
                                    <div style="position: relative; width: 100%; height: 160px; border-radius: 8px; overflow: hidden; margin-bottom: 14px; background: #0f172a; cursor: pointer; border: 1px solid var(--border-color);" onclick="openProtocolModal('${p.link}', '${safeTitle}')">
                                        <img src="${p.link}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0.95; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 10px;">
                                            <span style="color: white; font-size: 12px; background: rgba(0,0,0,0.5); padding: 3px 8px; border-radius: 6px; backdrop-filter: blur(4px);">🔍 לחץ להגדלה</span>
                                        </div>
                                    </div>
                                ` : ''}

                                <h3 style="margin-bottom: 8px; font-size: 17px; line-height: 1.4; color: var(--text-primary); font-weight: 700;">${p.title}</h3>
                                ${p.desc ? `<p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 16px;">${p.desc}</p>` : '<div style="margin-bottom: 16px;"></div>'}
                            </div>

                            <div style="display: flex; gap: 10px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-color);">
                                ${isImg ? `
                                    <button class="btn" style="flex: 1; padding: 9px 12px; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;" onclick="openProtocolModal('${p.link}', '${safeTitle}')">
                                        <span>🔍 תצוגה מוגדלת</span>
                                    </button>
                                    <a href="${p.link}" target="_blank" class="btn" style="background: var(--surface-color); color: var(--text-primary); border: 1px solid var(--border-color); padding: 9px 12px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;" title="פתיחה בחלון נפרד / הדפסה">
                                        <span>↗ פתח</span>
                                    </a>
                                ` : `
                                    <a href="${isVid ? 'javascript:void(0)' : p.link}" ${isVid ? `onclick="openProtocolVideoModal('${p.link}', '${safeTitle}')"` : ''} class="btn" style="width: 100%; padding: 9px 12px; font-size: 13px; text-decoration: none; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                                        <span>${isVid ? '▶ צפה בסרטון' : (isHtml ? '🩺 כניסה לפרוטוקול' : 'צפה במסמך')}</span>
                                        <span>↗</span>
                                    </a>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
                ${filteredList.length === 0 ? '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;"><p style="color: var(--text-secondary); margin: 0;">לא נמצאו פרוטוקולים התואמים את החיפוש או הסינון שנבחר.</p></div>' : ''}
            </div>
        </div>
    `;
}

function filterProcedures() {
    let q = document.getElementById('proc-search').value.toLowerCase();
    document.querySelectorAll('.procedure-item').forEach(el => {
        if (el.innerText.toLowerCase().includes(q)) el.style.display = 'block';
        else el.style.display = 'none';
    });
}

function exportProceduresExcel() {
    let csvContent = "\uFEFFשם העובד,מחלקה,תאריך ביצוע,שם הנוהל\n";
    proceduresDb.forEach(p => {
        p.readBy.forEach(r => {
            let user = usersDb.find(u => u.name === r.name) || { team: 'לא ידוע' };
            let dateStr = new Date(r.date).toLocaleDateString('he-IL');
            csvContent += `"${r.name}","${user.team}","${dateStr}","${p.title}"\n`;
        });
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "דוח_קריאת_נהלים.csv");
    link.click();
}

function exportTrainingsExcel() {
    let csvContent = "\uFEFFשם הלומדה / הדרכה,שם המבצע,מחלקה,תאריך ביצוע\n";
    trainingsAnswersDb.forEach(ans => {
        let user = usersDb.find(u => u.name === ans.user) || { team: 'לא ידוע' };
        csvContent += `"${ans.title}","${ans.user}","${user.team}","${ans.date}"\n`;
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "דוח_ביצוע_לומדות.csv");
    link.click();
}

function exportDashboardExcel() {
    let csvContent = "\uFEFFשם עובד (מגיש הבקרה),תאריך הגשה,שם טופס הבקרה,ציון\n";
    filledFormsDb.forEach(f => {
        csvContent += `"${f.user}","${f.dateFilled}","${f.formTitle}","${f.score}%"\n`;
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "דוח_מעקב_ביצועים_בקרות.csv");
    link.click();
}

function submitInternalQuiz(e, title) {
    e.preventDefault();
    trainingsAnswersDb.push({
        title: title,
        user: currentUser.name,
        date: new Date().toLocaleString('he-IL')
    });
    localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
    showToast('הלומדה הושלמה בהצלחה!', 'success');
    navigate('trainings');
}

function addProtocolFromSettings() {
    const title = document.getElementById('settings-prot-title').value;
    const link = document.getElementById('settings-prot-link').value;
    if (title && link) {
        protocolsDb.push({ id: Date.now(), title, link });
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
        showToast('פרוטוקול נוסף בהצלחה', 'success');
        navigate('settings');
    }
}
function removeProtocol(id) {
    if (confirm('מחק פרוטוקול?')) {
        protocolsDb = protocolsDb.filter(p => p.id !== id);
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
        navigate('settings');
    }
}








// --- AUTO BYPASS LOGIN ---
document.addEventListener('DOMContentLoaded', () => {
    currentUser = { username: 'admin', password: 'admin', name: 'מנהל מערכת', role: 'מנהל איכות ראשי', team: 'all', isAdmin: true };
    localStorage.setItem('clinic_current_user', JSON.stringify(currentUser));
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    if(loginScreen) loginScreen.style.display = 'none';
    if(appContainer) appContainer.style.display = 'flex';
    
    const userNameEl = document.getElementById('user-name');
    const userRoleEl = document.getElementById('user-role');
    if(userNameEl) userNameEl.innerText = currentUser.name;
    if(userRoleEl) userRoleEl.innerText = currentUser.role;

    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.manage-only').forEach(el => el.style.display = 'flex');

    if(typeof loadForms === 'function') {
        loadForms().then(() => {
            const initialView = window.location.hash ? window.location.hash.replace('#', '') : 'dashboard';
            if(typeof navigate === 'function') navigate(['protocols', 'trainings', 'procedures', 'forms', 'tip', 'intro', 'agent', 'settings'].includes(initialView) ? initialView : 'dashboard');
        });
    } else {
        if(typeof navigate === 'function') navigate('dashboard');
    }
});


// ==============================================================
// TEAM MESSAGING & EMAIL CENTER + NOTIFICATIONS SYSTEM
// ==============================================================
let portalNotifications = [
    {
        id: "notif_1",
        title: "תזכורת: השלמת ביצוע בקרות",
        body: "יש להשלים בקרות חודשיות במחלקת סיעוד מורכב עד סוף השבוע.",
        channel: "internal",
        time: "היום, 09:30",
        read: false
    },
    {
        id: "notif_2",
        title: "עדכון פרמקולוגיה גריאטרית",
        body: "בנק שאלות מעודכן וקריטריוני Beers 2023 זמינים בהכשרת אחראית משמרת.",
        channel: "internal",
        time: "אתמול, 14:15",
        read: false
    },
    {
        id: "notif_3",
        title: "הדרכת קליטה לאחיות",
        body: "4 אחיות חדשות שובצו לערכת הדרכה בקליטה לחודש הנוכחי.",
        channel: "internal",
        time: "28/10/2026",
        read: true
    }
];

try {
    const saved = localStorage.getItem('portal_notifications');
    if (saved) portalNotifications = JSON.parse(saved);
} catch(e) {}

function savePortalNotifications() {
    try {
        localStorage.setItem('portal_notifications', JSON.stringify(portalNotifications));
    } catch(e) {}
    updateNotifBadge();
}

function updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    const unread = portalNotifications.filter(n => !n.read).length;
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'inline-flex' : 'none';
}

function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        renderNotificationsDropdown();
        dropdown.style.display = 'block';
    }
}

function renderNotificationsDropdown() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px; margin-bottom:8px;">
            <strong style="font-size:13px; color:var(--text-primary);">התראות מערכת והודעות</strong>
            <button onclick="markAllNotificationsAsRead()" class="btn" style="font-size:11px; padding:3px 8px; background:transparent; color:var(--primary-color); border:1px solid var(--border-color); border-radius:6px; cursor:pointer;">סמן הכל כנקרא</button>
        </div>
    `;

    if (portalNotifications.length === 0) {
        html += '<div style="text-align:center; padding:15px; color:var(--text-secondary); font-size:12px;">אין התראות חדשות</div>';
    } else {
        html += '<div style="display:flex; flex-direction:column; gap:4px;">';
        portalNotifications.forEach(n => {
            html += `
                <div class="notif-item" style="${!n.read ? 'background:rgba(2, 132, 199, 0.08); font-weight:600;' : ''}">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <span style="color:var(--text-primary); font-size:12px;">${n.title}</span>
                        <span class="notif-time">${n.time}</span>
                    </div>
                    <div style="font-size:11.5px; color:var(--text-secondary); margin-top:2px;">${n.body}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    dropdown.innerHTML = html;
}

function markAllNotificationsAsRead() {
    portalNotifications.forEach(n => n.read = true);
    savePortalNotifications();
    renderNotificationsDropdown();
}

function openMessagingModal() {
    const modal = document.getElementById('messaging-modal');
    if (modal) modal.style.display = 'flex';
}

function closeMessagingModal() {
    const modal = document.getElementById('messaging-modal');
    if (modal) modal.style.display = 'none';
}

function handleChannelChange() {
    const channel = document.querySelector('input[name="msg_channel"]:checked')?.value || 'email';
    const subjGroup = document.getElementById('group-subject');
    if (subjGroup) {
        subjGroup.style.display = (channel === 'whatsapp') ? 'none' : 'block';
    }
}

function handleRecipientChange(val) {
    const customInp = document.getElementById('msg-custom-recipient');
    if (customInp) {
        customInp.style.display = (val === 'custom') ? 'block' : 'none';
        if (val === 'custom') customInp.focus();
    }
}

function applyMessageTemplate(key) {
    const subj = document.getElementById('msg-subject');
    const body = document.getElementById('msg-body');
    if (!subj || !body) return;

    const templates = {
        audit_reminder: {
            subject: 'תזכורת: השלמת ביצוע בקרות חודשיות במחלקה',
            body: 'שלום לכולם,\nנא לוודא השלמת כל כלי הבקרה החודשיים (בטיחות הטיפול, מניעת זיהומים, מבדקי ידע) עד לתאריך היעד.\nלכל שאלה או תמיכה פנו למנהלת האיכות.'
        },
        med_safety: {
            subject: 'עדכון בטיחות: חידוד נהלי טיפול תרופתי וקריטריוני Beers 2023',
            body: 'צוות יקר,\nפורסם עדכון דגשי בטיחות בחלוקת תרופות וקריטריוני Beers 2023 למניעת נפילות ואינטראקציות בקשישים.\nחובה על כל אחראית משמרת לעבור על דף ההנחיות בפורטל.'
        },
        training_invite: {
            subject: 'זימון: הדרכת קליטה לאחיות חדשות והכשרת אחראית משמרת',
            body: 'הנכם מוזמנים למפגש הדרכה מרוכז בנושא ערכת קליטה ופיתוח מיומנויות ניהול משמרת.\nהמפגש יתקיים ביום רביעי הקרוב בחדר ההדרכה המחלקתי.'
        },
        urgent_inspection: {
            subject: 'דחוף: היערכות לביקורת משרד הבריאות',
            body: 'צוותים נכבדים,\nביקורת משרד הבריאות מתוכננת לשבוע הקרוב. נא לוודא סדר בתיקי המטופלים, שלמות טפסי בקרה ותקינות עגלות החייאה וטיפול תרופתי.'
        }
    };

    if (templates[key]) {
        subj.value = templates[key].subject;
        body.value = templates[key].body;
    }
}

function sendTeamMessage(e) {
    if (e) e.preventDefault();

    const channel = document.querySelector('input[name="msg_channel"]:checked')?.value || 'email';
    const recipientType = document.getElementById('msg-recipients')?.value || 'all';
    const customRecipient = document.getElementById('msg-custom-recipient')?.value?.trim();
    const subject = document.getElementById('msg-subject')?.value?.trim() || 'הודעה ממערכת האיכות';
    const body = document.getElementById('msg-body')?.value?.trim();

    if (!body) {
        showToast('נא להזין תוכן להודעה', 'warning');
        return;
    }

    const emailMap = {
        all: 'all-staff@hospital.org.il',
        head_nurses: 'head-nurses@hospital.org.il',
        complex_care: 'complex-care@hospital.org.il',
        vent_care: 'vent-care@hospital.org.il',
        rehab: 'rehab-geriatric@hospital.org.il',
        chronic_nursing: 'chronic-nursing@hospital.org.il',
        psychogeriatric: 'psychogeriatric@hospital.org.il',
        physicians: 'physicians@hospital.org.il'
    };

    const targetEmail = (recipientType === 'custom' && customRecipient) ? customRecipient : (emailMap[recipientType] || 'all-staff@hospital.org.il');

    if (channel === 'email') {
        const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        showToast('פותח את לקוח הדוא"ל לשליחה...', 'success');
    } else if (channel === 'whatsapp') {
        const waText = encodeURIComponent(`*${subject}*\n\n${body}`);
        const waPhone = (recipientType === 'custom' && customRecipient && /^[0-9+]+$/.test(customRecipient)) ? customRecipient.replace(/[^0-9]/g, '') : '';
        const waUrl = waPhone ? `https://api.whatsapp.com/send?phone=${waPhone}&text=${waText}` : `https://api.whatsapp.com/send?text=${waText}`;
        window.open(waUrl, '_blank');
        showToast('פותח את WhatsApp לשליחה...', 'success');
    } else {
        showToast('ההתראה נשמרה ונשלחה לכל משתמשי המערכת!', 'success');
    }

    // Add to internal portal notifications
    portalNotifications.unshift({
        id: 'msg_' + Date.now(),
        title: subject,
        body: body.length > 80 ? body.substring(0, 80) + '...' : body,
        channel: channel,
        time: 'עכשיו',
        read: false
    });
    savePortalNotifications();

    closeMessagingModal();
}

window.simulateNotifications = openMessagingModal;


// ==============================================================
// 1. INTERPROFESSIONAL DEPARTMENTAL GOALS DASHBOARD (ETHICAL / NO PHI)
// ==============================================================

// ==============================================================
// 7. INTERPROFESSIONAL DEPARTMENTAL GOALS & LIVE AUDIT SYNC
// ==============================================================
let activeInterprofDept = 'all';

// Default Target Data
const defaultDeptInfoMap = {
    all: {
        title: 'דשבורד יעדים וממשקים רב-מקצועיים במחלקה',
        sub: 'ניהול איכות, סנכרון ממשקים ובטיחות הטיפול ברמה המחלקתית (ללא פרטי מטופלים מזוהים)',
        kpi1: { label: 'מניעת פצעים ותפרחת IAD', val: '94% עמידה', sub: 'מקור: בקרת שלמות העור ו-IAD', formKey: 'f_pressure_ulcers' },
        kpi2: { label: 'בטיחות ברחצה יומית', val: '100% תקין', sub: 'מקור: בקרת בטיחות הטיפול והרחצה', formKey: 'f_patient_safety' },
        kpi3: { label: 'סנכרון ניוד ומעברים', val: '88% יישום', sub: 'מקור: בקרת נפילות וארגונומיה', formKey: 'f_fall_prevention' },
        kpi4: { label: 'התאמת מרקמים (IDDSI) ותזונה', val: '96% סנכרון', sub: 'מקור: בקרת אומדן תזונה ובליעה', formKey: 'f_nutrition_swallow' }
    },
    complex: {
        title: 'יעדים וממשקים: מחלקת סיעוד מורכב',
        sub: 'דגשי איכות: מניעת פצעי לחץ וקרעי עור, שלמות צנתרים, איזון כאב ורצף טיפול',
        kpi1: { label: 'מניעת פצעי לחץ ו-IAD', val: '95% עמידה', sub: 'מקור: בקרת פצעים ומזרנים דינמיים', formKey: 'f_pressure_ulcers' },
        kpi2: { label: 'בטיחות רחצה והיפותרמיה', val: '100% תקין', sub: 'מקור: בקרת כיסוי צנתרים ברחצה', formKey: 'f_patient_safety' },
        kpi3: { label: 'ניוד והושבה מתוזמנת', val: '85% יישום', sub: 'מקור: בקרת הושבה וכריות לחץ', formKey: 'f_fall_prevention' },
        kpi4: { label: 'העשרה חלבונית ו-IDDSI', val: '97% עמידה', sub: 'מקור: בקרת תוספי חלבון ומרקמים', formKey: 'f_nutrition_swallow' }
    },
    vent: {
        title: 'יעדים וממשקים: מחלקת סיעוד מונשמים',
        sub: 'דגשי איכות: מניעת דלקת ריאות מונשמים (VAP Bundle), בטיחות קנולות ופיום קנה, מניעת לחץ',
        kpi1: { label: 'שלמות עור סביב טרכאוסטומיה', val: '98% תקין', sub: 'מקור: בקרת חבישות ספוגיות לטרכאו', formKey: 'f_pressure_ulcers' },
        kpi2: { label: 'בטיחות רחצה במיטה', val: '100% עמידה', sub: 'מקור: בקרת רחצה בסבוני pH 5.5', formKey: 'f_patient_safety' },
        kpi3: { label: 'שינויי תנוחה וניקוז ריאתי', val: '92% יישום', sub: 'מקור: סנכרון פיזיו נשימתית וסיעוד', formKey: 'f_fall_prevention' },
        kpi4: { label: 'הזנה אנטרלית בטוחה (PEG)', val: '99% תקין', sub: 'מקור: בקרת הזנה ומראשות 30-45°', formKey: 'f_nutrition_swallow' }
    },
    rehab: {
        title: 'יעדים וממשקים: מחלקת שיקום גריאטרי',
        sub: 'דגשי איכות: שיפור עצמאות תפקודית (FIM), מניעת נפילות פעילה, תרגול מעברים וחזרה לקהילה',
        kpi1: { label: 'מניעת פציעות עור בפעילות', val: '96% תקין', sub: 'מקור: בקרת שרוולי הגנה בניוד', formKey: 'f_pressure_ulcers' },
        kpi2: { label: 'עצמאות ברחצה בליווי', val: '92% עמידה', sub: 'מקור: בקרת מקלחת בטוחה עם אביזרי עזר', formKey: 'f_patient_safety' },
        kpi3: { label: 'השגת יעדי ניוד ומרחק הליכה', val: '90% יישום', sub: 'מקור: בקרת תרגילי הליכה יומיים', formKey: 'f_fall_prevention' },
        kpi4: { label: 'התקדמות מרקמי מזון לרגיל', val: '94% סנכרון', sub: 'מקור: בקרת גמילה מהסמכה (ST)', formKey: 'f_nutrition_swallow' }
    },
    chronic_nursing: {
        title: 'יעדים וממשקים: מחלקת גריאטריה כרונית סיעודית',
        sub: 'דגשי איכות: שימור איכות חיים ותפקוד, מניעת פצעי לחץ ו-IAD במרותקים, מניעת קונטרקטורות וסרקופניה',
        kpi1: { label: 'מניעת פצעי לחץ ו-IAD במרותקים', val: '96% עמידה', sub: 'מקור: בקרת שלמות העור והחלפות', formKey: 'f_pressure_ulcers' },
        kpi2: { label: 'בטיחות ברחצה ושימון מונע', val: '100% תקין', sub: 'מקור: בקרת רחצה וכלל 3 הדקות לליחוח', formKey: 'f_patient_safety' },
        kpi3: { label: 'שינויי תנוחה ומנופי הרמה', val: '91% יישום', sub: 'מקור: בקרת מנופי הרמה פסיביים', formKey: 'f_fall_prevention' },
        kpi4: { label: 'האכלה סבלנית ומרקמי IDDSI', val: '95% סנכרון', sub: 'מקור: בקרת האכלה ומניעת התייבשות', formKey: 'f_nutrition_swallow' }
    },
    psychogeriatric: {
        title: 'יעדים וממשקים: מחלקת תשושי נפש (דמנציה ואלצהיימר)',
        sub: 'דגשי איכות: מניעת שוטטות ונפילות ללא קשירות (Restraint-Free), גישות לא-תרופתיות לאי-שקט, בטיחות רחצה סבלנית',
        kpi1: { label: 'בטיחות סביבתית ללא קשירות', val: '98% חופש תנועה', sub: 'מקור: בקרת מניעת קשירות וחיישנים', formKey: 'f_patient_safety' },
        kpi2: { label: 'רחצה מרגיעה ללא כפייה', val: '100% תקין', sub: 'מקור: בקרת רחצה סבלנית ללא חרדה', formKey: 'f_patient_safety' },
        kpi3: { label: 'ניהול אי-שקט (BPSD) לא-תרופתי', val: '92% יישום', sub: 'מקור: בקרת הפחתת סדציה (Beers)', formKey: 'f_med_safety' },
        kpi4: { label: 'אכילה עצמאית ו-Finger Foods', val: '94% עמידה', sub: 'מקור: בקרת הידרציה ומזון אצבעות', formKey: 'f_nutrition_swallow' }
    }
};

function getInterprofDeptData() {
    try {
        const saved = localStorage.getItem('interprof_dept_targets_v1');
        if (saved) return JSON.parse(saved);
    } catch(e) {}
    return defaultDeptInfoMap;
}

function saveInterprofDeptData(data) {
    try {
        localStorage.setItem('interprof_dept_targets_v1', JSON.stringify(data));
    } catch(e) {}
}

function renderInterprofessionalDashboard() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    const allData = getInterprofDeptData();
    const curDept = allData[activeInterprofDept] || allData.all;

    contentArea.innerHTML = `
        <div class="fade-in space-y-6">
            <!-- Header Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:16px 22px; border-radius:14px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04); flex-wrap:wrap; gap:10px;">
                <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                    <span>➜</span> חזרה לדשבורד הראשי
                </button>
                <div style="text-align:center;">
                    <h2 style="font-size:19px; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <span>🎯</span> ${curDept.title}
                    </h2>
                    <span style="font-size:12px; color:var(--text-secondary);">${curDept.sub}</span>
                </div>
                <div style="display:flex; gap:8px;">
                    <button onclick="openTargetEditModal()" class="btn" style="background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:white; font-weight:bold; font-size:12px; padding:8px 14px; border-radius:8px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 2px 4px rgba(2,132,199,0.25);">
                        <span>⚙️</span> עריכת יעדי איכות
                    </button>
                    <button onclick="window.print()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); font-size:12px; padding:8px 14px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                        <span>🖨️</span> הדפס סיכום A4
                    </button>
                </div>
            </div>

            <!-- Explanatory Banner: Data Origin & Governance -->
            <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:12px; padding:14px 18px; display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; font-size:12.5px;">
                <div style="border-right:3px solid #059669; padding-right:12px;">
                    <strong style="color:#059669; display:block; margin-bottom:2px;">📊 מאיפה הנתונים נשאבים?</strong>
                    <span style="color:var(--text-secondary);">האחוזים משקללים בזמן אמת את תוצאות <strong>כלי הבקרה הדיגיטליים (בלשונית 14)</strong> שממלאות האחיות האחראיות והמפקחות מדי חודש, לצד בקרות תצפית ודוחות Huddle.</span>
                </div>
                <div style="border-right:3px solid #0284c7; padding-right:12px;">
                    <strong style="color:#0284c7; display:block; margin-bottom:2px;">🏛️ מי קובע את היעדים?</strong>
                    <span style="color:var(--text-secondary);">היעדים נקבעים על פי <strong>מדדי האיכות הלאומיים של משרד הבריאות</strong>, בשיתוף הנהלת הסיעוד וראשי הסקטורים (פיזיותרפיה, תזונה, ריפוי בעיסוק).</span>
                </div>
                <div style="border-right:3px solid #7c3aed; padding-right:12px;">
                    <strong style="color:#7c3aed; display:block; margin-bottom:2px;">🛡️ אתיקה והגנת הפרטיות</strong>
                    <span style="color:var(--text-secondary);">דשבורד זה מנהל נתונים ברמה <strong>מחלקתית-ארגונית בלבד</strong> ללא פרטי מטופלים מזוהים. תוכניות טיפול אישיות מנוהלות אך ורק ב-EHR.</span>
                </div>
            </div>

            <!-- Department Filter Buttons -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <button onclick="filterInterprofDept('all')" class="btn" style="${activeInterprofDept==='all' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">כלל המחלקות</button>
                    <button onclick="filterInterprofDept('chronic_nursing')" class="btn" style="${activeInterprofDept==='chronic_nursing' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">גריאטריה כרונית סיעודית</button>
                    <button onclick="filterInterprofDept('psychogeriatric')" class="btn" style="${activeInterprofDept==='psychogeriatric' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">תשושי נפש</button>
                    <button onclick="filterInterprofDept('complex')" class="btn" style="${activeInterprofDept==='complex' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">סיעוד מורכב</button>
                    <button onclick="filterInterprofDept('vent')" class="btn" style="${activeInterprofDept==='vent' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">סיעוד מונשמים</button>
                    <button onclick="filterInterprofDept('rehab')" class="btn" style="${activeInterprofDept==='rehab' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">שיקום גריאטרי</button>
                </div>
                <div style="font-size:12px; color:var(--text-secondary);">תקופת יעד פעילה: <strong>רבעון נוכחי 2026</strong></div>
            </div>

            <!-- KPI Metric Counters with Direct Audit Form Jump Links -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px;">
                <!-- KPI 1 -->
                <div class="interprof-card" style="border-top:4px solid #059669; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div style="font-size:12px; font-weight:bold; color:var(--text-primary);">${curDept.kpi1.label}</div>
                            <span style="font-size:16px;">🛡️</span>
                        </div>
                        <div style="font-size:26px; font-weight:900; color:#059669; margin:6px 0;">${curDept.kpi1.val}</div>
                        <div style="font-size:11px; color:var(--text-secondary); line-height:1.4;">${curDept.kpi1.sub}</div>
                    </div>
                    <button onclick="navigate('forms')" class="btn" style="margin-top:12px; width:100%; background:rgba(5, 150, 105, 0.08); color:#059669; border:1px solid rgba(5, 150, 105, 0.25); font-size:11px; font-weight:bold; padding:5px 8px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:4px; cursor:pointer;">
                        <span>📝</span> צפה בכלי הבקרה המזין בלשונית 14 ➜
                    </button>
                </div>

                <!-- KPI 2 -->
                <div class="interprof-card" style="border-top:4px solid #0284c7; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div style="font-size:12px; font-weight:bold; color:var(--text-primary);">${curDept.kpi2.label}</div>
                            <span style="font-size:16px;">🛁</span>
                        </div>
                        <div style="font-size:26px; font-weight:900; color:#0284c7; margin:6px 0;">${curDept.kpi2.val}</div>
                        <div style="font-size:11px; color:var(--text-secondary); line-height:1.4;">${curDept.kpi2.sub}</div>
                    </div>
                    <button onclick="navigate('forms')" class="btn" style="margin-top:12px; width:100%; background:rgba(2, 132, 199, 0.08); color:#0284c7; border:1px solid rgba(2, 132, 199, 0.25); font-size:11px; font-weight:bold; padding:5px 8px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:4px; cursor:pointer;">
                        <span>📝</span> צפה בכלי הבקרה המזין בלשונית 14 ➜
                    </button>
                </div>

                <!-- KPI 3 -->
                <div class="interprof-card" style="border-top:4px solid #d97706; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div style="font-size:12px; font-weight:bold; color:var(--text-primary);">${curDept.kpi3.label}</div>
                            <span style="font-size:16px;">🚶</span>
                        </div>
                        <div style="font-size:26px; font-weight:900; color:#d97706; margin:6px 0;">${curDept.kpi3.val}</div>
                        <div style="font-size:11px; color:var(--text-secondary); line-height:1.4;">${curDept.kpi3.sub}</div>
                    </div>
                    <button onclick="navigate('forms')" class="btn" style="margin-top:12px; width:100%; background:rgba(217, 119, 6, 0.08); color:#d97706; border:1px solid rgba(217, 119, 6, 0.25); font-size:11px; font-weight:bold; padding:5px 8px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:4px; cursor:pointer;">
                        <span>📝</span> צפה בכלי הבקרה המזין בלשונית 14 ➜
                    </button>
                </div>

                <!-- KPI 4 -->
                <div class="interprof-card" style="border-top:4px solid #7c3aed; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div style="font-size:12px; font-weight:bold; color:var(--text-primary);">${curDept.kpi4.label}</div>
                            <span style="font-size:16px;">🥄</span>
                        </div>
                        <div style="font-size:26px; font-weight:900; color:#7c3aed; margin:6px 0;">${curDept.kpi4.val}</div>
                        <div style="font-size:11px; color:var(--text-secondary); line-height:1.4;">${curDept.kpi4.sub}</div>
                    </div>
                    <button onclick="navigate('forms')" class="btn" style="margin-top:12px; width:100%; background:rgba(124, 58, 237, 0.08); color:#7c3aed; border:1px solid rgba(124, 58, 237, 0.25); font-size:11px; font-weight:bold; padding:5px 8px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:4px; cursor:pointer;">
                        <span>📝</span> צפה בכלי הבקרה המזין בלשונית 14 ➜
                    </button>
                </div>
            </div>

            <!-- Interprofessional Quality Targets List -->
            <div class="interprof-card" style="padding:22px;">
                <h3 style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:0; margin-bottom:15px; display:flex; align-items:center; gap:8px;">
                    <span>📋</span> יעדי איכות מחלקתיים וממשקים רב-מקצועיים מוגדרים
                </h3>

                <div style="display:flex; flex-direction:column; gap:16px;">
                    <!-- Target 1 -->
                    <div style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                            <div>
                                <strong style="font-size:13.5px; color:var(--text-primary);">1. מניעת פצעי לחץ, קרעי עור (Skin Tears) ופגיעות לחות IAD</strong>
                                <div style="font-size:12px; color:var(--text-secondary); margin-top:3px;">
                                    יישום פרוטוקול שלמות העור: שימוש בסבוני pH 5.5 ללא שטיפה, מריחת אמוליינט תוך 3 דקות, חבישות סיליקון ותרסיס מגן Cavilon.
                                </div>
                            </div>
                            <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:bold; font-size:12px; padding:4px 8px; border-radius:6px;">95% עמידה ביעד</span>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
                            <span class="role-badge role-nurse">סיעוד: אומדן עור ושינויי תנוחה</span>
                            <span class="role-badge role-caregiver">מטפלים: ניקוי עדין ושימון עור</span>
                            <span class="role-badge role-diet">דיאטה: העשרת חלבון ואבץ</span>
                            <span class="role-badge role-ot">ריפוי בעיסוק: כריות לחץ ומזרנים</span>
                        </div>
                    </div>

                    <!-- Target 2 -->
                    <div style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                            <div>
                                <strong style="font-size:13.5px; color:var(--text-primary);">2. פרוטוקול רחצה יומית בטוחה ומניעת כוויות/נפילות</strong>
                                <div style="font-size:12px; color:var(--text-secondary); margin-top:3px;">
                                    בדיקת טמפרטורת מים (37-40°C), רחצה בישיבה בלבד בכסא מקלחת נעול, כיסוי למניעת היפותרמיה, הגנה אטומה על צנתרים ופצעים.
                                </div>
                            </div>
                            <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:bold; font-size:12px; padding:4px 8px; border-radius:6px;">100% תקין במדדי הבקרה</span>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
                            <span class="role-badge role-caregiver">מטפלים: בדיקת מים וליווי צמוד</span>
                            <span class="role-badge role-nurse">סיעוד: כיסוי צנתרים ומעקב עור</span>
                            <span class="role-badge role-pt">פיזיותרפיה: הנחיות מעבר בטוח</span>
                        </div>
                    </div>

                    <!-- Target 3 -->
                    <div style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                            <div>
                                <strong style="font-size:13.5px; color:var(--text-primary);">3. תוכנית ניוד ומעברים משותפת (פיזיותרפיה + סיעוד)</strong>
                                <div style="font-size:12px; color:var(--text-secondary); margin-top:3px;">
                                    הגדרת רמת סיוע ברורה לכל מטופל (מטפל יחיד / 2 מטפלים / מנוף הרמה), קימה מתוזמנת לכורסה במשמרות בוקר וערב.
                                </div>
                            </div>
                            <span class="badge" style="background:#fef3c7; color:#b45309; font-weight:bold; font-size:12px; padding:4px 8px; border-radius:6px;">88% יישום (יעד 90%)</span>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
                            <span class="role-badge role-pt">פיזיותרפיה: קביעת רמת ניידות</span>
                            <span class="role-badge role-nurse">סיעוד: סנכרון שעות הושבה</span>
                            <span class="role-badge role-caregiver">מטפלים: שימוש במנופים תקניים</span>
                        </div>
                    </div>

                    <!-- Target 4 -->
                    <div style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                            <div>
                                <strong style="font-size:13.5px; color:var(--text-primary);">4. מניעת אספירציות והתאמת מרקמי בליעה (IDDSI)</strong>
                                <div style="font-size:12px; color:var(--text-secondary); margin-top:3px;">
                                    ביצוע אומדן בליעה ותזונה תוך 48 שעות, התאמת צמיגות נוזלים (נקטר/דבש/פודינג), הדרכת אכילה בישיבה זקופה 90 מעלות.
                                </div>
                            </div>
                            <span class="badge" style="background:#fae8ff; color:#86198f; font-weight:bold; font-size:12px; padding:4px 8px; border-radius:6px;">96% סנכרון תקין</span>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
                            <span class="role-badge role-st">קלינאות: מבדק בליעה וקביעת IDDSI</span>
                            <span class="role-badge role-diet">דיאטה: העשרה תזונתית מותאמת</span>
                            <span class="role-badge role-nurse">סיעוד: ניטור קוצר נשימה ושיעול</span>
                            <span class="role-badge role-caregiver">מטפלים: האכלה איטית ומנח 90°</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interprofessional Responsibility Matrix Table -->
            <div class="interprof-card" style="padding:22px;">
                <h3 style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:0; margin-bottom:15px; display:flex; align-items:center; gap:8px;">
                    <span>🤝</span> מטריצת ממשקי עבודה וחלוקת אחריות קלינית
                </h3>

                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:right;">
                        <thead>
                            <tr style="background:var(--bg-color); border-bottom:2px solid var(--border-color);">
                                <th style="padding:10px 14px;">תחום קליני</th>
                                <th style="padding:10px 14px;">סיעוד (אח/ות)</th>
                                <th style="padding:10px 14px;">מטפלים סיעודיים</th>
                                <th style="padding:10px 14px;">פיזיותרפיה / ריפוי בעיסוק</th>
                                <th style="padding:10px 14px;">תזונה / קלינאות תקשורת</th>
                                <th style="padding:10px 14px;">רופא מחלקה</th>
                            </tr>
                        </thead>
                        <tbody style="divide-y: 1px solid var(--border-color);">
                            <tr>
                                <td style="padding:12px 14px; font-weight:bold; color:var(--primary-color);">שלמות העור ו-IAD</td>
                                <td style="padding:12px 14px;">סקר עור מלא, התאמת חבישות, טיפול ב-IAD דרגה 2+</td>
                                <td style="padding:12px 14px;">ניקוי ללא שטיפה, החלפה מידית, מריחת אמוליינט</td>
                                <td style="padding:12px 14px;">התאמת כריות ישיבה מונעות לחץ ומנחי גפה</td>
                                <td style="padding:12px 14px;">התאמת חלבון 1.25-1.5 גרם/ק"ג לריפוי רקמות</td>
                                <td style="padding:12px 14px;">מרשם משחות טיפוליות (אנטי-פטרייתי בקנדידה)</td>
                            </tr>
                            <tr>
                                <td style="padding:12px 14px; font-weight:bold; color:var(--primary-color);">בטיחות רחצה יומית</td>
                                <td style="padding:12px 14px;">כיסוי צנתרים/פצעים, מעקב המודינמי לאחר רחצה</td>
                                <td style="padding:12px 14px;">בדיקת מים (37-40°C), רחצה בישיבה, מניעת החלקה</td>
                                <td style="padding:12px 14px;">הדרכת שימוש במנופי רחצה וכסאות מקלחת</td>
                                <td style="padding:12px 14px;">-</td>
                                <td style="padding:12px 14px;">הנחיות הגבלת חום במטופלים עם אי ספיקת לב</td>
                            </tr>
                            <tr>
                                <td style="padding:12px 14px; font-weight:bold; color:var(--primary-color);">ניוד ובטיחות מעברים</td>
                                <td style="padding:12px 14px;">פיקוח על הושבה מתוזמנת, מניעת נפילות</td>
                                <td style="padding:12px 14px;">הקפדה על מספר מטפלים נדרש ונעילת מעצורים</td>
                                <td style="padding:12px 14px;">קביעת תוכנית ניוד אישית והתאמת אביזרי הליכה</td>
                                <td style="padding:12px 14px;">-</td>
                                <td style="padding:12px 14px;">סקירת תרופות הגורמות לתת ל"ד תנוחתי (Beers)</td>
                            </tr>
                            <tr>
                                <td style="padding:12px 14px; font-weight:bold; color:var(--primary-color);">מרקמי מזון ובליעה</td>
                                <td style="padding:12px 14px;">ניטור סימני חנק, אומדן נשימתי בארוחה</td>
                                <td style="padding:12px 14px;">האכלה בישיבה זקופה 90°, איסור השכבה שעה מסיום</td>
                                <td style="padding:12px 14px;">התאמת מנח ראש וצוואר בישיבה (OT)</td>
                                <td style="padding:12px 14px;">קביעת רמת IDDSI (ST) והרכב קלורי מועשר (דיאטה)</td>
                                <td style="padding:12px 14px;">הפניה לבדיקת בליעה מכשירית (FEES/VFSS)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Interdisciplinary Team Meeting Checklist (Huddle Form) -->
            <div class="interprof-card" style="padding:22px; background:var(--bg-color);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div>
                        <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin:0;">
                            📝 צ'ק-ליסט שבועי למפגש צוות רב-מקצועי (Interdisciplinary Huddle)
                        </h4>
                        <span style="font-size:12px; color:var(--text-secondary);">כלי מובנה למנהלת לסקירת מגמות, צווארי בקבוק ופתרונות ממשקיים</span>
                    </div>
                    <button onclick="saveHuddleNotes()" class="btn" style="background:var(--primary-color); color:white; font-size:12px; padding:6px 14px; border-radius:8px;">
                        שמור סיכום מפגש
                    </button>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
                    <label style="display:flex; align-items:flex-start; gap:8px; font-size:12.5px; background:var(--surface); padding:10px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer;">
                        <input type="checkbox" id="huddle_chk_1" style="margin-top:2px;">
                        <span>נסקרו מטופלים עם סיכון גבוה ל-IAD / פצעי לחץ וסוכם פרוטוקול חבישות וספיגה</span>
                    </label>
                    <label style="display:flex; align-items:flex-start; gap:8px; font-size:12.5px; background:var(--surface); padding:10px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer;">
                        <input type="checkbox" id="huddle_chk_2" style="margin-top:2px;">
                        <span>בוצעה בקרה על נהלי רחצה יומית בטוחה (טמפ' מים ורחצה בישיבה בלבד)</span>
                    </label>
                    <label style="display:flex; align-items:flex-start; gap:8px; font-size:12.5px; background:var(--surface); padding:10px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer;">
                        <input type="checkbox" id="huddle_chk_3" style="margin-top:2px;">
                        <span>תוכניות ניוד עודכנו ע"י פיזיותרפיה וסונכרנו מול אחיות המשמרת והמטפלים</span>
                    </label>
                    <label style="display:flex; align-items:flex-start; gap:8px; font-size:12.5px; background:var(--surface); padding:10px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer;">
                        <input type="checkbox" id="huddle_chk_4" style="margin-top:2px;">
                        <span>הושלמה התאמת מרקמי בליעה (IDDSI) והעשרה תזונתית לכל הקבלות החדשות</span>
                    </label>
                </div>
            </div>

            <!-- Target Edit Modal -->
            <div id="target-edit-modal" class="modal-overlay" style="display: none;" onclick="if(event.target === this) closeTargetEditModal()">
                <div class="modal-card" style="max-width: 600px;">
                    <div class="modal-header">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:20px;">⚙️</span>
                            <h3 style="margin:0; font-size:16px; font-weight:bold; color:var(--text-primary);">עריכת יעדי איכות וסף מעבר מחלקתי</h3>
                        </div>
                        <button type="button" class="modal-close-btn" onclick="closeTargetEditModal()">&times;</button>
                    </div>

                    <form id="target-edit-form" onsubmit="handleSaveTargetsForm(event)" style="display:flex; flex-direction:column; gap:14px; margin-top:15px;">
                        <div class="form-group">
                            <label style="font-weight:600; font-size:13px; color:var(--text-primary); margin-bottom:5px; display:block;">מחלקה לעדכון:</label>
                            <select id="edit-target-dept" class="form-control" style="width:100%; padding:9px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary); font-size:13px;" onchange="populateEditTargetFields(this.value)">
                                <option value="all">כלל המחלקות</option>
                                <option value="chronic_nursing">גריאטריה כרונית סיעודית</option>
                                <option value="psychogeriatric">תשושי נפש</option>
                                <option value="complex">סיעוד מורכב</option>
                                <option value="vent">סיעוד מונשמים</option>
                                <option value="rehab">שיקום גריאטרי</option>
                            </select>
                        </div>

                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="form-group">
                                <label style="font-weight:600; font-size:12px; color:var(--text-primary); margin-bottom:4px; display:block;">יעד 1 (עור / IAD):</label>
                                <input type="text" id="edit-kpi1-val" required class="form-control" style="width:100%; padding:8px; border-radius:8px; border:1px solid var(--border-color); background:var(--surface); color:var(--text-primary); font-size:12.5px;">
                            </div>
                            <div class="form-group">
                                <label style="font-weight:600; font-size:12px; color:var(--text-primary); margin-bottom:4px; display:block;">יעד 2 (בטיחות רחצה):</label>
                                <input type="text" id="edit-kpi2-val" required class="form-control" style="width:100%; padding:8px; border-radius:8px; border:1px solid var(--border-color); background:var(--surface); color:var(--text-primary); font-size:12.5px;">
                            </div>
                            <div class="form-group">
                                <label style="font-weight:600; font-size:12px; color:var(--text-primary); margin-bottom:4px; display:block;">יעד 3 (סנכרון ניוד):</label>
                                <input type="text" id="edit-kpi3-val" required class="form-control" style="width:100%; padding:8px; border-radius:8px; border:1px solid var(--border-color); background:var(--surface); color:var(--text-primary); font-size:12.5px;">
                            </div>
                            <div class="form-group">
                                <label style="font-weight:600; font-size:12px; color:var(--text-primary); margin-bottom:4px; display:block;">יעד 4 (מרקמי IDDSI):</label>
                                <input type="text" id="edit-kpi4-val" required class="form-control" style="width:100%; padding:8px; border-radius:8px; border:1px solid var(--border-color); background:var(--surface); color:var(--text-primary); font-size:12.5px;">
                            </div>
                        </div>

                        <div class="form-group">
                            <label style="font-weight:600; font-size:12px; color:var(--text-primary); margin-bottom:4px; display:block;">דגש ניהולי וממשקי למחלקה:</label>
                            <input type="text" id="edit-dept-sub" class="form-control" style="width:100%; padding:8px; border-radius:8px; border:1px solid var(--border-color); background:var(--surface); color:var(--text-primary); font-size:12.5px;">
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                            <button type="button" onclick="resetDefaultTargets()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-secondary); font-size:11px; padding:6px 12px; border-radius:6px;">
                                אפס לברירת מחדל מוסדית
                            </button>
                            <div style="display:flex; gap:8px;">
                                <button type="button" onclick="closeTargetEditModal()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-secondary); padding:7px 14px; border-radius:6px; font-size:12px;">ביטול</button>
                                <button type="submit" class="btn" style="background:var(--primary-color); color:white; font-weight:bold; padding:7px 18px; border-radius:6px; font-size:12px;">שמור יעדים מעודכנים</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function openTargetEditModal() {
    const modal = document.getElementById('target-edit-modal');
    if (modal) {
        modal.style.display = 'flex';
        populateEditTargetFields(activeInterprofDept);
    }
}

function closeTargetEditModal() {
    const modal = document.getElementById('target-edit-modal');
    if (modal) modal.style.display = 'none';
}

function populateEditTargetFields(deptKey) {
    const allData = getInterprofDeptData();
    const d = allData[deptKey] || allData.all;
    
    const sel = document.getElementById('edit-target-dept');
    if (sel) sel.value = deptKey;

    const kpi1 = document.getElementById('edit-kpi1-val');
    const kpi2 = document.getElementById('edit-kpi2-val');
    const kpi3 = document.getElementById('edit-kpi3-val');
    const kpi4 = document.getElementById('edit-kpi4-val');
    const sub = document.getElementById('edit-dept-sub');

    if (kpi1) kpi1.value = d.kpi1.val;
    if (kpi2) kpi2.value = d.kpi2.val;
    if (kpi3) kpi3.value = d.kpi3.val;
    if (kpi4) kpi4.value = d.kpi4.val;
    if (sub) sub.value = d.sub;
}

function handleSaveTargetsForm(e) {
    if (e) e.preventDefault();
    const deptKey = document.getElementById('edit-target-dept')?.value || 'all';
    const allData = getInterprofDeptData();

    if (!allData[deptKey]) allData[deptKey] = JSON.parse(JSON.stringify(defaultDeptInfoMap[deptKey] || defaultDeptInfoMap.all));

    allData[deptKey].kpi1.val = document.getElementById('edit-kpi1-val')?.value || allData[deptKey].kpi1.val;
    allData[deptKey].kpi2.val = document.getElementById('edit-kpi2-val')?.value || allData[deptKey].kpi2.val;
    allData[deptKey].kpi3.val = document.getElementById('edit-kpi3-val')?.value || allData[deptKey].kpi3.val;
    allData[deptKey].kpi4.val = document.getElementById('edit-kpi4-val')?.value || allData[deptKey].kpi4.val;
    allData[deptKey].sub = document.getElementById('edit-dept-sub')?.value || allData[deptKey].sub;

    saveInterprofDeptData(allData);
    closeTargetEditModal();
    renderInterprofessionalDashboard();
    showToast('יעדי האיכות של המחלקה עודכנו ונשמרו בהצלחה!', 'success');
}

function resetDefaultTargets() {
    if (confirm('האם לאפס את כל יעדי האיכות לברירות המחדל המוסדיות?')) {
        try {
            localStorage.removeItem('interprof_dept_targets_v1');
        } catch(e) {}
        closeTargetEditModal();
        renderInterprofessionalDashboard();
        showToast('היעדים אופסו בהצלחה לערכי הבסיס המוסדיים', 'info');
    }
}


// ==============================================================
// CLINICAL POCKET GUIDES MASTER DATA
// ==============================================================
let activePocketCategory = 'all';
let pocketSearchQuery = '';

const pocketGuidesMasterData = [
    {
        id: "pocket_skin_iad",
        category: "skin",
        icon: "🛡️",
        badge: "שלמות עור ו-IAD",
        title: "אבחנה מבדלת: פצע לחץ מול פגיעת לחות (IAD)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#eff6ff; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #3b82f6;">
                    <strong>מטרה קלינית:</strong> זיהוי מדויק בין נזק איסכמי מלחץ לבין דלקת עור ממגע עם הפרשות (Incontinence-Associated Dermatitis).
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div style="background:var(--bg-color); padding:10px; border-radius:8px; border:1px solid var(--border-color);">
                        <strong style="color:#b91c1c;">פצע לחץ (Pressure Injury):</strong>
                        <ul style="padding-right:16px; margin:4px 0 0 0; font-size:11.5px;">
                            <li>מיקום: מעל בליטה גרמית (עצה, איסכיום, טרוכנטר, עקבים).</li>
                            <li>גבולות: מוגדרים היטב, עגולים או אליפטיים.</li>
                            <li>עומק: שטחי ועד עמוק מאוד (דרגות 1-4).</li>
                            <li>גורם: לחץ וכוחות גזירה (Shear).</li>
                        </ul>
                    </div>
                    <div style="background:var(--bg-color); padding:10px; border-radius:8px; border:1px solid var(--border-color);">
                        <strong style="color:#2563eb;">פגיעת לחות (IAD):</strong>
                        <ul style="padding-right:16px; margin:4px 0 0 0; font-size:11.5px;">
                            <li>מיקום: קפלי עור, אזור פריאנלי, מפשעות (ללא קשר לבליטה).</li>
                            <li>גבולות: מפוזרים, מטושטשים, "כתמיים" (Kissing lesions).</li>
                            <li>עומק: שטחי בלבד (אפידרמיס/דרמיס עליון).</li>
                            <li>גורם: חומציות שתן/צואה, רטיבות וחום.</li>
                        </ul>
                    </div>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 12px; font-size:11.5px;">
                    <strong>טיפול מפתח ב-IAD:</strong> שטיפה ללא סבון רגיל (סבוני No-Rinse בעלי pH 5.5), מריחת תרסיס/קרם מגן Cavilon כל 48-72 שעות.
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_stoma_5steps",
        category: "skin",
        icon: "🔄",
        badge: "ציוד סטומה",
        title: "צעד אחר צעד: מדריך להחלפה בטוחה של ציוד הסטומה (5 שלבים)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#f0fdf4; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #16a34a;">
                    <strong>עיקרון מוביל:</strong> החלפה נכונה היא המפתח למניעת דליפות, שמירה על שלמות העור הפריסטומלי וחזרה מהירה לשגרה בטוחה.
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="display:flex; gap:10px; align-items:flex-start; background:var(--bg-color); padding:8px 10px; border-radius:8px;">
                        <span style="background:#0284c7; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">1</span>
                        <div><strong>הסרה עדינה והכנת העור:</strong> הסר את הציוד הישן בעדינות מלמעלה למטה תוך מתן תמיכה נגדית לעור. ניתן להיעזר במסיר דבק ייעודי (Adhesive Remover).</div>
                    </div>
                    <div style="display:flex; gap:10px; align-items:flex-start; background:var(--bg-color); padding:8px 10px; border-radius:8px;">
                        <span style="background:#059669; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">2</span>
                        <div><strong>ניקוי יסודי וייבש מלא:</strong> נקה את האזור במים פושרים וסבון ללא שומן/בישום. ייבש היטב בטפיחות עדינות - <em>בסיס נדבק רק לעור יבש לחלוטין!</em></div>
                    </div>
                    <div style="display:flex; gap:10px; align-items:flex-start; background:var(--bg-color); padding:8px 10px; border-radius:8px;">
                        <span style="background:#d97706; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">3</span>
                        <div><strong>שימוש במגבון הגנה ומדידה מדויקת:</strong> מרח מגבון הגנה (Skin Protector) והמתן לייבוש מלא. מדוד את קוטר הסטומה וגזור את הבסיס עם מרווח מדויק של 1-2 מ"מ מהסטומה.</div>
                    </div>
                    <div style="display:flex; gap:10px; align-items:flex-start; background:var(--bg-color); padding:8px 10px; border-radius:8px;">
                        <span style="background:#ea580c; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">4</span>
                        <div><strong>הצמדת הבסיס וחימומו:</strong> הדבק את הבסיס מהמרכז כלפי חוץ. הנח את כף היד מעל הבסיס למשך כדקה; חום הגוף משפעל את חומרי ההדבקה ומבטיח איטום מושלם.</div>
                    </div>
                    <div style="display:flex; gap:10px; align-items:flex-start; background:var(--bg-color); padding:8px 10px; border-radius:8px;">
                        <span style="background:#2563eb; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; flex-shrink:0;">5</span>
                        <div><strong>חיבור השקית והחגורה:</strong> חבר את השקית לבסיס עד שמיעת "קליק" המאשר נעילה מלאה. חבר את חגורת התמיכה למתן ביטחון מקסימלי ומניעת תלישה.</div>
                    </div>
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_flaminal_guide",
        category: "skin",
        icon: "🧪",
        badge: "ריפוי פצעים",
        title: "מדריך קליני: ריפוי פצעים עם Flaminal (Hydro / Forte)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#eff6ff; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #2563eb;">
                    <strong>טכנולוגיית אנזימים ואלגינט:</strong> פלמינל מספק הטרייה אנזימטית אוטוליטית פעילה (84% יעילות בניקוי Slough) ומאזן את רמת הלחות במיטת הפצע.
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                    <div style="background:#e0f2fe; padding:10px; border-radius:8px; border:1px solid #7dd3fc;">
                        <strong style="color:#0369a1;">💧 Flaminal Hydro</strong>
                        <div style="font-size:11.5px; margin-top:4px;">
                            • להפרשה קלה עד בינונית.<br>
                            • תדירות החלפה: כל 3-4 ימים.<br>
                            • מונע התייבשות מיטת הפצע.
                        </div>
                    </div>
                    <div style="background:#fef3c7; padding:10px; border-radius:8px; border:1px solid #fcd34d;">
                        <strong style="color:#b45309;">🌊 Flaminal Forte</strong>
                        <div style="font-size:11.5px; margin-top:4px;">
                            • להפרשה בינונית עד גבוהה מאוד.<br>
                            • תדירות החלפה: כל 1-2 ימים (בהתחלה).<br>
                            • ספיגה גבוהה ומניעת מסרציה.
                        </div>
                    </div>
                </div>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px; border:1px solid var(--border-color); font-size:12px; margin-bottom:8px;">
                    <strong>3 שלבי יישום:</strong> 1. נקו את הפצע ב-NaCl 0.9% | 2. מרחו שכבה עבה (4-5 מ"מ) מעל הפצע הנקי | 3. כסו בחבישה משנית מתאימה (ספוג/פילם).
                </div>
                <div style="background:#fffbeb; padding:8px 10px; border-radius:6px; font-size:11.5px; color:#92400e; border:1px solid #fde68a;">
                    💡 <strong>מתי לעבור בין הפורמולות?</strong> עברו ל-Forte אם הג'ל הופך נוזלי מדי; עברו ל-Hydro אם מופיעים פתיתים לבנים יבשים בשולי הפצע. חיי מדף: 12 חודשים מפתיחה.
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_wound_basket_2024",
        category: "skin",
        icon: "🩹",
        badge: "סל חבישות 2024",
        title: "סל חבישות מתקדמות 2024 ודירוג פצעי לחץ 1-6",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#f8fafc; border-radius:8px; padding:8px 10px; margin-bottom:8px; border:1px solid var(--border-color);">
                    <strong>סיווג פצעי לחץ בקצרה:</strong><br>
                    • <strong>דרגה 1:</strong> אדמומיות שאינה נעלמת בלחיצה (Non-blanchable).<br>
                    • <strong>דרגה 2:</strong> אובדן חלקי של דרמיס, שלפוחית או מכתש שטחי.<br>
                    • <strong>דרגה 3:</strong> אובדן עובי מלא של עור, נראה שומן תת-עורי.<br>
                    • <strong>דרגה 4:</strong> אובדן רקמה מלא עם חשיפת עצם, גיד או שריר.<br>
                    • <strong>דרגה 5 (Unstageable):</strong> מכוסה כולו ב-Slough צהוב או Eschar שחור.<br>
                    • <strong>דרגה 6 (DTI):</strong> חשד לפגיעה ברקמה עמוקה (סגול/חום כהה, שלפוחית דמית).
                </div>
                <div style="background:#eff6ff; border-radius:8px; padding:8px 10px; font-size:11.5px; border-right:4px solid #0284c7;">
                    <strong>סל חבישות מתקדמות נפוצות:</strong><br>
                    • <strong>ספוגים (Foam):</strong> Permafoam, Tielle, Hydrotac להפרשה בינונית-גבוהה.<br>
                    • <strong>אלגינטים וכסף:</strong> Silvercel Ag, Sorbalgon, Aquacel Ag לפצע מפריש ומזוהם.<br>
                    • <strong>הידרוג'ל:</strong> Dermagran Gel, Promogran לריכוך גלד יבש ונמק שחור.<br>
                    • <strong>מניעת ריח:</strong> Actisorb (פחם פעיל) לפצעים עם ריח רע - אין לגזור!
                </div>
                <div style="margin-top:10px; text-align:center;">
                    <a href="wound_care_protocol.html" target="_blank" style="display:inline-block; background:var(--primary-color); color:white; padding:6px 14px; border-radius:6px; font-weight:bold; font-size:11.5px; text-decoration:none;">📄 פתח פרוטוקול פצעים מלא (להדפסה A4)</a>
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_delirium_admission",
        category: "delirium",
        icon: "🚨",
        badge: "קבלה רפואית",
        title: "זיהוי ואבחנת דליריום בקבלה רפואית (תרשים זרימה ו-DELIRIUM)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#fee2e2; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #dc2626;">
                    <strong style="color:#991b1b;">כלל ברזל בקבלה:</strong> כל בלבול חריף = דליריום עד שהוכח אחרת! דליריום הינו מצב חירום רפואי הפיך בטיפול מוקדם.
                </div>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:10px;">
                    <strong>אלגוריתם קבלה מקוצר:</strong>
                    <ol style="padding-right:18px; margin:4px 0 0 0; font-size:12px;">
                        <li><strong>שינוי חריף בהכרה/התנהגות?</strong> אם כן -></li>
                        <li><strong>בדיקת קשב:</strong> ספירת חודשים/ספרות לאחור. אם יש פגיעה בקשב -></li>
                        <li><strong>תנודתיות ביממה?</strong> (מחמיר בערב / סאנדאונינג) -></li>
                        <li><strong>חשיבה לא מאורגנת או ישנוניות חריגה?</strong> -> <em>חשד גבוה לדליריום!</em></li>
                    </ol>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 10px; font-size:11.5px; margin-bottom:8px;">
                    <strong>גורמים שכיחים (DELIRIUM):</strong><br>
                    <strong>D</strong>rugs (בנזודיאזפינים, אופיואידים) | <strong>E</strong>lectrolytes (נתרן, סוכר) | <strong>L</strong>ack of drugs (גמילה) | <strong>I</strong>nfection (UTI, ריאות) | <strong>R</strong>educed sensory (משקפיים, שמיעה) | <strong>I</strong>ntracranial (שבץ) | <strong>U</strong>rinary/fecal retention (עצירת שתן/צואה) | <strong>M</strong>yocardial (היפוקסיה, לב).
                </div>
                <div style="margin-top:10px; text-align:center;">
                    <a href="delirium_admission_protocol.html" target="_blank" style="display:inline-block; background:#dc2626; color:white; padding:6px 14px; border-radius:6px; font-weight:bold; font-size:11.5px; text-decoration:none;">📄 פתח תרשים זרימה מלא לדליריום בקבלה</a>
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_delirium_comprehensive",
        category: "delirium",
        icon: "🧠",
        badge: "CAM ו-3 ה-D's",
        title: "דליריום בקשישים: מדריך לזיהוי מהיר והתערבות מצילת חיים",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#fffbeb; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #f59e0b;">
                    <strong>אבחנה מבדלת 3 ה-D's:</strong><br>
                    • <strong>דליריום:</strong> הופעה חדה (שעות/ימים), תנודתי, קשב פגוע מאוד, מצב חירום הפיך.<br>
                    • <strong>דמנציה:</strong> הדרגתית (חודשים/שנים), יציב, קשב שמור יחסית בהתחלה, פרוגרסיבי.<br>
                    • <strong>דיכאון:</strong> הפרעת מצב רוח, קשב שמור, תנודות קלות (קשה בבוקר), הפיך.
                </div>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:8px; font-size:12px;">
                    ⚠️ <strong>אזהרה קלינית חמורה:</strong> סכנת פספוס של <em>דליריום היפואקטיבי (שקט)</em>! המטופל שוכב במיטה, שקט וישנוני, ואינו יוצר בעיות לצוות - זהו הסוג השכיח ביותר (מעל 50%) והמסוכן ביותר (15%-30% תמותה באשפוז!).
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 10px; font-size:11.5px;">
                    <strong>עקרונות מניעה HELP (מפחית עד 40% מהמקרים):</strong> ניידות מוקדמת לכורסה | שמירה על שינה בלילה (ללא בדיקות שאינן דחופות) | החזרת משקפיים ומכשירי שמיעה | הידרציה קבועה ואוריינטציה.
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_safety_bathing",
        category: "safety",
        icon: "🚿",
        badge: "בטיחות ברחצה",
        title: "בטיחות ברחצה יומית ומניעת כוויות ונפילות במקלחת",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#eff6ff; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #3b82f6;">
                    <strong>בקרת מים וטמפרטורה:</strong> יש לבדוק את טמפרטורת המים באמצעות מד-חום ייעודי או גב כף היד/אמת המטפל לפני מגע במטופל (טמפרטורה מקסימלית: 38°C).
                </div>
                <ul style="padding-right:18px; margin:0 0 10px 0; font-size:12px;">
                    <li><strong>נעילת גלגלים:</strong> נעילת כסא הרחצה לפני כל העברה.</li>
                    <li><strong>חגורת בטיחות:</strong> רכיסת חגורת אגן בכל שהות על כסא רחצה.</li>
                    <li><strong>נוכחות רציפה:</strong> <em>איסור מוחלט</em> על עזיבת מטופל לבדו במקלחת אפילו לשנייה אחת!</li>
                    <li><strong>רצפה יבשה:</strong> ייבוש רצפת המקלחת למניעת החלקה של המטופל והמטפל.</li>
                    <li><strong>ייבוש ושימון עור:</strong> ייבוש עדין בטפיחות בתוך 3 דקות ומריחת לחות/אבץ בקפלים.</li>
                </ul>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_nutrition_iddsi",
        category: "iddsi",
        icon: "🥣",
        badge: "תזונה ומרקמים",
        title: "מרקמי מזון ונוזלים IDDSI ומניעת אספירציה",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#fef3c7; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #f59e0b;">
                    <strong>התאמת מרקמים למניעת חנק:</strong> כל שינוי במרקם ייקבע על ידי קלינאית תקשורת ומתועד בתוכנית הטיפול.
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:11.5px; margin-bottom:10px;">
                    <div style="background:var(--bg-color); padding:8px; border-radius:6px; border:1px solid var(--border-color);">
                        <strong>נוזלים (רמות 0-4):</strong><br>
                        • רמה 0: נוזל דק (מים, תה)<br>
                        • רמה 1: סמיכות קלה מעט<br>
                        • רמה 2: סמיכות קלה (Mildly thick)<br>
                        • רמה 3: סמיכות בינונית (דמוי יוגורט)<br>
                        • רמה 4: סמיכות קיצונית (בכפית)
                    </div>
                    <div style="background:var(--bg-color); padding:8px; border-radius:6px; border:1px solid var(--border-color);">
                        <strong>מוצקים (רמות 3-7):</strong><br>
                        • רמה 3: נוזלי מעובה<br>
                        • רמה 4: דייסתי אחיד (Pureed)<br>
                        • רמה 5: קצוץ ולח (Minced & Moist)<br>
                        • רמה 6: רך ובגודל נגיסה (Bite-sized)<br>
                        • רמה 7: מזון רגיל
                    </div>
                </div>
                <div style="background:#f0fdf4; border:1px solid #86efac; padding:6px 10px; border-radius:6px; font-size:11.5px;">
                    <strong>תנוחת האכלה:</strong> ישיבה ב-90 מעלות, השהיית ישיבה 30 דקות לאחר הארוחה, ללא שימוש בקשיות שתייה במטופלים דיספגיים.
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_mobility_transfers",
        category: "mobility",
        icon: "🚶",
        badge: "מעברים וניוד",
        title: "שינויי תנוחה, מנופי הרמה ומניעת קרעי עור (Skin Tears)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#eff6ff; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #3b82f6;">
                    <strong>עקרונות הרמה והעברה בטוחה:</strong> התאמת העברה לפי רמת העצמאות של המטופל (FIM) ומניעת כוחות גזירה.
                </div>
                <ul style="padding-right:18px; margin:0 0 10px 0; font-size:12px;">
                    <li><strong>איסור משיכת גפיים:</strong> לעולם אין למשוך מטופל מהידיים, הזרועות או בית השחי (מניעת פריקות וקרעי עור).</li>
                    <li><strong>שימוש בסדין החלקה (Slide Sheet):</strong> חובה בשינוי תנוחה במטופלים סיעודיים כבדים.</li>
                    <li><strong>מנוף הרמה:</strong> תמיד בשני אנשי צוות! בדיקת תקינות הערסל והתאמת גודלו למטופל.</li>
                    <li><strong>סולמות תמיכה ומעקות:</strong> מעקה בטיחות מורד בעת טיפול ומועלה לאחר סיום.</li>
                </ul>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    },
    {
        id: "pocket_medication_beers",
        category: "beers",
        icon: "⚠️",
        badge: "קריטריוני Beers",
        title: "תרופות בעלות סיכון מוגבר בקשישים (Beers Criteria)",
        content: `
            <div style="font-size:12.5px; line-height:1.6; color:var(--text-primary);">
                <div style="background:#fee2e2; border-radius:8px; padding:10px; margin-bottom:10px; border-right:4px solid #dc2626;">
                    <strong>עומס אנטי-כולינרגי וסכנת נפילות:</strong> קשישים רגישים במיוחד לתופעות לוואי מרכזיות וקרדיווסקולריות.
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; font-size:12px;">
                    <div style="background:var(--bg-color); padding:6px 10px; border-radius:6px; border:1px solid var(--border-color);">
                        <strong style="color:#b91c1c;">בנזודיאזפינים ותרופות שינה Z-drugs:</strong> סיכון מוכפל לדליריום, שברים ונפילות ליליות.
                    </div>
                    <div style="background:var(--bg-color); padding:6px 10px; border-radius:6px; border:1px solid var(--border-color);">
                        <strong style="color:#b91c1c;">NSAIDs (נוגדי דלקת שאינם סטרואידים):</strong> סכנת דימום GI, אי ספיקת כליות חריפה והחמרת יל"ד.
                    </div>
                    <div style="background:var(--bg-color); padding:6px 10px; border-radius:6px; border:1px solid var(--border-color);">
                        <strong style="color:#b91c1c;">אנטי-כולינרגיות (Dekinet, Vaben, תרופות לאי-נקיטה):</strong> עצירת שתן, עצירות קשה, טשטוש ודליריום.
                    </div>
                </div>
                <div style="margin-top:10px; font-size:11px; color:var(--text-secondary); text-align:left; border-top:1px dashed var(--border-color); padding-top:6px;">
                    ✍️ נוצר על ידי מאיה שקולניק גזית | R.N, BA, M.H.A, Policy Management Specialist
                </div>
            </div>
        `
    }
];


function renderPocketGuides() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="fade-in space-y-6">
            <!-- Header Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:14px 20px; border-radius:14px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                    <span>➜</span> חזרה לדשבורד הראשי
                </button>
                <div style="text-align:center;">
                    <h2 style="font-size:18px; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <span>📱</span> כרטיסיות עזר מהירות לנייד (Clinical Pocket Guides)
                    </h2>
                    <span style="font-size:12px; color:var(--text-secondary);">מדריכים קליניים מתומצתים ומעשיים לשליפה מהירה ליד מיטת המטופל</span>
                </div>
                <button onclick="window.print()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); font-size:12px; padding:8px 14px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                    <span>🖨️</span> הדפס כרטיסיות
                </button>
            </div>

            <!-- Search & Category Filters (Mobile Optimized) -->
            <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:14px; padding:14px; space-y:12px;">
                <div style="position:relative;">
                    <input type="text" id="pocket-search-input" oninput="handlePocketSearch(this.value)" placeholder="חפש מושג, סוג פצע, IAD, מרקם, רחצה, תרופה..." value="${pocketSearchQuery}" style="width:100%; padding:10px 14px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
                </div>

                <div style="display:flex; gap:6px; flex-wrap:wrap; overflow-x:auto; padding-bottom:4px;">
                    <button onclick="filterPocketCategory('all')" class="btn" style="${activePocketCategory==='all' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">הכל</button>
                    <button onclick="filterPocketCategory('skin_iad')" class="btn" style="${activePocketCategory==='skin_iad' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🛡️ עור ו-IAD</button>
                    <button onclick="filterPocketCategory('bathing')" class="btn" style="${activePocketCategory==='bathing' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🛁 סיכוני רחצה</button>
                    <button onclick="filterPocketCategory('wounds')" class="btn" style="${activePocketCategory==='wounds' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🩹 אטלס פצעים</button>
                    <button onclick="filterPocketCategory('iddsi')" class="btn" style="${activePocketCategory==='iddsi' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🥄 מרקמים (IDDSI)</button>
                    <button onclick="filterPocketCategory('mobility')" class="btn" style="${activePocketCategory==='mobility' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🚶 מעברים וניוד</button>
                    <button onclick="filterPocketCategory('delirium')" class="btn" style="${activePocketCategory==='delirium' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">🧠 דליריום (CAM)</button>
                    <button onclick="filterPocketCategory('beers')" class="btn" style="${activePocketCategory==='beers' ? 'background:var(--primary-color); color:white;' : 'background:var(--bg-color); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:11.5px; padding:6px 12px; border-radius:8px; font-weight:700;">⚠️ קריטריוני Beers</button>
                </div>
            </div>

            <!-- Pocket Cards Container -->
            <div class="pocket-grid" id="pocket-cards-container">
                <!-- Dynamically rendered -->
            </div>
        </div>
    `;

    renderPocketCards();
}

function filterPocketCategory(cat) {
    activePocketCategory = cat;
    renderPocketGuides();
}

function handlePocketSearch(val) {
    pocketSearchQuery = val.trim().toLowerCase();
    renderPocketCards();
}

function renderPocketCards() {
    const container = document.getElementById('pocket-cards-container');
    if (!container) return;

    const filtered = pocketGuidesMasterData.filter(g => {
        const matchesCategory = (activePocketCategory === 'all' || g.category === activePocketCategory);
        const matchesSearch = (!pocketSearchQuery || 
            g.title.toLowerCase().includes(pocketSearchQuery) || 
            g.content.toLowerCase().includes(pocketSearchQuery) ||
            g.badge.toLowerCase().includes(pocketSearchQuery)
        );
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:30px; color:var(--text-secondary);">לא נמצאו כרטיסיות תואמות לחיפוש שלך.</div>';
        return;
    }

    container.innerHTML = filtered.map((g, idx) => `
        <div class="pocket-guide-card" id="pocket-card-${g.id}">
            <div class="pocket-guide-header" onclick="togglePocketCard('${g.id}')">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:24px;">${g.icon}</span>
                    <div>
                        <span class="badge" style="background:rgba(2,132,199,0.12); color:#0284c7; font-size:10.5px; padding:2px 7px; border-radius:4px; font-weight:bold;">${g.badge}</span>
                        <h4 style="margin:4px 0 0 0; font-size:14px; font-weight:800; color:var(--text-primary); line-height:1.35;">${g.title}</h4>
                    </div>
                </div>
                <span id="pocket-chevron-${g.id}" style="font-size:14px; color:var(--text-secondary); transition:transform 0.2s;">▼</span>
            </div>
            <div class="pocket-guide-body" id="pocket-body-${g.id}">
                ${g.content}
            </div>
        </div>
    `).join('');
}

function togglePocketCard(id) {
    const body = document.getElementById('pocket-body-' + id);
    const chevron = document.getElementById('pocket-chevron-' + id);
    if (!body) return;
    if (body.style.display === 'none') {
        body.style.display = 'block';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
        body.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
}


// ==============================================================
// 1. NUMBERED USER GUIDE & INTERACTIVE TABLE OF CONTENTS (TOC)
// ==============================================================
function renderUserGuideView() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="fade-in space-y-6">
            <!-- Header Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:16px 22px; border-radius:14px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                    <span>➜</span> מעבר לדשבורד הראשי
                </button>
                <div style="text-align:center;">
                    <div style="font-size:11px; font-weight:bold; color:var(--primary-color); text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">
                        פורטל ניהול איכות ובטיחות ארגונית
                    </div>
                    <h2 style="font-size:20px; font-weight:900; color:var(--text-primary); margin:0; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <span>📖</span> דף מנחה למשתמש ותוכן עניינים ממוספר
                    </h2>
                    <span style="font-size:12px; color:var(--text-secondary);">מפת הדרכים המלאה של הפורטל: אינדקס 15 הלשוניות, מטרות, קהל יעד והנחיות שימוש</span>
                </div>
                <button onclick="window.print()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); font-size:12px; padding:8px 14px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                    <span>🖨️</span> הדפס מדריך A4
                </button>
            </div>

            <!-- Ethical Standard & Security Notice -->
            <div style="background:rgba(2, 132, 199, 0.08); border-right:4px solid #0284c7; padding:12px 18px; border-radius:0 10px 10px 0; font-size:12.5px; color:var(--text-primary); display:flex; align-items:center; justify-content:space-between;">
                <div>
                    <strong>🛡️ עקרונות אתיקה ואבטחת מידע:</strong> הפורטל מיועד להדרכה, הערכת כשירות קלינית, בקרה וממשקי עבודה מחלקתיים. 
                    <span style="color:var(--text-secondary);">תוכניות טיפול פרטניות מנוהלות אך ורק בגיליון הרפואי הממוחשב (EHR).</span>
                </div>
                <span class="badge" style="background:#0284c7; color:white; font-size:11px; padding:3px 9px; border-radius:6px; font-weight:bold;">גרסה 2026.11</span>
            </div>

            <!-- Quick Search in Guide -->
            <div style="background:var(--surface); border:1px solid var(--border-color); border-radius:12px; padding:12px 16px;">
                <input type="text" id="guide-search-input" oninput="filterUserGuideTOC(this.value)" placeholder="חפש נושא במדריך (למשל: סוכן תרופות, IAD, רחצה, בקרות, CDSS, הרשמה)..." style="width:100%; padding:9px 14px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-color); color:var(--text-primary); font-size:13px; box-sizing:border-box;">
            </div>

            <!-- Interactive Numbered Table of Contents (TOC Cards Grid) -->
            <div class="interprof-card" style="padding:22px;">
                <h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-top:0; margin-bottom:15px; display:flex; align-items:center; gap:8px;">
                    <span>📑</span> תוכן עניינים אינטראקטיבי - 15 לשוניות הפורטל
                </h3>
                <p style="font-size:12.5px; color:var(--text-secondary); margin-top:0; margin-bottom:18px;">
                    לחץ/י על כל כרטיסייה לניווט ישיר ללשונית הרצויה באתר או לצפייה בהנחיות המפורטות להלן:
                </p>

                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(290px, 1fr)); gap:12px;" id="toc-grid-container">
                    ${getUserGuideTOCItems().map(item => `
                        <div onclick="navigate('${item.navKey}')" style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:10px; padding:14px; cursor:pointer; transition:all 0.2s ease; display:flex; flex-direction:column; justify-content:space-between;" onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='none'">
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                    <span style="font-size:11px; font-weight:bold; background:var(--primary-color); color:white; padding:2px 7px; border-radius:4px;">לשונית ${item.num}</span>
                                    <span style="font-size:18px;">${item.icon}</span>
                                </div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; line-height:1.35;">${item.num}. ${item.title}</strong>
                                <p style="font-size:11.5px; color:var(--text-secondary); margin:6px 0 0 0; line-height:1.4;">${item.desc}</p>
                            </div>
                            <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); pt:6px; padding-top:6px;">
                                <span style="font-size:10.5px; color:var(--primary-color); font-weight:bold;">מעבר ללשונית ➜</span>
                                <span style="font-size:10.5px; color:var(--text-secondary);">${item.audience}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Detailed Chapters Section -->
            <div class="space-y-4" id="guide-detailed-chapters">
                <h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin:20px 0 10px 0; display:flex; align-items:center; gap:8px;">
                    <span>📚</span> פירוט מודולי המערכת והנחיות הפעלה שלב-אחר-שלב
                </h3>

                ${getUserGuideTOCItems().map(item => `
                    <div class="interprof-card" id="guide-chapter-${item.num}" style="padding:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span style="font-size:24px;">${item.icon}</span>
                                <div>
                                    <div style="font-size:11px; font-weight:bold; color:var(--primary-color);">לשונית מספר ${item.num}</div>
                                    <h4 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0;">${item.num}. ${item.title}</h4>
                                </div>
                            </div>
                            <button onclick="navigate('${item.navKey}')" class="btn" style="background:var(--primary-color); color:white; font-size:11.5px; font-weight:bold; padding:5px 12px; border-radius:6px;">
                                פתח לשונית זו ➜
                            </button>
                        </div>

                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px; font-size:12.5px;">
                            <div style="background:var(--bg-color); padding:12px; border-radius:8px;">
                                <strong style="color:var(--text-primary); display:block; margin-bottom:4px;">🎯 מטרת המודול:</strong>
                                <p style="margin:0; color:var(--text-secondary); line-height:1.5;">${item.fullObjective}</p>
                            </div>
                            <div style="background:var(--bg-color); padding:12px; border-radius:8px;">
                                <strong style="color:var(--text-primary); display:block; margin-bottom:4px;">👥 קהל יעד מיועד:</strong>
                                <p style="margin:0; color:var(--text-secondary); line-height:1.5;">${item.fullAudience}</p>
                            </div>
                        </div>

                        <div style="margin-top:12px; font-size:12.5px; background:rgba(2, 132, 199, 0.04); border:1px solid rgba(2, 132, 199, 0.15); border-radius:8px; padding:12px;">
                            <strong style="color:#0369a1; display:block; margin-bottom:6px;">🛠️ כיצד להשתמש שלב-אחר-שלב:</strong>
                            <ol style="margin:0 0 0 18px; padding:0; color:var(--text-primary); line-height:1.55;">
                                ${item.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getUserGuideTOCItems() {
    return [
        {
            num: 1,
            title: "דף מנחה למשתמש ותוכן עניינים",
            navKey: "user-guide",
            icon: "📖",
            desc: "מפת הדרכים של הפורטל, אינדקס 15 הלשוניות, מטרות והנחיות שימוש שלב-אחר-שלב.",
            audience: "כלל הצוות, מנהלות, מנטוריות",
            fullObjective: "מתן התמצאות מערכתית מלאה בכלל מודולי הפורטל, הגדרת נהלי אבטחת מידע, ואיתור מהיר של כלי עבודה.",
            fullAudience: "אחיות אחראיות, אחיות צוות, מקצועות הבריאות, מנהלי מחלקות ונאמני איכות.",
            steps: [
                "עיין/י בתוכן העניינים האינטראקטיבי כדי להכיר את 15 הלשוניות.",
                "השתמש/י בתיבת החיפוש לאיתור מהיר של מודול או כלי עבודה.",
                "לחץ/י על כפתור הניווט הישיר למעבר מיידי לכל לשונית באתר."
            ]
        },
        {
            num: 2,
            title: "הדרכת מבוא לאיכות ובטיחות",
            navKey: "intro",
            icon: "💡",
            desc: "עקרונות איכות קלינית, עקרונות תחקור אירוע חריג ותרבות בטיחות מוסדית.",
            audience: "קליטת עובדים וריענון צוות",
            fullObjective: "הטמעת שפת איכות אחידה, זיהוי כשלים בטיחותיים, וקידום תרבות דיווח ללא אשם (Just Culture).",
            fullAudience: "כלל עובדי בית החולים בעת קליטה וברענון שנתי.",
            steps: [
                "מעבר על שקופיות ההדרכה האינטראקטיביות.",
                "לימוד עקרונות תחקור סיבת שורש (RCA) ומניעת הישנות אירועים.",
                "ביצוע בוחן הבנה קצר בסיום ההדרכה."
            ]
        },
        {
            num: 3,
            title: "טיפ השבוע בבטיחות הטיפול",
            navKey: "tip",
            icon: "✨",
            desc: "מסר שבועי קצר ומרענן עם דגש קליני בטיחותי מתחלף לצוות המחלקתי.",
            audience: "כלל אנשי הצוות",
            fullObjective: "שמירה על ערנות בטיחותית שוטפת באמצעות מסר קליני קצר וממוקד הניתן לתרגול מיידי במשמרת.",
            fullAudience: "אחיות, רופאים, מטפלים ומקצועות הבריאות בתדריכי בוקר וערב.",
            steps: [
                "קריאת טיפ השבוע בתחילת משמרת הבוקר בימי ראשון.",
                "שיתוף הטיפ בתדריך המחלקתי (Huddle).",
                "מעקב אחר יישום הדגש הקליני בשטח."
            ]
        },
        {
            num: 4,
            title: "דשבורד בקרה ראשי",
            navKey: "dashboard",
            icon: "📊",
            desc: "לוח מחוונים מרכזי: אחוזי עמידה בבקרות, התפלגות ציונים וגרפים מחלקתיים.",
            audience: "הנהלה ואחיות אחראיות",
            fullObjective: "תמונת מצב בזמן אמת של ציוני הבקרה המוסדיים, פערי ביצוע, והתפלגות עמידה ביעדי איכות.",
            fullAudience: "הנהלת סיעוד, מנהלות איכות, אחיות אחראיות ומנטוריות.",
            steps: [
                "סינון הנתונים לפי מחלקה, סוג כלי בקרה ותקופת זמן.",
                "סקירת אחוזי עמידה מעל/מתחת לסף המעבר (85%).",
                "זיהוי מחלקות ונושאים הדורשים תוכנית תיקון מידית (CAPA)."
            ]
        },
        {
            num: 5,
            title: "ערכת הדרכה בקליטה",
            navKey: "onboarding",
            icon: "🎓",
            desc: "תוכנית קליטה מובנית לאחיות ומטפלים חדשים, צ'ק-ליסטים וחניכה מחלקתית.",
            audience: "עובדים חדשים ומנטורים",
            fullObjective: "הבטחת קליטה שיטתית, בטוחה ומדורגת של אנשי צוות חדשים, מבוססת אבני דרך וכשירויות ליבה.",
            fullAudience: "אחיות חדשות, מטפלים סיעודיים, אחיות קולטות ומנטוריות מחלקה.",
            steps: [
                "בחירת תיק עובד/ת חדש/ה.",
                "מילוי צ'ק-ליסט ימי הקליטה הראשונים (יום 1, שבוע 1, חודש 1).",
                "מעקב חתימות מנטורית ואישור כשירות עצמאית."
            ]
        },
        {
            num: 6,
            title: "הכשרת אחראית משמרת וסוכן תרופות",
            navKey: "shift-supervisor",
            icon: "🩺",
            desc: "פיתוח מנהיגות, מודל אפר'ת, וסוכן AI לבנק שאלות בפרמקולוגיה גריאטרית.",
            audience: "אחראיות משמרת ומנטוריות",
            fullObjective: "בניית מיומנויות ניהול משמרת, תקשורת במצבי קונפליקט (אפר'ת), והסמכה ממוחשבת בטיפול תרופתי בטוח.",
            fullAudience: "אחיות המיועדות להסמכה כאחראיות משמרת, אחיות אחראיות ובוחנות קליניות.",
            steps: [
                "תרגול מודל אפר'ת על מקרי בוחן ניהוליים מעשיים.",
                "הפעלת סוכן ה-AI לעדכון חודשי מבוסס ספרות (Lippincott & Beers 2023).",
                "ביצוע מבחן תרופות רשמי (20 שאלות, סף מעבר 85% + 100% חישוב רוקחי) ותרגול עצמי."
            ]
        },
        {
            num: 7,
            title: "דשבורד יעדים וממשקים רב-מקצועיים",
            navKey: "interprofessional",
            icon: "🎯",
            desc: "סנכרון מחלקתי אתי: מניעת פצעים, בטיחות רחצה, ניוד, מרקמים ומטריצת אחריות.",
            audience: "כלל הצוות הרב-מקצועי",
            fullObjective: "תיאום וסנכרון בין סיעוד, פיזיותרפיה, ריפוי בעיסוק, תזונה ורפואה סביב יעדי איכות מחלקתיים מדידים.",
            fullAudience: "אחיות, מטפלים, פיזיותרפיסטים, מרפאים בעיסוק, דיאטניות, קלינאיות תקשורת ורופאים.",
            steps: [
                "סקירת 4 יעדי האיכות המחלקתיים (עור/IAD, רחצה, ניוד, IDDSI).",
                "בדיקת חלוקת האחריות במטריצת הממשקים הקלינית.",
                "שימוש בצ'ק-ליסט השבועי למפגש צוות רב-מקצועי (Huddle)."
            ]
        },
        {
            num: 8,
            title: "כרטיסיות עזר מהירות לנייד (Pocket Guides)",
            navKey: "pocket-guides",
            icon: "📱",
            desc: "כרטיסיות כיס נשלפות: שלמות עור ו-IAD, סיכוני רחצה, אטלס פצעים, IDDSI, CAM ו-Beers.",
            audience: "צוות בשטח ליד המיטה",
            fullObjective: "שליפה מיידית של הנחיות קליניות מצילות חיים ואבחנה מבדלת מסמארטפון או טאבלט בעת הטיפול.",
            fullAudience: "אחיות משמרת, מטפלים סיעודיים, כוננים וסטודנטים בסיעוד.",
            steps: [
                "פתיחת המדריך מסמארטפון/טאבלט.",
                "סינון מהיר לפי קטגוריה (עור, רחצה, פצעים, מרקמים, ניוד).",
                "שימוש באטלס הפצעים לאבחנה מבדלת (IAD, פצע לחץ, קרע עור, כיב ורידי/עורקי)."
            ]
        },
        {
            num: 9,
            title: "לומדות והדרכות צוות",
            navKey: "trainings",
            icon: "📚",
            desc: "ספריית לומדות אינטראקטיביות מחלקתיות, סרטוני הדרכה והעשרה מקצועית.",
            audience: "כלל אנשי הצוות",
            fullObjective: "ריענון ידע מקצועי ושימור כשירות קלינית בתחומי ליבה (החייאה, מניעת זיהומים, בטיחות).",
            fullAudience: "אחיות, מטפלים וצוותים פרא-רפואיים.",
            steps: [
                "בחירת לומדה מתוך הספרייה.",
                "צפייה בלומדה או בסרטון ההדרכה.",
                "ביצוע מבדק ידע קצר בסיום וקבלת אישור השלמה."
            ]
        },
        {
            num: 10,
            title: "לומדות משרד הבריאות",
            navKey: "external-moh",
            icon: "🌍",
            desc: "קישור ישיר למערכת הלמידה הלאומית של משרד הבריאות (Educ).",
            audience: "כלל הצוות הסיעודי והרפואי",
            fullObjective: "השלמת לומדות חובה לאומיות והסמכות ממשלתיות רשמיות.",
            fullAudience: "אחיות ורופאים הנדרשים לחידוש הסמכות תקופתיות.",
            steps: [
                "לחיצה על הלשונית פותחת את פורטל הלמידה הממשלתי בלשונית נפרדת.",
                "הזנת פרטי הזדהות ממשלתיים.",
                "השלמת לומדות החובה ושליחת אישור למנהלת המחלקה."
            ]
        },
        {
            num: 11,
            title: "מערכת תומכת החלטה קלינית (CDSS)",
            navKey: "cdss",
            icon: "🩺",
            desc: "מערכת מחשבונים קליניים ואומדנים מותאמים לאוכלוסייה הגריאטרית.",
            audience: "אחיות ורופאים",
            fullObjective: "תמיכה בקבלת החלטות טיפוליות, חישובי מינון, אומדני שבריריות וסיכונים מורכבים.",
            fullAudience: "צוות סיעודי ורפואי בעת קבלה, שחרור והערכה מחודשת של מטופלים.",
            steps: [
                "צפייה במערכת המשולבת ישירות בתוך הפורטל.",
                "הזנת מדדים קליניים לקבלת המלצות טיפוליות מבוססות ראיות.",
                "לחיצה על '➜ חזרה לדשבורד הראשי' לחזרה נוחה בכל עת."
            ]
        },
        {
            num: 12,
            title: "נהלי עבודה מוסדיים",
            navKey: "procedures",
            icon: "📖",
            desc: "ספריית נהלי עבודה מחייבים, פרוטוקולי חירום ובטיחות הטיפול.",
            audience: "כלל עובדי המוסד",
            fullObjective: "הנגשת נהלי העבודה המעודכנים, הנחיות משרד הבריאות ופקודות שגרה וחירום.",
            fullAudience: "כלל הסקטורים הרפואיים, הסיעודיים והמנהליים.",
            steps: [
                "חיפוש נוהל לפי מילת מפתח או קטגוריה.",
                "קריאת הנוהל המלא או הורדת קובץ PDF.",
                "בדיקת תאריך תוקף הנוהל וסעיפי הביצוע המחייבים."
            ]
        },
        {
            num: 13,
            title: "טפסים ופרוטוקולים טיפוליים",
            navKey: "protocols",
            icon: "📑",
            desc: "טפסים קליניים להורדה, הדפסה ומילוי מחלקתי (בטיחות, פצעים, החייאה).",
            audience: "צוות מחלקתי בשטח",
            fullObjective: "אספקת טפסים ופרוטוקולים רשמיים לפעילות השוטפת במחלקה.",
            fullAudience: "אחיות אחראיות, אחיות צוות ומזכירות רפואיות.",
            steps: [
                "איתור הטופס המבוקש.",
                "הורדה או הדפסה ישירה לעבודה ליד מיטת המטופל.",
                "שמירת עותק מתועד בתיק המטופל לפי הנהלים."
            ]
        },
        {
            num: 14,
            title: "כלי בקרה ומבדקי ידע (CAPA)",
            navKey: "forms",
            icon: "📝",
            desc: "מילוי כלי בקרה דיגיטליים, ציון אוטומטי, מבדקי ידע ודוח ממצאים לתיקון.",
            audience: "אחיות אחראיות ונאמני איכות",
            fullObjective: "ביצוע בקרות תקופתיות שיטתיות, הפקת ציון איכות מיידי ודוח פעולות מתקנות (CAPA).",
            fullAudience: "מנהלות איכות, אחיות אחראיות, נאמני בטיחות ומפקחות קליניות.",
            steps: [
                "בחירת כלי הבקרה הרצוי (בטיחות תרופתית, מניעת זיהומים, עגלת החייאה וכו').",
                "מילוי סעיפי הבקרה בזמן אמת.",
                "בדיקת הציון המסכם, קריאת ממצאי הליקויים ושמירת דוח ה-CAPA."
            ]
        },
        {
            num: 15,
            title: "פורטל מעקב ובקרה למנהל",
            navKey: "manager-portal",
            icon: "📊",
            desc: "פורטל ניהולי רוחבי לבקרה ומעקב אחר ביצועים, כשירויות ותוכניות עבודה.",
            audience: "הנהלה בכירה ומנהלי איכות",
            fullObjective: "מבט-על ארגוני לצורך קבלת החלטות ניהוליות והערכת עמידה בתוכניות עבודה שנתיות.",
            fullAudience: "הנהלת בית החולים, מנהלי אגפים, מנהלת הסיעוד ומנהלת האיכות.",
            steps: [
                "כניסה לתצוגת הפורטל הניהולי המשולבת.",
                "מעקב אחר משימות חוצות-מחלקות וצווארי בקבוק.",
                "לחיצה על '➜ חזרה לדשבורד הראשי' לחזרה נוחה בכל עת."
            ]
        }
    ];
}

function filterUserGuideTOC(query) {
    const q = query.trim().toLowerCase();
    const items = getUserGuideTOCItems();
    
    // Filter cards
    const grid = document.getElementById('toc-grid-container');
    if (grid) {
        const filtered = items.filter(it => 
            !q || 
            it.title.toLowerCase().includes(q) || 
            it.desc.toLowerCase().includes(q) || 
            it.fullObjective.toLowerCase().includes(q)
        );
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:20px; color:var(--text-secondary);">לא נמצאו לשוניות התואמות לחיפוש שלך.</div>';
        } else {
            grid.innerHTML = filtered.map(item => `
                <div onclick="navigate('${item.navKey}')" style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:10px; padding:14px; cursor:pointer; transition:all 0.2s ease; display:flex; flex-direction:column; justify-content:space-between;" onmouseover="this.style.borderColor='var(--primary-color)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='none'">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                            <span style="font-size:11px; font-weight:bold; background:var(--primary-color); color:white; padding:2px 7px; border-radius:4px;">לשונית ${item.num}</span>
                            <span style="font-size:18px;">${item.icon}</span>
                        </div>
                        <strong style="font-size:13px; color:var(--text-primary); display:block; line-height:1.35;">${item.num}. ${item.title}</strong>
                        <p style="font-size:11.5px; color:var(--text-secondary); margin:6px 0 0 0; line-height:1.4;">${item.desc}</p>
                    </div>
                    <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:6px;">
                        <span style="font-size:10.5px; color:var(--primary-color); font-weight:bold;">מעבר ללשונית ➜</span>
                        <span style="font-size:10.5px; color:var(--text-secondary);">${item.audience}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}


// ==============================================================
// CDSS & MANAGER PORTAL EMBEDDED VIEWS WITH RETURN NAVIGATION
// ==============================================================
function renderCdssView() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    contentArea.innerHTML = `
        <div class="view-header-bar" style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:12px 18px; border-radius:12px; margin-bottom:15px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
            <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                <span>➜</span> חזרה לדשבורד הראשי
            </button>
            <div style="font-weight:bold; font-size:15px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                <span>🩺</span> מערכת תומכת החלטה קלינית (CDSS) המותאמת לאוכלוסייה הגריאטרית
            </div>
            <a href="https://geriatric-cdss-calculator2.vercel.app/" target="_blank" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); text-decoration:none; font-size:12px; padding:8px 14px; border-radius:8px;">
                פתח בחלון נפרד ↗
            </a>
        </div>
        <iframe src="https://geriatric-cdss-calculator2.vercel.app/" style="width:100%; height:calc(100vh - 175px); min-height:650px; border:none; border-radius:12px; background:white; box-shadow:0 4px 15px rgba(0,0,0,0.06);" title="CDSS"></iframe>
    `;
}

function renderManagerPortalView() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    contentArea.innerHTML = `
        <div class="view-header-bar" style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:12px 18px; border-radius:12px; margin-bottom:15px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
            <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                <span>➜</span> חזרה לדשבורד הראשי
            </button>
            <div style="font-weight:bold; font-size:15px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                <span>📊</span> פורטל מעקב ובקרה למנהל
            </div>
            <a href="https://organizational-nurse-management-wor.vercel.app/" target="_blank" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); text-decoration:none; font-size:12px; padding:8px 14px; border-radius:8px;">
                פתח בחלון נפרד ↗
            </a>
        </div>
        <iframe src="https://organizational-nurse-management-wor.vercel.app/" style="width:100%; height:calc(100vh - 175px); min-height:650px; border:none; border-radius:12px; background:white; box-shadow:0 4px 15px rgba(0,0,0,0.06);" title="פורטל מעקב ובקרה למנהל"></iframe>
    `;
}
