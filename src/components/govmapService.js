
export default class GovmapService {

    constructor() {

    }
    createMap() {
        window.govmap.createMap("map", {
            token: "5a4b8472-b95b-4687-8179-0ccb621c7990",
            layers: [],
            showXY: true,
            identifyOnClick: true,
            isEmbeddedToggle: false,
            center: { x: 217009, y: 755000 },// {x: 180996, y: 663402},
            layersMode: 1,
            level: 2,
            zoomButtons: false,
        });
    }
    getCityCoords() {
        window.govmap.geocode({ keyword: 'אבירים', type: window.govmap.geocodeType.AccuracyOnly }
        ).then(function (response) {
            console.log(response)
        });
    }
}