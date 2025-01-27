/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:47.9232756-07:00

import { RuleContext } from "../RuleContext.js"
import { ParseTree } from "./ParseTree.js"
import { ParseTreeVisitor } from "./ParseTreeVisitor.js"
import { Parser } from "../Parser.js"
import { Interval } from "../misc/Interval.js"

export abstract class RuleNode implements ParseTree {
	public abstract readonly ruleContext: RuleContext;

	//@Override
	public abstract readonly parent: RuleNode | undefined;

	public abstract setParent(parent: RuleContext): void;

	public abstract getChild(i: number): ParseTree;

	public abstract accept<T>(visitor: ParseTreeVisitor<T>): T;

	public abstract readonly text: string;

	public abstract toStringTree(parser?: Parser | undefined): string;

	public abstract readonly sourceInterval: Interval;

	public abstract readonly payload: any;

	public abstract readonly childCount: number;
}
