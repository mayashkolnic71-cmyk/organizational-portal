const quizzesData = {
    'supportive_care': {
        title: {
            he: 'מארז לטיפול תומך - מבחן ידע',
            en: 'Supportive Care Package - Knowledge Test',
            ar: 'رزمة الرعاية الداعمة - اختبار المعرفة',
            ru: 'Пакет поддерживающей терапии - Проверка знаний'
        },
        videos: [
            'https://www.youtube.com/embed/IB5irFCuPxs',
            'https://www.youtube.com/embed/l17BmQmFA5E'
        ],
        questions: [
            {
                q: {
                    he: 'מה מחויב הצוות לעשות בעת קבלת חולה נוטה למות למחלקה?',
                    en: 'What is the team obligated to do upon receiving a dying patient to the department?',
                    ar: 'ما الذي يتعين على الفريق القيام به عند استقبال مريض يحتضر في القسم؟',
                    ru: 'Что обязана сделать команда при поступлении умирающего пациента в отделение?'
                },
                options: [
                    { text: { he: 'לברר האם יש למטופל הנחיות רפואיות מקדימות או ייפוי כוח', en: 'Check for advance medical directives or power of attorney', ar: 'التحقق من وجود توجيهات طبية مسبقة أو توكيل رسمي', ru: 'Проверить наличие предварительных медицинских указаний или доверенности' }, correct: true },
                    { text: { he: 'להתחיל מיד בהחייאה מבלי לבדוק', en: 'Start CPR immediately without checking', ar: 'البدء بالإنعاش القلبي الرئوي على الفور دون التحقق', ru: 'Немедленно начать СЛР без проверки' }, correct: false }
                ]
            },
            {
                q: {
                    he: 'איזה תפקיד יש למערך הטיפול התומך בארגון?',
                    en: 'What is the role of the supportive care system in the organization?',
                    ar: 'ما هو دور نظام الرعاية الداعمة في المنظمة؟',
                    ru: 'Какова роль системы поддерживающей терапии в организации?'
                },
                options: [
                    { text: { he: 'מתן טיפול מרפא לכלל המחלות', en: 'Providing curative treatment for all diseases', ar: 'توفير العلاج الشافي لجميع الأمراض', ru: 'Предоставление лечебной терапии от всех болезней' }, correct: false },
                    { text: { he: 'הקלת סבל ושיפור איכות חיי המטופל ומשפחתו', en: 'Relieving suffering and improving quality of life', ar: 'تخفيف المعاناة وتحسين نوعية الحياة', ru: 'Облегчение страданий и улучшение качества жизни' }, correct: true }
                ]
            }
        ]
    },
    'infections': {
        title: {
            he: 'מארז מניעת זיהומים - מבחן ידע',
            en: 'Infection Prevention Package - Knowledge Test',
            ar: 'رزمة الوقاية من العدوى - اختبار المعرفة',
            ru: 'Пакет профилактики инфекций - Проверка знаний'
        },
        videos: [
            'https://www.youtube.com/embed/RY5wXbPCY-o',
            'https://www.youtube.com/embed/LjHnCvv48hA',
            'https://www.youtube.com/embed/sOR40jML8IA'
        ],
        links: [
            {
                url: 'https://www.gov.il/files/health/moh-files/Infection-prevention/story.html',
                text: {
                    he: 'לחץ כאן למעבר ללומדת סימולציה אינטראקטיבית (משרד הבריאות)',
                    en: 'Click here for the interactive simulation (Ministry of Health)',
                    ar: 'انقر هنا لمحاكاة تفاعلية (وزارة الصحة)',
                    ru: 'Нажмите здесь для интерактивной симуляции (Министерство здравоохранения)'
                }
            }
        ],
        questions: [
            {
                q: {
                    he: 'מה ריכוז הכלור הנידרש לניקיון יום יומי של חדר מטופל?',
                    en: 'What is the required chlorine concentration for daily cleaning of a patient room?',
                    ar: 'ما هو تركيز الكلور المطلوب للتنظيف اليومي لغرفة المريض؟',
                    ru: 'Какова требуемая концентрация хлора для ежедневной уборки палаты пациента?'
                },
                options: [
                    { text: { he: '1000 ppm', en: '1000 ppm', ar: '1000 ppm', ru: '1000 ppm' }, correct: true },
                    { text: { he: '100 ppm', en: '100 ppm', ar: '100 ppm', ru: '100 ppm' }, correct: false },
                    { text: { he: '5000 ppm', en: '5000 ppm', ar: '5000 ppm', ru: '5000 ppm' }, correct: false }
                ]
            },
            {
                q: {
                    he: 'מה החשיבות של ניקיון וחיטוי סביבתי במוסד רפואי?',
                    en: 'What is the importance of environmental cleaning and disinfection in a medical institution?',
                    ar: 'ما هي أهمية التنظيف والتطهير البيئي في مؤسسة طبية؟',
                    ru: 'В чем важность экологической уборки и дезинфекции в медицинском учреждении?'
                },
                options: [
                    { text: { he: 'מניעת העברת זיהומים ממטופל למטופל על ידי משטחים', en: 'Preventing cross-infection between patients via surfaces', ar: 'منع انتقال العدوى بين المرضى عبر الأسطح', ru: 'Предотвращение передачи инфекций между пациентами через поверхности' }, correct: true },
                    { text: { he: 'רק לצורך אסתטיקה וריח טוב', en: 'Only for aesthetics and good smell', ar: 'فقط للجماليات والرائحة الطيبة', ru: 'Только для эстетики и хорошего запаха' }, correct: false }
                ]
            },
            {
                q: {
                    he: 'מהו השיקול המרכזי בקביעת סוג הבידוד למטופל על פי נוהל מחוללים רבי־עמידות?',
                    en: 'What is the main consideration in determining the type of isolation according to the multi-resistant organisms procedure?',
                    ar: 'ما هو الاعتبار الرئيسي في تحديد نوع العزل وفقًا لإجراء الكائنات الحية المقاومة المتعددة؟',
                    ru: 'Что является главным соображением при определении типа изоляции в соответствии с процедурой для полирезистентных организмов?'
                },
                options: [
                    { text: { he: 'העדפת הצוות המטפל', en: 'Preference of the medical staff', ar: 'تفضيل الطاقم الطبي', ru: 'Предпочтение медицинского персонала' }, correct: false },
                    { text: { he: 'סוג החיידק ודרכי העברתו (מגע, טיפתי, אוויר)', en: 'Type of bacteria and mode of transmission (contact, droplet, airborne)', ar: 'نوع البكتيريا وطريقة الانتقال (تلامس، قطيرات، هواء)', ru: 'Тип бактерии и путь передачи (контактный, капельный, воздушный)' }, correct: true }
                ]
            },
            {
                q: {
                    he: 'מי מוסמך להחליט על הפעלת בידוד למטופל?',
                    en: 'Who is authorized to decide on initiating isolation for a patient?',
                    ar: 'من المخول باتخاذ قرار بدء عزل المريض؟',
                    ru: 'Кто уполномочен принимать решение об изоляции пациента?'
                },
                options: [
                    { text: { he: 'כל איש צוות', en: 'Any staff member', ar: 'أي عضو في الطاقم', ru: 'Любой сотрудник' }, correct: false },
                    { text: { he: 'רופא מטפל או אחות למניעת זיהומים', en: 'Attending physician or infection prevention nurse', ar: 'الطبيب المعالج أو ممرضة مكافحة العدوى', ru: 'Лечащий врач или медсестра по инфекционному контролю' }, correct: true }
                ]
            }
        ]
    }
};

window.renderNativeQuiz = function(quizId, containerId, lang = 'he') {
    const quiz = quizzesData[quizId];
    if (!quiz) return;
    
    let html = `
        <div class="card fade-in native-quiz-container" dir="${lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr'}">
            <div style="display:flex; justify-content: space-between; margin-bottom: 20px;">
                <h2 style="margin:0;">${quiz.title[lang]}</h2>
                <select id="quizLangSelector" onchange="window.renderNativeQuiz('${quizId}', '${containerId}', this.value)" style="padding: 5px; border-radius: 4px;">
                    <option value="he" ${lang === 'he' ? 'selected' : ''}>עברית</option>
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                    <option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية</option>
                    <option value="ru" ${lang === 'ru' ? 'selected' : ''}>Русский</option>
                </select>
            </div>
    `;

    // Render Videos
    if (quiz.videos && quiz.videos.length > 0) {
        html += `<div class="quiz-videos" style="margin-bottom: 25px; display: grid; gap: 15px;">`;
        quiz.videos.forEach(v => {
            html += `
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
                    <iframe src="${v}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Render Links
    if (quiz.links && quiz.links.length > 0) {
        html += `<div class="quiz-links" style="margin-bottom: 25px;">`;
        quiz.links.forEach(l => {
            html += `
                <a href="${l.url}" target="_blank" style="display: block; padding: 15px; background: #e3f2fd; color: #1976d2; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; margin-bottom: 10px;">
                    ${l.text[lang]}
                </a>
            `;
        });
        html += `</div>`;
    }

    html += `
            <form id="nativeQuizForm" onsubmit="window.submitNativeQuiz(event, '${quizId}', '${quiz.title.he}')">
    `;
    
    quiz.questions.forEach((q, idx) => {
        html += `
            <div class="form-group" style="margin-bottom: 25px; padding: 15px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
                <label style="font-weight: bold; margin-bottom: 10px; display: block; font-size: 1.1em;">${idx + 1}. ${q.q[lang]}</label>
        `;
        q.options.forEach((opt, optIdx) => {
            html += `
                <div style="margin-bottom: 10px;">
                    <label style="display: flex; align-items: center; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;">
                        <input type="radio" name="q${idx}" value="${opt.correct}" required style="margin: 0 10px;">
                        <span>${opt.text[lang]}</span>
                    </label>
                </div>
            `;
        });
        html += `</div>`;
    });

    const submitBtnText = {
        he: 'סיום ושליחה',
        en: 'Submit Quiz',
        ar: 'إرسال الاختبار',
        ru: 'Отправить'
    };

    html += `
                <button type="submit" class="btn" style="width: 100%; padding: 15px; font-size: 1.1em; background: var(--primary-color, #2a9d8f); color: white; border: none; border-radius: 8px; cursor: pointer; transition: background 0.3s;">
                    ${submitBtnText[lang]}
                </button>
            </form>
            <div id="quizError" style="color: #d32f2f; background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 15px; display: none; font-weight: bold; text-align: center;"></div>
        </div>
    `;
    
    document.getElementById(containerId).innerHTML = html;
};

window.submitNativeQuiz = function(e, quizId, titleHe) {
    e.preventDefault();
    const form = e.target;
    let allCorrect = true;
    
    const quiz = quizzesData[quizId];
    quiz.questions.forEach((q, idx) => {
        const selected = form.querySelector(`input[name="q${idx}"]:checked`);
        if (!selected || selected.value !== 'true') {
            allCorrect = false;
        }
    });

    if (!allCorrect) {
        const errDiv = document.getElementById('quizError');
        errDiv.innerHTML = '⚠️ יש לך שגיאות בחלק מהתשובות. אנא תקן ונסה שוב.<br><small>(You have incorrect answers. Please correct and try again.)</small>';
        errDiv.style.display = 'block';
        return;
    }

    if (window.trainingsAnswersDb) {
        window.trainingsAnswersDb.push({
            title: titleHe, // We save the Hebrew title so it matches the DB strings in Excel
            user: window.currentUser ? window.currentUser.name : 'Unknown',
            date: new Date().toLocaleString('he-IL')
        });
        localStorage.setItem('clinic_trainings_answers', JSON.stringify(window.trainingsAnswersDb));
        if (window.showToast) window.showToast('הלומדה הושלמה בהצלחה!', 'success');
        if (window.navigate) window.navigate('trainings');
    }
};
