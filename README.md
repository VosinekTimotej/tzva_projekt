# tzva_projekt

## Navodila za namestitev aplikacije
- Namestitev kode s Github - git clone git@github.com:VosinekTimotej/tzva_projekt.git
- Ustvarjanje .env datoteke v mapi Server v katero vpisemo port, mongodb url & jwt secret key
```
PORT=5000
MONGODB_URL=
JWT_SECRET=
```
- Ustvarjanje dodatne .env datoteke v korenski mapi v katero vpisamo svoj IP naslov (glej naslov [Server nastavitve](#server-nastavitve))
```
IP=
```
- Odpremo terminal v mapi Server in pozenemo server ``` npm install ``` in nato ``` npm start ```
- Odpremo terminal v korenski mapi in pozenemo ``` npm install ``` in nato zaženeco celotno aplikacijo s ``` npm start ```
- Se odlocimo ali pozenemo android emulator (v primeru da imamo namescenega) ali preko mobilne aplikacije scan qr kodo (prav tako moramo namestiti expo mobile app)

## Navodila za zagon aplikacije
- ``` Run npm start ``` 
- Na telefonu si instaliraj expo go
- Skeniraj qr kodo

## TODO

- [x] Server dodat pri login/signup
- [x] Izberemo na kateri acc se dodajajo transakcije (kako izbrati in oznaciti izbranega)
- [x] Server za pridobivanje transakcij
- [x] Main footer za navigacijo
- [x] Dodaj kategorijo 
- [x] Meje screen
- [x] Dodaj mejo
- [x] Spreminjanje barve border glede na to kako blizu dosega meje smo
- [x] Racuni screen
- [x] Dodaj racun
- [x] Dodajanje transakcije
- [x] Screen odhodki
- [x] Screen prihodki
- [x] Podrobno o transakciji screen
- [x] Info screen
- [x] Screen za spreminjane user info
- [x] Screen change password
- [x] Server User info
- [x] Server password
- [x] Lepsi date prikaz
- [x] Delete racun
- [x] Napisi ko ni transakcij
- [x] Login show msg if wrong password ali no user
- [x] Dodaj alert error ce gre kaj narobe
- [x] hashing passwords spremeni geslo, login, signup 
- [x] Ko delete acc delate all transactions 
- [ ] Main footer za navigacijo
- [ ] Uredit izgled
- [ ] Notification za  bližanje meji
- [ ] Stanje screen
- [ ] Spreminjanje valute
- [ ] Server meje
- [x] Category server
- [x] Category screen (add, delete, edit, see categories)
- [x] Ko user doda transakcijo da izbere izmed ene ze narejene kategorije ali doda tam novo
- [x] ? Pri kategorijah mogoce da ima vsaka kategorija koliko je current stanje koliko je ze zapravil za to
- [x] Kategorije treba prestavit in jih vezat na account ne na user
- [x] Da ima user ko naredi account nekaj default kategorij

## TODO EXTRA
- [x] Moznost pri dodajanu racuna da vpise id racuna ce se zeli dodat skupni racun
- [ ] Mozno izbire icone pri kategoriji
- [x] Dvojezicnost
- [x] Iskanje po transakcijah (type, category) - na transakcije screen neko polje za iskanje
- [ ] Pri spreminjanju password mora vpisat old password
- [ ] Pri skupnih racunih imajo drugo barvo ce nisi owner (mores dobit svoj current ID in ga primerjas s racun.user_id)

## Server nastavitve
- V CMD ipconfig da dobis svoj IPv4 naslov
- V korensko mapo dodaj .env file z spremenljivko IP=(vpiši svoj IPv4)
- Primer
```
IP=192.168.1.15
```

### Icons:
- <img src="/assets/add.png" alt="Add icon" width="20" height="20" /> <a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by dmitri13 - Flaticon</a>
- <img src="/assets/piggy-bank.png" alt="Piggy bank icon" width="20" height="20" /> <a href="https://www.flaticon.com/free-icons/money" title="money icons">Money icons created by Freepik - Flaticon</a>
- <img src="/assets/setting.png" alt="Settings icon" width="20" height="20" /> <a href="https://www.flaticon.com/free-icons/settings" title="settings icons">Settings icons created by Freepik - Flaticon</a>
- <img src="/assets/delete.png" alt="Settings icon" width="20" height="20" /> <a href="https://www.flaticon.com/free-icon/delete_1214428?term=delete&page=1&position=1&origin=search&related_id=1214428" title="delete icons">Link delete icon</a> 
- <img src="/assets/search.png" alt="Search icon" width="20" height="20" /> <a href="https://icons8.com/icon/7695/search" title="search icons">Link search icon</a> 
- <img src="/assets/dropdown.png" alt="Dropdown icon" width="20" height="20" /> <a href="https://icons8.com/icon/39786/expand-arrow" title="dropdown icons">Link dropdown icon</a> 
- <img src="/assets/close.png" alt="Close icon" width="20" height="20" /> <a href="https://icons8.com/icon/8112/close" title="close icons">Link close icon</a> 



