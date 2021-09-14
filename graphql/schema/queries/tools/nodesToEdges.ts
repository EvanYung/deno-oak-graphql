// deno-lint-ignore-file no-explicit-any
export default (nodes: any[], num: number) => {
  return nodes.map((node, index: number) => ({
    cursor: index + num + 1,
    node
  }))
}
