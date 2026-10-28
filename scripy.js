const bezorgopties = document.querySelectorAll(
    'input[name="bezorging"]'
);

const adresvelden = document.querySelector("#adresvelden");

function werkAdresveldenBij() {
    const gekozenOptie = document.querySelector(
        'input[name="bezorging"]:checked'
    );

    if (!gekozenOptie || !adresvelden) {
        return;
    }

    const kiestKaart = gekozenOptie.value === "kaart";

    adresvelden.hidden = !kiestKaart;
    adresvelden.disabled = !kiestKaart;
}

bezorgopties.forEach(function (optie) {
    optie.addEventListener("change", werkAdresveldenBij);
});

werkAdresveldenBij();