/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:37.7099201-07:00

import { ATNStateType } from "./ATNStateType.js"
import { BitSet } from "../misc/BitSet.js"
import { DecisionState } from "./DecisionState.js"
import { Override } from "../Decorators.js"
import { StarLoopbackState } from "./StarLoopbackState.js"

export class StarLoopEntryState extends DecisionState {
	// This is always set during ATN deserialization
	public loopBackState!: StarLoopbackState;

	/**
	 * Indicates whether this state can benefit from a precedence DFA during SLL
	 * decision making.
	 *
	 * This is a computed property that is calculated during ATN deserialization
	 * and stored for use in {@link ParserATNSimulator} and
	 * {@link ParserInterpreter}.
	 *
	 * @see `DFA.isPrecedenceDfa`
	 */
	public precedenceRuleDecision: boolean = false;

	/**
	 * For precedence decisions, this set marks states *S* which have all
	 * of the following characteristics:
	 *
	 * * One or more invocation sites of the current rule returns to
	 *   *S*.
	 * * The closure from *S* includes the current decision without
	 *   passing through any rule invocations or stepping out of the current
	 *   rule.
	 *
	 * This field is not used when {@link #precedenceRuleDecision} is
	 * `false`.
	 */
	public precedenceLoopbackStates: BitSet = new BitSet();

	@Override
	get stateType(): ATNStateType {
		return ATNStateType.STAR_LOOP_ENTRY;
	}
}
