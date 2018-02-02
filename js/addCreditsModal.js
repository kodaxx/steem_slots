$(document).ready(function () {
    
    //set to new api
    
    steem.api.setOptions({ url: 'https://api.steemit.com' });
    
    //below is all good
    
    function randHash() {
        var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        var length = 7;
    
	    for (var i = 0; i < length; i++) {
		   text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return text;
    }
    
    $('#1_cred').click(function() {
        var credits = parseInt($('#credits_to_add').text());
        $('#credits_to_add').text(credits + 1);
    });
    
    $('#10_creds').click(function() {
        var credits = parseInt($('#credits_to_add').text());
        $('#credits_to_add').text(credits + 10);
    });
    
    $('#100_creds').click(function() {
        var credits = parseInt($('#credits_to_add').text());
        $('#credits_to_add').text(credits + 100);
    });
    
    $('#steemconnect').click(function() {
        isActive = true;
        var account = "kodaxx",
            price = parseInt($('#credits_to_add').text()) / 100,
            memo = randHash();
        
        var location = "https://v2.steemconnect.com/sign/transfer?&to=" + account + "&amount=" + price + "%20STEEM&memo=" + memo;
            
        window.open(location, '_blank');
        
        console.log("-----------------------------------");
        console.log("To Account: " + account);
        console.log("Amount: " + price);
        console.log("Memo: " + memo);
        console.log("-----------------------------------");
        
        pollServer(account, price, memo);
    });
});

function addCreditsModal() {
	var _iMoney;

	this.show = function () {
		//TEST BELOW add credits
		_iMoney = TOTAL_MONEY;
		$('#money').text(_iMoney.toFixed(2));
		$('#add_credits').show();

		//clear previous sale
        $('#credits_to_add').text("0");
	};

	this.hide = function () {
		TOTAL_MONEY = _iMoney;
		$('#add_credits').hide();
		console.log("hiding");
	};

	this.isVisible = function () {
		return false;
	};

	this.unload = function () {
		return true;
	};
}