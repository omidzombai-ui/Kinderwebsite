
const puzzleChecks = document.querySelectorAll(".puzzle-check");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

function updateProgress() {
    const totalPieces = puzzleChecks.length;

    let collectedPieces = 0;

    puzzleChecks.forEach(function(check) {
        if (check.checked) {
            collectedPieces++;
        }
    });

    const percentage = (collectedPieces / totalPieces) * 100;

    progressText.textContent =
        `Je hebt ${collectedPieces} van de ${totalPieces} stukjes verzameld.`;

    progressFill.style.width = percentage + "%";

    if (collectedPieces === totalPieces) {
        progressText.textContent =
            "🎉 Gefeliciteerd! Je hebt alle puzzelstukjes verzameld!";
    }
}

puzzleChecks.forEach(function(check) {
    check.addEventListener("change", updateProgress);
});
