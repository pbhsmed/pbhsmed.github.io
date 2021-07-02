class Tooltip{
    static tooltipPath(width, height, offset, radius, position){
        const method = `${position}TooltipPath`;
        return this[method](width, height, offset, radius);
    }

    static topTooltipPath(width, height, offset, radius){
        const left = -width / 2;
        const right = width / 2;
        const top = -offset - height;
        const bottom = -offset;
        return `M 0,0 L ${-offset},${bottom} H ${left + radius} Q ${left},${bottom} ${left},${bottom - radius} V ${top + radius} Q ${left},${top} ${left + radius},${top} H ${right - radius} Q ${right},${top} ${right},${top + radius} V ${bottom - radius} Q ${right},${bottom} ${right - radius},${bottom} H ${offset} L 0,0 z`;
    }

    static leftTooltipPath(width, height, offset, radius){
        const left = -offset - width;
        const right = -offset;
        const top = -height / 2;
        const bottom = height / 2;
        return `M 0,0 L ${right},${-offset} V ${top + radius} Q ${right},${top} ${right - radius},${top} H ${left + radius} Q ${left},${top} ${left},${top + radius} V ${bottom - radius} Q ${left},${bottom} ${left + radius},${bottom} H ${right - radius} Q ${right},${bottom} ${right},${bottom - radius} V ${offset} L 0,0 z`;
    }

    static rightTooltipPath(width, height, offset, radius){
        const left = offset;
        const right = offset + width;
        const top = -height / 2;
        const bottom = height / 2;
        return `M 0,0 L ${left},${-offset} V ${top + radius} Q ${left},${top} ${left + radius},${top} H ${right - radius} Q ${right},${top} ${right},${top + radius} V ${bottom - radius} Q ${right},${bottom} ${right - radius},${bottom} H ${left + radius} Q ${left},${bottom} ${left},${bottom - radius} V ${offset} L 0,0 z`;
    }

    static bottomTooltipPath(width, height, offset, radius){
        const left = -width / 2;
        const right = width / 2;
        const bottom = offset + height;
        const top = offset;
        return `M 0,0 L ${-offset},${top} H ${left + radius} Q ${left},${top} ${left},${top + radius} V ${bottom - radius} Q ${left},${bottom} ${left + radius},${bottom} H ${right - radius} Q ${right},${bottom} ${right},${bottom - radius} V ${top + radius} Q ${right},${top} ${right - radius},${top} H ${offset} L 0,0 z`;
    }
}
