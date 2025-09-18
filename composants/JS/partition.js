class Staff {
    constructor(svgGroup, staffTop = 40, lineGap = 18, lines = 5) {
        this.svgGroup = svgGroup;
        this.staffTop = staffTop;
        this.lineGap = lineGap;
        this.lines = lines;
        this.safeTop = staffTop;
        this.safeBottom = staffTop + (lines - 1) * lineGap;
    }

    draw(startX, endX) {
        this.svgGroup.innerHTML = '';
        for (let i = 0; i < this.lines; i++) {
            const y = this.staffTop + i * this.lineGap;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('x2', endX);
            line.setAttribute('y1', y);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'black');
            line.setAttribute('stroke-width', '1.5');
            this.svgGroup.appendChild(line);
        }
    }

    getSpaces() {
        const spaces = [];
        for (let i = 0; i < this.lines - 1; i++) {
            const top = this.staffTop + i * this.lineGap;
            const bottom = top + this.lineGap;
            spaces.push({ top, bottom });
        }
        return spaces;
    }
}

// === Initialisation ===
const svg = document.getElementById('partition');
const staffG = document.getElementById('staff');
const notesG = document.getElementById('notes');

const svgWidth = 900;
const staff = new Staff(staffG);

// 1) Dessiner la portée avant tout
const margin = 40;
staff.draw(margin, svgWidth - margin);

// 2) Ensuite calculer les espaces disponibles
const labels = ['Créer', 'Modifier', 'Valider', 'Supprimer'];
const spaces = staff.getSpaces();
const n = labels.length;

function measureNoteWidth(label) {
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(tempSvg);
    const tempG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tempSvg.appendChild(tempG);
    const rx = 8;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = label;
    text.setAttribute('x', rx + 6);
    text.setAttribute('y', 0);
    tempG.appendChild(text);
    const width = rx + 6 + text.getBBox().width;
    document.body.removeChild(tempSvg);
    return width;
}

const noteWidths = labels.map(label => measureNoteWidth(label));
const totalWidthNotes = noteWidths.reduce((acc, w) => acc + w, 0);

const remainingSpace = svgWidth - 2 * margin - totalWidthNotes;
const gap = remainingSpace / (n - 1);

// 3) Ajouter les notes
let currentX = margin;
labels.forEach((label, i) => {
    const spaceIndex = i % spaces.length;
    const align = i % 2 === 0 ? 'bottom' : 'top';
    new Note(notesG, label, currentX, spaces[spaceIndex], align, staff);
    currentX += noteWidths[i] + gap;
});

// 4) Adapter la hauteur visible
svg.setAttribute('viewBox', `0 0 ${svgWidth} 160`);
