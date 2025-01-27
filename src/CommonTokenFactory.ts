/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:50.3010112-07:00

import { CharStream } from "./CharStream.js"
import { CommonToken } from "./CommonToken.js"
import { Interval } from "./misc/Interval.js"
import { Override } from "./Decorators.js"
import { TokenFactory } from "./TokenFactory.js"
import { TokenSource } from "./TokenSource.js"

/**
 * This default implementation of {@link TokenFactory} creates
 * {@link CommonToken} objects.
 */
export class CommonTokenFactory implements TokenFactory {
	/**
	 * Indicates whether {@link CommonToken#setText} should be called after
	 * constructing tokens to explicitly set the text. This is useful for cases
	 * where the input stream might not be able to provide arbitrary substrings
	 * of text from the input after the lexer creates a token (e.g. the
	 * implementation of {@link CharStream#getText} in
	 * {@link UnbufferedCharStream}
	 * {@link UnsupportedOperationException}). Explicitly setting the token text
	 * allows {@link Token#getText} to be called at any time regardless of the
	 * input stream implementation.
	 *
	 * The default value is `false` to avoid the performance and memory
	 * overhead of copying text for every token unless explicitly requested.
	 */
	protected copyText: boolean;

	/**
	 * Constructs a {@link CommonTokenFactory} with the specified value for
	 * {@link #copyText}.
	 *
	 * When `copyText` is `false`, the {@link #DEFAULT} instance
	 * should be used instead of constructing a new instance.
	 *
	 * @param copyText The value for {@link #copyText}.
	 */
	constructor(copyText: boolean = false) {
		this.copyText = copyText;
	}

	@Override
	public create(
		source: { source?: TokenSource, stream?: CharStream },
		type: number,
		text: string | undefined,
		channel: number,
		start: number,
		stop: number,
		line: number,
		charPositionInLine: number): CommonToken {

		let t: CommonToken = new CommonToken(type, text, source, channel, start, stop);
		t.line = line;
		t.charPositionInLine = charPositionInLine;
		if (text == null && this.copyText && source.stream != null) {
			t.text = source.stream.getText(Interval.of(start, stop));
		}

		return t;
	}

	@Override
	public createSimple(type: number, text: string): CommonToken {
		return new CommonToken(type, text);
	}
}

export namespace CommonTokenFactory {
	/**
	 * The default {@link CommonTokenFactory} instance.
	 *
	 * This token factory does not explicitly copy token text when constructing
	 * tokens.
	 */
	export const DEFAULT: TokenFactory = new CommonTokenFactory();
}
