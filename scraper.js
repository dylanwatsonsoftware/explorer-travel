// This is a template for a Node.js scraper on morph.io (https://morph.io)

var sqlite3 = require("sqlite3").verbose();
var Kayak = require('./pages/kayak')

function initDatabase(callback) {
	// Set up sqlite database.
	var db = new sqlite3.Database("data.sqlite");
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS data (name TEXT, value TEXT)");
		callback(db);
	});
}

function updateRow(db, name, value) {
	// Insert some data.
	console.log(JSON.stringify(value))
	var statement = db.prepare("INSERT INTO data VALUES (?, ?)");
	statement.run(name, value);
	statement.finalize();
}

function readRows(db) {
	// Read some data.
	db.each("SELECT rowid AS id, name, value FROM data", function(err, row) {
		console.log(row.name + ":" + row.value);
	});
}

async function fetchPage(db) {
	updateRow(db, await Kayak.search("PER"));
	updateRow(db, await Kayak.search("KUL"));
	updateRow(db, await Kayak.search("SIN"));

	readRows(db);

	db.close();
}

async function run(db) {
	fetchPage(db);
}

initDatabase(run);
