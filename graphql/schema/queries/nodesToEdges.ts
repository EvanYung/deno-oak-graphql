// deno-lint-ignore-file no-explicit-any
import { BufferNode } from 'deps'
export default (nodes: any[], after: number) => {
  return nodes.map((node, index: number) => ({
    cursor: BufferNode.from(`cursor${index + after + 1}`).toString('base64'),
    node
  }))
}
