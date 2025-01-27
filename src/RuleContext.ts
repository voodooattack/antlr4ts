/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:57.3490837-07:00

import { ATN } from "./atn/ATN.js"
import { Parser } from "./Parser.js"
import { Recognizer } from "./Recognizer.js"
import { RuleNode } from "./tree/RuleNode.js"
import { ParseTree } from "./tree/ParseTree.js"
import { Interval } from "./misc/Interval.js"
import { Override } from "./Decorators.js"
import { Trees } from "./tree/Trees.js"
import { ParseTreeVisitor } from "./tree/ParseTreeVisitor.js"
import { ParserRuleContext } from "./ParserRuleContext.js"

/** A rule context is a record of a single rule invocation.
 *
 *  We form a stack of these context objects using the parent
 *  pointer. A parent pointer of `undefined` indicates that the current
 *  context is the bottom of the stack. The ParserRuleContext subclass
 *  as a children list so that we can turn this data structure into a
 *  tree.
 *
 *  The root node always has a `undefined` pointer and invokingState of -1.
 *
 *  Upon entry to parsing, the first invoked rule function creates a
 *  context object (a subclass specialized for that rule such as
 *  SContext) and makes it the root of a parse tree, recorded by field
 *  Parser._ctx.
 *
 *  public final SContext s() throws RecognitionException {
 *      SContext _localctx = new SContext(_ctx, state); <-- create new node
 *      enterRule(_localctx, 0, RULE_s);                     <-- push it
 *      ...
 *      exitRule();                                          <-- pop back to _localctx
 *      return _localctx;
 *  }
 *
 *  A subsequent rule invocation of r from the start rule s pushes a
 *  new context object for r whose parent points at s and use invoking
 *  state is the state with r emanating as edge label.
 *
 *  The invokingState fields from a context object to the root
 *  together form a stack of rule indication states where the root
 *  (bottom of the stack) has a -1 sentinel value. If we invoke start
 *  symbol s then call r1, which calls r2, the  would look like
 *  this:
 *
 *     SContext[-1]   <- root node (bottom of the stack)
 *     R1Context[p]   <- p in rule s called r1
 *     R2Context[q]   <- q in rule r1 called r2
 *
 *  So the top of the stack, _ctx, represents a call to the current
 *  rule and it holds the return address from another rule that invoke
 *  to this rule. To invoke a rule, we must always have a current context.
 *
 *  The parent contexts are useful for computing lookahead sets and
 *  getting error information.
 *
 *  These objects are used during parsing and prediction.
 *  For the special case of parsers, we use the subclass
 *  ParserRuleContext.
 *
 *  @see ParserRuleContext
 */
export class RuleContext extends RuleNode {
	public _parent: RuleContext | undefined;
	public invokingState: number;

	constructor();
	constructor(parent: RuleContext | undefined, invokingState: number);
	constructor(parent?: RuleContext, invokingState?: number) {
		super();
		this._parent = parent;
		this.invokingState = invokingState != null ? invokingState : -1;
	}

	public static getChildContext(parent: RuleContext, invokingState: number): RuleContext {
		return new RuleContext(parent, invokingState);
	}

	public depth(): number {
		let n = 0;
		let p: RuleContext | undefined = this;
		while (p) {
			p = p._parent;
			n++;
		}
		return n;
	}

	/** A context is empty if there is no invoking state; meaning nobody called
	 *  current context.
	 */
	get isEmpty(): boolean {
		return this.invokingState === -1;
	}

	// satisfy the ParseTree / SyntaxTree interface

	@Override
	get sourceInterval(): Interval {
		return Interval.INVALID;
	}

	@Override
	get ruleContext(): RuleContext { return this; }

	@Override
	get parent(): RuleContext | undefined { return this._parent; }

	/** @since 4.7. {@see ParseTree#setParent} comment */
	@Override
	public setParent(parent: RuleContext): void {
		this._parent = parent;
	}

	@Override
	get payload(): RuleContext { return this; }

	/** Return the combined text of all child nodes. This method only considers
	 *  tokens which have been added to the parse tree.
	 *
	 *  Since tokens on hidden channels (e.g. whitespace or comments) are not
	 *  added to the parse trees, they will not appear in the output of this
	 *  method.
	 */
	@Override
	get text(): string {
		if (this.childCount === 0) {
			return "";
		}

		let builder = "";
		for (let i = 0; i < this.childCount; i++) {
			builder += this.getChild(i).text;
		}

		return builder.toString();
	}

	get ruleIndex(): number { return -1; }

	/** For rule associated with this parse tree internal node, return
	 *  the outer alternative number used to match the input. Default
	 *  implementation does not compute nor store this alt num. Create
	 *  a subclass of ParserRuleContext with backing field and set
	 *  option contextSuperClass.
	 *  to set it.
	 *
	 *  @since 4.5.3
	 */
	get altNumber(): number { return ATN.INVALID_ALT_NUMBER; }

	/** Set the outer alternative number for this context node. Default
	 *  implementation does nothing to avoid backing field overhead for
	 *  trees that don't need it.  Create
	 *  a subclass of ParserRuleContext with backing field and set
	 *  option contextSuperClass.
	 *
	 *  @since 4.5.3
	 */
	set altNumber(altNumber: number) {
		// intentionally ignored by the base implementation
	}

	@Override
	public getChild(i: number): ParseTree {
		throw new RangeError("i must be greater than or equal to 0 and less than childCount");
	}

	@Override
	get childCount(): number {
		return 0;
	}

	@Override
	public accept<T>(visitor: ParseTreeVisitor<T>): T {
		return visitor.visitChildren(this);
	}

	/** Print out a whole tree, not just a node, in LISP format
	 *  (root child1 .. childN). Print just a node if this is a leaf.
	 *  We have to know the recognizer so we can get rule names.
	 */
	public toStringTree(recog: Parser): string;

	/** Print out a whole tree, not just a node, in LISP format
	 *  (root child1 .. childN). Print just a node if this is a leaf.
	 */
	public toStringTree(ruleNames: string[] | undefined): string;

	public toStringTree(): string;

	@Override
	public toStringTree(recog?: Parser | string[]): string {
		return Trees.toStringTree(this, recog);
	}

	public toString(): string;
	public toString(recog: Recognizer<any, any> | undefined): string;
	public toString(ruleNames: string[] | undefined): string;

	// // recog undefined unless ParserRuleContext, in which case we use subclass toString(...)
	public toString(recog: Recognizer<any, any> | undefined, stop: RuleContext | undefined): string;

	public toString(ruleNames: string[] | undefined, stop: RuleContext | undefined): string;

	public toString(
		arg1?: Recognizer<any, any> | string[],
		stop?: RuleContext)
		: string {
		const ruleNames = (arg1 instanceof Recognizer) ? arg1.ruleNames : arg1;
		stop = stop || ParserRuleContext.emptyContext();

		let buf = "";
		let p: RuleContext | undefined = this;
		buf += ("[");
		while (p && p !== stop) {
			if (!ruleNames) {
				if (!p.isEmpty) {
					buf += (p.invokingState);
				}
			} else {
				let ruleIndex: number = p.ruleIndex;
				let ruleName: string = (ruleIndex >= 0 && ruleIndex < ruleNames.length)
					? ruleNames[ruleIndex] : ruleIndex.toString();
				buf += (ruleName);
			}

			if (p._parent && (ruleNames || !p._parent.isEmpty)) {
				buf += (" ");
			}

			p = p._parent;
		}

		buf += ("]");
		return buf.toString();
	}
}
