## Omni Notes Web Editor

Naszym zadaniem w ramach przedmiotu Studio Projektowe jest dodanie do open-source'owej aplikacji Omni-Notes możliwość synchronizacji notatek w chmurze. Dostęp musi być też możliwy przez przeglądarkę internetową.

Wszystkie przyjęte przez nas cele zostały osiągnięte w planowanym czasie i przy planowanych zasobach.

### O aplikacji

**Omni Notes Web Editor** - edytor webowy do zarządzania notatkami, zapewniający schludny interfejs oraz prostotę działania. Edytor zapewnia synchronizację z aplikacją mobilną **Omni Notes** poprzez Twój Dysk Google - dzięki czemu użytkownik może korzystać jednocześnie z aplikacji internetowej oraz mobilnej wersji na smartfonie.

Oryginalne repozytorium z aplikacją mobilną znajduje się [tutaj](https://github.com/federicoiosue/Omni-Notes).

### Instrukcja użytkownika

Instrukcja użytkownika wraz z opisem interfejsu aplikacji znajduje się [tutaj](https://stonly.com/guide/en/omni-notes-web-ILlUY6MAWJ/Steps/443574).


### Wybrana metodyka

Do zarządzania projektem wybraliśmy metodykę Scrum. Wybraliśmy ją ze względu na to, że pozwali nam na regularne i iteracyjne sprawdzanie naszych postępów, co może się okazać kluczowe szczególnie w przypadku części projektu związanej z aplikacją mobilną - ze względu na nasz brak doświadczenia z platformą Android nie jesteśmy w stanie dokładnie oszacować czasu, który będzie potrzebny do zrealizowania poszczególnych zadań. Z każdym kolejnym sprintem będziemy wiedzieli na co poświęcić więcej czasu, którym zadaniom nadać większy priorytet i ile dane zadanie może realnie zająć czasu.


Podsumowując: 
* Stosujemy metodykę Scrum z 2 tygodniowymi sprintami
* Na początku każdego sprintu zespół spotka się i wybierze nowe zadania z backlogu do realizacji
* Tablica sprintu będzie dostępna na platformie [GitHub](https://github.com/orgs/sp1-2021/projects)
* Po zakończeniu sprintu zespół podsumuje swoje prace i przedstawi ich wynik prowadzącemu

### Licencja
GPL-3.0 License

### Cele

Głównym celem aplikacji było stworzenie edytora internetowego, który będzie w stanie synchronizować się z dyskiem Google, co umożliwiało edycję i tworzenie notatek zarówno w aplikacji internetowej, jak i aplikacji mobilnej, która została specjalnie.

### Specyfikacja funkcjonalna projektu: 
#### 1. Nowe funkcjonalności aplikacji mobilnej
##### 1.1 Uwierzytelnianie poprzez konto Google
Użytkownik w trakcie użytkowania aplikacji może włączyć możliwość synchronizacji wybranych notatek z chmurą. Wymaga to zalogowania się do konta google.

##### 1.2 Wybór lokalizacji notatek w chmurze
Kiedy użytkownik jest zalogowany i chce zsynchronizować notatkę z chmurą, musi najpierw wybrać katalog w którym będą umieszczane metadane notatek oraz plik bazy danych.

##### 1.3 Synchronizacja notatek z chmurą
Notatki synchronizowane w trakcie odczytu ich treści są pobierane z chmury, wraz z zawartością notatki pobierane są również załączniki.
Podczas zapisu notatki, jej treść jest zapisywana na dysku w chmurze, wszystkie nowe oraz zmienione załączniki są ponownie przekazywane do chmury.
Zmiana załącznika wykrywana jest poprzez sprawdzenie sygnatury pliku

#### 2. Aplikacja webowa
Rozwój aplikacji webowej podzielony zostanie na dwa główne etapy:

##### 2.1 MVP - implementacja bazowych funkcjonalności aplikacji mobilnej w aplikacji webowej
* Logowanie do usługi Google Drive
* Synchronizacja notatek
* Odczytywanie, tworzenie i modyfikacja notatek
* Usuwanie notatek
* Wsparcie dla i18n

##### 2.2 Implementacja pozostałych funkcjonalności zawartych w aplikacji mobilnej
* Obsługa załączników
* Archiwizacja notatek
* Wyszukiwanie notatek
* Kategoryzowanie notatek
* Tagowanie notatek
* Export / import


### Analiza ryzyka
| Ryzyko                                                                                    | Poziom ryzyka | Prawdopodobieństwo | Potencjalne rozwiązania                                                                      |
|-------------------------------------------------------------------------------------------|---------------|--------------------|----------------------------------------------------------------------------------------------|
| Nieukończenie Androidowej części projektu ze względu na brak doświadczenia z tą platformą | Wysoki        | Średnie            | Wyszukanie podobnych open-sourcowych rozwiązań                                               |
| Nieukończenie portowania wszystkich feature'ów z aplikacji mobilnej do wersji webowej     | Średnie       | Wysokie            | Priorytezacja feature'ów z MVP, następnie implementacja najprostszych dodatkowych feature'ów |
| Brak możliwości zapisywania wszystkich danych przez aktualną architekturę oprogramowania  | Średnie       | Niskie             | Implementacja możliwej do zrealizowania funkcjonalności, a dopiero później próba             |
| Niska wydajność aplikacji przy synchronizacji dużych notatek                              | Niskie        | Niskie             | Sprawdzanie zmian w tle i selektywna aktualizacja notatek                                    |

### Autorzy i zakres odpowiedzialności

* [Michał Bar](https://github.com/MrPumpking) - rozwój aplikacji webowej, synchronizacja z Google API, testowanie aplikacji webowej, prowadzenie dokumentacji
* [Maciej Ładoś](https://github.com/macieklad) - rozwój aplikacji mobilnej, synchronizacja z Google API, testowanie aplikacji mobilnej, prowadzenie aplikacji
* [Kamil Woźnik](https://github.com/Valaraucoo) - rozwój aplikacji webowej, personalizacja edytora, testowanie aplikacji webowej, prowadzenie dokumentacji

### Instrukcja instalacji i uruchomienia aplikacji

TODO

### Instrukcja wdrożenia aplikacji

TODO
