import type { ExamQuestion, Module, QuizQuestion } from "../types/course";

export const modules: Module[] = [
  {
    id: 1,
    title: "Введение в базы данных",
    shortTitle: "Основы БД",
    description: "Разберитесь, как данные превращаются в связанные таблицы.",
    lectureRefs: ["01.pdf"],
    theory: [
      { title: "База данных и СУБД", content: "База данных — организованный набор данных. СУБД управляет хранением, поиском, изменением и защитой этих данных. PostgreSQL — реляционная СУБД." },
      { title: "Таблицы и ключи", content: "Таблица состоит из строк и столбцов. PRIMARY KEY однозначно определяет строку, а FOREIGN KEY связывает её со строкой другой таблицы." },
    ],
    terms: [
      { term: "Таблица", definition: "Набор строк с одинаковой структурой столбцов." },
      { term: "PRIMARY KEY", definition: "Уникальный и непустой идентификатор строки." },
      { term: "FOREIGN KEY", definition: "Поле, которое ссылается на ключ другой таблицы." },
    ],
    syntax: ["PRIMARY KEY (id)", "FOREIGN KEY (author_id) REFERENCES authors(id)"],
    examples: [
      { title: "Первичный ключ", code: "CREATE TABLE students (\n  id INT PRIMARY KEY,\n  name TEXT NOT NULL\n);", explanation: "Каждый студент получает уникальный id." },
      { title: "Внешний ключ", code: "CREATE TABLE exams (\n  id INT PRIMARY KEY,\n  student_id INT REFERENCES students(id)\n);", explanation: "Экзамен связан с существующим студентом." },
    ],
    mistakes: ["Использовать имя как PRIMARY KEY.", "Хранить связанный объект текстом вместо FOREIGN KEY.", "Допускать дубликаты идентификаторов."],
    practice: [
      { id: "m1-1", moduleId: 1, type: "choice", prompt: "Какое поле лучше сделать PRIMARY KEY для таблицы users?", options: ["name", "id", "age"], answer: "id", explanation: "Стабильный уникальный id надёжнее имени или возраста." },
      { id: "m1-2", moduleId: 1, type: "match", prompt: "Что связывает две таблицы?", options: ["PRIMARY KEY", "FOREIGN KEY", "VARCHAR"], answer: "FOREIGN KEY", explanation: "Внешний ключ хранит ссылку на строку другой таблицы." },
      { id: "m1-3", moduleId: 1, type: "choice", prompt: "Что является сущностью в системе библиотеки?", options: ["Книга", "Красивый", "Читать"], answer: "Книга", explanation: "Сущность — объект предметной области, о котором хранят данные." },
    ],
    miniQuiz: [{ id: "q1", moduleId: 1, prompt: "Какой ключ не допускает NULL?", options: ["FOREIGN KEY", "PRIMARY KEY", "Любой столбец"], answer: "PRIMARY KEY", explanation: "Первичный ключ всегда уникален и NOT NULL." }],
  },
  {
    id: 2,
    title: "Моделирование данных",
    shortTitle: "Моделирование",
    description: "Научитесь выделять сущности, атрибуты и связи.",
    lectureRefs: ["02.pdf", "03.pdf", "08.pdf"],
    theory: [
      { title: "От предметной области к таблицам", content: "Сначала выделяют сущности и их атрибуты. Затем определяют связи и только после этого проектируют таблицы." },
      { title: "Типы связей", content: "1:1 — одной строке соответствует одна. 1:M — одной строке соответствует много. M:N реализуется через промежуточную таблицу." },
      { title: "Нормализация", content: "Храните каждый факт в одном месте и связывайте таблицы ключами. Это уменьшает дублирование и защищает от ошибок обновления." },
    ],
    terms: [
      { term: "Сущность", definition: "Объект, о котором нужно хранить данные." },
      { term: "Атрибут", definition: "Характеристика сущности." },
      { term: "M:N", definition: "Многие строки связаны со многими через таблицу-связку." },
      { term: "Нормализация", definition: "Организация данных без лишнего дублирования." },
    ],
    syntax: ["users 1:M orders", "students M:N courses → enrollments"],
    examples: [
      { title: "Связь 1:M", code: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT REFERENCES users(id)\n);", explanation: "У одного пользователя может быть много заказов." },
      { title: "Связь M:N", code: "CREATE TABLE enrollments (\n  student_id INT REFERENCES students(id),\n  course_id INT REFERENCES courses(id),\n  PRIMARY KEY (student_id, course_id)\n);", explanation: "Таблица-связка соединяет студентов и курсы." },
    ],
    mistakes: ["Смешивать несколько сущностей в одной таблице.", "Хранить список id в одном текстовом поле.", "Не определять кратность связи."],
    practice: [
      { id: "m2-1", moduleId: 2, type: "choice", prompt: "Автор написал много книг. Какая это связь?", options: ["1:1", "1:M", "M:N"], answer: "1:M", explanation: "Одному автору соответствует много книг." },
      { id: "m2-2", moduleId: 2, type: "choice", prompt: "Что нужно для связи студентов и курсов M:N?", options: ["Один TEXT", "Таблица enrollments", "Удалить ключи"], answer: "Таблица enrollments", explanation: "Связь многие-ко-многим реализует таблица-связка." },
      { id: "m2-3", moduleId: 2, type: "match", prompt: "Email пользователя — это…", options: ["Сущность", "Атрибут", "Связь"], answer: "Атрибут", explanation: "Email описывает сущность Пользователь." },
    ],
    miniQuiz: [{ id: "q2", moduleId: 2, prompt: "Какая связь обычно между заказом и его строками?", options: ["1:M", "1:1", "M:N"], answer: "1:M", explanation: "Один заказ содержит много строк заказа." }],
  },
  {
    id: 3,
    title: "Типы данных PostgreSQL",
    shortTitle: "Типы данных",
    description: "Выбирайте точные типы для чисел, текста, дат и времени.",
    lectureRefs: ["04.pdf", "06.pdf"],
    theory: [
      { title: "Тип определяет данные", content: "Тип ограничивает допустимые значения и помогает PostgreSQL эффективно хранить и сравнивать их." },
      { title: "Дата, время и числа", content: "DATE хранит дату, TIMESTAMPTZ — момент времени с часовым поясом, NUMERIC — точные дробные числа. Для новых id часто используют GENERATED AS IDENTITY." },
    ],
    terms: [
      { term: "VARCHAR(n)", definition: "Строка с ограничением длины." },
      { term: "TIMESTAMPTZ", definition: "Момент времени, корректно учитывающий часовые пояса." },
      { term: "NUMERIC", definition: "Точное десятичное число, подходит для денег." },
    ],
    syntax: ["price NUMERIC(10, 2)", "created_at TIMESTAMPTZ DEFAULT now()", "id INT GENERATED ALWAYS AS IDENTITY"],
    examples: [
      { title: "Профиль пользователя", code: "CREATE TABLE profiles (\n  name VARCHAR(100),\n  bio TEXT,\n  active BOOLEAN DEFAULT true\n);", explanation: "Каждому полю выбран подходящий тип." },
      { title: "Точное время", code: "CREATE TABLE events (\n  starts_at TIMESTAMPTZ NOT NULL,\n  price NUMERIC(10, 2)\n);", explanation: "Время хранит часовой пояс, цена не теряет точность." },
    ],
    mistakes: ["Хранить даты в TEXT.", "Использовать FLOAT для денег.", "Использовать VARCHAR без причины вместо TEXT."],
    practice: [
      { id: "m3-1", moduleId: 3, type: "choice", prompt: "Какой тип выбрать для цены?", options: ["FLOAT", "NUMERIC(10,2)", "TEXT"], answer: "NUMERIC(10,2)", explanation: "NUMERIC хранит десятичные значения без ошибок округления FLOAT." },
      { id: "m3-2", moduleId: 3, type: "choice", prompt: "Как хранить момент публикации для разных часовых поясов?", options: ["DATE", "TIME", "TIMESTAMPTZ"], answer: "TIMESTAMPTZ", explanation: "TIMESTAMPTZ представляет конкретный момент времени." },
      { id: "m3-3", moduleId: 3, type: "find-error", prompt: "Найдите плохой тип: birth_date TEXT", options: ["TEXT", "birth_date", "Ошибки нет"], answer: "TEXT", explanation: "Для даты рождения подходит DATE." },
    ],
    miniQuiz: [{ id: "q3", moduleId: 3, prompt: "Какой тип хранит true/false?", options: ["BOOLEAN", "INT", "VARCHAR"], answer: "BOOLEAN", explanation: "BOOLEAN предназначен для логических значений." }],
  },
  {
    id: 4,
    title: "DDL и ограничения",
    shortTitle: "DDL",
    description: "Создавайте и изменяйте надёжные схемы таблиц.",
    lectureRefs: ["05.pdf", "06.pdf"],
    theory: [
      { title: "DDL управляет структурой", content: "CREATE создаёт объект, ALTER изменяет, DROP удаляет. Эти команды меняют схему, а не отдельные строки." },
      { title: "Ограничения защищают данные", content: "NOT NULL, UNIQUE, CHECK, DEFAULT и ключи не дают записать некорректные значения." },
    ],
    terms: [
      { term: "DDL", definition: "Команды определения структуры базы данных." },
      { term: "CHECK", definition: "Проверка логического условия при записи." },
      { term: "UNIQUE", definition: "Запрещает повторяющиеся значения." },
    ],
    syntax: ["CREATE TABLE ...", "ALTER TABLE ... ADD COLUMN ...", "DROP TABLE ..."],
    examples: [
      { title: "Таблица товаров", code: "CREATE TABLE products (\n  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  name TEXT NOT NULL,\n  price NUMERIC CHECK (price >= 0)\n);", explanation: "Ограничения защищают обязательные поля и цену." },
      { title: "Изменение таблицы", code: "ALTER TABLE products\nADD COLUMN sku TEXT UNIQUE;", explanation: "ALTER TABLE добавляет новый уникальный артикул." },
    ],
    mistakes: ["DROP TABLE без проверки цели.", "CHECK, допускающий неверные значения.", "Забыть NOT NULL для обязательного поля."],
    practice: [
      { id: "m4-1", moduleId: 4, type: "sql", prompt: "Добавьте обязательный столбец email типа TEXT в users.", answer: "ALTER TABLE users ADD COLUMN email TEXT NOT NULL;", keywords: ["alter table users", "add column", "email", "text", "not null"], explanation: "ALTER TABLE меняет структуру существующей таблицы." },
      { id: "m4-2", moduleId: 4, type: "choice", prompt: "Как запретить отрицательный возраст?", options: ["DEFAULT 0", "CHECK (age >= 0)", "UNIQUE"], answer: "CHECK (age >= 0)", explanation: "CHECK проверяет условие каждого значения." },
      { id: "m4-3", moduleId: 4, type: "find-error", prompt: "Что опаснее всего? DROP TABLE users;", options: ["Удаляет таблицу", "Добавляет строку", "Сортирует строки"], answer: "Удаляет таблицу", explanation: "DROP безвозвратно удаляет структуру таблицы." },
    ],
    miniQuiz: [{ id: "q4", moduleId: 4, prompt: "Какая команда меняет существующую таблицу?", options: ["ALTER TABLE", "UPDATE", "SELECT"], answer: "ALTER TABLE", explanation: "ALTER TABLE меняет схему." }],
  },
  {
    id: 5,
    title: "DML и базовые запросы",
    shortTitle: "Базовые запросы",
    description: "Читайте, добавляйте, изменяйте и удаляйте строки.",
    lectureRefs: ["07.pdf"],
    theory: [
      { title: "Чтение данных", content: "SELECT выбирает столбцы, WHERE фильтрует строки, ORDER BY сортирует, LIMIT ограничивает результат." },
      { title: "Изменение данных", content: "INSERT добавляет, UPDATE изменяет, DELETE удаляет строки. Для UPDATE и DELETE особенно важно условие WHERE." },
      { title: "PostgreSQL RETURNING", content: "INSERT, UPDATE и DELETE могут сразу вернуть изменённые строки через RETURNING — это удобно для получения нового id и проверки результата." },
    ],
    terms: [
      { term: "DML", definition: "Команды работы со строками данных." },
      { term: "WHERE", definition: "Условие отбора строк." },
      { term: "ORDER BY", definition: "Сортировка результата запроса." },
    ],
    syntax: ["SELECT ... FROM ... WHERE ...", "INSERT INTO ... VALUES ... RETURNING id", "UPDATE ... SET ... WHERE ...", "DELETE FROM ... WHERE ..."],
    examples: [
      { title: "Фильтр и сортировка", code: "SELECT name, score\nFROM students\nWHERE score >= 80\nORDER BY score DESC\nLIMIT 5;", explanation: "Пять лучших результатов от 80 баллов." },
      { title: "Обновление строки", code: "UPDATE students\nSET active = false\nWHERE id = 42;", explanation: "Меняется только студент с id 42." },
    ],
    mistakes: ["UPDATE или DELETE без WHERE.", "SELECT * там, где нужны два столбца.", "Забыть кавычки вокруг текста."],
    practice: [
      { id: "m5-1", moduleId: 5, type: "sql", prompt: "Выберите имена активных пользователей.", answer: "SELECT name FROM users WHERE active = true;", keywords: ["select name", "from users", "where", "active"], explanation: "SELECT задаёт поле, WHERE оставляет активных." },
      { id: "m5-2", moduleId: 5, type: "sql", prompt: "Удалите заказ с id 7.", answer: "DELETE FROM orders WHERE id = 7;", keywords: ["delete from orders", "where", "id"], explanation: "WHERE не позволяет удалить все заказы." },
      { id: "m5-3", moduleId: 5, type: "choice", prompt: "Как получить 10 самых новых записей?", options: ["ORDER BY created_at DESC LIMIT 10", "LIMIT 10 DESC", "WHERE 10"], answer: "ORDER BY created_at DESC LIMIT 10", explanation: "Сначала сортируем от новых, затем ограничиваем." },
    ],
    miniQuiz: [{ id: "q5", moduleId: 5, prompt: "Какая команда добавляет строку?", options: ["INSERT", "ALTER", "DROP"], answer: "INSERT", explanation: "INSERT добавляет новые данные." }],
  },
  {
    id: 6,
    title: "JOIN и подзапросы",
    shortTitle: "JOIN",
    description: "Соединяйте таблицы и формулируйте вложенные условия.",
    lectureRefs: ["08.pdf"],
    theory: [
      { title: "JOIN", content: "INNER JOIN оставляет только совпавшие строки. LEFT JOIN сохраняет все строки слева, даже если справа связи нет." },
      { title: "Подзапросы", content: "IN проверяет попадание в набор, EXISTS — существование хотя бы одной строки. Подзапрос помогает получить этот набор или условие." },
    ],
    terms: [
      { term: "ON", definition: "Условие соединения таблиц." },
      { term: "NULL", definition: "Отсутствующее или неизвестное значение." },
      { term: "EXISTS", definition: "Проверяет, вернул ли подзапрос хотя бы строку." },
    ],
    syntax: ["FROM users u JOIN orders o ON o.user_id = u.id", "LEFT JOIN ... WHERE right.id IS NULL", "WHERE EXISTS (SELECT 1 ...)"],
    examples: [
      { title: "Пользователи с заказами", code: "SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;", explanation: "INNER JOIN возвращает только пользователей с заказами." },
      { title: "Без заказов", code: "SELECT u.name\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.id IS NULL;", explanation: "После LEFT JOIN отсутствие заказа видно как NULL." },
    ],
    mistakes: ["Забыть условие ON.", "Сравнивать NULL через =.", "Использовать INNER JOIN, когда нужны строки без связи."],
    practice: [
      { id: "m6-1", moduleId: 6, type: "choice", prompt: "Как найти пользователей без заказов?", options: ["INNER JOIN", "LEFT JOIN и WHERE order.id IS NULL", "CROSS JOIN"], answer: "LEFT JOIN и WHERE order.id IS NULL", explanation: "LEFT JOIN сохраняет пользователей без совпадения." },
      { id: "m6-2", moduleId: 6, type: "sql", prompt: "Соедините users и orders по user_id.", answer: "SELECT * FROM users u JOIN orders o ON o.user_id = u.id;", keywords: ["from users", "join orders", "on", "user_id"], explanation: "Условие ON связывает внешний и первичный ключ." },
      { id: "m6-3", moduleId: 6, type: "find-error", prompt: "Найдите ошибку: WHERE deleted_at = NULL", options: ["Нужно IS NULL", "Нужно == NULL", "Ошибки нет"], answer: "Нужно IS NULL", explanation: "NULL проверяют операторами IS NULL / IS NOT NULL." },
    ],
    miniQuiz: [{ id: "q6", moduleId: 6, prompt: "Какой JOIN сохраняет все строки левой таблицы?", options: ["LEFT JOIN", "INNER JOIN", "Никакой"], answer: "LEFT JOIN", explanation: "LEFT JOIN сохраняет всю левую сторону." }],
  },
  {
    id: 7,
    title: "Агрегация",
    shortTitle: "Агрегация",
    description: "Считайте итоги и группируйте данные.",
    lectureRefs: ["09.pdf"],
    theory: [
      { title: "Агрегатные функции", content: "COUNT, SUM, AVG, MIN и MAX сворачивают набор строк в итоговое значение." },
      { title: "Группы", content: "GROUP BY считает итоги отдельно для каждой группы. WHERE фильтрует строки до группировки, HAVING — готовые группы после неё." },
    ],
    terms: [
      { term: "COUNT", definition: "Количество строк или непустых значений." },
      { term: "GROUP BY", definition: "Объединяет строки с одинаковыми значениями." },
      { term: "HAVING", definition: "Фильтрует группы после агрегации." },
    ],
    syntax: ["SELECT category, COUNT(*) FROM products GROUP BY category", "GROUP BY ... HAVING COUNT(*) > 5"],
    examples: [
      { title: "Средний балл", code: "SELECT course_id, AVG(score)\nFROM exams\nGROUP BY course_id;", explanation: "Среднее рассчитывается отдельно для каждого курса." },
      { title: "Активные категории", code: "SELECT category, COUNT(*)\nFROM products\nGROUP BY category\nHAVING COUNT(*) >= 10;", explanation: "HAVING оставляет группы с 10 товарами и более." },
    ],
    mistakes: ["Выбирать неагрегированный столбец без GROUP BY.", "Использовать WHERE вместо HAVING для агрегата.", "COUNT(column) считать равным COUNT(*) при NULL."],
    practice: [
      { id: "m7-1", moduleId: 7, type: "sql", prompt: "Посчитайте количество пользователей.", answer: "SELECT COUNT(*) FROM users;", keywords: ["select count", "from users"], explanation: "COUNT(*) считает все строки." },
      { id: "m7-2", moduleId: 7, type: "choice", prompt: "Чем фильтровать группы с AVG(score) > 80?", options: ["WHERE", "HAVING", "LIMIT"], answer: "HAVING", explanation: "HAVING применяется после группировки." },
      { id: "m7-3", moduleId: 7, type: "sql", prompt: "Найдите среднюю цену по category.", answer: "SELECT category, AVG(price) FROM products GROUP BY category;", keywords: ["select category", "avg", "from products", "group by category"], explanation: "GROUP BY создаёт отдельный результат для категории." },
    ],
    miniQuiz: [{ id: "q7", moduleId: 7, prompt: "Что возвращает COUNT(*)?", options: ["Количество строк", "Сумму", "Среднее"], answer: "Количество строк", explanation: "COUNT(*) считает строки результата." }],
  },
  {
    id: 8,
    title: "Транзакции и PostgreSQL",
    shortTitle: "Транзакции",
    description: "Понимайте целостность, MVCC и основные объекты PostgreSQL.",
    lectureRefs: ["10.pdf", "11.pdf", "12.pdf"],
    theory: [
      { title: "Транзакции и ACID", content: "Транзакция объединяет операции в одно целое. COMMIT сохраняет изменения, ROLLBACK отменяет. ACID описывает гарантии надёжной транзакции." },
      { title: "MVCC и производительность", content: "MVCC позволяет чтению и записи меньше блокировать друг друга. Индексы ускоряют поиск, но занимают место и замедляют запись. EXPLAIN помогает анализировать план." },
      { title: "Изоляция и объекты БД", content: "Уровни изоляции защищают от аномалий конкурентной работы. Представления сохраняют запрос, функции возвращают результат, процедуры выполняют действия, а триггеры автоматически реагируют на события." },
    ],
    terms: [
      { term: "COMMIT", definition: "Фиксирует изменения транзакции." },
      { term: "MVCC", definition: "Многоверсионность строк для конкурентной работы." },
      { term: "Индекс", definition: "Дополнительная структура для быстрого поиска." },
      { term: "Триггер", definition: "Автоматически запускает функцию при событии в таблице." },
    ],
    syntax: ["BEGIN; ... COMMIT;", "BEGIN; ... ROLLBACK;", "CREATE INDEX ... ON ... (...)", "EXPLAIN ANALYZE SELECT ...", "CREATE VIEW ... AS SELECT ..."],
    examples: [
      { title: "Перевод средств", code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;", explanation: "Обе операции фиксируются вместе." },
      { title: "Индекс", code: "CREATE INDEX users_email_idx\nON users (email);", explanation: "Индекс ускоряет частый поиск по email." },
    ],
    mistakes: ["Фиксировать половину бизнес-операции.", "Создавать индекс на каждый столбец.", "Игнорировать план выполнения медленного запроса."],
    practice: [
      { id: "m8-1", moduleId: 8, type: "choice", prompt: "Вторая операция перевода денег упала. Что делать?", options: ["COMMIT", "ROLLBACK", "CREATE INDEX"], answer: "ROLLBACK", explanation: "Нужно отменить первую операцию и сохранить целостность." },
      { id: "m8-2", moduleId: 8, type: "choice", prompt: "Что помогает анализировать план запроса?", options: ["EXPLAIN", "COMMIT", "VIEW"], answer: "EXPLAIN", explanation: "EXPLAIN показывает выбранный PostgreSQL план." },
      { id: "m8-3", moduleId: 8, type: "match", prompt: "Какое свойство ACID означает «всё или ничего»?", options: ["Atomicity", "Consistency", "Durability"], answer: "Atomicity", explanation: "Атомарность не допускает частичного выполнения транзакции." },
    ],
    miniQuiz: [{ id: "q8", moduleId: 8, prompt: "Какая команда отменяет изменения транзакции?", options: ["ROLLBACK", "COMMIT", "BEGIN"], answer: "ROLLBACK", explanation: "ROLLBACK возвращает состояние до BEGIN." }],
  },
];

export const quizQuestions: QuizQuestion[] = [
  ...modules.flatMap((module) => module.miniQuiz),
  { id: "q9", moduleId: 5, prompt: "Как безопасно изменить одну строку?", options: ["UPDATE с WHERE по id", "UPDATE без WHERE", "DROP TABLE"], answer: "UPDATE с WHERE по id", explanation: "Условие ограничивает набор изменяемых строк." },
  { id: "q10", moduleId: 6, prompt: "Как проверить отсутствие значения?", options: ["IS NULL", "= NULL", "== NULL"], answer: "IS NULL", explanation: "NULL проверяется через IS NULL." },
];

export const examQuestions: ExamQuestion[] = [
  { id: "e1", moduleId: 1, difficulty: "easy", prompt: "Что однозначно идентифицирует строку?", options: ["PRIMARY KEY", "TEXT", "VIEW"], answer: "PRIMARY KEY", explanation: "Первичный ключ уникально определяет строку." },
  { id: "e2", moduleId: 3, difficulty: "easy", prompt: "Лучший тип для денежной суммы?", options: ["NUMERIC", "FLOAT", "TEXT"], answer: "NUMERIC", explanation: "NUMERIC хранит точные десятичные значения." },
  { id: "e3", moduleId: 5, difficulty: "easy", prompt: "Что сортирует строки?", options: ["ORDER BY", "GROUP BY", "CHECK"], answer: "ORDER BY", explanation: "ORDER BY задаёт порядок результата." },
  { id: "e4", moduleId: 2, difficulty: "medium", prompt: "Как реализовать M:N?", options: ["Таблицей-связкой", "Одним VARCHAR", "Удалением ключей"], answer: "Таблицей-связкой", explanation: "Она хранит пары внешних ключей." },
  { id: "e5", moduleId: 6, difficulty: "medium", prompt: "Как найти строки без связанных данных?", options: ["LEFT JOIN + IS NULL", "INNER JOIN", "ORDER BY"], answer: "LEFT JOIN + IS NULL", explanation: "LEFT JOIN сохраняет строки без совпадения." },
  { id: "e6", moduleId: 7, difficulty: "medium", prompt: "Где фильтровать COUNT(*) > 5?", options: ["HAVING", "WHERE", "ON"], answer: "HAVING", explanation: "HAVING фильтрует агрегированные группы." },
  { id: "e7", moduleId: 8, difficulty: "exam", prompt: "Ошибка в середине транзакции требует…", options: ["ROLLBACK", "COMMIT", "DROP"], answer: "ROLLBACK", explanation: "ROLLBACK отменяет частично выполненную операцию." },
  { id: "e8", moduleId: 6, difficulty: "exam", prompt: "Что эффективнее проверяет сам факт наличия строк?", options: ["EXISTS", "ORDER BY", "UNIQUE"], answer: "EXISTS", explanation: "EXISTS останавливается, когда найдена подходящая строка." },
  { id: "e9", moduleId: 4, difficulty: "exam", prompt: "Что запретит отрицательную цену?", options: ["CHECK (price >= 0)", "DEFAULT 0", "LIMIT 0"], answer: "CHECK (price >= 0)", explanation: "CHECK валидирует каждую записываемую цену." },
  { id: "e10", moduleId: 8, difficulty: "exam", prompt: "Что сначала проверить у медленного SELECT?", options: ["План через EXPLAIN", "Добавить десять индексов", "Удалить WHERE"], answer: "План через EXPLAIN", explanation: "План показывает причину и помогает выбрать исправление." },
];
