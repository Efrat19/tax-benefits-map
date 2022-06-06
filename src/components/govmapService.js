
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
    async הוספת גאומטריות מאתר המארח למפה
    () {
        const response = await window.govmap.geocode({ keyword: 'אבירים', type: window.govmap.geocodeType.AccuracyOnly })
        console.log(response)
        const answers = response.data
        const rightAnswer = answers.find(x=> x.ObjectKey == 'SETL_CODE')
        return {
            city: rightAnswer.ResultLable,
            x: rightAnswer.X,
            y: rightAnswer.Y
        }
    }
}