/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:56.9812284-07:00
import { ANTLRErrorListener } from "./ANTLRErrorListener.js"
import { ATNConfigSet } from "./atn/ATNConfigSet.js"
import { BitSet } from "./misc/BitSet.js"
import { DFA } from "./dfa/DFA.js"
import { Parser } from "./Parser.js"
import { RecognitionException } from "./RecognitionException.js"
import { Recognizer } from "./Recognizer.js"
import { ProxyErrorListener } from "./ProxyErrorListener.js"
import { ParserErrorListener } from "./ParserErrorListener.js"
import { SimulatorState } from "./atn/SimulatorState.js"
import { Token } from "./Token.js"
import { Override } from "./Decorators.js"

/**
 * @author Sam Harwell
 */
export class ProxyParserErrorListener extends ProxyErrorListener<Token, ParserErrorListener>
	implements ParserErrorListener {

	constructor(delegates: ParserErrorListener[]) {
		super(delegates);
	}

	@Override
	public reportAmbiguity(
		recognizer: Parser,
		dfa: DFA,
		startIndex: number,
		stopIndex: number,
		exact: boolean,
		ambigAlts: BitSet | undefined,
		configs: ATNConfigSet): void {
		this.getDelegates()
			.forEach((listener) => {
				if (listener.reportAmbiguity) {
					listener.reportAmbiguity(
						recognizer,
						dfa,
						startIndex,
						stopIndex,
						exact,
						ambigAlts,
						configs);
				}

			});
	}

	@Override
	public reportAttemptingFullContext(
		recognizer: Parser,
		dfa: DFA,
		startIndex: number,
		stopIndex: number,
		conflictingAlts: BitSet | undefined,
		conflictState: SimulatorState): void {
		this.getDelegates()
			.forEach((listener) => {
				if (listener.reportAttemptingFullContext) {
					listener.reportAttemptingFullContext(
						recognizer,
						dfa,
						startIndex,
						stopIndex,
						conflictingAlts,
						conflictState);
				}
			});
	}

	@Override
	public reportContextSensitivity(
		recognizer: Parser,
		dfa: DFA,
		startIndex: number,
		stopIndex: number,
		prediction: number,
		acceptState: SimulatorState): void {
		this.getDelegates()
			.forEach((listener) => {
				if (listener.reportContextSensitivity) {
					listener.reportContextSensitivity(
						recognizer,
						dfa,
						startIndex,
						stopIndex,
						prediction,
						acceptState);
				}
			});
	}
}
