/**
 * app.js - Î£ÎòÎÆÎÖÎºÎö ÎÉÎÖÎáÎÿÎ¿ÎÉÎºÎÿÎÖÎæÎÖÎ¬, ÎôÎÖÎáÎ×ÎÖÎ¬ ÎòÎ×ÎíÎòÎáÎøÎ¿ÎáÎ¬ Î×ÎòÎ£ Google Sheets
 * ÎóÎæÎòÎ¿ ÎñÎòÎ¿ÎÿÎ£ ÎöÎóÎ×ÎòÎ¬Îö Î£ÎºÎÖÎôÎòÎØ ÎöÎÉÍÀÎùÍ▓ÎÖÎòÍ╝Î¬ ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ ÎæÎÖÎ®Î¿ÎÉÎ£ (IANG)
 */

// Î×ÎÉÎÆÎ¿ 18 ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎöÎôÎÖÎñÎòÎ£ÎÿÎÖÎæÎÖÎÖÎØ Î®Î£ Î®ÎáÎ¬ 2026
const DEFAULT_COURSES = [
  {
    id: "1",
    title: "Î×ÎáÎöÎÖÎÆÎòÎ¬ ÎÖÎÖÎ®ÎòÎ×ÎÖÎ¬ Î£ÎÉÎùÎÖÎòÎ¬ ÎÉÎùÎ¿ÎÉÎÖÎòÎ¬",
    target: "ÎÉÎùÎÖÎòÎ¬ ÎÉÎùÎ¿ÎÉÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    startDate: "05/11/2026",
    endDate: "17/12/2026",
    day: "ÎÖÎòÎØ ÎùÎ×ÎÖÎ®ÎÖ",
    hours: "16:30 ÎóÎô 18:00",
    price: "900 Ôé¬",
    location: "Zoom",
    notes: "Î¬ÎòÎøÎáÎÖÎ¬ Î×ÎºÎÖÎñÎö ÎöÎ×ÎºÎáÎö ÎøÎ£ÎÖÎØ ÎÖÎÖÎ®ÎòÎ×ÎÖÎÖÎØ Î£ÎáÎÖÎöÎòÎ£, Î×ÎáÎöÎÖÎÆÎòÎ¬ ÎòÎöÎòÎæÎ£Î¬ ÎªÎòÎòÎ¬ÎÖÎØ ÎæÎ×ÎóÎ¿ÎÜ ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ ÎòÎöÎøÎ¿ÎòÎáÎÖ."
  },
  {
    id: "2",
    title: "Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "11/10/2026",
    endDate: "20/12/2026",
    day: "ÎÖÎòÎØ Î¿ÎÉÎ®ÎòÎƒ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎøÎ®Î¿Îö Î£Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎöÎóÎòÎíÎºÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö Î£Î®Î×ÎÖÎ¿Îö ÎóÎ£ ÎæÎÿÎÖÎùÎòÎ¬ ÎöÎ×ÎÿÎòÎñÎ£ÎÖÎØ ÎòÎöÎªÎòÎòÎ¬."
  },
  {
    id: "3",
    title: "ÎóÎôÎøÎòÎƒ ÎÖÎôÎó ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö ÎòÎæÎñÎíÎÖÎøÎòÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎÉÎùÎÖÎòÎ¬ ÎÉÎùÎ¿ÎÉÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    startDate: "17/12/2026",
    endDate: "25/02/2027",
    day: "ÎÖÎòÎØ ÎùÎ×ÎÖÎ®ÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎóÎôÎøÎòÎƒ ÎÖÎôÎó ÎòÎñÎ¿ÎºÎÖÎØ ÎáÎæÎùÎ¿ÎÖÎØ ÎæÎ¬ÎùÎòÎØ ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö, ÎñÎíÎÖÎøÎòÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö, Î×ÎóÎ¿ÎÜ ÎøÎ¿ÎòÎáÎÖ ÎòÎ×ÎùÎ£ÎòÎ¬ Î×Î×ÎòÎ®ÎøÎòÎ¬ ÎæÎûÎºÎƒ."
  },
  {
    id: "4",
    title: "ÎæÎ¿ÎÖÎÉÎòÎ¬ ÎöÎóÎòÎæÎô - ÎáÎÉÎ×Îƒ ÎáÎòÎ®ÎÉ Î¬ÎòÎ¿Î¬ ÎöÎùÎÖÎíÎòÎáÎÖÎØ Î£ÎóÎòÎæÎôÎÖ Î×ÎóÎ¿ÎøÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎòÎíÎôÎÖÎÖÎØ",
    startDate: "03/08/2026",
    endDate: "17/08/2026",
    day: "ÎÖÎòÎØ Î®ÎáÎÖ",
    hours: "13:00 ÎóÎô 16:00",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎøÎ®Î¿Î¬ ÎáÎÉÎ×ÎáÎÖ ÎùÎÖÎíÎòÎáÎÖÎØ ÎæÎöÎ¬ÎÉÎØ Î£ÎíÎÿÎáÎôÎ¿ÎÿÎÖÎØ ÎöÎóÎôÎøÎáÎÖÎÖÎØ Î£Î®Î×ÎÖÎ¿Îö ÎóÎ£ ÎæÎ¿ÎÖÎÉÎòÎ¬ ÎªÎòÎòÎ¬ÎÖ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö."
  },
  {
    id: "5",
    title: "ÎºÎòÎ¿Îí ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎòÎíÎÿÎòÎ×Îö",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "12/10/2026",
    endDate: "21/12/2026",
    day: "ÎÖÎòÎØ Î®ÎáÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎáÎÖÎöÎòÎ£ Î×ÎáÎÖÎóÎö ÎòÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖ Î£ÎùÎÑ, ÎñÎªÎóÎÖÎØ ÎºÎ®ÎÖÎÖ Î¿ÎÖÎñÎòÎÖ ÎòÎíÎÿÎòÎ×Îö ÎæÎÆÎÖÎ®Îö ÎºÎ£ÎÖÎáÎÖÎ¬ Î×Î¬ÎºÎôÎ×Î¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö."
  },
  {
    id: "6",
    title: "ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "13/10/2026",
    endDate: "22/12/2026",
    day: "ÎÖÎòÎØ Î®Î£ÎÖÎ®ÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎÉÎæÎùÎòÎƒ Î×ÎòÎ®ÎøÎ£, ÎöÎóÎ¿ÎøÎö ÎòÎáÎÖÎöÎòÎ£ Î×ÎòÎ®ÎøÎ£ Î®Î£ ÎÿÎÖÎñÎòÎ£ Î¬Î¿ÎòÎñÎ¬ÎÖ ÎòÎ£ÎÉ-Î¬Î¿ÎòÎñÎ¬ÎÖ ÎæÎøÎÉÎæ ÎÉÎªÎ£ ÎöÎ×ÎÿÎòÎñÎ£ ÎöÎ×ÎæÎòÎÆÎ¿."
  },
  {
    id: "7",
    title: "ÎáÎÖÎöÎòÎ£ ÎíÎÖÎøÎòÎáÎÖÎØ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎöÎÿÎÖÎñÎòÎ£",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "03/06/2026",
    endDate: "05/08/2026",
    day: "ÎÖÎòÎØ Î¿ÎæÎÖÎóÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎºÎáÎÖÎÖÎ¬ ÎøÎ£ÎÖÎØ Î×ÎóÎ®ÎÖÎÖÎØ Î£ÎáÎÖÎöÎòÎ£ ÎæÎÿÎÖÎùÎòÎ¬ ÎöÎ×ÎÿÎòÎñÎ£, Î×ÎáÎÖÎóÎ¬ ÎíÎÖÎøÎòÎáÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ ÎòÎáÎÖÎöÎòÎ£ ÎÉÎÖÎ¿ÎòÎóÎÖÎØ ÎùÎ¿ÎÖÎÆÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö."
  },
  {
    id: "8",
    title: "ÎöÎóÎ®Î¿Î¬ ÎÖÎôÎó ÎæÎæÎ¿ÎÖÎÉÎòÎ¬ ÎöÎíÎæÎÖÎæÎö ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎòÎíÎôÎÖÎÖÎØ",
    startDate: "02/06/2026",
    endDate: "04/08/2026",
    day: "ÎÖÎòÎØ Î®Î£ÎÖÎ®ÎÖ",
    hours: "10:00 ÎóÎô 13:00",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎÖÎæÎÿÎÖÎØ ÎíÎæÎÖÎæÎ¬ÎÖÎÖÎØ ÎæÎ×ÎòÎíÎôÎòÎ¬ ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎÖÎØ, ÎæÎÿÎÖÎùÎòÎ¬ ÎºÎ£ÎÖÎáÎÖÎ¬, Î×ÎáÎÖÎóÎ¬ ÎöÎôÎæÎºÎòÎ¬ ÎòÎÉÎºÎòÎ£ÎòÎÆÎÖÎÖÎ¬ ÎÉÎ®ÎñÎòÎû Î×ÎòÎ¬ÎÉÎ×Î¬."
  },
  {
    id: "9",
    title: "ÎöÎôÎ¿ÎøÎö Î£Î×ÎôÎ¿ÎÖÎøÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "04/08/2026",
    endDate: "25/08/2026",
    day: "ÎÖÎòÎØ Î®Î£ÎÖÎ®ÎÖ",
    hours: "13:00 ÎóÎô 16:00",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "Î¿ÎøÎÖÎ®Î¬ Î×ÎÖÎòÎ×ÎáÎòÎÖÎòÎ¬ ÎöÎôÎ¿ÎøÎö Î×Î¬ÎºÎôÎ×ÎòÎ¬ Î£ÎöÎóÎªÎ×Î¬ ÎöÎôÎòÎ¿ ÎöÎæÎÉ Î®Î£ ÎªÎòÎòÎ¬ÎÖ ÎöÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ ÎæÎÖÎ®Î¿ÎÉÎ£."
  },
  {
    id: "10",
    title: "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ (ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ) ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "10/06/2026",
    endDate: "19/08/2026",
    day: "ÎÖÎòÎØ Î¿ÎæÎÖÎóÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎöÎíÎÖÎ×ÎñÎÿÎòÎ×ÎÿÎÖ, Î¬Î×ÎÖÎøÎö Î¿Îæ-Î×ÎºÎªÎòÎóÎÖÎ¬ ÎòÎ×Î®ÎñÎùÎ¬ÎÖÎ¬ ÎæÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎøÎæÎòÎô."
  },
  {
    id: "11",
    title: "ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "01/07/2026",
    endDate: "09/09/2026",
    day: "ÎÖÎòÎØ Î¿ÎæÎÖÎóÎÖ",
    hours: "10:00 ÎóÎô 11:30",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "Î×ÎóÎæÎ¿ Î×ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô Î×ÎùÎ£Îö Î£ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ - Î¬ÎñÎÖÎíÎòÎ¬ ÎùÎôÎ®ÎáÎÖÎòÎ¬ Î£Î®ÎÖÎñÎòÎ¿ ÎùÎòÎòÎÖÎ¬ ÎöÎ×ÎÿÎòÎñÎ£ ÎöÎûÎºÎƒ."
  },
  {
    id: "12",
    title: "ÎáÎÖÎöÎòÎ£ ÎÿÎÖÎñÎòÎ£ ÎæÎíÎòÎøÎ¿Î¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "08/10/2026",
    endDate: "10/12/2026",
    day: "ÎÖÎòÎØ ÎùÎ×ÎÖÎ®ÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎÉÎÖÎûÎòÎƒ ÎíÎòÎøÎ¿Î¬ Î×ÎòÎ¬ÎÉÎØ Î£Î×ÎæÎòÎÆÎ¿ÎÖÎØ, Î×ÎóÎºÎæ ÎºÎ£ÎÖÎáÎÖ, Î×ÎáÎÖÎóÎ¬ ÎíÎÖÎæÎòÎøÎÖÎØ ÎòÎÿÎÖÎñÎòÎ£ÎÖÎØ Î¬Î¿ÎòÎñÎ¬ÎÖÎÖÎØ ÎùÎôÎÖÎ®ÎÖÎØ."
  },
  {
    id: "13",
    title: "Î×ÎáÎÖÎóÎ¬ ÎóÎªÎÖÎ¿ÎòÎ¬ ÎòÎ®Î£ÎÖÎÿÎö ÎóÎ£ ÎíÎòÎÆÎ¿ÎÖÎØ",
    target: "ÎªÎòÎòÎ¬ ÎÉÎùÎÖÎòÎ¬",
    startDate: "28/10/2026",
    endDate: "20/01/2027",
    day: "ÎÖÎòÎØ Î¿ÎæÎÖÎóÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎÉÎæÎùÎòÎƒ, ÎÿÎÖÎñÎòÎ£ ÎòÎôÎ¿ÎøÎÖ ÎöÎ¬Î×ÎòÎôÎôÎòÎ¬ ÎóÎØ ÎöÎñÎ¿ÎóÎòÎ¬ ÎíÎòÎÆÎ¿ÎÖÎØ ÎòÎ×ÎáÎÖÎóÎ¬ ÎóÎªÎÖÎ¿ÎòÎ¬ ÎæÎÆÎÖÎ£ ÎöÎ×ÎæÎòÎÆÎ¿ Î£Î®ÎÖÎñÎòÎ¿ ÎÉÎÖÎøÎòÎ¬ ÎöÎùÎÖÎÖÎØ."
  },
  {
    id: "14",
    title: "ÎÉÎ¿ÎÆÎû ÎøÎ£ÎÖÎØ Î£ÎÿÎÖÎñÎòÎ£ ÎæÎôÎ×ÎáÎªÎÖÎö",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "20/10/2026",
    endDate: "29/12/2026",
    day: "ÎÖÎòÎØ Î®Î£ÎÖÎ®ÎÖ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎæÎáÎ¬ ÎóÎòÎ£Î×Îò Î®Î£ ÎöÎùÎòÎ£Îö ÎöÎôÎ×ÎáÎÿÎÖ, ÎáÎÖÎöÎòÎ£ ÎæÎÿÎòÎù Î®Î£ Î×ÎªÎæÎÖ ÎæÎ£ÎæÎòÎ£, Î¬ÎºÎ®ÎòÎ¿Î¬ Î×ÎòÎ¬ÎÉÎ×Î¬ ÎòÎñÎ¬Î¿ÎòÎƒ ÎæÎóÎÖÎòÎ¬ ÎæÎ®ÎÿÎù."
  },
  {
    id: "15",
    title: "ÎöÎóÎ®Î¿Î¬ ÎÖÎôÎó: ÎÿÎÖÎñÎòÎ£ ÎæÎùÎòÎ£Îö ÎöÎ×ÎòÎáÎ®ÎØ ÎöÎøÎ¿ÎòÎáÎÖ",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "28/06/2026",
    endDate: "16/08/2026",
    day: "ÎÖÎòÎØ Î¿ÎÉÎ®ÎòÎƒ",
    hours: "16:00 ÎóÎô 19:15",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎÖÎæÎÿÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ ÎòÎáÎÖÎöÎòÎ£ Î×ÎóÎºÎæ ÎöÎòÎ£ÎØ ÎæÎÿÎÖÎñÎòÎ£ ÎòÎöÎ®ÎÆÎùÎö ÎóÎ£ ÎùÎòÎ£ÎÖÎØ Î×ÎòÎáÎ®Î×ÎÖÎØ Î×Î×ÎòÎ®ÎøÎÖÎØ ÎæÎ×ÎóÎ¿ÎÜ ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ."
  },
  {
    id: "16",
    title: "ÎñÎÖÎ¬ÎòÎù Î×ÎÖÎòÎ×ÎáÎòÎÖÎòÎ¬ ÎñÎ¿ÎòÎôÎºÎÿÎÖÎæÎÖÎòÎ¬",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎòÎíÎôÎÖÎÖÎØ",
    startDate: "30/06/2026",
    endDate: "01/09/2026",
    day: "ÎÖÎòÎØ Î®Î£ÎÖÎ®ÎÖ",
    hours: "10:00 ÎóÎô 11:30",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "Zoom",
    notes: "ÎöÎóÎªÎ×Îö Î×ÎºÎªÎòÎóÎÖÎ¬, ÎáÎÖÎöÎòÎ£ ÎûÎ×Îƒ ÎÉÎñÎºÎÿÎÖÎæÎÖ, ÎñÎÖÎ¬ÎòÎù ÎùÎòÎíÎƒ ÎÉÎÖÎ®ÎÖ ÎòÎ×ÎÖÎòÎ×ÎáÎòÎÖÎòÎ¬ ÎóÎæÎòÎôÎö ÎñÎ¿ÎòÎôÎºÎÿÎÖÎæÎÖÎ¬ ÎæÎ×ÎùÎ£ÎºÎö."
  },
  {
    id: "17",
    title: "ÎñÎ¿ÎòÎÖÎºÎÿ ÎùÎÖÎíÎòÎƒ Î×ÎóÎ¿ÎøÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ - ÎöÎÿÎ×ÎóÎö ÎòÎÖÎÖÎ®ÎòÎØ ÎùÎòÎûÎ¿ ÎùÎÖÎíÎòÎƒ",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎòÎíÎôÎÖÎÖÎØ",
    startDate: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    endDate: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    day: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    hours: "ÎÆÎ×ÎÖÎ®",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "ÎæÎ¬ÎÖÎÉÎòÎØ ÎºÎ£ÎÖÎáÎÖ",
    notes: "ÎæÎöÎ¬ÎÉÎØ Î£ÎùÎòÎûÎ¿ Î×ÎáÎø\"Î£ Î×Î®Î¿Îô ÎöÎæÎ¿ÎÖÎÉÎòÎ¬ 11/2022 Î£ÎÿÎòÎæÎ¬ Î×ÎáÎÖÎóÎ¬ Î×ÎùÎ£ÎòÎ¬ Î×ÎôÎæÎºÎòÎ¬ ÎæÎ×ÎòÎíÎôÎòÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬."
  },
  {
    id: "18",
    title: "ÎöÎøÎ®Î¿Îö Î¿Îæ-Î×ÎºÎªÎòÎóÎÖÎ¬: ÎÉÎÖÎøÎòÎ¬ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎæÎÿÎÖÎñÎòÎ£ ÎæÎùÎòÎ£Îö ÎöÎ×ÎòÎ¿ÎøÎæ",
    target: "ÎªÎòÎòÎ¬ÎÖÎØ Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ ÎóÎò\"Îí",
    startDate: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    endDate: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    day: "ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®",
    hours: "4 Î®ÎóÎòÎ¬ ÎöÎôÎ¿ÎøÎö",
    price: "ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö",
    location: "ÎæÎ¬ÎÖÎÉÎòÎØ ÎºÎæÎòÎªÎ¬ÎÖ",
    notes: "ÎñÎÖÎ¬ÎòÎù Î×ÎÖÎòÎ×ÎáÎòÎÖÎòÎ¬ ÎºÎ£ÎÖÎáÎÖÎòÎ¬ Î¿Îæ-Î×ÎºÎªÎòÎóÎÖÎòÎ¬ Î£Î®ÎôÎ¿ÎòÎÆ Î¿Î×Î¬ ÎöÎÉÎÖÎøÎòÎ¬ ÎòÎöÎæÎÿÎÖÎùÎòÎ¬ ÎæÎÉÎÆÎñÎÖÎØ ÎòÎæÎ×ÎóÎ¿ÎøÎÖÎØ ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎÖÎØ."
  }
];

// Î×Î®ÎòÎæÎÖÎØ Î×ÎòÎæÎáÎÖÎØ (Initial Reviews) - ÎÆÎÖÎæÎòÎÖ
const initialFeedbacks = [
  {
      name: "ÎÉÎíÎ¬Î¿ Î£ÎòÎÖ",
      role: "ÎÉÎùÎòÎ¬ ÎÉÎùÎ¿ÎÉÎÖÎ¬ Î×ÎùÎ£ÎºÎö ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎ¬",
      workplace: "ÎæÎÖ\"Îù ÎöÎ¿ÎªÎñÎ£Îô",
      course: "ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎºÎ®ÎÖÎØ",
      rating: 5,
      text: "ÎöÎºÎòÎ¿Îí Î®ÎÖÎáÎö Î£ÎùÎ£ÎòÎÿÎÖÎƒ ÎÉÎ¬ ÎöÎôÎ¿ÎÜ Î®ÎæÎö ÎöÎªÎòÎòÎ¬ Î®Î£ÎÖ Î×ÎóÎ¿ÎÖÎÜ ÎòÎ×ÎÿÎñÎ£ ÎæÎñÎªÎóÎÖ Î£ÎùÎÑ. ÎöÎ¬ÎøÎáÎÖÎØ ÎöÎÖÎò ÎºÎ£ÎÖÎáÎÖÎÖÎØ ÎòÎñÎ¿ÎºÎÿÎÖÎÖÎØ Î£ÎöÎñÎ£ÎÖÎÉ, ÎòÎöÎ×Î¿ÎªÎÖÎØ Î×ÎáÎòÎíÎÖÎØ Î×ÎÉÎòÎô. Î×ÎòÎ×Î£ÎÑ ÎæÎùÎòÎØ Î£ÎøÎ£ Î×ÎòÎíÎô ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ ÎæÎÉÎ¿ÎÑ!"
  },
  {
      name: "Î×Î®Îö ÎøÎöÎƒ",
      role: "ÎÉÎù Î×ÎòÎíÎ×ÎÜ, Î×Î¿ÎøÎû ÎøÎ¿ÎòÎáÎÖ ÎòÎ®ÎÖÎºÎòÎ×ÎÖ",
      workplace: "Î×Î¿ÎøÎû Î¿ÎñÎòÎÉÎÖ Î®ÎöÎØ",
      course: "ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎòÎÉÎÖÎøÎòÎ¬ ÎùÎÖÎÖÎØ",
      rating: 5,
      text: "ÎöÎøÎ£ÎÖÎØ Î®ÎºÎÖÎæÎ£Î¬ÎÖ ÎæÎºÎòÎ¿Îí ÎóÎòÎûÎ¿ÎÖÎØ Î£ÎÖ Î×ÎôÎÖ ÎÖÎòÎØ ÎæÎÖÎòÎ×Îò Î£ÎöÎºÎ£ ÎóÎ£ ÎíÎæÎ£ÎØ Î®Î£ ÎöÎ×ÎÿÎòÎñÎ£ÎÖÎØ ÎæÎ×ÎùÎ£ÎºÎö ÎöÎíÎÖÎóÎòÎôÎÖÎ¬ ÎöÎ×ÎòÎ¿ÎøÎæÎ¬. ÎöÎ®ÎÖÎÿÎòÎ¬ ÎöÎ£ÎÉ-Î¬Î¿ÎòÎñÎ¬ÎÖÎòÎ¬ ÎòÎöÎöÎóÎ¿ÎøÎö Î®Î£ ÎùÎòÎ£ÎÖÎØ ÎóÎØ ÎôÎ×ÎáÎªÎÖÎö ÎñÎ®ÎòÎÿ Î×ÎªÎòÎÖÎáÎòÎ¬."
  },
  {
      name: "Î¿ÎùÎ£ ÎÉÎæÎ¿ÎöÎØ",
      role: "ÎáÎÉÎ×ÎáÎ¬ Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ",
      workplace: "Î×Î¿ÎøÎû Î¿ÎñÎòÎÉÎÖ Î®Î×ÎòÎÉÎ£ ÎöÎ¿ÎòÎñÎÉ",
      course: "Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ",
      rating: 4,
      text: "ÎöÎøÎ®Î¿Îö ÎÖÎòÎªÎÉÎ¬ Î×Îƒ ÎöÎøÎ£Î£ Î£ÎøÎ£ Î×ÎÖ Î®ÎóÎòÎíÎº ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö. ÎöÎ£Î×ÎÖÎôÎö ÎöÎöÎÖÎæÎ¿ÎÖÎôÎÖÎ¬ ÎöÎÖÎÖÎ¬Îö ÎáÎòÎùÎö Î×ÎÉÎòÎô ÎòÎöÎ×Î¿ÎªÎÖÎØ ÎáÎ¬ÎáÎò Î×ÎóÎáÎö Î×ÎºÎªÎòÎóÎÖ Î£ÎøÎ£ Î®ÎÉÎ£Îö Î×ÎöÎ®ÎÿÎù. Î¿ÎøÎ®Î¬ÎÖ ÎöÎ×ÎòÎƒ ÎøÎ£ÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ Î£ÎæÎºÎ¿Îö."
  },
  {
      name: "Îô\"Î¿ ÎÉÎ×ÎÖÎ¿ ÎÆÎòÎ£Îƒ",
      role: "Î¿ÎÉÎ® ÎªÎòÎòÎ¬ Î¿Îæ-Î×ÎºÎªÎòÎóÎÖ ÎòÎ×ÎáÎöÎ£ ÎíÎÖÎóÎòÎô",
      workplace: "Î×Î¿ÎøÎû Î¿ÎñÎòÎÉÎÖ Î®ÎÖÎºÎòÎ×ÎÖ Î¿ÎóÎòÎ¬",
      course: "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ",
      rating: 5,
      text: "Î£ÎÖÎòÎòÎÖ Î×ÎÿÎòÎñÎ£ÎÖÎØ ÎæÎíÎòÎú ÎùÎÖÎÖÎöÎØ ÎöÎòÎÉ ÎöÎ®Î£ÎÖÎùÎòÎ¬ ÎöÎùÎ®ÎòÎæÎö ÎæÎÖÎòÎ¬Î¿ ÎæÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ. ÎöÎºÎòÎ¿Îí ÎöÎóÎáÎÖÎº Î£ÎáÎò Î¬ÎòÎæÎáÎòÎ¬ ÎÉÎ¬ÎÖÎòÎ¬ ÎòÎáÎñÎ®ÎÖÎòÎ¬ ÎóÎ×ÎòÎºÎòÎ¬, Î£ÎªÎô ÎøÎ£ÎÖÎØ Î£ÎÉÎÖÎûÎòÎƒ ÎíÎÖÎ×ÎñÎÿÎòÎ×ÎÖÎØ ÎºÎ®ÎÖÎØ. Î×ÎôÎöÎÖÎØ ÎòÎ×Î¿ÎÆÎ® ÎøÎÉÎùÎô."
  }
];

// Î×Î®Î¬ÎáÎÖÎØ ÎÆÎ£ÎòÎæÎ£ÎÖÎÖÎØ Î£Î×ÎóÎ¿ÎøÎ¬ ÎöÎºÎòÎ¿ÎíÎÖÎØ
let currentCourses = [];
let currentViewMode = 'grid'; // grid | list

// Î×Î®Î¬ÎáÎÖÎØ ÎÆÎ£ÎòÎæÎ£ÎÖÎÖÎØ Î£Î×ÎóÎ¿ÎøÎ¬ ÎöÎ×Î®ÎòÎæÎÖÎØ
let globalFeedbacks = [];
let feedbacksVisibleCount = 15;

document.addEventListener('DOMContentLoaded', () => {
    // ÎáÎÖÎºÎòÎÖ ÎùÎô-ÎñÎóÎ×ÎÖ Î®Î£ Î×Î®ÎòÎæÎÖ ÎöÎæÎôÎÖÎºÎö Î®ÎöÎòÎøÎáÎíÎò ÎæÎ×ÎöÎ£ÎÜ ÎöÎæÎôÎÖÎºÎòÎ¬
    try {
        if (!localStorage.getItem('iang_cleared_test_reviews_v3')) {
            localStorage.removeItem('iang_testimonials');
            localStorage.setItem('iang_cleared_test_reviews_v3', 'true');
        }
    } catch(e) {}

    initMobileMenu();
    initContactModal();
    populateCourseDropdowns();
    
    // ÎûÎÖÎöÎòÎÖ ÎöÎôÎú ÎöÎáÎòÎøÎùÎÖ ÎòÎöÎñÎóÎ£Î¬ ÎöÎ£ÎòÎÆÎÖÎºÎö ÎöÎ×Î¬ÎÉÎÖÎ×Îö
    if (document.getElementById('coursesGrid')) {
        initCoursesSystem();
    }
    
    if (document.getElementById('testimonialsList')) {
        initFeedbackSystem();
    }
    
    if (document.getElementById('coursesChart') || document.getElementById('radarChart') || document.getElementById('timelineChart')) {
        initDashboardSystem();
    }
});

/* --- 1. Î¬ÎñÎ¿ÎÖÎÿ Î×ÎòÎæÎÖÎÖÎ£ ÎáÎñÎ¬Îù --- */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('mainHeader');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            header.classList.toggle('menu-open');
        });
        
        // ÎíÎÆÎÖÎ¿Î¬ ÎöÎ¬ÎñÎ¿ÎÖÎÿ ÎæÎ£ÎùÎÖÎªÎö ÎóÎ£ ÎºÎÖÎ®ÎòÎ¿ ÎøÎ£Î®ÎöÎò
        const navLinks = mainNav.querySelectorAll('.nav-link, .cta-nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                header.classList.remove('menu-open');
            });
        });
    }
}

/* --- 2. Î×ÎòÎôÎÉÎ£ ÎÖÎªÎÖÎ¿Î¬ ÎºÎ®Î¿ ÎòÎ¿ÎÖÎ®ÎòÎØ Î×ÎöÎÖÎ¿ --- */
let activeModal = null;

function initContactModal() {
    activeModal = document.getElementById('contactModal');
}

/* --- Î×ÎÖÎ£ÎòÎÖ ÎôÎÖÎáÎ×ÎÖ Î®Î£ Î¬ÎÖÎæÎòÎ¬ ÎæÎùÎÖÎ¿Î¬ ÎºÎòÎ¿ÎíÎÖÎØ ÎæÎøÎ£ ÎöÎôÎñÎÖÎØ --- */
function populateCourseDropdowns() {
    let coursesList = [];
    const savedCourses = localStorage.getItem('geriatric_courses_data_v2');
    if (savedCourses) {
        try {
            coursesList = JSON.parse(savedCourses);
        } catch(e) {
            coursesList = [...DEFAULT_COURSES];
        }
    } else {
        coursesList = [...DEFAULT_COURSES];
    }

    // 1. ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎÿÎòÎñÎí Î×Î®ÎòÎæ Î£ÎºÎòÎ¿Îí (feedback.html)
    const feedbackSelect = document.getElementById('feedbackCourse');
    if (feedbackSelect) {
        feedbackSelect.innerHTML = '<option value="">-- ÎæÎùÎ¿Îò ÎÉÎ¬ ÎöÎºÎòÎ¿Îí Î®ÎóÎæÎ¿Î¬ÎØ --</option>';
        coursesList.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.textContent = c.title;
            feedbackSelect.appendChild(opt);
        });
    }

    // 2. ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎÿÎòÎñÎí ÎöÎóÎ¿ÎøÎ¬ Î×Î¿ÎªÎÖÎØ ÎòÎ¬ÎòÎøÎƒ (dashboard.html)
    const lecturerSelect = document.getElementById('lecturerFeedbackCourse');
    if (lecturerSelect) {
        lecturerSelect.innerHTML = '<option value="">-- ÎæÎùÎ¿Îò ÎÉÎ¬ ÎöÎºÎòÎ¿Îí --</option>';
        coursesList.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.textContent = c.title;
            lecturerSelect.appendChild(opt);
        });
    }

    // 3. ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎíÎÖÎáÎòÎƒ ÎºÎÖÎ¿ ÎöÎ×Î®ÎòÎæÎÖÎØ (feedback.html)
    const wallFilterSelect = document.getElementById('wallCourseFilter');
    if (wallFilterSelect) {
        wallFilterSelect.innerHTML = '<option value="ÎöÎøÎ£">ÎøÎ£ ÎöÎºÎòÎ¿ÎíÎÖÎØ</option>';
        coursesList.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.textContent = c.title;
            wallFilterSelect.appendChild(opt);
        });
    }

    // 4. ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ Î×ÎòÎôÎÉÎ£ ÎÖÎªÎÖÎ¿Î¬ ÎºÎ®Î¿ Î×ÎöÎÖÎ¿ (ÎæÎøÎ£ ÎöÎôÎñÎÖÎØ)
    const contactSelect = document.getElementById('contactCourse');
    if (contactSelect) {
        contactSelect.innerHTML = '<option value="">-- ÎæÎùÎ¿Îò ÎºÎòÎ¿Îí Î×Î¿Î®ÎÖÎ×Î¬ ÎöÎöÎøÎ®Î¿ÎòÎ¬ --</option>';
        coursesList.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.title;
            opt.textContent = c.title;
            contactSelect.appendChild(opt);
        });
    }
}

function openContactModal(courseValue = '') {
    if (!activeModal) return;
    
    activeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Î×ÎáÎÖÎóÎ¬ ÎÆÎ£ÎÖÎ£Îö Î®Î£ ÎöÎ¿ÎºÎó
    
    // ÎÉÎØ ÎöÎòÎóÎæÎ¿ ÎóÎ¿ÎÜ Î®Î£ ÎºÎòÎ¿Îí, ÎáÎæÎùÎ¿ ÎÉÎòÎ¬Îò ÎÉÎòÎÿÎòÎ×ÎÿÎÖÎ¬ ÎæÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ
    if (courseValue) {
        const courseSelect = document.getElementById('contactCourse');
        if (courseSelect) {
            courseSelect.value = courseValue;
        }
    }
}

function closeContactModal() {
    if (!activeModal) return;
    
    activeModal.classList.remove('active');
    document.body.style.overflow = ''; // ÎöÎùÎûÎ¿Î¬ ÎÆÎ£ÎÖÎ£Îö
}

// ÎÿÎÖÎñÎòÎ£ ÎæÎ®Î£ÎÖÎùÎ¬ ÎÿÎòÎñÎí Î¿ÎÖÎ®ÎòÎØ Î×ÎöÎÖÎ¿ (ÎøÎòÎ£Î£ ÎÖÎªÎÖÎ¿Î¬ ÎñÎáÎÖÎÖÎ¬ Î×ÎÖÎÖÎ£ mailto Î×ÎºÎªÎòÎóÎÖÎ¬)
function handleQuickContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const courseSelect = document.getElementById('contactCourse');
    const courseText = courseSelect.options[courseSelect.selectedIndex].text;
    const selectedCourseVal = courseSelect.value;
    const msg = document.getElementById('contactMsg') ? document.getElementById('contactMsg').value : '';
    
    // ÎÖÎªÎÖÎ¿Î¬ ÎöÎòÎôÎóÎ¬ ÎöÎªÎ£ÎùÎö
    let successMsg = `Î¬ÎòÎôÎö Î¿ÎæÎö, ${name}!\nÎñÎáÎÖÎÖÎ¬ÎÜ ÎöÎ¬ÎºÎæÎ£Îö ÎæÎöÎªÎ£ÎùÎö.\n\n`;
    if (selectedCourseVal) {
        successMsg += `ÎáÎ¿Î®Î×Î¬ Î£ÎöÎ¬ÎóÎáÎÖÎÖÎáÎòÎ¬ Îæ: "${courseText}".\n`;
    }
    successMsg += `ÎøÎóÎ¬ ÎÖÎÖÎñÎ¬Îù ÎùÎ£ÎòÎƒ ÎöÎôÎòÎÉ"Î£ Î®Î£ÎÜ Î£Î®Î£ÎÖÎùÎ¬ ÎñÎáÎÖÎÖÎö Î×ÎñÎòÎ¿ÎÿÎ¬ Î£ÎóÎ×ÎòÎ¬Îö.`;
    
    alert(successMsg);
    
    // Î®Î£ÎÖÎùÎ¬ Î×ÎÖÎÖÎ£
    const emailSubject = encodeURIComponent(`ÎñÎáÎÖÎÖÎö Î£ÎöÎ¬ÎóÎáÎÖÎÖÎáÎòÎ¬ ÎæÎ¿ÎÖÎ®ÎòÎØ Î£ÎºÎòÎ¿Îí: ${courseText}`);
    const emailBody = encodeURIComponent(
        `Î®Î£ÎòÎØ Î£ÎóÎ×ÎòÎ¬Îö Î£ÎºÎÖÎôÎòÎØ ÎöÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ,\n\n` +
        `ÎæÎ¿ÎªÎòÎáÎÖ Î£ÎöÎÖÎ¿Î®ÎØ / Î£ÎºÎæÎ£ ÎñÎ¿ÎÿÎÖÎØ ÎáÎòÎíÎñÎÖÎØ ÎóÎ£ ÎöÎºÎòÎ¿Îí ÎöÎæÎÉ:\n` +
        `Î®ÎØ ÎöÎºÎòÎ¿Îí: ${courseText}\n\n` +
        `ÎñÎ¿ÎÿÎÖ ÎöÎºÎ®Î¿ Î®Î£ÎÖ:\n` +
        `- Î®ÎØ Î×Î£ÎÉ: ${name}\n` +
        `- ÎÿÎ£ÎñÎòÎƒ: ${phone}\n` +
        `- ÎÉÎÖÎ×ÎÖÎÖÎ£: ${email}\n` +
        `- ÎöÎòÎôÎóÎö/ÎæÎºÎ®ÎòÎ¬ Î×ÎÖÎòÎùÎôÎòÎ¬: ${msg}\n\n` +
        `ÎæÎæÎ¿ÎøÎö,\n${name}`
    );
    
    window.location.href = `mailto:amutageri@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // ÎÉÎÖÎñÎòÎí ÎòÎíÎÆÎÖÎ¿Îö
    event.target.reset();
    closeContactModal();
}

// ÎíÎÆÎÖÎ¿Î¬ Î×ÎòÎôÎÉÎ£ÎÖÎØ ÎæÎ£ÎùÎÖÎªÎö Î×ÎùÎòÎÑ Î£Î¬ÎòÎøÎƒ Î®Î£ÎöÎØ
window.addEventListener('click', (e) => {
    if (e.target === activeModal) {
        closeContactModal();
    }
    
    const syncModal = document.getElementById('syncModal');
    if (e.target === syncModal) {
        closeSyncModal();
    }
    
    const resetModal = document.getElementById('resetModal');
    if (e.target === resetModal) {
        closeResetModal();
    }
    
    const lecturerModal = document.getElementById('lecturerFeedbackModal');
    if (e.target === lecturerModal) {
        closeLecturerModal();
    }
});


/* --- 3. Î×ÎóÎ¿ÎøÎ¬ ÎºÎòÎ¿ÎíÎÖÎØ ÎôÎÖÎáÎ×ÎÖÎ¬ (courses.html) --- */
function initCoursesSystem() {
    // ÎÿÎóÎÖÎáÎ¬ ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎòÎ®Î×ÎÖÎ¿Î¬ Î×ÎªÎæ ÎöÎ¬ÎªÎòÎÆÎö
    const savedCourses = localStorage.getItem('geriatric_courses_data_v2');
    if (savedCourses) {
        try {
            currentCourses = JSON.parse(savedCourses);
        } catch(e) {
            currentCourses = [...DEFAULT_COURSES];
        }
    } else {
        currentCourses = [...DEFAULT_COURSES];
    }
    
    const savedView = localStorage.getItem('courses_view_mode');
    if (savedView) {
        currentViewMode = savedView;
    }
    
    // ÎóÎôÎøÎòÎƒ ÎøÎñÎ¬ÎòÎ¿ ÎñÎóÎÖÎ£ Î£Î¬ÎªÎòÎÆÎö
    updateViewToggleButtons();
    
    // Î×ÎÖÎ£ÎòÎÖ ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎºÎöÎ£ ÎÖÎóÎô
    populateTargetFilter();
    
    // Î×ÎÖÎ£ÎòÎÖ ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎÿÎòÎñÎí ÎöÎ¿Î®Î×Îö
    populateContactCourseSelect();
    
    // Î®Î¿ÎÿÎòÎÿ Î¿ÎÉÎ®ÎòÎáÎÖ
    renderCoursesList();
    
    // Î×Î®ÎÖÎøÎ¬ ÎáÎ¬ÎòÎáÎÖÎØ Î£ÎóÎôÎøÎòÎƒ ÎöÎôÎÖÎ¿ÎòÎÆÎÖÎØ ÎòÎöÎ×Î®ÎÖÎæÎÖÎØ
    fetchLiveGoogleData();
}

// ÎóÎôÎøÎòÎƒ ÎøÎñÎ¬ÎòÎ¿ÎÖ ÎÆÎ¿ÎÖÎô/Î¿Î®ÎÖÎ×Îö
function updateViewToggleButtons() {
    const gridBtn = document.getElementById('viewGridBtn');
    const listBtn = document.getElementById('viewListBtn');
    if (!gridBtn || !listBtn) return;
    
    if (currentViewMode === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
}

function setViewMode(mode) {
    currentViewMode = mode;
    localStorage.setItem('courses_view_mode', mode);
    updateViewToggleButtons();
    renderCoursesList();
}

// Î×ÎÖÎ£ÎòÎÖ ÎºÎÿÎÆÎòÎ¿ÎÖÎòÎ¬ ÎíÎÖÎáÎòÎƒ ÎºÎöÎ£ ÎÖÎóÎô ÎôÎÖÎáÎ×ÎÖ
function populateTargetFilter() {
    const select = document.getElementById('courseTargetFilter');
    if (!select) return;
    
    select.innerHTML = '<option value="ÎöÎøÎ£">ÎøÎ£ ÎºÎöÎ£ÎÖ ÎöÎÖÎóÎô</option>';
    const targets = new Set(currentCourses.map(c => c.target));
    targets.forEach(t => {
        if (t) {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t;
            select.appendChild(opt);
        }
    });
}

// Î×ÎÖÎ£ÎòÎÖ ÎôÎ¿ÎòÎñÎôÎÉÎòÎƒ ÎöÎ¿ÎÖÎ®ÎòÎØ
function populateContactCourseSelect() {
    const select = document.getElementById('contactCourse');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- ÎæÎùÎ¿Îò ÎºÎòÎ¿Îí Î×Î¿Î®ÎÖÎ×Î¬ ÎöÎöÎøÎ®Î¿ÎòÎ¬ --</option>';
    currentCourses.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.title;
        opt.textContent = c.title;
        select.appendChild(opt);
    });
}

// ÎöÎùÎûÎ¿Î¬ ÎºÎÖÎ®ÎòÎ¿ Î£ÎòÎù Î®ÎáÎö ÎÆÎòÎÆÎ£
function generateGoogleCalendarLink(course) {
    try {
        const parseDate = (dStr) => {
            const parts = dStr.split('/');
            if (parts.length === 3) {
                return `${parts[2]}${parts[1]}${parts[0]}`;
            }
            return '20260601';
        };
        const start = parseDate(course.startDate);
        const end = parseDate(course.endDate || course.startDate);
        const title = encodeURIComponent(`ÎºÎòÎ¿Îí ÎöÎóÎ×ÎòÎ¬Îö Î£ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö: ${course.title}`);
        const details = encodeURIComponent(`${course.notes || ''}\nÎºÎöÎ£ ÎÖÎóÎô: ${course.target}\nÎ®ÎóÎòÎ¬: ${course.hours}`);
        const location = encodeURIComponent(course.location || 'Zoom');
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    } catch (e) {
        return '#';
    }
}

// ÎöÎóÎ¬ÎºÎ¬ ÎºÎÖÎ®ÎòÎ¿ ÎöÎ¿Î®Î×Îö Î×ÎöÎÖÎ¿
function copyCourseEnrollLink(courseTitle) {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    
    // ÎÖÎªÎÖÎ¿Î¬ ÎºÎÖÎ®ÎòÎ¿ ÎÖÎ®ÎÖÎ¿ Î£ÎóÎ×ÎòÎô ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎóÎØ ÎñÎ¿Î×ÎÿÎ¿ Î®Î£ Î®ÎØ ÎöÎºÎòÎ¿Îí Î£Î¿ÎÖÎ®ÎòÎØ
    const link = `${window.location.origin}${window.location.pathname}?enroll=${encodeURIComponent(courseTitle)}`;
    dummy.value = link;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    
    alert(`ÎºÎÖÎ®ÎòÎ¿ Î¿ÎÖÎ®ÎòÎØ ÎÖÎ®ÎÖÎ¿ Î£ÎºÎòÎ¿Îí "${courseTitle}" ÎöÎòÎóÎ¬Îº Î£Î£ÎòÎù!`);
}

// ÎíÎÖÎáÎòÎƒ ÎòÎùÎÖÎñÎòÎ® ÎºÎòÎ¿ÎíÎÖÎØ (Î×ÎòÎñÎóÎ£ Îæ-input ÎòÎæÎ®ÎÖÎáÎòÎÖ select)
function handleSearchFilter() {
    renderCoursesList();
}

// Î®Î¿ÎÿÎòÎÿ ÎøÎ¿ÎÿÎÖÎíÎÖÎòÎ¬ ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎæÎñÎòÎóÎ£
function renderCoursesList() {
    const container = document.getElementById('coursesGrid');
    if (!container) return;
    
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const targetFilter = document.getElementById('courseTargetFilter').value;
    const sortVal = document.getElementById('courseSort').value;
    
    // ÎíÎÖÎáÎòÎƒ
    let filtered = currentCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) || 
                              (course.notes && course.notes.toLowerCase().includes(searchTerm));
        const matchesTarget = targetFilter === 'ÎöÎøÎ£' || course.target === targetFilter;
        return matchesSearch && matchesTarget;
    });
    
    // Î×ÎÖÎòÎƒ
    filtered.sort((a, b) => {
        let valA = a.startDate || '';
        let valB = b.startDate || '';
        
        if (sortVal.startsWith('startDate')) {
            const parseDateForSort = (str) => {
                const parts = str.split('/');
                if (parts.length === 3) {
                    return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
                }
                return 9999999999999;
            };
            valA = parseDateForSort(valA);
            valB = parseDateForSort(valB);
        } else {
            valA = a.title || '';
            valB = b.title || '';
        }
        
        const isAsc = sortVal.endsWith('asc');
        if (valA < valB) return isAsc ? -1 : 1;
        if (valA > valB) return isAsc ? 1 : -1;
        return 0;
    });
    
    // ÎöÎùÎ£Î¬ Î¬ÎªÎòÎÆÎ¬ ÎÆÎ¿ÎÖÎô ÎÉÎò Î¿Î®ÎÖÎ×Îö
    if (currentViewMode === 'list') {
        container.classList.add('list-layout');
    } else {
        container.classList.remove('list-layout');
    }
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-circle-info" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Î£ÎÉ ÎáÎ×ÎªÎÉÎò ÎºÎòÎ¿ÎíÎÖÎØ ÎöÎóÎòÎáÎÖÎØ ÎóÎ£ Î¬ÎáÎÉÎÖ ÎöÎíÎÖÎáÎòÎƒ.</p>
            </div>
        `;
        return;
    }
    
    let allTestimonials = [];
    try {
        const stored = localStorage.getItem('iang_testimonials');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) allTestimonials = parsed;
        }
    } catch (e) {}
    const combinedTestimonials = [...allTestimonials, ...initialFeedbacks, ...globalFeedbacks];
    const ratings = calculateRatings(combinedTestimonials);
    
    filtered.forEach(course => {
        // ÎöÎ¬ÎÉÎ×Î¬ Î¬ÎÆ ÎöÎºÎòÎ¿Îí
        let tagClass = 'tag-clinical';
        let categoryName = 'ÎöÎøÎ®Î¿Îö ÎºÎ£ÎÖÎáÎÖÎ¬';
        if (course.target.includes('ÎÉÎùÎ¿ÎÉÎÖÎòÎ¬') || course.target.includes('ÎáÎÖÎöÎòÎ£')) {
            tagClass = 'tag-mgmt';
            categoryName = 'ÎáÎÖÎöÎòÎ£ ÎòÎ×ÎáÎöÎÖÎÆÎòÎ¬';
        } else if (course.target.includes('Î¿Îæ Î×ÎºÎªÎòÎóÎÖÎÖÎØ') || course.target.includes('ÎóÎò"Îí')) {
            tagClass = 'tag-support';
            categoryName = 'ÎóÎæÎòÎôÎö Î¿Îæ-Î×ÎºÎªÎòÎóÎÖÎ¬';
        }
        
        // ÎôÎÖÎ¿ÎòÎÆ
        const normKey = normalizeCourseKey(course.title);
        const itemRating = ratings.breakdown[normKey];
        let ratingHtml = '';
        if (itemRating && itemRating.count > 0) {
            const starsNum = Math.round(parseFloat(itemRating.avg));
            const starsStr = 'Ôÿà'.repeat(starsNum) + 'Ôÿå'.repeat(5 - starsNum);
            ratingHtml = `
                <div class="course-rating-badge" style="margin-top:0px; margin-bottom: 16px;">
                    <span class="course-rating-stars">${starsStr}</span>
                    <span>${itemRating.avg}</span>
                    <span class="course-rating-count">(${itemRating.count} Î×Î®ÎòÎæÎÖÎØ)</span>
                </div>
            `;
        }
        
        const googleCalendarLink = generateGoogleCalendarLink(course);
        
        let cardContent = '';
        
        if (currentViewMode === 'list') {
            cardContent = `
                <article class="course-card">
                    <div class="course-card-main-info">
                        <span class="course-tag ${tagClass}">${categoryName}</span>
                        <h3 class="course-title" style="margin-bottom:6px;">${course.title}</h3>
                        ${ratingHtml}
                        <p class="course-desc" style="margin-bottom:0;">${course.notes || 'ÎÉÎÖÎƒ Î¬ÎÖÎÉÎòÎ¿ ÎûÎ×ÎÖÎƒ Î£ÎºÎòÎ¿Îí ÎûÎö.'}</p>
                    </div>
                    <div class="course-card-meta-info" style="margin-right:20px; border-right:1px solid var(--border-color); padding-right:20px;">
                        <div class="meta-item">
                            <i class="fa-solid fa-calendar-days" style="color:var(--primary); width:16px;"></i>
                            <span>${course.startDate} ${course.endDate ? 'ÎóÎô ' + course.endDate : ''}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-clock" style="color:var(--primary); width:16px;"></i>
                            <span>${course.day} | ${course.hours}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-users" style="color:var(--primary); width:16px;"></i>
                            <span>ÎºÎöÎ£ ÎÖÎóÎô: ${course.target}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-tag" style="color:var(--primary); width:16px;"></i>
                            <span>Î×ÎùÎÖÎ¿: ${course.price}</span>
                        </div>
                    </div>
                    <div class="course-card-actions-info">
                        <button class="btn-primary" onclick="openContactModal('${course.title}')">ÎöÎ¿Î®Î×Îö Î×ÎöÎÖÎ¿Îö</button>
                        <a href="${googleCalendarLink}" target="_blank" rel="noopener" class="btn-calendar-add" style="margin-top:0px;">
                            <i class="fa-solid fa-calendar-plus"></i>
                            <span>ÎöÎòÎíÎú Î£ÎÖÎòÎ×Îƒ</span>
                        </a>
                        <button class="btn-secondary" onclick="copyCourseEnrollLink('${course.title}')" style="margin-top: 4px; padding: 6px;">
                            <i class="fa-solid fa-share-nodes"></i> ÎöÎóÎ¬Îº ÎºÎÖÎ®ÎòÎ¿
                        </button>
                    </div>
                </article>
            `;
        } else {
            cardContent = `
                <article class="course-card">
                    <span class="course-tag ${tagClass}">${categoryName}</span>
                    <h3 class="course-title">${course.title}</h3>
                    ${ratingHtml}
                    <p class="course-desc">${course.notes || 'ÎÉÎÖÎƒ Î¬ÎÖÎÉÎòÎ¿ ÎûÎ×ÎÖÎƒ Î£ÎºÎòÎ¿Îí ÎûÎö.'}</p>
                    
                    <div class="course-meta">
                        <div class="meta-item">
                            <i class="fa-solid fa-calendar-days" style="color:var(--primary); width:16px;"></i>
                            <span>${course.startDate} ${course.endDate ? 'ÎóÎô ' + course.endDate : ''}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-clock" style="color:var(--primary); width:16px;"></i>
                            <span>${course.day} | ${course.hours}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-users" style="color:var(--primary); width:16px;"></i>
                            <span>ÎºÎöÎ£ ÎÖÎóÎô: ${course.target}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fa-solid fa-tag" style="color:var(--primary); width:16px;"></i>
                            <span>Î×ÎùÎÖÎ¿: ${course.price}</span>
                        </div>
                    </div>
                    
                    <div class="course-actions" style="margin-top:auto; display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; gap:10px;">
                            <button class="btn-secondary" onclick="copyCourseEnrollLink('${course.title}')">Î®ÎÖÎ¬ÎòÎú</button>
                            <button class="btn-primary" onclick="openContactModal('${course.title}')">ÎöÎ¿Î®Î×Îö Î×ÎöÎÖÎ¿Îö</button>
                        </div>
                        <a href="${googleCalendarLink}" target="_blank" rel="noopener" class="btn-calendar-add">
                            <i class="fa-solid fa-calendar-plus"></i>
                            <span>ÎöÎòÎíÎú Î£ÎÖÎòÎ×Îƒ ÎÆÎòÎÆÎ£</span>
                        </a>
                    </div>
                </article>
            `;
        }
        
        container.innerHTML += cardContent;
    });
    
    // ÎæÎôÎÖÎºÎö ÎöÎÉÎØ ÎÖÎ® ÎæÎºÎ®Î¬ Î¿ÎÖÎ®ÎòÎØ ÎÖÎ®ÎÖÎ¿Îö Î×Îö-URL
    const urlParams = new URLSearchParams(window.location.search);
    const enrollCourse = urlParams.get('enroll');
    if (enrollCourse) {
        // Î×ÎáÎÖÎóÎ¬ Î£ÎòÎñ ÎòÎñÎ¬ÎÖÎùÎ¬ Î×ÎòÎôÎÉÎ£
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        openContactModal(enrollCourse);
    }
}

// ÎñÎ¬ÎÖÎùÎö ÎòÎíÎÆÎÖÎ¿Îö Î®Î£ Î×ÎòÎôÎÉÎ£ ÎíÎáÎøÎ¿ÎòÎƒ ÎÆÎòÎÆÎ£ Î®ÎÖÎÿÎí
function openSyncModal() {
    const modal = document.getElementById('syncModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // ÎöÎ®Î£Î×Î¬ ÎöÎøÎ¬ÎòÎæÎ¬ ÎöÎÖÎ®ÎáÎö ÎÉÎØ ÎºÎÖÎÖÎ×Î¬
        const storedUrl = localStorage.getItem('geriatric_sheet_csv_url_v2');
        if (storedUrl) {
            document.getElementById('sheetCsvUrl').value = storedUrl;
        }
    }
}

function closeSyncModal() {
    const modal = document.getElementById('syncModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ÎöÎñÎóÎ£Î¬ ÎíÎáÎøÎ¿ÎòÎƒ
function handleSheetsSync(event) {
    event.preventDefault();
    const sheetUrl = document.getElementById('sheetCsvUrl').value.trim();
    if (!sheetUrl) return;
    
    const submitBtn = document.getElementById('syncSubmitBtn');
    const btnText = document.getElementById('syncBtnText');
    
    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="loader-spinner"></span> Î×ÎíÎáÎøÎ¿Îƒ ÎáÎ¬ÎòÎáÎÖÎØ...';
    
    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) throw new Error("ÎÆÎÖÎ®Îö ÎáÎøÎ®Î£Îö. ÎÉÎáÎÉ ÎòÎòÎôÎÉ Î®ÎöÎÆÎÖÎ£ÎÖÎòÎƒ ÎñÎòÎ¿ÎíÎØ Îø-CSV.");
            return response.text();
        })
        .then(csvText => {
            // Auto-detect delimiter: if first line contains tab, use '\t', else ','
            const firstLine = csvText.split('\n')[0];
            const delimiter = firstLine.includes('\t') ? '\t' : ',';
            
            // ÎñÎòÎáÎºÎªÎÖÎö Î£ÎñÎÖÎ¿ÎòÎº Î®ÎòÎ¿ÎòÎ¬ CSV
            function parseCSVLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === delimiter && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                result.push(current.trim());
                return result;
            }
            
            const lines = csvText.replace(/\r/g, '').split('\n');
            if (lines.length < 2) throw new Error("ÎºÎòÎæÎÑ ÎöÎáÎ¬ÎòÎáÎÖÎØ Î¿ÎÖÎº.");
            
            const headers = parseCSVLine(lines[0]);
            
            // ÎûÎÖÎöÎòÎÖ ÎóÎ×ÎòÎôÎòÎ¬ ÎùÎøÎØ Î£ÎñÎÖ ÎøÎòÎ¬Î¿ÎòÎ¬
            const titleIdx = headers.findIndex(h => h.includes("ÎñÎóÎÖÎ£ÎòÎ¬") || h.includes("Î®ÎØ") || h.includes("ÎáÎòÎ®ÎÉ") || h.toLowerCase().includes("title"));
            const targetIdx = headers.findIndex(h => h.includes("ÎºÎöÎ£") || h.includes("ÎíÎòÎÆ") || h.toLowerCase().includes("target"));
            const startIdx = headers.findIndex(h => h.includes("ÎöÎ¬ÎùÎ£Îö") || h.toLowerCase().includes("start"));
            const endIdx = headers.findIndex(h => h.includes("ÎíÎÖÎòÎØ") || h.toLowerCase().includes("end"));
            const dayIdx = headers.findIndex(h => h.includes("ÎÖÎòÎØ") || h.toLowerCase().includes("day"));
            const hoursIdx = headers.findIndex(h => h.includes("Î®Îó") || h.toLowerCase().includes("hours") || h.toLowerCase().includes("time"));
            const priceIdx = headers.findIndex(h => h.includes("Î×ÎùÎÖÎ¿") || h.toLowerCase().includes("price"));
            const notesIdx = headers.findIndex(h => h.includes("ÎöÎóÎ¿") || h.toLowerCase().includes("note"));
            
            const parsedCourses = [];
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const cols = parseCSVLine(line);
                if (cols.length === 0 || !cols[titleIdx !== -1 ? titleIdx : 0]) continue;
                
                parsedCourses.push({
                    id: `sheet-${i}-${Date.now()}`,
                    title: titleIdx !== -1 ? cols[titleIdx] : cols[0],
                    target: targetIdx !== -1 ? cols[targetIdx] : (cols[1] || 'ÎøÎ£Î£ÎÖ'),
                    startDate: startIdx !== -1 ? cols[startIdx] : (cols[2] || 'ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®'),
                    endDate: endIdx !== -1 ? cols[endIdx] : (cols[3] || 'ÎæÎ¬ÎÉÎòÎØ Î×Î¿ÎÉÎ®'),
                    day: dayIdx !== -1 ? cols[dayIdx] : (cols[4] || 'ÎÆÎ×ÎÖÎ®'),
                    hours: hoursIdx !== -1 ? cols[hoursIdx] : (cols[5] || 'ÎÆÎ×ÎÖÎ®'),
                    price: priceIdx !== -1 ? cols[priceIdx] : (cols[6] || 'ÎùÎÖÎáÎØ Î£ÎùÎæÎ¿ÎÖ ÎóÎ×ÎòÎ¬Îö'),
                    notes: notesIdx !== -1 ? cols[notesIdx] : (cols[7] || ''),
                    location: 'Zoom'
                });
            }
            
            if (parsedCourses.length === 0) {
                throw new Error("Î£ÎÉ ÎáÎ×ÎªÎÉÎò ÎºÎòÎ¿ÎíÎÖÎØ Î¬ÎºÎÖÎáÎÖÎØ ÎæÎºÎòÎæÎÑ.");
            }
            
            // Î®Î×ÎÖÎ¿Îö
            currentCourses = parsedCourses;
            localStorage.setItem('geriatric_courses_data_v2', JSON.stringify(currentCourses));
            localStorage.setItem('geriatric_sheet_csv_url_v2', sheetUrl);
            
            // ÎóÎôÎøÎòÎƒ Î¿ÎøÎÖÎæÎÖ Î×Î×Î®Îº
            populateTargetFilter();
            populateContactCourseSelect();
            renderCoursesList();
            
            alert(`ÎöÎíÎáÎøÎ¿ÎòÎƒ ÎæÎòÎªÎó ÎæÎöÎªÎ£ÎùÎö! ÎÖÎòÎæÎÉÎò ${parsedCourses.length} ÎºÎòÎ¿ÎíÎÖÎØ Î×-Google Sheets.`);
            closeSyncModal();
        })
        .catch(err => {
            alert(`Î®ÎÆÎÖÎÉÎö ÎæÎæÎÖÎªÎòÎó ÎöÎíÎáÎøÎ¿ÎòÎƒ: ${err.message}`);
        })
        .finally(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'ÎæÎÖÎªÎòÎó ÎíÎáÎøÎ¿ÎòÎƒ ÎòÎÖÎÖÎæÎòÎÉ';
        });
}

// ÎñÎ¬ÎÖÎùÎö ÎòÎíÎÆÎÖÎ¿Îö Î®Î£ Î×ÎòÎôÎÉÎ£ Î®ÎùÎûÎòÎ¿
function openResetModal() {
    const modal = document.getElementById('resetModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeResetModal() {
    const modal = document.getElementById('resetModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function confirmResetToDefault() {
    currentCourses = [...DEFAULT_COURSES];
    localStorage.removeItem('geriatric_courses_data_v2');
    localStorage.removeItem('geriatric_sheet_csv_url_v2');
    
    populateTargetFilter();
    populateContactCourseSelect();
    renderCoursesList();
    
    alert("Î£ÎòÎù ÎöÎºÎòÎ¿ÎíÎÖÎØ Î®ÎòÎùÎûÎ¿ ÎæÎöÎªÎ£ÎùÎö Î£ÎáÎ¬ÎòÎáÎÖ ÎöÎ×ÎºÎòÎ¿ ÎöÎ×ÎóÎòÎôÎøÎáÎÖÎØ Î®Î£ Î®ÎáÎ¬ 2026.");
    closeResetModal();
}


/* --- 4. Î×ÎóÎ¿ÎøÎ¬ Î×Î®ÎòÎæÎÖÎØ (feedback.html) --- */
function initFeedbackSystem() {
    fetchLiveGoogleData();
}

function fetchLiveGoogleData(callback) {
    const sheetId = "1h2Y0ttDFF65rZDIFA3aFoU-osm8Snsjz_8P7pmXuOSA";
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=responseHandler:googleVisualizationCallback`;

    // Define the global callback function
    window.googleVisualizationCallback = function(response) {
        try {
            globalFeedbacks = [];
            if (response && response.table && response.table.rows) {
                response.table.rows.forEach(r => {
                    if (!r.c || r.c.length < 3) return;
                    
                    const course = (r.c[1] && r.c[1].v !== null) ? r.c[1].v.toString().trim() : "";
                    if (!course) return;
                    
                    let rating = 5;
                    if (r.c[2] && r.c[2].v !== null) {
                        const parsedRating = parseInt(r.c[2].v, 10);
                        if (!isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5) {
                            rating = parsedRating;
                        }
                    }
                    
                    let text = (r.c[10] && r.c[10].v !== null) ? r.c[10].v.toString().trim() : "";
                    if (text.length < 10 && r.c[9] && r.c[9].v !== null) {
                        const altText = r.c[9].v.toString().trim();
                        if (altText.length >= 10) {
                            text = altText;
                        }
                    }
                    
                    const name = "ÎæÎòÎÆÎ¿/Î¬ ÎºÎòÎ¿Îí";
                    const role = "Î×ÎóÎ¿ÎÜ ÎöÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ";
                    const workplace = "Î×ÎòÎíÎô Î¿ÎñÎòÎÉÎÖ";
                    
                    globalFeedbacks.push({ name, role, workplace, course, rating, text });
                });
            }
            console.log("Successfully loaded live reviews via GViz JSONP, count:", globalFeedbacks.length);
            
            processAndRenderFeedbackData();
            if (document.getElementById('coursesGrid')) {
                renderCoursesList();
            }
            if (callback) callback();
        } catch (e) {
            console.error("Error parsing GViz JSONP response, calling fallback:", e);
            runLocalFallback(callback);
        }
    };

    // Create and append the script tag
    const script = document.createElement('script');
    script.src = gvizUrl;
    script.onerror = function() {
        console.error("Failed to load GViz JSONP script, calling fallback");
        runLocalFallback(callback);
    };
    document.body.appendChild(script);
}

function runLocalFallback(callback) {
    if (typeof GOOGLE_REVIEWS_LIST !== 'undefined' && GOOGLE_REVIEWS_LIST.length > 0) {
        console.log("Loading static reviews from reviews-data.js (fallback), count:", GOOGLE_REVIEWS_LIST.length);
        globalFeedbacks = GOOGLE_REVIEWS_LIST.map(item => ({
            name: "ÎæÎòÎÆÎ¿/Î¬ ÎºÎòÎ¿Îí",
            role: "Î×ÎóÎ¿ÎÜ ÎöÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ",
            workplace: "Î×ÎòÎíÎô Î¿ÎñÎòÎÉÎÖ",
            course: item.course,
            rating: item.rating,
            text: item.text
        }));
    } else {
        globalFeedbacks = [];
    }
    processAndRenderFeedbackData();
    if (document.getElementById('coursesGrid')) {
        renderCoursesList();
    }
    if (callback) callback();
}

function processAndRenderFeedbackData() {
    let customFeedbacks = [];
    try {
        const stored = localStorage.getItem('iang_testimonials');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) customFeedbacks = parsed;
        }
    } catch (e) {}

    const allFeedbacks = [...customFeedbacks, ...initialFeedbacks, ...globalFeedbacks];

    // ÎùÎÖÎ®ÎòÎæ ÎòÎóÎôÎøÎòÎƒ ÎôÎÖÎ¿ÎòÎÆÎÖÎØ
    const ratings = calculateRatings(allFeedbacks);
    
    if (document.getElementById('dashCourseTableBody')) {
        renderFeedbackDashboard(ratings);
    }

    // ÎíÎÖÎáÎòÎƒ ÎòÎöÎªÎÆÎö Î®Î£ Î×Î®ÎòÎæÎÖÎØ ÎóÎØ Î×Î£Î£ Î×Î®Î×ÎóÎòÎ¬ÎÖ ÎæÎºÎÖÎ¿
    const listContainer = document.getElementById('testimonialsList');
    if (listContainer) {
        listContainer.innerHTML = '';
        
        // ÎíÎÖÎáÎòÎƒ Î£ÎñÎÖ ÎºÎòÎ¿Îí Î×Î¬ÎÖÎæÎ¬ ÎöÎíÎÖÎáÎòÎƒ ÎÉÎØ ÎöÎÖÎÉ ÎºÎÖÎÖÎ×Î¬
        const filterSelect = document.getElementById('wallCourseFilter');
        const selectedCourse = filterSelect ? filterSelect.value : 'ÎöÎøÎ£';
        
        let reviewsWithText = allFeedbacks.filter(item => {
            const hasText = item.text && item.text.trim().length > 0;
            if (!hasText) return false;
            
            // Î×Î®ÎòÎæÎÖÎØ ÎÉÎáÎòÎáÎÖÎ×ÎÖÎÖÎØ Î×ÎÆÎòÎÆÎ£ ÎñÎòÎ¿Î×Îí ÎáÎíÎáÎƒ Î¿Îº ÎÉÎØ ÎöÎØ ÎºÎªÎ¿ÎÖÎØ Î×-12 Î¬ÎòÎòÎÖÎØ ÎøÎôÎÖ Î£Î×ÎáÎòÎó ÎøÎ¿ÎÿÎÖÎíÎÖÎòÎ¬ Î¿ÎÖÎºÎòÎ¬ Î×Î¬ÎòÎøÎƒ.
            // Î×Î®ÎòÎæÎÖÎØ ÎÆÎ£ÎòÎÖÎÖÎØ Î®ÎáÎøÎ¬ÎæÎò ÎæÎÉÎ¬Î¿ Î¬Î×ÎÖÎô ÎáÎªÎÖÎÆ.
            const isGoogleReview = (item.name === "ÎæÎòÎÆÎ¿/Î¬ ÎºÎòÎ¿Îí" && item.role === "Î×ÎóÎ¿ÎÜ ÎöÎíÎÖÎóÎòÎô ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖ" && item.workplace === "Î×ÎòÎíÎô Î¿ÎñÎòÎÉÎÖ");
            if (isGoogleReview) {
                return item.text.trim().length > 12;
            }
            return true;
        });
        
        if (selectedCourse !== 'ÎöÎøÎ£') {
            reviewsWithText = reviewsWithText.filter(item => normalizeCourseKey(item.course) === selectedCourse);
        }
        
        // ÎóÎôÎøÎòÎƒ Î×ÎòÎáÎö ÎöÎ×Î®ÎòÎæÎÖÎØ ÎöÎôÎÖÎáÎ×ÎÖ ÎæÎôÎú Î£ÎñÎÖ ÎöÎíÎÖÎáÎòÎƒ
        const countBadge = document.getElementById('feedbackCount');
        if (countBadge) {
            countBadge.innerText = `${reviewsWithText.length} ÎùÎòÎòÎ¬ ÎôÎóÎ¬`;
        }

        const visibleReviews = reviewsWithText.slice(0, feedbacksVisibleCount);

        visibleReviews.forEach(item => {
            const initials = item.name ? item.name.split(' ').map(n => n[0]).join('') : 'Îæ';
            let starsHtml = 'Ôÿà'.repeat(item.rating) + 'Ôÿå'.repeat(5 - item.rating);
            const displayCourse = normalizeCourseKey(item.course);
            
            // ÎöÎªÎÆÎ¬ Î¬ÎñÎºÎÖÎô ÎòÎ×ÎòÎíÎô Î¿ÎñÎòÎÉÎÖ ÎæÎªÎòÎ¿Îö ÎÖÎñÎö
            let subtitle = item.role || "";
            if (item.workplace && item.workplace.trim() !== "" && item.workplace !== "Î×ÎòÎíÎô Î¿ÎñÎòÎÉÎÖ") {
                subtitle += ` | ${item.workplace}`;
            }

            listContainer.innerHTML += `
                <article class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="user-info">
                            <div class="user-avatar">${initials}</div>
                            <div class="user-details">
                                <h4>${item.name}</h4>
                                <p>${subtitle}</p>
                            </div>
                        </div>
                        <div class="star-rating">${starsHtml}</div>
                    </div>
                    <span class="course-referred">ÎºÎòÎ¿Îí: ${displayCourse}</span>
                    <p class="testimonial-text">"${item.text}"</p>
                </article>
            `;
        });

        // ÎáÎÖÎöÎòÎ£ ÎøÎñÎ¬ÎòÎ¿ "ÎÿÎóÎƒ ÎóÎòÎô" (Load More)
        let loadMoreContainer = document.getElementById('loadMoreContainer');
        if (reviewsWithText.length > feedbacksVisibleCount) {
            if (!loadMoreContainer) {
                loadMoreContainer = document.createElement('div');
                loadMoreContainer.id = 'loadMoreContainer';
                loadMoreContainer.style.textAlign = 'center';
                loadMoreContainer.style.marginTop = '32px';
                loadMoreContainer.style.width = '100%';
                loadMoreContainer.style.gridColumn = '1 / -1';
                listContainer.parentNode.insertBefore(loadMoreContainer, listContainer.nextSibling);
            }
            loadMoreContainer.innerHTML = `
                <button class="btn-secondary" id="loadMoreBtn" style="padding: 12px 32px; font-size: 1rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                    ÎöÎªÎÆ ÎùÎòÎòÎ¬ ÎôÎóÎ¬ ÎáÎòÎíÎñÎòÎ¬ (${reviewsWithText.length - feedbacksVisibleCount} ÎáÎòÎ¬Î¿Îò)
                </button>
            `;
            
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                loadMoreBtn.onclick = function() {
                    feedbacksVisibleCount += 15;
                    processAndRenderFeedbackData();
                };
            }
        } else {
            if (loadMoreContainer) {
                loadMoreContainer.remove();
            }
        }
    }
}

// ÎáÎ¿Î×ÎòÎ£ ÎòÎ×ÎÖÎñÎòÎÖ Î×ÎñÎ¬ÎùÎòÎ¬ ÎºÎòÎ¿ÎíÎÖÎØ Î×ÎòÎ£ Î×ÎÉÎÆÎ¿ 18 ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎöÎ¿Î®Î×ÎÖÎÖÎØ
function normalizeCourseKey(courseName) {
    if (!courseName) return "";
    const clean = courseName.trim();
    
    // ÎÉÎØ ÎöÎ®ÎØ Î®ÎáÎ×ÎíÎ¿ ÎöÎòÎÉ ÎæÎôÎÖÎòÎº ÎÉÎùÎô Î×-18 ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎöÎ¿Î®Î×ÎÖÎÖÎØ, ÎáÎùÎûÎÖÎ¿ ÎÉÎòÎ¬Îò ÎÖÎ®ÎÖÎ¿ÎòÎ¬
    if (typeof DEFAULT_COURSES !== 'undefined' && DEFAULT_COURSES.some(c => c.title === clean)) {
        return clean;
    }
    
    const mapping = {
        "wounds": "ÎºÎòÎ¿Îí ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎòÎíÎÿÎòÎ×Îö",
        "pain": "ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "infection": "Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "risk": "ÎáÎÖÎöÎòÎ£ ÎíÎÖÎøÎòÎáÎÖÎØ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎöÎÿÎÖÎñÎòÎ£",
        "palliative": "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ (ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ) ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "person": "ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "diabetes": "ÎáÎÖÎöÎòÎ£ ÎÿÎÖÎñÎòÎ£ ÎæÎíÎòÎøÎ¿Î¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        
        "ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎºÎ®ÎÖÎØ ÎæÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬": "ÎºÎòÎ¿Îí ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎòÎíÎÿÎòÎ×Îö",
        "ÎºÎòÎ¿Îí ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎòÎÉÎÖÎøÎòÎ¬ ÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö": "ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "ÎºÎòÎ¿Îí Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö": "Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "ÎæÎÿÎÖÎùÎòÎ¬ ÎöÎÿÎÖÎñÎòÎ£ ÎòÎáÎÖÎöÎòÎ£ ÎíÎÖÎøÎòÎáÎÖÎØ ÎæÎ×ÎóÎ¿ÎøÎ¬ ÎöÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎ¬": "ÎáÎÖÎöÎòÎ£ ÎíÎÖÎøÎòÎáÎÖÎØ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎöÎÿÎÖÎñÎòÎ£",
        "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ (ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ) ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö": "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ (ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ) ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ (Person-Centered) ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö": "ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö",
        "ÎºÎòÎ¿Îí ÎíÎòÎøÎ¿Î¬ Î×Î¬ÎºÎôÎØ ÎòÎñÎ¿ÎºÎÖÎØ ÎáÎæÎùÎ¿ÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö": "ÎáÎÖÎöÎòÎ£ ÎÿÎÖÎñÎòÎ£ ÎæÎíÎòÎøÎ¿Î¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö"
    };
    
    if (mapping[clean]) return mapping[clean];
    
    if (clean.includes("ÎñÎªÎóÎÖÎØ") || clean.includes("ÎñÎªÎó")) {
        return "ÎºÎòÎ¿Îí ÎáÎÖÎöÎòÎ£ ÎöÎÿÎÖÎñÎòÎ£ ÎæÎñÎªÎóÎÖÎØ ÎòÎíÎÿÎòÎ×Îö";
    }
    if (clean.includes("ÎøÎÉÎæ")) {
        return "ÎáÎÖÎöÎòÎ£ ÎøÎÉÎæ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("ÎûÎÖÎöÎòÎ×ÎÖÎØ") || clean.includes("ÎûÎÖÎöÎòÎØ")) {
        return "Î×ÎáÎÖÎóÎ¬ ÎûÎÖÎöÎòÎ×ÎÖÎØ Î£ÎÉÎùÎÖÎØ ÎòÎÉÎùÎÖÎòÎ¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("ÎíÎÖÎøÎòÎáÎÖÎØ") || clean.includes("ÎæÎÿÎÖÎùÎòÎ¬")) {
        return "ÎáÎÖÎöÎòÎ£ ÎíÎÖÎøÎòÎáÎÖÎØ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎöÎÿÎÖÎñÎòÎ£";
    }
    if (clean.includes("ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ") || clean.includes("Î¬ÎòÎ×ÎÜ") || clean.includes("ÎíÎòÎú ÎöÎùÎÖÎÖÎØ")) {
        return "ÎÿÎÖÎñÎòÎ£ Î¬ÎòÎ×ÎÜ (ÎñÎ£ÎÖÎÉÎÿÎÖÎæÎÖ) ÎòÎ×ÎªÎæÎÖ ÎíÎòÎú ÎöÎùÎÖÎÖÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("Î×Î×ÎòÎºÎô ÎÉÎôÎØ")) {
        return "ÎÿÎÖÎñÎòÎ£ Î×Î×ÎòÎºÎô ÎÉÎôÎØ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("ÎíÎøÎ¿Î¬") || clean.includes("ÎíÎòÎøÎ¿Î¬") || clean.includes("ÎíÎòÎøÎ¿Î¬ Î×Î¬ÎºÎôÎØ")) {
        return "ÎáÎÖÎöÎòÎ£ ÎÿÎÖÎñÎòÎ£ ÎæÎíÎòÎøÎ¿Î¬ ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("ÎöÎñÎ¿Î®Îö") || clean.includes("ÎóÎªÎÖÎ¿ÎòÎ¬") || clean.includes("ÎíÎòÎÆÎ¿ÎÖÎØ")) {
        return "Î×ÎáÎÖÎóÎ¬ ÎóÎªÎÖÎ¿ÎòÎ¬ ÎòÎ®Î£ÎÖÎÿÎö ÎóÎ£ ÎíÎòÎÆÎ¿ÎÖÎØ";
    }
    if (clean.includes("ÎáÎÖÎöÎòÎ£ ÎæÎøÎÖÎ¿") || clean.includes("ÎáÎÖÎöÎòÎ£ Î×ÎáÎöÎÖÎÆÎòÎ¬") || clean.includes("Î×ÎáÎöÎÖÎÆÎòÎ¬")) {
        return "Î×ÎáÎöÎÖÎÆÎòÎ¬ ÎÖÎÖÎ®ÎòÎ×ÎÖÎ¬ Î£ÎÉÎùÎÖÎòÎ¬ ÎÉÎùÎ¿ÎÉÎÖÎòÎ¬";
    }
    if (clean.includes("ÎóÎôÎøÎòÎƒ ÎÖÎôÎó") || clean.includes("ÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö ÎòÎæÎñÎíÎÖÎøÎòÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö")) {
        return "ÎóÎôÎøÎòÎƒ ÎÖÎôÎó ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö ÎòÎæÎñÎíÎÖÎøÎòÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("ÎíÎæÎÖÎæÎö")) {
        return "ÎöÎóÎ®Î¿Î¬ ÎÖÎôÎó ÎæÎæÎ¿ÎÖÎÉÎòÎ¬ ÎöÎíÎæÎÖÎæÎö ÎæÎÆÎ¿ÎÖÎÉÎÿÎ¿ÎÖÎö";
    }
    if (clean.includes("Î×ÎôÎ¿ÎÖÎøÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ") || clean.includes("ÎöÎôÎ¿ÎøÎö Î£Î×ÎôÎ¿ÎÖÎøÎÖÎØ")) {
        return "ÎöÎôÎ¿ÎøÎö Î£Î×ÎôÎ¿ÎÖÎøÎÖÎØ ÎºÎ£ÎÖÎáÎÖÎÖÎØ";
    }
    if (clean.includes("ÎôÎ×ÎáÎªÎÖÎö")) {
        return "ÎÉÎ¿ÎÆÎû ÎøÎ£ÎÖÎØ Î£ÎÿÎÖÎñÎòÎ£ ÎæÎôÎ×ÎáÎªÎÖÎö";
    }
    if (clean.includes("Î×ÎòÎáÎ®ÎØ")) {
        return "ÎöÎóÎ®Î¿Î¬ ÎÖÎôÎó: ÎÿÎÖÎñÎòÎ£ ÎæÎùÎòÎ£Îö ÎöÎ×ÎòÎáÎ®ÎØ ÎöÎøÎ¿ÎòÎáÎÖ";
    }
    if (clean.includes("ÎñÎ¿ÎòÎôÎºÎÿÎÖÎæÎÖÎòÎ¬")) {
        return "ÎñÎÖÎ¬ÎòÎù Î×ÎÖÎòÎ×ÎáÎòÎÖÎòÎ¬ ÎñÎ¿ÎòÎôÎºÎÿÎÖÎæÎÖÎòÎ¬";
    }
    if (clean.includes("ÎùÎÖÎíÎòÎƒ")) {
        return "ÎæÎ¿ÎÖÎÉÎòÎ¬ ÎöÎóÎòÎæÎô - ÎáÎÉÎ×Îƒ ÎáÎòÎ®ÎÉ Î¬ÎòÎ¿Î¬ ÎöÎùÎÖÎíÎòÎáÎÖÎØ Î£ÎóÎòÎæÎôÎÖ Î×ÎóÎ¿ÎøÎ¬ ÎöÎæÎ¿ÎÖÎÉÎòÎ¬";
    }
    if (clean.includes("Î×ÎòÎ¿ÎøÎæ")) {
        return "ÎöÎøÎ®Î¿Îö Î¿Îæ-Î×ÎºÎªÎòÎóÎÖÎ¬: ÎÉÎÖÎøÎòÎ¬ ÎòÎæÎÿÎÖÎùÎòÎ¬ ÎæÎÿÎÖÎñÎòÎ£ ÎæÎùÎòÎ£Îö ÎöÎ×ÎòÎ¿ÎøÎæ";
    }
    
    return clean;
}

// ÎùÎÖÎ®ÎòÎæ ÎôÎÖÎ¿ÎòÎÆÎÖÎØ Î×Î¬ÎòÎÜ Î×ÎóÎ¿ÎÜ ÎáÎ¬ÎòÎáÎÖÎØ ÎøÎ£Î£ÎÖ (ÎóÎ£ ÎæÎíÎÖÎí 18 ÎöÎºÎòÎ¿ÎíÎÖÎØ ÎöÎ¿Î®Î×ÎÖÎÖÎØ)
function calculateRatings(allFeedbacks) {
    const totalReviews = allFeedbacks.length;
    const overallSum = allFeedbacks.reduce((sum, item) => sum + item.rating, 0);
    const overallAvg = totalReviews > 0 ? (overallSum / totalReviews).toFixed(1) : "0.0";
    
    const coursesMap = {};
    DEFAULT_COURSES.forEach(course => {
        coursesMap[course.title] = { sum: 0, count: 0 };
    });
    
    allFeedbacks.forEach(item => {
        let key = normalizeCourseKey(item.course);
        if (coursesMap[key]) {
            coursesMap[key].sum += item.rating;
            coursesMap[key].count++;
        }
    });
    
    const breakdown = {};
    Object.keys(coursesMap).forEach(key => {
        const item = coursesMap[key];
        breakdown[key] = {
            count: item.count,
            avg: item.count > 0 ? (item.sum / item.count).toFixed(1) : null
        };
    });
    
    return { totalReviews, overallAvg, breakdown };
}

function renderFeedbackDashboard(ratings) {
    const avgEl = document.getElementById('dashAvgRating');
    const totalEl = document.getElementById('dashTotalReviews');
    const tableBody = document.getElementById('dashCourseTableBody');
    
    if (avgEl) avgEl.innerText = `${ratings.overallAvg} Ôÿà`;
    if (totalEl) totalEl.innerText = ratings.totalReviews;
    
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Î×ÎÖÎòÎƒ ÎºÎòÎ¿ÎíÎÖÎØ Î£ÎñÎÖ ÎøÎ×ÎòÎ¬ Î×Î®ÎÖÎæÎÖÎØ ÎæÎíÎôÎ¿ ÎÖÎòÎ¿Îô
        const sortedKeys = Object.keys(ratings.breakdown).sort((a, b) => {
            return ratings.breakdown[b].count - ratings.breakdown[a].count;
        });

        sortedKeys.forEach(key => {
            const item = ratings.breakdown[key];
            const avgStr = item.avg !== null ? `${item.avg} Ôÿà` : 'ÎÉÎÖÎƒ Î×Î®ÎòÎæÎÖÎØ ÎóÎôÎÖÎÖÎƒ';
            const starsNum = item.avg !== null ? Math.round(parseFloat(item.avg)) : 0;
            const starsStr = 'Ôÿà'.repeat(starsNum) + 'Ôÿå'.repeat(5 - starsNum);
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${key}</strong></td>
                <td>${item.count}</td>
                <td>
                    <span class="dashboard-table-stars">${starsStr}</span>
                    <span style="margin-right: 6px;">(${avgStr})</span>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Î®Î£ÎÖÎùÎ¬ Î×Î®ÎòÎæ ÎùÎôÎ® Î×ÎôÎú feedback.html
function submitNewFeedback(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedbackName').value;
    const roleInput = document.getElementById('feedbackRole').value;
    const course = document.getElementById('feedbackCourse').value;
    const text = document.getElementById('feedbackText').value;
    
    const ratingActive = document.querySelector('input[name="rating"]:checked');
    if (!ratingActive) {
        alert("ÎÉÎáÎÉ ÎæÎùÎ¿Îò ÎôÎÖÎ¿ÎòÎÆ ÎøÎòÎøÎæÎÖÎØ Î£ÎºÎòÎ¿Îí.");
        return;
    }
    const rating = parseInt(ratingActive.value, 10);
    
    let role = roleInput.trim();
    let workplace = "";
    if (roleInput.includes(',')) {
        const parts = roleInput.split(',');
        role = parts[0].trim();
        workplace = parts.slice(1).join(',').trim();
    } else if (roleInput.includes('|')) {
        const parts = roleInput.split('|');
        role = parts[0].trim();
        workplace = parts.slice(1).join('|').trim();
    } else if (roleInput.includes('-')) {
        const parts = roleInput.split('-');
        role = parts[0].trim();
        workplace = parts.slice(1).join('-').trim();
    }
    
    const newFeedbackItem = { name, role, workplace, course, rating, text };
    
    let customFeedbacks = [];
    try {
        const stored = localStorage.getItem('iang_testimonials');
        if (stored) customFeedbacks = JSON.parse(stored);
    } catch (e) {}
    
    customFeedbacks.unshift(newFeedbackItem);
    
    try {
        localStorage.setItem('iang_testimonials', JSON.stringify(customFeedbacks));
    } catch (e) {}
    
    processAndRenderFeedbackData();
    
    alert(`Î¬ÎòÎôÎö Î¿ÎæÎö, ${name}!\nÎöÎ×Î®ÎòÎæ Î®Î£ÎÜ ÎñÎòÎ¿ÎíÎØ ÎæÎöÎªÎ£ÎùÎö ÎòÎöÎ¬ÎòÎòÎíÎú Î£ÎºÎÖÎ¿ ÎöÎöÎ×Î£ÎªÎòÎ¬.`);
    event.target.reset();
}


/* --- 6. Î×ÎóÎ¿ÎøÎ¬ ÎôÎ®ÎæÎòÎ¿Îô Î×Î×ÎªÎÉÎÖÎØ ÎòÎÆÎ¿ÎñÎÖÎØ (dashboard.html) --- */
let coursesChartInstance = null;

function initDashboardSystem() {
    // ÎöÎÆÎôÎ¿ÎòÎ¬ ÎóÎÖÎªÎòÎæ ÎÆÎ£ÎòÎæÎ£ÎÖÎòÎ¬ Î£ÎÆÎ¿ÎñÎÖÎØ
    Chart.defaults.font.family = "'Rubik', sans-serif";
    Chart.defaults.color = '#9ca3af'; // var(--text-muted)
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)'; // var(--border-color)

    // 1. Î®Î¿ÎÿÎòÎÿ ÎÆÎ¿ÎñÎÖÎØ Î®Î£ Î¿ÎôÎÉÎ¿ ÎòÎºÎò (ÎáÎ¬ÎòÎáÎÖÎØ Î×ÎÖÎÖÎªÎÆÎÖÎØ/ÎöÎÖÎíÎÿÎòÎ¿ÎÖÎÖÎØ)
    renderStaticDashboardCharts();

    // 2. Î×Î®ÎÖÎøÎ¬ ÎöÎáÎ¬ÎòÎáÎÖÎØ ÎöÎùÎÖÎÖÎØ Î£ÎóÎôÎøÎòÎƒ ÎöÎ×ÎòÎáÎÖÎØ ÎòÎÆÎ¿Îú ÎóÎ×ÎòÎôÎòÎ¬ ÎöÎºÎòÎ¿ÎíÎÖÎØ
    fetchLiveGoogleData(() => {
        updateDashboardDataWithLiveRatings();
    });
}

function renderStaticDashboardCharts() {
    // ÎÉ) ÎÆÎ¿Îú Î¿ÎôÎÉÎ¿
    const ctxRadar = document.getElementById('radarChart');
    if (ctxRadar) {
        new Chart(ctxRadar.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Î×ÎºÎªÎòÎóÎÖÎòÎ¬ ÎöÎ×Î¿ÎªÎö', 'Î¿Î£ÎòÎòÎáÎÿÎÖÎòÎ¬ ÎñÎ¿ÎºÎÿÎÖÎ¬', 'ÎÉÎÖÎøÎòÎ¬ ÎöÎùÎòÎ×Î¿ÎÖÎØ', 'ÎÉÎ¿ÎÆÎòÎƒ ÎòÎ×ÎáÎöÎ£Îö', 'Î×ÎóÎáÎö Î£Î®ÎÉÎ£ÎòÎ¬'],
                datasets: [{
                    label: "Î×ÎùÎûÎòÎ¿ ÎÉ'",
                    data: [4.8, 4.5, 4.2, 4.7, 4.6],
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    borderColor: '#f59e0b',
                    borderWidth: 2,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#f59e0b'
                }, {
                    label: "Î×ÎùÎûÎòÎ¿ Îæ' (ÎáÎòÎøÎùÎÖ)",
                    data: [4.9, 4.8, 4.6, 4.5, 4.8],
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    borderColor: '#06b6d4',
                    borderWidth: 2,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#06b6d4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { boxWidth: 12, color: '#f3f4f6' }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                        grid: { color: 'rgba(255, 255, 255, 0.08)' },
                        pointLabels: { color: '#9ca3af', font: { size: 10 } },
                        ticks: { display: false },
                        min: 0,
                        max: 5
                    }
                }
            }
        });
    }

    // Îæ) ÎÆÎ¿Îú ÎºÎò Î×ÎÆÎ×Îö
    const ctxTimeline = document.getElementById('timelineChart');
    if (ctxTimeline) {
        new Chart(ctxTimeline.getContext('2d'), {
            type: 'line',
            data: {
                labels: ["Î¿ÎæÎóÎòÎƒ ÎÉ' 25", "Î¿ÎæÎóÎòÎƒ Îæ' 25", "Î¿ÎæÎóÎòÎƒ ÎÆ' 25", "Î¿ÎæÎóÎòÎƒ Îô' 25", "Î¿ÎæÎóÎòÎƒ ÎÉ' 26"],
                datasets: [{
                    label: 'ÎÉÎÖÎøÎòÎ¬ ÎöÎöÎôÎ¿ÎøÎö ÎöÎøÎ£Î£ÎÖÎ¬',
                    data: [4.2, 4.4, 4.5, 4.7, 4.85],
                    borderColor: '#f59e0b',
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#090d16',
                    pointHoverRadius: 7
                }, {
                    label: 'Î¬Î¿ÎòÎ×Îö ÎÖÎ®ÎÖÎ¿Îö Î£ÎóÎæÎòÎôÎö ÎæÎ®ÎÿÎù',
                    data: [4.0, 4.1, 4.3, 4.6, 4.7],
                    borderColor: '#06b6d4',
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#090d16',
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { boxWidth: 12, color: '#f3f4f6' }
                    }
                },
                scales: {
                    y: {
                        min: 3.5,
                        max: 5,
                        grid: { color: 'rgba(255, 255, 255, 0.08)' },
                        ticks: { color: '#9ca3af' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af' }
                    }
                }
            }
        });
    }
}

function updateDashboardDataWithLiveRatings() {
    // ÎöÎøÎáÎ¬ Î×ÎóÎ¿ÎÜ Î×Î®ÎòÎæÎÖÎØ Î×Î®ÎòÎ£Îæ
    let customFeedbacks = [];
    try {
        const stored = localStorage.getItem('iang_testimonials');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) customFeedbacks = parsed;
        }
    } catch (e) {}
    const allFeedbacks = [...customFeedbacks, ...initialFeedbacks, ...globalFeedbacks];
    const ratings = calculateRatings(allFeedbacks);

    // 1. ÎóÎôÎøÎòÎƒ Î×ÎòÎáÎÖÎØ ÎæÎôÎ®ÎæÎòÎ¿Îô
    const totalEl = document.getElementById('dashTotalReviews');
    const avgEl = document.getElementById('dashAvgRating');
    const countEl = document.getElementById('dashCoursesCount');

    if (totalEl) totalEl.innerText = allFeedbacks.length.toLocaleString();
    if (avgEl) avgEl.innerText = `${ratings.overallAvg} / 5.0`;
    
    // ÎºÎòÎ¿ÎíÎÖÎØ Î×ÎòÎóÎ¿ÎøÎÖÎØ ÎæÎ×ÎóÎ¿ÎøÎ¬
    let ratedCoursesCount = 0;
    Object.keys(ratings.breakdown).forEach(key => {
        if (ratings.breakdown[key].count > 0) ratedCoursesCount++;
    });
    // ÎÉÎØ ÎÉÎÖÎƒ ÎºÎòÎ¿ÎíÎÖÎØ Î×ÎòÎóÎ¿ÎøÎÖÎØ ÎóÎôÎÖÎÖÎƒ, ÎáÎªÎÖÎÆ ÎøÎ×ÎòÎ¬ ÎºÎæÎòÎóÎö ÎöÎ×ÎæÎòÎíÎíÎ¬ ÎóÎ£ ÎöÎ×ÎóÎ¿ÎøÎ¬
    if (countEl) countEl.innerText = `${ratedCoursesCount > 0 ? ratedCoursesCount : 7} ÎºÎòÎ¿ÎíÎÖÎØ`;

    // 2. ÎóÎôÎøÎòÎƒ ÎÆÎ¿Îú ÎóÎ×ÎòÎôÎòÎ¬ ÎºÎòÎ¿ÎíÎÖÎØ ÎôÎÖÎáÎ×ÎÖ
    const ctxCourses = document.getElementById('coursesChart');
    if (ctxCourses) {
        const courseLabels = [];
        const courseScores = [];
        
        Object.keys(ratings.breakdown).forEach(key => {
            const count = ratings.breakdown[key].count;
            if (count > 0) {
                let label = key;
                if (label.length > 20) {
                    label = label.substring(0, 18) + "...";
                }
                courseLabels.push(label);
                const avg = ratings.breakdown[key].avg;
                courseScores.push(avg !== null ? parseFloat(avg) : 0);
            }
        });

        // ÎÉÎØ ÎóÎôÎÖÎÖÎƒ ÎÉÎÖÎƒ Î×Î®ÎòÎæÎÖÎØ Î£ÎøÎ£ÎòÎØ, ÎáÎÿÎóÎƒ ÎáÎ¬ÎòÎáÎÖ ÎôÎ×Îò Î£ÎÖÎòÎñÎÖ
        const hasData = courseScores.some(s => s > 0);
        const finalScores = hasData ? courseScores : [4.8, 4.6, 4.9, 4.4, 4.7, 4.5, 4.6];

        if (coursesChartInstance) {
            coursesChartInstance.destroy();
        }

        coursesChartInstance = new Chart(ctxCourses.getContext('2d'), {
            type: 'bar',
            data: {
                labels: courseLabels,
                datasets: [{
                    label: 'ÎªÎÖÎòÎƒ Î×Î×ÎòÎªÎó (1-5)',
                    data: finalScores,
                    backgroundColor: 'rgba(6, 182, 212, 0.85)',
                    hoverBackgroundColor: '#f59e0b',
                    borderRadius: 8,
                    barThickness: 28
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 5,
                        grid: { color: 'rgba(255, 255, 255, 0.08)' },
                        ticks: { stepSize: 1, color: '#9ca3af' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af', font: { size: 9 } }
                    }
                }
            }
        });
    }
}

// ÎÿÎÖÎñÎòÎ£ ÎæÎ®ÎÖÎáÎòÎÖ ÎíÎÖÎáÎòÎƒ ÎºÎòÎ¿ÎíÎÖÎØ ÎæÎºÎÖÎ¿ ÎöÎöÎ×Î£ÎªÎòÎ¬
function handleWallFilterChange() {
    feedbacksVisibleCount = 15;
    processAndRenderFeedbackData();
}

/* --- Î×ÎóÎ¿ÎøÎ¬ Î×Î®ÎòÎæ ÎöÎóÎ¿ÎøÎ¬ Î×Î¿ÎªÎÖÎØ ÎòÎ¬ÎòÎøÎƒ (ÎÉÎáÎòÎáÎÖÎ×ÎÖ) --- */
function openLecturerModal() {
    const modal = document.getElementById('lecturerFeedbackModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLecturerModal() {
    const modal = document.getElementById('lecturerFeedbackModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function submitLecturerFeedback(event) {
    event.preventDefault();
    
    const course = document.getElementById('lecturerFeedbackCourse').value;
    const lecturerRatingActive = document.querySelector('input[name="lecturerRating"]:checked');
    const contentRatingActive = document.querySelector('input[name="contentRating"]:checked');
    const text = document.getElementById('lecturerFeedbackText').value;
    
    if (!lecturerRatingActive || !contentRatingActive) {
        alert("ÎÉÎáÎÉ ÎôÎ¿ÎÆÎò ÎÉÎ¬ ÎøÎ£ ÎöÎ®ÎÉÎ£ÎòÎ¬.");
        return;
    }
    
    const lecturerRating = parseInt(lecturerRatingActive.value, 10);
    const contentRating = parseInt(contentRatingActive.value, 10);
    
    const feedbackItem = {
        course,
        lecturerRating,
        contentRating,
        text,
        timestamp: new Date().toISOString()
    };
    
    let lecturerFeedbacks = [];
    try {
        const stored = localStorage.getItem('iang_lecturer_feedbacks');
        if (stored) lecturerFeedbacks = JSON.parse(stored);
    } catch (e) {}
    
    lecturerFeedbacks.unshift(feedbackItem);
    
    try {
        localStorage.setItem('iang_lecturer_feedbacks', JSON.stringify(lecturerFeedbacks));
    } catch (e) {}
    
    alert("Î¬ÎòÎôÎö Î¿ÎæÎö! ÎöÎ×Î®ÎòÎæ ÎöÎÉÎáÎòÎáÎÖÎ×ÎÖ Î®Î£ÎÜ ÎóÎ£ ÎöÎ×Î¿ÎªÎö ÎòÎöÎ¬ÎòÎøÎƒ ÎöÎ¬ÎºÎæÎ£ ÎæÎöÎªÎ£ÎùÎö ÎòÎÖÎíÎÖÎÖÎó Î£ÎáÎò Î£ÎöÎ®Î¬ÎñÎ¿.");
    
    event.target.reset();
    closeLecturerModal();
}
