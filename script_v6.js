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
        if (!protocolsDb.find(p => p.link === 'frailty.html')) {
            protocolsDb.unshift({ id: Date.now() + 1, title: 'התמודדות עם שבריריות (Frailty)', link: 'frailty.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration.html')) {
            protocolsDb.unshift({ id: Date.now(), title: 'אספירציה וחנק בגריאטריה', link: 'aspiration.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration_training.html')) {
            protocolsDb.unshift({ id: Date.now() + 2, title: 'השתלמות מקצועית: מניעת אספירציה וחנק', link: 'aspiration_training.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration-infographic.png')) {
            protocolsDb.unshift({ id: Date.now() + 3, title: 'אינפוגרפיקה: מניעת אספירציה וחנק במערך הגריאטרי', link: 'aspiration-infographic.png' });
        }
        if (!protocolsDb.find(p => p.link === 'Claymation Explainer-saved.mp4')) {
            protocolsDb.unshift({ id: Date.now() + 4, title: 'סרטון הדרכה: מניעת אספירציה', link: 'Claymation Explainer-saved.mp4' });
        }
        if (!protocolsDb.find(p => p.link === 'pharmacological_risk.html')) {
            protocolsDb.unshift({ id: Date.now() + 5, title: 'ניהול סיכונים פרמקולוגיים באשפוז גריאטרי', link: 'pharmacological_risk.html' });
        }
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    } else {
        protocolsDb = [
            { id: Date.now() + 5, title: 'ניהול סיכונים פרמקולוגיים באשפוז גריאטרי', link: 'pharmacological_risk.html' },
            { id: Date.now() + 4, title: 'סרטון הדרכה: מניעת אספירציה', link: 'Claymation Explainer-saved.mp4' },
            { id: Date.now() + 3, title: 'אינפוגרפיקה: מניעת אספירציה וחנק במערך הגריאטרי', link: 'aspiration-infographic.png' },
            { id: Date.now() + 2, title: 'השתלמות מקצועית: מניעת אספירציה וחנק', link: 'aspiration_training.html' },
            { id: Date.now(), title: 'אספירציה וחנק בגריאטריה', link: 'aspiration.html' },
            { id: Date.now() + 1, title: 'התמודדות עם שבריריות (Frailty)', link: 'frailty.html' }
        ];
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    }
}
initProtocolsDb();

(function() {
    let t = localStorage.getItem('clinic_trainings');
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
        if (!pArr.find(x => x.link === 'pharmacological_risk.html')) {
            pArr.unshift({ id: Date.now() + 5, title: 'ניהול סיכונים פרמקולוגיים באשפוז גריאטרי', link: 'pharmacological_risk.html' });
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
        const storedSchema = localStorage.getItem('clinic_forms_schema');
        if (storedSchema) {
            formsSchema = JSON.parse(storedSchema);
        } else if (typeof formsSchemaData !== 'undefined') {
            formsSchema = formsSchemaData;
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
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    const matchedUser = usersDb.find(u => u.username === user && u.password === pass);

    if (matchedUser) {
        currentUser = matchedUser;
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

function navigate(viewName) {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`nav-${viewName}`)) {
        document.getElementById(`nav-${viewName}`).classList.add('active');
    }
    
    const contentArea = document.getElementById('content-area');
    if (viewName === 'intro') contentArea.innerHTML = renderIntro();
    else if (viewName === 'tip') contentArea.innerHTML = renderTip();
    else if (viewName === 'dashboard') contentArea.innerHTML = renderDashboard();
    else if (viewName === 'forms') contentArea.innerHTML = renderForms();
    else if (viewName === 'trainings') contentArea.innerHTML = renderTrainings();
    else if (viewName === 'procedures') contentArea.innerHTML = renderProcedures();
    else if (viewName === 'protocols') contentArea.innerHTML = renderProtocols();
    else if (viewName === 'agent') contentArea.innerHTML = renderAgent();
    else if (viewName === 'settings') contentArea.innerHTML = renderSettings();
    else contentArea.innerHTML = `<h2>${viewName}</h2>`;
}

function renderTip() {
    // Local database of weekly tips (acts as our local agent database)
    const localAgentDatabase = [
        {
            "protocols": "פורסמו דגשים חדשים למניעת פצעי לחץ. יש לבצע אומדן מקיף (כגון סולם נורטון) תוך 24 שעות ממועד הקבלה.",
            "trivia": "מהי השעה ביום בה מתרחשות רוב הנפילות במחלקות גריאטריות?\nתשובה: לרוב בשעות הבוקר המוקדמות, כאשר מטופלים קמים לשירותים לאחר שנת הלילה.",
            "tip": "השתמשו בתאורת לילה במסלול ההליכה לשירותים - זהו אמצעי פשוט המפחית משמעותית סיכון לנפילות.",
            "research": "מאמר ב-JAGS הדגים כי שימוש קבוע בכלבי טיפול מסייע בהפחתת תסמיני דיכאון בקרב דיירי דיור מוגן בשיעור של 15%."
        },
        {
            "protocols": "עודכנו הנחיות הטיפול בחולה נוטה למות: יש להקפיד על תיעוד רצון המטופל ומשפחתו בגיליון הסיעודי באופן סדיר ושקוף.",
            "trivia": "איזה ויטמין נחשב לקריטי במיוחד בשמירה על מסת שריר ומניעת סרקופניה בגיל המבוגר?\nתשובה: ויטמין D, בשילוב צריכת חלבון נאותה.",
            "tip": "וודאו זיהוי כפול של מטופל לפני מתן תרופה - לא מספיק לשאול לשמו, יש לבדוק את הצמיד והתאמתו לגיליון.",
            "research": "מחקר חדש מצא ששילוב של אימון התנגדות עם תוספת חלבון משפר משמעותית את המדדים הפיזיים בחולי שבריריות (Frailty)."
        },
        {
            "protocols": "הנחיות תזונה חדשות: יש להקפיד על מתן תוספי תזונה עשירי חלבון תוך 48 שעות מקבלה למטופלים בסיכון תזונתי.",
            "trivia": "מהו הגיל הממוצע של תחילת הופעת סרקופניה (דלדול שריר) באוכלוסייה?\nתשובה: התהליך מתחיל כבר סביב גיל 40-50 ומואץ לאחר גיל 65.",
            "tip": "בביצוע הדרכה למטופל, בקשו ממנו לחזור על ההסבר (Teach-Back) כדי לוודא הבנה מלאה של ההנחיות.",
            "research": "סקירת קוקרן עדכנית ממליצה על ביצוע הערכה גריאטרית כוללנית (CGA) לכל מטופל מעל גיל 65 המאושפז באשפוז חריף."
        }
    ];

    // Simulate an agent processing local data based on the current week
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeek = Math.floor(diff / (oneDay * 7));
    
    // Select a tip cyclically based on the current week number
    const selectedData = localAgentDatabase[currentWeek % localAgentDatabase.length];
    
    // Format today's date in Hebrew
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('he-IL', options);

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">✨ טיפ השבוע מהסוכן המקומי</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">תוכן זה נבחר אחת לשבוע באופן אוטומטי מתוך מאגר הנתונים המקומי של המערכת (ללא צורך בחיבור חיצוני).</p>
            <div id="tip-container">
                <div class="card" style="margin-bottom: 20px; border-left: 4px solid var(--primary-color);">
                    <h3 style="color: var(--primary-color);">📅 עדכון אחרון: ${dateStr}</h3>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #10b981;">
                    <h3>📋 נהלי משרד הבריאות</h3>
                    <p style="white-space: pre-wrap;">${selectedData.protocols}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #f59e0b;">
                    <h3>🎯 שאלת טריוויה</h3>
                    <p style="white-space: pre-wrap;">${selectedData.trivia}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #3b82f6;">
                    <h3>💡 טיפ שבועי (בטיחות הטיפול)</h3>
                    <p style="white-space: pre-wrap;">${selectedData.tip}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #8b5cf6;">
                    <h3>📚 מאמר מחקרי חדש</h3>
                    <p style="white-space: pre-wrap;">${selectedData.research}</p>
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
                    
                    let linkHtml = p.link.startsWith('http') ? 
                        '<a href="' + p.link + '" target="_blank" style="color: var(--primary-color); display: inline-block; margin-bottom: 15px;">צפה במסמך / בנוהל המלא ↗</a>' : 
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
    localStorage.setItem('clinic_forms_schema', JSON.stringify(formsSchema));
    
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

function renderProtocols() {
    let html = `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">טפסים ופרוטוקולים טיפוליים</h2>
            <div class="forms-list">
                ${protocolsDb.map(p => `
                    <div class="card" style="margin-bottom: 15px;">
                        <h3 style="margin-bottom: 10px;">${p.title}</h3>
                        ${p.link.startsWith('http') || p.link.match(/\.(html|png|jpg|jpeg|mp4)$/i) ? `<a href="${p.link}" target="_blank" style="color: var(--primary-color);">צפה במסמך / תמונה / סרטון ↗</a>` : `<p>${p.link}</p>`}
                    </div>
                `).join('')}
                ${protocolsDb.length === 0 ? '<p>לא הוגדרו פרוטוקולים במערכת.</p>' : ''}
            </div>
        </div>
    `;
    return html;
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








