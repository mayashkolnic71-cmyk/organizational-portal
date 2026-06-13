import re
import os

# Read files
with open('d:/antigravity/project/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('d:/antigravity/project/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update Title
html = html.replace('<title>מערכת "פורטל ארגוני"</title>', '<title>פורטל לניהול איכות ובטיחות ארגונית</title>')
html = html.replace('<h1>פורטל ארגוני</h1>', '<h1>פורטל לניהול איכות ובטיחות ארגונית</h1>')

# 2. Add Intro Tab first
intro_nav_str = '''
                    <li id="nav-intro" onclick="navigate('intro')">
                        <span class="nav-icon">💡</span> הדרכת מבוא
                    </li>'''
html = html.replace('<nav>\n                <ul>', '<nav>\n                <ul>' + intro_nav_str)

# 3. Add Protocols Tab
protocols_nav_str = '''
                    <li id="nav-protocols" onclick="navigate('protocols')">
                        <span class="nav-icon">📑</span> טפסים ופרוטוקולים טיפוליים
                    </li>'''
html = html.replace('<span class="nav-icon">📖</span> נהלי עבודה\n                    </li>', '<span class="nav-icon">📖</span> נהלי עבודה\n                    </li>' + protocols_nav_str)

# Write back HTML
with open('d:/antigravity/project/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Now modify script.js

# 4. Remove intro from trainingsDb initialization
js = js.replace('''        if (!trainingsDb.find(t => t.url === 'mock_intro')) {
            trainingsDb.push({ id: 3, title: 'הדרכת מבוא: משמעות הפורטל הארגוני', url: 'mock_intro', icon: '💡', external: false });
            localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
        }''', '')

js = js.replace('''            { id: 3, title: 'הדרכת מבוא: משמעות הפורטל הארגוני', url: 'mock_intro', icon: '💡', external: false }''', '')
js = js.replace('},\n        ];', '}\n        ];') # fix trailing comma if any

# 5. Add Protocols DB and Feedback DB
init_dbs_code = '''
let protocolsDb = [];
let introFeedbackDb = [];
let trainingsAnswersDb = [];

function initProtocolsDb() {
    const stored = localStorage.getItem('clinic_protocols');
    if (stored) {
        protocolsDb = JSON.parse(stored);
    } else {
        protocolsDb = [
            { id: 1, title: 'פרוטוקול החייאה', link: '#' }
        ];
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    }
}
initProtocolsDb();

function initIntroFeedbackDb() {
    const stored = localStorage.getItem('clinic_intro_feedback');
    if (stored) {
        introFeedbackDb = JSON.parse(stored);
    }
}
initIntroFeedbackDb();

function initTrainingsAnswersDb() {
    const stored = localStorage.getItem('clinic_trainings_answers');
    if (stored) {
        trainingsAnswersDb = JSON.parse(stored);
    }
}
initTrainingsAnswersDb();
'''
js = js.replace('let proceduresDb = [];\\nlet trainingsDb = [];', 'let proceduresDb = [];\\nlet trainingsDb = [];\\n' + init_dbs_code)
# Alternative replace just in case of newlines
js = js.replace('let trainingsDb = [];', 'let trainingsDb = [];\\n' + init_dbs_code)


# 6. Add Intro rendering logic
intro_render = '''
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
                <div style="background: var(--bg-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); text-align: center;">
                    <h4 style="margin-bottom: 10px; color: var(--primary-color);">סיכום</h4>
                    <p style="font-size: 16px;">הפורטל מעביר את המוסד מניהול תגובתי לניהול פרואקטיבי, משפר את איכות חיי המטופל הקשיש, ומבטיח סביבת טיפול בטוחה ומקצועית יותר.</p>
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
'''
js = js + '\\n' + intro_render

# 7. Add Protocols logic
protocols_render = '''
function renderProtocols() {
    let html = `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">טפסים ופרוטוקולים טיפוליים</h2>
            <div class="forms-list">
                ${protocolsDb.map(p => `
                    <div class="card" style="margin-bottom: 15px;">
                        <h3 style="margin-bottom: 10px;">${p.title}</h3>
                        ${p.link.startsWith('http') ? `<a href="${p.link}" target="_blank" style="color: var(--primary-color);">צפה במסמך / פרוטוקול ↗</a>` : `<p>${p.link}</p>`}
                    </div>
                `).join('')}
                ${protocolsDb.length === 0 ? '<p>לא הוגדרו פרוטוקולים במערכת.</p>' : ''}
            </div>
        </div>
    `;
    return html;
}
'''
js = js + '\\n' + protocols_render

# Add to navigate
js = js.replace('''    if (viewName === 'dashboard') contentArea.innerHTML = renderDashboard();''', '''    if (viewName === 'intro') contentArea.innerHTML = renderIntro();\\n    else if (viewName === 'dashboard') contentArea.innerHTML = renderDashboard();\\n    else if (viewName === 'protocols') contentArea.innerHTML = renderProtocols();''')

# Fix navigation initial state: change default from dashboard to intro
js = js.replace('''navigate('dashboard');''', '''navigate('intro');''')

# 8. Feedback in Dashboard
dashboard_feedback = '''
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
'''
js = js.replace('''<div class="dashboard-grid">''', dashboard_feedback + '\\n            <div class="dashboard-grid">')

# 9. Control Tools (כלי בקרה) available to all
js = js.replace('''    let availableForms = formsSchema.forms;\\n    if (!currentUser.isAdmin) {\\n        availableForms = availableForms.filter(f => f.team === currentUser.team);\\n    }''', '''    let availableForms = formsSchema.forms;''')
js = js.replace('''    if (!currentUser.isAdmin) {
        availableForms = availableForms.filter(f => f.team === currentUser.team);
    }''', '')

# 10. Procedures: Search + Excel export
proc_search_html = '''
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="proc-search" placeholder="חיפוש נוהל..." style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;" oninput="filterProcedures()">
                ${currentUser.isAdmin ? '<button class="btn" onclick="exportProceduresExcel()" style="background: var(--success);">ייצא דוח קריאה לאקסל 📥</button>' : ''}
            </div>
'''
js = js.replace('''<p style="color: var(--text-secondary); margin-bottom: 20px;">על כל איש צוות לקרוא ולאשר את נהלי העבודה אחת לשנה לפחות.</p>''', '''<p style="color: var(--text-secondary); margin-bottom: 20px;">על כל איש צוות לקרוא ולאשר את נהלי העבודה אחת לשנה לפחות.</p>''' + proc_search_html)

proc_logic = '''
function filterProcedures() {
    let q = document.getElementById('proc-search').value.toLowerCase();
    document.querySelectorAll('.procedure-item').forEach(el => {
        if (el.innerText.toLowerCase().includes(q)) el.style.display = 'block';
        else el.style.display = 'none';
    });
}

function exportProceduresExcel() {
    let csvContent = "\\uFEFFשם העובד,מחלקה,תאריך ביצוע,שם הנוהל\\n"; // BOM for Hebrew
    proceduresDb.forEach(p => {
        p.readBy.forEach(r => {
            let user = usersDb.find(u => u.name === r.name) || { team: 'לא ידוע' };
            let dateStr = new Date(r.date).toLocaleDateString('he-IL');
            csvContent += `"${r.name}","${user.team}","${dateStr}","${p.title}"\\n`;
        });
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "דוח_קריאת_נהלים.csv");
    link.click();
}
'''
js = js + '\\n' + proc_logic

js = js.replace('''<div class="card" style="margin-bottom: 15px; border-right: 4px solid ${hasReadRecently ? 'var(--success)' : 'var(--danger)'};">''', '''<div class="card procedure-item" style="margin-bottom: 15px; border-right: 4px solid ${hasReadRecently ? 'var(--success)' : 'var(--danger)'};">''')

# 11. Trainings: Internal forms instead of Google forms + Excel Export
js = js.replace('''            { id: 1, title: 'מארז מניעת זיהומים', url: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?embedded=true', icon: '🦠', external: false },\\n            { id: 2, title: 'מארז לטיפול תומך', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?embedded=true', icon: '🫂', external: false }''', '''            { id: 1, title: 'מארז מניעת זיהומים', url: 'internal_quiz_1', icon: '🦠', external: false },\\n            { id: 2, title: 'מארז לטיפול תומך', url: 'internal_quiz_2', icon: '🫂', external: false }''')

js = js.replace('''{ id: 1, title: 'מארז מניעת זיהומים', url: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?embedded=true', icon: '🦠', external: false },
            { id: 2, title: 'מארז לטיפול תומך', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?embedded=true', icon: '🫂', external: false }''', '''{ id: 1, title: 'מארז מניעת זיהומים', url: 'internal_quiz_1', icon: '🦠', external: false },
            { id: 2, title: 'מארז לטיפול תומך', url: 'internal_quiz_2', icon: '🫂', external: false }''')

train_excel_btn = '''
            ${currentUser.isAdmin ? '<div style="margin-bottom: 20px;"><button class="btn" onclick="exportTrainingsExcel()" style="background: var(--success);">ייצא דוח ביצוע הדרכות לאקסל 📥</button></div>' : ''}
'''
js = js.replace('''<p style="color: var(--text-secondary); margin-bottom: 20px;">מאגר הלומדות וההדרכות הקליניות עבור אנשי צוות וקליטת עובדים.</p>''', '''<p style="color: var(--text-secondary); margin-bottom: 20px;">מאגר הלומדות וההדרכות הקליניות עבור אנשי צוות וקליטת עובדים.</p>''' + train_excel_btn)

train_logic = '''
function exportTrainingsExcel() {
    let csvContent = "\\uFEFFשם הלומדה / הדרכה,שם המבצע,מחלקה,תאריך ביצוע\\n"; // BOM
    trainingsAnswersDb.forEach(ans => {
        let user = usersDb.find(u => u.name === ans.user) || { team: 'לא ידוע' };
        csvContent += `"${ans.title}","${ans.user}","${user.team}","${ans.date}"\\n`;
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "דוח_ביצוע_לומדות.csv");
    link.click();
}

function submitInternalQuiz(e, title) {
    e.preventDefault();
    trainingsAnswersDb.push({
        title: title,
        user: currentUser.name,
        date: new Date().toLocaleDateString('he-IL')
    });
    localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
    showToast('הלומדה הושלמה בהצלחה!', 'success');
    navigate('trainings');
}
'''
js = js + '\\n' + train_logic

open_training_logic = '''
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
'''
js = js.replace('''    if (url === 'mock_intro') {''', open_training_logic + '''    if (url === 'mock_intro') {''')

# 12. Settings - Manage Protocols
settings_protocols = '''
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
'''
js = js.replace('''<div class="card" style="margin-top: 20px;">\\n                <h3>ניהול מארזי הדרכות ולומדות</h3>''', settings_protocols + '''<div class="card" style="margin-top: 20px;">\\n                <h3>ניהול מארזי הדרכות ולומדות</h3>''')
js = js.replace('''<div class="card" style="margin-top: 20px;">
                <h3>ניהול מארזי הדרכות ולומדות</h3>''', settings_protocols + '''<div class="card" style="margin-top: 20px;">
                <h3>ניהול מארזי הדרכות ולומדות</h3>''')


settings_protocol_logic = '''
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
'''
js = js + '\\n' + settings_protocol_logic

with open('d:/antigravity/project/script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Patch applied successfully.")
