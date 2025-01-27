/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:30.7737978-07:00

import { ATNState } from "./ATNState.js"
import { ATNStateType } from "./ATNStateType.js"
import { Override } from "../Decorators.js"

/** Mark the end of a * or + loop. */
export class LoopEndState extends ATNState {
	// This is always set during ATN deserialization
	public loopBackState!: ATNState;

	@Override
	get stateType(): ATNStateType {
		return ATNStateType.LOOP_END;
	}
}
