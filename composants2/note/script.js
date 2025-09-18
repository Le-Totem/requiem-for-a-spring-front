class Note {
    constructor(notesGroup, label, x, space, align = 'bottom', staff) {
        this.notesGroup = notesGroup;
        this.label = label;
        this.x = x;
        this.space = space;
        this.align = align;
        this.staff = staff;
        this.width = 0;
        this.create();
    }

    create() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const rx = 8;
        const ry = 6;

        // position verticale
        let y = this.align === 'bottom'
            ? Math.min(this.space.bottom - ry, this.staff.safeBottom - ry)
            : Math.max(this.space.top + ry, this.staff.safeTop + ry);

        g.setAttribute('class', 'note');
        g.setAttribute('transform', `translate(${this.x}, ${y})`);

        // tête
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('class', 'head');
        ellipse.setAttribute('cx', 0);
        ellipse.setAttribute('cy', 0);
        ellipse.setAttribute('rx', rx);
        ellipse.setAttribute('ry', ry);
        g.appendChild(ellipse);

        // queue
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stem.setAttribute('class', 'stem');
        stem.setAttribute('x1', rx);
        stem.setAttribute('y1', 0);
        stem.setAttribute('x2', rx);
        stem.setAttribute('y2', -36);
        g.appendChild(stem);

        // texte
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = this.label;
        text.setAttribute('x', rx + 6);
        text.setAttribute('y', 0);
        g.appendChild(text);

        // interaction
        g.addEventListener('pointerdown', () => {
            g.classList.add('active');
            alert(`Votre élément "${this.label}" a été supprimé`);
        });

        this.notesGroup.appendChild(g);
    }
}

function drawNotes() {
    const notesG = document.getElementById('notes');
    notesG.innerHTML = ''; // vider avant de redessiner

    const staff = window.PartitionStaff;
    const spaces = staff.getSpaces();
    const labels = ['Créer', 'Modifier', 'Valider', 'Supprimer'];

    const svgWidth = window.PartitionSVG.viewBox.baseVal.width; // largeur dynamique
    const margin = 40;

    // on fixe une largeur approximative pour chaque note
    const noteWidths = labels.map(label => 60);
    const totalWidthNotes = noteWidths.reduce((acc, w) => acc + w, 0);
    const remainingSpace = svgWidth - 2 * margin - totalWidthNotes;
    const gap = remainingSpace / (labels.length - 1);

    let currentX = margin;
    labels.forEach((label, i) => {
        const spaceIndex = i % spaces.length;
        const align = i % 2 === 0 ? 'bottom' : 'top';
        new Note(notesG, label, currentX, spaces[spaceIndex], align, staff);
        currentX += noteWidths[i] + gap;
    });
}

// ⚡ Initialisation + redraw sur resize
window.addEventListener('DOMContentLoaded', drawNotes);
window.addEventListener('resize', drawNotes);
