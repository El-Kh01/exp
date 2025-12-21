// Все 69 Федеральных органов исполнительной власти
const FOIV_DATA = [
    // ===== МИНИСТЕРСТВА (21) =====
    {
        id: "minfin",
        name: "Министерство финансов Российской Федерации",
        shortName: "Минфин России",
        type: "ministry",
        structure: "government",
        sphere: "economic",
        powers: ["normative"],
        description: "ФОИВ, осуществляющий функции по выработке государственной политики и нормативно-правовому регулированию в сфере бюджетной, налоговой, страховой, валютной, банковской деятельности, государственного долга, аудиторской деятельности, бухгалтерского учета и бухгалтерской отчетности, производства, переработки и обращения драгоценных металлов и драгоценных камней, таможенных платежей, определения таможенной стоимости товаров и транспортных средств, инвестирования средств для финансирования накопительной пенсии, организации и проведения лотерей, производства и оборота защищенной полиграфической продукции, финансового обеспечения государственной службы, противодействия легализации доходов, полученных преступным путем, и финансированию терроризма.",
        website: "https://minfin.gov.ru",
        legalBasis: "Постановление Правительства РФ от 30.06.2004 № 329",
        leader: "Силуанов Антон Германович",
        established: "1802 год",
        address: "г. Москва, ул. Ильинка, д. 9",
        phone: "+7 (495) 987-91-01",
        email: "info@minfin.ru"
    },
    {
        id: "minjust",
        name: "Министерство юстиции Российской Федерации",
        shortName: "Минюст России",
        type: "ministry",
        structure: "president",
        sphere: "political",
        powers: ["normative"],
        description: "ФОИВ, осуществляющий функции по выработке и реализации государственной политики и нормативно-правовому регулированию в сфере исполнения уголовных наказаний, регистрации некоммерческих организаций, включая отделения международных организаций и иностранных некоммерческих неправительственных организаций, политические партии, иные общественные объединения и религиозные организации, а также в сфере адвокатуры, нотариата, государственной регистрации актов гражданского состояния.",
        website: "https://minjust.gov.ru",
        legalBasis: "Указ Президента РФ от 13.10.2004 № 1313",
        leader: "Чуйченко Константин Анатольевич",
        established: "1802 год",
        address: "г. Москва, ул. Житная, д. 14",
        phone: "+7 (495) 547-90-00",
        email: "info@minjust.ru"
    },
    // Добавь остальные 19 министерств здесь
    
    // ===== ФЕДЕРАЛЬНЫЕ СЛУЖБЫ (30) =====
    {
        id: "fsb",
        name: "Федеральная служба безопасности Российской Федерации",
        shortName: "ФСБ России",
        type: "service",
        structure: "president",
        sphere: "political",
        powers: ["supervision"],
        description: "ФОИВ, осуществляющий функции по контролю и надзору в сфере государственной безопасности, борьбы с терроризмом, защиты и охраны государственной границы Российской Федерации, защиты внутренних морских вод, территориального моря, исключительной экономической зоны, континентального шельфа Российской Федерации и их природных ресурсов, обеспечения информационной безопасности, а также специальные функции в области обороны.",
        website: "https://fsb.ru",
        legalBasis: "Федеральный закон от 03.04.1995 № 40-ФЗ",
        leader: "Бортников Александр Васильевич",
        established: "1995 год",
        address: "г. Москва, Лубянская пл., д. 2",
        phone: "+7 (495) 224-70-69",
        email: "info@fsb.ru"
    },
    // Добавь остальные 29 служб здесь
    
    // ===== ФЕДЕРАЛЬНЫЕ АГЕНТСТВА (18) =====
    {
        id: "rospotrebnadzor",
        name: "Федеральная служба по надзору в сфере защиты прав потребителей и благополучия человека",
        shortName: "Роспотребнадзор",
        type: "service",
        structure: "government",
        sphere: "social",
        powers: ["supervision"],
        description: "ФОИВ, осуществляющий функции по контролю и надзору в сфере обеспечения санитарно-эпидемиологического благополучия населения, защиты прав потребителей и потребительского рынка.",
        website: "https://rospotrebnadzor.ru",
        legalBasis: "Постановление Правительства РФ от 30.06.2004 № 322",
        leader: "Попова Анна Юрьевна",
        established: "2004 год",
        address: "г. Москва, Вадковский пер., д. 18, стр. 5,7",
        phone: "+7 (499) 973-26-90",
        email: "depart@gsen.ru"
    },
    // Добавь остальные 17 агентств здесь
];

// Экспорт данных для использования в других скриптах
window.FOIV_DATA = FOIV_DATA;

// Вспомогательные функции для работы с данными
window.FOIV_UTILS = {
    // Получить ФОИВ по ID
    getById: function(id) {
        return FOIV_DATA.find(foiv => foiv.id === id);
    },
    
    // Получить все ФОИВы определенного типа
    getByType: function(type) {
        return FOIV_DATA.filter(foiv => foiv.type === type);
    },
    
    // Получить все ФОИВы определенной структуры
    getByStructure: function(structure) {
        return FOIV_DATA.filter(foiv => foiv.structure === structure);
    },
    
    // Получить все ФОИВы определенной сферы
    getBySphere: function(sphere) {
        return FOIV_DATA.filter(foiv => foiv.sphere === sphere);
    },
    
    // Получить все ФОИВы с определенным полномочием
    getByPower: function(power) {
        return FOIV_DATA.filter(foiv => foiv.powers && foiv.powers.includes(power));
    },
    
    // Статистика
    getStats: function() {
        return {
            total: FOIV_DATA.length,
            ministries: FOIV_DATA.filter(f => f.type === 'ministry').length,
            services: FOIV_DATA.filter(f => f.type === 'service').length,
            agencies: FOIV_DATA.filter(f => f.type === 'agency').length,
            president: FOIV_DATA.filter(f => f.structure === 'president').length,
            government: FOIV_DATA.filter(f => f.structure === 'government').length,
            political: FOIV_DATA.filter(f => f.sphere === 'political').length,
            economic: FOIV_DATA.filter(f => f.sphere === 'economic').length,
            social: FOIV_DATA.filter(f => f.sphere === 'social').length
        };
    }
};
