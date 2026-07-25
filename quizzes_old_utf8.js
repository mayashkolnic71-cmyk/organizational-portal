// quizzes.js
// Centralized multi-lingual quiz data mapped to Google Forms
const quizzesData = {
    'infections': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/formResponse',
        title: {
            he: '(ÎÖÎáÎòÎÉÎ¿ 2026) Î×ÎÉÎ¿Îû ÎöÎôÎ¿ÎøÎö Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">ÎóÎòÎæÎô ÎÖÎºÎ¿ , ÎæÎ¿ÎøÎòÎ¬ Î£ÎöÎªÎÿÎ¿ÎñÎòÎ¬ Î£ÎªÎòÎòÎ¬ ÎöÎóÎòÎæÎôÎÖÎØ , ÎæÎöÎªÎ£ÎùÎö !<br>Î£ÎöÎ£Îƒ Î¿Î®ÎÖÎ×Î¬ ÎöÎôÎ¿ÎøÎòÎ¬ ÎöÎùÎòÎæÎö Î®ÎóÎ£ÎÖÎÜ Î£ÎóÎæÎòÎ¿ ÎøÎùÎ£Îº Î×Î¬ÎöÎ£ÎÖÎÜ ÎºÎ£ÎÖÎÿÎ¬ÎÜ Î£ÎóÎæÎòÎôÎö ÎæÎùÎòÎôÎ® ÎöÎ¿ÎÉÎ®ÎòÎƒ ÎòÎæÎöÎ×Î®ÎÜ ÎøÎ£ ÎóÎòÎæÎô ÎÖÎæÎªÎó ÎÉÎùÎ¬ Î£Î®ÎáÎö . Î×Î®ÎÜ ÎöÎöÎôÎ¿ÎøÎö Îø- 3 Î®ÎóÎòÎ¬ .</span>',
            en: '(January 2026) Infection Prevention Training<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">Dear employee , welcome to the staff , good luck!<br>Below is a list of mandatory trainings that you are required to complete as part of your onboarding process during your first month of employment. Thereafter, each employee is required to complete these trainings once a year. The total duration of the training is approximately 3 hours.</span>',
            ar: '(┘è┘åÏº┘èÏ▒ 2026) Ï¡Ï▓┘àÏ® ┘à┘âÏº┘üÏ¡Ï® Ïº┘äÏ╣Ï»┘ê┘ë',
            ru: '(ð»ð¢ð▓ð░ÐÇÐî 2026) ðƒð░ð║ðÁÐé ð┐ð¥ ð┐ÐÇð¥Ðäð©ð╗ð░ð║Ðéð©ð║ðÁ ð©ð¢ÐäðÁð║Ðåð©ð╣'
        },
        contentItems: [
            {
                type: 'video',
                id: 'RY5wXbPCY-o',
                title: { he: '1. Î¿ÎºÎó ÎöÎ×ÎÖÎòÎóÎô Î£ÎøÎ£Î£ ÎÉÎáÎ®ÎÖ ÎöÎªÎòÎòÎ¬ -ÎöÎÖÎÆÎÖÎÖÎáÎ¬ ÎÖÎôÎÖÎÖÎØ ÎöÎÖÎÉ ÎöÎÉÎùÎ¿ÎÖÎòÎ¬ Î®Î£ ÎøÎòÎ£ÎáÎò !' },
                desc: { he: '(ÎùÎªÎÖ ÎôÎºÎö)' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/files/health/moh-files/Infection-prevention/story.html',
                title: { he: '2. ÎöÎøÎáÎí Î£ÎºÎÖÎ®ÎòÎ¿ ÎöÎ×ÎÖÎòÎóÎô Î£ÎÉÎùÎÖÎòÎ¬/Î¿ÎòÎñÎÉÎÖÎØ ÎòÎ×ÎºÎªÎòÎóÎòÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ - ÎºÎÖÎ®ÎòÎ¿ Î£Î£ÎòÎ×ÎôÎ¬ Î×Î®Î¿Îô ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ Î£ÎöÎÖÎÆÎÖÎÖÎáÎ¬ ÎÖÎôÎÖÎÖÎØ' },
                linkText: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£Î£ÎòÎ×ÎôÎ¬ Î×Î®Î¿Îô ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ (ÎùÎªÎÖ Î®ÎóÎö- Î®ÎóÎö)' },
                desc: { he: 'ÎáÎÉ Î£ÎöÎÖÎøÎáÎí Î£ÎºÎÖÎ®ÎòÎ¿ ÎòÎ£ÎæÎªÎó ÎÉÎ¬ ÎöÎ£ÎòÎ×ÎôÎö !' }
            },
            {
                type: 'video',
                id: 'LjHnCvv48hA',
                title: { he: '3. ÎíÎ¿ÎÿÎòÎƒ Î¿ÎºÎó ÎöÎ×ÎÖÎòÎóÎô Î£ÎøÎ£Î£ ÎÉÎáÎ®ÎÖ ÎöÎªÎòÎòÎ¬ - Î×ÎáÎÖÎóÎ¬ ÎöÎñÎªÎ¬ Î×ÎûÎöÎ×ÎÖÎØ !' },
                desc: { he: '(1.5 ÎôÎºÎòÎ¬)' }
            },
            {
                type: 'video',
                id: 'sOR40jML8IA',
                title: { he: '4. ÎíÎ¿ÎÿÎòÎƒ ÎöÎ¬Î×ÎÆÎáÎòÎ¬ ÎòÎöÎíÎ¿Î¬ Î×ÎÖÎÆÎòÎƒ ÎöÎ×ÎÖÎòÎóÎô Î£ÎøÎ£Î£ ÎÉÎáÎ®ÎÖ ÎöÎªÎòÎòÎ¬ !' },
                desc: { he: '(2 ÎôÎºÎòÎ¬)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1QV7mt8nqzlvq8LgLG5_AEnz-6wkyLq8l',
                title: { he: '5. ÎöÎôÎ¿ÎøÎö ÎûÎò Î×ÎÖÎòÎóÎôÎ¬ : Î£ÎøÎòÎù ÎóÎûÎ¿ .' },
                linkText: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£ÎíÎ¿ÎÿÎòÎƒ ÎöÎôÎ¿ÎøÎö Î£ÎáÎÖÎºÎÖÎòÎƒ ÎÖÎòÎ×ÎÖ ÎæÎùÎôÎ¿ÎÖ ÎæÎÖÎôÎòÎô Î£ÎøÎòÎùÎòÎ¬ ÎóÎûÎ¿ (3 ÎôÎºÎòÎ¬)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1vveMbozJT_iUxFtmYf04XSazQgspg5cK',
                title: { he: '5ÎÉ. ÎöÎôÎ¿ÎøÎö ÎûÎò Î×ÎÖÎòÎóÎôÎ¬ : Î£ÎøÎòÎù ÎóÎûÎ¿ .' },
                linkText: { he: 'ÎºÎÖÎ®ÎòÎ¿ ÎöÎôÎ¿ÎøÎö Î£ÎáÎÖÎºÎÖÎòÎƒ ÎÿÎ¿Î×ÎÖÎáÎ£ÎÖ ÎæÎùÎôÎ¿ÎÖ ÎæÎÖÎôÎòÎô Î£ÎøÎòÎùÎòÎ¬ ÎóÎûÎ¿ (1 ÎôÎºÎòÎ¬)' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1vVV85CpcEAOhgC6vdGRLoO9juXDJaZ61',
                title: { he: '6. ÎöÎôÎ¿ÎøÎö ÎûÎò Î×ÎÖÎòÎóÎôÎ¬ : Î£ÎªÎòÎòÎ¬ Î¿ÎñÎòÎÉÎÖ, ÎÉÎùÎÖÎòÎ¬, ÎòÎ×ÎºÎªÎòÎóÎòÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ . Î£ÎöÎ£Îƒ ÎºÎÖÎ®ÎòÎ¿ Î£ÎíÎ¿ÎÿÎòÎƒ ÎæÎ®ÎñÎö ÎöÎóÎæÎ¿ÎÖÎ¬ ÎòÎÉÎáÎÆÎ£ÎÖÎ¬. : (30 ÎôÎºÎòÎ¬)' },
                linkText: { he: '1. ÎºÎÖÎ®ÎòÎ¿ ÎæÎóÎæÎ¿ÎÖÎ¬: Î×ÎªÎÆÎ¬ Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ ÎªÎòÎ£ÎæÎÖÎØ ÎæÎæÎÖÎ¬ ÎöÎôÎ¿ ÎæÎ®ÎñÎö ÎöÎóÎæÎ¿ÎÖÎ¬ .mp4' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1ljn2Eqevuu4PATMsgUwU9PEOxxs-f4Ud',
                title: { he: '' },
                linkText: { he: '2. ÎºÎÖÎ®ÎòÎ¿ ÎæÎÉÎáÎÆÎ£ÎÖÎ¬: Î×ÎªÎÆÎ¬ Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ ÎªÎòÎ£ÎæÎÖÎØ ÎæÎæÎÖÎ¬ ÎöÎôÎ¿ ÎæÎ®ÎñÎö ÎÉÎáÎÆÎ£ÎÖÎ¬ .mp4' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/open?id=1VN4coDtzD-rrDZ2CFUJwfLj1E_PnZq4x-YhHDXKhYyo',
                title: { he: '7. ÎºÎÖÎ®ÎòÎ¿ - ÎöÎáÎùÎÖÎòÎ¬ Î×ÎíÎòÎøÎ×ÎòÎ¬ Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎñÎÖ ÎíÎòÎÆÎÖ ÎöÎ×ÎûÎöÎ×ÎÖÎØ.pdf' },
                linkText: { he: 'ÎöÎáÎùÎÖÎòÎ¬ Î×ÎíÎòÎøÎ×ÎòÎ¬ Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎñÎÖ ÎíÎòÎÆÎÖ ÎöÎ×ÎûÎöÎ×ÎÖÎØ.pdf' }
            },
            {
                type: 'link',
                url: 'https://docs.google.com/presentation/d/1Xexample_presentation_id/edit', // Placeholder
                title: { he: '8. ÎºÎÖÎ®ÎòÎ¿ Î£Î×ÎªÎÆÎ¬ ÎòÎíÎ¿ÎÿÎòÎáÎÖ ÎöÎôÎ¿ÎøÎö Î£Î®ÎÖÎ×ÎòÎ® ÎáÎÉÎ×ÎáÎÖ ÎáÎòÎ®ÎÉ:' },
                linkText: { he: '1. Î×ÎªÎÆÎ¬ ÎæÎáÎòÎ®ÎÉ Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö : ÎöÎáÎùÎÖÎòÎ¬ Î£ÎáÎÖÎºÎòÎÖ ÎòÎùÎÖÎÿÎòÎÖ Î£Î®ÎÖÎ×ÎòÎ® ÎáÎÉÎ×ÎáÎÖ ÎáÎòÎ®ÎÉ' }
            },
            {
                type: 'link',
                url: 'https://drive.google.com/file/d/18zxS04ValU2RNDKOWCh0m2qnNqoVnAEm/view?usp=drive_link',
                title: { he: '' },
                linkText: { he: '2. ÎíÎ¿ÎÿÎòÎƒ Î×ÎôÎòÎæÎæ Î£ÎöÎôÎ¿ÎøÎ¬ ÎªÎòÎòÎ¬ ÎæÎáÎòÎ®ÎÉ Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ' }
            }
        ],
        fields: [
            { id: 'entry.date_placeholder', type: 'date', label: { he: 'Î¬ÎÉÎ¿ÎÖÎÜ ÎøÎáÎÖÎíÎö Î£Î£ÎòÎ×ÎôÎö', en: 'Date of Entry', ar: 'Ï¬ÏºÏ▒┘èÏ« Ïº┘äÏ»Ï«┘ê┘ä', ru: 'ðöð░Ðéð░ ð▓Ðàð¥ð┤ð░' } },
            { id: 'entry.time_placeholder', type: 'time', label: { he: 'Î®ÎóÎö', en: 'Time', ar: 'Ïº┘ä┘ê┘éÏ¬', ru: 'ðÆÐÇðÁð╝ÐÅ' } },
            { id: 'entry.2128698376', type: 'text', label: { he: 'Î®ÎØ Î×Î£ÎÉ', en: 'Full Name', ar: 'Ïº┘äÏºÏ│┘à Ïº┘ä┘âÏº┘à┘ä', ru: 'ðƒð¥ð╗ð¢ð¥ðÁ ð©ð╝ÐÅ' } },
            { id: 'entry.482346055', type: 'select', label: { he: 'Î×ÎùÎ£ÎºÎö', en: 'Department', ar: 'Ïº┘ä┘éÏ│┘à', ru: 'ð×Ðéð┤ðÁð╗ðÁð¢ð©ðÁ' }, options: [
                { val: 'Î®ÎÖÎºÎòÎØ ÎÉ', label: { he: 'Î®ÎÖÎºÎòÎØ ÎÉ', en: 'Rehab A', ar: 'Ï¬Ïú┘ç┘è┘ä Ïú', ru: 'ðáðÁð░ð▒ð©ð╗ð©Ðéð░Ðåð©ÐÅ ðÉ' } },
                { val: 'Î®ÎÖÎºÎòÎØ Îæ', label: { he: 'Î®ÎÖÎºÎòÎØ Îæ', en: 'Rehab B', ar: 'Ï¬Ïú┘ç┘è┘ä Ï¿', ru: 'ðáðÁð░ð▒ð©ð╗ð©Ðéð░Ðåð©ÐÅ ðæ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÉ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÉ\'', en: 'Complex Nursing A', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ïú', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðÉ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ Îæ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ Îæ\'', en: 'Complex Nursing B', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ï¿', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðæ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÆ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÆ\'', en: 'Complex Nursing C', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ï¼', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðÆ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÉ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÉ', en: 'Ventilated A', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ïú', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðÉ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ Îæ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ Îæ', en: 'Ventilated B', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ï¿', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðæ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÆ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÆ', en: 'Ventilated C', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ï¼', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðÆ' } }
            ] }
        ]
    },
    'supportive_care': {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/formResponse',
        title: {
            he: 'Î×ÎÉÎ¿Îû ÎöÎôÎ¿ÎøÎö Î£ÎªÎòÎòÎ¬ ÎöÎ×ÎÿÎñÎ£ Î£ÎÖÎÖÎ®ÎòÎØ ÎùÎòÎº ÎöÎùÎòÎ£Îö ÎöÎáÎòÎÿÎö Î£Î×ÎòÎ¬ ÎòÎöÎóÎôÎñÎòÎ¬ ÎÿÎÖÎñÎòÎ£ÎÖÎòÎ¬ Î£ÎíÎòÎú ÎöÎùÎÖÎÖÎØ 2026.<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">ÎóÎòÎæÎô ÎÖÎºÎ¿, ÎæÎ¿ÎøÎòÎ¬ Î£ÎöÎªÎÿÎ¿ÎñÎòÎ¬ Î£ÎªÎòÎòÎ¬ ÎöÎóÎòÎæÎôÎÖÎØ , ÎæÎöÎªÎ£ÎùÎö !<br>Î£ÎöÎ£Îƒ Î¿Î®ÎÖÎ×Î¬ ÎöÎôÎ¿ÎøÎòÎ¬ ÎöÎùÎòÎæÎö Î®ÎóÎ£ÎÖÎÜ Î£ÎóÎæÎòÎ¿ ÎøÎùÎ£Îº Î×Î¬ÎöÎ£ÎÖÎÜ ÎºÎ£ÎÖÎÿÎ¬ÎÜ Î£ÎóÎæÎòÎôÎö ÎæÎùÎòÎôÎ® ÎöÎ¿ÎÉÎ®ÎòÎƒ ÎòÎæÎöÎ×Î®ÎÜ ÎøÎ£ ÎóÎòÎæÎô ÎÖÎæÎªÎó ÎÉÎùÎ¬ Î£Î®ÎáÎö . Î×Î®ÎÜ ÎöÎöÎôÎ¿ÎøÎö Îø- 3 Î®ÎóÎòÎ¬ .</span>',
            en: 'Training package for the treatment team on the dying patient law and end-of-life care preferences 2026.<br><br><span style="font-size: 16px; font-weight: normal; color: #555;">Dear employee, welcome to the staff, good luck!<br>Below is a list of mandatory trainings that you are required to complete as part of your onboarding process during your first month of employment. Thereafter, each employee is required to complete these trainings once a year. The total duration of the training is approximately 3 hours.</span>',
            ar: 'Ï¡Ï▓┘àÏ® Ï¬Ï»Ï▒┘èÏ¿ ┘ä┘üÏ▒┘è┘é Ïº┘äÏ╣┘äÏºÏ¼ ┘äÏ¬ÏÀÏ¿┘è┘é ┘éÏº┘å┘ê┘å Ïº┘ä┘àÏ▒┘èÏÂ Ïº┘ä┘àÏ¡Ï¬ÏÂÏ▒ ┘êÏ¬┘üÏÂ┘è┘äÏºÏ¬ Ïº┘äÏ▒Ï╣Ïº┘èÏ® ┘ü┘è ┘å┘çÏº┘èÏ® Ïº┘äÏ¡┘èÏºÏ® 2026.',
            ru: 'ð×ð▒ÐâÐçð░ÐÄÐëð©ð╣ ð┐ð░ð║ðÁÐé ð┤ð╗ÐÅ ð╗ðÁÐçð░ÐëðÁð│ð¥ ð┐ðÁÐÇÐüð¥ð¢ð░ð╗ð░ ð┐ð¥ ð┐ÐÇð©ð╝ðÁð¢ðÁð¢ð©ÐÄ ðÀð░ð║ð¥ð¢ð░ ð¥ð▒ Ðâð╝ð©ÐÇð░ÐÄÐëð©Ðà ð┐ð░Ðåð©ðÁð¢Ðéð░Ðà 2026.'
        },
        contentItems: [
            {
                type: 'link',
                url: 'https://www.gov.il/files/Health/dying_patient_law/story_html5.html',
                title: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£Î£ÎòÎ×ÎôÎ¬ Î×Î®Î¿Îô ÎöÎæÎ¿ÎÖÎÉÎòÎ¬: ÎíÎòÎú Î×ÎóÎ®Îö ÎæÎ×ÎùÎ®ÎæÎö Î¬ÎùÎÖÎ£Îö - ÎöÎóÎôÎñÎòÎ¬ ÎÿÎÖÎñÎòÎ£ ÎæÎíÎòÎú ÎöÎùÎÖÎÖÎØ' },
                desc: { he: 'ÎøÎáÎÖÎíÎö Î£ÎºÎÖÎ®ÎòÎ¿ Î£Î£Î×ÎÖÎôÎö ÎóÎªÎ×ÎÖÎ¬. (Î×Î®ÎÜ ÎûÎ×Îƒ Îø- 60 ÎôÎºÎòÎ¬ )' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/files/health/dying_patient_request/story_html5.html',
                title: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£Î£ÎòÎ×ÎôÎ¬ ÎùÎòÎ£Îö ÎáÎòÎÿÎö Î£Î×ÎòÎ¬' },
                desc: { he: 'ÎøÎáÎÖÎíÎö Î£ÎºÎÖÎ®ÎòÎ¿ Î£Î£Î×ÎÖÎôÎö ÎóÎªÎ×ÎÖÎ¬. (Î×Î®ÎÜ ÎûÎ×Îƒ Îø- 60 ÎôÎºÎòÎ¬ )' }
            },
            {
                type: 'video',
                id: 'IB5irFCuPxs',
                title: { he: 'ÎíÎ¿ÎÿÎòÎƒ ÎöÎíÎæÎ¿Îö: ÎøÎæÎ¿ ÎøÎ¬ÎæÎ¬ÎØ? ÎöÎáÎùÎÖÎòÎ¬ Î¿ÎñÎòÎÉÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬' },
                desc: { he: 'ÎªÎñÎÖÎÖÎö 2 ÎôÎºÎòÎ¬' }
            },
            {
                type: 'link',
                url: 'https://me.health.gov.il/older-adult/services-rights/before-saying-goodbye/advance-medical-directives/?source=5273',
                title: { he: 'Î×ÎÖÎ£ÎòÎÖ Î×ÎíÎ×ÎøÎÖÎØ: ÎøÎ£ ÎÉÎùÎô ÎòÎÉÎùÎ¬ ÎÖÎøÎòÎ£ÎÖÎØ Î£ÎöÎÖÎóÎ¿ÎÜ Î×Î¿ÎÉÎ® Î£Î×ÎªÎæ Î®Î£ ÎÉÎòÎæÎôÎƒ ÎøÎ®ÎÖÎ¿ÎòÎ¬ ÎæÎíÎòÎú ÎöÎùÎÖÎÖÎØ. ÎùÎòÎº ÎöÎùÎòÎ£Îö ÎöÎáÎòÎÿÎö Î£Î×ÎòÎ¬ Î×ÎÉÎñÎ®Î¿ Î£ÎøÎ£ ÎÉÎùÎô ÎòÎÉÎùÎ¬ Î£Î¬Î¬ ÎöÎáÎùÎÖÎòÎ¬ Î¿ÎñÎòÎÉÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬ ÎÉÎò Î£Î×ÎáÎòÎ¬ Î×ÎÖÎòÎñÎö ÎøÎòÎù ÎæÎ×ÎºÎ¿Îö Î®ÎæÎò ÎÖÎòÎÆÎôÎ¿Îò ÎóÎ£ ÎÖÎôÎÖ Î¿ÎòÎñÎÉ ÎÉÎùÎ¿ÎÉÎÖ ÎøÎùÎòÎ£Îö ÎáÎòÎÿÎö Î£Î×ÎòÎ¬.' },
                linkText: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£ÎíÎ¿ÎÿÎòÎƒ: Î×ÎÖÎ£ÎòÎÖ ÎÿÎòÎñÎí ÎöÎáÎùÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬' },
                desc: { he: 'ÎºÎ¿ÎÖÎÉÎö ÎòÎªÎñÎÖÎÖÎö ÎæÎíÎ¿ÎÿÎòÎƒ Îø- 10 ÎôÎºÎòÎ¬' }
            },
            {
                type: 'link',
                url: 'https://www.gov.il/he/service/dying-patient-request',
                title: { he: 'ÎöÎÆÎ®Î¬ Î×ÎíÎ×ÎøÎÖÎØ: Î®ÎÖÎ¿ÎòÎ¬ ÎûÎö ÎöÎòÎÉ ÎÖÎÖÎùÎòÎôÎÖ ÎòÎ×ÎÉÎñÎ®Î¿ Î£ÎøÎ£ ÎöÎ×ÎóÎòÎáÎÖÎÖÎáÎÖÎØ Î£Î×Î£ÎÉ ÎÿÎñÎíÎÖÎØ ÎóÎØ ÎöÎáÎùÎÖÎòÎ¬ Î¿ÎñÎòÎÉÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬ ÎÉÎò Î×ÎÖÎáÎòÎÖ Î×ÎÖÎòÎñÎö ÎøÎòÎù, Î£Î×ÎªÎæ ÎóÎ¬ÎÖÎôÎÖ ÎæÎò ÎÖÎÖÎºÎæÎó ÎøÎÖ ÎöÎØ ÎùÎòÎ£ÎÖÎØ ÎæÎ×ÎùÎ£Îö ÎùÎ®ÎòÎøÎ¬ Î×Î¿ÎñÎÉ (Î£Î£ÎÉ ÎÉÎñÎ®Î¿ÎòÎ¬ Î£ÎöÎùÎ£Î×Îö). ÎøÎ£ ÎûÎÉÎ¬, ÎøÎôÎÖ Î£ÎöÎÖÎ×ÎáÎó Î×ÎöÎÉÎ¿ÎøÎ¬ ÎöÎíÎæÎ£ ÎæÎ×ÎªÎæ Î®ÎæÎò Î£ÎÉ ÎÖÎòÎøÎ£Îò Î£ÎöÎæÎÖÎó ÎÉÎ¬ Î¿ÎªÎòÎáÎØ.' },
                linkText: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£ÎöÎáÎùÎÖÎòÎ¬ Î¿ÎñÎòÎÉÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬ ÎòÎÖÎñÎòÎÖ ÎøÎòÎù.' },
                desc: { he: 'ÎºÎ¿ÎÖÎÉÎö Îø- 10 ÎôÎºÎòÎ¬' }
            },
            {
                type: 'video',
                id: 'l17BmQmFA5E',
                title: { he: 'ÎºÎÖÎ®ÎòÎ¿ Î£ÎíÎ¿ÎÿÎòÎƒ ÎöÎíÎæÎ¿Îö ÎóÎ£ ÎÖÎñÎòÎÖ ÎøÎòÎù Î×Î¬Î×Î®ÎÜ' },
                desc: { he: 'ÎªÎñÎÖÎÖÎö Îø- 4 ÎôÎºÎòÎ¬' }
            }
        ],
        fields: [
            { id: 'entry.date_placeholder', type: 'date', label: { he: 'Î¬ÎÉÎ¿ÎÖÎÜ ÎøÎáÎÖÎíÎö Î£Î£ÎòÎ×ÎôÎö', en: 'Date of Entry', ar: 'Ï¬ÏºÏ▒┘èÏ« Ïº┘äÏ»Ï«┘ê┘ä', ru: 'ðöð░Ðéð░ ð▓Ðàð¥ð┤ð░' } },
            { id: 'entry.2128698376', type: 'text', label: { he: 'Î®ÎØ Î×Î£ÎÉ', en: 'Full Name', ar: 'Ïº┘äÏºÏ│┘à Ïº┘ä┘âÏº┘à┘ä', ru: 'ðƒð¥ð╗ð¢ð¥ðÁ ð©ð╝ÐÅ' } },
            { id: 'entry.482346055', type: 'select', label: { he: 'Î×ÎùÎ£ÎºÎö', en: 'Department', ar: 'Ïº┘ä┘éÏ│┘à', ru: 'ð×Ðéð┤ðÁð╗ðÁð¢ð©ðÁ' }, options: [
                { val: 'Î®ÎÖÎºÎòÎØ ÎÉ', label: { he: 'Î®ÎÖÎºÎòÎØ ÎÉ', en: 'Rehab A', ar: 'Ï¬Ïú┘ç┘è┘ä Ïú', ru: 'ðáðÁð░ð▒ð©ð╗ð©Ðéð░Ðåð©ÐÅ ðÉ' } },
                { val: 'Î®ÎÖÎºÎòÎØ Îæ', label: { he: 'Î®ÎÖÎºÎòÎØ Îæ', en: 'Rehab B', ar: 'Ï¬Ïú┘ç┘è┘ä Ï¿', ru: 'ðáðÁð░ð▒ð©ð╗ð©Ðéð░Ðåð©ÐÅ ðæ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÉ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÉ\'', en: 'Complex Nursing A', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ïú', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðÉ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ Îæ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ Îæ\'', en: 'Complex Nursing B', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ï¿', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðæ' } },
                { val: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÆ\'', label: { he: 'ÎíÎÖÎóÎòÎô Î×ÎòÎ¿ÎøÎæ ÎÆ\'', en: 'Complex Nursing C', ar: 'Ï¬┘àÏ▒┘èÏÂ ┘àÏ▒┘âÏ¿ Ï¼', ru: 'ðÜð¥ð╝ð┐ð╗ðÁð║Ðüð¢Ðïð╣ ÐâÐàð¥ð┤ ðÆ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÉ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÉ', en: 'Ventilated A', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ïú', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðÉ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ Îæ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ Îæ', en: 'Ventilated B', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ï¿', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðæ' } },
                { val: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÆ', label: { he: 'Î×ÎòÎáÎ®Î×ÎÖÎØ ÎÆ', en: 'Ventilated C', ar: 'Ï¬┘å┘üÏ│ ÏºÏÁÏÀ┘åÏºÏ╣┘è Ï¼', ru: 'ðÆðÁð¢Ðéð©ð╗ÐÅÐåð©ÐÅ ðÆ' } }
            ] },
            { id: 'entry.1264765965', type: 'radio', label: { he: 'Î®ÎÉÎ£Îö 1: Î×ÎöÎÖ Î×ÎÿÎ¿Î¬Îò ÎöÎ×Î¿ÎøÎûÎÖÎ¬ Î®Î£ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¬ÎòÎ×ÎÜ/ÎöÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ?', en: 'Question 1: What is the main goal of supportive/palliative care?', ar: 'Ïº┘äÏ│ÏñÏº┘ä 1: ┘àÏº ┘ç┘ê Ïº┘ä┘çÏ»┘ü Ïº┘äÏ▒Ïª┘èÏ│┘è ┘ä┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏ»ÏºÏ╣┘àÏ®/Ïº┘ä┘à┘äÏÀ┘üÏ®Ïƒ', ru: 'ðÆð¥ð┐ÐÇð¥Ðü 1: ðÜð░ð║ð¥ð▓ð░ ð¥Ðüð¢ð¥ð▓ð¢ð░ÐÅ ÐåðÁð╗Ðî ð┐ð¥ð┤ð┤ðÁÐÇðÂð©ð▓ð░ÐÄÐëðÁð╣/ð┐ð░ð╗ð╗ð©ð░Ðéð©ð▓ð¢ð¥ð╣ ÐéðÁÐÇð░ð┐ð©ð©?' }, options: [
                { val: 'Î£ÎöÎÉÎ¿ÎÖÎÜ ÎÉÎ¬ Î¬ÎòÎùÎ£Î¬ ÎöÎùÎÖÎÖÎØ ÎæÎÉÎ×ÎªÎóÎòÎ¬ ÎÿÎÖÎñÎòÎ£ÎÖÎØ Î×ÎÉÎ¿ÎÖÎøÎÖ ÎùÎÖÎÖÎØ ÎæÎ£ÎæÎô', label: { he: 'Î£ÎöÎÉÎ¿ÎÖÎÜ ÎÉÎ¬ Î¬ÎòÎùÎ£Î¬ ÎöÎùÎÖÎÖÎØ ÎæÎÉÎ×ÎªÎóÎòÎ¬ ÎÿÎÖÎñÎòÎ£ÎÖÎØ Î×ÎÉÎ¿ÎÖÎøÎÖ ÎùÎÖÎÖÎØ ÎæÎ£ÎæÎô', en: 'Prolong life expectancy through life-prolonging treatments only', ar: 'ÏÑÏÀÏº┘äÏ® ┘àÏ¬┘êÏ│ÏÀ Ïº┘äÏ╣┘àÏ▒ Ïº┘ä┘àÏ¬┘ê┘éÏ╣ ┘à┘å Ï«┘äÏº┘ä Ïº┘äÏ╣┘äÏºÏ¼ÏºÏ¬ Ïº┘ä┘àÏÀ┘è┘äÏ® ┘ä┘äÏ¡┘èÏºÏ® ┘ü┘éÏÀ', ru: 'ðƒÐÇð¥ð┤ð╗ðÁð¢ð©ðÁ ð┐ÐÇð¥ð┤ð¥ð╗ðÂð©ÐéðÁð╗Ðîð¢ð¥ÐüÐéð© ðÂð©ðÀð¢ð© Ðéð¥ð╗Ðîð║ð¥ Ðü ð┐ð¥ð╝ð¥ÐëÐîÐÄ ð┐ÐÇð¥ð┤ð╗ðÁð▓ð░ÐÄÐëð©Ðà ðÂð©ðÀð¢Ðî ð╝ðÁÐéð¥ð┤ð¥ð▓ ð╗ðÁÐçðÁð¢ð©ÐÅ' } },
                { val: 'Î£Î®ÎñÎ¿ ÎÉÎ¬ ÎÉÎÖÎøÎòÎ¬ ÎöÎùÎÖÎÖÎØ Î®Î£ ÎöÎ×ÎÿÎòÎñÎ£ ÎòÎæÎáÎÖ Î×Î®ÎñÎùÎ¬Îò ÎæÎÉÎ×ÎªÎóÎòÎ¬ ÎöÎºÎ£Îö ÎóÎ£ ÎíÎæÎ£ ÎòÎíÎÖÎ×ÎñÎÿÎòÎ×ÎÖÎØ', label: { he: 'Î£Î®ÎñÎ¿ ÎÉÎ¬ ÎÉÎÖÎøÎòÎ¬ ÎöÎùÎÖÎÖÎØ Î®Î£ ÎöÎ×ÎÿÎòÎñÎ£ ÎòÎæÎáÎÖ Î×Î®ÎñÎùÎ¬Îò ÎæÎÉÎ×ÎªÎóÎòÎ¬ ÎöÎºÎ£Îö ÎóÎ£ ÎíÎæÎ£ ÎòÎíÎÖÎ×ÎñÎÿÎòÎ×ÎÖÎØ', en: 'Improve the quality of life for the patient and their family by relieving suffering', ar: 'Ï¬Ï¡Ï│┘è┘å Ï¼┘êÏ»Ï® Ï¡┘èÏºÏ® Ïº┘ä┘àÏ▒┘èÏÂ ┘êÏúÏ│Ï▒Ï¬┘ç Ï╣┘å ÏÀÏ▒┘è┘é Ï¬Ï«┘ü┘è┘ü Ïº┘ä┘àÏ╣Ïº┘åÏºÏ® ┘êÏº┘äÏúÏ╣Ï▒ÏºÏÂ', ru: 'ðúð╗ÐâÐçÐêðÁð¢ð©ðÁ ð║ð░ÐçðÁÐüÐéð▓ð░ ðÂð©ðÀð¢ð© ð┐ð░Ðåð©ðÁð¢Ðéð░ ð© ðÁð│ð¥ ÐüðÁð╝Ðîð© ðÀð░ ÐüÐçðÁÐé ð¥ð▒ð╗ðÁð│ÐçðÁð¢ð©ÐÅ ÐüÐéÐÇð░ð┤ð░ð¢ð©ð╣ ð© Ðüð©ð╝ð┐Ðéð¥ð╝ð¥ð▓' } },
                { val: 'Î£Î×ÎáÎòÎó ÎÉÎ®ÎñÎòÎûÎÖÎØ ÎùÎòÎûÎ¿ÎÖÎØ ÎæÎ×ÎùÎ£ÎºÎòÎ¬ ÎñÎáÎÖÎ×ÎÖÎòÎ¬', label: { he: 'Î£Î×ÎáÎòÎó ÎÉÎ®ÎñÎòÎûÎÖÎØ ÎùÎòÎûÎ¿ÎÖÎØ ÎæÎ×ÎùÎ£ÎºÎòÎ¬ ÎñÎáÎÖÎ×ÎÖÎòÎ¬', en: 'Prevent readmissions to internal medicine departments', ar: '┘à┘åÏ╣ ÏÑÏ╣ÏºÏ»Ï® Ïº┘äÏÑÏ»Ï«Ïº┘ä Ïº┘ä┘àÏ¬┘âÏ▒Ï▒ ÏÑ┘ä┘ë Ïú┘éÏ│Ïº┘à Ïº┘äÏÀÏ¿ Ïº┘äÏ¿ÏºÏÀ┘å┘è', ru: 'ðƒÐÇðÁð┤ð¥Ðéð▓ÐÇð░ÐëðÁð¢ð©ðÁ ð┐ð¥ð▓Ðéð¥ÐÇð¢ÐïÐà ð│ð¥Ðüð┐ð©Ðéð░ð╗ð©ðÀð░Ðåð©ð╣ ð▓ ÐéðÁÐÇð░ð┐ðÁð▓Ðéð©ÐçðÁÐüð║ð©ðÁ ð¥Ðéð┤ðÁð╗ðÁð¢ð©ÐÅ' } },
                { val: 'Î£ÎöÎùÎ£ÎÖÎú ÎÉÎ¬ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¿ÎñÎòÎÉÎÖ ÎöÎ®ÎÆÎ¿Î¬ÎÖ ÎæÎÿÎÖÎñÎòÎ£ ÎíÎÖÎóÎòÎôÎÖ', label: { he: 'Î£ÎöÎùÎ£ÎÖÎú ÎÉÎ¬ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¿ÎñÎòÎÉÎÖ ÎöÎ®ÎÆÎ¿Î¬ÎÖ ÎæÎÿÎÖÎñÎòÎ£ ÎíÎÖÎóÎòÎôÎÖ', en: 'Replace routine medical care with nursing care', ar: 'ÏºÏ│Ï¬Ï¿Ï»Ïº┘ä Ïº┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏÀÏ¿┘èÏ® Ïº┘äÏ▒┘êÏ¬┘è┘å┘èÏ® Ï¿Ïº┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏ¬┘àÏ▒┘èÏÂ┘èÏ®', ru: 'ðùð░ð╝ðÁð¢ð░ ÐÇÐâÐéð©ð¢ð¢ð¥ð│ð¥ ð╝ðÁð┤ð©Ðåð©ð¢Ðüð║ð¥ð│ð¥ ÐâÐàð¥ð┤ð░ ð¢ð░ ÐüðÁÐüÐéÐÇð©ð¢Ðüð║ð©ð╣ ÐâÐàð¥ð┤' } }
            ] },
            { id: 'entry.1661314556', type: 'radio', label: { he: 'Î®ÎÉÎ£Îö 2: Î×ÎÖ Î×ÎòÎíÎ×ÎÜ Î£ÎºÎæÎòÎó ÎøÎÖ Î×ÎÿÎòÎñÎ£ Î×ÎòÎÆÎôÎ¿ Îø"ÎùÎòÎ£Îö ÎáÎòÎÿÎö Î£Î×ÎòÎ¬" ÎÉÎò "ÎùÎòÎ£Îö ÎæÎ®Î£Îæ ÎíÎòÎñÎÖ"?', en: 'Question 2: Who is authorized to determine that a patient is defined as "terminally ill"?', ar: 'Ïº┘äÏ│ÏñÏº┘ä 2: ┘à┘å Ïº┘ä┘àÏ«┘ê┘ä Ï¿Ï¬Ï¡Ï»┘èÏ» Ïú┘å Ïº┘ä┘àÏ▒┘èÏÂ ┘àÏÁ┘å┘ü Ï╣┘ä┘ë Ïú┘å┘ç "┘àÏ▒┘èÏÂ Ï¿┘àÏ▒ÏÂ Ï╣ÏÂÏº┘ä"Ïƒ', ru: 'ðÆð¥ð┐ÐÇð¥Ðü 2: ðÜÐéð¥ Ðâð┐ð¥ð╗ð¢ð¥ð╝ð¥ÐçðÁð¢ ð¥ð┐ÐÇðÁð┤ðÁð╗ÐÅÐéÐî, ÐçÐéð¥ ð┐ð░Ðåð©ðÁð¢Ðé ð©ð╝ðÁðÁÐé ÐüÐéð░ÐéÐâÐü "ÐéðÁÐÇð╝ð©ð¢ð░ð╗Ðîð¢Ðïð╣ ð▒ð¥ð╗Ðîð¢ð¥ð╣"?' }, options: [
                { val: 'ÎÉÎùÎòÎ¬ Î×ÎòÎíÎ×ÎøÎ¬ ÎæÎ×ÎùÎ£ÎºÎö', label: { he: 'ÎÉÎùÎòÎ¬ Î×ÎòÎíÎ×ÎøÎ¬ ÎæÎ×ÎùÎ£ÎºÎö', en: 'Registered nurse in the department', ar: '┘à┘àÏ▒ÏÂÏ® ┘àÏ│Ï¼┘äÏ® ┘ü┘è Ïº┘ä┘éÏ│┘à', ru: 'ðöð©ð┐ð╗ð¥ð╝ð©ÐÇð¥ð▓ð░ð¢ð¢ð░ÐÅ ð╝ðÁð┤ÐüðÁÐüÐéÐÇð░ ð▓ ð¥Ðéð┤ðÁð╗ðÁð¢ð©ð©' } },
                { val: 'ÎóÎòÎæÎô/Î¬ ÎíÎòÎªÎÖÎÉÎ£ÎÖ/Î¬', label: { he: 'ÎóÎòÎæÎô/Î¬ ÎíÎòÎªÎÖÎÉÎ£ÎÖ/Î¬', en: 'Social worker', ar: 'ÏúÏ«ÏÁÏºÏª┘è ÏºÏ¼Ï¬┘àÏºÏ╣┘è', ru: 'ðíð¥Ðåð©ð░ð╗Ðîð¢Ðïð╣ ÐÇð░ð▒ð¥Ðéð¢ð©ð║' } },
                { val: 'Î¿ÎòÎñÎÉ ÎÉÎùÎ¿ÎÉÎÖ', label: { he: 'Î¿ÎòÎñÎÉ ÎÉÎùÎ¿ÎÉÎÖ', en: 'Attending physician', ar: 'Ïº┘äÏÀÏ¿┘èÏ¿ Ïº┘ä┘àÏ│Ïñ┘ê┘ä', ru: 'ðøðÁÐçð░Ðëð©ð╣ ð▓ÐÇð░Ðç' } },
                { val: 'Î×ÎáÎöÎ£ ÎöÎíÎÖÎóÎòÎô Î®Î£ ÎöÎ×ÎòÎíÎô', label: { he: 'Î×ÎáÎöÎ£ ÎöÎíÎÖÎóÎòÎô Î®Î£ ÎöÎ×ÎòÎíÎô', en: 'Nursing director of the institution', ar: '┘àÏ»┘èÏ▒ Ïº┘äÏ¬┘àÏ▒┘èÏÂ ┘ü┘è Ïº┘ä┘àÏñÏ│Ï│Ï®', ru: 'ðöð©ÐÇðÁð║Ðéð¥ÐÇ ð┐ð¥ ÐüðÁÐüÐéÐÇð©ð¢Ðüð║ð¥ð╝Ðâ ð┤ðÁð╗Ðâ ÐâÐçÐÇðÁðÂð┤ðÁð¢ð©ÐÅ' } }
            ] },
            { id: 'entry.2002496322', type: 'radio', label: { he: 'Î®ÎÉÎ£Îö 3: ÎÉÎÖÎûÎö Î×ÎöÎóÎºÎ¿ÎòÎáÎòÎ¬ ÎöÎæÎÉÎÖÎØ Î×ÎÉÎñÎÖÎÖÎƒ ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ/ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ?', en: 'Question 3: Which of the following principles characterizes supportive/palliative care?', ar: 'Ïº┘äÏ│ÏñÏº┘ä 3: Ïú┘è ┘à┘å Ïº┘ä┘àÏ¿ÏºÏ»Ïª Ïº┘äÏ¬Ïº┘ä┘èÏ® ┘è┘à┘èÏ▓ Ïº┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏ»ÏºÏ╣┘àÏ®/Ïº┘ä┘à┘äÏÀ┘üÏ®Ïƒ', ru: 'ðÆð¥ð┐ÐÇð¥Ðü 3: ðÜð░ð║ð¥ð╣ ð©ðÀ Ðüð╗ðÁð┤ÐâÐÄÐëð©Ðà ð┐ÐÇð©ð¢Ðåð©ð┐ð¥ð▓ Ðàð░ÐÇð░ð║ÐéðÁÐÇð©ðÀÐâðÁÐé ð┐ð¥ð┤ð┤ðÁÐÇðÂð©ð▓ð░ÐÄÐëÐâÐÄ/ð┐ð░ð╗ð╗ð©ð░Ðéð©ð▓ð¢ÐâÐÄ ð┐ð¥ð╝ð¥ÐëÐî?' }, options: [
                { val: 'ÎöÎÉÎªÎ¬ Î¬ÎöÎ£ÎÖÎÜ ÎöÎ×ÎòÎòÎ¬ ÎæÎ×ÎªÎæÎÖÎØ Î®Î£ ÎíÎæÎ£ Î×Î®Î×ÎóÎòÎ¬ÎÖ', label: { he: 'ÎöÎÉÎªÎ¬ Î¬ÎöÎ£ÎÖÎÜ ÎöÎ×ÎòÎòÎ¬ ÎæÎ×ÎªÎæÎÖÎØ Î®Î£ ÎíÎæÎ£ Î×Î®Î×ÎóÎòÎ¬ÎÖ', en: 'Accelerating the death process in cases of significant suffering', ar: 'Ï¬Ï│Ï▒┘èÏ╣ Ï╣┘à┘ä┘èÏ® Ïº┘ä┘à┘êÏ¬ ┘ü┘è Ï¡Ïº┘äÏºÏ¬ Ïº┘ä┘àÏ╣Ïº┘åÏºÏ® Ïº┘ä┘âÏ¿┘èÏ▒Ï®', ru: 'ðúÐüð║ð¥ÐÇðÁð¢ð©ðÁ ð┐ÐÇð¥ÐåðÁÐüÐüð░ Ðüð╝ðÁÐÇÐéð© ð▓ Ðüð╗ÐâÐçð░ÐÅÐà ðÀð¢ð░Ðçð©ÐéðÁð╗Ðîð¢ÐïÐà ÐüÐéÐÇð░ð┤ð░ð¢ð©ð╣' } },
                { val: 'ÎöÎÖÎ×ÎáÎóÎòÎ¬ Î×ÎòÎùÎ£ÎÿÎ¬ Î×ÎÿÎÖÎñÎòÎ£ÎÖÎØ Î¿ÎñÎòÎÉÎÖÎÖÎØ', label: { he: 'ÎöÎÖÎ×ÎáÎóÎòÎ¬ Î×ÎòÎùÎ£ÎÿÎ¬ Î×ÎÿÎÖÎñÎòÎ£ÎÖÎØ Î¿ÎñÎòÎÉÎÖÎÖÎØ', en: 'Complete avoidance of medical treatments', ar: 'Ï¬Ï¼┘åÏ¿ Ïº┘äÏ╣┘äÏºÏ¼ÏºÏ¬ Ïº┘äÏÀÏ¿┘èÏ® Ï¬┘àÏº┘à┘ïÏº', ru: 'ðƒð¥ð╗ð¢Ðïð╣ ð¥Ðéð║ð░ðÀ ð¥Ðé ð╝ðÁð┤ð©Ðåð©ð¢Ðüð║ð©Ðà ð┐ÐÇð¥ÐåðÁð┤ÐâÐÇ' } },
                { val: 'Î®ÎÖÎ£ÎòÎæ ÎöÎÖÎæÎÿÎÖÎØ ÎñÎÖÎûÎÖÎÖÎØ, ÎáÎñÎ®ÎÖÎÖÎØ ÎòÎ¿ÎòÎùÎáÎÖÎÖÎØ ÎæÎÿÎÖÎñÎòÎ£', label: { he: 'Î®ÎÖÎ£ÎòÎæ ÎöÎÖÎæÎÿÎÖÎØ ÎñÎÖÎûÎÖÎÖÎØ, ÎáÎñÎ®ÎÖÎÖÎØ ÎòÎ¿ÎòÎùÎáÎÖÎÖÎØ ÎæÎÿÎÖÎñÎòÎ£', en: 'Integration of physical, mental, and spiritual aspects in care', ar: 'Ï»┘àÏ¼ Ïº┘äÏ¼┘êÏº┘åÏ¿ Ïº┘äÏ¼Ï│Ï»┘èÏ® ┘êÏº┘äÏ╣┘é┘ä┘èÏ® ┘êÏº┘äÏ▒┘êÏ¡┘èÏ® ┘ü┘è Ïº┘äÏ▒Ï╣Ïº┘èÏ®', ru: 'ðÿð¢ÐéðÁð│ÐÇð░Ðåð©ÐÅ Ðäð©ðÀð©ÐçðÁÐüð║ð©Ðà, ð┐Ðüð©Ðàð©ÐçðÁÐüð║ð©Ðà ð© ð┤ÐâÐàð¥ð▓ð¢ÐïÐà ð░Ðüð┐ðÁð║Ðéð¥ð▓ ð▓ ÐâÐàð¥ð┤' } },
                { val: 'Î×Î¬Îƒ ÎÿÎÖÎñÎòÎ£ Î¿Îº ÎæÎ®Î£Îæ ÎöÎíÎòÎñÎÖ Î®Î£ ÎöÎùÎÖÎÖÎØ', label: { he: 'Î×Î¬Îƒ ÎÿÎÖÎñÎòÎ£ Î¿Îº ÎæÎ®Î£Îæ ÎöÎíÎòÎñÎÖ Î®Î£ ÎöÎùÎÖÎÖÎØ', en: 'Providing treatment only at the final stage of life', ar: 'Ï¬┘ê┘ü┘èÏ▒ Ïº┘äÏ╣┘äÏºÏ¼ ┘ü┘éÏÀ ┘ü┘è Ïº┘ä┘àÏ▒Ï¡┘äÏ® Ïº┘äÏúÏ«┘èÏ▒Ï® ┘à┘å Ïº┘äÏ¡┘èÏºÏ®', ru: 'ðƒÐÇðÁð┤ð¥ÐüÐéð░ð▓ð╗ðÁð¢ð©ðÁ ÐâÐàð¥ð┤ð░ Ðéð¥ð╗Ðîð║ð¥ ð¢ð░ ð┐ð¥Ðüð╗ðÁð┤ð¢ðÁð╣ ÐüÐéð░ð┤ð©ð© ðÂð©ðÀð¢ð©' } }
            ] },
            { id: 'entry.212725873', type: 'radio', label: { he: 'Î®ÎÉÎ£Îö 4: Î×Îö Î×ÎùÎòÎÖÎæ ÎöÎªÎòÎòÎ¬ Î£ÎóÎ®ÎòÎ¬ ÎæÎóÎ¬ ÎºÎæÎ£Î¬ ÎùÎòÎ£Îö ÎáÎòÎÿÎö Î£Î×ÎòÎ¬ Î£Î×ÎùÎ£ÎºÎö?', en: 'Question 4: What is the team obligated to do when admitting a terminally ill patient?', ar: 'Ïº┘äÏ│ÏñÏº┘ä 4: ┘àÏº Ïº┘äÏ░┘è ┘èÏ¼Ï¿ Ï╣┘ä┘ë Ïº┘ä┘üÏ▒┘è┘é Ïº┘ä┘é┘èÏº┘à Ï¿┘ç Ï╣┘åÏ» ÏÑÏ»Ï«Ïº┘ä ┘àÏ▒┘èÏÂ ┘àÏÁÏºÏ¿ Ï¿┘àÏ▒ÏÂ Ï╣ÏÂÏº┘äÏƒ', ru: 'ðÆð¥ð┐ÐÇð¥Ðü 4: ðºÐéð¥ ð¥ð▒ÐÅðÀð░ð¢ð░ Ðüð┤ðÁð╗ð░ÐéÐî ð║ð¥ð╝ð░ð¢ð┤ð░ ð┐ÐÇð© ð┐ð¥ÐüÐéÐâð┐ð╗ðÁð¢ð©ð© ÐéðÁÐÇð╝ð©ð¢ð░ð╗Ðîð¢ð¥ð│ð¥ ð▒ð¥ð╗Ðîð¢ð¥ð│ð¥?' }, options: [
                { val: 'Î£ÎöÎÖÎ×ÎáÎó Î×Î®ÎÖÎùÎö ÎóÎØ ÎæÎáÎÖ ÎöÎ×Î®ÎñÎùÎö ÎóÎô Î£ÎöÎùÎ×Î¿Îö ÎæÎ×ÎªÎæ', label: { he: 'Î£ÎöÎÖÎ×ÎáÎó Î×Î®ÎÖÎùÎö ÎóÎØ ÎæÎáÎÖ ÎöÎ×Î®ÎñÎùÎö ÎóÎô Î£ÎöÎùÎ×Î¿Îö ÎæÎ×ÎªÎæ', en: 'Avoid talking to family members until the condition worsens', ar: 'Ï¬Ï¼┘åÏ¿ Ïº┘äÏ¬Ï¡Ï»Ï½ ┘àÏ╣ Ïú┘üÏ▒ÏºÏ» Ïº┘äÏúÏ│Ï▒Ï® Ï¡Ï¬┘ë Ï¬Ï¬Ï»┘ç┘êÏ▒ Ïº┘äÏ¡Ïº┘äÏ®', ru: 'ðÿðÀð▒ðÁð│ð░ÐéÐî ÐÇð░ðÀð│ð¥ð▓ð¥ÐÇð¥ð▓ Ðü Ðçð╗ðÁð¢ð░ð╝ð© ÐüðÁð╝Ðîð© ð┤ð¥ ÐâÐàÐâð┤ÐêðÁð¢ð©ÐÅ Ðüð¥ÐüÐéð¥ÐÅð¢ð©ÐÅ' } },
                { val: 'Î£ÎæÎ¿Î¿ ÎºÎÖÎòÎØ ÎöÎáÎùÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬ ÎòÎ£ÎøÎæÎô ÎÉÎ¬ Î¿ÎªÎòÎƒ ÎöÎ×ÎÿÎòÎñÎ£', label: { he: 'Î£ÎæÎ¿Î¿ ÎºÎÖÎòÎØ ÎöÎáÎùÎÖÎòÎ¬ Î×ÎºÎôÎÖÎ×ÎòÎ¬ ÎòÎ£ÎøÎæÎô ÎÉÎ¬ Î¿ÎªÎòÎƒ ÎöÎ×ÎÿÎòÎñÎ£', en: 'Inquire about advance directives and respect patient wishes', ar: 'Ïº┘äÏºÏ│Ï¬┘üÏ│ÏºÏ▒ Ï╣┘å Ïº┘äÏ¬┘êÏ¼┘è┘çÏºÏ¬ Ïº┘ä┘àÏ│Ï¿┘éÏ® ┘êÏºÏ¡Ï¬Ï▒Ïº┘à Ï▒Ï║Ï¿Ï® Ïº┘ä┘àÏ▒┘èÏÂ', ru: 'ðÆÐïÐÅÐüð¢ð©ÐéÐî ð¢ð░ð╗ð©Ðçð©ðÁ ð┐ÐÇðÁð┤ð▓ð░ÐÇð©ÐéðÁð╗Ðîð¢ÐïÐà Ðâð║ð░ðÀð░ð¢ð©ð╣ ð© Ðâð▓ð░ðÂð░ÐéÐî ð▓ð¥ð╗ÐÄ ð┐ð░Ðåð©ðÁð¢Ðéð░' } },
                { val: 'Î£ÎöÎóÎæÎÖÎ¿ ÎÉÎ¬ ÎöÎùÎòÎ£Îö ÎÉÎòÎÿÎòÎ×ÎÿÎÖÎ¬ Î£ÎæÎÖÎ¬ ÎùÎòÎ£ÎÖÎØ ÎøÎ£Î£ÎÖ', label: { he: 'Î£ÎöÎóÎæÎÖÎ¿ ÎÉÎ¬ ÎöÎùÎòÎ£Îö ÎÉÎòÎÿÎòÎ×ÎÿÎÖÎ¬ Î£ÎæÎÖÎ¬ ÎùÎòÎ£ÎÖÎØ ÎøÎ£Î£ÎÖ', en: 'Automatically transfer the patient to a general hospital', ar: '┘å┘é┘ä Ïº┘ä┘àÏ▒┘èÏÂ Ï¬┘ä┘éÏºÏª┘è┘ïÏº ÏÑ┘ä┘ë ┘àÏ│Ï¬Ï┤┘ü┘ë Ï╣Ïº┘à', ru: 'ðÉð▓Ðéð¥ð╝ð░Ðéð©ÐçðÁÐüð║ð© ð┐ðÁÐÇðÁð▓ð¥ð┤ð©ÐéÐî ð┐ð░Ðåð©ðÁð¢Ðéð░ ð▓ ð▒ð¥ð╗Ðîð¢ð©ÐåÐâ ð¥ð▒ÐëðÁð│ð¥ ð┐ÐÇð¥Ðäð©ð╗ÐÅ' } },
                { val: 'Î£ÎöÎñÎíÎÖÎº ÎÿÎÖÎñÎòÎ£ÎÖÎØ ÎáÎ£ÎòÎòÎÖÎØ', label: { he: 'Î£ÎöÎñÎíÎÖÎº ÎÿÎÖÎñÎòÎ£ÎÖÎØ ÎáÎ£ÎòÎòÎÖÎØ', en: 'Stop concomitant treatments', ar: '┘ê┘é┘ü Ïº┘äÏ╣┘äÏºÏ¼ÏºÏ¬ Ïº┘ä┘àÏÁÏºÏ¡Ï¿Ï®', ru: 'ðƒÐÇðÁð║ÐÇð░Ðéð©ÐéÐî Ðüð¥ð┐ÐâÐéÐüÐéð▓ÐâÐÄÐëðÁðÁ ð╗ðÁÐçðÁð¢ð©ðÁ' } }
            ] },
            { id: 'entry.1821630031', type: 'radio', label: { he: 'Î®ÎÉÎ£Îö 5: ÎÉÎÖÎûÎö Î¬ÎñÎºÎÖÎô ÎÖÎ® Î£Î×ÎóÎ¿ÎÜ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¬ÎòÎ×ÎÜ ÎæÎÉÎ¿ÎÆÎòÎƒ?', en: 'Question 5: What role does the supportive care system have in the organization?', ar: 'Ïº┘äÏ│ÏñÏº┘ä 5: ┘àÏº ┘ç┘ê Ï»┘êÏ▒ ┘åÏ©Ïº┘à Ïº┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏ»ÏºÏ╣┘àÏ® ┘ü┘è Ïº┘ä┘à┘åÏ©┘àÏ®Ïƒ', ru: 'ðÆð¥ð┐ÐÇð¥Ðü 5: ðÜð░ð║ð¥ð▓ð░ ÐÇð¥ð╗Ðî Ðüð©ÐüÐéðÁð╝Ðï ð┐ð¥ð┤ð┤ðÁÐÇðÂð©ð▓ð░ÐÄÐëðÁð╣ ÐéðÁÐÇð░ð┐ð©ð© ð▓ ð¥ÐÇð│ð░ð¢ð©ðÀð░Ðåð©ð©?' }, options: [
                { val: 'Î×Î¬Îƒ ÎÿÎÖÎñÎòÎ£ ÎíÎÖÎóÎòÎôÎÖ ÎæÎíÎÖÎíÎÖ ÎæÎ£ÎæÎô', label: { he: 'Î×Î¬Îƒ ÎÿÎÖÎñÎòÎ£ ÎíÎÖÎóÎòÎôÎÖ ÎæÎíÎÖÎíÎÖ ÎæÎ£ÎæÎô', en: 'Providing basic nursing care only', ar: 'Ï¬┘ê┘ü┘èÏ▒ Ïº┘äÏ▒Ï╣Ïº┘èÏ® Ïº┘äÏ¬┘àÏ▒┘èÏÂ┘èÏ® Ïº┘äÏúÏ│ÏºÏ│┘èÏ® ┘ü┘éÏÀ', ru: 'ðƒÐÇðÁð┤ð¥ÐüÐéð░ð▓ð╗ðÁð¢ð©ðÁ Ðéð¥ð╗Ðîð║ð¥ ð▒ð░ðÀð¥ð▓ð¥ð│ð¥ ÐüðÁÐüÐéÐÇð©ð¢Ðüð║ð¥ð│ð¥ ÐâÐàð¥ð┤ð░' } },
                { val: 'ÎºÎæÎ£Î¬ ÎöÎùÎ£ÎÿÎòÎ¬ Î×Î®ÎñÎÿÎÖÎòÎ¬ ÎóÎæÎòÎ¿ ÎöÎ×ÎÿÎòÎñÎ£', label: { he: 'ÎºÎæÎ£Î¬ ÎöÎùÎ£ÎÿÎòÎ¬ Î×Î®ÎñÎÿÎÖÎòÎ¬ ÎóÎæÎòÎ¿ ÎöÎ×ÎÿÎòÎñÎ£', en: 'Making legal decisions for the patient', ar: 'ÏºÏ¬Ï«ÏºÏ░ Ïº┘ä┘éÏ▒ÏºÏ▒ÏºÏ¬ Ïº┘ä┘éÏº┘å┘ê┘å┘èÏ® ┘å┘èÏºÏ¿Ï® Ï╣┘å Ïº┘ä┘àÏ▒┘èÏÂ', ru: 'ðƒÐÇð©ð¢ÐÅÐéð©ðÁ ÐÄÐÇð©ð┤ð©ÐçðÁÐüð║ð©Ðà ÐÇðÁÐêðÁð¢ð©ð╣ ðÀð░ ð┐ð░Ðåð©ðÁð¢Ðéð░' } },
                { val: 'ÎÖÎÖÎóÎòÎÑ, ÎöÎøÎòÎòÎáÎö, ÎöÎÿÎ×ÎóÎö ÎòÎöÎøÎ®Î¿Î¬ ÎªÎòÎòÎ¬ÎÖÎØ ÎæÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ', label: { he: 'ÎÖÎÖÎóÎòÎÑ, ÎöÎøÎòÎòÎáÎö, ÎöÎÿÎ×ÎóÎö ÎòÎöÎøÎ®Î¿Î¬ ÎªÎòÎòÎ¬ÎÖÎØ ÎæÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ', en: 'Counseling, guidance, implementation, and staff training', ar: 'Ïº┘äÏºÏ│Ï¬Ï┤ÏºÏ▒Ï® ┘êÏº┘äÏ¬┘êÏ¼┘è┘ç ┘êÏº┘äÏ¬┘å┘ü┘èÏ░ ┘êÏ¬Ï»Ï▒┘èÏ¿ Ïº┘ä┘à┘êÏ©┘ü┘è┘å', ru: 'ðÜð¥ð¢ÐüÐâð╗ÐîÐéð©ÐÇð¥ð▓ð░ð¢ð©ðÁ, ÐÇÐâð║ð¥ð▓ð¥ð┤ÐüÐéð▓ð¥, ð▓ð¢ðÁð┤ÐÇðÁð¢ð©ðÁ ð© ð¥ð▒ÐâÐçðÁð¢ð©ðÁ ð┐ðÁÐÇÐüð¥ð¢ð░ð╗ð░' } },
                { val: 'ÎÉÎùÎ¿ÎÖÎòÎ¬ ÎæÎ£ÎóÎôÎÖÎ¬ ÎóÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¬Î¿ÎòÎñÎ¬ÎÖ ÎæÎ×ÎùÎ£ÎºÎòÎ¬', label: { he: 'ÎÉÎùÎ¿ÎÖÎòÎ¬ ÎæÎ£ÎóÎôÎÖÎ¬ ÎóÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎ¬Î¿ÎòÎñÎ¬ÎÖ ÎæÎ×ÎùÎ£ÎºÎòÎ¬', en: 'Exclusive responsibility for medical treatment in the wards', ar: 'Ïº┘ä┘àÏ│Ïñ┘ê┘ä┘èÏ® Ïº┘äÏ¡ÏÁÏ▒┘èÏ® Ï╣┘å Ïº┘äÏ╣┘äÏºÏ¼ Ïº┘äÏÀÏ¿┘è ┘ü┘è Ïº┘äÏú┘éÏ│Ïº┘à', ru: 'ðÿÐüð║ð╗ÐÄÐçð©ÐéðÁð╗Ðîð¢ð░ÐÅ ð¥Ðéð▓ðÁÐéÐüÐéð▓ðÁð¢ð¢ð¥ÐüÐéÐî ðÀð░ ð╝ðÁð┤ð©ð║ð░ð╝ðÁð¢Ðéð¥ðÀð¢ð¥ðÁ ð╗ðÁÐçðÁð¢ð©ðÁ ð▓ ð¥Ðéð┤ðÁð╗ðÁð¢ð©ÐÅÐà' } }
            ] }
        ]
    }
};

let currentQuizId = null;
let currentLanguage = 'he';

// UI Strings mapping
const tStrings = {
    'he': { 'submit': 'Î®Î£ÎÖÎùÎö Î£Î×ÎóÎ¿ÎøÎ¬', 'required': 'Î®ÎôÎö ÎùÎòÎæÎö', 'success': 'ÎöÎ¬Î®ÎòÎæÎòÎ¬ ÎáÎ®Î£ÎùÎò ÎæÎöÎªÎ£ÎùÎö Î£ÎÆÎòÎÆÎ£ ÎÆÎÖÎ£ÎÖÎòÎáÎòÎ¬!', 'processing': 'Î®ÎòÎ£Îù...', 'close': 'ÎùÎûÎ¿Îö Î£Î×ÎíÎÜ ÎöÎ¿ÎÉÎ®ÎÖ' },
    'en': { 'submit': 'Submit', 'required': 'Required field', 'success': 'Submitted successfully to Google Sheets!', 'processing': 'Sending...', 'close': 'Return to main screen' },
    'ar': { 'submit': 'ÏÑÏ▒Ï│Ïº┘ä', 'required': '┘àÏÀ┘ä┘êÏ¿', 'success': 'Ï¬┘à Ïº┘äÏÑÏ▒Ï│Ïº┘ä Ï¿┘åÏ¼ÏºÏ¡!', 'processing': 'Ï¼ÏºÏ▒┘ì Ïº┘äÏÑÏ▒Ï│Ïº┘ä...', 'close': 'Ïº┘äÏ╣┘êÏ»Ï® ÏÑ┘ä┘ë Ïº┘äÏ┤ÏºÏ┤Ï® Ïº┘äÏ▒Ïª┘èÏ│┘èÏ®' },
    'ru': { 'submit': 'ð×Ðéð┐ÐÇð░ð▓ð©ÐéÐî', 'required': 'ð×ð▒ÐÅðÀð░ÐéðÁð╗Ðîð¢ð¥ðÁ ð┐ð¥ð╗ðÁ', 'success': 'ðúÐüð┐ðÁÐêð¢ð¥ ð¥Ðéð┐ÐÇð░ð▓ð╗ðÁð¢ð¥!', 'processing': 'ð×Ðéð┐ÐÇð░ð▓ð║ð░...', 'close': 'ðÆðÁÐÇð¢ÐâÐéÐîÐüÐÅ ð¢ð░ ð│ð╗ð░ð▓ð¢Ðïð╣ Ðìð║ÐÇð░ð¢' }
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
        return lbl === 'Î®ÎØ Î×Î£ÎÉ' || lbl === 'Î×ÎùÎ£ÎºÎö' || lbl === 'Î¬ÎÉÎ¿ÎÖÎÜ' || lbl === 'Î¬ÎÉÎ¿ÎÖÎÜ ÎøÎáÎÖÎíÎö Î£Î£ÎòÎ×ÎôÎö' || lbl === 'Î®ÎóÎö' || lbl === 'Î®ÎØ ÎöÎóÎòÎæÎô';
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
            
            if (field.label['he'] === 'Î×ÎùÎ£ÎºÎö' || field.label['en'] === 'Department') {
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
                    <a href="https://www.youtube.com/watch?v=${item.id}" target="_blank" style="color: var(--primary-color);">ÎÉÎØ ÎöÎíÎ¿ÎÿÎòÎƒ Î£ÎÉ Î×ÎòÎñÎóÎ£, Î£ÎùÎÑ/ÎÖ ÎøÎÉÎƒ Î£ÎªÎñÎÖÎÖÎö ÎæÎÖÎòÎÿÎÖÎòÎæ</a>
                </div>`;
            } else if (item.type === 'link') {
                let linkText = item.linkText ? (item.linkText[lang] || item.linkText['he']) : '­ƒöù ÎøÎáÎÖÎíÎö Î£ÎºÎÖÎ®ÎòÎ¿';
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
                    <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" style="color: var(--primary-color);">ÎÉÎØ ÎöÎíÎ¿ÎÿÎòÎƒ Î£ÎÉ Î×ÎòÎñÎóÎ£, Î£ÎùÎÑ/ÎÖ ÎøÎÉÎƒ Î£ÎªÎñÎÖÎÖÎö ÎæÎÖÎòÎÿÎÖÎòÎæ</a>
                </div>
            </div>`;
        });
        html += `</div>`;
    }
    
    if (quiz.links && quiz.links.length > 0) {
        html += `<div class="quiz-links" style="margin-bottom: 20px;">`;
        quiz.links.forEach(l => {
            html += `<a href="${l.url}" target="_blank" class="quiz-external-link" style="display:block; padding:12px; background:#e3f2fd; border-radius:5px; margin-bottom:10px; text-decoration:none; font-weight:bold; color: #0277bd;">­ƒöù ${l.text[lang]}</a>`;
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
    
    let userName = 'ÎóÎòÎæÎô (Î£ÎÉ ÎªÎòÎÖÎƒ Î®ÎØ)';
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
