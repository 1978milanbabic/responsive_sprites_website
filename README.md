# Node website (ejs) for responsive sprites framework (framework creation tool)


### Readme file - će nadalje biti pisan na Srpskom jeziku (mimo uobičajene prakse) jer je ovaj repozitorijum namenjen isključivo za potrebe odbrane završnog projekta na "Code" kursu za JavaScript
*Zbog sigurnosnih razloga postojećeg web sajta repozitorijum će uskoro biti uklonjen jer sadrži kritične bezbednosne informacije za funkcionisanje samog sajta*


## Link sajta: [http://responsive-sprites.com/](http://responsive-sprites.com/)

----------


### Ideja:

 > Ideja je bila da se primeni već postojeći, dobro provereni framework koji kontroliše sprites images na način da ih značajno preciznije pozicionira i prikazuje. Ovaj framework takodje ima sposobnost da od sprites slika napravi responsive slike. Implementacija samih slika neodoljivo podseća na popularni font-awesome, te je stoga veoma jednostavna i praktična. Najkomplikovaniji deo implementacije je bio kreiranje sprites slika, kao i objekta koji reprezentuje njegove podatke/podatke o pojedinačnim sličicama, te je stoga i napravljen sajt koji značajno olakšava i ubrzava ovaj proces
 ----------


### O samom sajtu - funkcionalnost:

 >  - Zbog upload-ovanja slika da ne bi došlo do "sukoba" višestrukih posetilaca, potrebno je za svakog posetioca napraviti nalog i odvojiti prostor, odnosno folder u koji će biti vršen upload slika, kao i snimanje kreirane sprites slike i json podataka o njoj
 >  - Registrovanje novih korisnika se vrši preko slanja registracionog linka na mail potencijalnog korisnika, koji on mora da potvrdi/poseti da bi aktivirao nalog
 >  - Novi registri se arhiviraju u mongoDB bazu podataka, gde su podaci: korisničko ime, izabrana šifra, link za aktivaciju naloga, kao i da li je nalog aktiviran
 >  - Sesije su izbegnute zbog niza tehničkih nedostataka, a umesto njih sesije kontrolišu kolačići koji se pri svakoj poseti i svakoj aktivnosti na bilo kojoj stranici produžuju za pola sata. Kolačići nose podatke o imenu korisnika, kao i trenutnoj aktivnosti na kreaciji sprites-a i detalje vezane za njega, te stoga služe i kao spona izmedju pojedinačnih stranica. Ključni kolačići sa podacima su kreirani na backend-u i salju se na frontend. Zbog bezbednosnog rizika svaka "nelegalna" akcija prouzrokovana korišćenjem podataka iz kolačića je pokrivena error handlerom.
 >  - Sprites image engine pokriva kreiranje png, kao i jpg fajlove uz gomilu opcija
 >  - Nakon uspešnog kreiranja sprites image-a, korisniku se nudi gotova implementacija frontend frameworka sa ubacenim podacima o slici koji se lako kopiraju i ubacuju u projekat, kao i download kreirane slike
 >  - Pomenuta stranica sadrži i sve pojedinačne sličice kako bi se lako i brzo copy/paste-primenilo u projekat
 ----------


### Detalji o backend-u:

 >  - Backend-om upravlja Node.js/Express sa "ejs view-engine-om" na jednom procesu i mongoDB lokalno/na istoj mašini, na drugom procesu. Tokom developmenta isti princip je sledjen - node.js i lokalni mongoDB. Sam proces spajanja slika je kroz gulp modul koji node koristi interno i aktivno. Od modula karakterističnih za projekat tu su još i "del", "fs", "gulp", "gulp.spritesmith" i "merge-stream", pored uobičajenih: "express", "cookie-parser", "body-parser", "express-fileupload", "path"....
 >  - Smatrao sam za potrebnim da istaknem važnost logovanja, te sam stoga za taj error odvojio posebnu stranicu koja "viče" na ovu grešku
 >  - Greške koje bi prekinule proces - "srušile" sajt su lokalizovane na log na server-side i ignorisane/izbegnute - greške modula, greške operacija sa bazom,...
 >  - Za uobičajene greške sam izdvojio stanicu koja se renderuje i šalje stilizovana na frontend - 404, bad extension,...
 >  - Najveći problem na koji sam naišao jeste korišćenje pojedinih modula koji rade u sopstvenom "ekosistemu" - promisi često ne završavaju callback-om iako izvrše zadani zadatak, a negde u modulu ostaju informacije o "nedovršenom" poslu, tako da prilikom narednog poziva potencijalno "ruše" sajt. Ovo je karakteristično za async-sync funkcije unutar async okruženja. Rešenje sam našao u try/catch metodi i logovanjem greške na server, čime se resetuje status promisa pa je funkcija ponovo spremna za "upotrebu"
 >  - Svi fajlovi kojima "barata" korisnik se smeštaju/su smešteni u "public" folder jer smatram da je sve što se "upload-uje" na server od strane korisnika na neki način "prljav" fajl koji ne bi smeo da ulazi u "zaštićene" zone, odnosno foldere, tako da jedan korisnik praktično ima mogućnost da pristupi i "tudjim" slikama, ali to za ovu vrstu projekta nije ni značajno jer privatnost ovih slika nije bitna
 >  - Kompletan backend prati ECMA 6 JavaScript nomenklaturu
 ----------


### Detalji o frontend-u:

 >  - Frontend out je radjen po principu "apsolutne" responsive-nosti. Kako po širini ekrana, tako i po visini - header je uvek "gore", footer je uvek na dnu, sadržaj je uvek centriran na sredini bez obzira na širinu i visinu ekrana. Iako nisam radio dizajn jer nisam "umetnička duša" - kao što se da videti iz priloženog, frontend zadovoljava principe praćenja "duplog" dizajna. Gde je jedan dizajn za "veće" uredjaje/ekrane, a drugi za one manje - do 480px. Ispod 480px kompletan sadžaj se proporcionalno smanjuje. To je ostvareno sa par SASS funkcija, gde se "referentna" veličina vezuje za REM veličinu, i jednim "media" uslovom namenjenim za to
 >  - EJS - Iako nazivno backend?, služi i kao odličan organizator delova dokumenta
 >  - HTML5 - korišteni su "semantic" tagovi i input type-ovi novijeg datuma
 >  - CSS3 - korištene su trazicije radi UI/UX, delimično je praćena i BEM nomenklatura tamo gde je imalo smisla - nije bilo potrebe za potpunom primenom jer se CSS oslanja na nestovanje u "glavne" kontejnere u SASS-u, a lično smatram da "preterivanje" sa BEM nomenklaturom dovodi do jako "prljavog" html-a
 >  - SASS - moćno sredstvo za strukturiranje CSS fajlova u razvoju -... korišćen,... nemam komentar
 >  - JS - Kompletan FE JavaScript striktno prati ECMA 5 nomenklaturu - zbog kompatibilnosti sa browserima. Najveći deo nominacija promenljivih i funkcija su lokalizovani unutar samoizvršujućih funkcija da se globalni scope ne bi "zatrovao" velikim brojem nominacija. Samo par promenljivih i par funkcija je globalizovano na window scope jer se koriste u više skripti istovremeno.
 >  - Sem Jquery-a, nikakav framework niti library nije korišćen. Štaviše, izbegnuto je korišćenje i nedovoljno cross-browser uskladjenih css3 veličina - poput Flex-a ili Grid-a.
 >  - Delovi JS-a i CSS-a koji se učitavaju na svim stranicama su smešteni respektivno u main.js i main.css da bi se "samo jednom učitali", odnosno "skinuli" sa sajta na lokal. Svaki naredni request browser učitava iz keša, tako da je smanjena količina koda za slanje na FE.
 >  - Razvojni deo frontend-a je smešten u "FE-Development" folder, odakle se fajlovi kompajliraju/prefiksuju/minifikuju u public folder - uz pomoć gulp.watch taskova
 ----------


### Detalji o implementaciji:

 >
 ----------


### Korišćeni alati i software-i:

 >



