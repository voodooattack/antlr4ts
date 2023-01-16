/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// CONVERSTION complete, Burt Harris 10/14/2016
import { Override } from "../../Decorators.js"
import { ParseTree } from "../ParseTree.js"
import { TerminalNode } from "../TerminalNode.js"
import { Trees } from "../Trees.js"
import { XPath } from "./XPath.js"
import { XPathElement } from "./XPathElement.js"

export class XPathWildcardAnywhereElement extends XPathElement {
	constructor() {
		super(XPath.WILDCARD);
	}

	@Override
	public evaluate(t: ParseTree): ParseTree[] {
		if (this.invert) {
			// !* is weird but valid (empty)
			return [];
		}
		return Trees.getDescendants(t);
	}
}
