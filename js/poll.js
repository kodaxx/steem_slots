var isActive = true;

function pollServer(account, amount, memo) {
    
    if (isActive) {
        console.log("checking for transaction...");
        window.setTimeout(function () {
            $.ajax({
                //change to kodaxx
                url: "https://api.steemjs.com/get_account_history?account=" + account + "&from=-1&limit=10000",
                type: "GET",
                success: function (result) {
                    //SUCCESS LOGIC
                    var log = result.reverse();
                    
                    log.forEach(function (element) {
                        if (element[1].op[0] === "transfer" &&
                            parseFloat(element[1].op[1].amount) === parseFloat(amount) &&
                            element[1].op[1].memo === memo) {
                            console.log("transaction found");
                            console.log(element);
                            isActive = false;
                            TOTAL_MONEY = TOTAL_MONEY + parseFloat(amount) * 100;
                            $("#money").text(TOTAL_MONEY);
                        }
                    });
                    
                    pollServer(account, amount, memo);
                },
                error: function () {
                    //ERROR HANDLING
                    console.log("error");
                    pollServer(account, amount, memo);
                }});
        }, 2500);
    } else {
        console.log("transaction not found...");
    }
}