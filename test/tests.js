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


QUnit.test("elvish_this_word test", function(assert) {
  var mangled = remove_diacritics(elvish_this_word("howdy"));
  assert.strictEqual(mangled.substring(0, mangled.length - 1), "owdyh");
  assert.ok(is_a_vowel(mangled[mangled.length - 1]));
  assert.ok(!is_caps(mangled[mangled.length - 1]));

  mangled = remove_diacritics(elvish_this_word("Howdy"));
  assert.strictEqual(mangled.substring(0, mangled.length - 1), "Owdyh");
  assert.ok(is_a_vowel(mangled[mangled.length - 1]));
  assert.ok(!is_caps(mangled[mangled.length - 1]));

  mangled = remove_diacritics(elvish_this_word("hOwdy"));
  assert.strictEqual(mangled.substring(0, mangled.length - 1), "oWdyh");
  assert.ok(is_a_vowel(mangled[mangled.length - 1]));
  assert.ok(!is_caps(mangled[mangled.length - 1]));

  mangled = remove_diacritics(elvish_this_word("howdY"));
  assert.strictEqual(mangled.substring(0, mangled.length - 1), "owdyH");
  assert.ok(is_a_vowel(mangled[mangled.length - 1]));
  assert.ok(is_caps(mangled[mangled.length - 1]));

  mangled = remove_diacritics(elvish_this_word("HOWDY"));
  assert.strictEqual(mangled.substring(0, mangled.length - 1), "OWDYH");
  assert.ok(is_a_vowel(mangled[mangled.length - 1]));
  assert.ok(is_caps(mangled[mangled.length - 1]));

  mangled = remove_diacritics(elvish_this_word("how"));
  assert.strictEqual(mangled, "owhen");

  mangled = remove_diacritics(elvish_this_word("How"));
  assert.strictEqual(mangled, "Owhen");

  mangled = remove_diacritics(elvish_this_word("hOw"));
  assert.strictEqual(mangled, "oWhen");

  mangled = remove_diacritics(elvish_this_word("hoW"));
  assert.strictEqual(mangled, "owHEN");

  mangled = remove_diacritics(elvish_this_word("HOW"));
  assert.strictEqual(mangled, "OWHEN");
});
