const kleurplaten = [
  { titel: "De Wurzels samen", bestand: "assets/kleurplaat-1.png" },
  { titel: "In de speelboom", bestand: "assets/kleurplaat-2.png" },
  { titel: "In de bloementuin", bestand: "assets/kleurplaat-3.png" },
  { titel: "Lente avontuur", bestand: "assets/kleurplaat-4.png" }
];

const dialoog = document.querySelector("#kleurplaatDialoog");
const afbeelding = document.querySelector("#kleurplaatAfbeelding");
const titel = document.querySelector("#kleurplaatTitel");
const downloadKnop = document.querySelector("#downloadKnop");

document.querySelectorAll(".kaart").forEach((kaart) => {
  kaart.addEventListener("click", () => {
    const gekozen = kleurplaten[Number(kaart.dataset.index)];
    titel.textContent = gekozen.titel;
    afbeelding.src = gekozen.bestand;
    afbeelding.alt = "Kleurplaat: " + gekozen.titel;
    downloadKnop.href = gekozen.bestand;
    downloadKnop.download = gekozen.bestand.split("/").pop();
    dialoog.showModal();
  });
});

document.querySelector(".sluiten").addEventListener("click", () => dialoog.close());
dialoog.addEventListener("click", (event) => {
  if (event.target === dialoog) dialoog.close();
});

document.querySelector("#printKnop").addEventListener("click", () => {
  const printVenster = window.open("", "_blank");
  if (!printVenster) {
    alert("Sta pop-ups toe om de kleurplaat af te drukken.");
    return;
  }
  printVenster.document.write(`
    <!doctype html><html lang="nl"><head><title>${titel.textContent}</title>
    <style>
      body { margin: 0; display: grid; place-items: center; min-height: 100vh; }
      img { max-width: 100%; max-height: 96vh; object-fit: contain; }
      @media print { img { width: 100%; max-height: 98vh; } }
    </style></head><body><img src="${afbeelding.src}" alt="${afbeelding.alt}">
    <script>window.onload = () => window.print();<\/script></body></html>
  `);
  printVenster.document.close();
});
