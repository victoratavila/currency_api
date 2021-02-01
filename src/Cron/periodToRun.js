// Run every minute when developing and midnight in production
if(process.env.PORT == 3000){
    var periodToRun = '0 0 * * *';
} else {
    var periodToRun = '* * * * *';
}

module.exports = periodToRun;