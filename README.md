

# 📚 Проєкт "Книжкова полиця"(BookShelf)

Цей проєкт є веб-додатком для перегляду, додавання та редагування карток книг з рейтингами зірок. Використовуються **Vue 3**, **Pinia**, **JSON Server** та **TailwindCSS**.

---

## ⚙️ Як запустити проєкт

### 1. Клонуйте репозиторій
Спочатку завантажте проєкт на ваш комп'ютер за допомогою Git:
```bash
git clone https://github.com/ваш-логін/назва-репозиторію.git
cd назва-репозиторію
```

### 2. Встановіть залежності
Виконайте цю команду для встановлення всіх необхідних пакетів:
```bash
npm install
```

### 3. Запуск JSON Server (сервер для зберігання карток)
Запустіть JSON Server для емуляції API:
```bash
npx json-server --watch db.json --port 3000
```

JSON Server буде доступний за адресою `http://localhost:3000`.

### 4. Запуск Vue додатка
Запустіть фронтенд-додаток:
```bash
npm run dev
```

Проєкт буде доступний у вашому браузері за адресою `http://localhost:5173`.

---

## 🌟 Основні функції
1. **Додавання книг**: Додайте нові картки книг із рейтингами зірок.
2. **Редагування книг**: Змінюйте інформацію про книги.
3. **Рейтинг книг**: Вибирайте кількість зірок (1-5) для кожної книги.
4. **Видалення книг**: Видаляйте непотрібні картки.
5. **Реєстрація та авторизація**: Логін та реєстрація за допомогою Pinia.

---

## 📚 Project "Book Library"

This project is a web application for viewing, adding, and editing book cards with star ratings. It uses **Vue 3**, **Pinia**, **JSON Server**, and **TailwindCSS**.

---

## ⚙️ How to Run the Project

### 1. Clone the Repository
First, download the project to your computer using Git:
```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

### 2. Install Dependencies
Run this command to install all required packages:
```bash
npm install
```

### 3. Run JSON Server (Data Storage API)
Start JSON Server to simulate the API:
```bash
npx json-server --watch db.json --port 3000
```

JSON Server will be available at `http://localhost:3000`.

### 4. Run Vue Application
Start the frontend application:
```bash
npm run dev
```

The project will be available in your browser at `http://localhost:5173`.

---

## 🌟 Key Features
1. **Add Books**: Add new book cards with star ratings.
2. **Edit Books**: Edit information about books.
3. **Rate Books**: Choose the number of stars (1-5) for each book.
4. **Delete Books**: Remove unnecessary cards.
5. **User Authentication**: Registration and login using Pinia.

---
