import addManualOrderRelationshipFields from './utils/manual-order-relationship'
import draftConverter from '@kids-reporter/draft-editor/lib/draft-converter'
import { richTextEditor } from './custom-fields/rich-text-editor'

export const customFields = {
  draftConverter,
  richTextEditor,
}

export const utils = {
  addManualOrderRelationshipFields,
}

export default {
  customFields,
  utils,
}
