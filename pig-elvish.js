function is_caps(letter) {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter);
}


function all_caps(word) {
  for (var i = 0; i < word.length; i++) {
    var cur_char = word[i];
    if (is_a_letter(cur_char) && !is_caps(cur_char)) {
      return false;
    }
  }
  return true;
}


function last_cap(word) {
  return is_caps(word.charAt(word.length - 1));
}


function first_cap(word) {
  return is_caps(word.charAt(0));
}


function first_capped(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}


function move_first_letter_to_end(word) {
  if (!all_caps(word) && first_cap(word)) {
    return first_capped(word.substring(1) + word.charAt(0).toLowerCase());
  }
  return word.substring(1) + word.charAt(0);
}


function append_random_vowel(word) {
  var random_vowel = "aeiou".charAt(Math.floor(Math.random() * 5));
  if (last_cap(word)) {
    return word + random_vowel.toUpperCase();
  }
  return word + random_vowel;
}


function match_caps(somestring, skeleton) {
  var to_return = "";
  var min_lengths = Math.min(somestring.length, skeleton.length);
  var max_lengths = Math.max(somestring.length, skeleton.length);
  for (var i = 0; i < min_lengths; i++) {
    if (is_caps(skeleton[i])) {
      to_return += somestring[i].toUpperCase();
    }
    else {
      to_return += somestring[i].toLowerCase();
    }
  }

  return to_return + somestring.substr(min_lengths);
}


function mangle_this_word(word, style) {
  if (style == "pig-elvish") {
    return elvish_this_word(word);
  }

  return word;
}


/* Original algorithm: https://inherweb.wordpress.com/2005/09/30/pig-elvish/ */
function elvish_this_word(word) {
  if (word.length < 1) {
    return word;
  }

  var to_return = match_caps(move_first_letter_to_end(word), word);

  /* Add 'en' if short */
  if (to_return.length <= 3) {
    if (last_cap(to_return)) {
      to_return += "EN";
    }
    else {
      to_return += "en";
    }

    /* Special cases for A and I */
    if (word == "I") {
      to_return = "Ien";
    }
    if (word == "A") {
      to_return = "Aen";
    }
  }

  /* Append random vowel */
  else {
    to_return = append_random_vowel(to_return);
  }

  to_return = umlaut_last_e(to_return);

  to_return = random_acutes(to_return);

  to_return = ks_to_cs(to_return);

  return to_return;
}


function ks_to_cs(word) {
  var to_return = "";
  for (var i = 0; i < word.length; i++) {
    var cur_char = word.charAt(i);
    if (cur_char == "k") {
      to_return += "c";
    }
    else if (cur_char == "K") {
      to_return += "C";
    }
    else {
      to_return += cur_char;
    }
  }
  return to_return;
}


function is_a_vowel(letter) {
  return "aeiouAEIOU".includes(letter);
}


function random_acutes(word, probability) {
  if (probability == undefined) {
    probability = .3;
  }

  var to_return = "";

  for (var i = 0; i < word.length; i++) {
    var cur_char = word[i];
    if (is_a_vowel(cur_char)) {
      if (Math.random() < probability) {
        if (cur_char == "a") {
          cur_char = '\u00e1';
        }
        if (cur_char == "e") {
          cur_char = '\u00e9';
        }
        if (cur_char == "i") {
          cur_char = '\u00ed';
        }
        if (cur_char == "o") {
          cur_char = '\u00f3';
        }
        if (cur_char == "u") {
          cur_char = '\u00fa';
        }
        if (cur_char == "A") {
          cur_char = '\u00c1';
        }
        if (cur_char == "E") {
          cur_char = '\u00c9';
        }
        if (cur_char == "I") {
          cur_char = '\u00cd';
        }
        if (cur_char == "O") {
          cur_char = '\u00d3';
        }
        if (cur_char == "U") {
          cur_char = '\u00da';
        }
      }
    }
    to_return += cur_char;
  }
  return to_return;
}


function umlaut_last_e(word) {
  if (word.charAt(word.length - 1) == "e") {
    return word.substring(0, word.length - 1) + '\u00eb';
  }
  if (word.charAt(word.length - 1) == "E") {
    return word.substring(0, word.length - 1) + '\u00cb';
  }
  return word;
}


function is_a_letter(letter) {

  /* Testing to see if this is faster than regex */
  return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter);
}


function mangle_this_text(text, style) {
  var to_return = "";
  var cur_word = "";
  for (var i = 0; i < text.length; i++) {
    var cur_char = text[i];
    if (is_a_letter(cur_char)) {
      cur_word += cur_char;
    }
    else {
      to_return += mangle_this_word(cur_word, style) + cur_char;
      cur_word = "";
    }
  }
  to_return += mangle_this_word(cur_word, style);
  return to_return;
}


/* From https://stackoverflow.com/a/50537862 */
function elvish_all_text(domelt) {
  for (let node of domelt.childNodes) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        elvish_all_text(node);
      break;
      case Node.TEXT_NODE:
        if (node.textContent.length > 1) {
          node.textContent = mangle_this_text(node.textContent, "pig-elvish");
        }
      break;
      case Node.DOCUMENT_NODE:
        elvish_all_text(node);
    }
  }
}


/* https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * Separates accented characters into plain characters followed by combining diacritics,
 * then removes the latter */
function remove_diacritics(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function main() {
  elvish_all_text(document.body);
}


main();
