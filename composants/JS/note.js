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

        // Position verticale dans les limites de la portée
        let y;
        if (this.align === 'bottom') {
            y = Math.min(this.space.bottom - ry, this.staff.safeBottom - ry);
        } else {
            y = Math.max(this.space.top + ry, this.staff.safeTop + ry);
        }

        g.setAttribute('class', 'note');
        g.setAttribute('transform', `translate(${this.x}, ${y})`);

        // Tête de note
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('class', 'head');
        ellipse.setAttribute('cx', 0);
        ellipse.setAttribute('cy', 0);
        ellipse.setAttribute('rx', rx);
        ellipse.setAttribute('ry', ry);
        g.appendChild(ellipse);

        // Queue (toujours vers le haut)
        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stem.setAttribute('class', 'stem');
        stem.setAttribute('x1', rx);
        stem.setAttribute('y1', 0);
        stem.setAttribute('x2', rx);
        stem.setAttribute('y2', -36);
        g.appendChild(stem);

        // Texte (aligné à droite de la note)
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = this.label;
        text.setAttribute('x', rx + 6);
        text.setAttribute('y', 0); // aligné verticalement au centre
        g.appendChild(text);

        // Largeur du composant
        const bbox = text.getBBox();
        this.width = rx + 6 + bbox.width;

        // Interaction
        g.addEventListener('pointerdown', () => {
            g.classList.add('active');
            alert(`Votre élément "${this.label}" a été supprimé`);
        });

        this.notesGroup.appendChild(g);
    }
}
