const bestelformulier = document.getElementById("bestelformulier");
const productveld = document.getElementById("product");
const aantalveld = document.getElementById("aantal");
const bestelmelding = document.getElementById("bestelmelding");
const bestelknop = document.getElementById("bestelknop");

if (
    bestelformulier &&
    productveld &&
    aantalveld &&
    bestelmelding &&
    bestelknop
) {
    bestelformulier.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!bestelformulier.reportValidity()) {
            return;
        }

        const productnamen = {
            tijdschrift: "Wurzels-tijdschrift",
            plattegrond: "verzamelplattegrond"
        };

        const productnaam = productnamen[productveld.value];
        const aantal = Number(aantalveld.value);

        if (
            !productnaam ||
            !Number.isInteger(aantal) ||
            aantal < 1 ||
            aantal > 10
        ) {
            return;
        }

        bestelmelding.textContent =
            `Jouw testkeuze: ${aantal} × ${productnaam}. ` +
            "De prijs is nog niet bekend. " +
            "Er is geen bestelling geplaatst en niets betaald.";
    });

    function wisBestelmelding() {
        bestelmelding.textContent = "";
    }

    bestelformulier.addEventListener("input", wisBestelmelding);
    bestelformulier.addEventListener("change", wisBestelmelding);

    bestelknop.disabled = false;
}