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

function initPartition() {
    const svg = document.getElementById('partition');
    const staffG = document.getElementById('staff');
    const container = document.querySelector('.partition');
    const margin = 40;

    // largeur dynamique
    const svgWidth = container.clientWidth;

    const staff = new Staff(staffG);
    staff.draw(margin, svgWidth - margin);

    // mettre à jour le viewBox pour adapter l’échelle
    svg.setAttribute('viewBox', `0 0 ${svgWidth} 160`);

    // exposer aux notes
    window.PartitionStaff = staff;
    window.PartitionSVG = svg;
}

// ⚡ Initialisation + mise à jour sur resize
window.addEventListener('DOMContentLoaded', initPartition);
window.addEventListener('resize', initPartition);
