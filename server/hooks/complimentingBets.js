const compliment = (value)=>{
    const homeWin = ["1","x","2","1x","12","x2"]
    const goals = [  
        "Over 0.5",
        "Under 0.5",
        "Over 1.5",
        "Under 1.5",
        "Over 2.5",
        "Under 2.5",
        "Over 3.5",
        "Under 3.5",
        "Over 4.5",
        "Under 4.5",
        "Over 5.5",
        "Under 5.5",
        "Over 6.5",
        "Over 7.5",
    ]
    if(homeWin.includes(value) ){
        const fullSet = ["1","x","2"]
        return fullSet.filter(outcome => !value.includes(outcome)).join('')
    }
    else if(goals.includes(value)){
        return value.replace('Over', 'temp').replace('Under', 'Over').replace('temp', 'Under').trim()
    }
 }

export{compliment}
 