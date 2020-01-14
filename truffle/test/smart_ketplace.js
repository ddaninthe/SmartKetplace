var SmartKetplace = artifacts.require("./SmartKetplace.sol");

contract("SmartKeyplace", () => {
	it("should assert true", function(done) {
	SmartKetplace.deployed();
	assert.isTrue(true);
	done();
	});
	//TODO: TESTS HERE
	it("should add a house", async function() {
		
		var instance = await SmartKetplace.deployed();
		var _location = "Test Rue 91";
		//var _location3 = "OUI";
		var _roomCount = 4;
		var _area = 125;
		var _price = 100005;
		var _documents = [23142, 333, 42];
		await instance.addHouse(_location, _roomCount, _area, _price, _documents);
		//await instance.addHouse(_location, _roomCount, _area, _price, _documents);
		//await instance.addHouse(_location3, _roomCount, _area, _price, _documents);
		//var id = instance.houses.length;
		//var result = await instance.houses.call(id);
		var result = await instance.houses.call(0);
		console.log(result);
		
		assert.equal(_location, result.location);
		//assert.equal(_location3, result.location);
		assert.equal(_roomCount, result.roomCount);
		assert.equal(_area, result.area);
		assert.equal(_price, result.price);
		assert.equal(_documents, result.documents);
	});
});