/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { Token } from "../../src/Token.js";
import { Vocabulary } from "../../src/Vocabulary.js";
import { VocabularyImpl } from "../../src/VocabularyImpl.js";

import { strict as assert } from 'assert';
import { suite, test as Test, skip as Ignore } from "@testdeck/mocha";

/**
 *
 * @author Sam Harwell
 */
@suite
export class TestVocabulary {

	@Test public testEmptyVocabulary(): void {
		assert.notStrictEqual(VocabularyImpl.EMPTY_VOCABULARY, undefined);
		assert.strictEqual("EOF", VocabularyImpl.EMPTY_VOCABULARY.getSymbolicName(Token.EOF));
		assert.strictEqual("0", VocabularyImpl.EMPTY_VOCABULARY.getDisplayName(Token.INVALID_TYPE));
	}

}
