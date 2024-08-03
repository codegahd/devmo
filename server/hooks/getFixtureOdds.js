import { fixtureOddsModel } from "../models/fixtureOddsModel.js";

export const getFixtureOdd =async() => {
    try {
        
        await fixtureOddsModel.deleteMany({})
        const dates = []
        const today = new Date()
    for (let i=0;i<=2;i++){
        const date = new Date(today.getTime()+(i*24*60*60*1000))
        dates.push(date.toISOString().split('T')[0])
    }
    const datesCopy = [...dates]
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '41bfc89064msh7e538925a0b6bc0p1f5079jsn0a9a34b07429',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const responses = await Promise.all(datesCopy.map((date) => fetch(`https://api-football-v1.p.rapidapi.com/v3/odds?date=${date}&bookmaker=11`,options)))
    const data = await Promise.all(responses.map((res)=>res.json()))
    data.forEach(async(datum)=>{
        const dataDoc = new fixtureOddsModel({
            date:dates.shift(),
            data:datum
        })
        await dataDoc.save();
    })
    
} catch (error) {
    console.log(error)
    throw error
}
}