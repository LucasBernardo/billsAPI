var moment = require('moment'); 

async function calculateDays(expireDay, paymentDay){
    let exp = moment(expireDay)
    let pay = moment(paymentDay)
    let dayDifference = pay.diff(exp, 'days')
    let daysTotal = 0

    dayDifference < 0 ? daysTotal = 0 : daysTotal = dayDifference
    return daysTotal
}

async function calculateValue(totalDays, val){
    let totalValue = 0 //value with taxes
    let daysDiff = Number(totalDays) //days difference
    let originalValue = Number(val) //original value

    if(daysDiff == 0){//if has no expired
        totalValue = 0

    }else if(daysDiff > 0 && daysDiff <= 3){//if has expired until 3 days
        totalValue = originalValue + (((originalValue * 2) / 100)  +  ((originalValue * (daysDiff * 0.1)) / 100))
    
    }else if(daysDiff > 3 && daysDiff <= 5){//if has expired more than 3 days
       totalValue = originalValue + (((originalValue * 3) / 100)  +  ((originalValue * (daysDiff * 0.2)) / 100))
    
    }else{//if has expired more than 5 days
        totalValue = originalValue + (((originalValue * 5) / 100)  +  ((originalValue * (daysDiff * 0.3)) / 100))
    }
    let totalValueFixed = totalValue.toFixed(2) //formatted value
    return totalValueFixed
}

module.exports = {
    calculateDays,
    calculateValue
}