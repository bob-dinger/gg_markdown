let glyfs = {

    //const self={
        hide:()=>{
            self.element.style.display="none"
        },
        circle_grid:(rows, columns, radius, lefter, topper)=>{
            let nu_circles=rows*columns;
  
            let my_data=[];
            
            for(r=0; r<rows; r++){
              for(c=0; c<columns; c++){
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute("cx", c*(radius*2) + lefter);
                circle.setAttribute("cy", r*(radius*2) + topper);
                circle.setAttribute("fill",  "#FF007F");
                circle.setAttribute("r",  radius);
                circle.setAttribute("stroke",  "navy");
                self.element.appendChild(circle);
              }
            }
        },
        use:(svg, selector, x, y)=>{
            let pather = document.createElementNS("http://www.w3.org/2000/svg", "use");
            pather.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', selector); 
            pather.setAttribute("x", x);
            pather.setAttribute("y", y);
            svg.appendChild(pather);

        },
        svg_grid:(svg, selector, rows, columns, lefter, topper, hgap, vgap)=>{
            let nu_circles=rows*columns;
  
            let my_data=[];
            
            for(r=0; r<rows; r++){
              for(c=0; c<columns; c++){
                let pather = document.createElementNS("http://www.w3.org/2000/svg", "use");
                pather.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', selector); 
                pather.setAttribute("x", c*hgap);
                pather.setAttribute("y", r*vgap);
                //pather.setAttribute("id", "path3");
                svg.appendChild(pather);


                // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                // circle.setAttribute("cx", c*(radius*2) + lefter);
                // circle.setAttribute("cy", r*(radius*2) + topper);
                // circle.setAttribute("fill",  "#FF007F");
                // circle.setAttribute("r",  radius);
                // circle.setAttribute("stroke",  "navy");
                // self.element.appendChild(circle);
              }
            }
        },
        rando(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        rect:(svg, left, top, width, height, fill, stroke, opacity, label, idx, classer) => {


                const recter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                recter.setAttribute("id", label+ idx.toString());
                recter.setAttribute("class", classer);
                recter.setAttribute("x", left);
                recter.setAttribute("y", top);
                recter.setAttribute("width",  width);
                recter.setAttribute("height", height);
                recter.setAttribute("fill",  fill);
                recter.setAttribute("stroke",  stroke);
                recter.setAttribute("stroke-width",  .1);
                recter.setAttribute("opacity", opacity);
                svg.appendChild(recter);
          
        },
        circle:(svg, left, top, radius, fill, stroke, opacity, label, idx)=>{


            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute("id", label + idx.toString());
            circle.setAttribute("cx", left);
            circle.setAttribute("cy", top);
            circle.setAttribute("r",  radius);
            circle.setAttribute("fill",  fill);
            circle.setAttribute("stroke",  stroke);
            circle.setAttribute("stroke-width",  1);
            circle.setAttribute("opacity", opacity);
            svg.appendChild(circle);
      
    },
        type:(tl, selector, text)=>{

            tl.to(selector, .2, {opacity:1});
            tl.set(selector, { text:{value:"", delimiter:""}});  
            tl.to(selector, {duration:2,  ease: "linear",
            text:{value:text, delimiter:""}});

        },
        image:(svg, image_url, x, y) => {
            const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            image.setAttribute("x", x);
            image.setAttribute("y", y);
            image.setAttribute("width",  40);
            image.setAttribute("height", 40);
            image.setAttribute("href", image_url);
            svg.appendChild(image);



        },
        image_force:(svg, nodes, links, x, y, width, height) => {
            //needs to have d3

            //need to add defs


            var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-6000))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links))
            .on('tick', ticked);
        
        function update_image_force() {
            var u = d3.select('.links')
                .selectAll('line')
                .data(links)
                .join('line')
                .attr('x1', function(d) {
                    return d.source.x
                })
                .attr('y1', function(d) {
                    return d.source.y
                })
                .attr('x2', function(d) {
                    return d.target.x
                })
                .attr('y2', function(d) {
                    return d.target.y
                });

                u = d3.select('.nodes')
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('cx', function(d) {
                    return d.x
                })
                .attr('cy', function(d) {
                    return d.y
                })
                .attr('r', function(d) {
                    return d.radius
                })
            .attr('fill', function(d){
             return `url(#${d.name})`
            })
            .attr('stroke', '#FC0FC0')
            .attr('stroke-width', 2);
        }
        
            function ticked() {
                
                update_image_force()
            }

        },
        text_force:(svg, nodes, links, x, y) => {
            
            var simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(-5000))
                .force('center', d3.forceCenter(x, y))
                .force('link', d3.forceLink().links(links))
                .on('tick', ticked);
            
            function update_text_force() {
                var u = d3.select('.links')
                    .selectAll('line')
                    .data(links)
                    .join('line')
                    .attr('x1', function(d) {
                        return d.source.x
                    })
                    .attr('y1', function(d) {
                        return d.source.y
                    })
                    .attr('x2', function(d) {
                        return d.target.x
                    })
                    .attr('y2', function(d) {
                        return d.target.y
                    });

                u = d3.select('.nodes')
                    .selectAll('text')
                    .data(nodes)
                    .join('text')
                    .text(function(d) {
                        return d.name
                    })
                    .attr('x', function(d) {
                        return d.x
                    })
                    .attr('y', function(d) {
                        return d.y
                    })
                    .attr('dy', function(d) {
                        return 5
                    });
                }
        
                function ticked() {
                    
                    update_text_force()
                }


        },
        image_pattern(image_url){
        //     <defs>
        //     <pattern patternContentUnits="offsetBoundingBox" id="my_imager" height="100%" width = "100%" >
        //       <image xlink:href="http://i.imgur.com/7Nlcay7.jpg" height="100" width="100" preserveAspectRatio="none" />
        //     </pattern>
            
        //   </defs>


            // const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            // const pattern  = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
            // pattern.setAttribute("id", "attachedImage" + idx.toString());
            // pattern.setAttribute("height","100%" );
            // pattern.setAttribute("width","100%" );
            // pattern.setAttribute("patternContentUnits", "objectBoundingBox");
            // const img  = document.createElementNS("http://www.w3.org/2000/svg", "image");
            //     img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imageFile);
            // img.setAttribute("preserveAspectRatio", "none");
            // img.setAttribute("width","1");
            // img.setAttribute("height", "1");
            
            // pattern.appendChild(img);
            // defs.appendChild(pattern);
            // svg.prepend(defs);
        },
        async load_og(gliph){
           
         await $.get(`https://glowinggardensstorage.z21.web.core.windows.net/gliphs/${gliph}.txt`, function(data, status){
            console.log("from load glyfs");
            //console.log(data);
                //self.html += data;
                self.element.innerHTML += data;
                //mydata = data;
        
                //.replace(/ +\n/, "\n");
            });


        },
        async load(svg, gliph, opacity){
           
            await $.get(`https://glowinggardensstorage.blob.core.windows.net/glyfs/${gliph}.svg`, function(data, status){
                
            let stringer = data.toString();
            console.log(data);

            //let this_svg =svg;
            let this_svg = data.querySelector("svg");
            console.log(this_svg.children);

            let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
            //defs.setAttribute("id", gliph.split("/")[1]);

            let ger = document.createElementNS("http://www.w3.org/2000/svg", "g");
            ger.setAttribute("id", gliph.split("/")[1]);
            ger.setAttribute("opacity", opacity);
            
            const collection = this_svg.children;
            
            for (let i = 0; i < collection.length; i++) {

                if(collection[i].nodeName=="defs"){

                    // let this_node = collection[i].cloneNode(true);
                    // defs.appendChild(this_node);
                    for(let l =0; l<collection[i].children.length; l++){
                        if(collection[i].children[l].nodeName!="style"){
                            let this_node = collection[i].children[l].cloneNode(true);
                            defs.appendChild(this_node);
                        }
                        else{
                            console.log(collection[i].children[l].children);
                        }
             
                    }
                }


                // }
                else{
                    let this_node = collection[i].cloneNode(true);
                    ger.appendChild(this_node);
                }    
                // let this_node = collection[i].cloneNode(true);
                //     ger.appendChild(this_node);
            }
            svg.appendChild(defs);
            svg.appendChild(ger);
            //svg.innerHTML=ger;


            

                // if(collection[i].nodeType=="g"){

                //     let ger = document.createElementNS("http://www.w3.org/2000/svg", "g");
                //     ger.setAttribute("id", gliph.split("/")[1]);
                //     addGroup(collection[i], ger);

      
                //     // let childs = collection[i].children;
                //     // for(let l =0; l<childs.length; l++){
                //     //     ger.appendChild(childs[l]);
                //     // }
         
                // }
                // else 
                // {
                //     ger.appendChild(collection[i]);
                // }

                //ger.appendChild(collection[i]);
            //svg.innerHTML+=ger;

            // if(stringer.includes("<?xml>")){
            //     let start_index = stringer.indexOf("<?xml");
            //     let end_index = stringer.indexOf(">");
            //     let subber = stringer.substring(start_index, end_index+1);
            //     stringer = stringer.replace(subber, "");
            // }

            // if(stringer.includes("<svg")){
            //     let start_index = stringer.indexOf("<svg");
            //     let end_index = stringer.indexOf(">");
            //     let subber = stringer.substring(start_index, end_index+1);
            //     stringer = stringer.replace(subber, `<g id=\"${gliph}}\">`);
            //     stringer = stringer.replace(subber, "</g>");
            // }
            // console.log(stringer);
            // svg.innerHTML += stringer;

                // if(data.toString().includes("</defs>")){
                //     let defs = svg.querySelector("defs");

                //     //get substring


                // }
                // else{
                    
                //     svg_start_index = stringer.indexOf("<svg");



                //     svg.innerHTML += data;
                // }
            });
   
   
        },
        async load_all(svg, glyfs)
        {
            let my_promises = [];
            glyfs.forEach((g) => {
                my_promises.push(this.load2(svg, g))
            });
            await Promise.all(my_promises)
        },
        path_grid:(rows, columns, radius, lefter, topper)=>{
            let nu_circles=rows*columns;
  
            let my_data=[];
            
            for(r=0; r<rows; r++){
              for(c=0; c<columns; c++){
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute("cx", c*(radius*2) + lefter);
                circle.setAttribute("cy", r*(radius*2) + topper);
                circle.setAttribute("fill",  "#FF007F");
                circle.setAttribute("r",  radius);
                circle.setAttribute("stroke",  "navy");
                self.element.appendChild(circle);
              }
            }
        },
        create_path:(x, y)=>{

            let the_d = element.getAttribute("d");
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            circle.setAttribute("x", x);
            circle.setAttribute("y", y);
            circle.setAttribute("fill",  "#FF007F");
            self.element.appendChild(circle);

        },
        image_circle:(svg, x, y, r, imgURL, idx, id_label)=>{
            //defs?, pattern?

            glyfs.createDefs(svg, imgURL, idx);
            
            // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // circle.setAttribute("x", x);
            // circle.setAttribute("y", y);
            // circle.setAttribute("fill",  "#FF007F");
            // self.element.appendChild(circle);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            //svg.appendChild(circle);
            // Set the coordinates of that circle
            circle.setAttribute("id", id_label);
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', r);
            circle.setAttribute('stroke', 'navy');
            circle.setAttribute('stroke-width', 3);
            circle.setAttribute('fill',`url(#attachedImage${idx})`);
            svg.appendChild(circle);

        },
        circle_of_circles:(innerRadius, outerRadius, nu_circles, x, y)=>{

            let stepper = 360/nu_circles;
            for (i=0; i<360; i=i+stepper){
            
                // var centerX = i;
                // var centerY = Math.sqrt((radius*radius) - (centerX*centerX));
            
                // my_data.push({'cx':x + (outerRadius*Math.cos(degrees_to_radians(i))), 'cy':y-(outerRadius*Math.sin(degrees_to_radians(i)))});
                    
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute("cx", x + (outerRadius*Math.cos(self.degrees_to_radians(i))));
                    circle.setAttribute("cy",y-(outerRadius*Math.sin(self.degrees_to_radians(i))));
                    circle.setAttribute("fill",  "#FF007F");
                    circle.setAttribute("r",  innerRadius);
                    circle.setAttribute("stroke",  "navy");
                    svg.appendChild(circle);
                
                }//end loop
          
        },
        circle_points:(x, y, radius, nu_points)=>{
        let my_data=[];

        let stepper = 360/nu_points;
        
        for (let i=0; i<360; i=i+stepper){
                my_data.push({'x':x + (radius*Math.cos(glyfs.degrees_to_radians(i))), 'y':y-(radius*Math.sin(glyfs.degrees_to_radians(i)))});    
            }//end loop
        return my_data;
        },
        loader:(element)=>{
            if(element=="file"){
                //create node
                return "x";
            }
            else{
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            circle.setAttribute('cx',480);
            circle.setAttribute('cy', 200);
            circle.setAttribute('r', 25);
            circle.setAttribute('fill', 'green');
            circle.setAttribute('stroke', 'navy');
            circle.setAttribute('stroke-width', 2);
            self.element.appendChild(circle);
            }
        },
        arcCircle:(iRadius, oRadius, slices)=>{
        const width = 960,
            height = 400,
            margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select("svg")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("id", "donut_group")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Create dummy data
        //const data = {a: 9, b: 20, c:30, d:8, e:12}
        //const data = {a: 10, b: 10, c:10, d:10, e:10, f:10, g:10, h:10}
        //let alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

        // const data = {a: 10, b: 10, c:10, d:10, e:10, f:10, g:10, h:10,
        //             i:10,j:10,k:10,l:10, m:10,n:10,o:10,p:10};
        
        let myObj={};
        for(let l=0; l<slices; l++){
            myObj[alphabet[l]]=20;
        }

        // let my_data = d3.range(0, slices).map(()=>{
        //     return {item: 10}
        // });
        //Math.floor(360/slices)
        //console.log(my_data);

        // set the color scale
        const color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
        .value(d=>d[1])
        
        const data_ready = pie(Object.entries(myObj))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(iRadius)         // This is the size of the donut hole
            .outerRadius(oRadius)
        )
        .attr('fill', d => color(d.data[0]))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);



        },
        degrees_to_radians:(degrees)=>
        {
        var pi = Math.PI;
        return degrees * (pi/180);
        },
        createDefs:(svg, imageFile, idx)=>{
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const pattern  = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        pattern.setAttribute("id", "attachedImage" + idx.toString());
        pattern.setAttribute("height","100%" );
        pattern.setAttribute("width","100%" );
        pattern.setAttribute("patternContentUnits", "objectBoundingBox");
        const img  = document.createElementNS("http://www.w3.org/2000/svg", "image");
            img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imageFile);
        img.setAttribute("preserveAspectRatio", "none");
        img.setAttribute("width","1");
        img.setAttribute("height", "1");
        
        pattern.appendChild(img);
        defs.appendChild(pattern);
        svg.prepend(defs);
        
        },
        attr:(name, value)=>{
            if(value==null){
                self.element.getAttribute(name)
            }
            else{
                self.element.setAttribute(name, value)
            }
        }


    
    // }
    // return self;
}

//$('h1').hide();