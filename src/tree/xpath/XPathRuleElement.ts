/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// CONVERSTION complete, Burt Harris 10/14/2016
import { ParserRuleContext } from "../../ParserRuleContext.js"
import { Override } from "../../Decorators.js"
import { ParseTree } from "../ParseTree.js"
import { Trees } from "../Trees.js"
import { XPathElement } from "./XPathElement.js"

export class XPathRuleElement extends XPathElement {
	protected ruleIndex: number;
	constructor(ruleName: string, ruleIndex: number) {
		super(ruleName);
		this.ruleIndex = ruleIndex;
	}

	@Override
	public evaluate(t: ParseTree): ParseTree[] {
		// return all children of t that match nodeName
		let nodes: ParseTree[] = [];
		for (let c of Trees.getChildren(t)) {
			if (c instanceof ParserRuleContext) {
				if ((c.ruleIndex === this.ruleIndex && !this.invert) ||
					(c.ruleIndex !== this.ruleIndex && this.invert)) {
					nodes.push(c);
				}
			}
		}
		return nodes;
	}
}
