function Node(name, group) {
        this.name = name;
        this.group = group;
    }

    function Link(source, target, weight) {
        this.source = source;
        this.target = target;
        this.weight = weight;
    }

    var finalData = []

    function drawSVG (param1) {
        var width = document.body.clientWidth * 0.9,
        height = width/3

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .gravity(.02)
            .distance(160)
            .charge(-100)
            .size([width, height]);


        json = param1[0];
        //d3.json("/static/demo-data.json", function(json) {
          force
               //alert(JSON.stringify(json))

              .nodes(json.nodes)
              .links(json.links)
              .start();

          var link = svg.selectAll(".link")
              .data(json.links)
            .enter().append("line")
              .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

          var node = svg.selectAll(".node")
              .data(json.nodes)
            .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

          node.append("circle")
              .attr("r","5");

          node.append("text")
              .attr("dx", 12)
              .attr("dy", ".35em")
              .text(function(d) { return d.name });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
        //});

    }

    function releaseTheKraken (drawSVG) {

        var jsonString = "";
        var hostGroup = 0;
        var numNodes = 0;
        var lastHostNode = 0;
        var nodeArrayList = [];
        var LinksArrayList = [];
        {% for report in reports %}
            {% for scanned_host in report.hosts %}

                 var hostObject = null;

                {% if scanned_host.os_fingerprinted %}
                    hostObject = new Node("{{ scanned_host.address }} - {{ scanned_host.os }}",hostGroup, "host");
                {% else %}
                    hostObject = new Node("{{ scanned_host.address }}",hostGroup, "host");
                {% endif %}

                lastHostNode = numNodes
                numNodes++;
                nodeArrayList.push(hostObject);
                {% for scanned_service in scanned_host.services %}
                    var serviceNode =  new Node("{{ scanned_service.port }}/{{ scanned_service.protocol}}\n{{ scanned_service.state }}\n{{ scanned_service.banner }}",hostGroup,"{{ scanned_service.state }}");
                    nodeArrayList.push(serviceNode);
                    var weight = 1
                    if ("{{ scanned_service.state }}" == "open") {
                        weight = 10
                    }
                    var link = new Link(numNodes, lastHostNode, weight)
                    numNodes++;
                    LinksArrayList.push(link);
                {% endfor %}
                hostGroup++;
            {% endfor %}
        {% endfor %}
        finalData.push({
            nodes: nodeArrayList,
            links: LinksArrayList
        });
        //alert(JSON.stringify(finalData));

        drawSVG (finalData);
        //alert(JSON.stringify(finalData));
    }

    releaseTheKraken (drawSVG);

