import { ContentBlock, ContentState } from 'draft-js'

export const findEntitiesByType = (type: string) => {
  return (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === type
      )
    }, callback)
  }
}
