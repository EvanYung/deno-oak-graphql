export interface BufReader {
  // 读取一行
  readLine(): Promise<string>
  // 读取自定义块
  readCustomChunk(size: number): Promise<Uint8Array>
  // 是否读数据结束
  isFinished(): boolean
}
