// A0 reprezinta radacina arborelui si fiecare nod poate avea maxim 2 copii 
//(L - stanga (introduce  "0") si  R - dreapta (introduce "1"))

//verificam daca textul contine un anumit caracter c

function exists(c,text)
{
  var i;
  for(i=0;i<text.length;i++)
  {
    if(text[i]==c)
      return i;
  }
  return -1;
}

function procesare()
{
  var val=document.getElementById("message").value;
  var i,k,f=0;
  var c=0;
  var caracter=[];
  var frecventa=[];
  for(i=0;i<val.length;i++)
  {
    k=exists(val[i],caracter);
    if(k==-1)
    {
      caracter[c]=val[i]; 
      c++;
      frecventa[f]=1; 
      f++;
    }
    else
    {
      frecventa[k]=frecventa[k]+1;
    }
  }
  
  var aux_frecventa,aux_caracter;
  var ok=0; 
  while(ok==0) 
  {
    ok=1;
    for(i=0;i<f;i++)
    {
      if(frecventa[i]<frecventa[i+1])
      {
        ok=0;
        aux_frecventa=frecventa[i];
        frecventa[i]=frecventa[i+1];
        frecventa[i+1]=aux_frecventa;
        aux_caracter=caracter[i];
        caracter[i]=caracter[i+1];
        caracter[i+1]=aux_caracter;
      }
      else if(frecventa[i]==frecventa[i+1])
      {
        if(caracter[i]>caracter[i+1])
        {
          ok=0;
          aux_frecventa=frecventa[i];
          frecventa[i]=frecventa[i+1];
          frecventa[i+1]=aux_frecventa;
          aux_caracter=caracter[i];
          caracter[i]=caracter[i+1];
          caracter[i+1]=aux_caracter;
        }
      }
    }
  }
  for (i=0;i<c;i++)
  {
    if(caracter[i]==" ")
    {
      document.getElementById("caractere").innerHTML +="' '"+" ";
    }
    else
    {
      document.getElementById("caractere").innerHTML +=caracter[i]+" ";
    }     
  }
  for (i=0;i<f;i++)
  {
    document.getElementById("frecvente").innerHTML +=frecventa[i]+"|";
  }
  var nods=[];
  var n=0;
  for(i=0;i<c;i++)
  {
    var nod=
    {
      "frequency":frecventa[i],
      "data": caracter[i],
      "left":null,
      "rigth":null
   }
    nods[n]=nod;
    n++;
  }
  nods.reverse();
  while(n>2)
  {
    i=0;
    while(i<n-1)
    {
     var nod3=
      {
        "frequency":nods[i].frequency+nods[i+1].frequency,
        "data": "level"+i,
        "left":nods[i],
        "rigth":nods[i+1]
      }

      for(j=i+1;j<n;j++)
      {
        nods[j-1]=nods[j];
      }
      n--;

      nods[i]=nod3;
      i++;
    }
}


}

//arborele binar: "IT IS BETTER LATER THAN NEVER"
var treeData =
  {
    "name": "A0 = 30",
    "children": [
      {
        "name": "Level 1: 18",
        "children": [
          { "name": "Level 2: 8",
              "children": [
                { "name": "Level 3: 4",
                    "children": [
                      { "name": "Level 4: 2",
                          "children": [
                            { "name": "Level 5: B" },
                            { "name": "Level 5: ." }
                          ]
                      },
                      { "name": "Level 4: N"}
                    ]
                },
                { "name": "Level 3: 4",
                    "children": [
                      { "name": "Level 4: I"},
                      { "name": "Level 4: A" }
                    ]
                }
              ]
          },
          { "name": "Level 2: 10",
              "children": [
                { "name": "Level 3: T"},
                { "name": "Level 3: E" }
              ]
          }
        ]
      },
      { "name": "Level 1: 12",
        "children": [
          { "name": "Level 2: 7",
              "children": [
                { "name": "Level 3: 4",
                    "children": [
                      { "name": "Level 4: 2",
                          "children": [
                            { "name": "Level 5: V" },
                            { "name": "Level 5: S" }
                          ]
                      },
                      { "name": "Level 4: 2",
                          "children": [
                            { "name": "Level 5: L" },
                            { "name": "Level 5: H" }
                          ]
                      }
                    ]
                },
                { "name": "Level 3: R" }
              ]
         },
          { "name": "Level 2: spatiu" }
        ]
	  }
    ]
  };

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

	
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
