require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/widgets/LayerList", "esri/widgets/Search", "esri/tasks/Locator", "esri/layers/MapImageLayer", "dojo/domReady!"], function (Map, MapView, FeatureLayer, Legend, LayerList, Search, Locator, MapImageLayer) {
    //my code starts here

    var mapConfig = {
        basemap: "dark-gray"
    };

    var myMap = new Map(mapConfig);

    var mapView = new MapView({
        map: myMap,
        container: "viewDiv",
        center: [-118.2438934, 34.058481],
        zoom: 12
    });

    var imagelayer = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer"
    });
    myMap.add(imagelayer);
    alert(imagelayer);

    var fwySym = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: "#FFAA00",
        width: 10,
        style: "solid"
    };
    // Symbol for U.S. Highways
    var hwySym = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: "#DF73FF",
        width: 7,
        style: "solid"
    };
    // Symbol for other major highways
    var otherSym = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: "#EBEBEB",
        width: 3,
        style: "short-dot"
    };
    var hwyRenderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        defaultSymbol: otherSym,
        defaultLabel: "Other major roads",
        field: "CLASS",
        uniqueValueInfos: [{ value: "I", symbol: fwySym, label: 'Interstates' },
                           { value: "U", symbol: hwySym, label: 'US highways' }

        ]
    };

    hwyRenderer.legendOptions = { title: 'asdfadsf' };
    var myFeatureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Freeway_System/FeatureServer/2",
        renderer: hwyRenderer
    });
    myMap.add(myFeatureLayer);

    var legend = new Legend({
        view: mapView,
        layerInfos: [{ layer: myFeatureLayer, title: 'My Highway Layer' }]
    });
    mapView.ui.add(legend, "bottom-left");

    var layerList = new LayerList({
        view: mapView
    });
    // Adds widget below other elements in the top left corner of the view
    mapView.ui.add(layerList, {
        position: "top-left"
    });
    var searchWidget = new Search({
        view: mapView,
        sources:[
{
    locator: new Locator({ url: "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
    singleLineFieldName: "SingleLine",
    name: "Custom Geocoding Service",
    localSearchOptions: {
        minScale: 300000,
        distance: 50000
    },
    placeholder: "Search Geocoder",
    maxResults: 3,
    maxSuggestions: 6,
    suggestionsEnabled: false,
    minSuggestCharacters: 0
}, {
    featureLayer: myFeatureLayer,
    searchFields: ["ROUTE_NUM"],
    displayField: "ROUTE_NUM",
    exactMatch: false,
    outFields: ["*"],
    name: "my custom search",
    placeholder: "example: C18",
    maxResults: 6,
    maxSuggestions: 6,
    suggestionsEnabled: true,
    minSuggestCharacters: 0
}],
    });
    // Adds the search widget below other elements in
    // the top left corner of the view
    mapView.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });
    //my code ends here
});