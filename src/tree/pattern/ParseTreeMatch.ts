/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// CONVERSTION complete, Burt Harris 10/14/2016
import { MultiMap } from "../../misc/MultiMap.js"
import { NotNull, Override } from "../../Decorators.js"
import { ParseTree } from "../ParseTree.js"
import { ParseTreePattern } from "./ParseTreePattern.js"

/**
 * Represents the result of matching a {@link ParseTree} against a tree pattern.
 */
export class ParseTreeMatch {
	/**
	 * This is the backing field for `tree`.
	 */
	private _tree: ParseTree;

	/**
	 * This is the backing field for `pattern`.
	 */
	private _pattern: ParseTreePattern;

	/**
	 * This is the backing field for `labels`.
	 */
	private _labels: MultiMap<string, ParseTree>;

	/**
	 * This is the backing field for `mismatchedNode`.
	 */
	private _mismatchedNode?: ParseTree;

	/**
	 * Constructs a new instance of {@link ParseTreeMatch} from the specified
	 * parse tree and pattern.
	 *
	 * @param tree The parse tree to match against the pattern.
	 * @param pattern The parse tree pattern.
	 * @param labels A mapping from label names to collections of
	 * {@link ParseTree} objects located by the tree pattern matching process.
	 * @param mismatchedNode The first node which failed to match the tree
	 * pattern during the matching process.
	 *
	 * @throws {@link Error} if `tree` is not defined
	 * @throws {@link Error} if `pattern` is not defined
	 * @throws {@link Error} if `labels` is not defined
	 */
	constructor(
		@NotNull tree: ParseTree,
		@NotNull pattern: ParseTreePattern,
		@NotNull labels: MultiMap<string, ParseTree>,
		mismatchedNode: ParseTree | undefined) {
		if (!tree) {
			throw new Error("tree cannot be null");
		}

		if (!pattern) {
			throw new Error("pattern cannot be null");
		}

		if (!labels) {
			throw new Error("labels cannot be null");
		}

		this._tree = tree;
		this._pattern = pattern;
		this._labels = labels;
		this._mismatchedNode = mismatchedNode;
	}

	/**
	 * Get the last node associated with a specific `label`.
	 *
	 * For example, for pattern `<id:ID>`, `get("id")` returns the
	 * node matched for that `ID`. If more than one node
	 * matched the specified label, only the last is returned. If there is
	 * no node associated with the label, this returns `undefined`.
	 *
	 * Pattern tags like `<ID>` and `<expr>` without labels are
	 * considered to be labeled with `ID` and `expr`, respectively.
	 *
	 * @param label The label to check.
	 *
	 * @returns The last {@link ParseTree} to match a tag with the specified
	 * label, or `undefined` if no parse tree matched a tag with the label.
	 */
	public get(label: string): ParseTree | undefined {
		let parseTrees = this._labels.get(label);
		if (!parseTrees || parseTrees.length === 0) {
			return undefined;
		}

		return parseTrees[parseTrees.length - 1]; // return last if multiple
	}

	/**
	 * Return all nodes matching a rule or token tag with the specified label.
	 *
	 * If the `label` is the name of a parser rule or token in the
	 * grammar, the resulting list will contain both the parse trees matching
	 * rule or tags explicitly labeled with the label and the complete set of
	 * parse trees matching the labeled and unlabeled tags in the pattern for
	 * the parser rule or token. For example, if `label` is `"foo"`,
	 * the result will contain *all* of the following.
	 *
	 * * Parse tree nodes matching tags of the form `<foo:anyRuleName>` and
	 *   `<foo:AnyTokenName>`.
	 * * Parse tree nodes matching tags of the form `<anyLabel:foo>`.
	 * * Parse tree nodes matching tags of the form `<foo>`.
	 *
	 * @param label The label.
	 *
	 * @returns A collection of all {@link ParseTree} nodes matching tags with
	 * the specified `label`. If no nodes matched the label, an empty list
	 * is returned.
	 */
	@NotNull
	public getAll(@NotNull label: string): ParseTree[] {
		const nodes = this._labels.get(label);
		if (!nodes) {
			return [];
		}
		return nodes;
	}

	/**
	 * Return a mapping from label &rarr; [list of nodes].
	 *
	 * The map includes special entries corresponding to the names of rules and
	 * tokens referenced in tags in the original pattern. For additional
	 * information, see the description of {@link #getAll(String)}.
	 *
	 * @returns A mapping from labels to parse tree nodes. If the parse tree
	 * pattern did not contain any rule or token tags, this map will be empty.
	 */
	@NotNull
	get labels(): MultiMap<string, ParseTree> {
		return this._labels;
	}

	/**
	 * Get the node at which we first detected a mismatch.
	 *
	 * @returns the node at which we first detected a mismatch, or `undefined`
	 * if the match was successful.
	 */
	get mismatchedNode(): ParseTree | undefined {
		return this._mismatchedNode;
	}

	/**
	 * Gets a value indicating whether the match operation succeeded.
	 *
	 * @returns `true` if the match operation succeeded; otherwise,
	 * `false`.
	 */
	get succeeded(): boolean {
		return !this._mismatchedNode;
	}

	/**
	 * Get the tree pattern we are matching against.
	 *
	 * @returns The tree pattern we are matching against.
	 */
	@NotNull
	get pattern(): ParseTreePattern {
		return this._pattern;
	}

	/**
	 * Get the parse tree we are trying to match to a pattern.
	 *
	 * @returns The {@link ParseTree} we are trying to match to a pattern.
	 */
	@NotNull
	get tree(): ParseTree {
		return this._tree;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public toString(): string {
		return `Match ${
			this.succeeded ? "succeeded" : "failed"}; found ${
			this.labels.size} labels`;
	}
}
