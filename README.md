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

 > Backend-om upravlja Node.js/Express sa "ejs view-engine-om" na jednom procesu i mongoDB -na serveru, na drugom procesu. Tokom developmenta isti princip je sledjen - node.js i lokalni mongoDB. Sam proces spajanja slika je kroz gulp modul koji node koristi interno i aktivno. Od modula karakterističnih za projekat tu su još i "del", "fs", "gulp", "gulp.spritesmith" i "merge-stream", pored uobičajenih: "express", "cookie-parser", "body-parser", "express-fileupload", "path"....
 > Smatrao sam za potrebnim da istaknem važnost logovanja, te sam stoga za taj error odvojio posebnu stranicu koja "viče" na ovu grešku
 > Greške koje bi prekinule proces - "srušile" sajt su lokalizovane na log na server-side i ignorisane/izbegnute - greške modula, greške operacija sa bazom,...
 > Za uobičajene greške sam izdvojio stanicu koja se renderuje i šalje stilizovana na frontend - 404, bad extension,...
 > Najveći problem na koji sam naišao jeste korišćenje pojedinih modula koji rade u sopstvenom "ekosistemu" - promisi često ne završavaju callback-om iako izvrše zadani zadatak, a negde u modulu ostaju informacije o "nedovršenom" poslu, tako da prilikom narednog poziva potencijalno "ruše" sajt. Ovo je karakteristično za async-sync funkcije unutar async okruženja. Rešenje sam našao u try/catch metodi i logovanjem greške na server, čime se resetuje status promisa pa je funkcija ponovo spremna za "upotrebu"
 ----------


### Detalji o frontend-u:

 >
 ----------


### Detalji o implementaciji:

 >
 ----------


### Korišćeni alati i software-i:

 >
 ----------


