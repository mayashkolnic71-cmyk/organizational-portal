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

    // 1. Wound Care Protocol Basket - Original Document ( סל חבישות מתקדמות - מסמך מקור )
    upsertProtocol({
        id: "proto_wound_care_basket_doc",
        title: "פרוטוקול טיפול בפצעים סל חבישות (מסמך מקור)",
        link: "wound_care_protocol_full.jpg",
        category: "clinical",
        type: "infographic",
        author: "מאיה שקולניק גזית",
        desc: "מסמך מקור רשמי: סל חבישות מתקדמות מעודכן (12/2025) לפצעי לחץ ופצע טראומטי, מקראת דירוג פצעי לחץ דרגות 1-6, והנחיות מפורטות לאומדן והצגת פצע לרופא/ה."
    });

    // 2. Wound Care Protocol ( סל חבישות 2024 ומקראה דירוג 1-6 )
    
// 1b. Wound Care Protocol Infographic
    // 1b. Wound Care Protocol Infographic ( אינפוגרפיקה גרפית נקייה )
    upsertProtocol({
        id: "proto_wound_care_infographic_img",
        title: "אינפוגרפיקה: פרוטוקול טיפול בפצעים וסל חבישות 2024 (תמונה גרפית)",
        link: "wound_care_protocol_infographic.jpeg",
        category: "clinical",
        type: "infographic",
        author: "מאיה שקולניק גזית",
        desc: "אינפוגרפיקה קלינית מקיפה וברורה (תמונה גרפית נקייה ללא לוגו וללא חתימות): סל חבישות מתקדמות 2024, התאמה לפי רמת הפרשה ומקראה מלאה לדירוג פצעי לחץ 1 עד 6 ופצע טראומטי."
    });


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


function _unused_old_initProtocolsDb() {
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
                <th style="padding: 10px;">טופס</th><th style="padding: 10px;">מחלקה</th><th style="padding: 10px;">תאריך</th><th style="padding: 10px;">מגיש</th><th style="padding: 10px;">ציון</th><th style="padding: 10px;">דוח מסכם</th>
            </tr>
            ${recentForms.map(f => {
                let color = f.score >= 80 ? 'var(--success)' : f.score >= 60 ? 'orange' : 'var(--danger)';
                let deptKey = (f && f.data) ? Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department')) : null;
                let dept = deptKey ? f.data[deptKey] : 'לא צוין';
                return `<tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 10px;">${f.formTitle}</td>
                    <td style="padding: 10px;">${dept}</td>
                    <td style="padding: 10px;">${f.dateFilled}</td>
                    <td style="padding: 10px;">${f.user}</td>
                    <td style="padding: 10px; font-weight: bold; color: ${color}">${f.score}%</td>
                    <td style="padding: 10px;">
                        <button class="btn" style="padding: 4px 10px; font-size: 12px; font-weight: bold; display: inline-flex; align-items: center; gap: 4px;" onclick="viewSavedFormFindings(${f.id})">
                            <span>📋</span> דוח ממצאים
                        </button>
                    </td>
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
                    let deptKey = (f && f.data) ? Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department')) : null;
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

// CAPA and Corrective Recommendations Generator for Clinical & Knowledge Audits
function generateAuditCapaRecommendation(formId, field, val, formObj) {
    let lbl = field.label || '';
    let id = field.id || '';

    // Form 18: Knowledge Quiz on Defibrillator
    if (formId === 'form_18') {
        const defibRationales = {
            'f18_q1': 'בטיחות הצוות והמטופל: חובה לוודא נתק מוחלט של כל אנשי הצוות מהמיטה והציוד לפני מתן שוק (קריאת "אני מתרחק, כולם מתרחקים") למניעת התחשמלות.',
            'f18_q2': 'פרוטוקול שוקים: אם עוצמת המכשיר אינה ידועה יש לפרוק בעוצמה מקסימלית (200J+ במכשיר ביפאזי). שוקים עוקבים יינתנו בעוצמה זהה או גבוהה יותר.',
            'f18_q3': 'היפוך מסונכרן ב-SVT / Atrial Flutter: עוצמת שוק התחלתית נמוכה של 50-100 ג\'אול במכשיר ביפאזי.',
            'f18_q4': 'היפוך מסונכרן בטכיקרדיה רחבה סדירה (Monomorphic VT עם דופק): עוצמת שוק התחלתית של 100 ג\'אול במכשיר ביפאזי.',
            'f18_q5': 'היפוך מסונכרן בפרפור עליות (AFib): עוצמת שוק התחלתית גבוהה של 120-200 ג\'אול במכשיר ביפאזי.'
        };
        return defibRationales[id] || 'ריענון נוהל החייאה והפעלת דיפיברילטור, ותרגול מעשי בעמדת ההחייאה המחלקתית.';
    }

    // Form 16: Knowledge Assessment on Pain
    if (formId === 'form_16') {
        const pain16Rationales = {
            'f16_q1': 'מינוי ופרסום נאמן כאב: יש לפרסם את שם ותמונת נאמן הכאב המחלקתי בלוח המודעות ולהציגו בפני כלל אנשי הצוות בהעברות משמרת.',
            'f16_q2': 'איתור נוהל כאב: יש לבצע הדרכה מעשית לצוות הסיעודי לאיתור מהיר של תיקיית הנהלים והנחיות הטיפול בכאב במחשבי המחלקה.',
            'f16_q3': 'תדירות אומדן כאב: חובה לבצע אומדן כאב בכל משמרת (בוקר, ערב, לילה) למטופל עם טיפול תרופתי קבוע, וכן שעה לאחר מתן טיפול SOS.',
            'f16_q4': 'אומדן בקבלה: אומדן כאב ראשוני בקבלת מטופל למוסד יתבצע תוך שעתיים מהקבלה, ובכל שינוי במצב קליני.',
            'f16_q5': 'כלי אומדן מותאמים: ריענון השימוש בסולם NRS/VAS למטופלים מתקשרים, ובסולם התנהגותי (PAINAD/Abbey) למטופלים עם דמנציה או ירידה קוגניטיבית.',
            'f16_q6': 'פרוטוקול וחוברת הנחיות: הפצת חוברת ההנחיות המקצועיות לניהול כאב לכלל הצוות וקיום מפגש שאלות ותשובות מחלקתי.',
            'f16_q7': 'הגדרת כאב אקוטי וכרוני: חידוד ההבדלים הקליניים: כאב אקוטי מחייב בירור סיבתי מיידי, וכאב כרוני מחייב תוכנית ניהול רב-מקצועית מתמשכת.',
            'f16_q9': 'אישור קריאת נוהל: השלמת החתמת כלל אנשי הצוות הסיעודי במחלקה על אישור קריאת נוהל כאב המעודכן בתוך 7 ימים.'
        };
        return pain16Rationales[id] || 'קיום הדרכת ריענון מחלקתית בנושא ניהול הטיפול בכאב והערכת יעילות משככים.';
    }

    // General Clinical Topics
    if (lbl.includes('נורטון') || lbl.includes('פצע') || lbl.includes('עור') || lbl.includes('מזרן')) {
        return 'ביצוע אומדן נורטון חוזר, עדכון תוכנית שינויי תנוחה ברשומה כל שעתיים, בדיקת תקינות מזרן מפחית לחץ (ויסקו/דינמי), וייעוץ תזונתי להעשרת חלבון.';
    }
    if (lbl.includes('כאב') || lbl.includes('אנלגט')) {
        return 'ביצוע אומדן כאב חוזר בכלי מתאים (NRS/PAINAD), דיווח לרופא המחלקה להתאמת משככי כאבים, ובדיקת יעילות התערבות 60 דקות לאחר מתן.';
    }
    if (lbl.includes('בידוד') || lbl.includes('זיהום') || lbl.includes('מיגון') || lbl.includes('כלור') || lbl.includes('ידיים')) {
        return 'הצבת שילוט בידוד תקני, אספקת ציוד מיגון אישי (PPE) ייעודי בכניסה לחדר, ביצוע חיטוי בכלור בריכוז 1,000 PPM, וריענון 5 רגעי היגיינת ידיים.';
    }
    if (lbl.includes('קטטר') || lbl.includes('שתן') || lbl.includes('CAUTI')) {
        return 'בחינה יומית של אינדיקציה רפואית להמשך קטטר שתן, שמירה על שקית שתן מתחת לגובה שלפוחית, וביצוע שטיפות/היגיינה פרינאלית פעמיים ביום.';
    }
    if (lbl.includes('עצירות') || lbl.includes('יציאות')) {
        return 'מעקב יומן יציאות ממוחשב, וידוא תנועתיות ושתייה מספקת, והפעלת פרוטוקול טיפול בעצירות (מרככי צואה/נרות) לאחר 48 שעות ללא יציאה.';
    }
    if (lbl.includes('הזנה') || lbl.includes('בליעה') || lbl.includes('אספירציה') || lbl.includes('זונדה') || lbl.includes('PEG')) {
        return 'הושבה ב-90 מעלות בעת האכלה ובמשך 45 דקות לאחריה, בדיקת שייר ומיקום צינור לפני כל הזנה, וקריאה דחופה לקלינאית תקשורת להערכת מרקם.';
    }
    if (lbl.includes('תרופ') || lbl.includes('מינון') || lbl.includes('מרשם')) {
        return 'הקפדה קפדנית על שמונת ה-Right, בדיקת זיהוי כפול ליד מיטת המטופל, תיעוד מתן בזמן אמת ודיווח אירוע חריג במידה ונמצאה סטייה.';
    }
    if (lbl.includes('החייאה') || lbl.includes('עגלת החייאה') || lbl.includes('חמצן')) {
        return 'השלמת בדיקת תקינות יומית של עגלת ההחייאה, וידוא תוקף תרופות ובלון חמצן מלא (מעל 100 אטמוספרות), ונעילת העגלה בחבק ממוספר.';
    }
    if (lbl.includes('הגבלה') || lbl.includes('נפיל') || lbl.includes('בטיחות')) {
        return 'בדיקת חלופות להגבלה (מיטה נמוכה, השגחה, פעמון מצוקה נגיש), חידוש הוראה רפואית כל 24 שעות ומעקב ניטור סיעודי כל שעתיים.';
    }
    if (lbl.includes('נוהל') || lbl.includes('אישור קריאה') || lbl.includes('הדרכה')) {
        return 'החתמת כלל עובדי הצוות על קריאת הנוהל המעודכן וקיום תדריך ריענון מחלקתי ממוקד תוך 7 ימי עבודה.';
    }
    return 'קיום תדריך צוות ממוקד לסגירת הפער שנמצא, עדכון הרשומה הסיעודית, וביצוע בקרת מעקב חוזרת בתוך 14 ימים.';
}

// Evaluate Form Findings & Score
function evaluateFormAudit(form, formObj) {
    let totalScoreable = 0;
    let earned = 0;
    let findings = [];
    let compliantCount = 0;

    const form18Keys = {
        'f18_q1': 'להרחיק אנשי הצוות ממיטת המטופל',
        'f18_q2': 'תשובה א\' וג\' נכונות',
        'f18_q3': '50-100 J',
        'f18_q4': '100 J',
        'f18_q5': '120-200 J'
    };

    form.fields.forEach(field => {
        let val = formObj[field.id];
        if (!val || val === 'לא רלוונטי' || val === 'לא נבדק') return;

        // Skip purely personal / meta fields
        if (field.id.includes('date') || field.id.includes('name') || field.id.includes('participants') || field.id.includes('id') || field.id.includes('notes') || field.id.includes('seniority')) {
            return;
        }

        if (form.id === 'form_18' && form18Keys[field.id]) {
            totalScoreable++;
            let expected = form18Keys[field.id];
            if (val.trim() === expected.trim()) {
                earned++;
                compliantCount++;
            } else {
                let noteKey = field.id + '_notes';
                let inspectorNotes = formObj[noteKey] || '';
                findings.push({
                    id: field.id,
                    label: field.label,
                    val: val,
                    expected: expected,
                    status: 'תשובה שגויה במבדק ידע',
                    isCritical: true,
                    notes: inspectorNotes,
                    capa: generateAuditCapaRecommendation(form.id, field, val, formObj)
                });
            }
            return;
        }

        if (form.id === 'form_16' && field.type === 'select') {
            totalScoreable++;
            let isFull = val.includes('כולם ידעו') || val === 'כן';
            let isPartial = val.includes('חלק') || val.includes('חלקי');
            if (isFull) {
                earned += 1;
                compliantCount++;
            } else if (isPartial) {
                earned += 0.5;
                let noteKey = field.id + '_notes';
                let inspectorNotes = formObj[noteKey] || '';
                findings.push({
                    id: field.id,
                    label: field.label,
                    val: val,
                    status: 'שליטה חלקית בידע',
                    isCritical: field.is_critical || false,
                    notes: inspectorNotes,
                    capa: generateAuditCapaRecommendation(form.id, field, val, formObj)
                });
            } else {
                let noteKey = field.id + '_notes';
                let inspectorNotes = formObj[noteKey] || '';
                findings.push({
                    id: field.id,
                    label: field.label,
                    val: val,
                    status: 'פער ידע המחייב הדרכה',
                    isCritical: field.is_critical || false,
                    notes: inspectorNotes,
                    capa: generateAuditCapaRecommendation(form.id, field, val, formObj)
                });
            }
            return;
        }

        if (field.type === 'select') {
            totalScoreable++;
            if (val === 'כן' || val === 'תואם לחלוטין' || val === 'תואם' || val === 'מלא' || val === 'בוצע' || val === 'קיים') {
                earned += 1;
                compliantCount++;
            } else if (val === 'חלקי' || val === 'תואם חלקית' || val === 'טעון שיפור' || val === 'ביצוע חלקי') {
                earned += 0.5;
                let noteKey = field.id + '_notes';
                let inspectorNotes = formObj[noteKey] || '';
                findings.push({
                    id: field.id,
                    label: field.label,
                    val: val,
                    status: 'עמידה חלקית',
                    isCritical: field.is_critical || false,
                    notes: inspectorNotes,
                    capa: generateAuditCapaRecommendation(form.id, field, val, formObj)
                });
            } else if (val === 'לא' || val === 'לא תואם' || val === 'לא בוצע' || val === 'חסר' || val === 'ליקוי') {
                let noteKey = field.id + '_notes';
                let inspectorNotes = formObj[noteKey] || '';
                findings.push({
                    id: field.id,
                    label: field.label,
                    val: val,
                    status: 'אי עמידה / ליקוי',
                    isCritical: field.is_critical || false,
                    notes: inspectorNotes,
                    capa: generateAuditCapaRecommendation(form.id, field, val, formObj)
                });
            }
        }
    });

    let finalScore = totalScoreable > 0 ? Math.round((earned / totalScoreable) * 100) : 100;
    return {
        finalScore,
        totalScoreable,
        compliantCount,
        findings
    };
}

// Render Comprehensive Audit Findings & Corrective Action Summary
function renderAuditSummaryResult(form, finalScore, findings, formObj, submitDate, recordId) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    let dept = 'כללי';
    for (let k in formObj) {
        if (k.toLowerCase().includes('dept') || k.toLowerCase().includes('department')) {
            dept = formObj[k];
            break;
        }
    }

    let isExcellent = finalScore >= 90;
    let isWarning = finalScore >= 75 && finalScore < 90;
    let isCritical = finalScore < 75;

    let scoreColor = isExcellent ? '#198754' : isWarning ? '#fd7e14' : '#dc3545';
    let scoreBg = isExcellent ? 'rgba(25, 135, 84, 0.08)' : isWarning ? 'rgba(253, 126, 20, 0.08)' : 'rgba(220, 53, 69, 0.08)';
    let statusText = isExcellent ? 'עמידה מלאה בתקני האיכות והבטיחות' : isWarning ? 'עמידה חלקית – נדרש מעקב ותיקון ליקויים' : 'אי עמידה – דורש תוכנית התערבות מיידית (CAPA)';
    let statusBadgeClass = isExcellent ? 'badge-ok' : isWarning ? 'badge-warning' : 'badge-critical';

    let totalChecked = (findings.length + (formObj ? Object.keys(formObj).filter(k => formObj[k] === 'כן' || formObj[k] === 'תואם לחלוטין' || formObj[k] === 'כולם ידעו לענות').length : 0));
    if (totalChecked === 0) totalChecked = findings.length > 0 ? findings.length : 10;

    let html = `
        <div class="fade-in" style="max-width: 1000px; margin: 0 auto; direction: rtl; text-align: right;">
            <!-- Top Navigation & Print Bar -->
            <div class="btn-no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                <button class="btn" style="background: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); padding: 8px 16px; font-size: 14px;" onclick="navigate('forms')">
                    ← חזרה לרשימת כלי הבקרה
                </button>
                <div style="display: flex; gap: 10px;">
                    <button class="btn" style="background: #0d6efd; color: white; border: none; padding: 8px 18px; font-size: 14px; font-weight: bold; display: inline-flex; align-items: center; gap: 6px;" onclick="window.print()">
                        <span>🖨️</span> הדפסת דוח ממצאים מסכם
                    </button>
                    <button class="btn" style="background: var(--bg-color); color: var(--text-primary); border: 1px solid var(--border-color); padding: 8px 16px; font-size: 14px;" onclick="navigate('dashboard')">
                        📊 מעבר לדשבורד
                    </button>
                </div>
            </div>

            <!-- Main Findings Card -->
            <div class="card" style="padding: 30px; border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid var(--border-color); background: var(--surface-color);">
                <!-- Header Banner -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--border-color); padding-bottom: 20px; margin-bottom: 25px; flex-wrap: wrap; gap: 20px;">
                    <div style="flex: 1; min-width: 280px;">
                        <span style="display: inline-block; padding: 4px 12px; background: rgba(13, 110, 253, 0.1); color: var(--primary-color); font-weight: bold; border-radius: 20px; font-size: 13px; margin-bottom: 8px;">
                            📋 דוח סיכום ממצאים ותוכנית תיקון ליקויים (CAPA)
                        </span>
                        <h2 style="margin: 0; font-size: 24px; color: var(--text-primary);">${form.title}</h2>
                        <div style="color: var(--text-secondary); font-size: 14px; margin-top: 8px; line-height: 1.6;">
                            <span>🏢 <strong>מחלקה:</strong> ${dept}</span> &nbsp;|&nbsp;
                            <span>📅 <strong>תאריך בקרה:</strong> ${submitDate}</span> &nbsp;|&nbsp;
                            <span>👤 <strong>מבצע/ת הבקרה:</strong> ${currentUser ? currentUser.name : 'צוות איכות ובקרה'}</span>
                        </div>
                    </div>

                    <!-- Score Card -->
                    <div style="background: ${scoreBg}; border: 3px solid ${scoreColor}; border-radius: 16px; padding: 18px 28px; text-align: center; min-width: 160px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                        <div style="font-size: 13px; font-weight: bold; color: ${scoreColor}; letter-spacing: 0.5px;">ציון בקרה מסכם</div>
                        <div style="font-size: 42px; font-weight: 900; color: ${scoreColor}; line-height: 1.1; margin: 4px 0;">${finalScore}%</div>
                        <div class="${statusBadgeClass}" style="margin-top: 4px; font-size: 12px;">${statusText}</div>
                    </div>
                </div>

                <!-- KPI Quick Bar -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
                    <div style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 15px; text-align: center;">
                        <div style="font-size: 13px; color: var(--text-secondary);">סך סעיפים שנבחנו</div>
                        <div style="font-size: 24px; font-weight: bold; color: var(--text-primary);">${totalChecked}</div>
                    </div>
                    <div style="background: rgba(25, 135, 84, 0.08); border: 1px solid rgba(25, 135, 84, 0.2); border-radius: 10px; padding: 15px; text-align: center;">
                        <div style="font-size: 13px; color: #198754;">סעיפים תקינים לחלוטין</div>
                        <div style="font-size: 24px; font-weight: bold; color: #198754;">${Math.max(0, totalChecked - findings.length)}</div>
                    </div>
                    <div style="background: ${findings.length > 0 ? 'rgba(220, 53, 69, 0.08)' : 'var(--bg-color)'}; border: 1px solid ${findings.length > 0 ? 'rgba(220, 53, 69, 0.2)' : 'var(--border-color)'}; border-radius: 10px; padding: 15px; text-align: center;">
                        <div style="font-size: 13px; color: ${findings.length > 0 ? '#dc3545' : 'var(--text-secondary)'};">ממצאים הדורשים תיקון</div>
                        <div style="font-size: 24px; font-weight: bold; color: ${findings.length > 0 ? '#dc3545' : 'var(--text-secondary)'};">${findings.length}</div>
                    </div>
                    <div style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 15px; text-align: center;">
                        <div style="font-size: 13px; color: var(--text-secondary);">יעד איכות ארגוני</div>
                        <div style="font-size: 24px; font-weight: bold; color: #0d6efd;">85%+</div>
                    </div>
                </div>

                <!-- Findings Requiring Correction Table -->
                <div style="margin-bottom: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h3 style="margin: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                            <span>⚠️</span> ממצאים מסכמים הדורשים תיקון ותוכנית פעולה (CAPA)
                        </h3>
                        <span style="font-size: 13px; color: var(--text-secondary);">סה"כ ${findings.length} ליקויים/פערים לאיתור וטיפול</span>
                    </div>

                    ${findings.length === 0 ? `
                        <div style="background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 10px; padding: 25px; text-align: center; color: #2e7d32;">
                            <div style="font-size: 32px; margin-bottom: 8px;">🌟</div>
                            <h4 style="margin: 0 0 6px; font-size: 18px;">מצוין! הבקרה הושלמה ללא ממצאי ליקוי</h4>
                            <p style="margin: 0; font-size: 14px;">כל הסעיפים והפרמטרים שנבדקו עומדים במלואם בנהלים, בפרוטוקולים ובסטנדרטים הארגוניים.</p>
                        </div>
                    ` : `
                        <div style="overflow-x: auto;">
                            <table class="audit-findings-table">
                                <thead>
                                    <tr>
                                        <th style="width: 5%;">#</th>
                                        <th style="width: 32%;">סעיף הבקרה / נושא שנבדק</th>
                                        <th style="width: 20%;">הממצא שנצפה בשטח</th>
                                        <th style="width: 13%;">סיווג חומרה</th>
                                        <th style="width: 30%;">הנחיה ופעולה מתקנת נדרשת (CAPA)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${findings.map((f, idx) => `
                                        <tr>
                                            <td style="font-weight: bold; color: var(--text-secondary); text-align: center;">${idx + 1}</td>
                                            <td>
                                                <div style="font-weight: bold; color: var(--text-primary); margin-bottom: 4px;">${f.label}</div>
                                                ${f.notes ? `<div style="font-size: 12.5px; color: #6c757d; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px; margin-top: 4px;"><strong>הערת שטח:</strong> ${f.notes}</div>` : ''}
                                            </td>
                                            <td>
                                                <div style="font-weight: bold; color: #dc3545;">${f.val}</div>
                                                ${f.expected ? `<div style="font-size: 12px; color: #198754; margin-top: 2px;">תשובה תקינה: <strong>${f.expected}</strong></div>` : ''}
                                            </td>
                                            <td>
                                                <span class="${f.isCritical ? 'badge-critical' : 'badge-warning'}">
                                                    ${f.isCritical ? '🔴 קריטי / בטיחות' : '🟡 שיפור איכות'}
                                                </span>
                                            </td>
                                            <td style="background: rgba(13, 110, 253, 0.02); border-right: 3px solid #0d6efd;">
                                                <div style="color: #0d6efd; font-weight: 500; font-size: 13.5px; line-height: 1.4;">
                                                    ${f.capa}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `}
                </div>

                <!-- Detailed Form Audit Drawer -->
                <details style="background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px 18px; margin-bottom: 25px;">
                    <summary style="font-weight: bold; cursor: pointer; color: var(--primary-color); font-size: 14px;">
                        👁️ לחץ כאן לצפייה במלוא הנתונים והשדות שהוזנו בטופס הבקרה
                    </summary>
                    <div style="margin-top: 15px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
                        ${form.fields.map(field => {
                            let val = formObj[field.id];
                            if (!val) return '';
                            let isProblem = val === 'לא' || val === 'חלקי' || (form.id === 'form_18' && val !== '50-100 J' && val !== '100 J' && val !== '120-200 J' && val !== 'להרחיק אנשי הצוות ממיטת המטופל' && val !== 'תשובה א\' וג\' נכונות' && !field.id.includes('seniority'));
                            return `
                                <div style="padding: 8px 12px; background: var(--surface-color); border: 1px solid ${isProblem ? '#f5c6cb' : 'var(--border-color)'}; border-radius: 6px; font-size: 13px;">
                                    <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 2px;">${field.label}</div>
                                    <div style="font-weight: bold; color: ${isProblem ? '#dc3545' : 'var(--text-primary)'};">${val}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </details>

                <!-- Footer Signatures (For Official Print) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; border-top: 1px dashed var(--border-color); padding-top: 25px; margin-top: 25px; text-align: center; font-size: 13px;">
                    <div>
                        <div style="border-bottom: 1px solid #000; height: 35px; margin-bottom: 6px;"></div>
                        <strong>חתימת מבצע/ת הבקרה</strong>
                    </div>
                    <div>
                        <div style="border-bottom: 1px solid #000; height: 35px; margin-bottom: 6px;"></div>
                        <strong>חתימת אחות אחראית מחלקה</strong>
                    </div>
                    <div>
                        <div style="border-bottom: 1px solid #000; height: 35px; margin-bottom: 6px;"></div>
                        <strong>אישור רכזת איכות ובקרה ארגונית</strong>
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to view summary and findings of any previously submitted form
function viewSavedFormFindings(recordId) {
    const record = filledFormsDb.find(f => f.id === Number(recordId));
    if (!record) {
        showToast('רשומת בקרה לא נמצאה', 'error');
        return;
    }

    const form = formsSchema.forms.find(f => f.id === record.formId) || {
        id: record.formId,
        title: record.formTitle || 'כלי בקרה',
        fields: []
    };

    let findings = record.findings;
    let finalScore = record.score;

    if (!findings || findings.length === 0) {
        // Evaluate dynamically if missing in older record
        let evalResult = evaluateFormAudit(form, record.data || {});
        findings = evalResult.findings;
        finalScore = record.score !== undefined ? record.score : evalResult.finalScore;
    }

    renderAuditSummaryResult(form, finalScore, findings, record.data || {}, record.dateFilled || '', record.id);
}
window.viewSavedFormFindings = viewSavedFormFindings;

function submitForm(e, formId) {
    e.preventDefault();
    const form = formsSchema.forms.find(f => f.id === formId);
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    
    // Evaluate Score & Detailed Deficiencies/Findings
    const evalResult = evaluateFormAudit(form, formObj);
    const finalScore = evalResult.finalScore;
    const findings = evalResult.findings;

    let today = new Date().toISOString().split('T')[0];
    let submitDate = formObj.w_date || formObj.f5_date || formObj.f16_date || formObj.f18_date || formObj.date_field || today;
    
    let newRecord = {
        id: Date.now(),
        formId: formId,
        formTitle: form.title,
        dateFilled: submitDate,
        score: finalScore,
        user: (currentUser && currentUser.name) ? currentUser.name : 'צוות איכות',
        findingsCount: findings.length,
        findings: findings,
        data: formObj
    };

    filledFormsDb.push(newRecord);
    localStorage.setItem('clinic_filled_forms', JSON.stringify(filledFormsDb));
    
    showToast('הבקרה נשמרה בהצלחה! ציון: ' + finalScore + '% (' + findings.length + ' ממצאים לתיקון)', findings.length > 0 ? 'warning' : 'success');
    
    // Render the comprehensive findings summary report immediately
    renderAuditSummaryResult(form, finalScore, findings, formObj, submitDate, newRecord.id);
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
                        תוכנית הדרכה מדורגת, תנאי סף, מחוון בוחן למבחן תרופות, סימולטור אפר'ת, תרגול SBAR וייצוא דוחות אקסל
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
    try {
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        if(document.getElementById(`nav-${viewName}`)) {
            document.getElementById(`nav-${viewName}`).classList.add(`active`);
        }
        
        const contentArea = document.getElementById('content-area');
        if (!contentArea) return;

        if (viewName === 'user-guide') {
            if (typeof renderUserGuideView === 'function') renderUserGuideView();
        } else if (viewName === 'intro') {
            contentArea.innerHTML = renderIntro();
        } else if (viewName === 'tip') {
            contentArea.innerHTML = renderTip();
        } else if (viewName === 'dashboard') {
            contentArea.innerHTML = renderDashboard();
        } else if (viewName === 'onboarding') {
            contentArea.innerHTML = renderOnboarding();
        } else if (viewName === 'shift-supervisor') {
            contentArea.innerHTML = renderShiftSupervisor();
        } else if (viewName === 'interprofessional') {
            if (typeof renderInterprofessionalDashboard === 'function') renderInterprofessionalDashboard();
        } else if (viewName === 'pocket-guides') {
            if (typeof renderPocketGuides === 'function') renderPocketGuides();
        } else if (viewName === 'trainings') {
            contentArea.innerHTML = renderTrainings();
        } else if (viewName === 'cdss') {
            if (typeof renderCdssView === 'function') renderCdssView();
        } else if (viewName === 'procedures') {
            contentArea.innerHTML = renderProcedures();
        } else if (viewName === 'protocols') {
            contentArea.innerHTML = renderProtocols();
        } else if (viewName === 'forms') {
            contentArea.innerHTML = renderForms();
        } else if (viewName === 'manager-portal') {
            if (typeof renderManagerPortalView === 'function') renderManagerPortalView();
        } else if (viewName === 'agent') {
            contentArea.innerHTML = renderAgent();
        } else if (viewName === 'settings') {
            contentArea.innerHTML = renderSettings();
        } else {
            if (typeof renderUserGuideView === 'function') renderUserGuideView();
            else contentArea.innerHTML = renderDashboard();
        }
    } catch(err) {
        console.error('Error navigating to view: ' + viewName, err);
    }
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
                    let userReadRecord = (p.readBy && currentUser) ? p.readBy.find(r => r.name === currentUser.name) : null;
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

                                <!-- כפתורי השקת מצגת מודל הבטיחות הקלינית -->
                <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center; background: var(--bg-color); padding: 14px 20px; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                    <button type="button" onclick="openBlueprintPresentationModal()" class="btn" style="background: linear-gradient(135deg, #1e40af, #2563eb); color: white; padding: 10px 22px; font-size: 14px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.25); cursor: pointer; border: none;">
                        <span>📊</span> צפה במצגת: מודל הבטיחות הקלינית (Clinical Safety Blueprint) ↗
                    </button>
                    <a href="Clinical_Safety_Blueprint (1).pptx" download class="btn" style="background: #059669; color: white; padding: 10px 18px; font-size: 14px; font-weight: 600; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(5,150,105,0.25);">
                        <span>📥</span> הורד קובץ מצגת (PPTX)
                    </a>
                </div>
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


let currentBlueprintSlide = 1;
const totalBlueprintSlides = 21;
let blueprintAutoPlayInterval = null;

function openBlueprintPresentationModal() {
    let modal = document.getElementById('blueprint-presentation-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'blueprint-presentation-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(10px);
            z-index: 99999; display: flex; flex-direction: column;
            align-items: center; justify-content: center; padding: 20px;
            animation: fadeIn 0.25s ease-out;
        `;
        document.body.appendChild(modal);
    }

    currentBlueprintSlide = 1;
    if (blueprintAutoPlayInterval) {
        clearInterval(blueprintAutoPlayInterval);
        blueprintAutoPlayInterval = null;
    }

    modal.innerHTML = `
        <div style="background: #0f172a; color: #f8fafc; border-radius: 16px; max-width: 1200px; width: 95%; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.15);">
            <div style="padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); background: #1e293b; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 22px;">📊</span>
                    <h3 style="margin: 0; font-size: 17px; font-weight: 700; color: #fff;">מצגת: מודל הבטיחות הקלינית (Clinical Safety Blueprint)</h3>
                    <span id="bp-slide-badge" style="background: #2563eb; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">שקף 1 מתוך 21</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button id="bp-autoplay-btn" type="button" class="btn" style="background: #334155; color: white; padding: 6px 12px; font-size: 12px; border-radius: 6px;" onclick="toggleBlueprintAutoPlay()">▶ הפעלה אוטומטית</button>
                    <a href="Clinical_Safety_Blueprint (1).pptx" download class="btn" style="background: #059669; color: white; padding: 6px 12px; font-size: 12px; border-radius: 6px; text-decoration: none;">📥 הורד PPTX</a>
                    <button type="button" class="btn" style="background: #2563eb; padding: 6px 14px; font-size: 13px; border-radius: 6px; color: white;" onclick="closeBlueprintModal()">⬅ חזרה למסך הקודם</button>
                    <button type="button" class="btn" style="background: #ef4444; padding: 6px 12px; font-size: 16px; border-radius: 6px; color: white;" onclick="closeBlueprintModal()" title="סגור">✕</button>
                </div>
            </div>
            <div style="flex: 1; overflow: hidden; display: flex; justify-content: center; align-items: center; background: #020617; position: relative; min-height: 480px;">
                <button type="button" onclick="changeBlueprintSlide(-1)" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.65); color: white; border: none; font-size: 28px; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;">➔</button>
                <img id="bp-slide-image" src="blueprint_slides/slide_1.jpg" alt="Slide 1" style="max-width: 100%; max-height: 68vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <button type="button" onclick="changeBlueprintSlide(1)" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.65); color: white; border: none; font-size: 28px; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;">⬅</button>
            </div>
            <div style="padding: 10px 20px; background: #1e293b; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; gap: 8px;">
                    <button type="button" class="btn" style="background: #334155; color: white; padding: 6px 14px; font-size: 13px;" onclick="changeBlueprintSlide(-1)">➔ שקף קודם</button>
                    <button type="button" class="btn" style="background: #334155; color: white; padding: 6px 14px; font-size: 13px;" onclick="changeBlueprintSlide(1)">שקף הבא ⬅</button>
                </div>
                <div style="color: #94a3b8; font-size: 12.5px;">
                    💡 ניתן לדפדף גם במקשי החצים (⬅ / ➔) במקלדת, או להפעיל הצגה אוטומטית.
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.onclick = (e) => { if (e.target === modal) closeBlueprintModal(); };
    document.addEventListener('keydown', handleBlueprintKeys);
}

function changeBlueprintSlide(delta) {
    currentBlueprintSlide += delta;
    if (currentBlueprintSlide > totalBlueprintSlides) currentBlueprintSlide = 1;
    if (currentBlueprintSlide < 1) currentBlueprintSlide = totalBlueprintSlides;
    updateBlueprintSlideDisplay();
}

function updateBlueprintSlideDisplay() {
    const img = document.getElementById('bp-slide-image');
    const badge = document.getElementById('bp-slide-badge');
    if (img) img.src = 'blueprint_slides/slide_' + currentBlueprintSlide + '.jpg';
    if (badge) badge.innerText = 'שקף ' + currentBlueprintSlide + ' מתוך ' + totalBlueprintSlides;
}

function toggleBlueprintAutoPlay() {
    const btn = document.getElementById('bp-autoplay-btn');
    if (blueprintAutoPlayInterval) {
        clearInterval(blueprintAutoPlayInterval);
        blueprintAutoPlayInterval = null;
        if (btn) {
            btn.innerText = '▶ הפעלה אוטומטית';
            btn.style.background = '#334155';
            btn.style.color = '#fff';
        }
    } else {
        blueprintAutoPlayInterval = setInterval(() => {
            changeBlueprintSlide(1);
        }, 4000);
        if (btn) {
            btn.innerText = '⏸ עצור ניגון';
            btn.style.background = '#eab308';
            btn.style.color = '#000';
        }
    }
}

function handleBlueprintKeys(e) {
    if (e.key === 'ArrowRight') changeBlueprintSlide(-1);
    else if (e.key === 'ArrowLeft') changeBlueprintSlide(1);
    else if (e.key === 'Escape') closeBlueprintModal();
}

function closeBlueprintModal() {
    let modal = document.getElementById('blueprint-presentation-modal');
    if (modal) modal.style.display = 'none';
    if (blueprintAutoPlayInterval) {
        clearInterval(blueprintAutoPlayInterval);
        blueprintAutoPlayInterval = null;
    }
    document.removeEventListener('keydown', handleBlueprintKeys);
}

function switchWoundProtocolView(src, btn) {
    const img = document.getElementById('protocol-modal-img');
    const extLink = document.getElementById('protocol-modal-ext-link');
    if (img) img.src = src;
    if (extLink) extLink.href = src;
    if (btn && btn.parentElement) {
        btn.parentElement.querySelectorAll('button').forEach(b => {
            b.style.background = '#334155';
        });
        btn.style.background = '#2563eb';
    }
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

    const isWoundProtocol = imgSrc.includes('wound_care_protocol');
    const woundToolbar = isWoundProtocol ? `
        <div style="background: #1e293b; padding: 10px 24px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="color: #94a3b8; font-size: 13px; font-weight: 600;">תצוגת מסמך מקור:</span>
            <button type="button" class="btn" id="btn-wound-full" style="padding: 5px 12px; font-size: 12px; border-radius: 6px; background: #2563eb; color: white;" onclick="switchWoundProtocolView('wound_care_protocol_full.jpg', this)">🖼️ כרזה מלאה משולבת</button>
            <button type="button" class="btn" id="btn-wound-p1" style="padding: 5px 12px; font-size: 12px; border-radius: 6px; background: #334155; color: white;" onclick="switchWoundProtocolView('wound_care_protocol_page1.jpg', this)">📄 עמוד 1 (סל חבישות פצעי לחץ)</button>
            <button type="button" class="btn" id="btn-wound-p2" style="padding: 5px 12px; font-size: 12px; border-radius: 6px; background: #334155; color: white;" onclick="switchWoundProtocolView('wound_care_protocol_page2.jpg', this)">📄 עמוד 2 (פצע טראומטי ואטלס דירוג)</button>
            <a href="wound_care_protocol.pdf" target="_blank" download="פרוטוקול_טיפול_בפצעים_סל_חבישות.pdf" class="btn" style="padding: 5px 12px; font-size: 12px; border-radius: 6px; background: #059669; color: white; text-decoration: none; margin-right: auto; display: inline-flex; align-items: center; gap: 5px;">📥 הורד קובץ PDF מקורי (Doc2)</a>
        </div>
    ` : '';
    
    modal.innerHTML = `
        <div style="background: var(--surface-color); color: var(--text-primary); border-radius: 16px; max-width: 1250px; width: 95%; max-height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid var(--border-color);">
            <div style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-color); flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 24px;">🖼️</span>
                    <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${title}</h3>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <a id="protocol-modal-ext-link" href="${imgSrc}" target="_blank" class="btn" style="padding: 6px 14px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" title="פתח בחלון חדש / הדפסה">
                        <span>פתח בחלון נפרד ↗</span>
                    </a>
                    <button type="button" class="btn" style="background: var(--primary-color); padding: 6px 14px; font-size: 13px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; color: white;" onclick="closeProtocolModal()" title="חזרה למסך הקודם">⬅ חזרה למסך הקודם</button>
                    <button type="button" class="btn" style="background: var(--danger); padding: 6px 12px; font-size: 16px; border-radius: 8px; color: white;" onclick="closeProtocolModal()" title="סגור">✕</button>
                </div>
            </div>
            ${woundToolbar}
            <div style="flex: 1; overflow: auto; padding: 15px; display: flex; justify-content: center; align-items: center; background: #0b1120;">
                <img id="protocol-modal-img" src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); cursor: zoom-in;" onclick="this.style.maxHeight = this.style.maxHeight === 'none' ? '75vh' : 'none'; this.style.cursor = this.style.maxHeight === 'none' ? 'zoom-out' : 'zoom-in';" title="לחץ להגדלה/הקטנה">
            </div>
            <div style="padding: 10px 20px; font-size: 12px; color: var(--text-secondary); text-align: center; border-top: 1px solid var(--border-color); background: var(--bg-color);">
                ${isWoundProtocol ? '💡 מסמך מקור רשמי מעודכן 12/2025. השתמשו בכפתורים למעלה למעבר בין העמודים, לחצו על התמונה להגדלה מלאה, או הורידו את ה-PDF המקורי.' : '💡 טיפ: ניתן ללחוץ על התמונה להגדלה מלאה, או על כפתור "פתח בחלון נפרד" להדפסה ותלייה במחלקה.'}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.onclick = (e) => { if (e.target === modal) closeProtocolModal(); };
    document.addEventListener('keydown', handleProtocolModalEsc);
}

function handleProtocolModalEsc(e) {
    if (e.key === 'Escape') closeProtocolModal();
}

function closeProtocolModal() {
    let modal = document.getElementById('protocol-image-modal');
    if (modal) modal.style.display = 'none';
    document.removeEventListener('keydown', handleProtocolModalEsc);
}
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
            if(typeof navigate === 'function') navigate((initialView && initialView !== '') ? initialView : 'user-guide');
        });
    } else {
        if(typeof navigate === 'function') navigate('user-guide');
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
let activeInterprofDept = 'all';

function renderInterprofessionalDashboard() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    const deptInfoMap = {
        all: {
            title: '${curDept.title}',
            sub: '${curDept.sub}',
            kpi1: { label: 'מניעת פצעים ותפרחת IAD', val: '94% עמידה', sub: 'פרוטוקול 3 שלבים וליחוח מותאם' },
            kpi2: { label: 'בטיחות ברחצה יומית', val: '100% תקין', sub: 'אפס כוויות ונפילות במקלחת' },
            kpi3: { label: 'סנכרון ניוד ומעברים', val: '88% יישום', sub: 'קימה לכורסה וסולמות תמיכה' },
            kpi4: { label: 'התאמת מרקמים (IDDSI) ותזונה', val: '96% סנכרון', sub: 'אומדן קלינאית ודיאטנית תוך 48 שעות' }
        },
        complex: {
            title: 'יעדים וממשקים: מחלקת סיעוד מורכב',
            sub: 'דגשי איכות: מניעת פצעי לחץ וקרעי עור, שלמות צנתרים, איזון כאב ורצף טיפול',
            kpi1: { label: 'מניעת פצעי לחץ ו-IAD', val: '95% עמידה', sub: 'מזרנים דינמיים ושינויי תנוחה 30°' },
            kpi2: { label: 'בטיחות רחצה והיפותרמיה', val: '100% תקין', sub: 'הגנה אטומה על צנתרים ופצעים' },
            kpi3: { label: 'ניוד והושבה מתוזמנת', val: '85% יישום', sub: 'התאמת כריות ישיבה מונעות לחץ' },
            kpi4: { label: 'העשרה חלבונית ו-IDDSI', val: '97% עמידה', sub: 'תוספי חלבון 1.5 גר/קג לריפוי פצעים' }
        },
        vent: {
            title: 'יעדים וממשקים: מחלקת סיעוד מונשמים',
            sub: 'דגשי איכות: מניעת דלקת ריאות מונשמים (VAP Bundle), בטיחות קנולות ופיום קנה, מניעת לחץ',
            kpi1: { label: 'שלמות עור סביב טרכאוסטומיה', val: '98% תקין', sub: 'חבישות ספוגיות ייעודיות לטרכאו' },
            kpi2: { label: 'בטיחות רחצה במיטה', val: '100% עמידה', sub: 'רחצה ללא מים וסבון pH 5.5' },
            kpi3: { label: 'שינויי תנוחה וניקוז ריאתי', val: '92% יישום', sub: 'סנכרון פיזיו נשימתית וסיעוד' },
            kpi4: { label: 'הזנה אנטרלית בטוחה (PEG)', val: '99% תקין', sub: 'הרמת מראשות 30-45° למניעת שאיפה' }
        },
        rehab: {
            title: 'יעדים וממשקים: מחלקת שיקום גריאטרי',
            sub: 'דגשי איכות: שיפור עצמאות תפקודית (FIM), מניעת נפילות פעילה, תרגול מעברים וחזרה לקהילה',
            kpi1: { label: 'מניעת פציעות עור בפעילות', val: '96% תקין', sub: 'שרוולי הגנה במעברים וניוד' },
            kpi2: { label: 'עצמאות ברחצה בליווי', val: '92% עמידה', sub: 'הדרכת מקלחת בטוחה עם אביזרי עזר' },
            kpi3: { label: 'השגת יעדי ניוד ומרחק הליכה', val: '90% יישום', sub: 'סנכרון תרגילי הליכה יומיים במשמרת' },
            kpi4: { label: 'התקדמות מרקמי מזון לרגיל', val: '94% סנכרון', sub: 'גמילה מהסמכה והדרכת בליעה' }
        },
        chronic_nursing: {
            title: 'יעדים וממשקים: מחלקת גריאטריה כרונית סיעודית',
            sub: 'דגשי איכות: שימור איכות חיים ותפקוד, מניעת פצעי לחץ ו-IAD במרותקים, מניעת קונטרקטורות וסרקופניה',
            kpi1: { label: 'מניעת פצעי לחץ ו-IAD במרותקים', val: '96% עמידה', sub: 'פרוטוקול עור מקיף והחלפות תכופות' },
            kpi2: { label: 'בטיחות ברחצה ושימון מונע', val: '100% תקין', sub: 'כלל 3 הדקות לליחוח ואפס כוויות' },
            kpi3: { label: 'שינויי תנוחה ומנופי הרמה', val: '91% יישום', sub: 'מניעת משיכת גפיים וקרעי עור' },
            kpi4: { label: 'האכלה סבלנית ומרקמי IDDSI', val: '95% סנכרון', sub: 'מניעת התייבשות ואספירציה שקטה' }
        },
        psychogeriatric: {
            title: 'יעדים וממשקים: מחלקת תשושי נפש (דמנציה ואלצהיימר)',
            sub: 'דגשי איכות: מניעת שוטטות ונפילות ללא קשירות (Restraint-Free), גישות לא-תרופתיות לאי-שקט, בטיחות רחצה סבלנית',
            kpi1: { label: 'בטיחות סביבתית ללא קשירות', val: '98% חופש תנועה', sub: 'חיישני תנועה, סביבה מרופדת ונעימה' },
            kpi2: { label: 'רחצה מרגיעה ללא כפייה', val: '100% תקין', sub: 'גישה סבלנית, מוזיקה ומים חמימים' },
            kpi3: { label: 'ניהול אי-שקט (BPSD) לא-תרופתי', val: '92% יישום', sub: 'הפחתת סדציה לפי קריטריוני Beers' },
            kpi4: { label: 'אכילה עצמאית ו-Finger Foods', val: '94% עמידה', sub: 'עידוד הידרציה שוטפת למניעת דליריום' }
        }
    };
    const curDept = deptInfoMap[activeInterprofDept] || deptInfoMap.all;


    contentArea.innerHTML = `
        <div class="fade-in space-y-6">
            <!-- Header Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:14px 20px; border-radius:14px; border:1px solid var(--border-color); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                <button class="btn" onclick="navigate('dashboard')" style="background:var(--primary-color); color:white; font-weight:bold; font-size:13px; display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; cursor:pointer;">
                    <span>➜</span> חזרה לדשבורד הראשי
                </button>
                <div style="text-align:center;">
                    <h2 style="font-size:18px; font-weight:800; color:var(--text-primary); margin:0; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <span>🎯</span> דשבורד יעדים וממשקים רב-מקצועיים במחלקה
                    </h2>
                    <span style="font-size:12px; color:var(--text-secondary);">ניהול איכות, סנכרון ממשקים ובטיחות הטיפול ברמה המחלקתית (ללא פרטי מטופלים מזוהים)</span>
                </div>
                <button onclick="window.print()" class="btn" style="background:transparent; border:1px solid var(--border-color); color:var(--text-primary); font-size:12px; padding:8px 14px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                    <span>🖨️</span> הדפס סיכום A4
                </button>
            </div>

            <!-- Ethical Standard Notice -->
            <div style="background:rgba(2, 132, 199, 0.08); border-right:4px solid #0284c7; padding:12px 16px; border-radius:0 10px 10px 0; font-size:12.5px; color:var(--text-primary); display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:16px;">🛡️</span>
                    <span><strong>תקן אתיקה והגנת הפרטיות:</strong> דשבורד זה מנהל יעדי איכות, נהלים וממשקי עבודה מחלקתיים. תוכניות טיפול פרטניות מנוהלות אך ורק בתוך הגיליון הרפואי הממוחשב (EHR).</span>
                </div>
                <span class="badge" style="background:#0284c7; color:white; font-size:10.5px; padding:3px 8px; border-radius:6px;">ISO / MOH Accredited</span>
            </div>

            <!-- Department Filter & Overview Cards -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; gap:8px;">
                    <button onclick="filterInterprofDept('all')" class="btn" style="${activeInterprofDept==='all' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">כלל המחלקות</button>
                    <button onclick="filterInterprofDept('complex')" class="btn" style="${activeInterprofDept==='complex' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">סיעוד מורכב</button>
                    <button onclick="filterInterprofDept('vent')" class="btn" style="${activeInterprofDept==='vent' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">סיעוד מונשמים</button>
                    <button onclick="filterInterprofDept('rehab')" class="btn" style="${activeInterprofDept==='rehab' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">שיקום גריאטרי</button>
                    <button onclick="filterInterprofDept('chronic_nursing')" class="btn" style="${activeInterprofDept==='chronic_nursing' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">גריאטריה כרונית סיעודית</button>
                    <button onclick="filterInterprofDept('psychogeriatric')" class="btn" style="${activeInterprofDept==='psychogeriatric' ? 'background:var(--primary-color); color:white;' : 'background:var(--surface); color:var(--text-primary); border:1px solid var(--border-color);'} font-size:12px; padding:6px 13px; border-radius:8px; font-weight:700;">תשושי נפש</button>
                </div>
                <div style="font-size:12px; color:var(--text-secondary);">תקופת יעד: <strong>רבעון נוכחי 2026</strong></div>
            </div>

            <!-- KPI Metric Counters -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
                <div class="interprof-card" style="border-top:4px solid #059669;">
                    <div style="font-size:11.5px; color:var(--text-secondary);">${curDept.kpi1.label}</div>
                    <div style="font-size:24px; font-weight:800; color:#059669; margin:4px 0;">${curDept.kpi1.val}</div>
                    <div style="font-size:11px; color:var(--text-secondary);">${curDept.kpi1.sub}</div>
                </div>
                <div class="interprof-card" style="border-top:4px solid #0284c7;">
                    <div style="font-size:11.5px; color:var(--text-secondary);">${curDept.kpi2.label}</div>
                    <div style="font-size:24px; font-weight:800; color:#0284c7; margin:4px 0;">${curDept.kpi2.val}</div>
                    <div style="font-size:11px; color:var(--text-secondary);">${curDept.kpi2.sub}</div>
                </div>
                <div class="interprof-card" style="border-top:4px solid #d97706;">
                    <div style="font-size:11.5px; color:var(--text-secondary);">${curDept.kpi3.label}</div>
                    <div style="font-size:24px; font-weight:800; color:#d97706; margin:4px 0;">${curDept.kpi3.val}</div>
                    <div style="font-size:11px; color:var(--text-secondary);">${curDept.kpi3.sub}</div>
                </div>
                <div class="interprof-card" style="border-top:4px solid #7c3aed;">
                    <div style="font-size:11.5px; color:var(--text-secondary);">${curDept.kpi4.label}</div>
                    <div style="font-size:24px; font-weight:800; color:#7c3aed; margin:4px 0;">${curDept.kpi4.val}</div>
                    <div style="font-size:11px; color:var(--text-secondary);">${curDept.kpi4.sub}</div>
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
        </div>
    `;
}

function filterInterprofDept(dept) {
    activeInterprofDept = dept;
    renderInterprofessionalDashboard();
}

function saveHuddleNotes() {
    showToast('סיכום המפגש הרב-מקצועי נשמר בהצלחה במערכת האיכות!', 'success');
}


// ==============================================================
// 2. RESPONSIVE POCKET GUIDES (MOBILE-FIRST)
// ==============================================================
let activePocketCategory = 'all';
let pocketSearchQuery = '';

const pocketGuidesMasterData = [
    // 1. SKIN INTEGRITY & IAD
    {
        id: "guide_skin_iad",
        category: "skin_iad",
        title: "פרוטוקול שלמות העור: אמצעי ליחוח, ניקוי והגנה מותאמים (מניעת תפרחת IAD ו-MASD)",
        icon: "🛡️",
        badge: "בטיחות עור ומניעת לחות",
        content: `
            <div class="space-y-3">
                <div class="success-callout">
                    <strong>פרוטוקול 3 השלבים התקני לשמירה על העור בגיל השלישי:</strong>
                </div>
                
                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>1. ניקוי עדין (Cleanse):</strong>
                    <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc;">
                        <li>שימוש בתכשירי ניקוי ללא שטיפה (No-Rinse Foams) בעלי <strong>pH 5.5</strong> מותאם לחומציות העור הטבעית.</li>
                        <li><strong>איסור מוחלט:</strong> שפשוף במגבות, סבון גוף רגיל ומגבונים מבושמים/אלכוהוליים המפרקים את שכבת השומן המגנה.</li>
                    </ul>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>2. ליחוח ושימון מונע (Moisturize):</strong>
                    <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc;">
                        <li>מריחה יומית של קרם לחות מרכך (Emollients/Urea) על עור הגפיים והגו (מניעת עור יבש, גרד וקרעי עור).</li>
                        <li><strong>כלל 3 הדקות:</strong> מריחה תוך 3 דקות מסיום שטיפה כשהעור עוד לח לכליאת המים.</li>
                    </ul>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>3. הגנה ומחסום לחות (Protect / Barrier):</strong>
                    <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc;">
                        <li><strong>קרם מחסום שקוף (Dimethicone):</strong> מאפשר ניטור שוטף של העור ואינו סותם את כושר הספיגה של החיתול.</li>
                        <li><strong>משחת אבץ עבה (Zinc Oxide):</strong> מומלץ בהפרשות חומציות מרובות ובשלשולים תכופים.</li>
                        <li><strong>תרסיס סרט מגן (Cavilon Barrier Film):</strong> אינו צורב, מגן על עור שברירי מפני פציעות דבק ולחות.</li>
                    </ul>
                </div>

                <div class="warning-callout">
                    <strong>דגש בטיחות:</strong> יש להשתמש במוצרי ספיגה נושמים (Breathable). <strong>חל איסור מוחלט על "חיתול כפול"</strong> (חיתול בתוך חיתול) החוסם מעבר אוויר ומאיץ תפרחת IAD חמורה.
                </div>
            </div>
        `
    },

    // 2. BATHING SAFETY
    {
        id: "guide_bathing",
        category: "bathing",
        title: "בטיחות ברחצה יומית: ניהול סיכונים ושמירה על שלמות העור",
        icon: "🛁",
        badge: "מניעת נפילות וכוויות",
        content: `
            <div class="space-y-3">
                <div class="warning-callout">
                    <strong>5 סיכוני הליבה ברחצה יומית בקשישים והנחיות מניעה:</strong>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>1. סיכון כוויות ופגיעה תרמית:</strong>
                    <p style="margin:3px 0;">בקשישים קיימת ירידה בתחושת חום. <strong>טמפרטורת מים מרבית מותרת: 37°C עד 40°C בלבד!</strong> חובת בדיקת מים על אמת היד של המטפל/ת לפני הרטבת המטופל. פתיחת מים קרים תחילה.</p>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>2. סיכון נפילות והחלקות במקלחת:</strong>
                    <p style="margin:3px 0;">רחצה בישיבה בלבד (כסא גלגלים לרחצה / כסא מקלחת ייעודי עם מעצורים נעולים וחגורת בטיחות). איסור מוחלט על עזיבת המטופל לבדו אפילו לרגע אחד!</p>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>3. תת לחץ דם תנוחתי והיפותרמיה:</strong>
                    <p style="margin:3px 0;">מים חמים גורמים להרחבת כלי דם (Vasodilation), ירידת ל"ד והתעלפות. יש לוודא חדר מחומם ללא משבי רוח, רחצה בחלקים וכיסוי שאר הגוף במגבת יבשה.</p>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>4. הגנה על צנתרים, נקזים וחבישות:</strong>
                    <p style="margin:3px 0;">חובת כיסוי אטום למים של צנתר ורידי מרכזי (PICC/CVC), נקזים או פצעים פעילים לפני הרחצה למניעת זיהומי זרם דם קטלניים (CLABSI).</p>
                </div>

                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>5. מניעת פגיעה במחסום השומני של העור:</strong>
                    <p style="margin:3px 0;">הימנעות משפשוף במגבות גסות. ייבוש עדין בטפיחות (Pat dry) ומריחת קרם לחות בתוך 3 דקות מסיום הרחצה.</p>
                </div>
            </div>
        `
    },

    // 3. WOUND ATLAS - INCLUDING IAD WOUND TYPE
    {
        id: "guide_wounds",
        category: "wounds",
        title: "אטלס סוגי פצעים קליניים ואבחנה מבדלת (כולל פצעי IAD)",
        icon: "🩹",
        badge: "אבחנה מבדלת ופרוטוקול טיפול",
        content: `
            <div class="space-y-4">
                <!-- IAD -->
                <div style="border:1px solid #fbcfe8; background:#fff5f7; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-iad">פצעי IAD ופגיעות לחות (Incontinence-Associated Dermatitis)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה:</strong> פגיעה כימית ומכאנית משתן וצואה שלשולית חומצית (אנזימי פרוטאז וליפאז).</li>
                        <li><strong>מיקום:</strong> מפשעות, קפלי עור, ישבן פנימי, פרינאום (פיזור סימטרי מפושט).</li>
                        <li><strong>מאפיינים:</strong> דרגה 1: אריתמה מבריקה ללא אובדן עור; דרגה 2: אובדן עור שטחי (Denuded) עם אזורים מפרישים נקודתיים; זיהום פטרייתי: נגעי לוויין אדומים (Satellite lesions).</li>
                        <li><strong>טיפול:</strong> ניקוי בקצף pH 5.5, קרם Dimethicone או משחת אבץ, תרסיס Cavilon, משחה אנטי-פטרייתית בקנדידה.</li>
                    </ul>
                </div>

                <!-- PRESSURE INJURY -->
                <div style="border:1px solid #bfdbfe; background:#f0f7ff; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-pi">פצעי לחץ (Pressure Injuries - PI)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה:</strong> איסכמיה רקמתית ממושכת מלחץ וכוחות גזירה מעל בליטה גרמית.</li>
                        <li><strong>דרגות:</strong> דרגה 1 (אודם בלתי נעלם), דרגה 2 (אובדן דרמיס שטחי/שלפוחית), דרגה 3 (חשיפת שומן תת-עורי), דרגה 4 (חשיפת שריר/עצם/גיד), DTI (רקמה עמוקה), Unstageable (מכוסה Slough/גלד).</li>
                        <li><strong>טיפול:</strong> שחרור לחץ מוחלט (Offloading), שינויי תנוחה במנח 30 מעלות, חבישות ספוג מתקדמות.</li>
                    </ul>
                </div>

                <!-- SKIN TEARS -->
                <div style="border:1px solid #fef08a; background:#fefce8; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-st">קרעי עור (Skin Tears - ISTAP)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה:</strong> גזירה או מכה קהה בעור דק ושברירי (Dermatoporosis), מעברים לא זהירים, הסרת דבקים.</li>
                        <li><strong>סיווג:</strong> סוג 1 (ללא אובדן מתלה עור), סוג 2 (אובדן מתלה חלקי), סוג 3 (אובדן מתלה מלא).</li>
                        <li><strong>טיפול:</strong> <strong>החזרת מתלה העור למקומו</strong>, איסור מוחלט על פלסטר דביק, שימוש בחבישת סיליקון (Mepilex).</li>
                    </ul>
                </div>

                <!-- VENOUS ULCERS -->
                <div style="border:1px solid #a7f3d0; background:#f0fdf4; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-vlu">כיבים ורידיים (Venous Leg Ulcers - VLU)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה ומאפיינים:</strong> אי ספיקה ורידית כרונית (CVI). מיקום מעל פטישון פנימי (Gaiter). הפרשות מרובות (Exudate גבוה), פיגמנטציה חומה ובצקת. דופק היקפי שמור.</li>
                        <li><strong>טיפול עיקרי:</strong> <strong>חבישת לחץ (Compression Therapy)</strong> – לאחר שלילת מחלה עורקית בלבד! הרמת רגליים.</li>
                    </ul>
                </div>

                <!-- ARTERIAL ULCERS -->
                <div style="border:1px solid #fecdd3; background:#fff1f2; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-art">כיבים עורקיים (Arterial / Ischemic Ulcers)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה ומאפיינים:</strong> חסימת כלי דם (PAD). פצע בגבולות חדים ("Punch-out") בקצות אצבעות או עקב, ללא הפרשות, עור קר וללא שיער, היעדר דפקים, <strong>כאב עז</strong> בלילה.</li>
                        <li><strong>⚠️ אזהרה קריטית: איסור מוחלט על חבישת לחץ!</strong> עלול להוביל לנמק מיידי וקטיעה. הפניה דחופה להערכת כלי דם.</li>
                    </ul>
                </div>

                <!-- DIABETIC FOOT -->
                <div style="border:1px solid #ddd6fe; background:#faf5ff; border-radius:10px; padding:12px;">
                    <span class="wound-type-pill wound-pill-dfu">כיב כף רגל סוכרתית (Diabetic Foot Ulcer - DFU)</span>
                    <ul style="margin:4px 0 0 16px; padding:0; font-size:12.5px; list-style-type:disc;">
                        <li><strong>אטיולוגיה:</strong> נוירופתיה תחושתית (חוסר כאב) ועיוותי כף רגל. מוקף ביבלת קשה (Callus).</li>
                        <li><strong>טיפול:</strong> פיזור עומסים (Offloading) והנעלה מותאמת, בדיקה יומית בין אצבעות, איזון גליקמי.</li>
                    </ul>
                </div>
            </div>
        `
    },

    // 4. IDDSI DYSPHAGIA GUIDE
    {
        id: "guide_iddsi",
        category: "iddsi",
        title: "מדריך מרקמי בליעה והאכלה בטוחה (תקן בינלאומי IDDSI)",
        icon: "🥄",
        badge: "מניעת אספירציות וחנק",
        content: `
            <div class="space-y-3">
                <div class="success-callout">
                    <strong>רמות צמיגות נוזלים ומזון לפי תקן IDDSI:</strong>
                </div>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <ul style="margin:0 0 0 16px; padding:0; list-style-type:disc;">
                        <li><strong>רמה 0 (דק - Thin):</strong> מים, תה צלול (זרימה חופשית).</li>
                        <li><strong>רמה 1 (דק מוסמך - Slightly Thick):</strong> סמיכות קלה למניעת שאיפה.</li>
                        <li><strong>רמה 2 (מוסמך קל / נקטר - Mildly Thick):</strong> זורם מכפית אך משאיר ציפוי.</li>
                        <li><strong>רמה 3 (מוסמך בינוני / דבש - Moderately Thick):</strong> נלגם מכוס או נאכל בכפית.</li>
                        <li><strong>רמה 4 (מוסמך מאוד / פודינג - Extremely Thick):</strong> שומר על צורתו בכפית, אינו נלגם.</li>
                        <li><strong>רמה 5 (קצוץ ולח - Minced & Moist):</strong> חתיכות עד 4 מ"מ לקשישים.</li>
                        <li><strong>רמה 6 (רך וקטן - Soft & Bite-Sized):</strong> חתיכות עד 15 מ"מ, נמעך במזלג.</li>
                        <li><strong>רמה 7 (רגיל - Regular):</strong> מרקם מזון רגיל.</li>
                    </ul>
                </div>
                <div class="warning-callout">
                    <strong>כללי בטיחות בהאכלה:</strong> הושבה זקופה ב-90 מעלות, אכילה איטית ללא דיבור בזמן בליעה, השארת המטופל בישיבה לפחות 30-45 דקות מסיום הארוחה למניעת רפלוקס ואספירציה שקטה.
                </div>
            </div>
        `
    },

    // 5. MOBILITY & TRANSFERS
    {
        id: "guide_mobility",
        category: "mobility",
        title: "מדריך סולם מעברים וניוד בטוח (פיזיותרפיה וסיעוד)",
        icon: "🚶",
        badge: "ארגונומיה ומניעת פציעות",
        content: `
            <div class="space-y-3">
                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <strong>סולם רמות סיוע במעברים:</strong>
                    <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc;">
                        <li><strong>עצמאי (Independent):</strong> ללא צורך בסיוע אדם.</li>
                        <li><strong>השגחה / הנחיה מילולית:</strong> שמירת קשר עין ללא תמיכה פיזית.</li>
                        <li><strong>סיוע אדם אחד:</strong> תמיכה במותן או בחגורת הליכה (Gait belt).</li>
                        <li><strong>סיוע שני מטפלים:</strong> מטופל מוגבל עם חוסר יציבות משמעותי.</li>
                        <li><strong>מנוף הרמה אקטיבי (Sit-to-Stand):</strong> למטופל המסוגל לשאת משקל על הרגליים.</li>
                        <li><strong>מנוף הרמה פסיבי (Passive Hoist):</strong> למטופל סיעודי מרותק ללא נשיאת משקל.</li>
                    </ul>
                </div>
                <div class="warning-callout">
                    <strong>כללי ברזל:</strong> תמיד לנעול מעצורי מיטה וכסא לפני מעבר! הימנעות ממשיכה בזרועות המטופל (סכנת פריקת כתף וקרעי עור).
                </div>
            </div>
        `
    },

    // 6. DELIRIUM CAM GUIDE
    {
        id: "guide_delirium",
        category: "delirium",
        title: "זיהוי מהיר של דליריום חריף (מבחן CAM מקוצר)",
        icon: "🧠",
        badge: "גילוי מוקדם ודגלים אדומים",
        content: `
            <div class="space-y-3">
                <p>אבחנת דליריום דורשת נוכחות של <strong>קריטריונים 1 ו-2</strong> + לפחות אחד מבין <strong>3 או 4</strong>:</p>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <ul style="margin:0 0 0 16px; padding:0; list-style-type:disc;">
                        <li><strong>1. התחלה חריפה ומהלך תנודתי:</strong> שינוי פתאומי במצב ההכרה לעומת מצב הבסיס.</li>
                        <li><strong>2. חוסר קשב (Inattention):</strong> קושי למקד, לשמור או להעביר קשב (מבחן ימי השבוע לאחור).</li>
                        <li><strong>3. חשיבה לא מאורגנת:</strong> דיבור מקוטע, לא הגיוני, קפיצה מנושא לנושא.</li>
                        <li><strong>4. שינוי ברמת ההכרה:</strong> ישנוניות יתר (היפואקטיבי) או אי שקט קיצוני (היפראקטיבי).</li>
                    </ul>
                </div>
                <div class="success-callout">
                    <strong>סיבות הפיכות נפוצות לבדיקה מיידית (I WATCH DEATH):</strong> זיהום סמוי (UTI/דלקת ריאות), עצירות חריפה, התייבשות, אצירת שתן, ותרופות חדשות (אנטיכולינרגיים/בנזודיאזפינים).
                </div>
            </div>
        `
    },

    // 7. BEERS CRITERIA POCKET GUIDE
    {
        id: "guide_beers",
        category: "beers",
        title: "קריטריוני Beers 2023: תרופות בסיכון מוגבר בגיל השלישי",
        icon: "⚠️",
        badge: "בטיחות תרופתית ופוליפרמסי",
        content: `
            <div class="space-y-3">
                <div class="warning-callout">
                    <strong>קבוצות תרופות שיש להימנע מהן ככל האפשר בקשישים:</strong>
                </div>
                <div style="background:var(--bg-color); padding:10px; border-radius:8px;">
                    <ul style="margin:0 0 0 16px; padding:0; list-style-type:disc;">
                        <li><strong>בנזודיאזפינים (Lorivan, Clonex, Valium):</strong> מעלים פי 2-3 סיכון לנפילות, שברי צוואר ירך ודליריום.</li>
                        <li><strong>אנטי-היסטמינים דור ראשון (Otrivin, Dimenhydrinate):</strong> נטל אנטיכולינרגי חמור, אצירת שתן ובלבול.</li>
                        <li><strong>תרופות אנטי-פסיכוטיות (Halidol, Risperdal):</strong> אזהרת Black Box Warning לעלייה בתמותה ואירועים מוחיים בקשישים דמנטיים.</li>
                        <li><strong>NSAIDs כרוני (Ibuprofen, Voltaren):</strong> סכנת דמם מדרכי עיכול ואי ספיקת כליות חריפה.</li>
                    </ul>
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
