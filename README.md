# Omni Notes Web Editor

Poniższa dokumentacja nie zawiera w sobie wszystkich informacji o wersji mobilnej aplikacji. Dokumentacja dla wersji mobilnej znajduje
się w [tym repozytorium](https://github.com/sp1-2021/Omni-Notes).

Naszym zadaniem w ramach przedmiotu Studio Projektowe jest dodanie do open-source'owej aplikacji Omni-Notes możliwość
synchronizacji notatek w chmurze. Dostęp musi być też możliwy przez przeglądarkę internetową.

1. [O aplikacji](#1-o-aplikacji)
2. [Instrukcja instalacji i uruchomienia aplikacji](#2-instrukcja-instalacji-i-uruchomienia-aplikacji)
3. [Instrukcja wdrożenia aplikacji](#3-instrukcja-wdrozenia-aplikacji)
4. [Instrukcja uzytkownika](#4-instrukcja-uzytkownika)
5. [Informacje o projekcie](#5-informacje-o-projekcie)
   - [Cele](#51-cele)
   - [Specyfikacja funkcjonalna projektu](#52-specyfikacja-funkcjonalna-projektu)
   - [Zrealizowane funkcjonalnosci](#53-zrealizowane-funkcjonalnosci)
   - [Analiza ryzyka](#54-analiza-ryzyka)
   - [Wybrana metodyka](#55-wybrana-metodyka)
   - [Autorzy i zakres odpowiedzialności](#56-autorzy-i-zakres-odpowiedzialnosci)
6. [Oryginalna dokumentacja](#6-oryginalna-dokumentacja)
7. [Licencja](#7-licencja)

## 1. O aplikacji

**Omni Notes Web Editor** - edytor webowy do zarządzania notatkami, zapewniający schludny interfejs oraz prostotę
działania. Edytor zapewnia synchronizację z aplikacją mobilną **Omni Notes** poprzez Twój Dysk Google - dzięki czemu
użytkownik może korzystać jednocześnie z aplikacji internetowej oraz mobilnej wersji na smartfonie.

Oryginalne repozytorium z aplikacją mobilną znajduje się [tutaj](https://github.com/federicoiosue/Omni-Notes).

## 2. Instrukcja instalacji i uruchomienia aplikacji

### 2.1. Instalacja

Aplikacja do poprawnego działania wymaga zainstalowanego środowiska [Node](https://nodejs.org/en/) w wersji 10.13 lub
późniejszej.

1. Należy zclonować repozytorium projektu

```bash
git clone https://github.com/sp1-2021/Omni-Notes-Web
```

2. Następnie w zależności od używanego package managera dla Node, należy zainstalować moduły. Przy tworzeniu projektu
   wykorzystany był `yarn` i taki package manager jest też rekomendowany

```bash
yarn install
```

3. Po zainstalowaniu modułów należy przejść do konfiguracji aplikacji

### 2.2. Konfiguracja

Konfiguracja aplikacji odczytywana jest ze zmiennych środowiskowych. Bazowa konfiguracja znajduje się w pliku `.env`. W
lokalnym środowisku należy utworzyć plik `.env.local`, który nie będzie częścią publicznie dostępnego repozytorium, a
następnie przekopiować do niego bazową konfigurację z pliku `.env`, i uzupełnić pola według poniższych instrukcji. W
przypadku deploymentu produkcyjnego, można wykorzystać plik `.env.production.local` lub bezpośrednio ustawić zmienne
środowiskowe w systemie

#### 2.2.1. Uwierzytelnianie

Aplikacja do poprawnego działania wymaga skonfigurowania uwierzytelnienia OAuth za pomocą Google. W tym celu należy
utworzyć poświadczenia dla projektu (opis procesu znajdziemy
w [dokumentacji Google](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials),
sekcja "Utwórz dane uwierzytelniające"). Jeżeli
wcześniej [utworzono już te dane dla aplikacji mobilnej](https://github.com/sp1-2021/Omni-Notes#przygotowanie-%C5%9Brodowiska-przed-uruchomieniem-projektu)
to należy z nich skorzystać, zamiast generować nowe poświadczenie. Po utworzeniu poświadczeń należy utworzyć
plik `.env.local`, o następującej zawartości:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Uzupełniając klucze `GOOGLE_CLIENT_ID` oraz `GOOGLE_CLIENT_SECRET` wartościami uzyskanymi od Google.

#### 2.2.2. Dostęp do Google Drive

Domyślnie aplikacja działa na
ograniczonym [scope dostępu do Google Drive](https://developers.google.com/drive/api/v2/about-auth), przez co może
odczytywać jedynie pliki, które sama utworzyła. W celu umożliwienia aplikacji odczytywania plików zuploadowanych
bezpośrednio przez użytkownika, konieczne jest skorzystanie z szerszego dostępu. Aby to zrobić należy w utworzonym
wcześniej plik `.env.local` dodać linijkę:

```bash
GOOGLE_DRIVE_FULL_ACCESS_SCOPE_ENABLED=true
```
Należy jednak wspomnieć, że pliki, które dodawane są przez użytkownika na dysk bezpośrednio, pozbawione są metadanych tworzonych przez aplikację (tytuł, wycinek i data), w związku z czym mogą być na początku niepoprawnie wyświetlane. Metadane zostaną zaktualizowane po pierwszym zapisie pliku dokonanym przez aplikację.

### 2.3. Uruchomienie środowiska developerskiego

Aby uruchomić środowisko należy użyć polecenia

```bash
yarn dev
```

Aplikacja domyślnie jest dostępna pod adresem `http://localhost:3000`

## 3. Instrukcja wdrozenia aplikacji

W celu utworzenia buildu produkcyjnego należy posłużyć się poleceniem

```bash
yarn build
```

Po zakończeniu buildu, aplikację można uruchomić za pomocą polecenia

```bash
yarn start
```

Szczegółowe informacje o deploymencie aplikacji opartych o Next.js znajdziemy w
sekcji [Deployment w dokumentacji](https://nextjs.org/docs/deployment) na oficjalnej stronie framework'u.

## 4. Instrukcja uzytkownika

Instrukcja użytkownika wraz z opisem interfejsu aplikacji znajduje
się [tutaj](https://stonly.com/guide/en/omni-notes-web-ILlUY6MAWJ/Steps/443574).

## 5. Informacje o projekcie

### 5.1. Cele

Głównym celem aplikacji było stworzenie edytora internetowego, który będzie w stanie synchronizować się z dyskiem
Google, co umożliwiało edycję i tworzenie notatek zarówno w aplikacji internetowej, jak i aplikacji mobilnej, która
została specjalnie.

### 5.2. Specyfikacja funkcjonalna projektu

#### 5.2.1. Nowe funkcjonalności aplikacji mobilnej

##### 5.2.1.1 Uwierzytelnianie poprzez konto Google

Użytkownik w trakcie użytkowania aplikacji może włączyć możliwość synchronizacji wybranych notatek z chmurą. Wymaga to
zalogowania się do konta google.

##### 5.2.1.2 Wybór lokalizacji notatek w chmurze

Kiedy użytkownik jest zalogowany i chce zsynchronizować notatkę z chmurą, musi najpierw wybrać katalog w którym będą
umieszczane metadane notatek oraz plik bazy danych.

##### 5.2.1.3 Synchronizacja notatek z chmurą

Notatki synchronizowane w trakcie odczytu ich treści są pobierane z chmury, wraz z zawartością notatki pobierane są
również załączniki. Podczas zapisu notatki, jej treść jest zapisywana na dysku w chmurze, wszystkie nowe oraz zmienione
załączniki są ponownie przekazywane do chmury. Zmiana załącznika wykrywana jest poprzez sprawdzenie sygnatury pliku

#### 5.2.2. Aplikacja webowa

Rozwój aplikacji webowej podzielony zostanie na dwa główne etapy:

##### 5.2.2.1 MVP - implementacja bazowych funkcjonalności aplikacji mobilnej w aplikacji webowej

* Logowanie do usługi Google Drive
* Synchronizacja notatek
* Odczytywanie, tworzenie i modyfikacja notatek
* Usuwanie notatek
* Wsparcie dla i18n

##### 5.2.2.2 Implementacja pozostałych funkcjonalności zawartych w aplikacji mobilnej

* Obsługa załączników
* Archiwizacja notatek
* Wyszukiwanie notatek
* Kategoryzowanie notatek
* Tagowanie notatek
* Export / import

### 5.3 Zrealizowane funkcjonalnosci

Z celów dla aplikacji mobilnej zrealizowaliśmy wszystkie poza wyborem katalogu, w którym ma odbywać się synchronizacja.
W aktualnej wersji notatki przechowywane są w root katalogu na Google Drive. Podjęliśmy taką decyzję ze względu na
poziom skomplikowania przeszukiwania struktury z folderami w Google Drive.

Z przyjętych celów dla aplikacji webowej zrealizowaliśmy wszystkie, poza:

- kategoryzowaniem i tagowaniem notatek w aplikacji webowej, ze względu na sposób działania tego systemu w oryginalnej
  aplikacji mobilnej - tagi i kategorie, przechowywane są w plikach z notatką, a przeszukiwanie plików tekstowych w celu
  ich znalezienia i wyodrębnienia wykroczyło poza zakres projektu.

- upload załączników obsługiwany jest tylko przez aplikację mobilną. Jeśli chodzi natomiast o załączniki w
  aplikacji webowej, to obsługujemy jedynie ich odczytywanie z Google Drive, ale nie sam upload, ze względu na to, że
  edytor tekstowy, z którego korzystamy podczas próby dodania obrazka, zamienia go na base64 lub wstawia bezpośredni
  link, co nie jest obsługiwane przez aplikację mobilną. W celu obsługi uploadu musielibyśmy edytować komponent edytora.
- import / export notatek - uznaliśmy, że podobna funkcjonalność jest już realizowana przez Google Drive w postaci
  pobierania i uploadowania plików

### 5.4. Analiza ryzyka

| Ryzyko                                                                                    | Poziom ryzyka | Prawdopodobieństwo | Potencjalne rozwiązania                                                                      |
|-------------------------------------------------------------------------------------------|---------------|--------------------|----------------------------------------------------------------------------------------------|
| Nieukończenie Androidowej części projektu ze względu na brak doświadczenia z tą platformą | Wysoki        | Średnie            | Wyszukanie podobnych open-sourcowych rozwiązań                                               |
| Nieukończenie portowania wszystkich feature'ów z aplikacji mobilnej do wersji webowej     | Średnie       | Wysokie            | Priorytezacja feature'ów z MVP, następnie implementacja najprostszych dodatkowych feature'ów |
| Brak możliwości zapisywania wszystkich danych przez aktualną architekturę oprogramowania  | Średnie       | Niskie             | Implementacja możliwej do zrealizowania funkcjonalności, a dopiero później próba             |
| Niska wydajność aplikacji przy synchronizacji dużych notatek                              | Niskie        | Niskie             | Sprawdzanie zmian w tle i selektywna aktualizacja notatek                                    |

### 5.5. Wybrana metodyka

Do zarządzania projektem wybraliśmy metodykę Scrum. Wybraliśmy ją ze względu na to, że pozwali nam na regularne i
iteracyjne sprawdzanie naszych postępów, co może się okazać kluczowe szczególnie w przypadku części projektu związanej z
aplikacją mobilną - ze względu na nasz brak doświadczenia z platformą Android nie jesteśmy w stanie dokładnie oszacować
czasu, który będzie potrzebny do zrealizowania poszczególnych zadań. Z każdym kolejnym sprintem będziemy wiedzieli na co
poświęcić więcej czasu, którym zadaniom nadać większy priorytet i ile dane zadanie może realnie zająć czasu.

Podsumowując:

* Stosujemy metodykę Scrum z 2 tygodniowymi sprintami
* Na początku każdego sprintu zespół spotka się i wybierze nowe zadania z backlogu do realizacji
* Tablica sprintu będzie dostępna na platformie [GitHub](https://github.com/orgs/sp1-2021/projects)
* Po zakończeniu sprintu zespół podsumuje swoje prace i przedstawi ich wynik prowadzącemu

### 5.6. Autorzy i zakres odpowiedzialnosci

* [Michał Bar](https://github.com/MrPumpking) - rozwój aplikacji webowej, synchronizacja z Google API, testowanie
  aplikacji webowej, prowadzenie dokumentacji
* [Maciej Ładoś](https://github.com/macieklad) - rozwój aplikacji mobilnej, synchronizacja z Google API, testowanie
  aplikacji mobilnej, prowadzenie aplikacji
* [Kamil Woźnik](https://github.com/Valaraucoo) - rozwój aplikacji webowej, personalizacja edytora, testowanie aplikacji
  webowej, prowadzenie dokumentacji

## 6. Oryginalna dokumentacja

https://logout400.gitbook.io/omni-notes/

## 7. Licencja

GPL-3.0 License
