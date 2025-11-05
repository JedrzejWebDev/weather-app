https://jedrzejwebdev.github.io/weather-app/

## 🧩 Struktura projektu:  
**src/components** - 2 pliki. W jednym pole tekstowe, w którym możemy wpisać miasto. Drugi odpowiedzialny za wyświetlanie parametrów pogodowych wpisanego miasta  
**src/api/weather.ts** - zawiera funkcję fetchWeather, która łączy się z API OpenWeatherMap przy użyciu metody fetch, pobiera dane pogodowe dla podanego miasta i zwraca je w przetworzonym formacie.  
**src/App.tsx** - używa komponentów z polem tekstowym i parametrami pogodowymi. W razie błędu połączenia z API wyświetla stosowny komunikat. Posiada identyfikator oraz zarządzanie stanem dla inputa. Stosowana jest także metoda useQuery w celu pobierania i zarządzania danymi asynchronicznymi powiązanymi z API  
**src/main.tsx** - uruchamia aplikację React, konfiguruje klienta React Query i udostępnia go w całej aplikacji, umożliwiając efektywne zarządzanie zapytaniami do API.  
**tests/fetchWeather.test.ts** - zawiera testy jednostkowe funkcji fetchWeather, które weryfikują poprawne pobieranie danych, obsługę błędów i przypadek pustego parametru miasta przy użyciu biblioteki Vitest.

## 🛠️ Technologie:  
react-query, vitest

## ⚙️ Instalacja i uruchomienie:  
**Przed przystąpieniem do wykonywania komend należy mieć zainstalowane git oraz node.js + npm**  
```bash
git clone https://github.com/JedrzejWebDev/weather-app.git  
cd weather-app  
npm install  
``` 
**Utwórz plik .env w głównym katalogu projektu i dodaj klucz API: VITE_API_KEY=twoj_klucz_z_openweathermap  
W celu zdobycia klucza:  
Wejdź na https://openweathermap.org/ i zarejestruj konto (Sign up / Sign in)  
Po zalogowaniu kliknij w swoją nazwę użytkownika i przejdź do sekcji My API keys https://home.openweathermap.org/api_keys  
Wpisz nazwę klucza i kliknij Generate  
Jeśli podczas wpisywania nazwy miasta występuje błąd 401, to należy
poczekać parę minut, aby klucz zadziałał**
```bash
npm run dev  
npm run test -> uruchomienie testów
