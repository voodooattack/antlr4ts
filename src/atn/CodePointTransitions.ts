/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import * as Character from "../misc/Character.js"
import { ATNState } from "./ATNState.js"
import { AtomTransition } from "./AtomTransition.js"
import { IntervalSet } from "../misc/IntervalSet.js"
import { RangeTransition } from "./RangeTransition.js"
import { SetTransition } from "./SetTransition.js"
import { Transition } from "./Transition.js"

/**
 * Utility functions to create {@link AtomTransition}, {@link RangeTransition},
 * and {@link SetTransition} appropriately based on the range of the input.
 *
 * To keep the serialized ATN size small, we only inline atom and
 * range transitions for Unicode code points <= U+FFFF.
 *
 * Whenever we encounter a Unicode code point > U+FFFF, we represent that
 * as a set transition (even if it is logically an atom or a range).
 */

/**
 * If {@code codePoint} is <= U+FFFF, returns a new {@link AtomTransition}.
 * Otherwise, returns a new {@link SetTransition}.
 */
export function createWithCodePoint(target: ATNState, codePoint: number): Transition {
	if (Character.isSupplementaryCodePoint(codePoint)) {
		return new SetTransition(target, IntervalSet.of(codePoint));
	}
	else {
		return new AtomTransition(target, codePoint);
	}
}

/**
 * If {@code codePointFrom} and {@code codePointTo} are both
 * <= U+FFFF, returns a new {@link RangeTransition}.
 * Otherwise, returns a new {@link SetTransition}.
 */
export function createWithCodePointRange(target: ATNState, codePointFrom: number, codePointTo: number): Transition {
	if (Character.isSupplementaryCodePoint(codePointFrom) || Character.isSupplementaryCodePoint(codePointTo)) {
		return new SetTransition(target, IntervalSet.of(codePointFrom, codePointTo));
	}
	else {
		return new RangeTransition(target, codePointFrom, codePointTo);
	}
}
