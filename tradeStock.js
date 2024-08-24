/** @param {NS} ns */
/*
purchase stock when +++ forecast.
grow server beyond stock.
track price trend and sell when :
 1. gain is over 100K ( costs of selling)
 2. last quote of the stock is smaller than previous one
 );
*/
var purchaseShareQty = 10000; // 10000 stocks per purchase order
var maxShareAvailMoney = 0.1; // 10% of available money used to purchase stocks
var shareAvailableMoney = 0;
var aging = 0;
var starterCash = 0; // track performance
const DECR_CYCLES = 5;  // max cycles of decrease before selling 
const MAX_AGING = 100;  // min cycles before taking benefit

function formatForecast(ns, forecast) {
	var fmtForecast = ns.nFormat(forecast, "##0.00 %");
	if (forecast < 0.20) {
		fmtForecast = fmtForecast + " ---";
	} else if (forecast < 0.40) {
		fmtForecast = fmtForecast + "  --";
	} else if (forecast < 0.48) {
		fmtForecast = fmtForecast + "   -";
	} else if (forecast < 0.52) {
		fmtForecast = fmtForecast + "  = ";
	} else if (forecast < 0.60) {
		fmtForecast = fmtForecast + "   +";
	} else if (forecast < 0.80) {
		fmtForecast = fmtForecast + "  ++";
	} else {
		fmtForecast = fmtForecast + " +++";
	}
	return fmtForecast;
}
function getUsableMoney(ns) {
	var availableMoney = ns.getPlayer().money;
	return Math.min(availableMoney, shareAvailableMoney);
}
function calcProfit(ns, sym, shares, price) {
	var stockPrice = ns.stock.getPrice(sym)
	var sellingPrice = stockPrice * shares - 100000;
	var purchaseCost = 100000 + price * shares;
	var profit = sellingPrice - purchaseCost;
	//ns.print("\t\t\t\t profit: " + ns.nFormat(benefit, "($ 0.000 a)"));
	return profit;
}
function buyShares(ns, sym, shares, price) {
	var stockPrice = ns.stock.getPrice(sym)
	var purchaseCost = 100000 + stockPrice * shares;
	var money = getUsableMoney(ns);
	if (money > purchaseCost) {
		//ns.print("\t\t\t\t purchase " + shares + " of " + sym + "=" + ns.nFormat(purchaseCost, "($ 0.000 a)"));
		purchaseCost = ns.stock.buyStock(sym, shares);
		shareAvailableMoney = shareAvailableMoney - (purchaseCost * shares);
		ns.print("\t\t\t\t ***Cash: " + ns.nFormat(shareAvailableMoney, "($ 0.000 a)"));
		return shares;
	}
	return 0;
}
function sellShares(ns, sym, shares, price) {
	var sellingPrice = 0;
	var benefit = calcProfit(ns, sym, shares, price);
	if (benefit > 0) {
		ns.print("\t\t\t\t Sell " + shares + " of " + sym + " gain: " + ns.nFormat(benefit, "($ 0.000 a)"));
		sellingPrice = ns.stock.sellStock(sym, shares);
		// adjust available amount 
		shareAvailableMoney = shareAvailableMoney + (sellingPrice * shares);
	} else if ((benefit / (shares * price)) < -0.01) {
		ns.print("\t\t\t\t Sell " + shares + " of " + sym + " loss: " + ns.nFormat(benefit, "($ 0.000 a)"));
		sellingPrice = ns.stock.sellStock(sym, shares);
		// adjust available amount
		shareAvailableMoney = shareAvailableMoney + (sellingPrice * shares);
	} else {
		return 0;
	}
	ns.print("\t\t\t\t ***Cash: " + ns.nFormat(shareAvailableMoney, "($ 0.000 a)"));
	ns.print("\t\t\t\t ***profit: " + ns.nFormat(shareAvailableMoney - starterCash, "($ 0.000 a)"));
	return shares;
}
export async function main(ns) {
	const args = ns.flags([["help", false]]);

	if (args.help) {
		ns.tprint("This script searches stock to buy by looking at forecast.");
		ns.tprint("purchase stock when +++ forecast.");
		ns.tprint("grow server beyond stock.");
		ns.tprint("track price trend and sell when :");
		ns.tprint("1. gain is over 100K ( costs of selling)");
		ns.tprint("2. last quote of the stock is smaller than previous one");

		ns.tprint("USAGE: run ${ns.getScriptName()} [stockQty [moneyRatio]] ");
		ns.tprint(".   default is 10000 for number of stocks per purchase round");
		ns.tprint(".   default is 0.1 for use max of 10% from available money)");
		ns.tprint("Examples: ");
		ns.tprint("> run ${ns.getScriptName()} 1000 ");
		ns.tprint("> run ${ns.getScriptName()} 100000 0.7");
		return (1);
	}
	switch (ns.args.length) {
		case 2: purchaseQty = ns.args[1];
		case 1: maxShareAvailMoney = ns.args[0];
	}
	//maximum amount allocated to stock defined at launch
	shareAvailableMoney = ns.getPlayer().money * maxShareAvailMoney;
	starterCash = shareAvailableMoney;
	ns.print("\t\t\t\t ***Cash: " + ns.nFormat(shareAvailableMoney, "($ 0.000 a)"));

	//all stocks symbol
	const syms = ns.stock.getSymbols(); //[0];
	//ns.print("stock symbols: " + syms);
	var shares = 0;
	var stockPurchasedPrice = 0;
	var portfolioEntry = ["symbol", shares, stockPurchasedPrice, aging, aging];
	var portfolio = [];
	const iterator = syms.entries();
	//initialize portfolio
	for (const quote of iterator) {
		portfolioEntry = [quote[1], 0, ns.stock.getPrice(quote[1]), 0, 0];
		portfolio.push(portfolioEntry);
	}
	ns.print("----- Portfolio -------");
	ns.print("Stock \t| prev price \t| new Price \t| forecast \t| volatility")
	ns.print("-------------------")
	var ownedShareQty;
	var age;
	var decreasingCycles;
	var price;
	var purchasedPrice;
	var forecast; // probality of increasing price 0..1
	var volatility; // maximum percentage by which a stock’s price can change every tick 0..1
	var fmtPrice = ".";
	var fmtForecast = ".";
	var fmtVolatility = ".";
	var variation = 0;
	var variationFlag = "-";
	var iterator2 = portfolio.entries();
	while (true) {
		iterator2 = portfolio.entries();
		for (var key of iterator2) {
			/*
			key 1 0 : symbol
			key 1 1 : owned qty
			key 1 2 : purchased price
			key 1 3 : aging of owned qty
			*/
			ownedShareQty = key[1][1]; // read qty owned, sell all
			purchasedPrice = key[1][2]; // purchased price
			age = key[1][3]; // 0 if qty=0; othewise age of the purchase in number of iteration
			decreasingCycles = key[1][4]; // decreasing cycle;
			if (ns.stock.has4SData()) {
				price = ns.stock.getPrice(key[1][0]);// requires TIX API 
			}
			if (ns.stock.has4SDataTIXAPI()) {
				forecast = ns.stock.getForecast(key[1][0]);// requires Market data TIX API 
				volatility = ns.stock.getVolatility(key[1][0]);// requires Market data TIX API 
			}
			variation = price - purchasedPrice;
			if (variation < 0) {
				/*
				stock quote is now at a lesser price than the purchased one
				*/
				variationFlag = "<";
				if ((ownedShareQty > 0) && (decreasingCycles > DECR_CYCLES)) {
					var soldQty = sellShares(ns, key[1][0], ownedShareQty, purchasedPrice);
					if (soldQty > 0) {
						key[1][1] = key[1][1] - soldQty; //reset owned quantity	
						key[1][4] = 0; //reset decreasing cycles
					} else {
						key[1][4] = decreasingCycles + 1;
					}
				}
			} else
				if (variation > 0) {
					/*
					stock quote is now at a higher price than the purchased one
					*/
					key[1][4] = 0; //reset decreasing cycles
					variationFlag = ">";
					if ((ownedShareQty > 0) && (age > MAX_AGING)) {
						// analyze profit to decide to sell or not
						var profit = calcProfit(ns, key[1][0], ownedShareQty, purchasedPrice);
						if ((profit / (shares * purchasedPrice)) > 0.2) {
							var soldQty = sellShares(ns, key[1][0], ownedShareQty, purchasedPrice);
							key[1][1] = key[1][1] - soldQty; //reset owned quantity					}
						}
					} else
						if ((forecast >= 0.6) && ((price / purchasedPrice) > 1.01)) {
							// invest if 60% probability of gain and 
							var purchased = buyShares(ns, key[1][0], purchaseShareQty, purchasedPrice);
							if (purchased > 0) {
								key[1][1] = key[1][1] + purchased; // update owned qty
								price = Math.max(key[1][2], purchasedPrice); // update purch price
								key[1][2] = price;
								key[1][3] = key[1][3] + 1; // increase age 

							}
						}
				} else
					variationFlag = "=";
			if (key[1][1] > 0) {
				fmtPrice = ns.nFormat(price, "($ 0.000 a)");
				fmtForecast = ns.nFormat(forecast, "($ 0.000 a)");
				fmtVolatility = ns.nFormat(volatility, "##0.00 %");
				ns.print(key[1][0]
					+ " \t| " + ns.nFormat(key[1][2], "($ 0.000 a)")
					+ " \t|" + fmtPrice
					+ " \t|" + fmtForecast
					+ " \t|" + fmtVolatility
					+ " \t|" + variationFlag
					+ " \t|" + key[1][1] + " shares"
				);
			} else {
				key[1][2] = price;
			}

		}
		await ns.sleep(1000);
	}
	/*
	// requires getOrders: You must either be in BitNode-8 or have Source-File 8 Level 3. 
	var stockOrder = ns.stock.getOrders(); 
	/*
	"If you do not have orders in Nova Medical (NVMD), then the returned object will not have a “NVMD” property."
	{
	 ECP: [
		 {
			 shares: 5,
			 price: 100,000
			 type: "Stop Buy Order",
			 position: "S",
		 },
		 {
			 shares: 25,
			 price: 125,000
			 type: "Limit Sell Order",
			 position: "L",
		 },
	 ],
	 SYSC: [
		 {
			 shares: 100,
			 price: 10,000
			 type: "Limit Buy Order",
			 position: "L",
		 },
	 ],
	}
	*/
}