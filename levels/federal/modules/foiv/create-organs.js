// Простой скрипт для создания 69 файлов
const fs = require('fs');
const organs = require('./data/foivs-list.json');

organs.organs.forEach(organ => {
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${organ.name} - ${organ.abbreviation}</title>
    <link rel="stylesheet" href="../../../../../css/categories.css">
    <link rel="stylesheet" href="../../../../../css/levels.css">
</head>
<body>
    <div class="container">
        <h1>${organ.name}</h1>
        <h2>${organ.abbreviation}</h2>
        <p>${organ.description}</p>
        <a href="../index.html">← Назад к модулю ФОИВ</a>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(`./organs/${organ.file}`, html);
    console.log(`Создан: ${organ.file}`);
});
