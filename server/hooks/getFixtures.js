import { fixtureModel } from "../models/fixturesModel.js"



export const getFixtures =async() => {
    try {
        
        await fixtureModel.deleteMany({})
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
        
        const responses = await Promise.all(datesCopy.map((date) => fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&status=NS`,options)))
        console.log(responses)
        const data = await Promise.all(responses.map((res)=>res.json()))
        data.forEach(async(datum)=>{
            const dataDoc = new fixtureModel({
                date:dates.shift(),
                data:datum
            })
            await dataDoc.save();
        })
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
    
}