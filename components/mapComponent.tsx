import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const MapComponent = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous SVG contents

        // Setup projection and draw here (similar to previous examples)
        // For debugging:
        console.log('SVG dimensions:', svg.node().getBoundingClientRect());
    }, [data]);

    return (
        <svg ref={svgRef} width="800" height="450" style={{ border: "1px solid black" }}></svg>
    );
};

export default MapComponent;
