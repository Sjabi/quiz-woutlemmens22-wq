
/**
 * @jest-environment jsdom
 */

let score = 0;

// DOM simulatie
document.body.innerHTML = `
<h2 id="vraag"></h2>
<div id="antwoorden"></div>
<p id="feedback"></p>
<button id="start"></button>
<button id="volgende"></button>
`;

require("../script.js");

// ===== TEST 1: START =====
test("Startknop werkt", () => {
    document.getElementById("start").click();

    let vraag = document.getElementById("vraag").textContent;

    if (vraag.length > 0) {
        score += 4;
    }

    expect(vraag.length).toBeGreaterThan(0);
});

// ===== TEST 2: ANTWOORDEN =====
test("Antwoorden worden weergegeven", () => {
    document.getElementById("start").click();

    let knoppen = document.querySelectorAll("#antwoorden button");

    if (knoppen.length > 0) {
        score += 4;
    }

    expect(knoppen.length).toBeGreaterThan(0);
});

// ===== TEST 3: FEEDBACK =====
test("Klik op antwoord geeft feedback", () => {
    document.getElementById("start").click();

    let knop = document.querySelector("#antwoorden button");
    knop.click();

    let feedback = document.getElementById("feedback").textContent;

    if (feedback.length > 0) {
        score += 4;
    }

    expect(feedback.length).toBeGreaterThan(0);
});

// ===== TEST 4: VOLGENDE =====
test("Volgende knop werkt", () => {
    document.getElementById("start").click();

    let eersteVraag = document.getElementById("vraag").textContent;

    let knop = document.querySelector("#antwoorden button");
    knop.click();

    document.getElementById("volgende").click();

    let tweedeVraag = document.getElementById("vraag").textContent;

    if (eersteVraag !== tweedeVraag) {
        score += 4;
    }

    expect(tweedeVraag).not.toBe(eersteVraag);
});

// ===== TEST 5: FEEDBACK RESET =====
test("Nieuwe vraag reset feedback", () => {
    document.getElementById("start").click();

    let knop = document.querySelector("#antwoorden button");
    knop.click();

    document.getElementById("volgende").click();

    let feedback = document.getElementById("feedback").textContent;

    if (feedback === "" || feedback.length === 0) {
        score += 4;
    }

    expect(feedback.length).toBe(0);
});


// ===== EINDSCORE TONEN =====
afterAll(() => {
    console.log("=================================");
    console.log("EINDSCORE: " + score + "/20");
    console.log("=================================");
});
