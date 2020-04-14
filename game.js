//Zmienna przechowująca tablicę ze wszystkimi możliwymi kolorami;
const cardsColor = ["chick", "chick", "rabbit", "rabbit", "dogs", "dogs", "easterEggs", "easterEggs", "easter", "easter", "flowers", "flowers", "moon", "moon", "tree", "tree", "eggs", "eggs"];

//Pobranie div-ów, które będą kartami
let cards = document.querySelectorAll("div");
cards = [...cards];

//Liczenie czasu po starcie gry (odświeżeniu strony);
const startTime = new Date().getTime();

//Zmienna przechowująca aktualnie klikniętą kartę;
let activeCard = "";

//Zmienna przechowująca parę;
const activeCards = [];

//Zmienna przechowująca ilość par kart
const gamePairs = cards.length / 2;

//Zmienna przechowująca wynik gry, który będzie pobijany po każdym znalezieniu pary i na końcu gdy nie będzie już par jego porównanie zakończy grę
let gameResult = 0;

//Funkcja do umożliwiania klikania w karty
const clickCard = function () {
    // console.log('klik');
    /*Mini gra - dwa kliknięcia
    czy to 1 kliknięcie
    czy to 2 kliknięcie
    jeśli drugie to zablokować na czas kliknięcia
    jeśli drugie to czy wygrana czy przegrana
    jeśli wygrana to sprawdzanie czy koniec gry
    zabezpieczenie: dwukrotne kliknięcie na ten sam element i w elment z klasą 'hidden'
    */
    activeCard = this;
    //Zabezpieczenie przed kliknięciem dwa razy w ten sam div
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");
    // czy to 1 kliknięcie
    if (activeCards.length === 0) {
        activeCards.push(activeCard);
        return;
    }
    //czy to 2 kliknięcie
    else {
        cards.forEach(card => card.removeEventListener("click", clickCard));
        activeCards.push(activeCard);
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => !card.classList.add("off"));
                gameResult++;
                //Wyłączenie możliwości kliknięcia na pary wyłączone z gry
                cards = cards.filter(card => !card.classList.contains("off"));

                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Udało się! Twój wynik to ${gameTime} sekund`);
                    location.reload(); //odświeżenie strony po kliknięciu ok w alercie
                }
            } else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500);
    }
}
//Nadawanie div-om kolorów
const init = () => {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);//usuwa jeden element z tablicy o indeksie równym wartości position;
    });
    //Ukrywanie kolorów po określonym czasie
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000)
}

init();