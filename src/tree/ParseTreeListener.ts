/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:47.6109431-07:00

import { ErrorNode } from "./ErrorNode.js"
import { ParserRuleContext } from "../ParserRuleContext.js"
import { TerminalNode } from "./TerminalNode.js"

/** This interface describes the minimal core of methods triggered
 *  by {@link ParseTreeWalker}. E.g.,
 *
 * ```
 * ParseTreeWalker walker = new ParseTreeWalker();
 * walker.walk(myParseTreeListener, myParseTree); <-- triggers events in your listener
 * ```
 *
 *  If you want to trigger events in multiple listeners during a single
 *  tree walk, you can use the ParseTreeDispatcher object available at
 *
 * 		https://github.com/antlr/antlr4/issues/841
 */
export interface ParseTreeListener {
	visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
	visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
	enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
	exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}
