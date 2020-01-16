const SmartKetplace = artifacts.require("SmartKetplace");

contract("SmartKeyplace", (accounts) => {
	var address1 = accounts[0]
	var address2 = accounts[1]
	
	
	it("should assert true", function(done) {
	SmartKetplace.deployed();
	assert.isTrue(true);
	done();
	});
	//TODO: TESTS HERE
	it("should add two houses", async function() {
		
		var instance = await SmartKetplace.deployed();
		var _location = "25 Rue du Test";
		var _location2 = "911 Avenue Urgence";
		var _roomCount = 4;
		var _area = 125;
		var _price = 100005;
		var _documents = [23142, 333, 42];
		await instance.addHouse(_location, _roomCount, _area, _price, _documents, {from: address1});
		await instance.addHouse(_location2, _roomCount, _area, _price, _documents, {from: address2});
		var results = await instance.getHouses();
		var length = results.length;
		
		assert.equal(2, length);
		
		var firstHouse = await instance.getHouse(0);
		
		assert.equal(_location, results[0].location);
		assert.equal(_roomCount, results[0].roomCount);
		assert.equal(_area, results[0].area);
		assert.equal(_price, results[0].price);
		assert.equal(_documents[0], results[0].documents[0]);
		assert.equal(_documents[1], results[0].documents[1]);
		assert.equal(_documents[2], results[0].documents[2]);
		
		assert.equal(_location2, results[1].location);
		assert.equal(_roomCount, results[1].roomCount);
		assert.equal(_area, results[1].area);
		assert.equal(_price, results[1].price);
		assert.equal(_documents[0], results[1].documents[0]);
		assert.equal(_documents[1], results[1].documents[1]);
		assert.equal(_documents[2], results[1].documents[2]);
		
		assert.equal(_location, firstHouse.location);
		assert.equal(_roomCount, firstHouse.roomCount);
		assert.equal(_area, firstHouse.area);
		assert.equal(_price, firstHouse.price);
		assert.equal(_documents[0], firstHouse.documents[0]);
		assert.equal(_documents[1], firstHouse.documents[1]);
		assert.equal(_documents[2], firstHouse.documents[2]);
	});
	
	it("second user should buy the first house", async function(){
		
		var instance = await SmartKetplace.deployed();
		var results = await instance.getHouses();
		var owner = address1;
		var buyer = address2;
		
		var theHouse = await instance.getHouse(0)
		var housePrice = theHouse.price;
		
		var houseOwner = await instance.houseToOwner.call(0);
		assert.equal(houseOwner, owner, "The first user owns the house before the transfer");
		
		await instance.buyHouse(0, buyer, {from: buyer, value: housePrice});
		
		houseOwner = await instance.houseToOwner.call(0);
		assert.equal(houseOwner, buyer, "The buyer owns the house after the transfer");
		
		
		
	});
});