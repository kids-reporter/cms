import { ContentBlock, ContentState } from 'draft-js'

export enum ENTITY {
  Link = 'LINK',
  Annotation = 'ANNOTATION',
  Anchor = 'ANCHOR',
  TOCAnchor = 'TOC_ANCHOR',
}

export const findEntitiesByType = (type: ENTITY) => {
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
