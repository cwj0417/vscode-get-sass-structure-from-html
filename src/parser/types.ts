export type ast = {
    tag: string,
    attrs?: Array<{
        name: string,
        value: string
    }>,
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
