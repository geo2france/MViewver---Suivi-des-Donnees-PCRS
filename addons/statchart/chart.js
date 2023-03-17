//  * Déclaration de variables :
    

    var bloc = [] // bloc => tableau qui va récupérer les nom des blocs, exemple: C -F- A
    

    var data = { // data => json comprenant 2 tableaux : 
        categories: [], //categories => tableau qui contiendra les blocs triés 
        data: [ // data => tableau d'json : chaque json est composé d'un nom et d'un tableau de donnée.
                {
                    name: "Prise de vue aérienne",
                    data: []
                },
                {
                    name: "Calcul de l'aérotriangulation",
                    data: []
                },
                {
                    name: "Production de l'orthophoto",
                    data: []
                },
            ]

        }
        

// * Flux WFS et traitement de la données
// Il est impossible de récupéré toutes les données et de ensuite trié les blocs par ordre alphabétique.
// Ainsi, il faut d'abord recupéréer les bloc puis les triés.
//Une fois les blocs récupéré et trié, récupéré les données pour chaque bloc.


    //Fetch interroge le flux WFS et récupere un JSON.
    fetch('https://www.geo2france.fr/geoserver/ign/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=avancement_pcrs&outputFormat=application/json')
        .then(response => response.json())

        .then(datafetch => { // datafetch => variable qui contient le fichier json recupéré

            datafetch.features.forEach(function (feature) {// Parcours le JSON grâce au foreach.( feature correspond au donnée actuelle)
                bloc.push(feature.properties.Bloc) // stocke chaque nom du bloc dans le tableau bloc.
            }),// aprés le ForEach le tableau Bloc contient la liste des blocs exemple ( C - F - A...)
                bloc.sort() // Trie le tableau Bloc par ordre alphabétique

            
            bloc.forEach(function (item) {// Parcours du tableau Bloc, item contiendra le nom du bloc actuel
                for (let i = 0; i < bloc.length; i++) { // Itération de la taille du tableau Bloc( Parcours chaque element du tableau bloc, comme un ForEach)
                    if (item == datafetch.features[i].properties.Bloc) { // Vérifie si le bloc actuel correspond à la donnée i du fichier json 
                        
                        // Si c'est le cas on push les données dans l'json data, sinon on ne fait rien

                        data.categories.push("Bloc "+ datafetch.features[i].properties.Bloc);
                        data.data[1].data.push(datafetch.features[i].properties.avance_aer);
                        data.data[0].data.push(datafetch.features[i].properties.avance_pva);
                        data.data[2].data.push(datafetch.features[i].properties.avance_ort); 
                        // premier data : nom du json qui contient tout les données
                        // deuxième data[x] tableau de json qui contient les données et le nom des ces données 
                        // troisième data: tableau de données
                        // 1-0-2 correspond au numéro de la case du tableau data.
                    } 
                }
            }
            )
        });

// *

// * génération du graphique
    setTimeout(() => { // minuteur qui permet de laisser le temps à la page de charger
        var chart = echarts.init(document.getElementById('chart')); // génération du graphique sur l'élément chart de la page html
        chart.setOption({ // option de echart
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicOut',


         
            grid: {
                top : '25%',
                left: '0%',
                right: '5%',
                bottom: '-10%',
                containLabel: true
                   // pour contenir les labels de l'axe et la légende
                },
               

            xAxis: {
                show: false
            },
            yAxis: {
                type: 'category',
                data: data.categories,
                inverse: true,
            },
            legend: {
                data: data.name,
                left: '10%',
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    return params.seriesName + ' : ' + params.value + ' %';
                }
            },
            series: data.data.map(function (serie) {
                return {
                    name: serie.name,
                    type: 'bar',
                    stack: 'Total',
                    data: serie.data,
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: function (params) {
                            return params.value == 0 ? '' : params.value + ' %';
                        }
                    }, emphasis: {
                        focus: 'series'
                    }
                }
            })
        });

    }, 2000); // temps du minuteur
//* 

