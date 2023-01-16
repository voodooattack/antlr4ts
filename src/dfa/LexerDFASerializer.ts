/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:39.2167238-07:00

import { DFA } from "./DFA.js"
import { DFASerializer } from "./DFASerializer.js"
import { NotNull, Override } from "../Decorators.js"
import { VocabularyImpl } from "../VocabularyImpl.js"

export class LexerDFASerializer extends DFASerializer {
	constructor( @NotNull dfa: DFA) {
		super(dfa, VocabularyImpl.EMPTY_VOCABULARY);
	}

	@Override
	@NotNull
	protected getEdgeLabel(i: number): string {
		return "'" + String.fromCodePoint(i) + "'";
	}
}
