/* Mobiel menu */
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
    function sluitMenu() {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menu openen");
        menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Menu sluiten" : "Menu openen"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            sluitMenu();
            menuToggle.focus();
        }
    });
}

/* Formulieronderdelen */
const formulier = document.getElementById("verjaardagsformulier");
const adresvelden = document.getElementById("adresvelden");
const voornaamveld = document.getElementById("voornaam");
const dagveld = document.getElementById("geboortedag");
const maandveld = document.getElementById("geboortemaand");
const jaarveld = document.getElementById("geboortejaar");
const melding = document.getElementById("formuliermelding");
const testknop = document.getElementById("testknop");

if (
    formulier &&
    adresvelden &&
    voornaamveld &&
    dagveld &&
    maandveld &&
    jaarveld &&
    melding &&
    testknop
) {
    /* Adresvelden alleen bij een echte kaart */
    function werkAdresveldenBij() {
        const gekozenOptie = formulier.querySelector(
            'input[name="bezorging"]:checked'
        );

        const kiestKaart = gekozenOptie?.value === "kaart";

        adresvelden.hidden = !kiestKaart;
        adresvelden.disabled = !kiestKaart;
    }

    const bezorgopties = formulier.querySelectorAll(
        'input[name="bezorging"]'
    );

    bezorgopties.forEach(function (optie) {
        optie.addEventListener("change", werkAdresveldenBij);
    });

    /* Geboortedatum controleren */
    function controleerDatum() {
        dagveld.setCustomValidity("");
        jaarveld.setCustomValidity("");

        const vandaag = new Date();
        vandaag.setHours(0, 0, 0, 0);

        jaarveld.max = String(vandaag.getFullYear());

        if (
            !dagveld.value ||
            !maandveld.value ||
            !jaarveld.value
        ) {
            return;
        }

        const dag = Number(dagveld.value);
        const maand = Number(maandveld.value);
        const jaar = Number(jaarveld.value);

        if (
            !Number.isInteger(jaar) ||
            jaar < 1900 ||
            jaar > vandaag.getFullYear()
        ) {
            jaarveld.setCustomValidity(
                "Vul een geboortejaar in tussen 1900 en " +
                vandaag.getFullYear() + "."
            );
            return;
        }

        const geboortedatum = new Date(jaar, maand - 1, dag);

        // JavaScript schuift ongeldige datums door.
        // Daarom vergelijken we de datum met de ingevulde waarden.
        const datumKlopt =
            Number.isInteger(dag) &&
            Number.isInteger(maand) &&
            geboortedatum.getFullYear() === jaar &&
            geboortedatum.getMonth() === maand - 1 &&
            geboortedatum.getDate() === dag;

        if (!datumKlopt) {
            dagveld.setCustomValidity(
                "Deze datum bestaat niet. Controleer dag, maand en jaar."
            );
            return;
        }

        if (geboortedatum > vandaag) {
            jaarveld.setCustomValidity(
                "De geboortedatum mag niet in de toekomst liggen."
            );
        }
    }

    function controleerVoornaam() {
        voornaamveld.setCustomValidity("");

        if (
            voornaamveld.value.length > 0 &&
            !voornaamveld.value.trim()
        ) {
            voornaamveld.setCustomValidity(
                "Vul een voornaam in, niet alleen spaties."
            );
        }
    }

    dagveld.addEventListener("input", controleerDatum);
    maandveld.addEventListener("change", controleerDatum);
    jaarveld.addEventListener("input", controleerDatum);
    voornaamveld.addEventListener("input", controleerVoornaam);

    /* Oude bevestiging wissen na een wijziging */
    function wisMelding() {
        melding.textContent = "";
    }

    formulier.addEventListener("input", wisMelding);
    formulier.addEventListener("change", wisMelding);

    /* Alleen testen: geen gegevens versturen */
    formulier.addEventListener("submit", function (event) {
        event.preventDefault();

        controleerDatum();
        controleerVoornaam();

        if (!formulier.reportValidity()) {
            return;
        }

        melding.textContent =
            "De test is gelukt! De verplichte velden zijn ingevuld " +
            "en de geboortedatum is geldig. Er is niets opgeslagen, " +
            "geen mail verstuurd en geen kaart aangevraagd.";
    });

    werkAdresveldenBij();
    controleerDatum();
    controleerVoornaam();

    // De knop werkt zodra de formuliercode is geladen.
    testknop.disabled = false;
}