var SmartKetplace = artifacts.require("./SmartKetplace.sol");

contract("SmartKeyplace", () => {
	it("should assert true", function(done) {
	SmartKetplace.deployed();
	assert.isTrue(true);
	done();
	});
	//TODO: TESTS HERE
	it("should add two houses", async function() {
		
		var instance = await SmartKetplace.deployed();
		var _location = "Test Rue 91";
		var _location2 = "OUI";
		var _roomCount = 4;
		var _area = 125;
		var _price = 100005;
		var _documents = [23142, 333, 42];
		await instance.addHouse(_location, _roomCount, _area, _price, _documents);
		await instance.addHouse(_location2, _roomCount, _area, _price, _documents);
		var results = await instance.getHouses();
		var length = results.length;
		
		assert.equal(2, length);
		
		var firstHouse = await instance.getHouse(0);
		
		assert.equal(_location, results[0].location);
		assert.equal(_roomCount, results[0].roomCount);
		assert.equal(_area, results[0].area);
		assert.equal(_price, results[0].price);
		assert.equal(23142, results[0].documents[0]);
		assert.equal(333, results[0].documents[1]);
		assert.equal(42, results[0].documents[2]);
		
		assert.equal(_location2, results[1].location);
		assert.equal(_roomCount, results[1].roomCount);
		assert.equal(_area, results[1].area);
		assert.equal(_price, results[1].price);
		assert.equal(23142, results[1].documents[0]);
		assert.equal(333, results[1].documents[1]);
		assert.equal(42, results[1].documents[2]);
		
		assert.equal(_location, firstHouse.location);
		assert.equal(_roomCount, firstHouse.roomCount);
		assert.equal(_area, firstHouse.area);
		assert.equal(_price, firstHouse.price);
		assert.equal(23142, firstHouse.documents[0]);
		assert.equal(333, firstHouse.documents[1]);
		assert.equal(42, firstHouse.documents[2]);
	});
});