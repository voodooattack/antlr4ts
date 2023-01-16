/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:27.9125304-07:00

import { ATNState } from "./ATNState.js"
import { ATNStateType } from "./ATNStateType.js"
import { BlockStartState } from "./BlockStartState.js"
import { Override } from "../Decorators.js"

/** Terminal node of a simple `(a|b|c)` block. */
export class BlockEndState extends ATNState {
	// This is always set during ATN deserialization
	public startState!: BlockStartState;

	@Override
	get stateType(): ATNStateType {
		return ATNStateType.BLOCK_END;
	}
}
