// foiv.js - Основной файл для модуля ФОИВ
// ВАШ СПИСОК ОРГАНОВ - редактируйте ТОЛЬКО этот массив
const foivData = [
    {
        "id": "mvd",
        "name": "Министерство внутренних дел Российской Федерации",
        "shortName": "МВД России",
        "sphere": "political",
        "topics": ["внутренние дела"],
        "officialWebsite": "https://мвд.рф"
    },
    {
        "id": "mchs",
        "name": "Министерство Российской Федерации по делам гражданской обороны, чрезвычайным ситуациям и ликвидации последствий стихийных бедствий",
        "shortName": "МЧС России",
        "sphere": "political",
        "topics": ["внутренние дела", "гражданская оборона", "чрезвычайные ситуации"],
        "officialWebsite": "https://www.mchs.gov.ru"
    },
    {
        "id": "mid",
        "name": "Министерство иностранных дел Российской Федерации",
        "shortName": "МИД России",
        "sphere": "political",
        "topics": ["иностранные дела"],
        "officialWebsite": "https://mid.ru"
    },
    {
        "id": "minoborony",
        "name": "Министерство обороны Российской Федерации",
        "shortName": "Минобороны России",
        "sphere": "political",
        "topics": ["оборона"],
        "officialWebsite": "https://mil.ru"
    },
    {
        "id": "minjust",
        "name": "Министерство юстиции Российской Федерации",
        "shortName": "Минюст России",
        "sphere": "political",
        "topics": ["юстиция"],
        "officialWebsite": "https://minjust.gov.ru"
    },
    {
        "id": "fsb",
        "name": "Федеральная служба безопасности Российской Федерации",
        "shortName": "ФСБ России",
        "sphere": "political",
        "topics": ["государственная безопасность"],
        "officialWebsite": "https://www.fsb.ru"
    },
    {
        "id": "svr",
        "name": "Служба внешней разведки Российской Федерации",
        "shortName": "СВР России",
        "sphere": "political",
        "topics": ["государственная безопасность"],
        "officialWebsite": "https://svr.gov.ru"
    },
    {
        "id": "rosgvardiya",
        "name": "Федеральная служба войск национальной гвардии Российской Федерации",
        "shortName": "Росгвардия",
        "sphere": "political",
        "topics": ["внутренние дела"],
        "officialWebsite": "https://rosgvard.ru"
    },
    {
        "id": "fso",
        "name": "Федеральная служба охраны Российской Федерации",
        "shortName": "ФСО России",
        "sphere": "political",
        "topics": ["государственная безопасность"],
        "officialWebsite": "https://www.fso.gov.ru"
    },
    {
        "id": "fsvts",
        "name": "Федеральная служба по военно-техническому сотрудничеству",
        "shortName": "ФСВТС России",
        "sphere": "economic_political",
        "topics": ["оборона", "промышленность и торговля"],
        "officialWebsite": "https://www.fsvts.gov.ru"
    },
    {
        "id": "rosfinmonitoring",
        "name": "Федеральная служба по финансовому мониторингу",
        "shortName": "Росфинмониторинг",
        "sphere": "economic_political",
        "topics": ["государственная безопасность", "финансы"],
        "officialWebsite": "https://www.fedsfm.ru"
    },
    {
        "id": "rosarhiv",
        "name": "Федеральное архивное агентство",
        "shortName": "Росархив",
        "sphere": "social",
        "topics": ["культура"],
        "officialWebsite": "https://archives.gov.ru"
    },
    {
        "id": "gusp",
        "name": "Главное управление специальных программ Президента Российской Федерации",
        "shortName": "ГУСП",
        "sphere": "political",
        "topics": ["государственная безопасность"],
        "officialWebsite": "https://gusp.gov.ru"
    },
    {
        "id": "upravdelami",
        "name": "Управление делами Президента Российской Федерации",
        "shortName": "Управление делами Президента",
        "sphere": "economic_political",
        "topics": ["внутренние дела", "финансы"],
        "officialWebsite": "https://www.udprf.ru"
    },
    {
        "id": "fmba",
        "name": "Федеральное медико-биологическое агентство",
        "shortName": "ФМБА России",
        "sphere": "political_social",
        "topics": ["внутренние дела", "здравоохранение"],
        "officialWebsite": "https://fmba.gov.ru"
    },
    {
        "id": "rossotrudnichestvo",
        "name": "Федеральное агентство по делам Содружества Независимых Государств, соотечественников, проживающих за рубежом, и по международному гуманитарному сотрудничеству",
        "shortName": "Россотрудничество",
        "sphere": "political_social",
        "topics": ["культура", "иностранные дела"],
        "officialWebsite": "https://rs.gov.ru"
    },
    {
        "id": "fstek",
        "name": "Федеральная служба по техническому и экспортному контролю",
        "shortName": "ФСТЭК России",
        "sphere": "political",
        "topics": ["оборона"],
        "officialWebsite": "https://www.fstec.ru"
    },
    {
        "id": "fsin",
        "name": "Федеральная служба исполнения наказаний",
        "shortName": "ФСИН России",
        "sphere": "political",
        "topics": ["юстиция"],
        "officialWebsite": "https://fsin.gov.ru"
    },
    {
        "id": "fssp",
        "name": "Федеральная служба судебных приставов",
        "shortName": "ФССП России",
        "sphere": "political",
        "topics": ["юстиция"],
        "officialWebsite": "https://fssp.gov.ru"
    },
    {
        "id": "minzdrav",
        "name": "Министерство здравоохранения Российской Федерации",
        "shortName": "Минздрав России",
        "sphere": "social",
        "topics": ["здравоохранение"],
        "officialWebsite": "https://minzdrav.gov.ru"
    },
    {
        "id": "minkultury",
        "name": "Министерство культуры Российской Федерации",
        "shortName": "Минкультуры России",
        "sphere": "social",
        "topics": ["культура"],
        "officialWebsite": "https://www.mkrf.ru"
    },
    {
        "id": "roszdravnadzor",
        "name": "Федеральная служба по надзору в сфере здравоохранения",
        "shortName": "Росздравнадзор",
        "sphere": "social",
        "topics": ["здравоохранение"],
        "officialWebsite": "https://roszdravnadzor.gov.ru"
    },
    {
        "id": "minobrnauki",
        "name": "Министерство науки и высшего образования Российской Федерации",
        "shortName": "Минобрнауки России",
        "sphere": "social",
        "topics": ["образование и наука"],
        "officialWebsite": "https://minobrnauki.gov.ru"
    },
    {
        "id": "minprosveshenie",
        "name": "Министерство просвещения Российской Федерации",
        "shortName": "Минпросвещения России",
        "sphere": "social",
        "topics": ["образование и наука"],
        "officialWebsite": "https://edu.gov.ru"
    },
    {
        "id": "minsport",
        "name": "Министерство спорта Российской Федерации",
        "shortName": "Минспорт России",
        "sphere": "social",
        "topics": ["физическая культура и спорт"],
        "officialWebsite": "https://minsport.gov.ru"
    },
    {
        "id": "mintrud",
        "name": "Министерство труда и социальной защиты Российской Федерации",
        "shortName": "Минтруд России",
        "sphere": "social",
        "topics": ["труд и социальная защита"],
        "officialWebsite": "https://mintrud.gov.ru"
    },
    {
        "id": "rostrud",
        "name": "Федеральная служба по труду и занятости",
        "shortName": "Роструд",
        "sphere": "social",
        "topics": ["труд и социальная защита"],
        "officialWebsite": "https://www.rostrud.gov.ru"
    },
    {
        "id": "minprirody",
        "name": "Министерство природных ресурсов и экологии Российской Федерации",
        "shortName": "Минприроды России",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://www.mnr.gov.ru"
    },
    {
        "id": "roshydromet",
        "name": "Федеральная служба по гидрометеорологии и мониторингу окружающей среды",
        "shortName": "Росгидромет",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://www.meteorf.gov.ru"
    },
    {
        "id": "rosprirodnadzor",
        "name": "Федеральная служба по надзору в сфере природопользования",
        "shortName": "Росприроднадзор",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://rpn.gov.ru"
    },
    {
        "id": "rosvodresursy",
        "name": "Федеральное агентство водных ресурсов",
        "shortName": "Росводресурсы",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://www.voda.gov.ru"
    },
    {
        "id": "rosleshoz",
        "name": "Федеральное агентство лесного хозяйства",
        "shortName": "Рослесхоз",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://www.rosleshoz.gov.ru"
    },
    {
        "id": "rosnedra",
        "name": "Федеральное агентство по недропользованию",
        "shortName": "Роснедра",
        "sphere": "economic_social",
        "topics": ["экология, окружающая среда"],
        "officialWebsite": "https://rosnedra.gov.ru"
    },
    {
        "id": "minvostok",
        "name": "Министерство по развитию Дальнего Востока и Арктики",
        "shortName": "Минвостокразвития России",
        "sphere": "economic",
        "topics": ["управление экономическим развитием"],
        "officialWebsite": "https://minvr.gov.ru"
    },
    {
        "id": "mincifry",
        "name": "Министерство цифрового развития, связи и массовых коммуникаций Российской Федерации",
        "shortName": "Минцифры России",
        "sphere": "economic",
        "topics": ["цифровое развитие, связь, массовые коммуникации"],
        "officialWebsite": "https://digital.gov.ru"
    },
    {
        "id": "roskomnadzor",
        "name": "Федеральная служба по надзору в сфере связи, информационных технологий и массовых коммуникаций",
        "shortName": "Роскомнадзор",
        "sphere": "economic",
        "topics": ["цифровое развитие, связь, массовые коммуникации"],
        "officialWebsite": "https://rkn.gov.ru"
    },
    {
        "id": "minstroy",
        "name": "Министерство строительства и жилищно-коммунального хозяйства Российской Федерации",
        "shortName": "Минстрой России",
        "sphere": "economic",
        "topics": ["строительство и жилищно-коммунальное хозяйство"],
        "officialWebsite": "https://minstroyrf.gov.ru"
    },
    {
        "id": "mintrans",
        "name": "Министерство транспорта Российской Федерации",
        "shortName": "Минтранс России",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://mintrans.gov.ru"
    },
    {
        "id": "rostransnadzor",
        "name": "Федеральная служба по надзору в сфере транспорта",
        "shortName": "Ространснадзор",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://rostransnadzor.gov.ru"
    },
    {
        "id": "rosaviatsiya",
        "name": "Федеральное агентство воздушного транспорта",
        "shortName": "Росавиация",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://www.favt.ru"
    },
    {
        "id": "rosavtodor",
        "name": "Федеральное дорожное агентство",
        "shortName": "Росавтодор",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://www.rosavtodor.ru"
    },
    {
        "id": "roszheldor",
        "name": "Федеральное агентство железнодорожного транспорта",
        "shortName": "Росжелдор",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://roszheldor.gov.ru"
    },
    {
        "id": "rosmorrechflot",
        "name": "Федеральное агентство морского и речного транспорта",
        "shortName": "Росморречфлот",
        "sphere": "economic",
        "topics": ["транспорт"],
        "officialWebsite": "https://morflot.gov.ru"
    },
    {
        "id": "minenergo",
        "name": "Министерство энергетики Российской Федерации",
        "shortName": "Минэнерго России",
        "sphere": "economic",
        "topics": ["энергетика"],
        "officialWebsite": "https://minenergo.gov.ru"
    },
    {
        "id": "minfin",
        "name": "Министерство финансов Российской Федерации",
        "shortName": "Минфин России",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://minfin.gov.ru"
    },
    {
        "id": "fns",
        "name": "Федеральная налоговая служба",
        "shortName": "ФНС России",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://www.nalog.gov.ru"
    },
    {
        "id": "rosalkotabak",
        "name": "Федеральная служба по регулированию алкогольного рынка",
        "shortName": "Росалкогольтабакконтроль",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://fsrar.gov.ru"
    },
    {
        "id": "fts",
        "name": "Федеральная таможенная служба",
        "shortName": "ФТС России",
        "sphere": "economic_political",
        "topics": ["таможенное дело", "внутренние дела"],
        "officialWebsite": "https://www.customs.gov.ru"
    },
    {
        "id": "kaznachejstvo",
        "name": "Федеральное казначейство",
        "shortName": "Казначейство России",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://roskazna.gov.ru"
    },
    {
        "id": "probirnaya",
        "name": "Федеральная пробирная палата",
        "shortName": "Пробирная палата",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://probirka.gov.ru"
    },
    {
        "id": "rosimuwestvo",
        "name": "Федеральное агентство по управлению государственным имуществом",
        "shortName": "Росимущество",
        "sphere": "economic",
        "topics": ["финансы"],
        "officialWebsite": "https://rosim.gov.ru"
    },
    {
        "id": "minekonomrazvitiya",
        "name": "Министерство экономического развития Российской Федерации",
        "shortName": "Минэкономразвития России",
        "sphere": "economic",
        "topics": ["управление экономическим развитием"],
        "officialWebsite": "https://economy.gov.ru"
    },
    {
        "id": "rosakkreditatsiya",
        "name": "Федеральная служба по аккредитации",
        "shortName": "Росаккредитация",
        "sphere": "economic",
        "topics": ["промышленность и торговля"],
        "officialWebsite": "https://fsa.gov.ru"
    },
    {
        "id": "rosstat",
        "name": "Федеральная служба государственной статистики",
        "shortName": "Росстат",
        "sphere": "economic",
        "topics": ["управление экономическим развитием"],
        "officialWebsite": "https://rosstat.gov.ru"
    },
    {
        "id": "rospatent",
        "name": "Федеральная служба по интеллектуальной собственности",
        "shortName": "Роспатент",
        "sphere": "economic",
        "topics": ["промышленность и торговля"],
        "officialWebsite": "https://rupto.ru"
    },
    {
        "id": "minpromtorg",
        "name": "Министерство промышленности и торговли Российской Федерации",
        "shortName": "Минпромторг России",
        "sphere": "economic",
        "topics": ["промышленность и торговля"],
        "officialWebsite": "https://minpromtorg.gov.ru"
    },
    {
        "id": "rosstandart",
        "name": "Федеральное агентство по техническому регулированию и метрологии",
        "shortName": "Росстандарт",
        "sphere": "economic",
        "topics": ["промышленность и торговля"],
        "officialWebsite": "https://rst.gov.ru"
    },
    {
        "id": "minselhoz",
        "name": "Министерство сельского хозяйства Российской Федерации",
        "shortName": "Минсельхоз России",
        "sphere": "economic",
        "topics": ["агропромышленный комплекс"],
        "officialWebsite": "https://mcx.gov.ru"
    },
    {
        "id": "rosselhoznadzor",
        "name": "Федеральная служба по ветеринарному и фитосанитарному надзору",
        "shortName": "Россельхознадзор",
        "sphere": "economic",
        "topics": ["агропромышленный комплекс"],
        "officialWebsite": "https://fsvps.gov.ru"
    },
    {
        "id": "rosrybolovstvo",
        "name": "Федеральное агентство по рыболовству",
        "shortName": "Росрыболовство",
        "sphere": "economic",
        "topics": ["агропромышленный комплекс"],
        "officialWebsite": "https://fish.gov.ru"
    },
    {
        "id": "fas",
        "name": "Федеральная антимонопольная служба",
        "shortName": "ФАС России",
        "sphere": "economic",
        "topics": ["антимонопольное регулирование"],
        "officialWebsite": "https://fas.gov.ru"
    },
    {
        "id": "rospotrebnadzor",
        "name": "Федеральная служба по надзору в сфере защиты прав потребителей и благополучия человека",
        "shortName": "Роспотребнадзор",
        "sphere": "social",
        "topics": ["здравоохранение"],
        "officialWebsite": "https://www.rospotrebnadzor.ru"
    },
    {
        "id": "rosobrnadzor",
        "name": "Федеральная служба по надзору в сфере образования и науки",
        "shortName": "Рособрнадзор",
        "sphere": "social",
        "topics": ["образование и наука"],
        "officialWebsite": "https://obrnadzor.gov.ru"
    },
    {
        "id": "rostehnadzor",
        "name": "Федеральная служба по экологическому, технологическому и атомному надзору",
        "shortName": "Ростехнадзор",
        "sphere": "economic",
        "topics": ["энергетика"],
        "officialWebsite": "https://www.gosnadzor.ru"
    },
    {
        "id": "rosreestr",
        "name": "Федеральная служба государственной регистрации, кадастра и картографии",
        "shortName": "Росреестр",
        "sphere": "economic",
        "topics": ["строительство и жилищно-коммунальное хозяйство"],
        "officialWebsite": "https://rosreestr.gov.ru"
    },
    {
        "id": "rosrezerv",
        "name": "Федеральное агентство по государственным резервам",
        "shortName": "Росрезерв",
        "sphere": "economic_political",
        "topics": ["оборона", "финансы"],
        "officialWebsite": "https://rosreserv.gov.ru"
    },
    {
        "id": "rosmolodezh",
        "name": "Федеральное агентство по делам молодежи",
        "shortName": "Росмолодежь",
        "sphere": "social",
        "topics": ["образование и наука"],
        "officialWebsite": "https://fadm.gov.ru"
    },
    {
        "id": "fadn",
        "name": "Федеральное агентство по делам национальностей",
        "shortName": "ФАДН России",
        "sphere": "social",
        "topics": ["культура"],
        "officialWebsite": "https://fadn.gov.ru"
    },
    {
        "id": "gfs",
        "name": "Государственная фельдъегерская служба Российской Федерации",
        "shortName": "ГФС России",
        "sphere": "political",
        "topics": ["государственная безопасность"],
        "officialWebsite": "https://gfs.gov.ru"
    }
];

// ========================
// НЕ ТРОГАЙТЕ КОД НИЖЕ
// ========================

// Определяем тип ФОИВ по названию
function getFoivType(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('министерство')) return 'ministry';
    if (lowerName.includes('служба')) return 'service';
    if (lowerName.includes('агентство') || lowerName.includes('академия') || 
        lowerName.includes('казначейство') || lowerName.includes('палата') ||
        lowerName.includes('управление')) return 'agency';
    return 'other';
}

// Определяем подчинение ФОИВ
function getFoivLeader(id) {
    const presidentFoivs = [
        'mvd', 'mchs', 'mid', 'minoborony', 'minjust', 'fsb', 'svr', 
        'rosgvardiya', 'fso', 'fsvts', 'rosfinmonitoring', 'rosarhiv', 
        'gusp', 'upravdelami', 'fmba', 'rossotrudnichestvo', 'fstek', 
        'fsin', 'fssp', 'gfs'
    ];
    return presidentFoivs.includes(id) ? 'president' : 'government';
}

// Определяем полномочия по типу ФОИВ
function getFoivPowers(type) {
    switch(type) {
        case 'ministry': return ['НПА'];
        case 'service': return ['АН'];
        case 'agency': return ['ГИ', 'ГУ'];
        default: return [];
    }
}

// Получаем цвет сферы
function getSphereColor(sphere) {
    switch(sphere) {
        case 'political': return 'var(--political)';
        case 'economic': return 'var(--economic)';
        case 'social': return 'var(--social)';
        case 'security': return 'var(--political)';
        case 'economic_political': return '#800080'; // Фиолетовый для экономической+политической
        case 'political_social': return '#FFA500'; // Оранжевый для политической+социальной
        case 'economic_social': return '#FFA500'; // Оранжевый для экономической+социальной
        default: return 'var(--detroit-dark-gray)';
    }
}

// Создаем элемент списка ФОИВ
function createFoivListItem(foiv) {
    const type = getFoivType(foiv.name);
    const leader = getFoivLeader(foiv.id);
    const powers = getFoivPowers(type);
    const sphereColor = getSphereColor(foiv.sphere);
    const leaderIcon = leader === 'president' ? 'fa-user-tie' : 'fa-landmark';
    const leaderClass = leader === 'president' ? 'president' : 'government';

    const item = document.createElement('div');
    item.className = 'foiv-list-item';
    item.dataset.id = foiv.id;
    item.dataset.type = type;
    item.dataset.sphere = foiv.sphere;
    item.dataset.leader = leader;
    item.dataset.topics = foiv.topics ? foiv.topics.join(',') : '';

    // Создаем значки полномочий
    let powersHTML = '';
    powers.forEach(power => {
        powersHTML += `<div class="foiv-power-badge"><span>${power}</span></div>`;
    });

    item.innerHTML = `
        <div class="foiv-name">${foiv.name}</div>
        <div class="foiv-badges">
            <div class="foiv-sphere-badge" style="background: ${sphereColor};"></div>
            <div class="foiv-powers">${powersHTML}</div>
            <div class="foiv-leader-badge ${leaderClass}">
                <i class="fas ${leaderIcon}"></i>
            </div>
        </div>
    `;

    // Добавляем обработчик клика
    item.addEventListener('click', function() {
        document.querySelectorAll('.foiv-list-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        loadFoivDetails(foiv.id);
    });

    return item;
}

// Загружаем детальную информацию о ФОИВе
async function loadFoivDetails(foivId) {
    try {
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (!contentArea) return;

        // Показываем загрузку
        contentArea.innerHTML = `
            <div class="loading-state">
                <div class="placeholder-icon"><i class="fas fa-spinner fa-spin"></i></div>
                <h3>Загрузка информации...</h3>
                <p>Пожалуйста, подождите</p>
            </div>
        `;

        // Загружаем HTML файл
        const response = await fetch(`foivs/${foivId}.html`);
        
        if (!response.ok) {
            throw new Error(`Файл foivs/${foivId}.html не найден`);
        }
        
        const html = await response.text();
        
        // Вставляем контент
        contentArea.innerHTML = `<div class="foiv-content-container">${html}</div>`;

        // Добавляем обработчики для аккордеона
        contentArea.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                if (content) {
                    content.classList.toggle('active');
                    icon.textContent = content.classList.contains('active') ? '▲' : '▼';
                }
            });
        });

        // Автоматически открываем первый раздел
        const firstSection = contentArea.querySelector('.section-content');
        if (firstSection) {
            firstSection.classList.add('active');
            const firstIcon = contentArea.querySelector('.toggle-icon');
            if (firstIcon) firstIcon.textContent = '▲';
        }

    } catch (error) {
        console.error('Ошибка:', error);
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="error-state">
                    <div class="placeholder-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <h3>Ошибка загрузки</h3>
                    <p>Создайте файл: foivs/${foivId}.html</p>
                    <div class="error-message">
                        ${error.message}
                    </div>
                </div>
            `;
        }
    }
}

// Инициализируем список ФОИВов
function initializeTabList(listId, countId) {
    const listContainer = document.getElementById(listId);
    const countElement = document.getElementById(countId);
    
    if (!listContainer) return;
    
    // Очищаем и заполняем список
    listContainer.innerHTML = '';
    foivData.forEach(foiv => {
        listContainer.appendChild(createFoivListItem(foiv));
    });
    
    // Обновляем счетчик
    if (countElement) {
        countElement.textContent = foivData.length;
    }
}

// Обновляем счетчики в hero-секции
function updateHeroCounters() {
    const totalFoivs = foivData.length;
    const ministries = foivData.filter(f => getFoivType(f.name) === 'ministry').length;
    const services = foivData.filter(f => getFoivType(f.name) === 'service').length;
    const agencies = foivData.filter(f => getFoivType(f.name) === 'agency').length;

    const heroStats = document.querySelectorAll('.hero-stat-item .number');
    if (heroStats.length >= 4) {
        heroStats[0].textContent = totalFoivs;
        heroStats[1].textContent = ministries;
        heroStats[2].textContent = services;
        heroStats[3].textContent = agencies;
    }
}

// Фильтрация по теме (подтеме)
function filterByTopic(topic, listId) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    
    const items = listContainer.querySelectorAll('.foiv-list-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const topics = item.dataset.topics ? item.dataset.topics.split(',') : [];
        const showItem = topics.includes(topic);
        
        item.style.display = showItem ? 'flex' : 'none';
        if (showItem) visibleCount++;
    });
    
    // Обновляем счетчик
    const tabPrefix = listId.replace('List', '');
    const countElement = document.getElementById(`${tabPrefix}Count`);
    if (countElement) countElement.textContent = visibleCount;
    
    // Показываем активную тему
    const activeTopicContainer = document.getElementById('activeTopicContainer');
    const activeTopicName = document.getElementById('activeTopicName');
    const activeTopicCount = document.getElementById('activeTopicCount');
    
    if (activeTopicContainer && activeTopicName && activeTopicCount) {
        activeTopicName.textContent = topic;
        activeTopicCount.textContent = visibleCount;
        activeTopicContainer.style.display = 'block';
    }
    
    // Прокручиваем к списку
    listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Фильтрация
function filterList(listId, filterType, filterValue) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    
    const items = listContainer.querySelectorAll('.foiv-list-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        let showItem = false;
        
        switch(filterType) {
            case 'type': showItem = filterValue === 'all' || item.dataset.type === filterValue; break;
            case 'leader': showItem = filterValue === 'all' || item.dataset.leader === filterValue; break;
            case 'sphere': 
                if (filterValue === 'all') {
                    showItem = true;
                } else if (filterValue === 'political') {
                    // Политическая сфера: чисто политические и комбинированные с политической
                    showItem = item.dataset.sphere === 'political' || 
                               item.dataset.sphere === 'economic_political' || 
                               item.dataset.sphere === 'political_social';
                } else if (filterValue === 'economic') {
                    // Экономическая сфера: чисто экономические и комбинированные с экономической
                    showItem = item.dataset.sphere === 'economic' || 
                               item.dataset.sphere === 'economic_political' || 
                               item.dataset.sphere === 'economic_social';
                } else if (filterValue === 'social') {
                    // Социальная сфера: чисто социальные и комбинированные с социальной
                    showItem = item.dataset.sphere === 'social' || 
                               item.dataset.sphere === 'political_social' || 
                               item.dataset.sphere === 'economic_social';
                }
                break;
        }
        
        item.style.display = showItem ? 'flex' : 'none';
        if (showItem) visibleCount++;
    });
    
    // Скрываем активную тему при обычной фильтрации
    const activeTopicContainer = document.getElementById('activeTopicContainer');
    if (activeTopicContainer) {
        activeTopicContainer.style.display = 'none';
    }
    
    // Обновляем счетчик
    const tabPrefix = listId.replace('List', '');
    const countElement = document.getElementById(`${tabPrefix}Count`);
    if (countElement) countElement.textContent = visibleCount;
}

// Поиск
function initializeSearch(inputId, listId) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const listContainer = document.getElementById(listId);
        if (!listContainer) return;
        
        const items = listContainer.querySelectorAll('.foiv-list-item');
        let visibleCount = 0;
        
        items.forEach(item => {
            const name = item.querySelector('.foiv-name').textContent.toLowerCase();
            const isVisible = term === '' || name.includes(term);
            item.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
        });
        
        const tabPrefix = listId.replace('List', '');
        const countElement = document.getElementById(`${tabPrefix}Count`);
        if (countElement) countElement.textContent = visibleCount;
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // 1. Обновляем счетчики
    updateHeroCounters();
    
    // 2. Инициализируем все вкладки
    ['system', 'structure', 'spheres'].forEach(tab => {
        initializeTabList(`${tab}List`, `${tab}Count`);
        initializeSearch(`search${tab.charAt(0).toUpperCase() + tab.slice(1)}`, `${tab}List`);
    });
    
    // 3. Инициализируем фильтры
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            const filterGroup = this.closest('.filter-buttons');
            const listContainer = this.closest('.sidebar').querySelector('.foiv-list');
            if (!listContainer) return;
            
            const listId = listContainer.id;
            let filterType = 'type';
            if (filterValue === 'president' || filterValue === 'government') {
                filterType = 'leader';
            } else if (['political', 'economic', 'social'].includes(filterValue)) {
                filterType = 'sphere';
            }
            
            // Активируем кнопку
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Применяем фильтр
            filterList(listId, filterType, filterValue);
        });
    });
    
    // 4. Инициализируем переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Убираем активный класс
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс
            this.classList.add('active');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) tabPane.classList.add('active');
            
            // Сбрасываем активную тему при переключении вкладок
            const activeTopicContainer = document.getElementById('activeTopicContainer');
            if (activeTopicContainer) {
                activeTopicContainer.style.display = 'none';
            }
        });
    });
    
    // 5. Активируем первую вкладку
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) firstTab.click();
    
    // 6. Инициализируем кликабельные темы в разделе "Сферы" - ИСПРАВЛЕННАЯ ВЕРСИЯ
    document.querySelectorAll('.sphere-topic-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const topic = this.dataset.topic;
            const filter = this.dataset.filter;
            
            // Активируем соответствующую кнопку фильтра по сфере
            const filterGroup = document.querySelector('#spheres-tab .filter-buttons');
            if (filterGroup) {
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === filter) {
                        btn.classList.add('active');
                    }
                });
            }
            
            // Применяем фильтр по сфере
            filterList('spheresList', 'sphere', filter);
            
            // Даем время на обновление DOM, затем применяем фильтр по теме
            setTimeout(() => {
                filterByTopic(topic, 'spheresList');
            }, 50);
        });
    });
    
    // 7. Инициализируем кнопку сброса фильтра по теме
    const clearTopicFilterBtn = document.getElementById('clearTopicFilter');
    if (clearTopicFilterBtn) {
        clearTopicFilterBtn.addEventListener('click', function() {
            // Скрываем контейнер активной темы
            const activeTopicContainer = document.getElementById('activeTopicContainer');
            if (activeTopicContainer) {
                activeTopicContainer.style.display = 'none';
            }
            
            // Сбрасываем фильтр по теме (показываем все органы)
            const listId = 'spheresList';
            const listContainer = document.getElementById(listId);
            if (listContainer) {
                const items = listContainer.querySelectorAll('.foiv-list-item');
                items.forEach(item => {
                    item.style.display = 'flex';
                });
                
                // Обновляем счетчик
                const countElement = document.getElementById('spheresCount');
                if (countElement) {
                    countElement.textContent = items.length;
                }
            }
            
            // Сбрасываем кнопку фильтра по сфере на "Все"
            const filterGroup = document.querySelector('#spheres-tab .filter-buttons');
            if (filterGroup) {
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === 'all') {
                        btn.classList.add('active');
                    }
                });
            }
        });
    }
});

// Экспортируем функции для использования в других файлах
window.foivModule = {
    filterByTopic,
    filterList,
    getFoivType,
    getFoivLeader,
    getFoivPowers,
    getSphereColor
};
