/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:50.5479602-07:00

import { ANTLRErrorListener } from "./ANTLRErrorListener.js"
import { RecognitionException } from "./RecognitionException.js"
import { Recognizer } from "./Recognizer.js"

/**
 *
 * @author Sam Harwell
 */
export class ConsoleErrorListener implements ANTLRErrorListener<any> {
	/**
	 * Provides a default instance of {@link ConsoleErrorListener}.
	 */
	public static readonly INSTANCE: ConsoleErrorListener = new ConsoleErrorListener();

	/**
	 * {@inheritDoc}
	 *
	 * This implementation prints messages to {@link System#err} containing the
	 * values of `line`, `charPositionInLine`, and `msg` using
	 * the following format.
	 *
	 * <pre>
	 * line *line*:*charPositionInLine* *msg*
	 * </pre>
	 */
	public syntaxError<T>(
		recognizer: Recognizer<T, any>,
		offendingSymbol: T,
		line: number,
		charPositionInLine: number,
		msg: string,
		e: RecognitionException | undefined): void {
		console.error(`line ${line}:${charPositionInLine} ${msg}`);
	}
}
