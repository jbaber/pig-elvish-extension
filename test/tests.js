QUnit.test("match_caps test", function(assert) {
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGh"),
      "ThIs gUy rocKs");
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGhIJKLMNOPQR"),
      "ThIs gUy ROCKS");
  assert.strictEqual(match_caps("thiS guy rocKs", "AbCdefGhIJKLMn"),
      "ThIs gUy ROCKs");
});
