// quizzes.js
// Centralized multi-lingual quiz data mapped to Google Forms
const quizzesData = {
    'infections': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/formResponse',
        title: {
            he: 'מארז מניעת זיהומים',
            en: 'Infection Prevention',
            ar: 'مكافحة العدوى',
            ru: 'Профилактика инфекций'
        },
        videos: [
            { id: 'RY5wXbPCY-o', title: { he: 'מניעת הפצת מזהמים', en: 'Preventing the spread of pathogens', ar: 'منع انتشار مسببات الأمراض', ru: 'Предотвращение распространения патогенов' } },
            { id: 'LjHnCvv48hA', title: { he: 'התמגנות והסרת מיגון', en: 'Donning and doffing PPE', ar: 'ارتداء وخلع معدات الوقاية', ru: 'Надевание и снятие СИЗ' } },
            { id: 'sOR40jML8IA', title: { he: 'מה לא נעשה!', en: 'What NOT to do!', ar: 'ما لا يجب فعله!', ru: 'Чего делать НЕЛЬЗЯ!' } }
        ],
        links: [
            { url: 'https://www.gov.il/files/health/moh-files/Infection-prevention/story.html', text: { he: 'לומדת משרד הבריאות להיגיינת ידיים', en: 'MOH Hand Hygiene Module', ar: 'وحدة نظافة اليدين التابعة لوزارة الصحة', ru: 'Модуль гигиены рук Минздрава' } }
        ],
        fields: [
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
            { id: 'entry.1264765965', type: 'radio', label: { he: 'שאלה 1: איזו פעולה מפחיתה את הסיכון לזיהומים במוסד הגריאטרי?', en: 'Question 1: Which action reduces the risk of infections in the geriatric facility?', ar: 'السؤال 1: أي إجراء يقلل من خطر الإصابة بالعدوى في مرفق رعاية المسنين؟', ru: 'Вопрос 1: Какое действие снижает риск заражения в гериатрическом учреждении?' }, options: [
                { val: 'שימוש בכפפות בלבד', label: { he: 'שימוש בכפפות בלבד', en: 'Using gloves only', ar: 'استخدام القفازات فقط', ru: 'Использование только перчаток' } },
                { val: 'הגיינת ידיים לפי ואחרי כל טיפול בחולה', label: { he: 'הגיינת ידיים לפני ואחרי כל טיפול בחולה', en: 'Hand hygiene before and after each patient treatment', ar: 'نظافة اليدين قبل وبعد كل علاج للمريض', ru: 'Гигиена рук до и после каждого ухода за пациентом' } },
                { val: 'חיטוי חדרים בלבד', label: { he: 'חיטוי חדרים בלבד', en: 'Disinfecting rooms only', ar: 'تطهير الغرف فقط', ru: 'Только дезинфекция палат' } },
                { val: 'שמירה על מרחק מהחולה', label: { he: 'שמירה על מרחק מהחולה', en: 'Keeping distance from the patient', ar: 'الحفاظ على مسافة من المريض', ru: 'Соблюдение дистанции от пациента' } }
            ] },
            { id: 'entry.1661314556', type: 'radio', label: { he: 'שאלה 2: מתי יש לשטוף ידיים במים וסבון?', en: 'Question 2: When must hands be washed with soap and water?', ar: 'السؤال 2: متى يجب غسل اليدين بالماء والصابون؟', ru: 'Вопрос 2: Когда необходимо мыть руки с мылом и водой?' }, options: [
                { val: 'בכל מצב יש לשטוף ידיים', label: { he: 'בכל מצב יש לשטוף ידיים', en: 'In all situations', ar: 'في جميع الحالات', ru: 'В любой ситуации' } },
                { val: 'כשיש לכלוך נראה לעין חובה לשטוף במים וסבון', label: { he: 'כשיש לכלוך נראה לעין חובה לשטוף במים וסבון', en: 'When there is visible dirt', ar: 'عند وجود أوساخ ظاهرة', ru: 'При видимых загрязнениях' } },
                { val: 'חיטוי בתכשיר אלכוהולי בסיום שטיפת ידיים', label: { he: 'חיטוי בתכשיר אלכוהולי בסיום שטיפת ידיים', en: 'Alcohol rub after hand washing', ar: 'استخدام معقم كحولي بعد الغسل', ru: 'Дезинфекция спиртом после мытья рук' } },
                { val: 'אף אחת מהתשובות לא נכונה', label: { he: 'אף אחת מהתשובות לא נכונה', en: 'None of the above', ar: 'لا شيء مما سبق', ru: 'Ничего из вышеперечисленного' } }
            ] },
            { id: 'entry.2002496322', type: 'radio', label: { he: 'שאלה 3: מה המשפט הנכון לאחר הסרת כפפות?', en: 'Question 3: What is the correct action after removing gloves?', ar: 'السؤال 3: ما هو الإجراء الصحيح بعد نزع القفازات؟', ru: 'Вопрос 3: Какое действие правильное после снятия перчаток?' }, options: [
                { val: 'יש לשטוף ידיים במים וסבון', label: { he: 'יש לשטוף ידיים במים וסבון', en: 'Wash hands with soap and water', ar: 'اغسل يديك بالماء والصابون', ru: 'Вымыть руки с мылом и водой' } },
                { val: 'יש לחטא בתכשיר אלכוהולי', label: { he: 'יש לחטא בתכשיר אלכוהולי', en: 'Use an alcohol-based hand rub', ar: 'استخدم معقم كحولي', ru: 'Использовать спиртовой антисептик' } },
                { val: 'אין צורך בשיטפה או חיטוי כי השתמשתי בכפפות', label: { he: 'אין צורך בשיטפה או חיטוי כי השתמשתי בכפפות', en: 'No need because gloves were used', ar: 'لا داعي لأنني استخدمت القفازات', ru: 'Не нужно, так как использовались перчатки' } },
                { val: 'תשובה 1 ו2 נכונות', label: { he: 'תשובה 1 ו-2 נכונות', en: 'Answers 1 and 2 are correct', ar: 'الإجابتان 1 و 2 صحيحتان', ru: 'Ответы 1 и 2 верны' } }
            ] },
            { id: 'entry.212725873', type: 'radio', label: { he: 'שאלה 4: מהו משך זמן נכון לשטוף ידיים במים וסבון?', en: 'Question 4: What is the correct duration for washing hands with soap and water?', ar: 'السؤال 4: ما هي المدة الصحيحة لغسل اليدين بالماء والصابون؟', ru: 'Вопрос 4: Какова правильная продолжительность мытья рук с мылом и водой?' }, options: [
                { val: '15 שניות', label: { he: '15 שניות', en: '15 seconds', ar: '15 ثانية', ru: '15 секунд' } },
                { val: '5-10 שניות', label: { he: '5-10 שניות', en: '5-10 seconds', ar: '5-10 ثوان', ru: '5-10 секунд' } },
                { val: 'דקה', label: { he: 'דקה', en: 'One minute', ar: 'دقيقة واحدة', ru: 'Одна минута' } },
                { val: '20-40 שניות', label: { he: '20-40 שניות', en: '20-40 seconds', ar: '20-40 ثانية', ru: '20-40 секунд' } }
            ] },
            { id: 'entry.1821630031', type: 'radio', label: { he: 'שאלה 5: מה ריכוז הכלור הנדרש לניקיון יום יומי של חדר מטופל?', en: 'Question 5: What is the required chlorine concentration for daily room cleaning?', ar: 'السؤال 5: ما هو تركيز الكلور المطلوب للتنظيف اليومي لغرفة المريض؟', ru: 'Вопрос 5: Какова требуемая концентрация хлора для ежедневной уборки палаты?' }, options: [
                { val: '1000ppm  לליטר מים', label: { he: '1000ppm לליטר מים', en: '1000ppm per liter', ar: '1000 جزء في المليون لكل لتر', ru: '1000 ppm на литр' } },
                { val: '2000ppm  לליטר מים', label: { he: '2000ppm לליטר מים', en: '2000ppm per liter', ar: '2000 جزء في المليون لكل لتر', ru: '2000 ppm на литр' } },
                { val: '5000ppm  לליטר מים', label: { he: '5000ppm לליטר מים', en: '5000ppm per liter', ar: '5000 جزء في المليون لكل لتر', ru: '5000 ppm на литр' } },
                { val: '10000ppm  לליטר מים', label: { he: '10000ppm לליטר מים', en: '10000ppm per liter', ar: '10000 جزء في المليون لكل لتر', ru: '10000 ppm на литр' } }
            ] },
            { id: 'entry.1747637410', type: 'radio', label: { he: 'שאלה 6: מה החשיבות של ניקיון וחיטוי סביבתי במוסד רפואי?', en: 'Question 6: What is the importance of environmental cleaning and disinfection in a medical facility?', ar: 'السؤال 6: ما أهمية التنظيف والتطهير البيئي في منشأة طبية؟', ru: 'Вопрос 6: В чем важность экологической уборки и дезинфекции в медицинском учреждении?' }, options: [
                { val: 'שמירה על מראה אסטטי', label: { he: 'שמירה על מראה אסטטי', en: 'Maintaining an aesthetic appearance', ar: 'الحفاظ على المظهر الجمالي', ru: 'Поддержание эстетичного вида' } },
                { val: 'מניעת העברת זיהומים ושבירת רצף ההדבקה בין מטופלים צוות ומבקרים', label: { he: 'מניעת העברת זיהומים ושבירת רצף ההדבקה בין מטופלים צוות ומבקרים', en: 'Preventing infection transmission and breaking the chain of infection', ar: 'منع انتقال العدوى وكسر سلسلة العدوى', ru: 'Предотвращение передачи инфекций и прерывание цепи заражения' } },
                { val: 'חיסכון בזמן עבודת הצוות', label: { he: 'חיסכון בזמן עבודת הצוות', en: 'Saving staff time', ar: 'توفير وقت الموظفين', ru: 'Экономия времени персонала' } },
                { val: 'הפחתת הצורך בטיפול תרופתי בלבד', label: { he: 'הפחתת הצורך בטיפול תרופתי בלבד', en: 'Reducing the need for medical treatment only', ar: 'تقليل الحاجة إلى العلاج الطبي فقط', ru: 'Снижение потребности только в медикаментозном лечении' } }
            ] },
            { id: 'entry.889830264', type: 'radio', label: { he: 'שאלה 7: מהו השיקול המרכזי בקביעת סוג הבידוד למטופל על פי נוהל מחוללים רבי־עמידות?', en: 'Question 7: What is the main consideration in determining the type of isolation according to multi-resistant pathogens protocol?', ar: 'السؤال 7: ما هو الاعتبار الرئيسي في تحديد نوع العزل وفقًا لبروتوكول مسببات الأمراض المقاومة للأدوية المتعددة؟', ru: 'Вопрос 7: Что является основным соображением при определении типа изоляции согласно протоколу по мультирезистентным патогенам?' }, options: [
                { val: 'גיל המטופל ומצבו התפקודי', label: { he: 'גיל המטופל ומצבו התפקודי', en: 'Patient age and functional status', ar: 'عمر المريض وحالته الوظيفية', ru: 'Возраст пациента и его функциональное состояние' } },
                { val: 'דרכי העברת המחולל הזיהומי', label: { he: 'דרכי העברת המחולל הזיהומי', en: 'Transmission routes of the infectious pathogen', ar: 'طرق انتقال الممرض المعدي', ru: 'Пути передачи инфекционного возбудителя' } },
                { val: 'משך האשפוז הצפוי', label: { he: 'משך האשפוז הצפוי', en: 'Expected duration of hospitalization', ar: 'المدة المتوقعة لدخول المستشفى', ru: 'Ожидаемая продолжительность госпитализации' } },
                { val: 'זמינות חדרי הבידוד במחלקה', label: { he: 'זמינות חדרי הבידוד במחלקה', en: 'Availability of isolation rooms', ar: 'توافر غرف العزل', ru: 'Наличие изоляторов' } }
            ] },
            { id: 'entry.1448244571', type: 'radio', label: { he: 'שאלה 8: מי מוסמך להחליט על הפעלת בידוד למטופל?', en: 'Question 8: Who is authorized to decide on implementing patient isolation?', ar: 'السؤال 8: من هو المخول لاتخاذ قرار بتنفيذ عزل المريض؟', ru: 'Вопрос 8: Кто уполномочен принимать решение о внедрении изоляции пациента?' }, options: [
                { val: 'אחות אחראית בלבד', label: { he: 'אחות אחראית בלבד', en: 'Charge nurse only', ar: 'الممرضة المسؤولة فقط', ru: 'Только старшая медсестра' } },
                { val: 'רופא בלבד', label: { he: 'רופא בלבד', en: 'Doctor only', ar: 'الطبيب فقط', ru: 'Только врач' } },
                { val: 'רופא, אחות, נאמן מחלקתי או ועדת זיהומים', label: { he: 'רופא, אחות, נאמן מחלקתי או ועדת זיהומים', en: 'Doctor, nurse, department trustee or infection committee', ar: 'الطبيب والممرضة وأمين القسم أو لجنة العدوى', ru: 'Врач, медсестра, попечитель отделения или комитет по инфекциям' } },
                { val: 'הנהלת בית החולים בלבד', label: { he: 'הנהלת בית החולים בלבד', en: 'Hospital management only', ar: 'إدارة المستشفى فقط', ru: 'Только руководство больницы' } }
            ] },
            { id: 'entry.1190367668', type: 'radio', label: { he: 'שאלה 9: מה נדרש לגבי ציוד רפואי בחדר בידוד?', en: 'Question 9: What is required regarding medical equipment in an isolation room?', ar: 'السؤال 9: ما المطلوب فيما يتعلق بالمعدات الطبية في غرفة العزل؟', ru: 'Вопрос 9: Каковы требования к медицинскому оборудованию в изоляторе?' }, options: [
                { val: 'שימוש בציוד משותף לאחר חיטוי בלבד', label: { he: 'שימוש בציוד משותף לאחר חיטוי בלבד', en: 'Use of shared equipment after disinfection only', ar: 'استخدام المعدات المشتركة بعد التطهير فقط', ru: 'Использование общего оборудования только после дезинфекции' } },
                { val: 'הקצאת ציוד אישי או חד־פעמי למטופל', label: { he: 'הקצאת ציוד אישי או חד־פעמי למטופל', en: 'Allocation of personal or disposable equipment', ar: 'تخصيص معدات شخصية أو ذات استخدام واحد', ru: 'Выделение личного или одноразового оборудования' } },
                { val: 'הוצאת ציוד מהחדר ללא ניקוי', label: { he: 'הוצאת ציוד מהחדר ללא ניקוי', en: 'Removing equipment without cleaning', ar: 'إزالة المعدات بدون تنظيف', ru: 'Вынос оборудования без очистки' } },
                { val: 'שימוש בציוד רב־פעמי בלבד', label: { he: 'שימוש בציוד רב־פעמי בלבד', en: 'Use of reusable equipment only', ar: 'استخدام المعدات القابلة لإعادة الاستخدام فقط', ru: 'Использование только многоразового оборудования' } }
            ] },
            { id: 'entry.1363240456', type: 'radio', label: { he: 'שאלה 10: כיצד יש לנהוג בעובד המסרב להתחסן?', en: 'Question 10: How should an employee who refuses to be vaccinated be handled?', ar: 'السؤال 10: كيف يجب التعامل مع الموظف الذي يرفض التطعيم؟', ru: 'Вопрос 10: Как следует поступать с работником, отказывающимся от вакцинации?' }, options: [
                { val: 'לאפשר עבודה ללא תיעוד', label: { he: 'לאפשר עבודה ללא תיעוד', en: 'Allow working without documentation', ar: 'السماح بالعمل دون توثيق', ru: 'Разрешить работу без документации' } },
                { val: 'בלהשעותו מיד', label: { he: 'להשעותו מיד', en: 'Suspend them immediately', ar: 'إيقافه عن العمل فوراً', ru: 'Немедленно отстранить от работы' } },
                { val: 'להסביר את ההשלכות ולתעד סירוב חתום', label: { he: 'להסביר את ההשלכות ולתעד סירוב חתום', en: 'Explain consequences and document signed refusal', ar: 'شرح العواقب وتوثيق الرفض الموقع', ru: 'Объяснить последствия и задокументировать подписанный отказ' } },
                { val: 'לחסן בכפייה', label: { he: 'לחסן בכפייה', en: 'Force vaccination', ar: 'التطعيم الإجباري', ru: 'Принудительная вакцинация' } }
            ] },
            { id: 'entry.1847352152', type: 'radio', label: { he: 'משוב: האם המארז נוח וזמין?', en: 'Feedback: Is the package convenient and accessible?', ar: 'ملاحظات: هل الحزمة مريحة ومتاحة؟', ru: 'Отзыв: Удобен ли и доступен пакет?' }, options: [
                { val: '1', label: { he: '1', en: '1', ar: '1', ru: '1' } }, { val: '2', label: { he: '2', en: '2', ar: '2', ru: '2' } }, { val: '3', label: { he: '3', en: '3', ar: '3', ru: '3' } }, { val: '4', label: { he: '4', en: '4', ar: '4', ru: '4' } }, { val: '5', label: { he: '5', en: '5', ar: '5', ru: '5' } }
            ] },
            { id: 'entry.3764828', type: 'radio', label: { he: 'משוב: האם הסרטון חידש נהלים שלא הכרתם?', en: 'Feedback: Did the video introduce new procedures?', ar: 'ملاحظات: هل قدم الفيديو إجراءات جديدة؟', ru: 'Отзыв: Представило ли видео новые процедуры?' }, options: [
                { val: '1', label: { he: '1', en: '1', ar: '1', ru: '1' } }, { val: '2', label: { he: '2', en: '2', ar: '2', ru: '2' } }, { val: '3', label: { he: '3', en: '3', ar: '3', ru: '3' } }, { val: '4', label: { he: '4', en: '4', ar: '4', ru: '4' } }, { val: '5', label: { he: '5', en: '5', ar: '5', ru: '5' } }
            ] },
            { id: 'entry.946442302', type: 'radio', label: { he: 'משוב: באיזה מידה הסרטון נותן לכם להרגיש שאתם חלק מתהליך מניעת זיהומים במוסד?', en: 'Feedback: To what extent does the video make you feel part of the infection prevention process?', ar: 'ملاحظات: إلى أي مدى يجعلك الفيديو تشعر بأنك جزء من عملية الوقاية من العدوى؟', ru: 'Отзыв: В какой степени видео заставляет вас чувствовать себя частью процесса?' }, options: [
                { val: '1', label: { he: '1', en: '1', ar: '1', ru: '1' } }, { val: '2', label: { he: '2', en: '2', ar: '2', ru: '2' } }, { val: '3', label: { he: '3', en: '3', ar: '3', ru: '3' } }, { val: '4', label: { he: '4', en: '4', ar: '4', ru: '4' } }, { val: '5', label: { he: '5', en: '5', ar: '5', ru: '5' } }
            ] }
        ]
    },
    'supportive_care': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/formResponse',
        title: {
            he: 'מארז טיפול תומך',
            en: 'Supportive Care',
            ar: 'الرعاية الداعمة',
            ru: 'Поддерживающая терапия'
        },
        contentItems: [
            {
                type: 'link',
                url: 'https://www.gov.il/files/Health/dying_patient_law/story_html5.html',
                title: { he: 'קישור ללומדת משרד הבריאות: סוף מעשה במחשבה תחילה - העדפות טיפול בסוף החיים' },
                desc: { he: 'כניסה לקישור ללמידה עצמית. (משך זמן כ- 60 דקות )' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/files/health/dying_patient_request/story_html5.html',
                title: { he: 'קישור ללומדת חולה נוטה למות' },
                desc: { he: 'כניסה לקישור ללמידה עצמית. (משך זמן כ- 60 דקות )' }
            },
            {
                type: 'video',
                id: 'IB5irFCuPxs',
                title: { he: 'סרטון הסברה: כבר כתבתם? הנחיות רפואיות מקדימות' },
                desc: { he: 'צפייה 2 דקות' }
            },
            {
                type: 'link',
                url: 'https://me.health.gov.il/older-adult/services-rights/before-saying-goodbye/advance-medical-directives/?source=5273',
                title: { he: 'מילוי מסמכים: כל אחד ואחת יכולים להיערך מראש למצב של אובדן כשירות בסוף החיים. חוק החולה הנוטה למות מאפשר לכל אחד ואחת לתת הנחיות רפואיות מקדימות או למנות מיופה כוח במקרה שבו יוגדרו על ידי רופא אחראי כחולה נוטה למות.' },
                linkText: { he: 'קישור לסרטון: מילוי טופס הנחיות מקדימות' },
                desc: { he: 'קריאה וצפייה בסרטון כ- 10 דקות' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/he/service/dying-patient-request',
                title: { he: 'הגשת מסמכים: שירות זה הוא ייחודי ומאפשר לכל המעוניינים למלא טפסים עם הנחיות רפואיות מקדימות או מינוי מיופה כוח, למצב עתידי בו ייקבע כי הם חולים במחלה חשוכת מרפא (ללא אפשרות להחלמה). כל זאת, כדי להימנע מהארכת הסבל במצב שבו לא יוכלו להביע את רצונם.' },
                linkText: { he: 'קישור להנחיות רפואיות מקדימות ויפוי כוח.' },
                desc: { he: 'קריאה כ- 10 דקות' }
            },
            {
                type: 'video',
                id: 'l17BmQmFA5E',
                title: { he: 'קישור לסרטון הסברה על יפוי כוח מתמשך' },
                desc: { he: 'צפייה כ- 4 דקות' }
            }
        ],
        fields: [
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

    html += `<form id="nativeQuizForm" onsubmit="submitNativeQuiz(event)">`;

    quiz.fields.forEach((field, index) => {
        html += `<div class="quiz-field" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">`;
        html += `<label style="display: block; font-weight: bold; margin-bottom: 10px;">${field.label[lang]} <span style="color:red">*</span></label>`;
        
        if (field.type === 'text') {
            html += `<input type="text" name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" value="${field.id === 'entry.2128698376' && window.currentUser ? window.currentUser.name : ''}">`;
        } 
        else if (field.type === 'select') {
            html += `<select name="${field.id}" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">`;
            html += `<option value="">-- ${tStrings[lang].required} --</option>`;
            field.options.forEach(opt => {
                html += `<option value="${opt.val}">${opt.label[lang]}</option>`;
            });
            html += `</select>`;
        }
        else if (field.type === 'radio') {
            field.options.forEach((opt, optIndex) => {
                html += `
                <label style="display: block; margin-bottom: 8px; cursor: pointer; padding: 5px; border-radius: 4px; transition: background 0.2s;">
                    <input type="radio" name="${field.id}" value="${opt.val}" required style="margin: 0 10px;">
                    ${opt.label[lang]}
                </label>`;
            });
        }
        html += `</div>`;
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
    
    // Create a temporary form to post to Google Docs
    const gForm = document.createElement('form');
    gForm.action = quiz.formUrl;
    gForm.method = 'POST';
    gForm.target = 'hidden_iframe';
    gForm.style.display = 'none';
    
    // Append all fields
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        gForm.appendChild(input);
    }
    
    // Date & Time auto-fill for Form 1 if required
    let d = new Date();
    if (currentQuizId === 'infections') {
        gForm.appendChild(createHidden('entry.1548808521_year', d.getFullYear()));
        gForm.appendChild(createHidden('entry.1548808521_month', String(d.getMonth() + 1).padStart(2, '0')));
        gForm.appendChild(createHidden('entry.1548808521_day', String(d.getDate()).padStart(2, '0')));
        
        gForm.appendChild(createHidden('entry.601953853_hour', String(d.getHours()).padStart(2, '0')));
        gForm.appendChild(createHidden('entry.601953853_minute', String(d.getMinutes()).padStart(2, '0')));
    }
    
    // Form 2 Date Entry: entry.1548808521
    if (currentQuizId === 'supportive_care') {
        gForm.appendChild(createHidden('entry.1548808521_year', d.getFullYear()));
        gForm.appendChild(createHidden('entry.1548808521_month', String(d.getMonth() + 1).padStart(2, '0')));
        gForm.appendChild(createHidden('entry.1548808521_day', String(d.getDate()).padStart(2, '0')));
    }

    document.body.appendChild(gForm);
    gForm.submit();
    
    // Wait a brief moment to allow iframe post
    setTimeout(() => {
        alert(tStrings[currentLanguage].success);
        if (typeof closeTraining === 'function') closeTraining();
    }, 1500);
}

function createHidden(name, value) {
    let inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = name;
    inp.value = value;
    return inp;
}

window.renderNativeQuiz = renderNativeQuiz;
