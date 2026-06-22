// quizzes.js
// Centralized multi-lingual quiz data mapped to Google Forms
const quizzesData = {
    'infections': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/formResponse',
        title: {
            he: '(ינואר 2026) מארז הדרכה למניעת זיהומים<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">עובד יקר , ברכות להצטרפות לצוות העובדים , בהצלחה !<br>להלן רשימת הדרכות החובה שעליך לעבור כחלק מתהליך קליטתך לעבודה בחודש הראשון ובהמשך כל עובד יבצע אחת לשנה . משך ההדרכה כ- 3 שעות .</span>',
            en: '(January 2026) Infection Prevention Training<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">Dear employee , welcome to the staff , good luck!<br>Below is a list of mandatory trainings that you are required to complete as part of your onboarding process during your first month of employment. Thereafter, each employee is required to complete these trainings once a year. The total duration of the training is approximately 3 hours.</span>',
            ar: '(يناير 2026) حزمة مكافحة العدوى',
            ru: '(Январь 2026) Пакет по профилактике инфекций'
        },
            {
                type: 'video',
                id: 'RY5wXbPCY-o',
                title: { he: '1. רקע המיועד לכלל אנשי הצוות -היגיינת ידיים היא האחריות של כולנו !', en: '1. Background for all staff - Hand hygiene is everyone\'s responsibility!', ar: '1. خلفية لجميع الموظفين - نظافة اليدين مسؤولية الجميع!', ru: '1. Информация для всего персонала - Гигиена рук - ответственность каждого!' },
                desc: { he: '(חצי דקה)', en: '(half a minute)', ar: '(نصف دقيقة)', ru: '(полминуты)' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/files/health/moh-files/Infection-prevention/story.html',
                title: { he: '2. הכנס לקישור המיועד לאחיות/רופאים ומקצועות הבריאות - קישור ללומדת משרד הבריאות להיגיינת ידיים', en: '2. Link for nurses/doctors and health professions - Ministry of Health module for hand hygiene', ar: '2. رابط للممرضين/الأطباء والمهن الصحية - وحدة وزارة الصحة لنظافة اليدين', ru: '2. Ссылка для медсестер/врачей и медицинских профессий - модуль Минздрава по гигиене рук' },
                linkText: { he: 'קישור ללומדת משרד הבריאות (חצי שעה- שעה)', en: 'Link to Ministry of Health module (half an hour - an hour)', ar: 'رابط لوحدة وزارة الصحة (نصف ساعة - ساعة)', ru: 'Ссылка на модуль Минздрава (полчаса - час)' },
                desc: { he: 'נא להיכנס לקישור ולבצע את הלומדה !', en: 'Please enter the link and complete the module!', ar: 'يرجى الدخول إلى الرابط وإكمال الوحدة!', ru: 'Пожалуйста, перейдите по ссылке и пройдите модуль!' }
            },
            {
                type: 'video',
                id: 'LjHnCvv48hA',
                title: { he: '3. סרטון רקע המיועד לכלל אנשי הצוות - מניעת הפצת מזהמים !', en: '3. Background video for all staff - Preventing the spread of infections!', ar: '3. فيديو تعريفي لجميع الموظفين - منع انتشار العدوى!', ru: '3. Вводное видео для всего персонала - Предотвращение распространения инфекций!' },
                desc: { he: '(1.5 דקות)', en: '(1.5 mins)', ar: '(1.5 دقيقة)', ru: '(1.5 мин)' }
            },
            {
                type: 'video',
                id: 'sOR40jML8IA',
                title: { he: '4. סרטון התמגנות והסרת מיגון המיועד לכלל אנשי הצוות !', en: '4. Donning and doffing PPE video for all staff!', ar: '4. فيديو ارتداء وخلع معدات الوقاية لجميع الموظفين!', ru: '4. Видео по надеванию и снятию СИЗ для всего персонала!' },
                desc: { he: '(2 דקות)', en: '(2 mins)', ar: '(دقيقتان)', ru: '(2 мин)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1QV7mt8nqzlvq8LgLG5_AEnz-6wkyLq8l',
                title: { he: '5. הדרכה זו מיועדת : לכוח עזר .', en: '5. This training is for: Nursing Assistants.', ar: '5. هذا التدريب مخصص: لمساعدي التمريض.', ru: '5. Это обучение для: Помощников медсестер.' },
                linkText: { he: 'קישור לסרטון הדרכה לניקיון יומי בחדרי בידוד לכוחות עזר (3 דקות)', en: 'Link to daily cleaning in isolation rooms video (3 mins)', ar: 'رابط لفيديو التنظيف اليومي في غرف العزل (3 دقائق)', ru: 'Ссылка на видео по ежедневной уборке в изоляторах (3 мин)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1vveMbozJT_iUxFtmYf04XSazQgspg5cK',
                title: { he: '5א. הדרכה זו מיועדת : לכוח עזר .', en: '5a. This training is for: Nursing Assistants.', ar: '5أ. هذا التدريب مخصص: لمساعدي التمريض.', ru: '5а. Это обучение для: Помощников медсестер.' },
                linkText: { he: 'קישור הדרכה לניקיון טרמינלי בחדרי בידוד לכוחות עזר (1 דקות)', en: 'Terminal cleaning in isolation rooms video (1 min)', ar: 'فيديو التنظيف النهائي في غرف العزل (1 دقيقة)', ru: 'Видео по заключительной уборке в изоляторах (1 мин)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/1Vq5LIi42UsMAUdfFhQ3elY9l9g1rDaCI/view?usp=drive_link',
                title: { he: '6. הדרכה זו מיועדת : לצוות רפואי, אחיות, ומקצועות הבריאות . להלן קישור לסרטון בשפה העברית ואנגלית. : (30 דקות)', en: '6. This training is for: Medical staff, nurses, and allied health professionals. Below are links for Hebrew and English videos: (30 mins)', ar: '6. هذا التدريب مخصص: للطاقم الطبي، والممرضين، والمهن الصحية. فيما يلي روابط فيديو باللغتين العبرية والإنجليزية: (30 دقيقة)', ru: '6. Это обучение для: Медицинского персонала, медсестер и смежных профессий. Ниже приведены ссылки на видео на иврите и английском: (30 мин)' },
                linkText: { he: '1. קישור בעברית: מצגת למניעת זיהומים צולבים בבית הדר בשפה העברית .mp4', en: '1. Hebrew link: Presentation on preventing cross-infections at Hadar House in Hebrew .mp4', ar: '1. الرابط العبري: عرض تقديمي حول منع انتقال العدوى المتقاطعة في بيت هدار باللغة العبرية .mp4', ru: '1. Ссылка на иврите: Презентация по предотвращению перекрестных инфекций в Бейт Хадар на иврите .mp4' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/1li5zEhP7r5QUFzhdJZ4CZGFYVE0I21dB/view?usp=drive_link',
                title: { he: '', en: '', ar: '', ru: '' },
                linkText: { he: '2. קישור באנגלית: מצגת למניעת זיהומים צולבים בבית הדר בשפה אנגלית .mp4', en: '2. English link: Presentation on preventing cross-infections at Hadar House in English .mp4', ar: '2. الرابط الإنجليزي: عرض تقديمي حول منع انتقال العدوى المتقاطعة في بيت هدار باللغة الإنجليزية .mp4', ru: '2. Ссылка на английском: Презентация по предотвращению перекрестных инфекций в Бейт Хадар на английском .mp4' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/1I_ytPYopTivbkf3k9I2AFOWrnAVqWf3V/view?usp=drive_link',
                title: { he: '7. קישור - הנחיות מסוכמות למניעת זיהומים לפי סוגי המזהמים.pdf', en: '7. Link - Summary guidelines for preventing infections by type of pathogen.pdf', ar: '7. رابط - إرشادات ملخصة لمنع العدوى حسب نوع الممرض.pdf', ru: '7. Ссылка - Сводные рекомендации по профилактике инфекций в зависимости от типа возбудителя.pdf' },
                linkText: { he: 'הנחיות מסוכמות למניעת זיהומים לפי סוגי המזהמים.pdf', en: 'Summary guidelines for preventing infections by type of pathogen.pdf', ar: 'إرشادات ملخصة لمنع العدوى حسب نوع الممرض.pdf', ru: 'Сводные рекомендации по профилактике инфекций в зависимости от типа возбудителя.pdf' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/1yT5BnQOfYh92uPIHjkJJPcszM97DJz9s/view?usp=sharing',
                title: { he: '8. קישור למצגת וסרטוני הדרכה לשימוש נאמני נושא:', en: '8. Link to presentation and training videos for designated topic champions:', ar: '8. رابط لعرض تقديمي وفيديوهات تدريبية للأشخاص المسؤولين عن الموضوع:', ru: '8. Ссылка на презентацию и обучающие видео для назначенных ответственных:' },
                linkText: { he: '1. מצגת בנושא מניעת זיהומים בגריאטריה : הנחיות לניקוי וחיטוי לשימוש נאמני נושא', en: '1. Presentation on preventing infections in geriatrics: Cleaning and disinfection guidelines for designated champions', ar: '1. عرض تقديمي حول منع العدوى في طب الشيخوخة: إرشادات التنظيف والتطهير للأشخاص المسؤولين عن الموضوع', ru: '1. Презентация по профилактике инфекций в гериатрии: Рекомендации по уборке и дезинфекции для ответственных лиц' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/18zxS04ValU2RNDKOWCh0m2qnNqoVnAEm/view?usp=drive_link',
                title: { he: '', en: '', ar: '', ru: '' },
                linkText: { he: '2. סרטון מדובב להדרכת צוות בנושא מניעת זיהומים', en: '2. Dubbed video for staff training on infection prevention', ar: '2. فيديو مدبلج لتدريب الموظفين على منع العدوى', ru: '2. Дублированное видео для обучения персонала по профилактике инфекций' }
            }
        ],
        fields: [
            { id: 'entry.date_placeholder', type: 'date', label: { he: 'תאריך כניסה ללומדה', en: 'Date of Entry', ar: 'تاريخ الدخول', ru: 'Дата входа' } },
            { id: 'entry.time_placeholder', type: 'time', label: { he: 'שעה', en: 'Time', ar: 'الوقت', ru: 'Время' } },
            { id: 'entry.2128698376', type: 'text', label: { he: 'שם מלא', en: 'Full Name', ar: 'الاسم الكامل', ru: 'Полное имя' } },
            { id: 'entry.482346055', type: 'select', label: { he: 'מחלקה', en: 'Department', ar: 'القسم', ru: 'Отделение' }, options: [
                { val: 'שיקום א', label: { he: 'שיקום א', en: 'Rehab A', ar: 'تأهيل أ', ru: 'Реабилитация А' } },
                { val: 'שיקום ב', label: { he: 'שיקום ב', en: 'Rehab B', ar: 'تأهيل ب', ru: 'Реабилитация Б' } },
                { val: 'סיעוד מורכב א\'', label: { he: 'סיעוד מורכב א\'', en: 'Complex Nursing A', ar: 'تمريض مركب أ', ru: 'Комплексный уход А' } },
                { val: 'סיעוד מורכב ב\'', label: { he: 'סיעוד מורכב ב\'', en: 'Complex Nursing B', ar: 'تمريض مركب ب', ru: 'Комплексный уход Б' } },
                { val: 'סיעוד מורכב ג\'', label: { he: 'סיעוד מורכב ג\'', en: 'Complex Nursing C', ar: 'تمريض مركب ج', ru: 'Комплексный уход В' } },
                { val: 'מונשמים א', label: { he: 'מונשמים א', en: 'Ventilated A', ar: 'تنفس اصطناعي أ', ru: 'Вентиляция А' } },
                { val: 'מונשמים ב', label: { he: 'מונשמים ב', en: 'Ventilated B', ar: 'تنفس اصطناعي ب', ru: 'Вентиляция Б' } },
                { val: 'מונשמים ג', label: { he: 'מונשמים ג', en: 'Ventilated C', ar: 'تنفس اصطناعي ج', ru: 'Вентиляция В' } }
            ] }
        ]
    },
    'supportive_care': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/formResponse',
        title: {
            he: 'מארז הדרכה לצוות המטפל ליישום חוק החולה הנוטה למות והעדפות טיפוליות לסוף החיים 2026.<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">עובד יקר, ברכות להצטרפות לצוות העובדים , בהצלחה !<br>להלן רשימת הדרכות החובה שעליך לעבור כחלק מתהליך קליטתך לעבודה בחודש הראשון ובהמשך כל עובד יבצע אחת לשנה . משך ההדרכה כ- 3 שעות .</span>',
            en: 'Training package for the treatment team on the dying patient law and end-of-life care preferences 2026.<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">Dear employee, welcome to the staff, good luck!<br>Below is a list of mandatory trainings that you are required to complete as part of your onboarding process during your first month of employment. Thereafter, each employee is required to complete these trainings once a year. The total duration of the training is approximately 3 hours.</span>',
            ar: 'حزمة تدريب لفريق العلاج لتطبيق قانون المريض المحتضر وتفضيلات الرعاية في نهاية الحياة 2026.',
            ru: 'Обучающий пакет для лечащего персонала по применению закона об умирающих пациентах 2026.'
        },
        contentItems: [
            {
                type: 'link',
                url: 'https://www.gov.il/files/Health/dying_patient_law/story_html5.html',
                title: { he: 'קישור ללומדת משרד הבריאות: סוף מעשה במחשבה תחילה - העדפות טיפול בסוף החיים', en: 'Link to Ministry of Health module: End-of-life care preferences', ar: 'رابط لوحدة وزارة الصحة: تفضيلات الرعاية في نهاية الحياة', ru: 'Ссылка на модуль Минздрава: Предпочтения по уходу в конце жизни' },
                desc: { he: 'כניסה לקישור ללמידה עצמית. (משך זמן כ- 60 דקות )', en: 'Self-learning link. (Duration ~60 mins)', ar: 'رابط التعلم الذاتي. (المدة ~60 دقيقة)', ru: 'Ссылка для самообучения. (Продолжительность ~60 мин)' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/files/health/dying_patient_request/story_html5.html',
                title: { he: 'קישור ללומדת חולה נוטה למות', en: 'Link to terminally ill patient module', ar: 'رابط لوحدة المريض المحتضر', ru: 'Ссылка на модуль о терминальных больных' },
                desc: { he: 'כניסה לקישור ללמידה עצמית. (משך זמן כ- 60 דקות )', en: 'Self-learning link. (Duration ~60 mins)', ar: 'رابط التعلم الذاتي. (المدة ~60 دقيقة)', ru: 'Ссылка для самообучения. (Продолжительность ~60 мин)' }
            },
            {
                type: 'video',
                id: 'IB5irFCuPxs',
                title: { he: 'סרטון הסברה: כבר כתבתם? הנחיות רפואיות מקדימות', en: 'Explanatory video: Advance medical directives', ar: 'فيديو توضيحي: التوجيهات الطبية المسبقة', ru: 'Пояснительное видео: Предварительные медицинские указания' },
                desc: { he: 'צפייה 2 דקות', en: 'Watch 2 mins', ar: 'مشاهدة دقيقتان', ru: 'Смотреть 2 мин' }
            },
            {
                type: 'link',
                url: 'https://me.health.gov.il/older-adult/services-rights/before-saying-goodbye/advance-medical-directives/?source=5273',
                title: { he: 'מילוי מסמכים: כל אחד ואחת יכולים להיערך מראש למצב של אובדן כשירות בסוף החיים. חוק החולה הנוטה למות מאפשר לכל אחד ואחת לתת הנחיות רפואיות מקדימות או למנות מיופה כוח במקרה שבו יוגדרו על ידי רופא אחראי כחולה נוטה למות.', en: 'Document filling: Advance directives and power of attorney under the dying patient law.', ar: 'تعبئة المستندات: التوجيهات المسبقة والتوكيل بموجب قانون المريض المحتضر.', ru: 'Заполнение документов: Предварительные указания и доверенность по закону об умирающих пациентах.' },
                linkText: { he: 'קישור לסרטון: מילוי טופס הנחיות מקדימות', en: 'Video link: Filling out advance directives', ar: 'رابط الفيديو: تعبئة نموذج التوجيهات المسبقة', ru: 'Ссылка на видео: Заполнение предварительных указаний' },
                desc: { he: 'קריאה וצפייה בסרטון כ- 10 דקות', en: 'Reading and watching ~10 mins', ar: 'قراءة ومشاهدة ~10 دقائق', ru: 'Чтение и просмотр ~10 мин' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/he/service/dying-patient-request',
                title: { he: 'הגשת מסמכים: שירות זה הוא ייחודי ומאפשר לכל המעוניינים למלא טפסים עם הנחיות רפואיות מקדימות או מינוי מיופה כוח, למצב עתידי בו ייקבע כי הם חולים במחלה חשוכת מרפא (ללא אפשרות להחלמה). כל זאת, כדי להימנע מהארכת הסבל במצב שבו לא יוכלו להביע את רצונם.', en: 'Submitting documents: Advance medical directives and power of attorney to avoid prolonged suffering.', ar: 'تقديم المستندات: التوجيهات الطبية المسبقة والتوكيل لتجنب إطالة المعاناة.', ru: 'Подача документов: Предварительные медицинские указания и доверенность для избежания продления страданий.' },
                linkText: { he: 'קישור להנחיות רפואיות מקדימות ויפוי כוח.', en: 'Link to advance medical directives and power of attorney.', ar: 'رابط للتوجيهات الطبية المسبقة والتوكيل.', ru: 'Ссылка на предварительные медицинские указания и доверенность.' },
                desc: { he: 'קריאה כ- 10 דקות', en: 'Reading ~10 mins', ar: 'قراءة ~10 دقائق', ru: 'Чтение ~10 мин' }
            },
            {
                type: 'video',
                id: 'l17BmQmFA5E',
                title: { he: 'קישור לסרטון הסברה על יפוי כוח מתמשך', en: 'Link to explanatory video on lasting power of attorney', ar: 'رابط لفيديو توضيحي حول التوكيل المستمر', ru: 'Ссылка на пояснительное видео о долгосрочной доверенности' },
                desc: { he: 'צפייה כ- 4 דקות', en: 'Watch ~4 mins', ar: 'مشاهدة ~4 دقائق', ru: 'Смотреть ~4 мин' }
            }
        ],
        fields: [
            { id: 'entry.date_placeholder', type: 'date', label: { he: 'תאריך כניסה ללומדה', en: 'Date of Entry', ar: 'تاريخ الدخول', ru: 'Дата входа' } },
            { id: 'entry.2128698376', type: 'text', label: { he: 'שם מלא', en: 'Full Name', ar: 'الاسم الكامل', ru: 'Полное имя' } },
            { id: 'entry.482346055', type: 'select', label: { he: 'מחלקה', en: 'Department', ar: 'القسم', ru: 'Отделение' }, options: [
                { val: 'שיקום א', label: { he: 'שיקום א', en: 'Rehab A', ar: 'تأهيل أ', ru: 'Реабилитация А' } },
                { val: 'שיקום ב', label: { he: 'שיקום ב', en: 'Rehab B', ar: 'تأهيل ب', ru: 'Реабилитация Б' } },
                { val: 'סיעוד מורכב א\'', label: { he: 'סיעוד מורכב א\'', en: 'Complex Nursing A', ar: 'تمريض مركب أ', ru: 'Комплексный уход А' } },
                { val: 'סיעוד מורכב ב\'', label: { he: 'סיעוד מורכב ב\'', en: 'Complex Nursing B', ar: 'تمريض مركب ب', ru: 'Комплексный уход Б' } },
                { val: 'סיעוד מורכב ג\'', label: { he: 'סיעוד מורכב ג\'', en: 'Complex Nursing C', ar: 'تمريض مركب ج', ru: 'Комплексный уход В' } },
                { val: 'מונשמים א', label: { he: 'מונשמים א', en: 'Ventilated A', ar: 'تنفس اصطناعي أ', ru: 'Вентиляция А' } },
                { val: 'מונשמים ב', label: { he: 'מונשמים ב', en: 'Ventilated B', ar: 'تنفس اصطناعي ب', ru: 'Вентиляция Б' } },
                { val: 'מונשמים ג', label: { he: 'מונשמים ג', en: 'Ventilated C', ar: 'تنفس اصطناعي ج', ru: 'Вентиляция В' } }
            ] },
            { id: 'entry.1264765965', type: 'radio', label: { he: 'שאלה 1: מהי מטרתו המרכזית של הטיפול התומך/הפליאטיבי?', en: 'Question 1: What is the main goal of supportive/palliative care?', ar: 'السؤال 1: ما هو الهدف الرئيسي للرعاية الداعمة/الملطفة؟', ru: 'Вопрос 1: Какова основная цель поддерживающей/паллиативной терапии?' }, options: [
                { val: 'להאריך את תוחלת החיים באמצעות טיפולים מאריכי חיים בלבד', label: { he: 'להאריך את תוחלת החיים באמצעות טיפולים מאריכי חיים בלבד', en: 'Prolong life expectancy through life-prolonging treatments only', ar: 'إطالة متوسط العمر المتوقع من خلال العلاجات المطيلة للحياة فقط', ru: 'Продление продолжительности жизни только с помощью продлевающих жизнь методов лечения' } },
                { val: 'לשפר את איכות החיים של המטופל ובני משפחתו באמצעות הקלה על סבל וסימפטומים', label: { he: 'לשפר את איכות החיים של המטופל ובני משפחתו באמצעות הקלה על סבל וסימפטומים', en: 'Improve the quality of life for the patient and their family by relieving suffering', ar: 'تحسين جودة حياة المريض وأسرته عن طريق تخفيف المعاناة والأعراض', ru: 'Улучшение качества жизни пациента и его семьи за счет облегчения страданий и симптомов' } },
                { val: 'למנוע אשפוזים חוזרים במחלקות פנימיות', label: { he: 'למנוע אשפוזים חוזרים במחלקות פנימיות', en: 'Prevent readmissions to internal medicine departments', ar: 'منع إعادة الإدخال المتكرر إلى أقسام الطب الباطني', ru: 'Предотвращение повторных госпитализаций в терапевтические отделения' } },
                { val: 'להחליף את הטיפול הרפואי השגרתי בטיפול סיעודי', label: { he: 'להחליף את הטיפול הרפואי השגרתי בטיפול סיעודי', en: 'Replace routine medical care with nursing care', ar: 'استبدال الرعاية الطبية الروتينية بالرعاية التمريضية', ru: 'Замена рутинного медицинского ухода на сестринский уход' } }
            ] },
            { id: 'entry.1661314556', type: 'radio', label: { he: 'שאלה 2: מי מוסמך לקבוע כי מטופל מוגדר כ"חולה נוטה למות" או "חולה בשלב סופי"?', en: 'Question 2: Who is authorized to determine that a patient is defined as "terminally ill"?', ar: 'السؤال 2: من المخول بتحديد أن المريض مصنف على أنه "مريض بمرض عضال"؟', ru: 'Вопрос 2: Кто уполномочен определять, что пациент имеет статус "терминальный больной"?' }, options: [
                { val: 'אחות מוסמכת במחלקה', label: { he: 'אחות מוסמכת במחלקה', en: 'Registered nurse in the department', ar: 'ممرضة مسجلة في القسم', ru: 'Дипломированная медсестра в отделении' } },
                { val: 'עובד/ת סוציאלי/ת', label: { he: 'עובד/ת סוציאלי/ת', en: 'Social worker', ar: 'أخصائي اجتماعي', ru: 'Социальный работник' } },
                { val: 'רופא אחראי', label: { he: 'רופא אחראי', en: 'Attending physician', ar: 'الطبيب المسؤول', ru: 'Лечащий врач' } },
                { val: 'מנהל הסיעוד של המוסד', label: { he: 'מנהל הסיעוד של המוסד', en: 'Nursing director of the institution', ar: 'مدير التمريض في المؤسسة', ru: 'Директор по сестринскому делу учреждения' } }
            ] },
            { id: 'entry.2002496322', type: 'radio', label: { he: 'שאלה 3: איזה מהעקרונות הבאים מאפיין טיפול תומך/פליאטיבי?', en: 'Question 3: Which of the following principles characterizes supportive/palliative care?', ar: 'السؤال 3: أي من المبادئ التالية يميز الرعاية الداعمة/الملطفة؟', ru: 'Вопрос 3: Какой из следующих принципов характеризует поддерживающую/паллиативную помощь?' }, options: [
                { val: 'האצת תהליך המוות במצבים של סבל משמעותי', label: { he: 'האצת תהליך המוות במצבים של סבל משמעותי', en: 'Accelerating the death process in cases of significant suffering', ar: 'تسريع عملية الموت في حالات المعاناة الكبيرة', ru: 'Ускорение процесса смерти в случаях значительных страданий' } },
                { val: 'הימנעות מוחלטת מטיפולים רפואיים', label: { he: 'הימנעות מוחלטת מטיפולים רפואיים', en: 'Complete avoidance of medical treatments', ar: 'تجنب العلاجات الطبية تمامًا', ru: 'Полный отказ от медицинских процедур' } },
                { val: 'שילוב היבטים פיזיים, נפשיים ורוחניים בטיפול', label: { he: 'שילוב היבטים פיזיים, נפשיים ורוחניים בטיפול', en: 'Integration of physical, mental, and spiritual aspects in care', ar: 'دمج الجوانب الجسدية والعقلية والروحية في الرعاية', ru: 'Интеграция физических, психических и духовных аспектов в уход' } },
                { val: 'מתן טיפול רק בשלב הסופי של החיים', label: { he: 'מתן טיפול רק בשלב הסופי של החיים', en: 'Providing treatment only at the final stage of life', ar: 'توفير العلاج فقط في المرحلة الأخيرة من الحياة', ru: 'Предоставление ухода только на последней стадии жизни' } }
            ] },
            { id: 'entry.212725873', type: 'radio', label: { he: 'שאלה 4: מה מחויב הצוות לעשות בעת קבלת חולה נוטה למות למחלקה?', en: 'Question 4: What is the team obligated to do when admitting a terminally ill patient?', ar: 'السؤال 4: ما الذي يجب على الفريق القيام به عند إدخال مريض مصاب بمرض عضال؟', ru: 'Вопрос 4: Что обязана сделать команда при поступлении терминального больного?' }, options: [
                { val: 'להימנע משיחה עם בני המשפחה עד להחמרה במצב', label: { he: 'להימנע משיחה עם בני המשפחה עד להחמרה במצב', en: 'Avoid talking to family members until the condition worsens', ar: 'تجنب التحدث مع أفراد الأسرة حتى تتدهور الحالة', ru: 'Избегать разговоров с членами семьи до ухудшения состояния' } },
                { val: 'לברר קיום הנחיות מקדימות ולכבד את רצון המטופל', label: { he: 'לברר קיום הנחיות מקדימות ולכבד את רצון המטופל', en: 'Inquire about advance directives and respect patient wishes', ar: 'الاستفسار عن التوجيهات المسبقة واحترام رغبة المريض', ru: 'Выяснить наличие предварительных указаний и уважать волю пациента' } },
                { val: 'להעביר את החולה אוטומטית לבית חולים כללי', label: { he: 'להעביר את החולה אוטומטית לבית חולים כללי', en: 'Automatically transfer the patient to a general hospital', ar: 'نقل المريض تلقائيًا إلى مستشفى عام', ru: 'Автоматически переводить пациента в больницу общего профиля' } },
                { val: 'להפסיק טיפולים נלווים', label: { he: 'להפסיק טיפולים נלווים', en: 'Stop concomitant treatments', ar: 'وقف العلاجات المصاحبة', ru: 'Прекратить сопутствующее лечение' } }
            ] },
            { id: 'entry.1821630031', type: 'radio', label: { he: 'שאלה 5: איזה תפקיד יש למערך הטיפול התומך בארגון?', en: 'Question 5: What role does the supportive care system have in the organization?', ar: 'السؤال 5: ما هو دور نظام الرعاية الداعمة في المنظمة؟', ru: 'Вопрос 5: Какова роль системы поддерживающей терапии в организации?' }, options: [
                { val: 'מתן טיפול סיעודי בסיסי בלבד', label: { he: 'מתן טיפול סיעודי בסיסי בלבד', en: 'Providing basic nursing care only', ar: 'توفير الرعاية التمريضية الأساسية فقط', ru: 'Предоставление только базового сестринского ухода' } },
                { val: 'קבלת החלטות משפטיות עבור המטופל', label: { he: 'קבלת החלטות משפטיות עבור המטופל', en: 'Making legal decisions for the patient', ar: 'اتخاذ القرارات القانونية نيابة عن المريض', ru: 'Принятие юридических решений за пациента' } },
                { val: 'ייעוץ, הכוונה, הטמעה והכשרת צוותים בטיפול תומך', label: { he: 'ייעוץ, הכוונה, הטמעה והכשרת צוותים בטיפול תומך', en: 'Counseling, guidance, implementation, and staff training', ar: 'الاستشارة والتوجيه والتنفيذ وتدريب الموظفين', ru: 'Консультирование, руководство, внедрение и обучение персонала' } },
                { val: 'אחריות בלעדית על הטיפול התרופתי במחלקות', label: { he: 'אחריות בלעדית על הטיפול התרופתי במחלקות', en: 'Exclusive responsibility for medical treatment in the wards', ar: 'المسؤولية الحصرية عن العلاج الطبي في الأقسام', ru: 'Исключительная ответственность за медикаментозное лечение в отделениях' } }
            ] }
        ]
    }
};

let currentQuizId = null;
let currentLanguage = 'he';

// UI Strings mapping
const tStrings = {
    'he': { 'submit': 'שליחה למערכת', 'required': 'שדה חובה', 'success': 'התשובות נשלחו בהצלחה לגוגל גיליונות!', 'processing': 'שולח...', 'close': 'חזרה למסך הראשי' },
    'en': { 'submit': 'Submit', 'required': 'Required field', 'success': 'Submitted successfully to Google Sheets!', 'processing': 'Sending...', 'close': 'Return to main screen' },
    'ar': { 'submit': 'إرسال', 'required': 'مطلوب', 'success': 'تم الإرسال بنجاح!', 'processing': 'جارٍ الإرسال...', 'close': 'العودة إلى الشاشة الرئيسية' },
    'ru': { 'submit': 'Отправить', 'required': 'Обязательное поле', 'success': 'Успешно отправлено!', 'processing': 'Отправка...', 'close': 'Вернуться на главный экран' }
};

function renderNativeQuiz(quizId, lang = 'he', containerId = 'quizContainer') {
    currentQuizId = quizId;
    currentLanguage = lang;
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const quiz = quizzesData[quizId];
    if (!quiz) {
        container.innerHTML = '<p>Quiz not found.</p>';
        return;
    }

    const dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';
    const align = dir === 'rtl' ? 'text-align: right;' : 'text-align: left;';

    let html = `<div class="native-quiz-wrapper" style="direction: ${dir}; ${align}">`;
    html += `<h2 style="margin-bottom: 20px; font-size: 24px; color: #333;">${quiz.title[lang]}</h2>`;

    html += `<form id="nativeQuizForm" onsubmit="submitNativeQuiz(event)">`;

    const isPersonalInfo = (field) => {
        const lbl = field.label['he'];
        return lbl === 'שם מלא' || lbl === 'מחלקה' || lbl === 'תאריך' || lbl === 'תאריך כניסה ללומדה' || lbl === 'שעה' || lbl === 'שם העובד';
    };

    const renderField = (field, index) => {
        let fHtml = `<div class="quiz-field" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">`;
        fHtml += `<label style="display: block; font-weight: bold; margin-bottom: 10px;">${field.label[lang]} <span style="color:red">*</span></label>`;
        
        if (field.type === 'text') {
            const isNameField = field.id === 'entry.2128698376' || field.id === 'entry.888565256';
            fHtml += `<input type="text" name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" value="${isNameField && window.currentUser ? window.currentUser.name : ''}">`;
        } else if (field.type === 'date') {
            const today = new Date().toISOString().split('T')[0];
            fHtml += `<input type="date" name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" value="${today}" readonly>`;
        } else if (field.type === 'time') {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            fHtml += `<input type="time" name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" value="${timeStr}" readonly>`;
        } else if (field.type === 'select') {
            fHtml += `<select name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">`;
            fHtml += `<option value="">-- ${tStrings[lang].required} --</option>`;
            
            if (field.label['he'] === 'מחלקה' || field.label['en'] === 'Department') {
                if (typeof departmentsDb !== 'undefined' && departmentsDb.length > 0) {
                    departmentsDb.forEach(dept => {
                        fHtml += `<option value="${dept}">${dept}</option>`;
                    });
                } else {
                    field.options.forEach(opt => {
                        fHtml += `<option value="${opt.val}">${opt.label[lang]}</option>`;
                    });
                }
            } else {
                field.options.forEach(opt => {
                    fHtml += `<option value="${opt.val}">${opt.label[lang]}</option>`;
                });
            }
            fHtml += `</select>`;
        } else if (field.type === 'radio') {
            field.options.forEach((opt, optIndex) => {
                fHtml += `
                <label style="display: block; margin-bottom: 8px; cursor: pointer; padding: 5px; border-radius: 4px; transition: background 0.2s;">
                    <input type="radio" name="${field.id}" value="${opt.val}" required style="margin: 0 10px;">
                    ${opt.label[lang]}
                </label>`;
            });
        }
        fHtml += `</div>`;
        return fHtml;
    };

    // 1. Render Personal Info Fields at the TOP
    quiz.fields.filter(isPersonalInfo).forEach((field, index) => {
        html += renderField(field, index);
    });

    if (quiz.contentItems && quiz.contentItems.length > 0) {
        html += `<div class="quiz-content-items">`;
        quiz.contentItems.forEach(item => {
            html += `<div class="content-item" style="margin-bottom: 25px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">`;
            
            let itemTitle = item.title ? (item.title[lang] || item.title['he']) : '';
            if (itemTitle) html += `<h3 style="margin-bottom:10px; color: var(--primary-color);">${itemTitle}</h3>`;
            
            let itemDesc = item.desc ? (item.desc[lang] || item.desc['he']) : '';
            if (itemDesc) html += `<p style="margin-bottom: 15px; font-size: 15px; line-height: 1.5; color: #555;">${itemDesc}</p>`;
            
            if (item.type === 'video') {
                html += `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${item.id}" frameborder="0" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>`;
                html += `<div style="margin-top: 5px; font-size: 14px; text-align: center;">
                    <a href="https://www.youtube.com/watch?v=${item.id}" target="_blank" style="color: var(--primary-color);">אם הסרטון לא מופעל, לחץ/י כאן לצפייה ביוטיוב</a>
                </div>`;
            } else if (item.type === 'link') {
                let linkText = item.linkText ? (item.linkText[lang] || item.linkText['he']) : '🔗 כניסה לקישור';
                html += `<a href="${item.url}" target="_blank" class="quiz-external-link" style="display:inline-block; padding:12px 20px; background:#e3f2fd; border-radius:5px; text-decoration:none; font-weight:bold; color: #0277bd; transition: all 0.2s;">${linkText}</a>`;
            }
            html += `</div>`;
        });
        html += `</div>`;
    }

    if (quiz.videos && quiz.videos.length > 0) {
        html += `<div class="quiz-videos">`;
        quiz.videos.forEach(v => {
            html += `
            <div class="video-container" style="margin-bottom: 20px;">
                <h3 style="margin-bottom:10px;">${v.title[lang] || v.title['he']}</h3>
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/${v.id}" frameborder="0" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>
                <div style="margin-top: 5px; font-size: 14px; text-align: center;">
                    <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" style="color: var(--primary-color);">אם הסרטון לא מופעל, לחץ/י כאן לצפייה ביוטיוב</a>
                </div>
            </div>`;
        });
        html += `</div>`;
    }
    
    if (quiz.links && quiz.links.length > 0) {
        html += `<div class="quiz-links" style="margin-bottom: 20px;">`;
        quiz.links.forEach(l => {
            html += `<a href="${l.url}" target="_blank" class="quiz-external-link" style="display:block; padding:12px; background:#e3f2fd; border-radius:5px; margin-bottom:10px; text-decoration:none; font-weight:bold; color: #0277bd;">🔗 ${l.text[lang]}</a>`;
        });
        html += `</div>`;
    }

    // 3. Render Other Fields (Questions) BELOW the videos
    quiz.fields.filter(f => !isPersonalInfo(f)).forEach((field, index) => {
        html += renderField(field, index);
    });

    html += `<button type="submit" id="quizSubmitBtn" style="background: #28a745; color: white; border: none; padding: 15px 24px; font-size: 18px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; margin-top: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${tStrings[lang].submit}</button>`;
    html += `</form>`;
    html += `</div>`;
    
    // Create hidden iframe if not exists
    if (!document.getElementById('hidden_iframe')) {
        let iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe';
        iframe.id = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    container.innerHTML = html;
}

function submitNativeQuiz(event) {
    event.preventDefault();
    const btn = document.getElementById('quizSubmitBtn');
    btn.disabled = true;
    btn.innerText = tStrings[currentLanguage].processing;
    btn.style.background = '#6c757d';
    
    const quiz = quizzesData[currentQuizId];
    const form = event.target;
    const formData = new FormData(form);
    
    let userName = 'עובד (לא צוין שם)';
    if (typeof currentUser !== 'undefined' && currentUser && currentUser.name) {
        userName = currentUser.name;
    }
    
    // Try to get name from form fields (e.g., 'entry.2128698376')
    for (let [key, value] of formData.entries()) {
        if (key === 'entry.2128698376' && value.trim() !== '') {
            userName = value.trim();
        }
    }

    if (typeof trainingsAnswersDb !== 'undefined') {
        trainingsAnswersDb.push({
            title: quiz.title[currentLanguage] || quiz.title['he'],
            user: userName,
            date: new Date().toLocaleString('he-IL')
        });
        localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
    }
    
    // Simulate slight delay for processing UI feedback
    setTimeout(() => {
        alert(tStrings[currentLanguage].success);
        if (typeof closeTraining === 'function') closeTraining();
    }, 800);
}

function createHidden(name, value) {
    let inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = name;
    inp.value = value;
    return inp;
}

window.renderNativeQuiz = renderNativeQuiz;
