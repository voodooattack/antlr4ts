/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// CONVERSTION complete, Burt Harris 10/14/2016
import { Override } from "../../Decorators.js"
import { ParseTree } from "../ParseTree.js"
import { Trees } from "../Trees.js"
import { XPathElement } from "./XPathElement.js"

export class XPathTokenAnywhereElement extends XPathElement {
	protected tokenType: number;
	constructor(tokenName: string, tokenType: number) {
		super(tokenName);
		this.tokenType = tokenType;
	}

	@Override
	public evaluate(t: ParseTree): ParseTree[] {
		return Trees.findAllTokenNodes(t, this.tokenType);
	}
}
