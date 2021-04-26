import skills from '../data/dist/db.json';

class ForceDirectedChart {
    constructor() {
        this.$container = $(".svg-container");
        this.$visualBtn = $("#visualBtn");
        this.chartInitialised = false;
    }

    setupNodesAndLinks() {
        var graph = {
            nodes: [],
            links: [
                { source: "CS50 Final Project - ML Flask App", target: "Introduction to Computer Science CS50" }
            ]
        }

        Object.keys(skills).forEach(item => {
            skills[item].forEach(skill => {
                graph.nodes.push({
                    name: skill.title,
                    group: skill.category,
                    listItems: skill.listItems,
                    imageUrl: skill.imageUrl,
                    paragraph: skill.paragraph,
                    linkedSkills: skill.linkedSkills
                });
            });
        });

        return graph;
    }

    addToggleImageListener(image) {
        $("#toggleImages").change(function () {
            if ($(this).is(':checked')) {
                image.transition()
                    .duration(300)
                    .style("opacity", .8);
            } else {
                image.transition()
                    .duration(300)
                    .style("opacity", 0);
            }
        });
    }

    createChart() {
        var graph = this.setupNodesAndLinks();

        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        function linkNodes(graph) {
            graph.nodes.forEach(node => {
                if (node.linkedSkills && node.linkedSkills.length > 0) {
                    node.linkedSkills.forEach(link => {
                        graph.links.push({ source: node.name, target: link });
                    });
                }
            });
        }

        linkNodes(graph);
        console.log(graph.links);
        console.log(graph.nodes);

        const svg = d3.select('#forceChart'),
            width = $(".main").width(),
            height = +svg.attr('height');

        svg
            .attr("width", width)
            .attr("height", height)

        const simulation = d3.forceSimulation()
            .nodes(graph.nodes)
            .force('link', d3.forceLink().id(d => d.name).distance(50))
            .force('charge', d3.forceManyBody())
            .force('collide', d3.forceCollide(function(d) {
                return 25;
            }))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on('tick', ticked);

        simulation.force('link')
            .links(graph.links);

        const radius = 10;

        let link = svg.selectAll('line')
            .data(graph.links)
            .enter().append('line');

        link
            .attr('class', 'link')
            .on('mouseover.tooltip', function (d) {
                tooltip.transition()
                    .duration(300)
                    .style("opacity", .8);
                tooltip.html("Source:" + d.source.index +
                    "<p/>Target:" + d.target.index +
                    "<p/>Strength:" + d.value)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
            .on("mouseout.tooltip", function () {
                tooltip.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
            .on('mouseout.fade', fade(1))
            .on("mousemove", function () {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            });
        ;

        function parseListItems(listItems, paragraph) {
            let html = "";
            if (paragraph !== undefined) {
                html = html.concat("<p>" + paragraph + "</p>");
            }

            if (listItems.length > 0) {
                html = html.concat("<ul>");
                listItems.forEach(item => {
                    html = html.concat("<li>" + item + "</li>");
                });
                html = html.concat("</ul>");
            }
            return html;
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        let node = svg.selectAll('.node')
            .data(graph.nodes)
            .enter().append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));;

        node.append('circle')
            .attr('r', radius)
            .attr("fill", function (d) {
                switch (d.group) {
                    case ("data"):
                        return '#a6cee3';
                    case ("projects"):
                        return '#1f78b4';
                    case ("qualifications"):
                        return '#b2df8a';
                    case ("web"):
                        return '#33a02c';
                    case ("devops"):
                        return '#fb9a99';
                }
            });

        var image = node.append("image")
            .style('opacity', 0)
            .attr("xlink:href", function (d) { return d.imageUrl; })
            .attr("x", function (d) { return -25; })
            .attr("y", function (d) { return -25; })
            .attr("height", 50)
            .attr("width", 50)

        this.addToggleImageListener(image);

        node.on('mouseover.tooltip', function (d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", .8);
            tooltip.html(
                "Name: <b>" + d.name + "</b><p/>Group: " + capitalizeFirstLetter(d.group.replace("web", "software")) +
                "<p/>" + parseListItems(d.listItems, d.paragraph)
            )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
            .on('mouseover.fade', fade(0.1))
            .on("mouseout.tooltip", function () {
                tooltip.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
            .on('mouseout.fade', fade(1))
            .on("mousemove", function () {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 10) + "px");
            })
            .on('dblclick', releasenode)


        // node.append('text')
        //     .attr('x', 0)
        //     .attr('dy', '.35em')
        //     .text(d => d.name);

        function ticked() {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            //d.fx = null;
            //d.fy = null;
        }
        function releasenode(d) {
            d.fx = null;
            d.fy = null;
        }

        const linkedByIndex = {};
        graph.links.forEach(d => {
            linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
        });

        function isConnected(a, b) {
            return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
        }

        function fade(opacity) {
            return d => {
                node.style('stroke-opacity', function (o) {
                    const thisOpacity = isConnected(d, o) ? 1 : opacity;
                    this.setAttribute('fill-opacity', thisOpacity);
                    return thisOpacity;
                });

                link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));

            };
        }
        var sequentialScale = d3.scaleOrdinal(d3.schemeSet3)
            .domain(["Data", "Projects", "Qualifications", "Software", "Devops"])
            .range(["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"]);


        svg.append("g")
            .attr("class", "legendSequential")
            .attr("transform", "translate(" + (width - 140) + "," + (height - 300) + ")");

        var legendSequential = d3.legendColor()
            .shapeWidth(30)
            .cells(11)
            .orient("vertical")
            .title("Categories:")
            .titleWidth(100)
            .scale(sequentialScale)

        svg.select(".legendSequential")
            .call(legendSequential);
    }

    addShowChartListener() {
        let self = this;
        $(self.$visualBtn).click(function () {
            $(".row").hide();
            $(".graphArea").hide();
            $("#subtitle").text("Skills Visualisation");
            $("#toggleImagesCheckbox").css("display", "block");
            $(self.$container).fadeIn();

            if (!this.chartInitialised) {
                self.createChart();
                this.chartInitialised = true;
            }
        });
    }
}

export default ForceDirectedChart;