function loadClef(targetGroup) {
    fetch('clef/cleSol.svg')
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(data, 'image/svg+xml');

            // Récupérer uniquement le contenu de l'SVG
            const clefSvg = svgDoc.documentElement;

            // Supprimer ce qui existe déjà dans le groupe
            targetGroup.innerHTML = '';

            // Copier tous les enfants (path, g, etc.)
            while (clefSvg.firstChild) {
                targetGroup.appendChild(clefSvg.firstChild);
            }

            // Déplacer + redimensionner la clé
            targetGroup.setAttribute('transform', 'translate(20,20) scale(0.2)');
        })
        .catch(err => console.error('Erreur chargement clef:', err));
}

window.loadClef = loadClef;

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('clef-container');
    if (container) loadClef(container);
});
