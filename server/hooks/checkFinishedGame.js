export const fetchGameStatus = async(game) => {
    
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${game}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '41bfc89064msh7e538925a0b6bc0p1f5079jsn0a9a34b07429',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options)
    if(response.ok){
        const data = await response.json()
        return data
    }else{
        return null
    }
}
