// This is a template for a Node.js scraper on morph.io (https://morph.io)

var cheerio = require("cheerio");
var request = require("request");
var sqlite3 = require("sqlite3").verbose();
var Kayak = require('./pages/kayak')

function initDatabase(callback) {
	// Set up sqlite database.
	var db = new sqlite3.Database("data.sqlite");
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS data (name TEXT)");
		callback(db);
	});
}

function updateRow(db, value) {
	// Insert some data.
	var statement = db.prepare("INSERT INTO data VALUES (?)");
	statement.run(value);
	statement.finalize();
}

function readRows(db) {
	// Read some data.
	db.each("SELECT rowid AS id, name FROM data", function(err, row) {
		console.log(row.id + ": " + row.name);
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
