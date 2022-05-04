export type ast = {
    tag: string,
    attrs?: string[],
    children: Array<ast>
}

export type generatorContext = {
    code: string,
    indentCount: number,
    push(code: string): void,
    newLine(): void,
    indent(): void,
    deindent(): void,
}

export type transformContext = {
    currentNode: ast | null,
    parent: ast[],
    currentIndex: number,
    removeNode: () => void,
}
