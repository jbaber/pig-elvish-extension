QUnit.test("match_caps test", function(assert) {
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGh"),
      "ThIs gUy rocKs");
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGhIJKLMNOPQR"),
      "ThIs gUy ROCKS");
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGhIJKLMn"),
      "ThIs gUy ROCKs");
});


/* https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript */
QUnit.test("remove_diacritics test", function(assert) {
  assert.strictEqual(remove_diacritics("creme brulee"), "creme brulee");
  assert.strictEqual(remove_diacritics("crème brulée"), "creme brulee");
  assert.strictEqual(remove_diacritics("crame brulai"), "crame brulai");
  assert.strictEqual(remove_diacritics("crome brouillé"), "crome brouille");
});


