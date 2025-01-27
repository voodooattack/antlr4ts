/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// CONVERSTION complete, Burt Harris 10/14/2016
import { Override } from "../../Decorators.js"
import { ParseTree } from "../ParseTree.js"
import { TerminalNode } from "../TerminalNode.js"
import { Trees } from "../Trees.js"
import { XPathElement } from "./XPathElement.js"

export class XPathTokenElement extends XPathElement {
	protected tokenType: number;
	constructor(tokenName: string, tokenType: number) {
		super(tokenName);
		this.tokenType = tokenType;
	}

	@Override
	public evaluate(t: ParseTree): ParseTree[] {
		// return all children of t that match nodeName
		let nodes: ParseTree[] = [];
		for (let c of Trees.getChildren(t)) {
			if (c instanceof TerminalNode) {
				if ((c.symbol.type === this.tokenType && !this.invert) ||
					(c.symbol.type !== this.tokenType && this.invert)) {
					nodes.push(c);
				}
			}
		}
		return nodes;
	}
}
