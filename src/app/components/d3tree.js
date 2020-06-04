import React, { Component } from 'react';
import * as d3 from 'd3';

let root;

export default class D3Tree extends Component {
  constructor(props) {
    super(props);
    this.treeRef = React.createRef();
    this.maked3Tree = this.maked3Tree.bind(this);
    this.removed3Tree = this.removed3Tree.bind(this);
    this.width = 500
  }

  componentDidMount() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree(root);
  }

  componentDidUpdate() {
    const { name, children } = this.props;
    const hierarchy = { name, children };
    root = JSON.parse(JSON.stringify(hierarchy));
    this.maked3Tree(root);
  }

  removed3Tree() {
    const { current } = this.treeRef;
    console.log(this.treeRef)
    // document.querySelectorAll('.tooltip').forEach(el => el.remove());
    while (current.hasChildNodes()) {
      current.removeChild(current.lastChild);
    }
  }

  tree(data) {
    const root = d3.hierarchy(data);
    root.dx = 10;
    root.dy = this.width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);
  };

  maked3Tree(data) {
    this.removed3Tree();
    const root = this.tree(data);

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }

    let x0 = 0;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3
      .select(this.treeRef.current)
      .append('svg')
      .attr('viewBox', [
        -margin.left,
        -margin.top,
        this.width + margin.left + margin.right,
        x1 - x0 + root.dx * 2 + margin.top + margin.bottom,
      ]);

    const g = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);




    node
      .append('circle')
      .attr('stroke', (d) => (d.children ? '#555' : '#999'))
      .attr('stroke-width', (d) => 1)
      .attr('fill', () => '#fff')
      .attr('r', 5)

      // tooltip MouseOver
      .on('mouseover', function (d) {
        d3.select(this)
          .transition(100)
          .duration(50)
          .attr('r', 8);

        tooltipDiv.transition()
          .duration(50)
          .style('opacity', 0.9);

        // tooltipDiv.html(JSON.stringify(d.data.stateSnapshot.children[0].state), this)
        tooltipDiv.html(`<p><br><strong>STATE</strong>:<br>${Object.entries(JSON.parse(d.data.stats.state)).map(([key, value]) => key + ': ' + value + '<br>')}
                         <br><strong>PROPS</strong>: ${JSON.stringify(d.data.stats.props)}<br></p>`, this)
        // .style('left', d3.select(this).attr("cy") + 'px')
        // .style('top', d3.select(this).attr("cx") + 'px')
        // .style('left', (d3.event.pageX - 90) + 'px')
        // .style('top', (d3.event.pageY - 65) + 'px')
      })
      // eslint-disable-next-line no-unused-vars
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', 5);

        tooltipDiv.transition()
          .duration(400)
          .style('opacity', 0);
      });

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d.children ? -6 : 6))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke', 'white');

    // define tooltip
    const tooltipDiv = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 1);
  }


  render() {
    return <div ref={this.treeRef}></div>;
  }
}