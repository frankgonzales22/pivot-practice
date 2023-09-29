import  { useEffect, useState } from 'react'
import dataJSON from '../dataJSON.json'
const DynamicArray = () => {
    const [
        // first, 
        ,
        setfirst] = useState<string[]>([])
    const data = [
        { territorycode: "BT", regioncode: "BT1", },
        { territorycode: "BT", regioncode: "BT2", },
        { territorycode: "BT", regioncode: "BT2", },
        { territorycode: "CLT1", regioncode: "CL1-1", },
        { territorycode: "CLT1", regioncode: "CL1-2", },
        { territorycode: "CVIT", regioncode: "CVR", },
        { territorycode: "MCT", regioncode: "MC3", },
        { territorycode: "MCT", regioncode: "MC4", },

    ]

    const result = data.reduce((itemSoFar: any, { territorycode, regioncode }) => {
        if (!itemSoFar[territorycode]) itemSoFar[territorycode] = [];
        itemSoFar[territorycode].push(regioncode);
        return itemSoFar;
    }, {});

    // console.log(result);
    const groupByTerritoryCode = dataJSON.reduce((itemSoFar: any, item) => {
        if (!itemSoFar[item.territorycode]) itemSoFar[item.territorycode] = [];
        itemSoFar[item.territorycode].push(item);
        return itemSoFar;
    }, {});

    const groupByRegionCode = dataJSON.reduce((itemSoFar: any, item) => {
        if (!itemSoFar[item.regioncode]) itemSoFar[item.regioncode] = [];
        itemSoFar[item.regioncode].push(item);
        // console.log(itemSoFar)
        return itemSoFar;
    }, {});

    console.log(groupByTerritoryCode);
    useEffect(() => {
        setfirst(result)
    }, [])
    console.log(groupByRegionCode)





    return (
        <>
            {/* {JSON.stringify(groupByRegionCode)} */}
            <table style={{ border: '1px solid black' }}>
                <tbody style={{ border: '1px solid black' }}>

                    {Object.keys(groupByTerritoryCode).sort().map((keyName: any, i) => (
                        <tr key={i} >
                            <td style={{ color: 'red' }} >{`${keyName}`}</td>
                            <td>{groupByTerritoryCode[keyName].territorycode}</td>
                            
                            {groupByTerritoryCode[keyName].map((item: any, i: any) =>
                                <tr key={i}>
                                    <td >{item.regioncode}</td>
                                </tr>
                            )}
                        </tr>
                    ))}
                </tbody>
                <tbody >
                    {Object.keys(groupByRegionCode).sort().map((keyName: any, i) => (
                        <tr key={i} >
                            <td  style={{ border: '1px solid black', color : 'rgba(52, 45, 113)' }} >{`${keyName}`}</td>
                            <td>{groupByRegionCode[keyName].regioncode}</td>
                            {groupByRegionCode[keyName].map((item: any, i: any) =>
                                <tr key={i}>
                                    <td style={{ color : 'blue'}} >{item.regioncode}</td>
                                </tr>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table >


        </>
    )
}

export default DynamicArray