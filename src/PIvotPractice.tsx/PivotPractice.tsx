

// import Plotly from "react-plotly.js";

// import {
//     PivotTableUI,
//     createPlotlyRenderers,
//     TableRenderers,
// } from "@imc-trading/react-pivottable";

// import "@imc-trading/react-pivottable/pivottable.css";

// import dataJSON from '../dataJSON.json'

// const PlotlyRenderers = createPlotlyRenderers(Plotly); // or createPlotlyRenderers(window.Plotly)

// const data = [


//     ["attribute", "attribute2"],
//     ["value1", "value2"],
// ];
// const data = [
//     {
//         id: 1,
//         firstName: "Jose",
//         lastName: "Perez",
//         age: 20
//     },
//     {
//         id: 2,
//         firstName: "Carlos",
//         lastName: "Perez",
//         age: 20
//     },
//     {
//         id: 3,
//         firstName: "Juan",
//         lastName: "Alberto",
//         age: 20
//     }
// ];

const data1 = [
    { territorycode: "BT", regioncode: "BT1", },
    { territorycode: "BT", regioncode: "BT2", },
    { territorycode: "BT", regioncode: "BT2", },
    { territorycode: "CLT1", regioncode: "CL1-1", },
    { territorycode: "CLT1", regioncode: "CL1-2", },
    { territorycode: "CVIT", regioncode: "CVR", },
    { territorycode: "MCT", regioncode: "MC3", },
    { territorycode: "MCT", regioncode: "MC4", },

]


const PivotPractice = () => {

    const occurence1 = {} as any;
    const tCode = data1.map(item => item.territorycode)

    tCode.forEach((value) => {

        if (occurence1[value]) {
            occurence1[value] += 1
        } else {
            occurence1[value] = 1;
        }

    });

    const result = data1.reduce((itemSoFar: any, { territorycode, regioncode }) => {
        if (!itemSoFar[territorycode]) itemSoFar[territorycode] = [];
        itemSoFar[territorycode].push(regioncode);
        return itemSoFar;
    }, {});

    console.log(result);
  
    return (
        <>
            {JSON.stringify(data1)}
            {JSON.stringify(occurence1)}
            <div style={{ fontWeight: 'bold', padding: '30px' }} >

                {/* <PivotTableUI
                data={dataJSON}
                onChange={(s) => setPivottableState(s)}
                renderers={{ ...TableRenderers, ...PlotlyRenderers }}
                {...pivottableState}

            /> */}
                <table>
                    <tbody>
                        {/* {data1.map((item : any, index) =>
                        <tr key={index}>
                      
                            <td>{item.firstName}</td> */}
                        {Object.keys(occurence1).map((keyName, i) => (
                            <tr key={i}>
                                <td className="input-label">{`${keyName}`}</td>
                                {/* {data1.map((item, i) => 
                              
                                )} */}
                            </tr>
                        ))}
                        {/* <td> {item.lastName}</td>
                        </tr>
                    )} */}

                        {/* {tCode.map((item: any, index) =>
                        <tr key={index}>
                            <td>{item}</td>
                        </tr>
                    )} */}
                    </tbody>

                </table>


            </div>
        </>


    )
}

export default PivotPractice