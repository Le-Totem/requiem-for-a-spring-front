function loadClef(targetGroup) {
    fetch('clef/cleSol.svg')
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(data, 'image/svg+xml');

            // Récupère le contenu interne de l'SVG (les paths, g, etc.)
            const innerElements = svgDoc.documentElement.cloneNode(true).childNodes;

            // Supprime tout ce qu’il y avait déjà
            targetGroup.innerHTML = '';

            // Ajoute les éléments de la clé dans le <g id="clef">
            innerElements.forEach(node => {
                if (node.nodeType === 1) { // seulement les éléments
                    targetGroup.appendChild(node);
                }
            });

            // Ajuste la position et la taille
            targetGroup.setAttribute('transform', 'translate(10,20) scale(0.2)');
        })
        .catch(err => console.error('Erreur chargement clef:', err));
}

window.loadClef = loadClef;

// Si on ouvre clef/index.html seul
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('clef-container');
    if (container) loadClef(container);
});
