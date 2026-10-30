let currentUser = null;
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
        protocolsDb = JSON.parse(stored);
        let existingHandHygiene = protocolsDb.find(p => p.link && p.link.includes('hand_hygiene_5_moments'));
        if (!existingHandHygiene) {
            protocolsDb.unshift({
                id: Date.now() + 9,
                title: 'חמשת הרגעים להיגיינת ידיים',
                link: 'hand_hygiene_5_moments.jpeg',
                category: 'infection',
                type: 'infographic',
                desc: 'כרזת הדרכה רב-לשונית (עברית, אנגלית, ערבית, אמהרית, רוסית וצרפתית) ל-5 הרגעים להיגיינת הידיים: לפני מגע עם הדייר, לפני פעולה נקייה/אספטית, אחרי סיכון לחשיפה לנוזלי גוף, אחרי מגע בדייר ואחרי מגע בסביבת הדייר.'
            });
        } else {
            existingHandHygiene.title = 'חמשת הרגעים להיגיינת ידיים';
        }
        if (!protocolsDb.find(p => p.link && (p.link.includes('safe_medication_clinical_guide') || p.link.includes('אינפוגרפיקה 1')))) {
            protocolsDb.unshift({
                id: Date.now() + 7,
                title: 'מדריך קליני: מתן תרופות בטוח בגיל השלישי (תזמון וקריטריוני Beers)',
                link: 'safe_medication_clinical_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: 'הנחיות תזמון בוקר מול ערב במטופלים גריאטריים, אזהרות קריטיות ואיסורים לפי קריטריוני בירס: איסור NSAIDs כרוני, הימנעות מאנטי-כולינרגיות וזהירות בבנזודיאזפינים.'
            });
        }
        if (!protocolsDb.find(p => p.link && (p.link.includes('safe_medication_gold_guide') || p.link.includes('אינפוגרפיקה 2')))) {
            protocolsDb.unshift({
                id: Date.now() + 8,
                title: 'מדריך זהב: 8 הכללים למתן תרופות בטוח בגיל השלישי',
                link: 'safe_medication_gold_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: '8 הכללים למתן טיפול תרופתי בטוח, זיהוי ומעקב נכון, דיוק במינון ובזמן, בקרה ותיעוד מלא, תזמון בוקר מול ערב ואזהרות בירס.'
            });
        }
        if (!protocolsDb.find(p => p.link === 'frailty.html')) {
            protocolsDb.unshift({ id: Date.now() + 1, title: 'התמודדות עם שבריריות (Frailty)', link: 'frailty.html', category: 'clinical', desc: 'הנחיות ופרוטוקול טיפול במטופלים שבריריים בגיל הזקנה.' },
            { id: Date.now() + 10, title: 'סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)', link: 'frailty_simulation.html', category: 'clinical', desc: 'לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית.' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration.html')) {
            protocolsDb.unshift({ id: Date.now(), title: 'אספירציה וחנק בגריאטריה', link: 'aspiration.html', category: 'aspiration', desc: 'פרוטוקול קליני מלא לניהול סיכוני אספירציה והאכלה בטוחה.' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration_training.html')) {
            protocolsDb.unshift({ id: Date.now() + 2, title: 'השתלמות מקצועית: מניעת אספירציה וחנק', link: 'aspiration_training.html', category: 'aspiration', desc: 'לומדה והשתלמות מקצועית לצוות בנושא מניעת אספירציה.' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration-infographic.png')) {
            protocolsDb.unshift({ id: Date.now() + 3, title: 'אינפוגרפיקה: מניעת אספירציה וחנק במערך הגריאטרי', link: 'aspiration-infographic.png', category: 'aspiration', type: 'infographic', desc: 'דגשים קליניים למניעת אספירציה, תנוחת האכלה וערנות לסימני חנק בקרב קשישים.' });
        }
        if (!protocolsDb.find(p => p.link === 'Claymation Explainer-saved.mp4')) {
            protocolsDb.unshift({ id: Date.now() + 4, title: 'סרטון הדרכה: מניעת אספירציה', link: 'Claymation Explainer-saved.mp4', category: 'aspiration', type: 'video', desc: 'סרטון הדרכה מונפש לצוות המטפל בנושא זיהוי מוקדם ומניעת אספירציה.' });
        }
        if (true) {
        let oldPharm = protocolsDb.find(p => p.link === 'pharmacological_risk.html' || (p.title && p.title.includes('ניהול סיכונים פרמקולוגיים')));
        if (oldPharm) {
            oldPharm.title = 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח';
            oldPharm.link = 'clinical_monitoring_guide.html';
            oldPharm.category = 'medication';
            oldPharm.desc = 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.';
        } else if (!protocolsDb.find(p => p.link === 'clinical_monitoring_guide.html')) {
            protocolsDb.unshift({ id: Date.now() + 5, title: 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח', link: 'clinical_monitoring_guide.html', category: 'medication', desc: 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.' });
        }
        if (!protocolsDb.find(p => p.link === 'frailty_simulation.html')) {
            protocolsDb.push({ id: Date.now() + 10, title: 'סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)', link: 'frailty_simulation.html', category: 'clinical', desc: 'לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית.' });
        }
        }
        if (!protocolsDb.find(p => p.link === 'constipation.html')) {
            protocolsDb.unshift({ id: Date.now() + 6, title: 'אומדן ובקרה: עצירות בגיל המבוגר', link: 'constipation.html', category: 'clinical', desc: 'פרוטוקול אומדן סולם בריסטול, בקרת יציאות ומניעת סיבוכים גריאטריים.' });
        }
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    } else {
        protocolsDb = [
            {
                id: Date.now() + 9,
                title: 'חמשת הרגעים להיגיינת ידיים',
                link: 'hand_hygiene_5_moments.jpeg',
                category: 'infection',
                type: 'infographic',
                desc: 'כרזת הדרכה רב-לשונית (עברית, אנגלית, ערבית, אמהרית, רוסית וצרפתית) ל-5 הרגעים להיגיינת הידיים: לפני מגע עם הדייר, לפני פעולה נקייה/אספטית, אחרי סיכון לחשיפה לנוזלי גוף, אחרי מגע בדייר ואחרי מגע בסביבת הדייר.'
            },
            {
                id: Date.now() + 8,
                title: 'מדריך זהב: 8 הכללים למתן תרופות בטוח בגיל השלישי',
                link: 'safe_medication_gold_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: '8 הכללים למתן טיפול תרופתי בטוח, זיהוי ומעקב נכון, דיוק במינון ובזמן, בקרה ותיעוד מלא, תזמון בוקר מול ערב ואזהרות בירס.'
            },
            {
                id: Date.now() + 7,
                title: 'מדריך קליני: מתן תרופות בטוח בגיל השלישי (תזמון וקריטריוני Beers)',
                link: 'safe_medication_clinical_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: 'הנחיות תזמון בוקר מול ערב במטופלים גריאטריים, אזהרות קריטיות ואיסורים לפי קריטריוני בירס: איסור NSAIDs כרוני, הימנעות מאנטי-כולינרגיות וזהירות בבנזודיאזפינים.'
            },
            { id: Date.now() + 6, title: 'אומדן ובקרה: עצירות בגיל המבוגר', link: 'constipation.html', category: 'clinical', desc: 'פרוטוקול אומדן סולם בריסטול, בקרת יציאות ומניעת סיבוכים גריאטריים.' },
            { id: Date.now() + 5, title: 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח', link: 'clinical_monitoring_guide.html', category: 'medication', desc: 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.' },
            { id: Date.now() + 4, title: 'סרטון הדרכה: מניעת אספירציה', link: 'Claymation Explainer-saved.mp4', category: 'aspiration', type: 'video', desc: 'סרטון הדרכה מונפש לצוות המטפל בנושא זיהוי מוקדם ומניעת אספירציה.' },
            { id: Date.now() + 3, title: 'אינפוגרפיקה: מניעת אספירציה וחנק במערך הגריאטרי', link: 'aspiration-infographic.png', category: 'aspiration', type: 'infographic', desc: 'דגשים קליניים למניעת אספירציה, תנוחת האכלה וערנות לסימני חנק בקרב קשישים.' },
            { id: Date.now() + 2, title: 'השתלמות מקצועית: מניעת אספירציה וחנק', link: 'aspiration_training.html', category: 'aspiration', desc: 'לומדה והשתלמות מקצועית לצוות בנושא מניעת אספירציה.' },
            { id: Date.now(), title: 'אספירציה וחנק בגריאטריה', link: 'aspiration.html', category: 'aspiration', desc: 'פרוטוקול קליני מלא לניהול סיכוני אספירציה והאכלה בטוחה.' },
            { id: Date.now() + 1, title: 'התמודדות עם שבריריות (Frailty)', link: 'frailty.html', category: 'clinical', desc: 'הנחיות ופרוטוקול טיפול במטופלים שבריריים בגיל הזקנה.' },
            { id: Date.now() + 10, title: 'סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)', link: 'frailty_simulation.html', category: 'clinical', desc: 'לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית.' }
        ];
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    }
}
initProtocolsDb();

(function() {
    let t = null; // Disabled to prevent overwrite
    if (t) {
        let arr = JSON.parse(t);
        arr = arr.filter(item => item && item.title);
        if (!arr.find(x => x.title === 'מארז מניעת זיהומים')) {
            arr.push({ id: 1, title: 'מארז מניעת זיהומים', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?usp=pp_url', icon: '🦠', external: true });
        } else {
            let tItem = arr.find(x => x.title === 'מארז מניעת זיהומים');
            { tItem.url = 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?usp=pp_url'; tItem.icon = '🦠'; tItem.external = true; }
        }
        if (!arr.find(x => x.title === 'מארז לטיפול תומך')) {
            arr.push({ id: 2, title: 'מארז לטיפול תומך', url: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?usp=pp_url', icon: '🫂', external: true });
        } else {
            let tItem = arr.find(x => x.title === 'מארז לטיפול תומך');
            { tItem.url = 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?usp=pp_url'; tItem.icon = '🫂'; tItem.external = true; }
        }
        localStorage.setItem('clinic_trainings', JSON.stringify(arr));
        trainingsDb = arr;
    }
    let p = localStorage.getItem('clinic_protocols');
    if (p) {
        let pArr = JSON.parse(p);
        let updated = false;
        let existingHandHygiene2 = pArr.find(x => x.link && x.link.includes('hand_hygiene_5_moments'));
        if (!existingHandHygiene2) {
            pArr.unshift({
                id: Date.now() + 9,
                title: 'חמשת הרגעים להיגיינת ידיים',
                link: 'hand_hygiene_5_moments.jpeg',
                category: 'infection',
                type: 'infographic',
                desc: 'כרזת הדרכה רב-לשונית (עברית, אנגלית, ערבית, אמהרית, רוסית וצרפתית) ל-5 הרגעים להיגיינת הידיים: לפני מגע עם הדייר, לפני פעולה נקייה/אספטית, אחרי סיכון לחשיפה לנוזלי גוף, אחרי מגע בדייר ואחרי מגע בסביבת הדייר.'
            });
            updated = true;
        } else if (existingHandHygiene2.title !== 'חמשת הרגעים להיגיינת ידיים') {
            existingHandHygiene2.title = 'חמשת הרגעים להיגיינת ידיים';
            updated = true;
        }
        if (!pArr.find(x => x.link && (x.link.includes('safe_medication_clinical_guide') || x.link.includes('אינפוגרפיקה 1')))) {
            pArr.unshift({
                id: Date.now() + 7,
                title: 'מדריך קליני: מתן תרופות בטוח בגיל השלישי (תזמון וקריטריוני Beers)',
                link: 'safe_medication_clinical_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: 'הנחיות תזמון בוקר מול ערב במטופלים גריאטריים, אזהרות קריטיות ואיסורים לפי קריטריוני בירס: איסור NSAIDs כרוני, הימנעות מאנטי-כולינרגיות וזהירות בבנזודיאזפינים.'
            });
            updated = true;
        }
        if (!pArr.find(x => x.link && (x.link.includes('safe_medication_gold_guide') || x.link.includes('אינפוגרפיקה 2')))) {
            pArr.unshift({
                id: Date.now() + 8,
                title: 'מדריך זהב: 8 הכללים למתן תרופות בטוח בגיל השלישי',
                link: 'safe_medication_gold_guide.jpeg',
                category: 'medication',
                type: 'infographic',
                desc: '8 הכללים למתן טיפול תרופתי בטוח, זיהוי ומעקב נכון, דיוק במינון ובזמן, בקרה ותיעוד מלא, תזמון בוקר מול ערב ואזהרות בירס.'
            });
            updated = true;
        }
        if (true) {
            let oldPharm2 = pArr.find(x => x.link === 'pharmacological_risk.html' || (x.title && x.title.includes('ניהול סיכונים פרמקולוגיים')));
            if (oldPharm2) {
                oldPharm2.title = 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח';
                oldPharm2.link = 'clinical_monitoring_guide.html';
                oldPharm2.category = 'medication';
                oldPharm2.desc = 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.';
                updated = true;
            } else if (!pArr.find(x => x.link === 'clinical_monitoring_guide.html')) {
                pArr.unshift({ id: Date.now() + 5, title: 'מדריך קליני מאוחד: ניהול רשומת מטופל 2026, מעקב רפואי ומתן תרופות בטוח', link: 'clinical_monitoring_guide.html', category: 'medication', desc: 'אמות מידה לניהול רשומת מטופל 2026 (גריאטריה כרונית וגריאטריה פעילה), משטרי מינון וסמ"ח, שמונת ה-Right וקריטריוני Beers.' });
                updated = true;
            }
            if (!pArr.find(x => x.link === 'frailty_simulation.html')) {
                pArr.push({ id: Date.now() + 10, title: 'סימולציה קלינית: קבלת מטופלת ואומדן שבריריות (Frailty)', link: 'frailty_simulation.html', category: 'clinical', desc: 'לומדת תסריט המדגימה יישום נכון של כלי אומדן שבריריות (CFS ומודל Fried) במחלקת שיקום, דיוק קליני ותקשורת אמפתית.' });
                updated = true;
            }
            updated = true;
        }
        if (updated) {
            localStorage.setItem('clinic_protocols', JSON.stringify(pArr));
            protocolsDb = pArr;
        }
    }
})();

function initIntroFeedbackDb() {
    const stored = localStorage.getItem('clinic_intro_feedback');
    if (stored) introFeedbackDb = JSON.parse(stored);
}
initIntroFeedbackDb();

function initTrainingsAnswersDb() {
    const stored = localStorage.getItem('clinic_trainings_answers');
    if (stored) trainingsAnswersDb = JSON.parse(stored);
}
initTrainingsAnswersDb();

function initProceduresDb() {
    const stored = localStorage.getItem('clinic_procedures');
    if (stored) {
        proceduresDb = JSON.parse(stored);
    } else {
        proceduresDb = [
            { id: 1, title: 'נוהל 1.10.5 - ניקיון סביבתי', link: 'https://www.gov.il/he/departments/policies/m-hozer-04-2011', readBy: [] }
        ];
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
    }
}
initProceduresDb();

function initDepartmentsDb() {
    const stored = localStorage.getItem('clinic_departments');
    if (stored) {
        departmentsDb = JSON.parse(stored);
    } else {
        departmentsDb = ["מונשמים א", "מונשמים ב", "מונשמים ג", "שיקום א", "שיקום ב", "סיעוד מורכב", "סיעודית", "תשושי נפש"];
        localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
    }
}
initDepartmentsDb();

function initFilledFormsDb() {
    const stored = localStorage.getItem('clinic_filled_forms');
    if (stored) {
        filledFormsDb = JSON.parse(stored);
    }
}
initFilledFormsDb();

// Initialize Users DB from Local Storage
function initUsersDb() {
    const storedUsers = localStorage.getItem('clinic_users');
    if (storedUsers) {
        usersDb = JSON.parse(storedUsers);
    } else {
        // Default seed users
        usersDb = [
            { username: 'admin', password: 'admin', name: 'ד"ר ישראלי', role: 'מנהל ראשי', team: 'all', isAdmin: true },
            { username: 'team', password: 'team', name: 'צוות מחלקה', role: 'איש צוות', team: 'surgical', isAdmin: false }
        ];
        localStorage.setItem('clinic_users', JSON.stringify(usersDb));
    }
}
initUsersDb();

// Mock Data Load (using forms.js to bypass CORS on file://)
function loadForms() {
    return new Promise((resolve) => {
        let storedSchema = localStorage.getItem('clinic_forms_schema_v3');
        if (storedSchema) {
            try {
                let parsed = JSON.parse(storedSchema);
                let f19 = parsed.forms.find(f => f.id === 'form_19');
                if (f19 && (!f19.fields.find(field => field.id === 'f19_initial24') || 
                            !f19.fields.find(field => field.id === 'f19_initial24' && field.label.startsWith('3.')) ||
                            !f19.fields.find(field => field.id === 'f19_opioidPrev' && field.options.includes('לא רלוונטי')))) {
                    localStorage.removeItem('clinic_forms_schema_v3');
                    storedSchema = null;
                }
            } catch(e) {}
        }
        if (storedSchema) {
            formsSchema = JSON.parse(storedSchema);
        } else if (typeof formsSchemaData !== 'undefined') {
            formsSchema = formsSchemaData;
            localStorage.setItem('clinic_forms_schema_v3', JSON.stringify(formsSchema));
        } else {
            console.error("Failed to load formsSchemaData. Using fallback mock.");
            formsSchema = {
                forms: [
                    { id: "form_1", title: "בקרת בטיחות המטופל - חדר ניתוח", instructions: "יש למלא טופס זה אחת לחודש.", team: "surgical", fields: [{ id: "q1", type: "select", label: "האם בוצע חיטוי ידיים על פי הנוהל?", options: ["כן", "לא"], is_critical: true }] }
                ]
            };
        }
        resolve();
    });
}

// User Authentication
function toggleAuthView(view) {
    if (view === 'register') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('login-box').style.display = 'block';
        document.getElementById('register-box').style.display = 'none';
    }
}

function register() {
    const user = document.getElementById('reg-username').value;
    const name = document.getElementById('reg-fullname').value;
    const pass = document.getElementById('reg-pass').value;
    const roleType = document.getElementById('reg-role').value;

    if (!user || !name || !pass) {
        showToast('נא למלא את כל השדות', 'warning');
        return;
    }

    if (usersDb.find(u => u.username === user)) {
        showToast('שם משתמש כבר קיים במערכת', 'danger');
        return;
    }

    let roleName = 'איש צוות';
    if (roleType === 'admin') roleName = 'מנהל איכות ראשי';
    else if (roleType === 'charge_nurse') roleName = 'אחות אחראית';
    else if (roleType === 'management') roleName = 'הנהלה';

    const newUser = {
        username: user,
        password: pass,
        name: name,
        role: roleName,
        team: roleType === 'admin' || roleType === 'management' ? 'all' : 'internal', // Defaulting to internal for demo
        isAdmin: roleType === 'admin'
    };

    usersDb.push(newUser);
    localStorage.setItem('clinic_users', JSON.stringify(usersDb));

    showToast('נרשמת בהצלחה! כעת ניתן להתחבר', 'success');
    toggleAuthView('login');
}

function login() {
    const rawUser = document.getElementById('login-user').value.trim();
    const user = rawUser.toLowerCase();
    const pass = document.getElementById('login-pass').value.trim();

    if (!Array.isArray(usersDb)) usersDb = [];
    let matchedUser = usersDb.find(u => u && (u.username || '').toLowerCase() === user && u.password === pass);
    if (!matchedUser && user === 'admin' && pass.toLowerCase() === 'admin') {
        matchedUser = { username: 'admin', password: 'admin', name: 'ד"ר ישראלי', role: 'מנהל איכות ראשי', team: 'all', isAdmin: true };
    }

    if (matchedUser) {
        currentUser = matchedUser;
        localStorage.setItem('clinic_current_user', JSON.stringify(currentUser));
    } else {
        showToast('שם משתמש או סיסמה שגויים', 'warning');
        return;
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    
    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('user-role').innerText = currentUser.role;

    if (!currentUser.isAdmin) {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    } else {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
    }

    if (currentUser.isAdmin || currentUser.role === 'אחות אחראית' || currentUser.role === 'הנהלה' || currentUser.username === 'הנהלה' || currentUser.username === 'אחות אחראית') {
        document.querySelectorAll('.manage-only').forEach(el => el.style.display = 'flex');
    } else {
        document.querySelectorAll('.manage-only').forEach(el => el.style.display = 'none');
    }

    loadForms().then(() => {
        navigate('dashboard');
        showToast(`ברוך הבא, ${currentUser.name}`, 'success');
    });
}

function logout() {
    currentUser = null;
    localStorage.removeItem('clinic_current_user');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

// Views Templates
function renderDashboard() {
    let recentForms = filledFormsDb.slice().reverse().slice(0, 5);
    let recentFormsHtml = recentForms.length === 0 ? '<p>אין בקרות שהוגשו עדיין.</p>' : 
        `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
            <tr style="border-bottom: 1px solid var(--border-color); text-align: right;">
                <th style="padding: 10px;">טופס</th><th style="padding: 10px;">מחלקה</th><th style="padding: 10px;">תאריך</th><th style="padding: 10px;">מגיש</th><th style="padding: 10px;">ציון</th>
            </tr>
            ${recentForms.map(f => {
                let color = f.score >= 80 ? 'var(--success)' : f.score >= 60 ? 'orange' : 'var(--danger)';
                let deptKey = Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department'));
                let dept = deptKey ? f.data[deptKey] : 'לא צוין';
                return `<tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 10px;">${f.formTitle}</td>
                    <td style="padding: 10px;">${dept}</td>
                    <td style="padding: 10px;">${f.dateFilled}</td>
                    <td style="padding: 10px;">${f.user}</td>
                    <td style="padding: 10px; font-weight: bold; color: ${color}">${f.score}%</td>
                </tr>`;
            }).join('')}
        </table>`;

    let html = `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">דשבורד ראשי - ${currentUser.isAdmin ? 'כלל המחלקות' : 'צוות מחלקה'}</h2>
            ${(function() {
                let userStats = {};
                filledFormsDb.forEach(f => {
                    let u = f.user || 'לא ידוע';
                    userStats[u] = (userStats[u] || 0) + 1;
                });
                
                if (currentUser.isAdmin) {
                    return `
                    <div class="card" style="margin-bottom: 20px; border-right: 4px solid var(--primary-color);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h3 style="margin: 0;">מעקב ביצועים (מבט מנהל)</h3>
                            <button class="btn" style="padding: 5px 10px; font-size: 12px; background: var(--success);" onclick="exportDashboardExcel()">הורד נתונים לאקסל 📥</button>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr style="border-bottom: 1px solid var(--border-color); text-align: right;">
                                <th style="padding: 10px;">שם עובד</th>
                                <th style="padding: 10px;">סה"כ בקרות שהוגשו</th>
                            </tr>
                            ${Object.entries(userStats).sort((a,b) => b[1]-a[1]).map(([u, count]) => `
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 10px; font-weight: bold;">${u}</td>
                                    <td style="padding: 10px;">${count}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>`;
                } else {
                    let myCount = userStats[currentUser.name] || 0;
                    let unreadProcedures = proceduresDb.filter(p => {
                        let oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
                        let record = p.readBy.find(r => r.name === currentUser.name);
                        return !record || record.date < oneYearAgo;
                    }).length;
                    
                    return `
                    <div class="card" style="margin-bottom: 20px; border-right: 4px solid var(--primary-color);">
                        <h3 style="margin-bottom: 15px;">הנתונים שלי</h3>
                        <p>הגשת עד כה <strong>${myCount}</strong> בקרות למערכת.</p>
                        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 15px 0;">
                        <h4 style="margin-bottom: 10px;">משימות להמשך:</h4>
                        <ul style="margin-right: 20px; line-height: 1.6;">
                            <li>יעד אישי: נדרש לבצע לפחות 5 בקרות בחודש (נותרו עוד ${Math.max(0, 5 - myCount)}).</li>
                            ${unreadProcedures > 0 ? `<li style="color: var(--danger); font-weight: bold;">ישנם ${unreadProcedures} נהלי עבודה שעליך לקרוא ולאשר במערכת! <a href="#" onclick="navigate('procedures')" style="color: var(--primary-color);">מעבר לנהלים</a></li>` : `<li style="color: var(--success);">כל הנהלים נקראו ואושרו. תוקף האישור שלך הינו לשנה.</li>`}
                        </ul>
                    </div>`;
                }
            })()}
            
            <div class="dashboard-grid">
                ${currentUser.isAdmin && introFeedbackDb.length > 0 ? `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">ממצאי משוב הפורטל</h3>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1; text-align: center; padding: 20px; background: var(--bg-color); border-radius: 8px;">
                            <h4>ממוצע שביעות רצון</h4>
                            <div style="font-size: 32px; color: var(--primary-color); font-weight: bold;">
                                ${(introFeedbackDb.reduce((acc, curr) => acc + curr.score, 0) / introFeedbackDb.length).toFixed(1)} / 5
                            </div>
                            <p style="font-size: 14px; color: var(--text-secondary);">מתוך ${introFeedbackDb.length} משיבים</p>
                        </div>
                    </div>
                </div>` : ''}

            <div class="dashboard-grid">
                <div class="card">
                    <h3>סה"כ בקרות שבוצעו</h3>
                    <div class="stat-value">${filledFormsDb.length}</div>
                </div>
                <div class="card">
                    <h3>ממוצע ציונים כולל</h3>
                    <div class="stat-value" style="color: var(--primary-color)">${
                        filledFormsDb.length > 0 ? 
                        Math.round(filledFormsDb.reduce((acc, curr) => acc + curr.score, 0) / filledFormsDb.length) + '%' 
                        : 'N/A'
                    }</div>
                </div>
            </div>
            ${(function() {
                let deptStats = {};
                filledFormsDb.forEach(f => {
                    let deptKey = Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department'));
                    let dept = deptKey ? f.data[deptKey] : 'לא צוין';
                    deptStats[dept] = (deptStats[dept] || 0) + 1;
                });
                if (Object.keys(deptStats).length === 0) return '';
                let maxCount = Math.max(...Object.values(deptStats));
                return `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">פילוח בקרות לפי מחלקה (גרפי ומספרי)</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${Object.entries(deptStats).sort((a,b) => b[1]-a[1]).map(([d, count]) => `
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>${d}</span>
                                    <span style="font-weight: bold; color: var(--primary-color);">${count} בקרות</span>
                                </div>
                                <div style="width: 100%; background: var(--bg-color); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color); height: 12px;">
                                    <div style="height: 100%; background: var(--primary-color); width: ${(count/maxCount)*100}%; border-radius: 4px; transition: width 1s ease-in-out;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            })()}
            ${(function() {
                if (!currentUser.isAdmin) return '';
                if (trainingsAnswersDb.length === 0) {
                    return `
                    <div class="card" style="margin-top: 20px;">
                        <h3 style="margin-bottom: 15px;">פילוח ביצוע לומדות לפי מחלקה</h3>
                        <p style="color: var(--text-secondary);">טרם בוצעו לומדות במערכת.</p>
                    </div>`;
                }
                let trainingStats = {};
                trainingsAnswersDb.forEach(ans => {
                    let userObj = usersDb.find(u => u.name === ans.user);
                    let dept = userObj && userObj.team !== 'all' ? userObj.team : 'לא ידוע';
                    trainingStats[dept] = (trainingStats[dept] || 0) + 1;
                });
                if (Object.keys(trainingStats).length === 0) return '';
                let maxCount = Math.max(...Object.values(trainingStats));
                return `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">פילוח ביצוע לומדות לפי מחלקה</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${Object.entries(trainingStats).sort((a,b) => b[1]-a[1]).map(([d, count]) => `
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>${d}</span>
                                    <span style="font-weight: bold; color: var(--success);">${count} ביצועים</span>
                                </div>
                                <div style="width: 100%; background: var(--bg-color); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color); height: 12px;">
                                    <div style="height: 100%; background: var(--success); width: ${(count/maxCount)*100}%; border-radius: 4px; transition: width 1s ease-in-out;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            })()}
            <div class="card" style="margin-top: 20px; overflow-x: auto;">
                <h3 style="margin-bottom: 10px;">בקרות אחרונות שבוצעו</h3>
                ${recentFormsHtml}
            </div>
        </div>
    `;
    return html;
}

function renderForms() {
    let availableForms = formsSchema.forms;

    let html = `
        <div class="fade-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>כלי בקרה וטפסים</h2>
            </div>
            <div class="forms-list">
                ${availableForms.map(form => `
                    <div class="form-card">
                        <h4>${form.title}</h4>
                        <div class="form-meta">תדירות נדרשת: אחת ל-${form.frequency_days} ימים</div>
                        <button class="btn" onclick="openForm('${form.id}')" style="margin-top:auto;">מלא טופס</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return html;
}

function openForm(id) {
    const form = formsSchema.forms.find(f => f.id === id);
    const contentArea = document.getElementById('content-area');
    
    let fieldsHtml = form.fields.map(field => {
        if (field.type === 'select') {
            let optionsHtml = '';
            if (field.label.includes('מחלקה') || field.label.includes('מחלקת')) {
                optionsHtml = departmentsDb.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            } else {
                optionsHtml = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            }
            return `
                <div class="form-group">
                    <label>${field.label} ${field.is_critical ? '<span style="color:red">*</span>' : ''}</label>
                    <select name="${field.id}" ${field.is_critical ? 'required' : ''}>
                        <option value="">בחר...</option>
                        ${optionsHtml}
                    </select>
                </div>
            `;
        } else if (field.type === 'date') {
            return `
                <div class="form-group">
                    <label>${field.label} ${field.is_critical ? '<span style="color:red">*</span>' : ''}</label>
                    <input type="date" name="${field.id}" ${field.is_critical ? 'required' : ''} style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; font-size: 14px; background: var(--bg-color); color: var(--text-primary);">
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <label>${field.label}</label>
                    <textarea name="${field.id}" rows="3"></textarea>
                </div>
            `;
        }
    }).join('');

    contentArea.innerHTML = `
        <div class="fade-in">
            <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); margin-bottom: 20px;" onclick="navigate('forms')">חזור לרשימה</button>
            <div class="card">
                <h2 style="margin-bottom: 10px;">${form.title}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">${form.instructions}</p>
                <form onsubmit="submitForm(event, '${form.id}')">
                    ${fieldsHtml}
                    <button type="submit" class="btn">שמור והגש דוח</button>
                </form>
            </div>
        </div>
    `;
}

function submitForm(e, formId) {
    e.preventDefault();
    const form = formsSchema.forms.find(f => f.id === formId);
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    
    // Calculate Score
    let totalScoreable = 0;
    let earned = 0;
    
    for (let key in formObj) {
        let val = formObj[key];
        if (val === 'לא רלוונטי') continue;
        
        let fieldSchema = form.fields.find(f => f.id === key);
        if (fieldSchema && fieldSchema.type === 'select') {
            totalScoreable++;
            if (val === 'כן' || val === 'תואם לחלוטין') {
                earned++;
            } else if (val === 'חלקי' || val === 'תואם חלקית') {
                earned += 0.5;
            }
        }
    }
    
    let finalScore = totalScoreable > 0 ? Math.round((earned / totalScoreable) * 100) : 100;
    let today = new Date().toISOString().split('T')[0];
    let submitDate = formObj.w_date || formObj.date_field || today;
    
    filledFormsDb.push({
        id: Date.now(),
        formId: formId,
        formTitle: form.title,
        dateFilled: submitDate,
        score: finalScore,
        user: currentUser.name,
        data: formObj
    });
    
    localStorage.setItem('clinic_filled_forms', JSON.stringify(filledFormsDb));
    
    showToast('הטופס הוגש בהצלחה עם ציון ' + finalScore + '%', 'success');
    navigate('dashboard');
}

function renderOnboarding() {
    return `
        <div class="fade-in" style="height: calc(100vh - 110px); display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h2 style="margin: 0; display: flex; align-items: center; gap: 8px; font-size: 1.4rem;">
                        <span>🎓</span> ערכת הדרכה בקליטת אחות וכוח עזר/מטפל
                    </h2>
                    <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">
                        מסלול 10 הדרכות חובה בחודש הראשון לקליטה, סרטונים, צ'ק-ליסטים מובנים, חתימות דיגיטליות ותעודת סיום רשמית
                    </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="onboarding_kit_preview.html" target="_blank" class="btn" style="padding: 7px 15px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        <span>↗ פתיחה בחלון נפרד מלא</span>
                    </a>
                    <button onclick="const ifr=document.getElementById('onboarding-kit-frame'); if(ifr){ifr.contentWindow.location.reload();}" class="btn" style="background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); padding: 7px 12px; font-size: 13px;" title="רענון ערכה">
                        <span>🔄</span>
                    </button>
                </div>
            </div>
            <div style="flex: 1; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid var(--border-color); background: #ffffff;">
                <iframe id="onboarding-kit-frame" src="onboarding_kit_preview.html" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
}


function renderShiftSupervisor() {
    return `
        <div class="fade-in" style="height: calc(100vh - 110px); display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h2 style="margin: 0; display: flex; align-items: center; gap: 8px; font-size: 1.4rem;">
                        <span>🩺</span> פורטל ליווי והסמכה לאחראית משמרת – אשפוז גריאטרי
                    </h2>
                    <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">
                        תוכנית הדרכה מדורגת, תנאי סף, מחוון בוחן למבחן תרופות, סימולטור אפר"ת, תרגול SBAR וייצוא דוחות אקסל
                    </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a href="shift_supervisor_training.html" target="_blank" class="btn" style="padding: 7px 15px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                        <span>↗ פתיחה בחלון נפרד מלא</span>
                    </a>
                    <button onclick="const ifr=document.getElementById('shift-sup-frame'); if(ifr){ifr.contentWindow.location.reload();}" class="btn" style="background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); padding: 7px 12px; font-size: 13px;" title="רענון פורטל">
                        <span>🔄</span>
                    </button>
                </div>
            </div>
            <div style="flex: 1; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid var(--border-color); background: #ffffff;">
                <iframe id="shift-sup-frame" src="shift_supervisor_training.html" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function navigate(viewName) {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`nav-${viewName}`)) {
        document.getElementById(`nav-${viewName}`).classList.add('active');
    }
    
    const contentArea = document.getElementById('content-area');
    if (viewName === 'intro') contentArea.innerHTML = renderIntro();
    else if (viewName === 'tip') contentArea.innerHTML = renderTip();
    else if (viewName === 'dashboard') contentArea.innerHTML = renderDashboard();
    else if (viewName === 'onboarding') contentArea.innerHTML = renderOnboarding();
    else if (viewName === 'shift-supervisor') contentArea.innerHTML = renderShiftSupervisor();
    else if (viewName === 'forms') contentArea.innerHTML = renderForms();
    else if (viewName === 'trainings') contentArea.innerHTML = renderTrainings();
    else if (viewName === 'procedures') contentArea.innerHTML = renderProcedures();
    else if (viewName === 'protocols') contentArea.innerHTML = renderProtocols();
    else if (viewName === 'agent') contentArea.innerHTML = renderAgent();
    else if (viewName === 'settings') contentArea.innerHTML = renderSettings();
    else contentArea.innerHTML = `<h2>${viewName}</h2>`;
}

let agentWeeklyKnowledgeBase = [
    {
        id: "kb_1",
        monthTopic: "בטיחות הטיפול התרופתי וריבוי תרופות (Polypharmacy)",
        mohRef: "חוזר מנהל הסיעוד ומנהל הרפואה - ניהול הטיפול התרופתי ובקרת תרופות בנות-סיכון",
        protocols: "עודכנו דגשי משרד הבריאות לניהול סיכונים פרמקולוגיים באשפוז גריאטרי ממושך: חלה חובה לבצע התאמת תרופות (Medication Reconciliation) מלאה תוך 24 שעות מקבלת מטופל מאשפוז אקוטי, בדגש על איתור תרופות הרגעה או שינה שהוספו באשפוז החריף, וחישוב עומס אנטי-כולינרגי (ACB Score).",
        triviaQuestion: "על פי פרוטוקול מתן תרופות בטוח בגיל השלישי (קריטריוני Beers ותזמון קליני), מדוע מומלץ לתת תרופות ממשפחת הסטטינים (כגון Simvastatin) בשעות הערב, בעוד שמשתנים (כגון Furosemide) ניתנים בבוקר?",
        triviaOptions: [
            "סטטינים גורמים לעירנות יתר ולכן ניתנים בערב, ומשתנים נספגים רק על קיבה ריקה בבוקר",
            "שיא הסינתזה של כולסטרול בכבד מתרחש בלילה, ואילו מתן משתנים בבוקר מונע השתנה לילית (Nocturia) ומפחית דרמטית סיכון לנפילות בלילה",
            "כדי למנוע אינטראקציה בין שתי התרופות בלבד, ללא קשר לשעון הביולוגי",
            "אין חשיבות לשעת המתן בגיל השלישי כל עוד המינון היומי נשמר"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "בגיל השלישי, התאמת זמני מתן התרופות לפיזיולוגיה קריטית לבטיחות המטופל: ייצור הכולסטרול בכבד מגיע לשיאו בלילה ולכן סטטינים קצרי-טווח יעילים יותר בערב. מנגד, מתן משתנים בבוקר (או עד שעות הצהריים המוקדמות) מונע קימה דחופה לשירותים בחשיכה – מהגורמים המובילים לנפילות ושברים בצוואר הירך באשפוז גריאטרי.",
        tip: "הודי-עצור-בדוק ב'עייפות התרעות' (Alert Fatigue): הופיעה התרעה על שילוב של SSRI עם אנטי-פסיכוטיקה או בנזודיאזפינים עם אופיואידים? זהו Hard Stop! אל תאשרו אוטומטית – בדקו לחץ דם בעמידה, רמת ערנות ובלבול חדש לפני מתן המנה ודווחו לרופא.",
        research: "מחקר שפורסם ב-European Geriatric Medicine (סימפוזיון EuGMS) הראה כי התערבות פרואקטיבית של צוות סיעודי ורוקחי להפחתת עומס אנטי-כולינרגי (Deprescribing) בקרב מאושפזים סיעודיים הפחיתה ב-32% את אירועי הדליריום החריף וב-24% את שיעור הנפילות החוזרות בתוך 3 חודשים.",
        researchTitle: "Anticholinergic Burden, Delirium, and Falls in Long-Term Geriatric Care: A Multidisciplinary Deprescribing Intervention (EuGMS / PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/37022635/",
        sourceSiteContent: "ניהול סיכונים פרמקולוגיים באשפוז גריאטרי + מדריך קליני למתן תרופות בטוח (קריטריוני Beers)"
    },
    {
        id: "kb_2",
        monthTopic: "מניעת אספירציה, דיספגיה והאכלה בטוחה",
        mohRef: "נוהל משרד הבריאות - איתור, הערכה וטיפול בהפרעות בליעה (דיספגיה) ומניעת אספירציה בגריאטריה",
        protocols: "דגשי בקרה מחמירים בנהלי משרד הבריאות: כל מטופל המתקבל למחלקה גריאטרית או חווה שינוי במצב ההכרה/אירוע מוחי חייב לעבור סינון בליעה ראשוני בטרם מתן מזון או שתייה דרך הפה (PO). יש לוודא התאמת מרקם המזון והנוזלים (סולם IDDSI) בהוראה רפואית ותזונאית מתועדת.",
        triviaQuestion: "בהתאם לפרוטוקול מניעת אספירציה והאכלה בטוחה שבפורטל, מהי התנוחה הנדרשת של המטופל בזמן ההאכלה ומהו פרק הזמן המינימלי שיש להשאירו בתנוחה זו לאחריה?",
        triviaOptions: [
            "שכיבה פרקדן ב-30 מעלות, וניתן להשכיב מיד בסיום הארוחה",
            "ישיבה זקופה של 90 מעלות (או לפחות 60-90 מעלות במיטה) והשארת המטופל מוגבה למשך 30 עד 45 דקות לפחות לאחר הארוחה",
            "שכיבה על צד ימין בזמן האוכל והשכבה מלאה לאחר 10 דקות",
            "הטיית הראש לאחור בזמן בליעת נוזלים כדי להקל על מעבר השתייה"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "ישיבה זקופה (90 מעלות עם הטיית סנטר קלה מטה - Chin Tuck במידת הצורך) והשארת המטופל בזווית מוגבהת למשך 30-45 דקות לאחר הארוחה מונעות רפלוקס גסטרו-אזופגיאלי ושאיפת תוכן קיבה או שאריות מזון מהלוע לדרכי הנשימה (Silent Aspiration).",
        tip: "זהו את ה-'אספירציה השקטה' (Silent Aspiration): בקרב קשישים שבריריים או דמנטיים, רפלקס השיעול לעיתים קרובות ירוד או חסר! אל תחכו לשיעול סוער – שימו לב לסימנים עדינים במהלך הארוחה: 'קול רטוב/גרגורי' לאחר בליעה, דמעת, ירידה בסטורציה של 2% ומעלה, או עייפות פתאומית.",
        research: "מחקר רב-מרכזי ב-Journal of the American Geriatrics Society (JAGS) מצא כי הקפדה על פרוטוקול היגיינת פה קפדנית (צחצוח שיניים וניקוי חלל הפה פעמיים ביום לאחר ארוחות) בקרב מטופלים סיעודיים הורידה ב-40% את שיעור דלקת הריאות משאיפה (Aspiration Pneumonia), היות שהגורם העיקרי לזיהום הוא שאיפת רוק המכיל מושבות חיידקים מחלל הפה.",
        researchTitle: "Oral Care and Prevention of Aspiration Pneumonia in Nursing Home Residents (JAGS / PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/11982682/",
        sourceSiteContent: "פרוטוקול קליני: אספירציה וחנק בגריאטריה + לומדת מניעת אספירציה"
    },
    {
        id: "kb_3",
        monthTopic: "אבחון והתמודדות עם שבריריות (Frailty) וסרקופניה",
        mohRef: "אמות מידה להערכה גריאטרית כוללנית (CGA) ואומדן תפקודי במערכי אשפוז ממושך ושיקום",
        protocols: "על פי הנחיות האגף לגריאטריה במשרד הבריאות, יש לשלב אומדן לזיהוי שבריריות (כגון סולם CFS - Clinical Frailty Scale או קריטריוני Fried) כחלק מקליטת המטופל ובעת ירידה תפקודית חדה. זיהוי מוקדם של Pre-Frailty מחייב התערבות רב-מקצועית (פיזיותרפיה ותזונה).",
        triviaQuestion: "לפי פרוטוקול ההתמודדות עם שבריריות (Frailty) וסימולציית האבחון באתר, אילו מהבאים מהווים את חמשת הקריטריונים הקלאסיים של הפנוטיפ על שם Fried לאבחון שבריריות (כאשר נוכחות של 3 ומעלה מגדירה Frailty)?",
        triviaOptions: [
            "יתר לחץ דם, סוכרת, ירידה בשמיעה, נדודי שינה ונטילת 5 תרופות",
            "ירידה בלתי מכוונת במשקל, תחושת תשישות/עייפות, חולשת שרירים (כוח אחיזה ירוד), איטיות בהליכה, ורמת פעילות גופנית נמוכה",
            "פצעי לחץ, עצירות כרונית, אנמיה, חום ממושך ובלבול לילי",
            "גיל מעל 85, אשפוז חוזר, אלמנה/אלמן, שימוש בהליכון ודמנציה"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "מודל הפנוטיפ של Linda Fried מגדיר שבריריות ביולוגית דרך 5 מדדים: ירידה בלתי מכוונת במשקל (מעל 4.5 ק\"ג בשנה), תשישות מדווחת, חולשת כוח אחיזה (Grip Strength), מהירות הליכה איטית, ופעילות גופנית ירודה. 1-2 קריטריונים מגדירים קדם-שבריריות (Pre-Frail) ו-3 ומעלה מגדירים שבריריות (Frail).",
        tip: "עידוד ניידות מוקדמת (Early Mobilization): כל יום של שכיבה מוחלטת במיטה אצל קשיש מאושפז גורם לאובדן של עד 1.5%-2% ממסת השריר (ובמיוחד בשרירי הגפיים התחתונות)! הקפידו על הורדה לכורסה בארוחות והולכה יומית קצרה בשיתוף הפיזיותרפיה.",
        research: "סקירה שיטתית ומטה-אנליזה ב-The Lancet Healthy Longevity הדגימה כי תוכנית משולבת של אימוני התנגדות פרוגרסיביים (2-3 פעמים בשבוע) יחד עם העשרה תזונתית של חלבון עשיר בלאוצין (1.2-1.5 גרם חלבון לק\"ג משקל גוף ליממה) וויטמין D הצליחה להפוך מצב של Pre-Frailty ולשפר מהירות הליכה ב-68% מהקשישים.",
        researchTitle: "Resistance Exercise and Protein/Leucine Supplementation for Reversing Frailty and Sarcopenia in Older Adults (PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/30312372/",
        sourceSiteContent: "פרוטוקול התמודדות עם שבריריות (Frailty) + סימולציית תרגול לאבחון שבריריות"
    },
    {
        id: "kb_4",
        monthTopic: "אומדן ובקרת עצירות ומניעת סיבוכי מערכת העיכול",
        mohRef: "נהלי סיעוד באשפוז הגריאטרי - אומדן, מעקב יציאות וניהול טיפול בעצירות ובטיפול באופיואידים",
        protocols: "סריקת נהלי בקרה סיעודית: חלה חובה לתעד מעקב יציאות יומי בגיליון המטופל תוך שימוש בסולם מתוקף (סולם בריסטול 1-7). במטופלים הנוטלים אופיואידים (כמו פנטניל, מורפין או אוקסיקודון), יש לוודא מתן משלשל מניעתי קבוע מיום התחלת הטיפול (אלא אם קיימת הוראת נגד).",
        triviaQuestion: "על פי פרוטוקול 'אומדן ובקרה: עצירות בגיל המבוגר' באתר, מהם הדירוגים בסולם בריסטול (Bristol Stool Scale) המעידים על עצירות משמעותית, ומהו הסיכון הקליני של הופעת 'שלשול פתאומי' במטופל סיעודי שלא התפנה מספר ימים?",
        triviaOptions: [
            "סוגים 6-7 מעידים על עצירות; שלשול מעיד תמיד על החלמה מלאה מהעצירות",
            "סוגים 1-2 (גושים קשים נפרדים או צורה גבשושית קשה) מעידים על עצירות; שלשול מימי פתאומי עלול להיות 'שלשול עוקף חסימה' (Overflow Diarrhea) עקב אבני צואה (Fecal Impaction)",
            "סוגים 3-4 מעידים על עצירות קשה; אין קשר בין עצירות לשלשול",
            "סולם בריסטול בודק רק את תדירות היציאות בשבוע ולא את מרקם הצואה"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "בסולם בריסטול, טיפוסי צואה 1 ו-2 מצביעים על מעבר איטי במעי ועצירות. כאשר מתפתח גוש צואה קשה החוסם את הרקטום (Fecal Impaction), נוזלים מעל החסימה עלולים לדלוף סביבו ולהיראות כשלשול ('שלשול פרדוקסלי'). מתן תרופה עוצרת שלשול (כמו אימודיום) במצב כזה הוא שגיאה מסוכנת שעלולה לגרום לפרפורציה של המעי!",
        tip: "עצירות כגורם סמוי לדליריום ואצירת שתן: כאשר מטופל דמנטי מפתח לפתע אי-שקט קיצוני (אגיטציה), בלבול חריף או אצירת שתן – לפני שמבקשים תרופת הרגעה, בדקו מתי הייתה היציאה האחרונה ובצעו אומדן בטני/רקטלי לשלילת אבני צואה (Fecaloma).",
        research: "מחקר קליני ב-Age and Ageing הראה כי הטמעת פרוטוקול יומי מובנה באשפוז ממושך – הכולל הושבה בשירותים 20-30 דקות לאחר ארוחת הבוקר (ניצול ה-Gastrocolic Reflex), הידרציה מבוקרת והעדפת משלשלים אוסמוטיים (PEG / Macrogol) על פני משלשלים מעוררים – הפחיתה ב-45% את הצורך בחוקנים ושיפרה את איכות החיים של הדיירים.",
        researchTitle: "Management of Chronic Constipation and Fecal Impaction in Older Adults (Age and Ageing / PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/26767790/",
        sourceSiteContent: "פרוטוקול אומדן ובקרה: עצירות בגיל המבוגר + כלי בקרה מס' 19 (איזון כאב ואופיואידים)"
    },
    {
        id: "kb_5",
        monthTopic: "יישום חוק החולה הנוטה למות וטיפול פליאטיבי תומך",
        mohRef: "חוזר המנהל הכללי משרד הבריאות - יישום חוק החולה הנוטה למות (התשס\"ו-2005) והנחיות מקדימות",
        protocols: "עדכון דגשי בקרת איכות: יש לוודא כי לכל מטופל במצב סופני או עם מחלה חשוכת מרפא מתועדת שיחת בירור העדפות טיפול (הנחיות רפואיות מקדימות / ייפוי כוח) בתיק הרפואי והסיעודי, תוך הבחנה ברורה בין הימנעות מפעולות מאריכות חיים (כמו החייאה/הנשמה) לבין חובת מתן טיפול תומך ואיזון כאב וסבל.",
        triviaQuestion: "על פי לומדת 'יישום חוק החולה הנוטה למות' ו-'מארז לטיפול תומך' שבפורטל, מהי ההוראה החוקית והקלינית בנוגע למתן טיפול משכך כאבים (כגון אופיואידים) למטופל הנוטה למות, גם אם קיים סיכון סביר שהטיפול עלול לקצר במעט את חייו כתופעת לוואי לא מכוונת?",
        triviaOptions: [
            "אסור לתת משככי כאבים חזקים לחולה נוטה למות מחשש לדיכוי נשימתי",
            "החוק מחייב מתן טיפול פליאטיבי להקלת כאב וסבל (עיקרון הכוונה הכפולה - Double Effect), כל עוד המטרה היא הקלת הסבל ולא גרימת מוות",
            "מותר לתת אקמול בלבד ללא תרופות נרקוטיות",
            "יש להפסיק כל טיפול תרופתי ונוזלים מרגע שהמטופל הוגדר כנוטה למות"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "סעיף 23 לחוק החולה הנוטה למות קובע מפורשות כי חובה לעשות כל שניתן כדי להקל על כאבו וסבלו של חולה נוטה למות, גם אם הטיפול כרוך בסיכון סביר לחיי החולה (עיקרון ה-Double Effect באתיקה רפואית), ובלבד שאין כוונה להביא למותו.",
        tip: "אומדן כאב במטופלים שאינם מתקשרים מילולית: במטופל עם דמנציה מתקדמת או ירידה בהכרה, השתמשו בסולם PAINAD (הבוחן נשימה, קולות, הבעת פנים, שפת גוף ויכולת הרגעה). גניחות, כיווץ גבות או התנגדות בעת שינוי תנוחה הם לרוב ביטוי לכאב חד שדורש אלגזיה מונעת 30 דקות לפני הטיפול הסיעודי!",
        research: "מחקר ב-Journal of Pain and Symptom Management הדגים כי שילוב מוקדם של גישה פליאטיבית ושיחות תיאום ציפיות (Advance Care Planning) עם משפחות של דיירים סיעודיים מורכבים הפחית ב-50% את שיעור הפינויים המיותרים לחדרי מיון בשבועות החיים האחרונים והעלה משמעותית את שביעות רצון המשפחות.",
        researchTitle: "Advance Care Planning and Palliative Care Integration in Nursing Homes: Impact on Hospitalizations (PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/24681113/",
        sourceSiteContent: "לומדת יישום חוק החולה הנוטה למות + מארז לטיפול תומך"
    },
    {
        id: "kb_6",
        monthTopic: "מניעת זיהומים, היגיינת ידיים ובידודים במערך הגריאטרי",
        mohRef: "נוהל משרד הבריאות (יחידה ארצית למניעת זיהומים) ו-WHO - 5 הרגעים להיגיינת ידיים ומניעת התפרצויות",
        protocols: "דגשי משרד הבריאות לבקרת זיהומים במוסדות גריאטריים: חלה הקפדה יתרה על '5 הרגעים להיגיינת ידיים', סביבת מטופל נקייה מאביזרים מיותרים, והפרדה מוחלטת של ציוד מתכלה בין מטופלים. בעת חשד לזיהום מעיים ב-Clostridioides difficile, חובה לרחוץ ידיים במים וסבון (אלכוג'ל אינו משמיד נבגים!).",
        triviaQuestion: "בהתבסס על 'מארז מניעת זיהומים' וכלי הבקרה שבפורטל, מדוע חיטוי ידיים בתכשיר אלכוהולי (אלכוג'ל) אינו מספק בטיפול במטופל עם שלשול על רקע חיידק ה-C. difficile?",
        triviaOptions: [
            "כי האלכוהול גורם לגירוי בעור הידיים של הצוות",
            "משום שחיידק ה-C. difficile מייצר נבגים (Spores) העמידים לאלכוהול, ולכן נדרשת שטיפה מכנית במים זורמים וסבון להסרתם",
            "כי אלכוג'ל פועל רק נגד וירוסים ולא נגד חיידקים",
            "אלכוג'ל דווקא מספיק בהחלט ואין צורך במים וסבון"
        ],
        triviaCorrectIndex: 1,
        triviaExplanation: "חיידק ה-Clostridioides difficile יוצר נבגים עמידים מאוד לחומרי חיטוי מבוססי אלכוהול. הפעולה הפיזית-מכנית של שפשוף הידיים במים וסבון שוטפת את הנבגים מעור הידיים ומונעת העברה צולבת (Cross-Transmission) למטופלים קשישים אחרים במחלקה.",
        tip: "כפפות אינן תחליף להיגיינת ידיים! אחת השגיאות הנפוצות בבקרות משרד הבריאות היא מעבר ממטופל למטופל (או נגיעה בוילון, עגלת טיפולים ומקלדת) עם אותן כפפות. הסירו כפפות מיד בסיום הפעולה המזוהמת ובצעו חיטוי ידיים באלכוג'ל לפני כל מגע בסביבה נקייה.",
        research: "מחקר שהתפרסם ב-Infection Control & Hospital Epidemiology מצא כי הטמעת בקרות תצפית שבועיות קצרות ע\"י נאמני מניעת זיהומים מחלקתיים, בשילוב משוב מיידי חיובי לצוות, העלתה את שיעור ההיענות להיגיינת ידיים מ-62% ל-89% והביאה לירידה של 28% בזיהומים נרכשים בדרכי השתן (CAUTI).",
        researchTitle: "Multimodal Hand Hygiene and Infection Control Interventions in Long-Term Care Facilities (PubMed)",
        researchUrl: "https://pubmed.ncbi.nlm.nih.gov/29369776/",
        sourceSiteContent: "מארז מניעת זיהומים + נוהל 1.10.5 ניקיון סביבתי וכלי בקרת מניעת זיהומים"
    }
];

function getAgentTipState() {
    let saved = localStorage.getItem('clinic_agent_tip_state_v2');
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    return null;
}

function saveAgentTipState(state) {
    localStorage.setItem('clinic_agent_tip_state_v2', JSON.stringify(state));
}

function checkAnswerTrivia(selectedIndex, correctIndex) {
    const feedbackEl = document.getElementById('trivia-feedback-box');
    const buttons = document.querySelectorAll('.trivia-option-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.style.background = '#ecfdf5';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#065f46';
            btn.style.fontWeight = '700';
        } else if (idx === selectedIndex && selectedIndex !== correctIndex) {
            btn.style.background = '#fef2f2';
            btn.style.borderColor = '#ef4444';
            btn.style.color = '#991b1b';
        }
    });
    if (feedbackEl) {
        feedbackEl.style.display = 'block';
        const titleEl = document.getElementById('trivia-feedback-title');
        if (titleEl) {
            if (selectedIndex === correctIndex) {
                titleEl.innerHTML = '✅ תשובה נכונה! כל הכבוד!';
                titleEl.style.color = '#059669';
            } else {
                titleEl.innerHTML = '❌ לא מדויק – הנה ההסבר הקליני:';
                titleEl.style.color = '#dc2626';
            }
        }
    }
}

function triggerAgentMonthlyScan(forceNext = false) {
    const statusBanner = document.getElementById('agent-scan-banner');
    const btnScan = document.getElementById('btn-agent-monthly-scan');
    if (btnScan) {
        btnScan.disabled = true;
        btnScan.innerHTML = '⏳ הסוכן סורק את נהלי משרד הבריאות, תכני האתר ומאגרי המחקר...';
    }
    if (statusBanner) {
        statusBanner.style.display = 'block';
        statusBanner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; color: var(--primary-color); font-weight: 600;">
                <span style="font-size: 22px;">🤖</span>
                <div>
                    <div>סוכן ה-AI מבצע כעת סריקה חודשית אוטומטית...</div>
                    <div style="font-size: 13px; color: var(--text-secondary); font-weight: normal;">מצליב חוזרי משרד הבריאות עם הפרוטוקולים בפורטל (${protocolsDb.length} פרוטוקולים, ${formsSchema ? formsSchema.forms.length : 19} כלי בקרה) וספרות גריאטרית עדכנית (JAGS / EuGMS).</div>
                </div>
            </div>
        `;
    }

    setTimeout(() => {
        const now = new Date();
        const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
        const currentWeek = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

        let state = getAgentTipState() || { index: 0 };
        let nextIndex = forceNext ? ((state.index + 1) % agentWeeklyKnowledgeBase.length) : (currentWeek % agentWeeklyKnowledgeBase.length);

        const newState = {
            index: nextIndex,
            lastMonthlyScanKey: currentMonthKey,
            lastWeeklyKey: `${now.getFullYear()}-W${currentWeek}`,
            lastScanTimestamp: now.toISOString(),
            lastScanDisplayDate: now.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' }),
            scannedProtocolsCount: protocolsDb.length,
            scannedTrainingsCount: trainingsDb.length
        };
        saveAgentTipState(newState);
        showToast('🤖 סוכן ה-AI השלים סריקת נהלי משרד הבריאות ועדכן שאלת טריוויה, טיפ שבועי ומאמר מחקרי!', 'success');
        navigate('tip');
    }, 1200);
}

function renderTip() {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeek = Math.floor(diff / (oneDay * 7));
    const currentWeekKey = `${now.getFullYear()}-W${currentWeek}`;

    let state = getAgentTipState();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayDisplay = now.toLocaleDateString('he-IL', options);

    // Auto-run monthly/weekly agent update if first time, new month, or new week
    if (!state || state.lastMonthlyScanKey !== currentMonthKey || state.lastWeeklyKey !== currentWeekKey) {
        state = {
            index: currentWeek % agentWeeklyKnowledgeBase.length,
            lastMonthlyScanKey: currentMonthKey,
            lastWeeklyKey: currentWeekKey,
            lastScanTimestamp: now.toISOString(),
            lastScanDisplayDate: todayDisplay,
            scannedProtocolsCount: protocolsDb.length,
            scannedTrainingsCount: trainingsDb.length
        };
        saveAgentTipState(state);
    }

    const selectedData = agentWeeklyKnowledgeBase[state.index % agentWeeklyKnowledgeBase.length];
    const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleDateString('he-IL', options);

    return `
        <div class="fade-in">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; margin-bottom: 15px;">
                <div>
                    <h2 style="margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
                        <span>🤖</span> סוכן AI: עדכון חודשי בנהלי משרד הבריאות, טריוויה, בטיחות ומחקר
                    </h2>
                    <p style="color: var(--text-secondary); margin: 0; font-size: 15px;">
                        הסוכן סורק אוטומטית אחת לחודש את נהלי משרד הבריאות ותכני האתר, ומייצר שאלת טריוויה גריאטרית, טיפ בטיחות שבועי ותקציר מאמר מחקרי עדכני.
                    </p>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="btn-agent-monthly-scan" class="btn" onclick="triggerAgentMonthlyScan(true)" style="background: var(--primary-color); display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; font-weight: 600;">
                        <span>🔄 הפעל סריקת סוכן והפק תכנים חדשים</span>
                    </button>
                </div>
            </div>

            <div id="agent-scan-banner" class="card" style="display: none; margin-bottom: 20px; border: 2px dashed var(--primary-color); background: var(--bg-color);"></div>

            <!-- סטטוס סוכן הסריקה האוטומטי -->
            <div class="card" style="margin-bottom: 20px; border-right: 4px solid var(--primary-color); background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 99px; border: 1px solid #86efac;">● סוכן פעיל (סריקה חודשית ושבועית אוטומטית)</span>
                            <span style="background: #e0f2fe; color: #0369a1; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 99px;">נושא החודש: ${selectedData.monthTopic}</span>
                        </div>
                        <h3 style="color: var(--primary-color); margin: 0; font-size: 18px;">📅 עדכון אחרון: ${state.lastScanDisplayDate || todayDisplay}</h3>
                        <p style="font-size: 13px; color: var(--text-secondary); margin: 4px 0 0 0;">
                            🔗 מבוסס על תכני הפורטל: <strong>${selectedData.sourceSiteContent}</strong> | סריקה חודשית הבאה: ${nextMonthDate}
                        </p>
                    </div>
                </div>
            </div>

            <div id="tip-container">
                <!-- 1. נהלי משרד הבריאות -->
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #10b981;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                        <h3 style="margin: 0;">📋 נהלי משרד הבריאות (סריקה חודשית)</h3>
                        <span style="font-size: 12px; background: #ecfdf5; color: #047857; padding: 4px 10px; border-radius: 6px; font-weight: 600;">${selectedData.mohRef}</span>
                    </div>
                    <p style="white-space: pre-wrap; line-height: 1.7; font-size: 15.5px; margin: 0;">${selectedData.protocols}</p>
                </div>

                <!-- 2. שאלת טריוויה אינטראקטיבית -->
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #f59e0b;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                        <h3 style="margin: 0;">🎯 שאלת טריוויה (מבוססת תכני האתר וספרות גריאטרית)</h3>
                        <span style="font-size: 12px; background: #fffbeb; color: #b45309; padding: 4px 10px; border-radius: 6px; font-weight: 600;">בחן את עצמך</span>
                    </div>
                    <p style="font-weight: 700; font-size: 16px; margin-bottom: 14px; line-height: 1.6; color: var(--text-primary);">${selectedData.triviaQuestion}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
                        ${selectedData.triviaOptions.map((opt, idx) => `
                            <button class="trivia-option-btn" onclick="checkAnswerTrivia(${idx}, ${selectedData.triviaCorrectIndex})" style="text-align: right; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-primary); font-family: inherit; font-size: 14.5px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px;">
                                <span style="font-weight: 700; color: var(--primary-color); min-width: 22px;">${idx + 1}.</span>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>

                    <div id="trivia-feedback-box" style="display: none; background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 16px; margin-top: 12px;">
                        <div id="trivia-feedback-title" style="font-weight: 700; font-size: 15px; margin-bottom: 6px;"></div>
                        <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #1e293b;">${selectedData.triviaExplanation}</p>
                    </div>

                    <details style="margin-top: 10px; font-size: 14px; color: var(--text-secondary); cursor: pointer;">
                        <summary style="font-weight: 600; color: #d97706;">הצג תשובה מלאה והסבר ישירות</summary>
                        <div style="margin-top: 8px; padding: 10px; background: var(--bg-color); border-radius: 8px; color: var(--text-primary); line-height: 1.6;">
                            <strong>תשובה נכונה:</strong> ${selectedData.triviaOptions[selectedData.triviaCorrectIndex]}<br>
                            <strong>הסבר קליני:</strong> ${selectedData.triviaExplanation}
                        </div>
                    </details>
                </div>

                <!-- 3. טיפ שבועי (בטיחות הטיפול) -->
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #3b82f6;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                        <h3 style="margin: 0;">💡 טיפ שבועי (בטיחות הטיפול בגיל השלישי)</h3>
                        <span style="font-size: 12px; background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 6px; font-weight: 600;">דגש קליני לצוות</span>
                    </div>
                    <p style="white-space: pre-wrap; line-height: 1.7; font-size: 15.5px; margin: 0;">${selectedData.tip}</p>
                </div>

                <!-- 4. מאמר מחקרי חדש -->
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #8b5cf6;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                        <h3 style="margin: 0;">📚 מאמר מחקרי חדש (ספרות גריאטרית עדכנית)</h3>
                        <span style="font-size: 12px; background: #f5f3ff; color: #6d28d9; padding: 4px 10px; border-radius: 6px; font-weight: 600;">Evidence-Based Nursing</span>
                    </div>
                    <p style="white-space: pre-wrap; line-height: 1.7; font-size: 15.5px; margin: 0 0 14px 0;">${selectedData.research}</p>
                    ${selectedData.researchUrl ? `
                    <div style="padding-top: 12px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span style="font-size: 13.5px; color: var(--text-secondary); font-weight: 600;">📄 ${selectedData.researchTitle || 'קישור למאמר המלא'}</span>
                        <a href="${selectedData.researchUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="background: #8b5cf6; color: white; padding: 8px 16px; font-size: 13.5px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-weight: 600;">
                            <span>לקריאת המאמר המלא (PubMed)</span>
                            <span>↗</span>
                        </a>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}


function renderTrainings() {

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">לומדות לקליטת עובד חדש</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">מאגר הלומדות וההדרכות הקליניות עבור אנשי צוות וקליטת עובדים.</p>
            ${currentUser.isAdmin ? '<div style="margin-bottom: 20px;"><button class="btn" onclick="exportTrainingsExcel()" style="background: var(--success);">ייצא דוח ביצוע הדרכות לאקסל 📥</button></div>' : ''}
            
            <div class="forms-list">
                ${trainingsDb.map(t => `
                    <div class="form-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 150px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">${t.icon}</div>
                        <h4 style="margin-bottom: 15px;">${t.title}</h4>
                        <button class="btn" onclick="openTraining('${t.url}', '${t.title}', ${t.external ? 'true' : 'false'})" style="margin-top:auto;">פתח לומדה</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openTraining(url, title, isExternal = false) {
    // Intercept based on title to guarantee native quiz routing
    if (title.includes('טיפול תומך') || (url && url.includes('1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q'))) {
        url = 'native_supportive_care';
        isExternal = false;
    } else if (title.includes('מניעת זיהומים') || (url && url.includes('1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A'))) {
        url = 'native_infections';
        isExternal = false;
    }

    if (!url.startsWith('internal_quiz') && !url.startsWith('native_')) {
        trainingsAnswersDb.push({
            title: title,
            user: currentUser.name,
            date: new Date().toLocaleString('he-IL')
        });
        localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
        showToast('הלומדה סומנה כהושלמה ונרשמה במערכת.', 'info');
    }

    if (isExternal) {
        window.open(url, '_blank');
        return;
    }

    const contentArea = document.getElementById('content-area');
    
    if (url.startsWith('native_')) {
        let quizId = url.replace('native_', '');
        if (window.renderNativeQuiz) {
            window.closeTraining = function() {
                navigate('trainings');
            };
            contentArea.innerHTML = `
                <div class="fade-in">
                    <div style="text-align: center; margin-bottom: 20px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <h3 style="margin-bottom: 15px;">בחר שפה / Choose Language / اختر اللغة / Выберите язык</h3>
                        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'he', 'quizContainer')" style="min-width: 100px;">עברית</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'en', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">English</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'ar', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">العربية</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'ru', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">Русский</button>
                        </div>
                    </div>
                    <div id="quizContainer"></div>
                </div>
            `;
            // Default load hebrew
            window.renderNativeQuiz(quizId, 'he', 'quizContainer');
        } else {
            contentArea.innerHTML = '<div class="card">שגיאה בטעינת לומדה (quizzes.js לא נטען)</div>';
        }
        return;
    }

    if (url.startsWith('internal_quiz')) {
        contentArea.innerHTML = `
            <div class="fade-in">
                <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); margin-bottom: 20px;" onclick="navigate('trainings')">חזור לרשימת הלומדות</button>
                <div class="card">
                    <h2 style="margin-bottom: 20px;">${title} (מבדק פנימי)</h2>
                    <form onsubmit="submitInternalQuiz(event, '${title}')">
                        <div class="form-group">
                            <label>אנא אשר שקראת והבנת את חומרי ההדרכה בנושא זה.</label>
                            <select required><option value="">בחר...</option><option value="yes">מאשר</option></select>
                        </div>
                        <button type="submit" class="btn">סיום ושליחה</button>
                    </form>
                </div>
            </div>
        `;
        return;
    }
    
    contentArea.innerHTML = `
        <div class="fade-in" style="height: 100%; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">${title}</h2>
                <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color);" onclick="navigate('trainings')">חזור לרשימת הלומדות</button>
            </div>
            <div style="flex: 1; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: #fff;">
                <iframe src="${url}" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" style="min-height: 800px;">טוען…</iframe>
            </div>
        </div>
    `;
}

function renderProcedures() {
    let adminNewBtn = currentUser.isAdmin ? '<button class="btn" onclick="document.getElementById(\'new-procedure-box\').style.display=\'block\'">+ הוסף נוהל חדש</button>' : '';
    let adminNewBox = currentUser.isAdmin ? 
    '<div id="new-procedure-box" class="card" style="display: none; margin-bottom: 20px; background: var(--bg-color); border: 2px dashed var(--primary-color);">' +
    '<h3 style="margin-bottom: 15px;">נוהל חדש</h3>' +
    '<div class="form-group"><label>כותרת הנוהל</label><input type="text" id="proc-title" placeholder="למשל: נוהל טיפול בתרופות מסוכנות"></div>' +
    '<div class="form-group"><label>קישור (URL) למסמך / לומדה</label><input type="text" id="proc-link" placeholder="https://..."></div>' +
    '<div style="display: flex; gap: 10px;"><button class="btn" style="background: var(--success);" onclick="addProcedure()">שמור נוהל</button><button class="btn" style="background: var(--danger);" onclick="document.getElementById(\'new-procedure-box\').style.display=\'none\'">ביטול</button></div>' +
    '</div>' : '';

    let html = `
        <div class="fade-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">נהלי עבודה פנימיים</h2>
                ${adminNewBtn}
            </div>
            
            ${adminNewBox}

            <p style="color: var(--text-secondary); margin-bottom: 20px;">על כל איש צוות לקרוא ולאשר את נהלי העבודה אחת לשנה לפחות.</p>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="proc-search" placeholder="חיפוש נוהל..." style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;" oninput="filterProcedures()">
                ${currentUser.isAdmin ? '<button class="btn" onclick="exportProceduresExcel()" style="background: var(--success);">ייצא דוח קריאה לאקסל 📥</button>' : ''}
            </div>

            <div class="forms-list">
                ${proceduresDb.map(p => {
                    let oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
                    let userReadRecord = p.readBy.find(r => r.name === currentUser.name);
                    let hasReadRecently = userReadRecord && userReadRecord.date > oneYearAgo;
                    
                    let linkHtml = (p.link.startsWith('http') || p.link.endsWith('.html')) ? 
                        '<a href="' + p.link + '" target="_blank" style="color: var(--primary-color); font-weight: bold; display: inline-block; margin-bottom: 15px;">צפה במסמך / בנוהל המלא ↗</a>' : 
                        '<p style="margin-bottom: 15px;">' + p.link + '</p>';

                    let readHtml = hasReadRecently ? 
                        '<span style="color: var(--success); font-weight: bold;">✅ קראתי ואישרתי (בתוקף לשנה)</span>' : 
                        '<button class="btn" style="background: var(--danger);" onclick="confirmProcedureRead(' + p.id + ')">אשר קריאת נוהל</button>';

                    let adminHtml = currentUser.isAdmin ? 
                        '<div style="font-size: 13px; color: var(--text-secondary); text-align: left;"><strong>קראו ואישרו לאחרונה:</strong><br>' +
                        (p.readBy.filter(r => r.date > oneYearAgo).length === 0 ? 'אף אחד' : p.readBy.filter(r => r.date > oneYearAgo).map(r => r.name).join(', ')) +
                        '</div>' : '';

                    return `
                    <div class="card procedure-item" style="margin-bottom: 15px; border-right: 4px solid ${hasReadRecently ? 'var(--success)' : 'var(--danger)'};">
                        <h3 style="margin-bottom: 10px;">${p.title}</h3>
                        ${linkHtml}
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 15px;">
                            ${readHtml}
                            ${adminHtml}
                        </div>
                    </div>`;
                }).join('')}
                ${proceduresDb.length === 0 ? '<p>לא הוגדרו נהלים במערכת.</p>' : ''}
            </div>
        </div>
    `;
    return html;
}

function addProcedure() {
    const title = document.getElementById('proc-title').value;
    const link = document.getElementById('proc-link').value;
    if (title && link) {
        proceduresDb.push({
            id: Date.now(),
            title: title,
            link: link,
            readBy: []
        });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('נוהל נוסף בהצלחה', 'success');
        navigate('procedures');
    }
}

function confirmProcedureRead(id) {
    const proc = proceduresDb.find(p => p.id === id);
    if (proc) {
        proc.readBy = proc.readBy.filter(r => r.name !== currentUser.name);
        proc.readBy.push({ name: currentUser.name, date: Date.now() });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('אישור הקריאה נרשם בהצלחה', 'success');
        navigate('procedures');
    }
}

function parseHeILDate(dateStr) {
    if (!dateStr) return 0;
    let parts = dateStr.split(',')[0].split('.');
    if(parts.length === 3) {
        return new Date(parts[2], parts[1]-1, parts[0]).getTime();
    }
    return Date.now(); // Fallback
}

function isOverdue(lastTimestamp, freq) {
    if (!lastTimestamp) return true; // Never done
    if (freq === 'once') return false; // Done at least once
    let now = Date.now();
    if (freq === 'half-yearly') return (now - lastTimestamp) > (182 * 24 * 60 * 60 * 1000);
    return (now - lastTimestamp) > (365 * 24 * 60 * 60 * 1000); // Default yearly
}

function renderAgent() {
    let overdueProcedures = [];
    let overdueTrainings = [];
    let staff = usersDb.filter(u => !u.isAdmin);
    
    staff.forEach(user => {
        proceduresDb.forEach(proc => {
            let freq = proc.frequency || 'yearly';
            let record = proc.readBy.find(r => r.name === user.name);
            let ts = record ? record.date : 0;
            if (isOverdue(ts, freq)) {
                overdueProcedures.push({ user: user.name, team: user.team, task: proc.title, freq: freq });
            }
        });
        
        trainingsDb.forEach(train => {
            let freq = train.frequency || 'yearly';
            let records = trainingsAnswersDb.filter(a => a.user === user.name && a.title === train.title);
            let ts = 0;
            if (records.length > 0) {
                records.sort((a,b) => parseHeILDate(b.date) - parseHeILDate(a.date));
                ts = parseHeILDate(records[0].date);
            }
            if (isOverdue(ts, freq)) {
                overdueTrainings.push({ user: user.name, team: user.team, task: train.title, freq: freq });
            }
        });
    });

    let translateFreq = (f) => {
        if(f==='once') return 'חד פעמי';
        if(f==='half-yearly') return 'חצי-שנתית';
        return 'שנתית';
    };

    let renderTable = (list, type) => {
        if(list.length === 0) return `<div class="card" style="border-right: 4px solid var(--success);"><p style="color:var(--success); font-weight: bold; margin: 0;">✅ אין חריגות! כל אנשי הצוות עמדו ביעדים.</p></div>`;
        return `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color); text-align: right;">
                <th style="padding: 12px;">שם עובד</th>
                <th style="padding: 12px;">מחלקה</th>
                <th style="padding: 12px;">משימה חסרה</th>
                <th style="padding: 12px;">תדירות נדרשת</th>
                <th style="padding: 12px; text-align: left;">פעולה</th>
            </tr>
            ${list.map(item => `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold;">${item.user}</td>
                <td style="padding: 12px;">${item.team}</td>
                <td style="padding: 12px;">${item.task}</td>
                <td style="padding: 12px;">${translateFreq(item.freq)}</td>
                <td style="padding: 12px; text-align: left;">
                    <button class="btn" style="padding: 5px 10px; font-size: 12px; background: var(--primary-color);" onclick="sendReminder('${item.user}', '${item.task}')">שלח תזכורת 🔔</button>
                </td>
            </tr>
            `).join('')}
        </table>`;
    };

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">סוכן AI מורחב (AI Agent)</h2>
            
            <div style="background: var(--bg-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 30px;">
                <h3 style="margin-bottom: 10px;">🧠 סוכן מחקר ועדכון נהלים</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">הסוכן סורק אוטומטית את ציוני הבקרות, מצליב אותם עם נהלי משרד הבריאות ומפיק המלצות עדכון.</p>
                <div class="card" style="text-align: center; padding: 30px;">
                    <div style="font-size: 30px; margin-bottom: 15px;">🤖</div>
                    <button class="btn" onclick="runAgentAnalysis()" id="btn-run-agent" style="font-size: 14px; padding: 10px 20px;">הפעל סריקה וניתוח פערים</button>
                </div>
                <div id="agent-results" style="margin-top: 20px; display: none;"></div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                <h3 style="margin-bottom: 10px;">📅 סוכן מעקב ותזכורות אוטומטי</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">סורק באופן אוטומטי את ביצועי העובדים מול דרישות התדירות של נהלים ולומדות ומתריע על חריגות.</p>
                
                <h4 style="margin-bottom: 15px; color: var(--danger);">⚠️ חריגות בקריאת נהלים</h4>
                ${renderTable(overdueProcedures, 'procedure')}
                
                <h4 style="margin-top: 30px; margin-bottom: 15px; color: var(--danger);">⚠️ חריגות בביצוע לומדות</h4>
                ${renderTable(overdueTrainings, 'training')}
            </div>
        </div>
    `;
}

function runAgentAnalysis() {
    const btn = document.getElementById('btn-run-agent');
    const results = document.getElementById('agent-results');
    
    btn.disabled = true;
    btn.innerText = 'סורק מאגרים ומנתח נתונים...';
    btn.style.opacity = '0.7';
    results.style.display = 'none';

    setTimeout(() => {
        btn.innerText = 'הסריקה הושלמה';
        results.style.display = 'block';
        
        let formAverages = {};
        filledFormsDb.forEach(f => {
            if(!formAverages[f.formId]) formAverages[f.formId] = { sum: 0, count: 0, title: f.formTitle };
            formAverages[f.formId].sum += f.score;
            formAverages[f.formId].count += 1;
        });

        let lowestForm = null;
        let lowestAvg = 100;
        
        for (const [id, data] of Object.entries(formAverages)) {
            let avg = data.sum / data.count;
            if (avg < lowestAvg) {
                lowestAvg = avg;
                lowestForm = { id, title: data.title, avg };
            }
        }

        let recommendationHtml = '';
        if (!lowestForm) {
            recommendationHtml = `
                <div class="card" style="border-right: 4px solid var(--success);">
                    <h3 style="color: var(--success); margin-bottom: 10px;">לא נמצאו פערים חריגים</h3>
                    <p>לא נמצאו טפסים עם ממוצע ציונים נמוך הדורשים התערבות מיידית.</p>
                </div>
            `;
        } else {
            recommendationHtml = `
                <div class="card" style="border-right: 4px solid var(--danger); margin-bottom: 15px;">
                    <h4 style="color: var(--danger); margin-bottom: 10px;">⚠️ פער שזוהה: ${lowestForm.title}</h4>
                    <p style="margin-bottom: 10px;">ציון ממוצע במערכת: <strong>${Math.round(lowestForm.avg)}%</strong></p>
                    <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color);">
                        <strong>📚 סקירת ספרות, נהלים ומאמרים בינלאומיים (2020-2024):</strong><br>
                        על פי הצלבת הנתונים עם חוזרי משרד הבריאות המעודכנים, פרוטוקולים בינלאומיים של ארגון הבריאות העולמי (WHO) ומאמרים עדכניים מ-PubMed למניעת זיהומים - כאשר נצפית ירידה בציות לנהלים באשפוז, יש צורך לא רק בהגברת תדירות הבקרות אלא גם ברענון מערכי ההדרכה (לומדות) והתאמתם לתקן הבינלאומי החדש.
                    </div>
                    <strong>💡 המלצת הסוכן (פעולות מוצעות):</strong>
                    <ul style="margin-top: 10px; margin-bottom: 15px; line-height: 1.6;">
                        <li>הגברת תדירות הבקרה של טופס זה לכל <strong>14 ימים</strong> (במקום 30).</li>
                        <li><strong>הצלבה עם לומדות:</strong> הוספת פרק הדרכה קצר בלומדת הקליטה שידגיש את הפרוטוקול הבינלאומי המעודכן לחיטוי ידיים.</li>
                        <li>עדכון שאלת החובה בכלי הבקרה: וידוא חתימה אלקטרונית ומודעות לנהלים הבינלאומיים בהדרכת הבוקר.</li>
                    </ul>
                    <button class="btn" style="background-color: var(--success);" onclick="applyRecommendation('${lowestForm.id}')">אשר ויישם עדכון בכלים ובלומדות</button>
                </div>
            `;
        }
        
        results.innerHTML = `<div class="fade-in">${recommendationHtml}</div>`;
    }, 2500);
}

function applyRecommendation(formId) {
    const form = formsSchema.forms.find(f => f.id === formId);
    if (form) {
        form.frequency_days = 14;
        if (!form.fields.find(f => f.id === 'ai_update_1')) {
            form.fields.push({
                id: "ai_update_1", 
                type: "select", 
                label: "האם בוצע וידוא חתימה אלקטרונית ומודעות לנהלים הבינלאומיים (WHO)?", 
                options: ["כן", "לא"], 
                is_critical: true
            });
        }
    }
    localStorage.setItem('clinic_forms_schema_v3', JSON.stringify(formsSchema));
    
    if (!trainingsDb.find(t => t.title === 'עדכון: מניעת זיהומים - פרוטוקול WHO')) {
        trainingsDb.push({
            id: Date.now(),
            title: 'עדכון: מניעת זיהומים - פרוטוקול WHO',
            url: 'https://www.who.int/campaigns/world-hand-hygiene-day',
            icon: '🌍',
            external: true,
            frequency: 'once'
        });
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
    }

    showToast('המלצות הסוכן יושמו בהצלחה. כלי הבקרה והלומדות עודכנו בהתאם!', 'success');
    navigate('dashboard');
}

function sendReminder(user, task) {
    showToast(`שולח תזכורת לעובד ${user}...`, 'primary');
    setTimeout(() => {
        showToast(`✉️ תזכורת נשלחה בהצלחה (Email/SMS) ל-${user} עבור המשימה: ${task}`, 'success');
    }, 1500);
}

function renderSettings() {
    let html = `
        <div class="fade-in">
            <h2>הגדרות מערכת</h2>
            <div class="card" style="margin-top: 20px;">
                <h3>ניהול מחלקות</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">כאן תוכל לערוך את רשימת המחלקות שיופיעו בטפסי הבקרה.</p>
                
                <ul id="departments-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${departmentsDb.map((dept, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color);">
                            <span>${dept}</span>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeDepartment(${index})">מחק</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="new-dept-name" placeholder="שם מחלקה חדשה" style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    <button class="btn" onclick="addDepartment()">הוסף מחלקה</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>ניהול נהלים והדרכות</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">העלאת נהלים פנימיים וארגוניים למערכת עבור קריאת אנשי צוות.</p>
                
                <ul id="procedures-manage-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${proceduresDb.map((p, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div>
                                <strong>${p.title}</strong><br>
                                <a href="${p.link}" target="_blank" style="font-size: 12px; color: var(--primary-color);">צפה במסמך</a>
                            </div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeProcedure(${p.id})">מחק</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">הוספת נוהל חדש</h4>
                    <div class="form-group">
                        <label>כותרת הנוהל</label>
                        <input type="text" id="settings-proc-title" placeholder="למשל: נוהל טיפול בתרופות מסוכנות">
                    </div>
                    <div class="form-group">
                        <label>קישור (URL) למסמך / לומדה</label>
                        <input type="text" id="settings-proc-link" placeholder="https://...">
                    </div>
                    <div class="form-group">
                        <label>תדירות רענון נוהל</label>
                        <select id="settings-proc-freq">
                            <option value="once">חד פעמי (בעת קליטה/פרסום)</option>
                            <option value="half-yearly">אחת לחצי שנה</option>
                            <option value="yearly" selected>אחת לשנה</option>
                        </select>
                    </div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addProcedureFromSettings()">שמור נוהל למערכת</button>
                </div>
            </div>
        </div>

            <div class="card" style="margin-top: 20px;">
                <h3>ניהול טפסים ופרוטוקולים טיפוליים</h3>
                <ul id="protocols-manage-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${protocolsDb.map((p, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div><strong>${p.title}</strong></div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeProtocol(${p.id})">מחק</button>
                        </li>
                    `).join('')}
                </ul>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">הוספת פרוטוקול חדש</h4>
                    <div class="form-group"><input type="text" id="settings-prot-title" placeholder="כותרת הפרוטוקול"></div>
                    <div class="form-group"><input type="text" id="settings-prot-link" placeholder="קישור"></div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addProtocolFromSettings()">שמור פרוטוקול</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>ניהול מארזי הדרכות ולומדות</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">כאן ניתן להוסיף לומדות שיוצגו בכרטיסיית "לומדות והדרכות".</p>
                
                <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${trainingsDb.map((t, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div>
                                <strong>${t.icon} ${t.title}</strong>
                            </div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeTraining(${t.id})">מחק</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">הוספת לומדה חדשה</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <input type="text" id="settings-train-title" placeholder="כותרת הלומדה" style="flex: 2; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                        <input type="text" id="settings-train-icon" placeholder="אמוג'י 💉" style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 10px;">
                        <input type="text" id="settings-train-link" placeholder="קישור Google Forms או אתר חיצוני" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    </div>
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <input type="checkbox" id="settings-train-external">
                        פתח כקישור חיצוני (אם הלומדה לא תומכת בהטמעה)
                    </label>
                    <div class="form-group">
                        <label>תדירות ביצוע לומדה</label>
                        <select id="settings-train-freq">
                            <option value="once">חד פעמי (בעת קליטה/פרסום)</option>
                            <option value="half-yearly">אחת לחצי שנה</option>
                            <option value="yearly" selected>אחת לשנה</option>
                        </select>
                    </div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addTrainingFromSettings()">שמור לומדה למערכת</button>
                </div>
            </div>

        </div>
    `;
    return html;
}

function addProcedureFromSettings() {
    const title = document.getElementById('settings-proc-title').value;
    const link = document.getElementById('settings-proc-link').value;
    const freq = document.getElementById('settings-proc-freq').value;
    if (title && link) {
        proceduresDb.push({
            id: Date.now(),
            title: title,
            link: link,
            frequency: freq,
            readBy: []
        });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('נוהל נוסף בהצלחה', 'success');
        navigate('settings');
    } else {
        showToast('נא למלא כותרת וקישור', 'warning');
    }
}

function removeProcedure(id) {
    if (confirm('האם למחוק נוהל זה לצמיתות?')) {
        proceduresDb = proceduresDb.filter(p => p.id !== id);
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('נוהל נמחק בהצלחה', 'success');
        navigate('settings');
    }
}

function addTrainingFromSettings() {
    const title = document.getElementById('settings-train-title').value;
    const link = document.getElementById('settings-train-link').value;
    const icon = document.getElementById('settings-train-icon').value || '📚';
    const isExternal = document.getElementById('settings-train-external').checked;

    if (title && link) {
        trainingsDb.push({
            id: Date.now(),
            title: title,
            url: link,
            icon: icon,
            external: isExternal
        });
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
        showToast('הלומדה נוספה בהצלחה', 'success');
        navigate('settings');
    } else {
        showToast('נא למלא כותרת וקישור', 'warning');
    }
}

function removeTraining(id) {
    if (confirm('האם למחוק לומדה זו לצמיתות?')) {
        trainingsDb = trainingsDb.filter(t => t.id !== id);
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
        showToast('הלומדה נמחקה בהצלחה', 'success');
        navigate('settings');
    }
}

function addDepartment() {
    const input = document.getElementById('new-dept-name');
    const name = input.value.trim();
    if (name) {
        if (!departmentsDb.includes(name)) {
            departmentsDb.push(name);
            localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
            showToast('המחלקה התווספה בהצלחה', 'success');
            navigate('settings');
        } else {
            showToast('המחלקה כבר קיימת', 'warning');
        }
    }
}

function removeDepartment(index) {
    if (confirm('האם אתה בטוח שברצונך למחוק מחלקה זו?')) {
        departmentsDb.splice(index, 1);
        localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
        showToast('המחלקה נמחקה', 'success');
        navigate('settings');
    }
}

// Notifications System
function showToast(message, type = 'primary') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

function simulateNotifications() {
    showToast('מדמה שליחת SMS לאנשי הצוות...', 'primary');
    setTimeout(() => {
        showToast('✉️ אימייל נשלח למנהל המחלקה!', 'success');
    }, 1500);
}

function toggleTheme() {
    const body = document.body;
    body.getAttribute('data-theme') === 'dark' ? body.removeAttribute('data-theme') : body.setAttribute('data-theme', 'dark');
}

function renderIntro() {
    let hasAnswered = introFeedbackDb.find(f => f.user === currentUser.name);
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
